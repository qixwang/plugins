#!/usr/bin/env node
import assert from "node:assert/strict";
import {
  existsSync, lstatSync, mkdirSync, readFileSync, rmSync, writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const fixture = fileURLToPath(new URL("../../../../", import.meta.url));
const skill = dirname(dirname(fileURLToPath(import.meta.url)));
const app = join(fixture, "app.mjs");
const mode = process.argv.slice(2);
assert(mode.length === 0 || (mode.length === 1 && mode[0] === "doctor"),
  "Usage: node .github\\skills\\verify-verification-cli\\scripts\\verify.mjs [doctor]");
const runId = randomUUID();
const data = join(skill, `run-data-${runId}`);
const store = join(data, "tasks.json");
const report = {
  runId, fixture, app, node: process.version, dataDirectory: data,
  status: "running", commands: [], assertions: [], snapshots: [],
};

function check(description, actual, expected) {
  assert.deepStrictEqual(actual, expected, description);
  report.assertions.push(description);
}

function cli(featureIds, args) {
  const argv = [app, "--data-dir", data, ...args];
  const result = spawnSync(process.execPath, argv, {
    cwd: fixture, encoding: "utf8", shell: false, timeout: 10000,
    maxBuffer: 1024 * 1024,
  });
  report.commands.push({
    featureIds, executable: process.execPath, args: argv, cwd: fixture,
    stdout: result.stdout, stderr: result.stderr,
    exitCode: result.status, signal: result.signal,
    error: result.error ? result.error.message : null,
  });
  if (result.error) throw result.error;
  check(`${args[0]} exits with code 0`, result.status, 0);
  check(`${args[0]} is not terminated by a signal`, result.signal, null);
  check(`${args[0]} has empty stderr`, result.stderr, "");
  return JSON.parse(result.stdout);
}

function doctor() {
  check("App entry is a regular file", lstatSync(app).isFile(), true);
  check("Doctor starts with no data directory", existsSync(data), false);
  check("Doctor lists an empty store", cli(["list-empty", "list-read-only"], ["list"]), []);
  check("Doctor did not create a data directory", existsSync(data), false);
  check("Doctor did not create tasks.json", existsSync(store), false);
}

function snapshot(name, expected, evidence) {
  check(`${name}: tasks.json is a regular file`, lstatSync(store).isFile(), true);
  const raw = readFileSync(store, "utf8");
  check(`${name}: persisted array and exact task shape`, JSON.parse(raw), expected);
  const path = join(evidence, `${name}.tasks.json`);
  writeFileSync(path, raw, { flag: "wx" });
  report.snapshots.push({ name, source: store, path, tasks: JSON.parse(raw) });
}

if (mode[0] === "doctor") {
  doctor();
  report.status = "doctor-passed";
  console.log(JSON.stringify(report, null, 2));
} else {
  const evidence = join(skill, "evidence", runId);
  const reportFile = join(evidence, "journey.json");
  let ownedData = false;
  let failure;
  try {
    doctor();
    mkdirSync(evidence, { recursive: true });
    writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
    mkdirSync(data);
    ownedData = true;
    check("Launch owns an empty data directory", existsSync(store), false);

    const pending = { id: 1, title: "Review adapter", done: false };
    const completed = { id: 1, title: "Review adapter", done: true };
    check("Add returns the exact pending task",
      cli(["add-create", "add-persist"], ["add", pending.title]), pending);
    snapshot("after-add", [pending], evidence);
    const beforeList = readFileSync(store, "utf8");
    check("A fresh list process returns the pending task",
      cli(["list-pending"], ["list"]), [pending]);
    check("Pending list does not change persisted bytes", readFileSync(store, "utf8"), beforeList);
    check("Complete returns the same task marked done",
      cli(["complete-task", "complete-persist"], ["complete", "1"]), completed);
    snapshot("after-complete", [completed], evidence);
    const beforeFinalList = readFileSync(store, "utf8");
    check("Another fresh list process returns the completed task",
      cli(["list-completed"], ["list"]), [completed]);
    check("Completed list does not change persisted bytes",
      readFileSync(store, "utf8"), beforeFinalList);
    snapshot("final", [completed], evidence);
  } catch (error) {
    failure = error;
    report.error = { message: error.message, stack: error.stack };
    console.error(error.stack);
  } finally {
    try {
      if (ownedData) {
        check("Cleanup targets this run's exact child directory", dirname(data), skill);
        check("Cleanup data directory is not a symlink", lstatSync(data).isSymbolicLink(), false);
        rmSync(data, { recursive: true, force: false });
      }
      check("Cleanup leaves no run data directory", existsSync(data), false);
      if (existsSync(reportFile)) {
        check("Evidence report survives cleanup", lstatSync(reportFile).isFile(), true);
        for (const entry of report.snapshots) {
          check(`${entry.name}: evidence survives cleanup`,
            JSON.parse(readFileSync(entry.path, "utf8")), entry.tasks);
        }
      } else if (!failure) {
        throw new Error("Evidence report is missing");
      }
    } catch (error) {
      failure = error;
      report.cleanupError = { message: error.message, stack: error.stack };
      console.error(error.stack);
    }
    report.status = failure ? "blocked" : "ready";
    if (existsSync(reportFile)) {
      writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`);
      assert.deepStrictEqual(JSON.parse(readFileSync(reportFile, "utf8")), report,
        "Evidence report must persist exactly after cleanup");
    }
  }
  if (failure) {
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify({ status: report.status, evidence: reportFile, dataRemoved: data }));
  }
}
