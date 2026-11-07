import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, posix } from "node:path";
import { executable, portableBytes } from "./pstack-files.mjs";

export const COPILOT_TREE = "github-copilot";
const GUIDE = "docs/harness/copilot.md";
const PARTIAL = {
  architect: "Independent design exploration works only with available delegation; model-diverse runners require explicit choices.",
  arena: "Isolated candidate outputs and cross-family judging require supported session/model capabilities; same-model runs are degraded.",
  "automate-me": "Scoped history and direct skill authoring replace Cursor mining/create-skill; subjective output needs user approval.",
  "blast-radius": "Independent readers depend on delegation availability; static routing has not been runtime exercised.",
  "create-formal-verification-skill": "No real verifier/counterexample journey executed; missing Java/TLC/tool setup prevents a ready formal proof.",
  "figure-it-out": "Bespoke playbook drafting retained; external authoring, model panels and execution depend on current permissions.",
  how: "Read-only schema-aware investigation retained; delegation/model-diversity not runtime verified.",
  interrogate: "Adversarial review retained; explicitly selected diverse models and independent reviews are unverified.",
  ketchup: "Current-chat recap retained; external visualize/media and live PR/session reads require available tools.",
  "maintain-formal-verification-skill": "Must prove every model/check and broken variant; toolchain unavailable and all-feature run unexecuted.",
  "maintain-verification-skill": "Project path corrected; full feature coverage and independent source wave unexecuted; publishing is opt-in.",
  "no-comments": "Agent is report-only until authorized edits; custom-agent delegation is not assumed.",
  "poteto-help": "Original catalog remains background reference; use Copilot guide/matrix for installation, paths and supported workflows.",
  "poteto-mode": "23 playbooks retained with mandatory guard; external deslop/control skills, Cursor automations/cloud, watchers and unsafe audits are not equivalent.",
  recall: "Only repository-scoped session queries, current conversation or explicit exports; private transcript filesystem mining disabled.",
  reflect: "Scoped conversation/digest and direct authoring supported in principle; full transcript audit, model panel and approvals unexecuted.",
  "setup-pstack": "Native explicit project JSON flow supplied; interactive selection and actual role-model application unexecuted.",
  "show-me-your-work": "TSV trail retained; exact transcript and cross-family independent audit require capabilities not proved here.",
  statechart: "Bundled Node-capable wrapper retained; Java/TLC/mise bootstrap and Pele unverified; POSIX process-group shutdown is not Windows-native.",
  swarm: "Task mapping retained; cloud isolation and multi-model/race semantics need explicit capabilities and scope.",
  teach: "Code learning workflow retained; external tools/delegation and authoring routes must be available.",
  why: "Evidence categories use live tool discovery; absent MCP categories remain gaps, not fabricated searches.",
};
const UNSUPPORTED = {
  "make-bot-ui": "Cursor webhook routines, sender-key secret cards and wake protocol have no verified Copilot equivalent.",
  "ketchup-video": "No available renderer/frame/timing proof validated; text ketchup is separate, not a video pass.",
};
const STATIC = [
  "benchmark-checklist", "bro", "correct", "create-verification-skill",
  "in-your-own-words", "sharpen", "tdd", "technical-writing",
  "typescript-best-practices", "unslop",
];
const PLAYBOOKS = {
  "authoring-a-skill": "Direct Copilot project-skill authoring replaces external create-skill; optimization-loop equivalence unverified.",
  "autonomous-run": "Bounded user scope only; no overnight permission escalation or implicit publishing/merge.",
  "autopilot-full": "Cursor autopilot machinery has no 1:1 mapping; explicit Copilot delegation and permissions required.",
  "autopilot-stack": "No implicit stack/merge authorization; every PR verification and remote action stays gated.",
  babysit: "Existing gh checks/comments can be read; Bun watcher, Cursor Bugbot launch and routine control unverified.",
  "bug-fix": "Actual surface reproduction required; missing control harness must be generated and proved, not skipped.",
  eval: "Bounded fixture eval possible; original environment/model controls and large fan-outs unverified.",
  feature: "Code workflow retained; external control/deslop, model overrides and publishing defaults replaced/gated.",
  hillclimb: "Real baseline and before/after metric required; no unrequested indefinite iteration or auto-commits.",
  investigation: "Read-only work retained; no fetching audit, external writes or automatic delegation.",
  "multi-phase-plan": "Plan/check-plan resources retained; task-level isolation and multi-phase runtime unverified.",
  "opening-a-pr": "Only explicit user-requested publication to the confirmed fork/base; no default PR or branch amendment.",
  orchestrate: "Standing fleet/workflow/session scheduling not enabled by skill invocation; requires explicit delegation.",
  "pause-safely": "Preserve user edits and owned state; no forced reset, broad cleanup or external messages by default.",
  "perf-issue": "Measurement protocol retained; runtime/control tools must be present and evidence produced.",
  prototype: "Owned scoped prototype possible; unsupported external control skill cannot stand in for real proof.",
  refactoring: "Behavior preservation still required; no external deslop equivalence or automatic publication.",
  "runtime-forensics": "Requires authorized live instance/instrumentation; no UI/process assumptions or primary-user process manipulation.",
  "session-pickup": "Only exact scoped conversation/export or session queries; Cursor transcript filesystem mining disabled.",
  shipping: "Independent per-PR verification and explicit merge authorization required; green CI alone is not permission.",
  "trace-forensics": "User-provided artifact analysis possible; no unrelated private trace/transcript search.",
  "visual-parity": "Real screenshots and target renderer/harness required; CLI fixture does not verify UI parity.",
  "worktree-cleanup": "Original fetching/space-unsafe private-history audit disabled; no inferred deletion safety or unattended deletion.",
};

