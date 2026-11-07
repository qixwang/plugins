import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { renderCopilot } from "../pstack-copilot.mjs";
import { portableBytes } from "../pstack-files.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const pstack = join(root, "pstack");
const names = readdirSync(join(pstack, "skills")).filter((name) => existsSync(join(pstack, "skills", name, "SKILL.md")));
const rendered = renderCopilot(pstack, names);
const prefix = "github-copilot/";
const text = (path) => rendered.get(prefix + path).bytes.toString("utf8");
const matrix = JSON.parse(text("compatibility.json"));

test("all 58 originals, 23 playbooks, 2 agents and every resource have provenance", () => {
  assert.equal(matrix.skills.length, 58);
  assert.deepEqual(matrix.skills.map((skill) => skill.name), names.sort());
  assert.equal(matrix.playbooks.length, 23);
  assert.equal(matrix.agents.length, 2);
  for (const skill of matrix.skills) {
    assert.ok(rendered.has(prefix + skill.adapted));
    assert.ok(skill.limitations);
    assert.ok(skill.evidence.status);
    for (const resource of skill.resources) {
      assert.equal(resource.sha256, createHash("sha256").update(portableBytes(join(pstack, resource.path))).digest("hex"));
      assert.ok(rendered.has(prefix + resource.path));
    }
  }
});

test("every executable instruction entry and markdown reference receives the contract", () => {
  for (const [path, entry] of rendered) {
    if (path.endsWith(".md") && !path.endsWith("/COMPATIBILITY.md")) assert.match(entry.bytes.toString("utf8"), /Copilot execution contract/, path);
  }
  assert.ok(rendered.has(prefix + "com.github.copilot/agents/poteto-agent.agent.md"));
  assert.ok(!rendered.has(prefix + "agents/poteto-agent.md"));
  assert.doesNotMatch(text("com.github.copilot/agents/poteto-agent.agent.md"), /\.cursor|is_background:/);
});

test("generated skill preserves the real journey, feature map and persistent proof gate", () => {
  const skill = text("skills/create-verification-skill/SKILL.md");
  assert.match(skill, /\.github\/skills\/verify-<app>/);
  assert.doesNotMatch(skill, /\.cursor\/skills/);
  for (const section of ["Launch", "Doctor", "Drive", "Evidence", "Cleanup", "Helpers"]) assert.ok(skill.includes(`**${section}:**`));
  assert.match(skill, /top 3-5/);
  assert.match(skill, /ONE mapped feature/);
  assert.match(skill, /evidence still exists/);
  assert.ok(rendered.has(prefix + "skills/create-verification-skill/references/feature-map-example/create-note.md"));
});

test("setup is explicit project-scoped JSON; unsupported skills fail closed", () => {
  const setup = text("skills/setup-pstack/SKILL.md");
  assert.match(setup, /\.github\/pstack-models\.json/);
  assert.match(setup, /confirmation before writing/);
  assert.doesNotMatch(setup, /~\/\.cursor|grok-4|claude-opus/);
  for (const name of ["make-bot-ui", "ketchup-video"]) {
    assert.match(text(`skills/${name}/SKILL.md`), /Stop\./);
    assert.equal(matrix.skills.find((skill) => skill.name === name).status, "unsupported");
  }
});

