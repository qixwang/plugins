> **Copilot execution contract:** Read [the adapter](../../../../../../docs/harness/copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# CounterOrder

TLC reached 2 states and 1 steps. The chart draws 3 states and 2 arrows.
1 state outside the constraints ends a rule's path, and the chart includes it. TLC checks the rules in a state outside the constraints, but it does not explore past it.
The chart marks only the deadlock that TLC reports. Under a CONSTRAINT or an ACTION_CONSTRAINT, a state with no step in the chart can still have steps that the constraints leave out, and TLC does not count it as a deadlock.

## NoDeadlock breaks
The shortest path has 1 step:
0. 0
1. A: 1

## Even breaks
The shortest path has 1 step:
0. 0
1. B: 9
