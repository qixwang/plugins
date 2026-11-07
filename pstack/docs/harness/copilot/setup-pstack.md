---
name: setup-pstack
description: "Configure explicit project-scoped pstack Copilot model roles without changing global Copilot preferences."
---

# Setup pstack for Copilot

1. Inspect the live task schema and applicable harness preferences. Do not
   prescribe models from Cursor or from the parent's current model. If the
   schema does not expose a usable model selector, say so and preserve defaults.
2. Read `.github/pstack-models.json` in this checkout if it exists. Report
   malformed JSON rather than overwriting it. The default for every role is an
   empty object, meaning no model, reasoning, or context override.
3. Ask one question at a time with `ask_user`: keep harness defaults
   (recommended), or select an explicitly available model for a named role.
   Only collect reasoning effort/context when the selected model and live
   schema support them. Do not guess entitlements or conflate effort with a
   model ID. Collect panel seats individually; explain their cost and that
   default-model seats do not constitute a multi-model panel.
4. Show all choices, changed roles, and any unsupported previous choices. Ask
   for confirmation before writing. If questions/approval cannot be obtained,
   leave configuration unchanged; never silently persist choices.
5. Write `.github/pstack-models.json` atomically using repository-standard file
   editing, preserving unrelated files. No home directory or `.cursor` writes.
   Use this data shape, with all roles present and each empty by default:

```json
{
  "version": 1,
  "roles": {
    "feature, refactoring": {},
    "bug-fix": {},
    "perf-issue": {},
    "hillclimb": {},
    "judgment and prose": {},
    "hardest tasks": {},
    "how explorer": {},
    "how explainer": {},
    "why investigators": {},
    "why synthesizer": {},
    "reflect tooling": {},
    "reflect judgment, divergent, synthesizer": {},
    "arena runners": [],
    "arena cross-judge pool": [],
    "swarm workers": {},
    "architect runners": [],
    "interrogate reviewers": []
  }
}
```

Single-role choices may contain only `model`, `reasoning_effort` and
`context_tier`, with values explicitly selected and validated in this session.
Panel roles are arrays of such objects, not comma-delimited Cursor slugs.
Reject unknown roles/fields, invalid version, malformed lists, or unavailable
choices. Empty panel arrays mean no explicit panel configuration; do not infer
permission to launch a panel.

6. Re-read and validate the saved JSON. Explain that pstack reads it before
   delegating; it is not an automatically applied Copilot rule or a change to
   `/subagents`. Do not promise a changed model until a real invocation proves
   it. Optional verification-skill generation requires a user request; no
   global plugin installation, PR, or model preference changes are implied.
