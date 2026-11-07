# Copilot compatibility matrix

Generated from original pstack 0.15.36. All 58 original skills have entries, including disabled entries. See [adapter](docs/harness/copilot.md) and [machine-readable manifest](compatibility.json) for per-resource SHA-256 provenance, detected Cursor dependencies, 23 playbooks, 2 agents, commands and evidence. Unknown/unexecuted is never a pass. CLI evidence does not prove desktop runtime behavior.

runtime-verified: 1; static-only: 33; partial: 22; unsupported: 2.

| Original skill / adapted entry | Status | Limitations / dependencies | Execution evidence |
| --- | --- | --- | --- |
| [architect](skills/architect/SKILL.md) | partial | Independent design exploration works only with available delegation; model-diverse runners require explicit choices. | unexecuted |
| [arena](skills/arena/SKILL.md) | partial | Isolated candidate outputs and cross-family judging require supported session/model capabilities; same-model runs are degraded. | unexecuted |
| [automate-me](skills/automate-me/SKILL.md) | partial | Scoped history and direct skill authoring replace Cursor mining/create-skill; subjective output needs user approval. | unexecuted |
| [benchmark-checklist](skills/benchmark-checklist/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [blast-radius](skills/blast-radius/SKILL.md) | partial | Independent readers depend on delegation availability; static routing has not been runtime exercised. | unexecuted |
| [bro](skills/bro/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [correct](skills/correct/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [create-formal-verification-skill](skills/create-formal-verification-skill/SKILL.md) | partial | No real verifier/counterexample journey executed; missing Java/TLC/tool setup prevents a ready formal proof. | unexecuted |
| [create-verification-skill](skills/create-verification-skill/SKILL.md) | runtime-verified | Verified only on a Node-only local CLI on Windows, not a real user's app. Browser, desktop UI, mobile, auth, remote deployment and other projects remain unexecuted. | runtime-verified |
| [figure-it-out](skills/figure-it-out/SKILL.md) | partial | Bespoke playbook drafting retained; external authoring, model panels and execution depend on current permissions. | unexecuted |
| [how](skills/how/SKILL.md) | partial | Read-only schema-aware investigation retained; delegation/model-diversity not runtime verified. | unexecuted |
| [in-your-own-words](skills/in-your-own-words/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [interrogate](skills/interrogate/SKILL.md) | partial | Adversarial review retained; explicitly selected diverse models and independent reviews are unverified. | unexecuted |
| [ketchup](skills/ketchup/SKILL.md) | partial | Current-chat recap retained; external visualize/media and live PR/session reads require available tools. | unexecuted |
| [ketchup-video](skills/ketchup-video/SKILL.md) | unsupported | No available renderer/frame/timing proof validated; text ketchup is separate, not a video pass. | unexecuted |
| [maintain-formal-verification-skill](skills/maintain-formal-verification-skill/SKILL.md) | partial | Must prove every model/check and broken variant; toolchain unavailable and all-feature run unexecuted. | unexecuted |
| [maintain-verification-skill](skills/maintain-verification-skill/SKILL.md) | partial | Project path corrected; full feature coverage and independent source wave unexecuted; publishing is opt-in. | unexecuted |
| [make-bot-ui](skills/make-bot-ui/SKILL.md) | unsupported | Cursor webhook routines, sender-key secret cards and wake protocol have no verified Copilot equivalent. | unexecuted |
| [no-comments](skills/no-comments/SKILL.md) | partial | Agent is report-only until authorized edits; custom-agent delegation is not assumed. | unexecuted |
| [poteto-help](skills/poteto-help/SKILL.md) | partial | Original catalog remains background reference; use Copilot guide/matrix for installation, paths and supported workflows. | unexecuted |
| [poteto-mode](skills/poteto-mode/SKILL.md) | partial | 23 playbooks retained with mandatory guard; external deslop/control skills, Cursor automations/cloud, watchers and unsafe audits are not equivalent. | unexecuted |
| [principle-attack-the-premise](skills/principle-attack-the-premise/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-boundary-discipline](skills/principle-boundary-discipline/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-build-the-lever](skills/principle-build-the-lever/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-encode-lessons-in-structure](skills/principle-encode-lessons-in-structure/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-exhaust-the-design-space](skills/principle-exhaust-the-design-space/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-experience-first](skills/principle-experience-first/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-explain-the-number](skills/principle-explain-the-number/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-fix-root-causes](skills/principle-fix-root-causes/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-foundational-thinking](skills/principle-foundational-thinking/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-guard-the-context-window](skills/principle-guard-the-context-window/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-laziness-protocol](skills/principle-laziness-protocol/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-make-operations-idempotent](skills/principle-make-operations-idempotent/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-migrate-callers-then-delete-legacy-apis](skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-minimize-reader-load](skills/principle-minimize-reader-load/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-model-the-domain](skills/principle-model-the-domain/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-never-block-on-the-human](skills/principle-never-block-on-the-human/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-outcome-oriented-execution](skills/principle-outcome-oriented-execution/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-prove-it-works](skills/principle-prove-it-works/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-redesign-from-first-principles](skills/principle-redesign-from-first-principles/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-separate-before-serializing-shared-state](skills/principle-separate-before-serializing-shared-state/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-sequence-verifiable-units](skills/principle-sequence-verifiable-units/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-subtract-before-you-add](skills/principle-subtract-before-you-add/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-test-behavior-not-implementation](skills/principle-test-behavior-not-implementation/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [principle-type-system-discipline](skills/principle-type-system-discipline/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [recall](skills/recall/SKILL.md) | partial | Only repository-scoped session queries, current conversation or explicit exports; private transcript filesystem mining disabled. | unexecuted |
| [reflect](skills/reflect/SKILL.md) | partial | Scoped conversation/digest and direct authoring supported in principle; full transcript audit, model panel and approvals unexecuted. | unexecuted |
| [setup-pstack](skills/setup-pstack/SKILL.md) | partial | Native explicit project JSON flow supplied; interactive selection and actual role-model application unexecuted. | unexecuted |
| [sharpen](skills/sharpen/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [show-me-your-work](skills/show-me-your-work/SKILL.md) | partial | TSV trail retained; exact transcript and cross-family independent audit require capabilities not proved here. | unexecuted |
| [statechart](skills/statechart/SKILL.md) | partial | Bundled Node-capable wrapper retained; Java/TLC/mise bootstrap and Pele unverified; POSIX process-group shutdown is not Windows-native. | unexecuted |
| [swarm](skills/swarm/SKILL.md) | partial | Task mapping retained; cloud isolation and multi-model/race semantics need explicit capabilities and scope. | unexecuted |
| [tdd](skills/tdd/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [teach](skills/teach/SKILL.md) | partial | Code learning workflow retained; external tools/delegation and authoring routes must be available. | unexecuted |
| [technical-writing](skills/technical-writing/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [typescript-best-practices](skills/typescript-best-practices/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [unslop](skills/unslop/SKILL.md) | static-only | Portable instructions; packaging/static checks only, not an end-to-end runtime pass. | unexecuted |
| [why](skills/why/SKILL.md) | partial | Evidence categories use live tool discovery; absent MCP categories remain gaps, not fabricated searches. | unexecuted |

## Status meaning

Runtime-verified means only the scenario in evidence.json. Static-only means portable guidance and checked packaging, not demonstrated behavior. Partial means a narrower workflow is mapped but named dependencies or required proofs remain unavailable/unexecuted. Unsupported means the entry is a stop-only stub; original workflow is not enabled.

## Playbooks and agents

- [authoring-a-skill.md](skills/poteto-mode/playbooks/authoring-a-skill.md): partial, unexecuted. Direct Copilot project-skill authoring replaces external create-skill; optimization-loop equivalence unverified. Live playbook unexecuted.
- [autonomous-run.md](skills/poteto-mode/playbooks/autonomous-run.md): partial, unexecuted. Bounded user scope only; no overnight permission escalation or implicit publishing/merge. Live playbook unexecuted.
- [autopilot-full.md](skills/poteto-mode/playbooks/autopilot-full.md): partial, unexecuted. Cursor autopilot machinery has no 1:1 mapping; explicit Copilot delegation and permissions required. Live playbook unexecuted.
- [autopilot-stack.md](skills/poteto-mode/playbooks/autopilot-stack.md): partial, unexecuted. No implicit stack/merge authorization; every PR verification and remote action stays gated. Live playbook unexecuted.
- [babysit.md](skills/poteto-mode/playbooks/babysit.md): partial, unexecuted. Existing gh checks/comments can be read; Bun watcher, Cursor Bugbot launch and routine control unverified. Live playbook unexecuted.
- [bug-fix.md](skills/poteto-mode/playbooks/bug-fix.md): partial, unexecuted. Actual surface reproduction required; missing control harness must be generated and proved, not skipped. Live playbook unexecuted.
- [eval.md](skills/poteto-mode/playbooks/eval.md): partial, unexecuted. Bounded fixture eval possible; original environment/model controls and large fan-outs unverified. Live playbook unexecuted.
- [feature.md](skills/poteto-mode/playbooks/feature.md): partial, unexecuted. Code workflow retained; external control/deslop, model overrides and publishing defaults replaced/gated. Live playbook unexecuted.
- [hillclimb.md](skills/poteto-mode/playbooks/hillclimb.md): partial, unexecuted. Real baseline and before/after metric required; no unrequested indefinite iteration or auto-commits. Live playbook unexecuted.
- [investigation.md](skills/poteto-mode/playbooks/investigation.md): partial, unexecuted. Read-only work retained; no fetching audit, external writes or automatic delegation. Live playbook unexecuted.
- [multi-phase-plan.md](skills/poteto-mode/playbooks/multi-phase-plan.md): partial, unexecuted. Plan/check-plan resources retained; task-level isolation and multi-phase runtime unverified. Live playbook unexecuted.
- [opening-a-pr.md](skills/poteto-mode/playbooks/opening-a-pr.md): partial, unexecuted. Only explicit user-requested publication to the confirmed fork/base; no default PR or branch amendment. Live playbook unexecuted.
- [orchestrate.md](skills/poteto-mode/playbooks/orchestrate.md): partial, unexecuted. Standing fleet/workflow/session scheduling not enabled by skill invocation; requires explicit delegation. Live playbook unexecuted.
- [pause-safely.md](skills/poteto-mode/playbooks/pause-safely.md): partial, unexecuted. Preserve user edits and owned state; no forced reset, broad cleanup or external messages by default. Live playbook unexecuted.
- [perf-issue.md](skills/poteto-mode/playbooks/perf-issue.md): partial, unexecuted. Measurement protocol retained; runtime/control tools must be present and evidence produced. Live playbook unexecuted.
- [prototype.md](skills/poteto-mode/playbooks/prototype.md): partial, unexecuted. Owned scoped prototype possible; unsupported external control skill cannot stand in for real proof. Live playbook unexecuted.
- [refactoring.md](skills/poteto-mode/playbooks/refactoring.md): partial, unexecuted. Behavior preservation still required; no external deslop equivalence or automatic publication. Live playbook unexecuted.
- [runtime-forensics.md](skills/poteto-mode/playbooks/runtime-forensics.md): partial, unexecuted. Requires authorized live instance/instrumentation; no UI/process assumptions or primary-user process manipulation. Live playbook unexecuted.
- [session-pickup.md](skills/poteto-mode/playbooks/session-pickup.md): partial, unexecuted. Only exact scoped conversation/export or session queries; Cursor transcript filesystem mining disabled. Live playbook unexecuted.
- [shipping.md](skills/poteto-mode/playbooks/shipping.md): partial, unexecuted. Independent per-PR verification and explicit merge authorization required; green CI alone is not permission. Live playbook unexecuted.
- [trace-forensics.md](skills/poteto-mode/playbooks/trace-forensics.md): partial, unexecuted. User-provided artifact analysis possible; no unrelated private trace/transcript search. Live playbook unexecuted.
- [visual-parity.md](skills/poteto-mode/playbooks/visual-parity.md): partial, unexecuted. Real screenshots and target renderer/harness required; CLI fixture does not verify UI parity. Live playbook unexecuted.
- [worktree-cleanup.md](skills/poteto-mode/playbooks/worktree-cleanup.md): partial, unexecuted. Original fetching/space-unsafe private-history audit disabled; no inferred deletion safety or unattended deletion. Live playbook unexecuted.

- [poteto-agent](com.github.copilot/agents/poteto-agent.agent.md): static-only. Namespaced file, contract and parent-owned scope checked; no runtime invocation executed.
- [comment-sicko](com.github.copilot/agents/comment-sicko.agent.md): runtime-verified. Top-level CLI agent selection only. task agent_type discovery/delegation, substantive comment review and desktop invocation remain unexecuted.
