---
phase: 260419-uel-reshape-spirit-particle-orb-center-attra
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - /Users/claw2501/services/jarvis-v3-ui/src/spirit/simulator.js
  - /Users/claw2501/services/jarvis-v3-ui/src/spirit/spirit.js
  - /Users/claw2501/services/jarvis-v3-ui/src/debug-gui.js
autonomous: false
requirements:
  - ORB-CENTER-01
  - ORB-AUDIO-BREATH-02
  - ORB-DENSITY-03

must_haves:
  truths:
    - "Particles form a large dense orb that stays centered on screen (no wide orbital drift)."
    - "With silent audio (bands ~0), the orb rests near origin and breathes subtly toward (0,0,0)."
    - "Bass drives a visible vertical pulse (y-offset proportional to bass)."
    - "Treble drives a small x/z ripple (sin/cos of time), not a wide orbit."
    - "Mid still modulates speed/attraction via existing audio-to-physics mapping."
    - "Mouse-follow (when enabled via GUI) still overrides the audio-driven follow point."
    - "New physics defaults (speed=0.15, attraction=1.5, dieSpeed=0.008, radius=1.2) are what the sim actually runs with — not just what the GUI displays."
  artifacts:
    - path: "src/spirit/simulator.js"
      provides: "Centered fallback (no orbit), updated _params defaults, preserved setFollowPoint/clearFollowPoint API."
      contains: "_params.speed = 0.15"
    - path: "src/spirit/spirit.js"
      provides: "Audio-driven follow-point computation per frame; audio-to-physics mapping rebalanced around new defaults (no more stomping speed to 0.5–3.0 and attraction to ~1.0)."
      contains: "simulator.setFollowPoint"
    - path: "src/debug-gui.js"
      provides: "GUI sim defaults aligned with new simulator defaults."
      contains: "speed:       0.15"
  key_links:
    - from: "src/spirit/spirit.js update()"
      to: "simulator.setFollowPoint(audioPoint)"
      via: "Vector3(treble*25*sin(t), bass*50, treble*25*cos(t*1.3))"
      pattern: "simulator\\.setFollowPoint"
    - from: "src/spirit/spirit.js update()"
      to: "_params.speed / _params.attraction"
      via: "audio→physics lerp (must be rebalanced so new defaults aren't overwritten each frame)"
      pattern: "simulator\\.set(Speed|Attraction)"
---

<objective>
Reshape the Spirit particle system so it renders as a large, dense, **centered** orb whose
breathing/pulsing is driven by audio bands rather than a wide autonomous orbit.

Purpose: The current autonomous follow-point in `simulator.update()` uses r=200, h=60 which
scatters particles across the screen. Combined with the aggressive audio→speed/attraction
mapping in `spirit.js`, the orb reads as a loose, drifting swarm instead of a focused crystal-ball
presence. This plan makes the orb stay centered and breathe with audio.

Output:
- `simulator.js` with gentle origin-lerp fallback (no orbit math) and new physics defaults.
- `spirit.js` that computes an audio-driven follow point every frame and rebalanced band→physics mapping.
- `debug-gui.js` with defaults matching the new simulator defaults.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
Working directory for this plan's commands: `/Users/claw2501/services/jarvis-v3-ui/`

@/Users/claw2501/services/jarvis-v3-ui/src/spirit/simulator.js
@/Users/claw2501/services/jarvis-v3-ui/src/spirit/spirit.js
@/Users/claw2501/services/jarvis-v3-ui/src/debug-gui.js

<interfaces>
<!-- Extracted from the three files. Executor should use these directly. -->

From src/spirit/simulator.js (exports used by this plan):
```javascript
// Physics setters (in-place mutation of module-private _params)
export function setSpeed(v);
export function setAttraction(v);
export function setCurlSize(v);
export function setDieSpeed(v);
export function setRadius(v);

// Follow point (already exists — NO new export needed)
export function setFollowPoint(v);    // v: THREE.Vector3, sets _overridePoint
export function clearFollowPoint();   // _overridePoint = null

// Current _params (will be changed in Task 1):
//   speed: 1.0 → 0.15
//   dieSpeed: 0.015 → 0.008
//   radius: 0.6 → 1.2     (note: simulator default is 0.6, but GUI already ships 1.2)
//   curlSize: 0.02 (unchanged)
//   attraction: 1.0 → 1.5
```