test("all local markdown links resolve inside the generated tree", () => {
  for (const [path, entry] of rendered) {
    if (!path.endsWith(".md")) continue;
    for (const [, href] of entry.bytes.toString("utf8").matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("#") || href === "url") continue;
      const target = posix.normalize(posix.join(posix.dirname(path), href.replace(/[#?].*/, ""))).replace(/\/$/, "");
      assert.ok(rendered.has(target) || [...rendered.keys()].some((file) => file.startsWith(`${target}/`)), `${path} -> ${href}`);
    }
  }
});

test("unknown skills stop generation rather than getting an unreviewed pass", () => {
  assert.throws(() => renderCopilot(pstack, [...names, "unreviewed-skill"]), /Unassessed/);
});

test("fixture exercises public CLI persistence and cleanup without network or credentials", () => {
  const fixture = join(root, "scripts", "test", "fixtures", "verification-cli");
  const dir = mkdtempSync(join(fixture, "proof-data-"));
  const run = (command, ...args) => {
    const result = spawnSync(process.execPath, [join(fixture, "app.mjs"), "--data-dir", dir, command, ...args], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    return JSON.parse(result.stdout);
  };
  try {
    assert.deepEqual(run("list"), []);
    assert.equal(readdirSync(dir).length, 0);
    assert.equal(run("add", "Review adapter").done, false);
    assert.equal(run("list")[0].title, "Review adapter");
    assert.equal(run("complete", "1").done, true);
    assert.equal(run("list")[0].done, true);
    assert.equal(JSON.parse(readFileSync(join(dir, "tasks.json"), "utf8"))[0].done, true);
  } finally {
    rmSync(dir, { recursive: true });
  }
  assert.ok(!existsSync(dir));
  assert.ok(statSync(join(fixture, "app.mjs")).isFile());
});

test("Copilot-generated helper drives the app, preserves proof and supports read-only Doctor", () => {
  const fixture = join(root, "scripts", "test", "fixtures", "verification-cli");
  const skill = join(fixture, ".github", "skills", "verify-verification-cli");
  const helper = join(skill, "scripts", "verify.mjs");
  const before = readdirSync(skill).sort();
  const doctor = spawnSync(process.execPath, [helper, "doctor"], { encoding: "utf8" });
  assert.equal(doctor.status, 0, doctor.stderr);
  assert.equal(JSON.parse(doctor.stdout).status, "doctor-passed");
  assert.deepEqual(readdirSync(skill).sort(), before);
  const run = spawnSync(process.execPath, [helper], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  const summary = JSON.parse(run.stdout);
  assert.equal(summary.status, "ready");
  assert.equal(existsSync(summary.dataRemoved), false);
  const report = JSON.parse(readFileSync(summary.evidence, "utf8"));
  assert.equal(report.commands.length, 5);
  assert.equal(report.status, "ready");
  for (const snapshot of report.snapshots) {
    assert.deepEqual(JSON.parse(readFileSync(snapshot.path, "utf8")), snapshot.tasks);
  }
  const features = join(skill, "features");
  assert.deepEqual(readdirSync(features).sort(), ["README.md", "add.md", "complete.md", "list.md"]);
  for (const name of ["add", "complete", "list"]) {
    const headings = readFileSync(join(features, `${name}.md`), "utf8").match(/^## .+$/gm);
    assert.deepEqual(headings, ["## Sub-features", "## How to get to it (user POV)", "## Driving it with Node CLI", "## Gotchas"]);
  }
});

test("a real broken CLI mutation fails proof, cleans owned data and retains blocked evidence", () => {
  const fixture = join(root, "scripts", "test", "fixtures", "verification-cli");
  const isolated = mkdtempSync(join(fixture, "broken-proof-"));
  const skill = join(isolated, ".github", "skills", "verify-verification-cli");
  mkdirSync(join(skill, "scripts"), { recursive: true });
  const original = readFileSync(join(fixture, "app.mjs"), "utf8");
  assert.ok(original.includes("task.done = true;"));
  writeFileSync(join(isolated, "app.mjs"), original.replace("task.done = true;", "task.done = false;"));
  writeFileSync(join(skill, "scripts", "verify.mjs"),
    readFileSync(join(fixture, ".github", "skills", "verify-verification-cli", "scripts", "verify.mjs")));
  try {
    const result = spawnSync(process.execPath, [join(skill, "scripts", "verify.mjs")], { encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Complete returns the same task marked done/);
    const evidence = join(skill, "evidence");
    const runs = readdirSync(evidence);
    assert.equal(runs.length, 1);
    const report = JSON.parse(readFileSync(join(evidence, runs[0], "journey.json"), "utf8"));
    assert.equal(report.status, "blocked");
    assert.equal(existsSync(report.dataDirectory), false);
    assert.ok(report.assertions.includes("Evidence report survives cleanup"));
    assert.ok(existsSync(report.snapshots[0].path));
    assert.equal(readFileSync(join(fixture, "app.mjs"), "utf8"), original);
  } finally {
    rmSync(isolated, { recursive: true });
  }
});

test("fork marketplace targets only the generated Copilot tree with matching version", () => {
  const marketplace = JSON.parse(readFileSync(join(root, ".github", "plugin", "marketplace.json"), "utf8"));
  assert.equal(marketplace.name, "qixwang-pstack-copilot");
  assert.equal(marketplace.plugins.length, 1);
  assert.equal(marketplace.plugins[0].source, "./harness/pstack/github-copilot");
  assert.equal(marketplace.plugins[0].version, matrix.upstreamVersion);
});

test("committed runtime evidence binds the unchanged generator and helper, with no private paths", () => {
  const proof = JSON.parse(readFileSync(join(pstack, "docs", "harness", "copilot", "proof", "fixture-journey.json"), "utf8"));
  const hash = (path) => createHash("sha256").update(portableBytes(path)).digest("hex");
  assert.equal(proof.generatorSourceSha256, hash(join(pstack, "skills", "create-verification-skill", "SKILL.md")));
  assert.equal(proof.helperSha256, hash(join(root, "scripts", "test", "fixtures", "verification-cli",
    ".github", "skills", "verify-verification-cli", "scripts", "verify.mjs")));
  assert.equal(proof.report.status, "ready");
  assert.equal(proof.report.commands.length, 5);
  assert.doesNotMatch(JSON.stringify(proof), /C:\\\\Users\\\\|OneDrive|access_token|Authorization/);
});
