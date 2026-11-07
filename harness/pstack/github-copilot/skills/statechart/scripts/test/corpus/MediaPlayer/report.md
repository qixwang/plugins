> **Copilot execution contract:** Read [the adapter](../../../../../../docs/harness/copilot.md) before acting. Resolve relative links from this file, not the working directory; delegates require the parent's absolute adapter/entry paths. It overrides Cursor tool/model/path, autonomy and publishing instructions below. Required proof cannot be skipped; unsupported dependencies block dependent steps. No model override without explicit user selection.

# MediaPlayer

TLC reached 12 states and 64 steps. The chart draws 7 states and 13 arrows.
The step a call comes in changes Playback and Volume at the same time.
The step the track ends changes Playback and Volume at the same time.
The step you press stop changes Playback and Volume at the same time.

## LoudWhenStopped breaks
The shortest path has 1 step:
0. Playback Stopped, Volume Normal volume
1. you turn it up: Playback Stopped, Volume Loud

## Rules that hold
TypeOK, NoDeadlock, EventuallyStops
