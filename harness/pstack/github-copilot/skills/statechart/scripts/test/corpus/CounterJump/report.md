> **Copilot execution contract:** Read [the adapter](../../../../../../docs/harness/copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# CounterJump

TLC reached 6 states and 5 steps. The chart draws 7 states and 6 arrows.
1 state outside the constraints ends a rule's path, and the chart includes it. TLC checks the rules in a state outside the constraints, but it does not explore past it.

## NotThree breaks
The shortest path has 1 step:
0. jumps=0 x=0
1. Jump: jumps=1 x=3

## Rules that hold
NoDeadlock