function walk(dir, prefix = "") {
  return readdirSync(dir).sort().flatMap((name) => {
    const path = posix.join(prefix, name);
    return statSync(join(dir, name)).isDirectory()
      ? walk(join(dir, name), path)
      : [path];
  });
}

export function renderCopilot(pstack, skillNames) {
  const files = new Map();
  const put = (path, text, executable = false) =>
    files.set(`${COPILOT_TREE}/${path}`, { bytes: Buffer.from(text), executable });
  const evidencePath = join(pstack, "docs", "harness", "copilot", "evidence.json");
  const evidence = existsSync(evidencePath) ? JSON.parse(readFileSync(evidencePath, "utf8")) : { skills: {} };
  const sourceFiles = [
    ...walk(join(pstack, "skills")).map((path) => `skills/${path}`),
    ...walk(join(pstack, "docs")).map((path) => `docs/${path}`),
    ...walk(join(pstack, "agents")).map((path) => `agents/${path}`),
    "README.md", "LICENSE", "plugin.json",
  ];
  const inventory = sourceFiles.map((path) => {
    const bytes = portableBytes(join(pstack, path));
    return {
      path,
      sha256: createHash("sha256").update(bytes).digest("hex"),
      bytes: bytes.length,
      cursorSignals: path.endsWith(".md") || /\.(sh|ts|mjs)$/.test(path)
        ? [...new Set(bytes.toString("utf8").match(/AskQuestion|generalPurpose|\.cursor[^\s`"'()]*|run_in_background|cloud_base_branch|readonly|Cursor Automations?|Bugbot|SendToUser|update_state|bun|mise|git fetch/g) ?? [])].sort()
        : [],
    };
  });
  if (evidence.skills?.["create-verification-skill"]?.status === "runtime-verified") {
    const proofPath = join(pstack, "docs", "harness", "copilot", "proof", "fixture-journey.json");
    const proof = JSON.parse(readFileSync(proofPath, "utf8"));
    const source = inventory.find((file) => file.path === "skills/create-verification-skill/SKILL.md");
    if (proof.report?.status !== "ready" || proof.generatorSourceSha256 !== source.sha256) {
      throw new Error("Verification-generator source changed or proof is not ready; refresh applicable runtime evidence before claiming verified.");
    }
  }
  const manifest = JSON.parse(readFileSync(join(pstack, "plugin.json"), "utf8"));
  manifest.repository = "https://github.com/qixwang/plugins";
  manifest.homepage = "https://github.com/qixwang/plugins/tree/copilot-adaptation/harness/pstack/github-copilot";
  const originalAgent = /^agents\/([^/]+)\.md$/;
  for (const source of sourceFiles) {
    let target = source.replace(originalAgent, "com.github.copilot/agents/$1.agent.md");
    let text = portableBytes(join(pstack, source));
    if (source === "plugin.json") text = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
    if (source.endsWith(".md")) {
      text = text.toString("utf8")
        .replaceAll("~/.cursor/skills/", "~/.copilot/skills/")
        .replaceAll(".cursor/skills/", ".github/skills/");
      if (source === "skills/setup-pstack/SKILL.md") {
        text = portableBytes(join(pstack, "docs/harness/copilot/setup-pstack.md")).toString("utf8");
      }
      const unsupported = source.match(/^skills\/([^/]+)\/SKILL\.md$/)?.[1];
      if (UNSUPPORTED[unsupported]) {
        text = `---\nname: ${unsupported}\ndescription: "Unavailable in the Copilot adaptation; explain its unsupported dependency."\ndisable-model-invocation: true\n---\n\n# ${unsupported}\n\nStop. ${UNSUPPORTED[unsupported]} Do not run the Cursor workflow or report success. Consult the compatibility matrix.\n`;
      }
      if (originalAgent.test(source)) {
        text = text.replace(/^is_background:.*\n/gm, "");
        if (source.endsWith("poteto-agent.md")) {
          text = `---\nname: poteto-agent\ndescription: "Bounded pstack code/helper delegate; parent owns the playbook."\n---\n\n# Poteto delegate\n\nRead the absolute poteto-mode entry and adapter paths provided by your parent before work. If absent, resolve only this mounted plugin's skills/poteto-mode/SKILL.md relative to this file (../../../skills/poteto-mode/SKILL.md). Never search home directories or other plugin caches. If it cannot be read, stop and report the missing path. Follow only the parent's bounded scope, keep models at harness defaults unless explicitly selected, and return evidence and blockers. Do not run the whole playbook, publish, merge, or expand autonomy.\n`;
        } else {
          text += "\n## Copilot report-only boundary\n\nDo not delete or edit comments or source files in this invocation. Return proposed deletions/refactor flags with evidence. The parent may apply only authorized changes. Do not infer a main branch diff when no base/scope was supplied; ask the parent for scope.\n";
        }
      }
      const guide = posix.relative(posix.dirname(target), GUIDE);
      const guard = `> **Copilot execution contract:** Read [the adapter](${guide}) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.\n\n`;
      const frontmatter = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
      text = frontmatter
        ? text.slice(0, frontmatter[0].length) + "\n" + guard + text.slice(frontmatter[0].length)
        : guard + text;
      text = text.replace(/\]\(([^)\s]+)\)/g, (link, href) => {
        if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("#")) return link;
        const [bare, suffix = ""] = href.split(/(?=[#?])/);
        const resolved = posix.normalize(posix.join(posix.dirname(source), bare));
        const moved = resolved.replace(originalAgent, "com.github.copilot/agents/$1.agent.md");
        if (moved === resolved) {
          if (!sourceFiles.includes(resolved) && existsSync(join(pstack, resolved))) {
            const kind = statSync(join(pstack, resolved)).isDirectory() ? "tree" : "blob";
            return `](https://github.com/cursor/plugins/${kind}/main/pstack/${resolved}${suffix})`;
          }
          return link;
        }
        return `](${posix.relative(posix.dirname(target), moved)}${suffix})`;
      });
      text = text.replace(/(?<! ) $/gm, "").replace(/\n{2,}$/, "\n");
    }
    put(target, text, executable(join(pstack, source)));
  }
  const skills = skillNames.sort().map((name) => {
    if (!name.startsWith("principle-") && !STATIC.includes(name) && !PARTIAL[name] && !UNSUPPORTED[name]) {
      throw new Error(`Unassessed Copilot skill: ${name}`);
    }
    const proof = evidence.skills?.[name];
    const status = UNSUPPORTED[name] ? "unsupported" : proof?.status === "runtime-verified"
      ? "runtime-verified" : PARTIAL[name] ? "partial" : "static-only";
    return {
      name, status,
      source: `pstack/skills/${name}/SKILL.md`,
      adapted: `skills/${name}/SKILL.md`,
      limitations: UNSUPPORTED[name] ?? proof?.limitations ?? PARTIAL[name] ?? "Portable instructions; packaging/static checks only, not an end-to-end runtime pass.",
      evidence: proof ?? { status: "unexecuted", check: "node scripts/generate-pstack-harness-trees.mjs --check; node --test scripts/test/pstack-copilot.test.mjs" },
      resources: inventory.filter((file) => file.path.startsWith(`skills/${name}/`)),
    };
  });
  if (skills.length !== 58) throw new Error(`Expected 58 assessed skills, found ${skills.length}; review the manifest before updating.`);
  const playbooks = inventory.filter(({ path }) => /^skills\/poteto-mode\/playbooks\/[^/]+\.md$/.test(path)).map(({ path, sha256 }) => {
    const name = posix.basename(path, ".md");
    if (!PLAYBOOKS[name]) throw new Error(`Unassessed Copilot playbook: ${name}`);
    return { path, sha256, status: "partial", reason: `${PLAYBOOKS[name]} Live playbook unexecuted.` };
  });
  const agents = ["poteto-agent", "comment-sicko"].map((name) => ({
    name, adapted: `com.github.copilot/agents/${name}.agent.md`, status: evidence.agents?.[name]?.status ?? "static-only",
    reason: evidence.agents?.[name]?.limitations ?? "Agent Plugins namespaced location; mandatory contract and scope boundary. Discovery/invocation requires separate runtime evidence.",
    evidence: evidence.agents?.[name] ?? { status: "unexecuted" },
  }));
  const data = { schemaVersion: 1, upstreamVersion: manifest.version, skills, playbooks, agents, inventory, evidence };
  put("compatibility.json", `${JSON.stringify(data, null, 2)}\n`);
  const rows = skills.map((skill) => `| [${skill.name}](${skill.adapted}) | ${skill.status} | ${skill.limitations} | ${skill.evidence.status} |`).join("\n");
  const counts = Object.fromEntries(["runtime-verified", "static-only", "partial", "unsupported"].map((status) =>
    [status, skills.filter((skill) => skill.status === status).length]));
  put("COMPATIBILITY.md", `# Copilot compatibility matrix\n\nGenerated from original pstack ${manifest.version}. All 58 original skills have entries, including disabled entries. See [adapter](${GUIDE}) and [machine-readable manifest](compatibility.json) for per-resource SHA-256 provenance, detected Cursor dependencies, 23 playbooks, 2 agents, commands and evidence. Unknown/unexecuted is never a pass. CLI evidence does not prove desktop runtime behavior.\n\n${Object.entries(counts).map(([status, count]) => `${status}: ${count}`).join("; ")}.\n\n| Original skill / adapted entry | Status | Limitations / dependencies | Execution evidence |\n| --- | --- | --- | --- |\n${rows}\n\n## Status meaning\n\nRuntime-verified means only the scenario in evidence.json. Static-only means portable guidance and checked packaging, not demonstrated behavior. Partial means a narrower workflow is mapped but named dependencies or required proofs remain unavailable/unexecuted. Unsupported means the entry is a stop-only stub; original workflow is not enabled.\n\n## Playbooks and agents\n\n${playbooks.map((book) => `- [${posix.basename(book.path)}](${book.path}): partial, unexecuted. ${book.reason}`).join("\n")}\n\n${agents.map((agent) => `- [${agent.name}](${agent.adapted}): ${agent.status}. ${agent.reason}`).join("\n")}\n`);
  return files;
}
