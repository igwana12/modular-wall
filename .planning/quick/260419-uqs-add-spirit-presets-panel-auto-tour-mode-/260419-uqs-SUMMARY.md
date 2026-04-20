---
task: 260419-uqs
type: quick
subsystem: jarvis-v3-ui
tags: [spirit, debug-gui, lil-gui, presets, auto-tour]
key-files:
  modified:
    - /Users/claw2501/services/jarvis-v3-ui/src/debug-gui.js
decisions:
  - Stored controller refs in `ctrl` object at declaration site so applyPreset can call setValue() without re-querying the GUI tree
  - Auto Tour uses setInterval (not requestAnimationFrame) — interval survives tab blur, appropriate for a demo mode
metrics:
  completed: 2026-04-19
  commit: 4955774
---

# Quick Task 260419-uqs: Add Spirit Presets Panel + Auto Tour

**One-liner:** 8 named particle presets with full sim/render/post parameter sets wired to a lil-gui Presets folder and a 4s interval Auto Tour toggle.

## What Was Done

- Added `PRESETS` array (8 entries) — each carries `sim`, `render`, and `post` sub-objects covering all tunable parameters.
- Added `applyPreset(p)` — writes to the live `sim`/`render`/`post` state objects, calls all Spirit/simulator setters, then syncs every relevant GUI controller via `ctrl.*.setValue()`.
- Added Auto Tour — `toggleTour()` starts/stops a `setInterval` at 4000ms, cycling `tourIndex` through PRESETS. Button label flips between `▶ Auto Tour` and `⏹ Stop Tour` in-place via `tourButton.name()`.
- Refactored `simFolder.add()` and `renderFolder.addColor()` / `postFolder.add()` calls to capture return values into `ctrl.*` so `applyPreset` can call `setValue()` without traversing the GUI.
- Added `presetsFolder` after postFolder with tour button first, then one button per preset.

## Presets

| Name | Key character |
|------|---------------|
| Nebula | Slow purple bloom cloud |
| Vortex | Fast orange vortex, motion blur |
| Ghost | Slow cyan particles, heavy afterimage |
| Pulse | Red heartbeat, heavy bloom |
| Storm | Fast teal turbulence, motion blur |
| Whisper | Ultra-slow gold drift, soft bloom |
| Solar | Medium orange/red, balanced bloom + blur |
| Void | Deep blue, maximum bloom + blur |

## Deviations

None — plan executed exactly as written.

## Self-Check

- [x] `/Users/claw2501/services/jarvis-v3-ui/src/debug-gui.js` modified and committed
- [x] Commit `4955774` exists on master