From src/spirit/spirit.js (what runs per frame today, lines 124-136):
```javascript
// These lines OVERWRITE the simulator's _params every frame.
// If Task 1 changes simulator defaults but Task 2 doesn't rebalance this,
// the new defaults are stomped immediately.
const targetSpeed      = 0.5  + bands.mid    * 2.5;     // → 0.5–3.0
const targetAttraction = 0.02 + bands.bass   * 0.13;    // then *1/0.075 below
const targetCurlSize   = 0.02 + bands.treble * 0.028;
_current.speed      = _lerp(_current.speed,      targetSpeed,      0.1);
_current.attraction = _lerp(_current.attraction, targetAttraction, 0.1);
simulator.setSpeed(_current.speed);
simulator.setAttraction(_current.attraction / 0.075);   // → ~0.27–2.0
simulator.setCurlSize(_current.curlSize);
```

Key implication: simulator.js defaults alone are NOT authoritative at runtime — the audio
mapping in spirit.js wins every frame. Task 2 MUST rebalance this mapping.
</interfaces>

<!-- Gotcha: spirit.js line 104-109 has a mousemove listener that calls setFollowPoint
     only when `_mouseFollow` is true. After Task 2, spirit.js also calls setFollowPoint
     from its update() loop — so mouse-follow and audio-follow will fight. Resolution:
     when `_mouseFollow` is true, spirit.js update() must NOT call setFollowPoint
     (let the mousemove handler own the override). See Task 2 action. -->
</context>

<tasks>

<task type="auto">
  <name>Task 1: Remove orbit fallback from simulator.js and update physics defaults</name>
  <files>src/spirit/simulator.js</files>
  <action>
Edit `/Users/claw2501/services/jarvis-v3-ui/src/spirit/simulator.js`:

1. Update `_params` defaults (lines 14-20) to:
```javascript
const _params = {
  speed:      0.15,   // was 1.0
  dieSpeed:   0.008,  // was 0.015
  radius:     1.2,    // was 0.6
  curlSize:   0.02,   // unchanged
  attraction: 1.5,    // was 1.0
};
```

2. Replace the autonomous orbit block in `update()` (lines 161-173) with a centered
   origin-lerp fallback. Replace the entire `if (_overridePoint) { ... } else { ... }` block with:
```javascript
  // Follow-point: use _overridePoint when set (mouse or audio-driven), else slowly lerp to origin.
  if (_overridePoint) {
    _positionShader.uniforms.mouse3d.value.lerp(_overridePoint, 0.1);
  } else {
    _positionShader.uniforms.mouse3d.value.lerp(new THREE.Vector3(0, 0, 0), 0.05);
  }
```

3. Remove the now-unused `_followPoint` and `_followPointTime` module state:
   - Delete line 27: `let _followPoint, _followPointTime = 0;`
   - Delete the assignment in `init()` at line 37: `_followPoint = new THREE.Vector3();`
   - (Do NOT delete `_overridePoint` — it is still used.)

4. Do not touch: `setFollowPoint`, `clearFollowPoint`, shader uniforms, render targets, exports.
   Do not add any new exports.

Why these specific numbers: speed=0.15 slows the sim; attraction=1.5 pulls particles tighter to
the follow point; dieSpeed=0.008 lets particles live longer (denser orb); radius=1.2 matches what
the GUI already shipped as default. All per user's locked behavior spec.
  </action>
  <verify>
    <automated>cd /Users/claw2501/services/jarvis-v3-ui &amp;&amp; node --check src/spirit/simulator.js &amp;&amp; grep -E "speed:\s+0\.15|attraction:\s+1\.5|dieSpeed:\s+0\.008|radius:\s+1\.2" src/spirit/simulator.js | wc -l | grep -q 4 &amp;&amp; ! grep -E "r = 200|h = 60|_followPointTime" src/spirit/simulator.js</automated>
  </verify>
  <done>
    - `_params` has speed=0.15, dieSpeed=0.008, radius=1.2, attraction=1.5, curlSize=0.02.
    - `update()` has no orbit math; fallback lerps `mouse3d` toward `(0,0,0)` at 0.05/frame.
    - `_followPoint` and `_followPointTime` removed from module scope.
    - `node --check` passes (ESM syntax valid).
    - `setFollowPoint` / `clearFollowPoint` exports still present and unchanged.
  </done>
