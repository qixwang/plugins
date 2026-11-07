> **Copilot execution contract:** Read [the adapter](../../../../../../docs/harness/copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# LoginParallel

TLC reached 12 states and 29 steps. The chart draws 7 states and 10 arrows.
The step ThePasswordIsWrong changes Session and Tries at the same time.
The step ThePasswordIsRight changes Session and Tries at the same time.

## SignedInWhileLocked breaks
The shortest path has 5 steps:
0. Session Signed out, Tries No wrong tries
1. ThePasswordIsWrong: Session Signed out, Tries 1 wrong try
2. ThePasswordIsWrong: Session Signed out, Tries 2 wrong tries
3. ThePasswordIsWrong: Session Signed out, Tries Locked out
4. YouSubmitAPassword: Session Checking the password, Tries Locked out
5. ThePasswordIsRight: Session Signed in, Tries Locked out

## Rules that hold
TypeOK, NoDeadlock
