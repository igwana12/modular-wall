---
phase: 260419-tut
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/spirit/spirit.js
  - src/debug-gui.js
autonomous: false
requirements:
  - TUT-01
must_haves:
  truths:
    - "Final scene render goes through EffectComposer — not _renderer.render(_scene, _camera)"
    - "Debug GUI shows a 'Post-Processing' folder with FXAA, Motion Blur, and Bloom controls"
    - "Each pass toggles on/off via its .enabled flag and visible change on canvas"
    - "Simulator ping-pong render targets still update every frame (particles keep moving)"
    - "Bloom halos appear around bright particle cores when bloom is enabled"
    - "Motion blur (AfterimagePass) produces a visible trail behind moving particles"
    - "FXAA softens aliased edges when toggled on"
  artifacts:
    - path: "src/spirit/spirit.js"
      provides: "EffectComposer render pipeline + exported post-processing setters"
      contains: "EffectComposer"
    - path: "src/debug-gui.js"
      provides: "Post-Processing GUI folder wiring the setters"
      contains: "Post-Processing"
  key_links:
    - from: "src/spirit/spirit.js update()"
      to: "EffectComposer.render()"
      via: "replaces _renderer.render(_scene, _camera) at bottom of update()"
      pattern: "_composer\\.render"
    - from: "src/debug-gui.js Post-Processing folder"
      to: "spirit.js setters (setFxaaEnabled / setMotionBlur* / setBloom*)"
      via: "onChange handlers"
      pattern: "set(Fxaa|MotionBlur|Bloom)"
    - from: "simulator.js ping-pong"
      to: "WebGLRenderTarget offscreen"
      via: "unchanged — EffectComposer only wraps main _scene/_camera render"
      pattern: "setRenderTarget\\(_positionRenderTarget"
---

<objective>
Add Three.js post-processing (EffectComposer) to the Spirit particle simulation with FXAA, motion blur (AfterimagePass), and bloom (UnrealBloomPass). Expose toggles and params in the existing lil-gui debug panel. Must not break the simulator's ping-pong WebGLRenderTargets.

Purpose: Visual polish for the Spirit blob — bloom sells the "spirit" feel, motion blur adds flow, FXAA cleans edges. All toggleable at runtime.

Output: Modified `src/spirit/spirit.js` (composer pipeline + setters) and `src/debug-gui.js` (new Post-Processing folder). No new files.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@/Users/claw2501/services/jarvis-v3-ui/src/spirit/spirit.js
@/Users/claw2501/services/jarvis-v3-ui/src/spirit/simulator.js
@/Users/claw2501/services/jarvis-v3-ui/src/debug-gui.js
@/Users/claw2501/services/jarvis-v3-ui/package.json

<interfaces>
<!-- Key facts the executor needs — no codebase exploration required. -->

Three.js version: ^0.160.0 (ESM imports from `three/examples/jsm/postprocessing/` confirmed present:
  EffectComposer.js, RenderPass.js, ShaderPass.js, UnrealBloomPass.js, AfterimagePass.js, OutputPass.js).
FXAAShader path: `three/examples/jsm/shaders/FXAAShader.js`.

Current render loop (src/spirit/spirit.js, line 81):
  _renderer.render(_scene, _camera);   // ← this line gets replaced by _composer.render()

Simulator ping-pong (src/spirit/simulator.js, lines ~133–147):
  Renders to `_positionRenderTarget` via `_renderer.setRenderTarget(target)` then restores `setRenderTarget(null)`.
  EffectComposer creates its own internal render targets for the main scene — it does NOT touch the simulator's offscreen targets. Safe.

Existing GUI pattern (src/debug-gui.js):
  `gui.addFolder('Name')`, then `.add(obj, 'key', min, max, step).onChange(fn)` or `.add(obj, 'key').name('label')`.

AfterimagePass damp mapping:
  AfterimagePass.uniforms.damp.value is 0..1 (higher = longer trails).
  GUI exposes it as "distance" (0..0.99 range) per constraints. Skip "multiplier" param — not a direct AfterimagePass uniform.
  Quality dropdown ('best'|'standard'|'performance') maps to a render-size scale we pass to composer.setSize:
    best        → 1.0 × devicePixelRatio
    standard    → 1.0 × 1
    performance → 0.5 × 1
  (Affects _composer.setSize and setPixelRatio; does NOT touch simulator RTs.)

