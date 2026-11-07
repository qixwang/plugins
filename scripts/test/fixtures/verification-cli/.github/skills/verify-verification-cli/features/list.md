# List tasks

List returns stored tasks as JSON, including completion state, without modifying the store.

## Sub-features

- `list-empty` returns `[]` when the data directory does not exist.
- `list-read-only` does not create a directory or store during the empty Doctor check.
- `list-pending` shows the added task in a fresh process without changing persisted bytes.
- `list-completed` shows the completed task in another fresh process without changing persisted bytes.

## How to get to it (user POV)

- From the fixture terminal run `node .\app.mjs --data-dir DIRECTORY list`.

## Driving it with Node CLI

Preconditions:

- The Doctor path is missing; pending/completed observations use the full helper's owned store.
- Run `node .github\skills\verify-verification-cli\scripts\verify.mjs` to capture all states.

- **Empty.** Doctor runs `node .\app.mjs --data-dir DIRECTORY list` against a
  missing directory. Require exit `0`, empty stderr, JSON `[]`, and no new directory or file.
- **Pending.** After public add, run `node .\app.mjs --data-dir DIRECTORY list`
  in a fresh process. Require exactly `[{"id":1,"title":"Review adapter","done":false}]`.
- **Completed.** After public complete, run the same list command in another
  fresh process. Require exactly `[{"id":1,"title":"Review adapter","done":true}]`.
- **Proof.** Require exit `0` and empty stderr for both observations. Compare
  `tasks.json` bytes before/after each list; they must match. Capture actual
  command output and the completed one-task array as `final.tasks.json`.

## Gotchas

- Empty list is not initialization; Doctor must never create verification state.
- Reusing an in-memory object is not a fresh-process persistence observation.
- Corrupt JSON or invalid stored task shapes fail; do not interpret failure as `[]`.
- Listing does not filter out completed tasks; assert the completed entry remains.
