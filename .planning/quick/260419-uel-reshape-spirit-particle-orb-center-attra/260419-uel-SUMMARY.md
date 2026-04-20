---
phase: 260419-uel-reshape-spirit-particle-orb-center-attra
plan: 01
subsystem: spirit-particle-sim
tags: [spirit, particles, audio, physics, three.js]
key-files:
  modified:
    - src/spirit/simulator.js
    - src/spirit/spirit.js
    - src/debug-gui.js
decisions:
  - "Removed autonomous r=200 orbit in simulator.js; replaced with origin-lerp fallback at rate 0.05"
  - "Audio follow point computed in spirit.js per frame: bass→y-pulse (×50), treble→x/z (×25 sin/cos)"
  - "Band→physics mapping recentered: speed 0.10–0.30, attraction 1.30–1.90 (was 0.5–3.0 and 0.075-scale)"
  - "Dropped /0.075 attraction conversion from both update() and setPhysicsParams"
metrics:
  duration: ~10 min
  completed: 2026-04-19
  tasks: 3
  files: 3
---

# Phase 260419-uel Plan 01: Orb Center + Audio Breathing Summary

**One-liner:** Replaced r=200 autonomous orbit with origin-lerp fallback and audio-driven follow point (bass=y-pulse, treble=x/z ripple) centered on tight physics defaults (speed=0.15, attraction=1.5).

## Behavior Before / After

| Aspect | Before | After |
|---|---|---|
| Fallback follow point | r=200 orbit, h=60 — particles flung across screen | Lerp toward (0,0,0) at 0.05/frame — orb rests centered |
| Audio follow point | None — audio only changed speed/attraction | bass×50 y-pulse, treble×25 x/z ripple per frame |
| Mouse-follow | Owned _overridePoint when active | Same; audio path skips setFollowPoint when _mouseFollow=true |
| Speed range | 0.5–3.0 (mid×2.5) | 0.10–0.30 (mid×0.20), rests near 0.15 |
| Attraction range | 0.27–2.0 (bass×0.13 / 0.075) | 1.30–1.90 (bass×0.60), rests near 1.5 |
| _params defaults | speed=1.0, dieSpeed=0.015, radius=0.6, attraction=1.0 | speed=0.15, dieSpeed=0.008, radius=1.2, attraction=1.5 |
| GUI initial values | speed=0.3, dieSpeed=0.015, attraction=1.0 | speed=0.15, dieSpeed=0.008, attraction=1.5 |

## Files Changed

- **src/spirit/simulator.js** — Updated _params defaults; replaced orbit block with origin-lerp fallback; removed _followPoint + _followPointTime module vars.
- **src/spirit/spirit.js** — Added _audioTime + _audioFollow at module scope; audio follow-point computation in update() guarded by !_mouseFollow; rebalanced targetSpeed/targetAttraction; removed /0.075 conversion from update() and setPhysicsParams; _current initialized to new resting values.
- **src/debug-gui.js** — sim object defaults aligned: speed=0.15, dieSpeed=0.008, attraction=1.5.

## Commits

| Task | Hash | Message |
|---|---|---|
| 1 | d37f27f | feat(260419-uel-01): remove orbit fallback and update physics defaults in simulator.js |
| 2 | 72c067a | feat(260419-uel-02): audio-driven follow point and rebalanced band→physics in spirit.js |
| 3 | 2930911 | feat(260419-uel-03): align debug-gui.js sim defaults with new simulator physics |

## Task 4: Human Verify (checkpoint)

Status: Awaiting human verification. Dev server must be started separately (`npm run dev` from `/Users/claw2501/services/jarvis-v3-ui/`).

Verification checklist:
1. With silent audio — orb sits centered, dense, not orbiting across viewport
2. Bass hit — orb pulses vertically (up to ~50 units)
3. Treble hit — orb ripples on x/z (≤25 units each axis)
4. Mid — speed/attraction breathe smoothly; orb stays tight
5. GUI toggle `follow mouse` ON → orb chases cursor; OFF → audio breathing resumes
6. GUI shows speed=0.15, attraction=1.5, dieSpeed=0.008 as initial values
7. No console errors, no WebGL warnings

Resume signal: type "approved" once verified, or describe issue for follow-up tweak.

## Deviations from Plan

None — plan executed exactly as written. All three edits matched the plan's specified line-level changes.

## Notes for Future Tuning

- **Bass pulse too subtle:** Increase `bands.bass * 50` coefficient (try 75–100).
- **Bass pulse too strong:** Reduce to 30–40.
- **Treble wobble too wide:** Reduce `bands.treble * 25` (try 10–15).
- **Orb too tight/small:** Reduce attraction toward 1.0 or increase radius beyond 1.2.
- **Orb too loose:** Increase attraction toward 2.0–2.5 or decrease radius.
- **Speed breathing too subtle:** Increase mid coefficient from 0.20 to 0.40.

## Known Stubs

None.

## Threat Flags

None — no new network endpoints, auth paths, or schema changes introduced.

## Self-Check: PASSED

- src/spirit/simulator.js — modified, committed d37f27f
- src/spirit/spirit.js — modified, committed 72c067a
- src/debug-gui.js — modified, committed 2930911
- All node --check verifications passed
- All grep guards passed (4 param matches in simulator.js, 3 in debug-gui.js, _audioTime + setFollowPoint present, /0.075 absent in spirit.js)
