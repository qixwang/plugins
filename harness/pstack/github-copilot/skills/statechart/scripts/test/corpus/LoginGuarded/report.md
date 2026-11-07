> **Copilot execution contract:** Read [the adapter](../../../../../../docs/harness/copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# LoginGuarded

TLC reached 8 states and 11 steps. The chart draws 7 states and 10 arrows.
The step ThePasswordIsRight changes Session and Tries at the same time.
The step ThePasswordIsWrong changes Session and Tries at the same time.

## Rules that hold
TypeOK, SignedInWhileLocked, NoDeadlock