</task>

<task type="auto">
  <name>Task 2: Drive the follow point from audio bands in spirit.js and rebalance band→physics mapping</name>
  <files>src/spirit/spirit.js</files>
  <action>
Edit `/Users/claw2501/services/jarvis-v3-ui/src/spirit/spirit.js`.

**Part A — Add time accumulator and audio-driven follow point in `update(dt, bands)`:**

At module scope (near `_mouse3d` declaration, around line 22), add:
```javascript
let _audioTime = 0;                              // seconds, accumulated from dt
const _audioFollow = new THREE.Vector3();        // reused, no per-frame allocation
```

In `update(dt, bands)` (starts at line 117), **after** `_initAnim` is updated (around line 122)
and **before** the band→physics mapping (around line 124), insert:
```javascript
  // Audio-driven follow point (drives the orb's breathing in place of the old orbit).
  // Only set when mouse-follow is NOT active — mouse listener owns the override then.
  if (!_mouseFollow) {
    _audioTime += dt * 0.001;
    const t = _audioTime;
    _audioFollow.set(
      bands.treble * 25 * Math.sin(t),
      bands.bass   * 50,
      bands.treble * 25 * Math.cos(t * 1.3),
    );
    simulator.setFollowPoint(_audioFollow);
  }
```

**Part B — Rebalance the band→physics mapping so it does NOT stomp Task 1's new defaults.**

Replace lines 124-136 (the `targetSpeed`/`targetAttraction`/`targetCurlSize` block and its
`simulator.set*` calls) with a mapping centered on the new simulator defaults. The envelope
should breathe around speed=0.15 and attraction=1.5, not around 1.0 / 0.075. Use:
```javascript
  // Map audio bands → physics targets, centered on the new simulator defaults.
  // Mid breathes speed; bass tightens attraction; treble modulates curlSize.
  const targetSpeed      = 0.10 + bands.mid    * 0.20;  // 0.10–0.30, rests near 0.15
  const targetAttraction = 1.30 + bands.bass   * 0.60;  // 1.30–1.90, rests near 1.5
  const targetCurlSize   = 0.02 + bands.treble * 0.028; // unchanged range

  _current.speed      = _lerp(_current.speed,      targetSpeed,      0.1);
  _current.attraction = _lerp(_current.attraction, targetAttraction, 0.1);
  _current.curlSize   = _lerp(_current.curlSize,   targetCurlSize,   0.1);

  simulator.setSpeed(_current.speed);
  simulator.setAttraction(_current.attraction);   // NOTE: no more /0.075 conversion
  simulator.setCurlSize(_current.curlSize);
```

Also update `_current` initializer (line 34) to match the new resting values:
```javascript
const _current = { speed: 0.15, attraction: 1.5, curlSize: 0.02 };
```

**Part C — Fix `setPhysicsParams` to match.** It currently converts plan-scale `attraction`
(0.02–0.15) via `/0.075`. Since Task 1's simulator now uses 1.5 as its native default and we
just removed the /0.075 conversion in `update()`, `setPhysicsParams` must be internally
consistent. Change the `attraction` branch (lines 158-163) to treat the incoming value as
already in Spirit native scale (0–3):
```javascript
  if (attraction != null) {
    _current.attraction = attraction;
    simulator.setAttraction(attraction);
  }
```
(This also makes `debug-gui.js`'s attraction slider 0.0–3.0 map 1:1, which is what it already
looks like it wants.)

**Do not touch:**
- The mousemove handler (lines 103-109).
- `setMouseFollow`, `setBaseColor`, `setFadeColor`, post-processing setters.
- Any shader code or composer pipeline.
  </action>
  <verify>
    <automated>cd /Users/claw2501/services/jarvis-v3-ui &amp;&amp; node --check src/spirit/spirit.js &amp;&amp; grep -q "_audioTime" src/spirit/spirit.js &amp;&amp; grep -q "simulator.setFollowPoint(_audioFollow)" src/spirit/spirit.js &amp;&amp; ! grep -q "/ 0.075" src/spirit/spirit.js &amp;&amp; grep -Eq "speed: 0\.15, attraction: 1\.5" src/spirit/spirit.js</automated>
  </verify>
  <done>
    - `_audioTime` and `_audioFollow` declared at module scope.
    - `update()` calls `simulator.setFollowPoint(_audioFollow)` every frame when mouse-follow is off.
    - Band→physics targets center on speed=0.15 and attraction=1.5.
    - `/ 0.075` conversion removed from both `update()` and `setPhysicsParams`.
    - `_current` initialized to `{ speed: 0.15, attraction: 1.5, curlSize: 0.02 }`.
    - `node --check` passes.
  </done>
