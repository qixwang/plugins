# Verification CLI verification map

This is the maintained source for the fixture's three user-facing features.
Read the matching recipe before driving; there is no UI or alternate entry point.

## Baseline preconditions

- Work only in this fixture with Node and the unmodified `app.mjs`.
- Run `node .github\skills\verify-verification-cli\scripts\verify.mjs doctor`.
  Require exit `0`, JSON `[]` from the app, and no directory/store creation.
- For the journey, use the full helper with no arguments. It owns a unique
  `run-data-<runId>` directory under the skill and starts with no tasks.
- The helper creates `Review adapter` through public `add`, not by seeding JSON.

## Driving conventions

- `DIRECTORY` in recipes means only the helper's absolute owned run directory.
- Each public command runs in a new process through Node `spawnSync`, no shell.
- The helper executes the recipes in add, list-pending, complete, list-completed order.
- Do not drive an existing task store or replace these public paths with internal writes.

## Proof and failure reporting

Capture actual argument arrays, stdout, stderr, exit codes, and feature IDs in
`..\evidence\<runId>\journey.json`; capture persisted JSON snapshots alongside it.
Assert exact response and persisted shapes, including ID/title preservation.
Missing preconditions or failed commands block proof; do not weaken assertions.
Cleanup removes only owned scratch data, and evidence must still be readable.
The full helper proves the positive journey and list's empty/read-only behavior;
error paths mentioned as gotchas are not claimed as verified.

## Feature entry contract

Each feature has exactly four H2s: `Sub-features`,
`How to get to it (user POV)`, `Driving it with Node CLI`, and `Gotchas`.
Every mapped sub-feature below is covered by the helper's single real journey.

## Features

- [Add](add.md): create a named pending task and confirm its persistence.
- [List](list.md): observe empty, pending, and completed state without writes.
- [Complete](complete.md): mark an existing task done and confirm persistence.