UnrealBloomPass constructor: `new UnrealBloomPass(new Vector2(w, h), strength, radius, threshold)`.
  GUI "amount" = strength (0..3), "radius" = radius (0..2), threshold fixed at 0.0 (particles are alpha, not HDR).

Pass toggling: every Pass instance has `.enabled = true|false`. Disabled passes are skipped by EffectComposer.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Wire EffectComposer with FXAA + AfterimagePass + UnrealBloomPass into spirit.js</name>
  <files>src/spirit/spirit.js</files>
  <action>
In `/Users/claw2501/services/jarvis-v3-ui/src/spirit/spirit.js`:

1. Add ESM imports at top (after existing `import * as particles`):
```js
import { EffectComposer }   from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass }       from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass }       from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { AfterimagePass }   from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { UnrealBloomPass }  from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass }       from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FXAAShader }       from 'three/examples/jsm/shaders/FXAAShader.js';
```

2. Add module-scoped vars near other `let _renderer = null` declarations:
```js
let _composer = null;
let _renderPass = null;
let _fxaaPass = null;
let _afterimagePass = null;
let _bloomPass = null;
let _outputPass = null;
let _mbQuality = 'standard'; // 'best' | 'standard' | 'performance'
```

3. In `init(canvas)`, AFTER `simulator.init(_renderer)` and AFTER `_scene.add(particles.container)`, build the composer:
```js
const w = canvas.clientWidth  || window.innerWidth;
const h = canvas.clientHeight || window.innerHeight;

_composer = new EffectComposer(_renderer);
_composer.setPixelRatio(_renderer.getPixelRatio());
_composer.setSize(w, h);

_renderPass = new RenderPass(_scene, _camera);
_composer.addPass(_renderPass);

// Motion blur via AfterimagePass — damp.value is the "distance" control (0..0.99)
_afterimagePass = new AfterimagePass();
_afterimagePass.uniforms['damp'].value = 0.0;   // default off-feel; GUI default = 0.85 via distance slider
_afterimagePass.enabled = false;
_composer.addPass(_afterimagePass);

// Bloom — strength = amount, radius = radius, threshold 0.0 (particles are additive alpha, not HDR)
_bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.8, 1.3, 0.0);
_bloomPass.enabled = false;
_composer.addPass(_bloomPass);

// FXAA
_fxaaPass = new ShaderPass(FXAAShader);
const pr = _renderer.getPixelRatio();
_fxaaPass.material.uniforms['resolution'].value.set(1 / (w * pr), 1 / (h * pr));
_fxaaPass.enabled = false;
_composer.addPass(_fxaaPass);

_outputPass = new OutputPass();
_composer.addPass(_outputPass);
```

4. Replace line 81 `_renderer.render(_scene, _camera);` with:
```js
if (_composer) _composer.render();
else _renderer.render(_scene, _camera);
```

5. Update `resize()` to resize composer + FXAA resolution uniform:
```js
export function resize() {
  if (!_renderer || !_camera) return;
  const w = window.innerWidth, h = window.innerHeight;
  _camera.aspect = w / h;
  _camera.updateProjectionMatrix();
  _renderer.setSize(w, h);
  if (_composer) {
    _applyMbQuality();          // reapplies composer pixel ratio + size scale
    if (_bloomPass) _bloomPass.setSize(w, h);
    if (_fxaaPass) {
      const pr = _renderer.getPixelRatio();
      _fxaaPass.material.uniforms['resolution'].value.set(1 / (w * pr), 1 / (h * pr));
    }
  }
}
```

6. Add a helper `_applyMbQuality()` (private, below `_lerp`) that maps `_mbQuality` to composer size scale:
```js
function _applyMbQuality() {
  if (!_composer) return;
  const w = window.innerWidth, h = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio, 2);
  let scale = 1.0, pr = 1.0;
  if (_mbQuality === 'best')         { scale = 1.0; pr = dpr; }
  else if (_mbQuality === 'standard'){ scale = 1.0; pr = 1.0; }
  else                                { scale = 0.5; pr = 1.0; }   // performance
  _composer.setPixelRatio(pr);
  _composer.setSize(w * scale, h * scale);
}
```

7. In `dispose()`, null out `_composer = null` and the pass refs.

