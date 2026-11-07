> **Copilot execution contract:** Read [the adapter](../../../../../../docs/harness/copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# CounterDeadlock

TLC reached 4 states and 3 steps. The chart draws 4 states and 4 arrows.
1 step that the constraints exclude ends a rule's path, and the chart includes it. TLC checks the rules after such a step, but it does not take the step.
The chart marks only the deadlock that TLC reports. Under a CONSTRAINT or an ACTION_CONSTRAINT, a state with no step in the chart can still have steps that the constraints leave out, and TLC does not count it as a deadlock.

## NotThree breaks
The shortest path has 1 step:
0. 0
1. Jump: 3

## NoDeadlock breaks
The shortest path has 3 steps:
0. 0
1. Inc: 1
2. Inc: 2
3. Inc: 3
