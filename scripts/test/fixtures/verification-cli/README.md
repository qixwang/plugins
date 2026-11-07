# Verification CLI fixture

A controlled Node-only task CLI for Copilot verification-skill generation.
No credentials, dependencies, network, accounts, or long-lived server.
Use a new isolated data directory for every proof. Never use a user's task data.

From this directory in PowerShell:

```powershell
node .\app.mjs --data-dir .\scratch-data add "Review adapter"
node .\app.mjs --data-dir .\scratch-data list
node .\app.mjs --data-dir .\scratch-data complete 1
node .\app.mjs --data-dir .\scratch-data list
```

Each command starts a fresh process; `tasks.json` persists data across processes.
Adding a task, listing tasks, and completing a task are the three user-facing
features. List is read-only and must not create a missing data directory.
The proof journey adds a named task, observes it in a new process, completes
it, and observes the completed state in another new process. Inspect the
persisted JSON too. Capture commands, stdout, exit codes, and resulting state.
Keep proof artifacts outside the scratch data directory, so they survive its
targeted cleanup. Clean only the exact scratch directory created by the run.

This fixture is not a real user's application or a browser/desktop UI test.
