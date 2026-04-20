---
phase: 260419-su5
plan: 01
subsystem: jarvis-v3-ui / visual engine
tags: [three.js, glsl, gpu-particles, web-audio, spirit, esm-port]
dependency_graph:
  requires: [jarvis-v3-ui shell, three@0.160.0]
  provides: [spirit GPU particle sim, audio-reactive physics, WS physics hook]
  affects: [canvas.js, audio-analyser.js, visual-state.js]
tech_stack:
  added: [The Spirit GPU particle simulation (MIT port)]
  patterns: [ping-pong WebGLRenderTarget, curl-noise physics, Web Audio AnalyserNode]
key_files:
  created:
    - services/jarvis-v3-ui/src/spirit/spirit.js
    - services/jarvis-v3-ui/src/spirit/simulator.js
    - services/jarvis-v3-ui/src/spirit/particles.js
    - services/jarvis-v3-ui/src/spirit/glsl/position.frag  (inlined curl+simplex noise)
    - services/jarvis-v3-ui/src/spirit/glsl/particles.vert
    - services/jarvis-v3-ui/src/spirit/glsl/particles.frag
    - services/jarvis-v3-ui/src/spirit/glsl/ (14 total shader files)
    - services/jarvis-v3-ui/src/spirit/lib/shaderParse.js
  modified:
    - services/jarvis-v3-ui/src/canvas.js
    - services/jarvis-v3-ui/src/audio-analyser.js
    - services/jarvis-v3-ui/src/visual-state.js
decisions:
  - Particle-only render (Points mesh) — dropped triangle mesh, reduces shader complexity with no visual loss for JARVIS use
  - Inlined simplex noise + curl4 into position.frag — avoids #pragma glslify at runtime (Vite ?raw has no glslify preprocessor)
  - Dropped shadows, fog, lights, floor, postprocessing (bloom/fxaa/motionBlur) — all require extra files/shaders; visual effect unnecessary behind JARVIS UI overlay
  - initAnimation setter function replaces exported mutable variable — fixes Vite ESM strict-mode warning about reassigning named imports
  - Mic opt-in on first user gesture (mousedown/keydown/touchstart) — required by browser autoplay policy
metrics:
  duration: ~35 min
  completed: 2026-04-19
  tasks_completed: 2
  tasks_total: 3 (Task 3 is human checkpoint — skipped per constraints)
  files_created: 23
  files_modified: 3
---

# 260419-su5 Summary: Port The Spirit GPU Particle Simulation

**One-liner:** GPU curl-noise particle simulation ported from edankwan/The-Spirit as ESM, with mic AnalyserNode driving bass→attraction / mid→speed / treble→curlSize and WS blob_morph/voice_sigil events overriding physics via visual-state.applyVisualEvent().

## Tasks Completed

| Task | Commit  | Description |
|------|---------|-------------|
| 1    | 09cef05 | Port The Spirit source into src/spirit/ as ES modules |
| 2    | aa41f6b | Wire mic audio → spirit physics + expose WS hook via visual-state |
| 3    | —       | Human checkpoint (Task 3) — awaiting browser verification |

## Ported Files and Shader Count

