> **Copilot execution contract:** Read [the adapter](copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# Copilot adaptation change record

## Scope and result

Personal fork: `https://github.com/qixwang/plugins`.
Persistent destination: `refs/heads/copilot-adaptation`.
Isolated app-managed local branch: `qixwang-pstack-copilot-adaptation`.
Starting commit: `8ecfb19f844b67a4bc7af7f66c366d57bc7b6d2b`.
Original pstack version: `0.15.36`. No upstream writes, PR, merge, primary
checkout edits, or global plugin installation are part of this work.

This is a generated, permission-aware adaptation, not a claim of complete
plugin equivalence. The whole-corpus automated dependency/provenance audit
covers every original skill resource and documentation file; manual review
focuses on the generator, model setup, history, agents, high-risk playbooks and
script boundaries. Static checks do not prove semantic equivalence or model
obedience. All 58 skills are represented in
`harness/pstack/github-copilot/COMPATIBILITY.md` and `compatibility.json`.

| Skill-level result | Count | Meaning |
| --- | --- | --- |
| Runtime-verified | 1 | `create-verification-skill`, only on the controlled Node CLI fixture. |
| Static-only | 33 | 24 principles plus benchmark-checklist, bro, correct, in-your-own-words, sharpen, tdd, technical-writing, typescript-best-practices, unslop. Portable guidance, not executed workflow passes. |
| Partial / degraded | 22 | Individually named in the matrix; missing or unexecuted model, history, isolation, MCP, runtime, authoring or publication dependencies remain gates. |
| Unsupported | 2 | `make-bot-ui`, `ketchup-video`; stop-only entries prevent false success. |

`comment-sicko` also has a bounded top-level CLI selection/read-only smoke
proof. That is agent evidence, not an additional runtime-verified skill.
`poteto-agent`, task-level custom-agent delegation, all 23 full playbooks,
multi-model panels, cloud workflows and desktop behavior remain unexecuted.

## Auditable changes

| ID | Files / surface | Why and capability mapping | Verification / remaining limitation |
| --- | --- | --- | --- |
| C01 | `scripts/pstack-copilot.mjs`; `harness/pstack/github-copilot/**` | Generate a distinct Copilot tree from original skills/resources/docs, with an unchanged version and personal-fork metadata; avoid hand-maintained wholesale copies. | Real CLI mount lists enabled pstack and all 58 skill entries; unsupported entries are deliberately discoverable stop stubs. |
| C02 | `scripts/generate-pstack-harness-trees.mjs` | Integrate both harnesses in one render/check. Rebuild only the two explicitly named generated subtrees, not all `harness/pstack`, so Copilot regeneration and Claude regeneration coexist. | Repeated generation/check; original Cursor entry files are not transformed. Claude generated semantic change is the additive fork-adaptation README link. |
| C03 | `scripts/pstack-files.mjs`; shared generator | Normalize Windows path keys and text CRLF to LF; obtain executable source modes from git rather than Windows stat bits. On Unix use actual filesystem executable bits so chmod drift remains detectable. | Windows generation/check and source/resource hashes pass. On Windows native executable-mode comparison is skipped; Unix check retains it, and generated shell modes are staged explicitly. No global git config changes. |
| C04 | Every generated Markdown instruction entry/reference/playbook/agent; `pstack/docs/harness/copilot.md` | Inject mandatory adapter contract at every entry, not just a top-level guide. Resolve links from file location; require absolute paths in delegates. Map Task/AskQuestion/todos to live schema-aware Copilot operations and separate agents from app sessions. | Contract/link tests cover all generated Markdown instruction files. Task/background/MCP/isolation behavior is explicitly unexecuted, not inferred from a CLI load. |
| C05 | Generated verification generator and maintenance entries/resources | Change project skills to `.github/skills`, preserve feature-map examples, Launch/Doctor/Drive/Evidence/Cleanup/Helpers and one executed journey gate. Maintenance still requires every mapped feature's source/live coverage. | Copilot generated and executed the fixture skill with three feature files; independent Node tests rerun it. No real-user-app, browser, desktop, mobile or auth proof. |
| C06 | `scripts/test/fixtures/verification-cli/**`; `scripts/record-pstack-copilot-proof.mjs`; `pstack/docs/harness/copilot/proof/fixture-journey.json` | Controlled public add/list/complete CLI with persistent JSON and no dependencies, credentials or network. Commit generated skill/helper; keep raw absolute-path evidence local and record redacted observed proof. | Five separate CLI processes, exact outputs/persisted states, read-only Doctor and surviving snapshots after owned-data cleanup. Evidence is not removed by normal proof cleanup. |
| C07 | `pstack/docs/harness/copilot/setup-pstack.md`; generated setup entry | Replace Cursor home `.mdc` rule and hard-coded models with explicit project JSON roles. Models, reasoning and context are separate; empty defaults preserve harness `/subagents` preferences. | Structural/frontmatter and explicit-confirmation checks. No actual preference selected or persisted; interactive selection/model application remains unexecuted. |
| C08 | Namespaced generated `com.github.copilot/agents/*.agent.md` | Agent Plugins custom-agent location and extension; remove Cursor `is_background`, remove private cache fallback, bound parent-owned poteto scope, make comment-sicko report-only. | `--agent pstack:comment-sicko` read-only fixture smoke succeeds with absolute adapter path. No task-level namespace assumption; poteto-agent runtime unexecuted. |
| C09 | Adapter history rules; generated recall/reflect/automate-me/show-me-your-work/session-pickup | Disable Cursor transcript path mining. Use current conversation, explicit export/digest or bounded repository-scoped `session_store_sql`; full-transcript audits stay incomplete without exact records. Direct skill authoring replaces external Cursor create-skill. | No unrelated private history read or copied into fixture/docs. History mining, panel reviews and description optimization are unexecuted/degraded. |
| C10 | Adapter authorization and playbook contract; per-playbook matrix | Original autonomy, commits, ready PRs, reset/amend/force-push, deletion, messages, schedules and merges cannot grant Copilot permission. Separate cloud runtime from background and output isolation. | No publication beyond the user's requested fork push; no PR, merge, automation, fleet or unrequested external message from a skill. Policy text is not a sandbox. |
| C11 | Dependency table; unsupported generated entries | External control/deslop/create-skill are not bundled. Use proved project harness and narrower bundled review/prose checks, with limits. Disable Cursor webhook/secret/wake and unproved video workflows. | No webhook, credential, Tailscale, public binding, renderer or fabricated media result. Two stop stubs checked. |
| C12 | Script/resource provenance and partial entries | Preserve upstream scripts without pretending Bun bootstrap/watch-pr, Java/TLC/mise/Pele or the space-unsafe fetching/history audit work on Windows. Node parsing alone cannot validate POSIX process-group shutdown. | Bun, jq, Java, mise, ffmpeg not found on PATH during bounded probes. No toolchain installed. Formal proof and unsafe worktree-audit remain unavailable/unexecuted. |
| C13 | `.github/plugin/marketplace.json`; `pstack/docs/harness/copilot-installation.md`; `pstack/README.md` | Separate personal-fork Copilot catalog, safe local mounting first, optional explicit persistent install, desktop instructions bounded by official docs. | Mount and local catalog add/browse verified in isolated session config/cache only. No personal/global registration or plugin installation, remote catalog fetch or desktop loading. Existing Cursor/Claude catalogs unchanged. |
| C14 | `scripts/test/pstack-copilot.test.mjs`; `.github/workflows/validate-plugins.yml` | CI checks exhaustive manifest/resource provenance, entry contracts, references, no unreviewed skill/playbook passes, proof gates and generated helper behavior. | Targeted Node checks and reproducible generation. No paid prompts in CI; runtime fixture artifact originates from one explicit bounded prompt. |

## Observed proof and recovery

1. Initial unattended read-only shell inspection was denied because an
   interactive approval could not be presented. Work paused with no file edits.
   Interactive retry succeeded. Origin and live destination SHA matched the
   personal fork; local branch was kept after destination clarification.
2. Windows generation exposed upstream slash-key/CRLF-frontmatter/native-mode
   assumptions. Shared normalization and git-mode lookup fixed those mechanisms.
   Link checks exposed omitted automation links; they remain upstream reference
   links, not executable bundled Copilot capabilities.
3. One bounded CLI prompt read the mounted generator, adapter and three feature
   map references, inspected only the fixture, generated its skill/helper/map,
   executed public CLI mutations and persistence checks, and retained evidence.
   The model was administrator-selected; no override or preference was chosen.
4. Parent-side Node checks reran the generated helper and independently checked
   map shape, exact outputs, persistence, cleanup and evidence. A test initially
   assumed the wrong harness-heading noun; it was corrected to the generated
   `Driving it with Node CLI`, preserving the specified four-section contract.
   A separate isolated broken copy left the completion flag false: the helper
   failed with a nonzero exit, removed its owned data and retained blocked
   evidence. The original fixture app was not edited.
5. First selected-agent smoke had no absolute adapter path and blocked without
   inspecting code or editing. Supplying the actual mounted absolute path in a
   new bounded prompt let it read the adapter and app; it reported zero comments
   and zero edits. This demonstrates why delegates must receive absolute paths.

Three bounded prompt sessions reported 22.81 AI credits total. No additional
model calls, multi-model fan-outs, full dynamic workflows or overnight sessions
are implied by the matrix. Raw session exports stay in this session's artifact
directory, not in the public fork.

The existing plugin validator initially lacked Ajv. Only after that actual
missing-dependency failure, its Ajv/ajv-formats dependencies were restored
locally with `--no-save --package-lock=false --ignore-scripts`. No global
package or dependency manifest was changed. Original plugin validation and
documentation checks then passed.

Staging checks exposed inherited single trailing spaces and an extra final
blank line in newly generated Markdown. The Copilot renderer removes those
non-semantic bytes only in its output; original Cursor sources and intentional
Markdown double-space line breaks are preserved. Staged text is normalized
through Git's existing checkout policy, without changing global configuration.

Later contract edits clarified relative-link resolution and the Windows
statechart shutdown limitation. Those text clarifications were statically
checked; the skill runtime claim is limited to the preserved generator body
and the committed fixture journey, not every latest adapter rule. The proof
records the generator source digest, and regeneration refuses a stale source
digest or non-ready report. Changes to adapter semantics still require fresh
applicable runtime evidence rather than relying on this narrow CLI proof.

## Reproduction and upstream maintenance

From the fork root:

```powershell
node --test scripts\test\pstack-copilot.test.mjs
node scripts\generate-pstack-harness-trees.mjs
node scripts\generate-pstack-harness-trees.mjs --check
```

The manifest records normalized-text SHA-256 for each original resource and
explicit assessments for every skill/playbook. New skill/playbook names stop
generation until assessed. When upstream changes existing resources, inspect
the digest/dependency changes, update affected mappings and rerun the checks.
Never carry a previous runtime label onto a changed generator/helper without
fresh applicable proof. The committed fixture is evidence, not a real app
stand-in with production authentication/deployment guarantees.

For exact installation, usage and unverified desktop boundaries see
[installation instructions](copilot-installation.md). For the complete per-skill
list see the generated matrix and JSON, not an installation-success inference.
