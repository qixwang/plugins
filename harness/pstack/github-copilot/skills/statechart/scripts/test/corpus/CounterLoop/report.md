> **Copilot execution contract:** Read [the adapter](../../../../../../docs/harness/copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# CounterLoop

TLC reached 3 states and 3 steps. The chart draws 3 states and 3 arrows.

## ReachesThree breaks
TLC's counterexample is in tlc-ReachesThree.out. It has 3 steps:
0. 0
1. Up: 1
2. Up: 2
3. Back: 1
The run loops through "1" and "2" forever.

## Rules that hold
NoDeadlock
