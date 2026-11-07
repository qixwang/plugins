import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { portableBytes } from "./pstack-files.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixture = join(root, "scripts", "test", "fixtures", "verification-cli");
const skill = join(fixture, ".github", "skills", "verify-verification-cli");
const [runId] = process.argv.slice(2);
assert.match(runId ?? "", /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i, "Supply the actual fixture proof run ID");
const reportFile = join(skill, "evidence", runId, "journey.json");
const report = JSON.parse(readFileSync(reportFile, "utf8"));
assert.equal(report.runId, runId);
assert.equal(report.status, "ready");
assert.equal(resolve(report.fixture), fixture);
assert.equal(resolve(report.app), join(fixture, "app.mjs"));
assert.equal(resolve(report.dataDirectory), join(skill, `run-data-${runId}`));
assert.equal(existsSync(report.dataDirectory), false, "Owned data must already be cleaned");
assert.deepEqual(report.commands.map((command) => command.args[3]), ["list", "add", "list", "complete", "list"]);
for (const command of report.commands) {
  assert.equal(command.exitCode, 0);
  assert.equal(command.stderr, "");
  assert.equal(command.signal, null);
  assert.equal(command.error, null);
  assert.equal(resolve(command.args[0]), join(fixture, "app.mjs"));
  assert.equal(resolve(command.args[2]), resolve(report.dataDirectory));
}
const pending = { id: 1, title: "Review adapter", done: false };
const complete = { ...pending, done: true };
assert.deepEqual(report.commands.map((command) => JSON.parse(command.stdout)), [[], pending, [pending], complete, [complete]]);
assert.equal(report.snapshots.length, 3);
for (const [index, snapshot] of report.snapshots.entries()) {
  assert.equal(dirname(snapshot.path), dirname(reportFile));
  assert.deepEqual(JSON.parse(readFileSync(snapshot.path, "utf8")), [index === 0 ? pending : complete]);
}
for (const proof of ["Evidence report survives cleanup", "Cleanup leaves no run data directory", "Doctor did not create tasks.json"]) {
  assert.ok(report.assertions.includes(proof), proof);
}
function redact(value) {
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, redact(entry)]));
  if (typeof value !== "string" || !isAbsolute(value)) return value;
  const local = relative(fixture, value);
  return !local.startsWith("..") && !isAbsolute(local)
    ? `$FIXTURE/${local.split("\\").join("/")}`
    : "$NODE_EXECUTABLE";
}
const helper = join(skill, "scripts", "verify.mjs");
const output = {
  note: "Observed CLI results; absolute host paths redacted. Raw evidence remains locally in the ignored fixture evidence directory.",
  helperSha256: createHash("sha256").update(portableBytes(helper)).digest("hex"),
  generatorSourceSha256: createHash("sha256").update(portableBytes(join(root, "pstack", "skills", "create-verification-skill", "SKILL.md"))).digest("hex"),
  report: redact(report),
};
const directory = join(root, "pstack", "docs", "harness", "copilot", "proof");
mkdirSync(directory, { recursive: true });
writeFileSync(join(directory, "fixture-journey.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Recorded ${report.commands.length} real CLI commands, ${report.assertions.length} assertions and ${report.snapshots.length} surviving snapshots; no owned data remains.`);
