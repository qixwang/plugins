# Complete a task

Complete marks an existing task done while preserving its ID and title for later listing.

## Sub-features

- `complete-task` returns ID `1`, title `Review adapter`, and `done:true`.
- `complete-persist` preserves that state in `tasks.json` and a fresh list process.

## How to get to it (user POV)

- Find the task ID with `node .\app.mjs --data-dir DIRECTORY list`.
- Run `node .\app.mjs --data-dir DIRECTORY complete 1`.

## Driving it with Node CLI

Preconditions:

- The helper added `Review adapter` to its empty owned store and a fresh list
  confirmed ID `1`, `done:false`. Missing tasks block this recipe.
- Run `node .github\skills\verify-verification-cli\scripts\verify.mjs` for the full journey.

- **Complete.** Run `node .\app.mjs --data-dir DIRECTORY complete 1`.
  Require exit `0`, empty stderr, and exactly `{"id":1,"title":"Review adapter","done":true}`.
- **Observe.** Run `node .\app.mjs --data-dir DIRECTORY list` in a new process.
  Require exit `0`, empty stderr, and exactly `[{"id":1,"title":"Review adapter","done":true}]`.
- **Proof.** Inspect `DIRECTORY\tasks.json` after completion and again after
  list. Require exactly that one-task array, no extra fields, unchanged ID/title,
  and unchanged bytes across the list. Keep `after-complete.tasks.json`,
  `final.tasks.json`, and command records outside the scratch directory.

## Gotchas

- `complete` needs an existing numeric ID; missing IDs fail, not create tasks.
- Do not silently add a replacement task if the pending-task precondition is absent.
- A completion response alone does not prove persistence; inspect both disk and fresh list.
- Cleanup must not remove the evidence of pending and completed states.
