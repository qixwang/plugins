> **Copilot execution contract:** Read [the adapter](../../../../../../docs/harness/copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# CounterRules

TLC reached 2 states and 1 steps. The chart draws 4 states and 3 arrows.
2 states outside the constraints each end a rule's path, and the chart includes them. TLC checks the rules in a state outside the constraints, but it does not explore past it.

## NotThree breaks
The shortest path has 1 step:
0. 0
1. M!Jump: 3

## AtMostTwo breaks
The shortest path has 1 step:
0. 0
1. M!Jump: 3

## NotTwo breaks
The shortest path has 2 steps:
0. 0
1. Step: 1
2. Step: 2

## Rules that hold
NoDeadlock
