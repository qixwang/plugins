# pstack harness tree

This folder is generated from `pstack/skills`, `pstack/agents`, `pstack/docs/guide`, `pstack/docs/harness/claude-code.md`, `pstack/README.md`, `pstack/LICENSE`, and `pstack/plugin.json`. Do not edit it by hand.

Cursor uses `pstack/` directly, and Claude Code installs `claude-code/`. The tree leaves out the rest of `pstack/`, such as `pstack/automations` and `pstack/assets`. A relative link to a pstack file that the tree leaves out points at that file on GitHub `main` instead.

After editing those sources, run `node scripts/generate-pstack-harness-trees.mjs` from the repository root and commit the result.

GitHub Copilot uses the separately generated `github-copilot/` tree. Its adapter,
per-skill compatibility matrix, resource provenance, and evidence are generated
by `scripts/pstack-copilot.mjs` from the same original sources plus
`pstack/docs/harness/copilot/`. Neither tree is a runtime compatibility claim.
