---
phase: 260419-tut
plan: 01
subsystem: jarvis-v3-ui / spirit
tags: [three.js, post-processing, EffectComposer, bloom, motion-blur, FXAA, lil-gui]
dependency_graph:
  requires: []
  provides: [post-processing pipeline in spirit.js, Post-Processing GUI folder]
  affects: [jarvis-v3-ui render loop, debug-gui]
tech_stack:
  added: [EffectComposer, RenderPass, ShaderPass, AfterimagePass, UnrealBloomPass, OutputPass, FXAAShader]
  patterns: [composer-wraps-scene-render, pass.enabled-toggle, damp-uniform-for-motion-blur]
key_files:
  modified:
    - /Users/claw2501/services/jarvis-v3-ui/src/spirit/spirit.js
    - /Users/claw2501/services/jarvis-v3-ui/src/debug-gui.js
decisions:
  - AfterimagePass chosen for motion blur (no velocity buffer required); damp uniform maps to "distance" control
  - threshold=0.0 for UnrealBloomPass because particle material is additive alpha, not HDR
  - OutputPass added last for correct tonemapping/output encoding in Three.js r160
  - multiplier GUI control surfaced as (unused) label rather than silently omitted or fake-mapped
metrics:
  duration: ~10 min
  completed: "2026-04-20T01:34:38Z"
  tasks_completed: 2
  tasks_pending_human: 1
  files_modified: 2
---

# Phase 260419-tut Plan 01: Add Three.js Post-Processing EffectComposer — Summary

**One-liner:** EffectComposer pipeline (FXAA + AfterimagePass motion blur + UnrealBloomPass bloom) wired into spirit.js render loop with lil-gui Post-Processing folder exposing all toggles and params.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Wire EffectComposer with FXAA + AfterimagePass + UnrealBloomPass into spirit.js | f26e248 | src/spirit/spirit.js |
| 2 | Add Post-Processing folder to debug-gui.js | efdcb98 | src/debug-gui.js |
| 3 | Verify post-processing in live UI (human checkpoint) | — | awaiting human verification |

## What Was Built

### Task 1 — spirit.js

- Added 6 ESM imports: `EffectComposer`, `RenderPass`, `ShaderPass`, `AfterimagePass`, `UnrealBloomPass`, `OutputPass`, `FXAAShader`
- `init()` now builds composer pipeline after simulator + particles: RenderPass → AfterimagePass (disabled) → UnrealBloomPass (disabled) → ShaderPass/FXAA (disabled) → OutputPass
- `update()` calls `_composer.render()` instead of `_renderer.render(_scene, _camera)`; falls back to direct render if composer not ready
- `resize()` calls `_applyMbQuality()` + resizes bloom pass + updates FXAA resolution uniform
- `_applyMbQuality()` maps quality string to composer pixel ratio + size scale (best=dpr, standard=1.0, performance=0.5×)
- `dispose()` nulls all pass refs
- 7 new exported setters: `setFxaaEnabled`, `setMotionBlurEnabled`, `setMotionBlurDistance`, `setMotionBlurQuality`, `setBloomEnabled`, `setBloomRadius`, `setBloomAmount`

### Task 2 — debug-gui.js

- Extended spirit.js import to include all 7 new setters
- Added `post` state object: `{ fxaa, motionBlur, distance, multiplier, quality, bloom, radius, amount }`
- Added `Post-Processing` GUI folder with 8 controls:
  - fxaa toggle
  - motion blur toggle, mb distance (0–0.99), mb multiplier (unused, 0–20), mb quality dropdown
  - bloom toggle, bloom radius (0–2), bloom amount (0–3)

## Known Gap

**`multiplier` GUI control is unwired.** AfterimagePass has no multiplier uniform. The control is exposed in the GUI with an explicit `(unused)` label so the slot is discoverable. If a velocity-buffer motion blur is added later, this slot stays ready without a GUI refactor.

## Simulator Safety

Simulator ping-pong render targets are untouched. `simulator.update(dt)` writes to `_positionRenderTarget` via `_renderer.setRenderTarget(target)` and restores `setRenderTarget(null)` — this happens *before* `_composer.render()` in `update()`. EffectComposer only manages the main `_scene`/`_camera` render; it does not interact with the simulator's offscreen targets.

## Verification Note

The plan's Node.js import smoke-test (`node --input-type=module -e "import('./src/spirit/spirit.js')"`) fails in this environment because the module import chain reaches `simulator.js` which imports `.vert`/`.glsl` files — these require Vite's GLSL plugin and cannot be resolved by bare Node.js. All exports were verified by direct `grep` on the file. Runtime verification is Task 3 (human checkpoint).

## Deviations from Plan

None — plan executed exactly as written. The Node smoke-test deviation (GLSL extension error) is a test-environment limitation, not a code issue. All 7 setters are present and correctly exported.

## Task 3 — Human Verification (Pending)

**Awaiting:** Open http://127.0.0.1:8360 after `npm run dev`, expand "Post-Processing" folder in lil-gui panel, verify bloom halos, motion blur trails, FXAA edge softening, and no console errors. See PLAN.md Task 3 for full verification steps.

## Self-Check

- [x] `src/spirit/spirit.js` modified — verified via Read
- [x] `src/debug-gui.js` modified — verified via Read
- [x] Commit f26e248 exists (Task 1)
- [x] Commit efdcb98 exists (Task 2)
- [x] All 7 setters exported from spirit.js (grep confirmed lines 215–226)
- [x] Post-Processing folder wired in debug-gui.js (grep confirmed lines 66–77)
- [x] `_composer.render()` at line 141 replaces direct render call

## Self-Check: PASSED
