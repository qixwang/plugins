> **Copilot execution contract:** Read [the adapter](../../../../../../docs/harness/copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# CounterAction

TLC reached 5 states and 4 steps. The chart draws 5 states and 5 arrows.
1 step that the constraints exclude ends a rule's path, and the chart includes it. TLC checks the rules after such a step, but it does not take the step.

## NotThree breaks
The shortest path has 1 step:
0. 0
1. Jump: 3

## NotFour breaks
The shortest path has 4 steps:
0. 0
1. Inc: 1
2. Inc: 2
3. Inc: 3
4. Inc: 4

## Rules that hold
NoDeadlock
