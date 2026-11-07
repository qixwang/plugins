> **Copilot execution contract:** Read [the adapter](../../../../../../docs/harness/copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# CounterFan

TLC reached 25 states and 36 steps. The chart draws 25 states and 36 arrows.

## NotDone breaks
The shortest path has 2 steps:
0. done=FALSE x=0
1. Pick: done=FALSE x=1
2. Finish: done=TRUE x=1

## Rules that hold
NoDeadlock
