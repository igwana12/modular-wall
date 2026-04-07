# Animal Animation Handoff

> Task: Create 1.5-second looping animation GLBs for each sacred animal
> Status: **12/12 ANIMATED** ✅ — All animals complete as of 2026-04-03 (commit ce0a3ef)
> Priority: DONE — pending visual QA in browser

## What needs to happen

For each of the 12 sacred animals, we need an animated GLB with a short motion loop (~1.5 seconds, loopable). The animation should be baked into the GLB file so it plays automatically in Three.js via AnimationMixer.

## The 12 animals and their animations

| # | Animal | Deity | Animation Type | Source Model |
|---|--------|-------|----------------|--------------|
| 1 | Zeus Eagle | Zeus | Wing flap cycle | **✅ DONE** — `zeus-eagle-wireframe.glb` 1.2MB, 6 Cinema 4D anims (synced from generated_imgs, commit ce0a3ef) |
| 2 | Athena Owl | Athena | Head turn + blink | **✅ DONE** — `athena-owl-wireframe.glb` 75KB, 2 anims (ArmatureAction) |
| 3 | Aphrodite Dove | Aphrodite | Wing flap | **✅ DONE** — `aphrodite-dove-wireframe.glb` 97KB, 2 anims (ArmatureAction) |
| 4 | Apollo Swan | Apollo | Neck sway | **✅ DONE** — `apollo-swan-wireframe.glb` 109KB, 2 anims (ArmatureAction) |
| 5 | Artemis Deer | Artemis | Ear flick + step | **✅ DONE** — `artemis-deer-wireframe.glb` 3.2MB, 1 anim (Deer_M\|Deer_Idle) — full rig |
| 6 | Ares Boar | Ares | Charging trot | **✅ DONE** — `ares-boar-wireframe.glb` 75KB, 2 anims (ArmatureAction) |
| 7 | Dionysus Panther | Dionysus | Prowl walk | **✅ DONE** — `dionysus-panther-wireframe.glb` 5.4MB, 2 anims — full rig, will look best |
| 8 | Poseidon Seahorse | Poseidon | Tail undulation | **✅ DONE** — `poseidon-seahorse-wireframe.glb` 95KB, 1 anim (ArmatureAction) |
| 9 | Hermes Tortoise | Hermes | Head bob | **✅ DONE** — `hermes-tortoise-wireframe.glb` 118KB, 1 anim (ArmatureAction) |
| 10 | Hephaestus Donkey | Hephaestus | Tail swish + ear flick | **✅ DONE** — `hephaestus-donkey-wireframe.glb` 72KB, 1 anim (ArmatureAction) |
| 11 | Demeter Serpent | Demeter | Coil/uncoil | **✅ DONE** — `demeter-serpent-wireframe.glb` 69KB, 1 anim (ArmatureAction) |
| 12 | Rhea Lion | Rhea | Breathe/mane shift | **✅ DONE** — `rhea-lion-wireframe.glb` 64KB, 1 anim (ArmatureAction) |

## How to source animated models

### Option A: Sketchfab (RECOMMENDED)
1. Go to https://sketchfab.com
2. Search for "animated [animal name] low poly" or "[animal name] walk cycle"
3. Filter by: Animated = Yes, Price = Free or under $10
4. Download as GLB/GLTF
5. The animation is baked into the file

Search queries to try:
- "animated eagle flying low poly"
- "owl head turn animated"
- "dove flying animation loop"
- "swan swimming animated"
- "deer walk cycle animated"
- "boar running animated"
- "panther walk cycle animated"
- "seahorse swimming animated"
- "tortoise walking animated"
- "donkey idle animated"
- "snake coil animated"
- "lion breathing idle animated"

### Option B: Mixamo (for humanoid-ish models only)
- https://www.mixamo.com
- Upload FBX, auto-rig, pick animation
- Only works for bipedal/humanoid shapes
- Won't work for: seahorse, serpent, tortoise, dove, swan

### Option C: Procedural animation in Three.js
For simple motions, code them directly:
```javascript
// Example: head turn
function animateOwl(mesh, time) {
    const head = mesh.getObjectByName('head');
    if (head) head.rotation.y = Math.sin(time * 2) * 0.3;
}

// Example: wing flap
function animateDove(mesh, time) {
    const leftWing = mesh.getObjectByName('wing_l');
    const rightWing = mesh.getObjectByName('wing_r');
    if (leftWing) leftWing.rotation.z = Math.sin(time * 4) * 0.5;
    if (rightWing) rightWing.rotation.z = -Math.sin(time * 4) * 0.5;
}
```
Problem: requires named bones/parts in the mesh, which Tripo models don't have.

### Option D: Blender manual keyframing
1. Import GLB into Blender
2. Add armature (skeleton)
3. Bind mesh to armature
4. Keyframe a 1.5-second loop (36 frames at 24fps)
5. Export as GLB with animation

This is the most reliable but most time-consuming approach.

## Output requirements

For each animal:
1. **Animated GLB** — with armature + animation action, loopable
2. **Place in**: `~/.openclaw/workspace/jarvis-voice-v2/frontend/models/wireframes/[animal]-wireframe.glb`
3. **Also simplify** to ~1000 faces (current wireframes are already simplified)
4. **Test** in the DOF constellation viewer at `http://localhost:8351/tools/dof-constellation.html`

## Animation spec

- **Duration**: ~1.5 seconds (36 frames at 24fps)
- **Loop**: Seamless — first frame = last frame
- **Speed**: Half of natural speed (user requested "motion to be half as fast")
- **Style**: Subtle, dreamlike, complementary — not dramatic. These are background visuals.

## What's already working

- **DOF Constellation viewer**: `http://localhost:8351/tools/dof-constellation.html` — loads GLBs, renders with bokeh DOF + gold lines + teal stars
- **Constellation preview**: `http://localhost:8351/tools/constellation-preview.html` — EdgesGeometry + Points renderer
- **142 simplified wireframe GLBs**: `~/.openclaw/workspace/jarvis-voice-v2/frontend/models/wireframes/` (5.5MB total)
- **142 baked constellation GLBs**: `~/.openclaw/workspace/jarvis-voice-v2/frontend/models/constellation-baked/` (90MB total)
- **JARVIS server**: running on port 8350

## Tripo3D API (if needed for new models)

| | |
|---|---|
| Endpoint | `POST https://api.tripo3d.ai/v2/openapi/task` |
| Key | `tsk_qPR6OVINdfj_31X_KsoIWrmUSCZb4xh9UZRgwYgnzJk` |
| Credits | ~3,830 remaining |
| Note | `animate_model` endpoint is DEPRECATED — don't use it |

## File locations

| What | Where |
|------|-------|
| Wireframe GLBs (simplified) | `~/.openclaw/workspace/jarvis-voice-v2/frontend/models/wireframes/` |
| Baked constellation GLBs | `~/.openclaw/workspace/jarvis-voice-v2/frontend/models/constellation-baked/` |
| Original paid animals | `/Users/claw2501/generated_imgs/3d-models/animals/` |
| Animated eagle (reference) | `/Users/claw2501/.playwright-mcp/white-eagle-animation-fast-fly.glb` |
| DOF viewer | `~/.openclaw/workspace/jarvis-voice-v2/tools/dof-constellation.html` |
| Constellation preview | `~/.openclaw/workspace/jarvis-voice-v2/tools/constellation-preview.html` |
| Constellation catalog | `~/.openclaw/workspace/jarvis-voice-v2/frontend/config/constellation-catalog.json` |
| Obsidian registry | `~/obsidian-vault/JARVIS/CONSTELLATION-WIREFRAME-ASSETS.md` |