8. Export new setters at the bottom of the file:
```js
export function setFxaaEnabled(v)       { if (_fxaaPass) _fxaaPass.enabled = !!v; }
export function setMotionBlurEnabled(v) { if (_afterimagePass) _afterimagePass.enabled = !!v; }
export function setMotionBlurDistance(v){ // v: 0..0.99 → maps to AfterimagePass damp
  if (_afterimagePass) _afterimagePass.uniforms['damp'].value = Math.max(0, Math.min(0.99, v));
}
export function setMotionBlurQuality(q) { // 'best' | 'standard' | 'performance'
  _mbQuality = q;
  _applyMbQuality();
}
export function setBloomEnabled(v)      { if (_bloomPass) _bloomPass.enabled = !!v; }
export function setBloomRadius(v)       { if (_bloomPass) _bloomPass.radius   = v; }
export function setBloomAmount(v)       { if (_bloomPass) _bloomPass.strength = v; }
```

Why this shape:
- Composer wraps ONLY the main scene render. Simulator keeps writing its own ping-pong RTs via `_renderer.setRenderTarget(target)` inside `simulator.update(dt)` — those calls happen BEFORE `_composer.render()` and don't interact.
- AfterimagePass is the simplest "motion blur" option for particles (no velocity buffer needed); per constraints, the "distance" GUI maps to `damp`, and "multiplier" is dropped.
- `threshold=0.0` for UnrealBloomPass because the particle material isn't HDR; any brightness should bloom.
- OutputPass at the end handles tonemapping/output encoding correctly in r160.
  </action>
  <verify>
    <automated>cd /Users/claw2501/services/jarvis-v3-ui && node --input-type=module -e "import('./src/spirit/spirit.js').then(m => { const keys = Object.keys(m); const needed = ['setFxaaEnabled','setMotionBlurEnabled','setMotionBlurDistance','setMotionBlurQuality','setBloomEnabled','setBloomRadius','setBloomAmount']; const missing = needed.filter(k => !keys.includes(k)); if (missing.length) { console.error('MISSING:', missing); process.exit(1); } console.log('OK: all post-processing setters exported'); }).catch(e => { console.error(e.message); process.exit(1); });"</automated>
  </verify>
  <done>
- All 6 postprocessing imports present in spirit.js
- `_composer.render()` replaces the direct renderer call in `update()`
- 7 new setters exported: setFxaaEnabled, setMotionBlurEnabled, setMotionBlurDistance, setMotionBlurQuality, setBloomEnabled, setBloomRadius, setBloomAmount
- resize() rebuilds FXAA resolution + composer size
- Node import smoke-test passes (above verify command)
  </done>
</task>

<task type="auto">
  <name>Task 2: Add Post-Processing folder to debug-gui.js</name>
  <files>src/debug-gui.js</files>
  <action>
In `/Users/claw2501/services/jarvis-v3-ui/src/debug-gui.js`:

1. Extend the `spirit.js` import to include the new setters:
```js
import {
  setPhysicsParams, setMouseFollow, setBackgroundColor,
  setBaseColor, setFadeColor, setDieSpeed, setRadius,
  setFxaaEnabled,
  setMotionBlurEnabled, setMotionBlurDistance, setMotionBlurQuality,
  setBloomEnabled, setBloomRadius, setBloomAmount,
} from './spirit/spirit.js';
```

2. Add a `post` state object below the existing `render` block:
```js
const post = {
  fxaa: false,
  motionBlur: false,
  distance: 0.85,          // → AfterimagePass damp (0..0.99)
  multiplier: 9.6,         // kept in state for UI parity with constraints; not wired (see spirit.js)
  quality: 'standard',     // 'best' | 'standard' | 'performance'
  bloom: false,
  radius: 1.3,
  amount: 0.8,
};
```

3. After the `renderFolder` block, append a new folder:
```js
const postFolder = gui.addFolder('Post-Processing');

postFolder.add(post, 'fxaa').name('fxaa').onChange(v => setFxaaEnabled(v));

postFolder.add(post, 'motionBlur').name('motion blur').onChange(v => setMotionBlurEnabled(v));
postFolder.add(post, 'distance',   0.0, 0.99, 0.01).name('mb distance').onChange(v => setMotionBlurDistance(v));
postFolder.add(post, 'multiplier', 0.0, 20.0, 0.1).name('mb multiplier (unused)');
postFolder.add(post, 'quality', ['best', 'standard', 'performance']).name('mb quality').onChange(v => setMotionBlurQuality(v));

postFolder.add(post, 'bloom').name('bloom').onChange(v => setBloomEnabled(v));
postFolder.add(post, 'radius', 0.0, 2.0, 0.01).name('bloom radius').onChange(v => setBloomRadius(v));
postFolder.add(post, 'amount', 0.0, 3.0, 0.01).name('bloom amount').onChange(v => setBloomAmount(v));
```

