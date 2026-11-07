# Add a task

Add saves a named task and returns its ID so a user can find or complete it later.

## Sub-features

- `add-create` creates `Review adapter` with ID `1` and `done:false` in an empty store.
- `add-persist` makes that exact task visible to a fresh list process and in `tasks.json`.

## How to get to it (user POV)

- From the fixture terminal run `node .\app.mjs --data-dir DIRECTORY add "Review adapter"`.

## Driving it with Node CLI

Preconditions:

- Doctor passed without creating state; `DIRECTORY` is the helper's new empty store.
- Run `node .github\skills\verify-verification-cli\scripts\verify.mjs` for the owned journey.

- **Create.** Run `node .\app.mjs --data-dir DIRECTORY add "Review adapter"`.
  Require exit `0`, empty stderr, and exactly `{"id":1,"title":"Review adapter","done":false}`.
- **Observe.** Run `node .\app.mjs --data-dir DIRECTORY list` in a new process.
  Require exit `0` and exactly `[{"id":1,"title":"Review adapter","done":false}]`.
- **Proof.** Read `DIRECTORY\tasks.json`; require that exact one-task array with
  no extra fields. Retain the real bytes as `after-add.tasks.json` and command
  records in the evidence report.

## Gotchas

- IDs are derived from stored tasks; an existing store invalidates the ID `1` precondition.
- Titles are joined and trimmed; blank titles fail. This journey tests a nonblank title.
- Do not write seed JSON or accept stdout alone as persistence proof.
- The journey subsequently completes this task; retain the pending-state evidence.