</task>

<task type="auto">
  <name>Task 3: Align debug-gui.js defaults with new simulator defaults</name>
  <files>src/debug-gui.js</files>
  <action>
Edit `/Users/claw2501/services/jarvis-v3-ui/src/debug-gui.js`:

Update the `sim` object (lines 11-18) so the GUI ships with the same values the simulator runs with:
```javascript
const sim = {
  speed:       0.15,   // was 0.3
  dieSpeed:    0.008,  // was 0.015
  radius:      1.2,    // unchanged
  curlSize:    0.02,   // unchanged
  attraction:  1.5,    // was 1.0
  followMouse: false,  // unchanged
};
```

Do NOT change:
- Slider ranges (0.0–3.0 for speed/attraction still fine).
- `pushSim()` / `pushRender()` wiring.
- Any post-processing GUI entries.
- Import list.
  </action>
  <verify>
    <automated>cd /Users/claw2501/services/jarvis-v3-ui &amp;&amp; node --check src/debug-gui.js &amp;&amp; grep -E "speed:\s+0\.15|attraction:\s+1\.5|dieSpeed:\s+0\.008" src/debug-gui.js | wc -l | grep -q 3</automated>
  </verify>
  <done>
    - GUI `sim` has speed=0.15, dieSpeed=0.008, attraction=1.5; radius and curlSize unchanged.
    - `node --check` passes.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
Orb reshape:
- Simulator no longer orbits particles across the screen; fallback lerps toward origin.
- spirit.js drives a small audio-modulated follow point per frame (bass → y-pulse,
  treble → x/z sin/cos ripple), preserving mouse-follow precedence.
- Physics defaults now favor a tight, dense, centered orb (speed=0.15, attraction=1.5,
  dieSpeed=0.008, radius=1.2); band→physics mapping rebalanced so the new defaults aren't
  overwritten every frame.
  </what-built>
  <how-to-verify>
1. From `/Users/claw2501/services/jarvis-v3-ui/`, start the dev server in a **separate Terminal window**:
   `npm run dev` (or whichever script already serves this app — do NOT start it inside this Bash tool).
2. Open the Spirit view in a browser. With silent / low audio:
   - Orb should sit centered, dense, not orbiting across the viewport.
3. Play audio or let the mic hear speech/music:
   - Bass hits → orb pulses vertically (y-axis, up to ~50 units).
   - Treble hits → orb gently ripples/wobbles on x/z (≤25 units each axis).
   - Mid → speed/attraction breathe smoothly; still looks tight.
4. Open the debug GUI (top-right). Toggle `follow mouse` ON — orb should chase cursor like before.
   Toggle OFF — audio-driven breathing resumes.
5. Confirm GUI shows speed=0.15, attraction=1.5, dieSpeed=0.008 as initial values.
6. Expected: no console errors, no WebGL warnings.
  </how-to-verify>
  <resume-signal>Type "approved" once the orb is centered + breathing as described, or describe the issue (e.g., "too tight", "bass pulse too subtle", "wobble too wide") for a follow-up tweak.</resume-signal>
</task>

</tasks>

<verification>
Automated per-task `node --check` + grep guards cover syntax + text-level changes.
Human verification confirms the visual behavior goal (centered dense orb, audio breathing,
mouse-follow still works).
</verification>

<success_criteria>
- Particles stay visually centered on screen with silent audio.
- Bass drives a clear vertical pulse; treble drives a small x/z ripple; mid modulates speed/attraction smoothly.
- Mouse-follow toggle still works and takes precedence over audio-driven follow point.
- GUI default values match simulator runtime defaults.
- No regressions in post-processing (bloom, motion blur, fxaa still togglable).
</success_criteria>

<output>
After completion, write a brief summary to:
`/Users/claw2501/.planning/quick/260419-uel-reshape-spirit-particle-orb-center-attra/260419-uel-SUMMARY.md`
covering: files changed, behavior before/after, any deviations from the plan, and
notes for future tuning (e.g., if bass/treble coefficients need adjustment).
</output>