**src/spirit/glsl/** — 14 shader files:
- `quad.vert`, `through.frag` — copy pass for ping-pong renderer
- `position.frag` — main physics (curl-noise + attraction); **simplex noise + curl4 inlined** (self-contained, no glslify runtime needed)
- `particles.vert`, `particles.frag` — Points mesh render; chunk() macros stripped (shadows/fog removed)
- `triangles.vert`, `trianglesDepth.vert`, `trianglesDistance.vert`, `trianglesMotion.vert` — kept as files (not used, available for future triangle particle mode)
- `particlesDepth.frag`, `particlesDistance.vert`, `particlesDistance.frag`, `particlesMotion.vert` — depth/distance/motion shaders (kept, not wired in simplified port)
- `noise.glsl` — kept (not used directly in this port)

**src/spirit/glsl/helpers/** — 5 helper GLSL files (simplexNoiseDerivatives4, curl4, coord2To3, coord3to2, sampleAs3DTexture) — kept as reference, content inlined into position.frag

## Audio Mapping Ranges

| Band   | Bins (fftSize=256) | Frequency range | Target param  | Native Spirit scale         |
|--------|--------------------|-----------------|---------------|-----------------------------|
| bass   | 0–5                | 0–860 Hz        | attraction    | 0.02 + bass × 0.13 → / 0.075 → Spirit 0–2 |
| mid    | 6–40               | 860–6100 Hz     | speed         | 0.5 + mid × 2.5 (direct)   |
| treble | 41–127             | 6100–22000 Hz   | curlSize      | 0.02 + treble × 0.028 → native 0.001–0.05 |

All params lerped at 0.1/frame (~10-frame lag) to prevent snapping.

Time-based fallback (mic denied): `{ bass: 0.3 + 0.2*sin(t*0.7), mid: 0.3 + 0.2*sin(t*1.1), treble: 0.3 + 0.2*sin(t*1.7) }` — Spirit breathes naturally without mic.

## Spirit Features Dropped During Port

| Feature           | Reason |
|-------------------|--------|
| dat.GUI           | Dev tool, not needed in production JARVIS UI |
| stats.js          | FPS counter, not needed |
| OrbitControls     | Mouse orbit not compatible with fixed JARVIS canvas |
| Mouse tracking    | Replaced by audio bands as physics driver |
| Lights + floor    | Decorative scene elements, break JARVIS black bg |
| Shadow mapping    | Requires lights, expensive, no visual benefit with alpha canvas |
| Fog               | Not visible against black transparent background |
| Motion blur       | 3 extra shaders + render passes; significant complexity for subtle effect |
| FXAA              | Post-process antialiasing; Three.js r160 antialias:true on WebGLRenderer sufficient |
| Custom bloom      | Existing JARVIS UI uses UnrealBloom from CDN on the old renderer; Spirit has its own custom bloom with extra files — dropped in favor of additive blending on particles |
| Triangle particles | Requires MeshMotionMaterial and flipRatio logic; Points (dots) sufficient for JARVIS aesthetic |
| OES_texture_float check | Still checked but no alert() — logs error and returns |

## Gotchas Encountered

1. **`#pragma glslify require()` in GLSL files** — Vite `?raw` imports load GLSL as plain strings; glslify is a build-time bundler (Browserify transform), not available in Vite. Solution: inline `simplexNoiseDerivatives4` and `curl4` directly into `position.frag`. The `#pragma glslify` lines in the helper files are irrelevant at runtime since position.frag is now self-contained.

2. **`renderer.render(scene, camera, renderTarget)` removed in Three.js r125+** — The Spirit's ping-pong renderer uses the old 3-arg signature. In r160 it's `renderer.setRenderTarget(rt); renderer.render(scene, camera); renderer.setRenderTarget(null)`. Updated in simulator.js `_copyTexture` and `_updatePosition`.

3. **ESM strict mode: cannot reassign named exports** — `simulator.initAnimation = _initAnim` in spirit.js triggered a Vite build warning ("Illegal reassignment of import"). Fixed by replacing the `export let initAnimation` with `setInitAnimation(v)` setter function.

4. **`// chunk(shadowmap_*)` macros in particles.vert/.frag** — These inject Three.js shadow map GLSL. Since shadows are dropped, the shader also referenced `shadowMask` variable which would be undefined without the chunk. Solution: strip all chunk() macros from particles.vert and particles.frag, remove `shadowMask` usage, add alpha fade via `smoothstep(0.0, 0.1, vLife)` in frag.

5. **`PlaneBufferGeometry` removed in Three.js r160** — replaced with `PlaneGeometry` (same API, different name since r125). Same for `BufferGeometry.addAttribute` → `setAttribute`.

6. **canvas.js had window.THREE dependency** — old implementation used `window.THREE` (loaded via script tag). Spirit uses ESM `import * as THREE from 'three'` — clean module, no global needed. canvas.js no longer needs the global THREE check.

## Known Stubs

None — Spirit runs with time-based fallback when mic denied. No placeholder data flows to UI rendering.

## Self-Check: PASSED

- `/Users/claw2501/services/jarvis-v3-ui/src/spirit/spirit.js` — exists, exports init/update/setPhysicsParams/resize/dispose
- `/Users/claw2501/services/jarvis-v3-ui/src/spirit/simulator.js` — exists
- `/Users/claw2501/services/jarvis-v3-ui/src/spirit/particles.js` — exists
- `/Users/claw2501/services/jarvis-v3-ui/src/spirit/glsl/` — 14 files
- `npx vite build` — passes, no errors, no warnings
- Commits: 09cef05 (Task 1), aa41f6b (Task 2) — verified in git log