Why "multiplier" is in the UI but not wired:
- Constraints require exposing multiplier + distance. AfterimagePass has no multiplier uniform. Rather than silently omit it (confusing) or fake-map it (misleading), we surface it with an explicit `(unused)` label. If the user later wants a real velocity-buffer motion blur, this slot stays ready.

Initial defaults match the toggles (everything off until user enables), so no push-at-init is needed.
  </action>
  <verify>
    <automated>cd /Users/claw2501/services/jarvis-v3-ui && node --input-type=module -e "import('./src/debug-gui.js').then(() => console.log('OK: debug-gui.js imports cleanly')).catch(e => { console.error(e.message); process.exit(1); });"</automated>
  </verify>
  <done>
- debug-gui.js imports all 7 new setters
- `post` state object exists with fxaa, motionBlur, distance, multiplier, quality, bloom, radius, amount
- `Post-Processing` folder appears in gui.folders (or gui.children in lil-gui 0.21) with all controls wired via onChange
- Node import smoke-test passes
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 3: Verify post-processing in the live UI</name>
  <what-built>
EffectComposer pipeline with FXAA + AfterimagePass (motion blur) + UnrealBloomPass passes. GUI controls exposed in new "Post-Processing" folder in lil-gui panel.
  </what-built>
  <how-to-verify>
1. `cd /Users/claw2501/services/jarvis-v3-ui && npm run dev` (port 8360).
2. Open http://127.0.0.1:8360 in a browser and confirm the Spirit particles are animating (baseline — should look identical to before since all passes default off).
3. In the "Spirit" GUI panel (top-right), locate the new **Post-Processing** folder. Expand it.
4. Toggle **bloom** on → bright particle cores should gain halos. Drag **bloom amount** 0→3: halos grow. Drag **bloom radius** 0→2: halo spread grows.
5. Toggle **motion blur** on with distance ≈ 0.85 → moving particles should leave a soft trail. Drop distance to 0 → trail disappears.
6. Switch **mb quality** between best/standard/performance → `performance` should visibly drop resolution (blockier bloom/trail) but run noticeably faster on a slow GPU. `best` should look crispest on retina.
7. Toggle **fxaa** on → edges should soften slightly (subtle on particles; more visible if you bloom + zoom).
8. Toggle everything off → image should return to baseline (particles, no bloom, no trails, no AA).
9. Open devtools console → no errors about missing passes, undefined uniforms, or render-target warnings.
10. Drag the Simulator > speed slider up → particles still respond (confirms simulator ping-pong still works alongside the composer).
  </how-to-verify>
  <resume-signal>Type "approved" or describe any issues (e.g., "bloom halos missing", "trails never appear", "console error X").</resume-signal>
</task>

</tasks>

<verification>
- `npm run dev` runs without errors
- Post-Processing folder visible in GUI with all 8 controls
- Each pass visibly changes the canvas when enabled
- Particles continue simulating (simulator unaffected)
- No console errors about postprocessing or render targets
</verification>

<success_criteria>
- EffectComposer renders the final frame in `spirit.js update()` (no more direct `_renderer.render(_scene, _camera)` for the main scene)
- GUI "Post-Processing" folder with fxaa / motion blur + distance + multiplier + quality / bloom + radius + amount
- All passes toggle via `.enabled` — no re-creation of composer on toggle
- Simulator ping-pong render targets continue updating each frame
- Human verification checkpoint passes
</success_criteria>

<output>
After completion, create `/Users/claw2501/.planning/quick/260419-tut-add-three-js-post-processing-effectcompo/260419-tut-SUMMARY.md` documenting:
- Files modified (spirit.js, debug-gui.js)
- Passes added (FXAA, AfterimagePass, UnrealBloomPass, OutputPass)
- Known gap: "multiplier" GUI control is unwired (AfterimagePass has no matching uniform)
- Any console-visible behavior noted during checkpoint
</output>
