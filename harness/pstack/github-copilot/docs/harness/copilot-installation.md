> **Copilot execution contract:** Read [the adapter](copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# Install and use the personal-fork Copilot adapter

Use `qixwang/plugins` branch `copilot-adaptation`, not upstream Cursor pstack.
The adapter is generated at `harness/pstack/github-copilot`. Cursor still uses
`pstack/`; Claude still uses its separate generated tree. This work does not
install anything globally.

## First useful capability: verification-skill generation

In a checkout of this fork branch, obtain the absolute plugin path:

```powershell
$plugin = (Resolve-Path .\harness\pstack\github-copilot).Path
```

Then change to the target project's intended isolated checkout and launch:

```powershell
copilot --plugin-dir $plugin -i "Use create-verification-skill for this checkout. Read the mounted Copilot adapter and feature-map references first. Generate .github\skills\verify-<app> with Launch, Doctor, Drive, Evidence, Cleanup and Helpers, plus a top 3-5 feature map. Prove one actual mapped user journey and retain evidence after cleanup. Report draft or blocked if any required step cannot run. Do not publish, change global settings, or touch another checkout."
```

Approve only the actions and paths that match your target. No `--allow-all`,
automatic install, or model override is needed. Check the catalog source/path
if another project/personal/plugin skill has the same name: first-found wins.
If discovery is ambiguous, instruct Copilot to read the absolute
`$plugin\skills\create-verification-skill\SKILL.md` and adapter explicitly.

The output is project-local; it is not a universal pre-generated verifier.
The generator must inspect your app and prove its instructions there.
The shipped runtime proof covers only the controlled Node CLI fixture.

## Reproduce the already-proved fixture without another model call

From the fork root:

```powershell
node scripts\generate-pstack-harness-trees.mjs --check
node --test scripts\test\pstack-copilot.test.mjs
Set-Location .\scripts\test\fixtures\verification-cli
node .github\skills\verify-verification-cli\scripts\verify.mjs doctor
node .github\skills\verify-verification-cli\scripts\verify.mjs
```

Each run creates new ignored evidence and removes only its owned data directory.
The original Copilot-generated skill and helper are committed for inspection;
redacted observed results are in `pstack/docs/harness/copilot/proof/fixture-journey.json`.
No account, server, dependency install or user data is involved.

## Optional CLI installation, only when you choose it

Local `--plugin-dir` mounting is the tested no-install route above. For a
persistent install, the fork supplies a separate Copilot marketplace:

```powershell
copilot plugin marketplace add "qixwang/plugins#copilot-adaptation"
copilot plugin marketplace browse qixwang-pstack-copilot
copilot plugin install pstack@qixwang-pstack-copilot
```

These commands intentionally change your personal Copilot configuration; they
were not run against personal configuration. Local catalog registration and
browsing were tested using fresh isolated session configuration/cache only,
without installing a plugin. Remote branch registration is unexecuted.
Confirm the catalog points to
`harness/pstack/github-copilot`, not the original Cursor or Claude tree.
The registry is `.github/plugin/marketplace.json`; the existing Cursor and
Claude catalogs are unchanged. Organization policy may prohibit an install.

## Desktop app

Official documentation says repository/CLI-configured skills are available in
the app. For the generated project skill, open that target checkout/session and
verify `verify-<app>` appears under **Customize > Skills** or in the skill catalog.
For the whole plugin, use **Customize**, its marketplace settings control, and
the fork marketplace source on `copilot-adaptation`; then find the plugin and
install it only if you choose. Inspect its source before installation.
If the app cannot select the branch, use the project-local skill route rather
than installing the fork's default-branch Cursor/Claude copy.

Desktop marketplace loading, desktop custom-agent invocation, and live app behavior
were not tested here. CLI discovery and CLI fixture proof are not desktop proof.
For custom agents, CLI selected `pstack:comment-sicko` successfully; a delegate
must receive absolute adapter and entry paths. No task-level custom-agent
namespace or schema is assumed from that top-level result.

## What's usable, limited, or unavailable

Read the exhaustive [generated matrix](https://github.com/qixwang/plugins/blob/copilot-adaptation/harness/pstack/github-copilot/COMPATIBILITY.md).
It contains one entry for each original skill and links every adapted entry.
`compatibility.json` also records all source resources and their normalized
SHA-256 digests, 23 playbooks, 2 agents and execution evidence.

Only `create-verification-skill` has an executed skill workflow, scoped to the
fixture. Static-only entries are portable guidance whose end-to-end execution
has not been checked. Partial entries preserve the named missing dependencies
and required proof gates. `make-bot-ui` and `ketchup-video` are stop-only stubs,
not success-shaped fallbacks.

See [the execution adapter](copilot.md), [change record](copilot-changes.md), and
[observed evidence](copilot/evidence.json). No unknown or skipped step is a pass.

## Official references consulted

- [CLI plugin formats, loading and commands](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference).
- [Shared plugin and marketplace format](https://docs.github.com/en/copilot/reference/plugin-and-marketplace-reference).
- [Desktop customization and skill availability](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app).

These establish documented support, not a substitute for the runtime evidence.
