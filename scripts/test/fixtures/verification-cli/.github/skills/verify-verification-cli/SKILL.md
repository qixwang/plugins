---
name: verify-verification-cli
description: "Verify the controlled Verification CLI fixture through public Node CLI add, list, and complete commands with persisted-state evidence and isolated cleanup."
---

# Verify Verification CLI

Scope: only this fixture, not other projects or browser/desktop applications.
Read [the feature map](features/README.md) before driving. Run all commands from
the fixture directory in PowerShell. Node is the only prerequisite; no build,
dependencies, credentials, network, server, or global configuration is needed.
Never modify `app.mjs` or use existing user task data.

## Launch

Run the bounded executable helper:

```powershell
node .github\skills\verify-verification-cli\scripts\verify.mjs
```

It first runs Doctor against a missing, unique
`.github\skills\verify-verification-cli\run-data-<runId>` path, then creates only
its own empty data directory. Each app command starts a fresh Node process.
Usable means the public `list` command exits `0`, returns `[]`, and creates
neither the missing directory nor `tasks.json`. The first `add` initializes
the store; there are no migrations or seeds. Teardown is in the helper's
`finally` block, including failed journeys. No long-lived process is started.

## Doctor

Run the read-only check, which creates no data or evidence state:

```powershell
node .github\skills\verify-verification-cli\scripts\verify.mjs doctor
```

It checks the fixture app entry, records the Node version and exact app path,
and spawns `node app.mjs --data-dir <missing-run-directory> list`.
Require exit `0`, no signal, empty stderr, JSON `[]`, and continued absence of
both directory and store. A failing check blocks driving; never initialize a
store just to make Doctor pass. Doctor checks the empty isolated instance,
not the health of someone else's existing store.

## Drive

The helper supplies the absolute owned run directory as `DIRECTORY` and calls
these documented public commands with argument arrays and no shell:

```powershell
node .\app.mjs --data-dir DIRECTORY add "Review adapter"
node .\app.mjs --data-dir DIRECTORY list
node .\app.mjs --data-dir DIRECTORY complete 1
node .\app.mjs --data-dir DIRECTORY list
```

Require every CLI exit code to be `0`, stderr empty, and no process signal.
Add must return exactly `{"id":1,"title":"Review adapter","done":false}`;
the next fresh process must list exactly that one task. Complete must return
the same ID/title with `done:true`; another fresh process must list exactly
that completed task. Inspect `tasks.json` after add, complete, and the final
list: require exactly one object with only `id`, `title`, and `done` and the
expected values. Both lists must leave the persisted bytes unchanged.
No internal setters, mocks, weak substring matches, or skipped assertions.

## Evidence

Each full run writes
`.github\skills\verify-verification-cli\evidence\<runId>\journey.json` and
`after-add.tasks.json`, `after-complete.tasks.json`, `final.tasks.json`.
The report records feature IDs, actual executable/argument arrays, cwd,
stdout, stderr, exit codes, signals, errors, passed assertions, and snapshots.
Snapshots copy real persisted bytes; they are not synthetic results.
Commands and resulting user-visible and stored state must agree.

`ready` requires the entire journey and post-cleanup evidence checks.
Failure prints the actual error, exits nonzero, and marks an available report
`blocked`. A blocked prerequisite is not a passed or skipped proof. After
cleanup the helper rereads every captured snapshot and its final report.
This proves only the controlled local CLI on the current host.

## Cleanup

The helper tracks ownership only after exclusive creation of the unique data
directory. In `finally`, it checks the exact direct-child path and rejects a
symlink before removing that directory alone with `node:fs.rmSync`.
It asserts the path no longer exists. It never removes the evidence tree,
uses wildcards, deletes a shared parent, or kills processes by name.

If cleanup fails, the run is blocked: retain the report's exact
`dataDirectory` for investigation, verify ownership, and remove only that
named run directory. Never broaden cleanup to neighboring runs. All app
children are synchronous and bounded by a ten-second timeout.

## Helpers

`scripts\verify.mjs` is a Node-executable, dependency-free helper with two
supported invocations: the full run and read-only `doctor` shown above.
It resolves paths from its own location, uses `spawnSync(process.execPath, ...)`
without a shell, and confines all writes to this local skill directory.
Unknown arguments fail rather than selecting an implicit mode.

Maintain the feature map when public commands change; the pstack
`maintain-verification-skill` entry describes that maintenance loop.
