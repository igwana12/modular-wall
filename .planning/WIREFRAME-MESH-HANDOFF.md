# Wireframe Mesh — Handoff Document
> Last updated: 2026-04-04 (eagle position resolved)
> File: `~/.openclaw/workspace/jarvis-voice-v2/frontend/js/thinking-mesh.js?v=6`

---

## What Was Done This Session

### 1. Zeus Eagle Animation — COMPLETE ✅
- `zeus-eagle-wireframe.glb` went from 52KB (static) → 1.2MB (6 Cinema 4D animations)
- Done in previous session (commit `ce0a3ef`)
- `ANIMAL-ANIMATION-HANDOFF.md` updated to reflect 12/12 complete

### 2. Wire Mode Now Animates GLBs ✅
- Previously: Wire mode baked geometry with `loadGLBStatic` — static, no animation
- Now: Wire mode uses `loadGLBForDOF` (live AnimationMixer skeleton) → `_buildWireAnimated`
- New code path added: `_glbAnimWire`, `_wireAnimLines`, `_wireIsAnimated` state
- Wire mode renders green `LineBasicMaterial` lines updated per-frame from bone positions
- Same `getDeformedVertices` + `updateEdgePositions` approach as DOF animated mode

### 3. DOF Centering Bug Fixed ✅
- **Root cause**: `loadGLBForDOF` computed bounding box center BEFORE applying `rotation.x = Math.PI` flip, then subtracted that pre-rotation center — doubling the Y error
- **Fix**: After `gltf.scene.rotation.x = Math.PI`, position is now `(-cx, +cy, +cz)` instead of `(-cx, -cy, -cz)`
- Math: after rotation.x=π, local Y→-worldY. To center: position = `(-cx, cy, cz)`

---

## What Is Still Broken ❌

### Nothing critical — eagle is centered in all 3 modes ✅

**Resolved this session (2026-04-04):**
- Wire eagle: scale `0.5→0.85`, Y offset `-0.35→-1.0` — now centered on blob
- GLB paths fixed: `/static/models/wireframes/` → `/models/` (server serves flat)
- `thinking-mesh.js` was missing from `index.html` on real server — added
- Script path fixed: `/static/js/` → `/js/`
- Commits: `ab79b9d` (r1-frontend), `43dd2e7` (openclaw workspace)

**Minor open question:**
- DOF Lines gold color hard to distinguish from screenshot compression — looks correct live

---

## How to Continue Next Session

### Step 1 — ~~Fix Wire mode eagle position~~ DONE ✅
Edit `thinking-mesh.js` `_buildWireAnimated` method:
```javascript
// Current (wrong):
anim.container.scale.multiplyScalar(0.5);
anim.container.position.set(this._centerOffsetX, this._centerOffsetY - 0.35, 0);

// Try this first:
anim.container.scale.multiplyScalar(0.65);
anim.container.position.set(this._centerOffsetX, this._centerOffsetY - 1.0, 0);
```

Bump version in `index.html`: `thinking-mesh.js?v=7`

### Step 2 — Screenshot all 3 modes
1. Layers → Enabled ✓ → Zeus Eagle → **Wire** → screenshot
2. Switch to **DOF Lines** → wait 2s → screenshot  
3. Switch to **Constellation** → wait 2s → screenshot

Goal: in all 3 modes, the eagle center should overlap the ferrofluid blob center, right-side up, animated.

### Step 3 — If position still wrong, iterate
The Y offset needed depends on where the eagle model's geometric centroid sits relative to the visual body center. Typical correction range: -0.6 to -1.2. Scale range: 0.5–0.8.

### Step 4 — Visual review remaining 11 animals
After eagle is sorted, go through all 12 in Wire + DOF modes:
- Athena Owl, Aphrodite Dove, Apollo Swan, Artemis Deer, Ares Boar
- Dionysus Panther, Poseidon Seahorse, Hermes Tortoise, Hephaestus Donkey
- Demeter Serpent, Rhea Lion

### Step 5 — Commit + update handoff
```bash
cd ~/.openclaw/workspace/jarvis-voice-v2
git add -A
git commit -m "fix(thinking-mesh): center wire/DOF eagle on blob"
```

---

## Key File Locations

| File | Purpose |
|------|---------|
| `frontend/js/thinking-mesh.js` | All wireframe mesh logic (v6 current) |
| `frontend/index.html` | Version bump target (`?v=6` → `?v=7`) |
| `frontend/models/wireframes/zeus-eagle-wireframe.glb` | 1.2MB animated eagle (6 Cinema 4D anims) |
| `.planning/ANIMAL-ANIMATION-HANDOFF.md` | Animal animation status (all 12 complete) |

## Key Constants in thinking-mesh.js

| Constant | Value | Purpose |
|----------|-------|---------|
| `_centerOffsetX` | 0.15 | Camera + scene X target |
| `_centerOffsetY` | 0.45 | Camera + scene Y target |
| Camera position | (0.15, 0.45, 4) | Looking at (0.15, 0.45, 0) |
| GLB normalized scale | 2.4 / max_dimension | Applied in `loadGLBForDOF` |
| Wire mode scale override | 0.5× (current, needs tuning) | In `_buildWireAnimated` |
| Wire mode Y offset | -0.35 (current, needs tuning) | In `_buildWireAnimated` |
| Animation speed | 0.5× (half speed, dreamlike) | `action.timeScale = 0.5` |

## Architecture Notes

```
Wire mode (animated GLB):
  loadGLBForDOF() → _buildWireAnimated()
    ├── _glbAnimWire.container  (skeleton, invisible, drives bones)
    └── _wireAnimLines          (LineSegments, world-space, green)
  _animate() → getDeformedVertices() → updateEdgePositions() per frame

DOF Lines mode (animated GLB):
  loadGLBForDOF() → _buildDofAnimated()
    ├── _glbAnim.container      (skeleton, invisible)
    └── _dofLines               (LineSegments, world-space, gold DOF shader)
  _animate() → same per-frame rebuild

DOF Constellation mode: same as DOF Lines + _dofNodes (Points, teal)
```

## Centering Fix (for reference)

In `loadGLBForDOF` (~line 212):
```javascript
// OLD (wrong — doubled the Y error):
gltf.scene.rotation.x = Math.PI;
gltf.scene.position.sub(center);  // (-cx, -cy, -cz) WRONG

// NEW (correct — accounts for rotation flip):
gltf.scene.rotation.x = Math.PI;
gltf.scene.position.set(-center.x, center.y, center.z);  // (-cx, +cy, +cz) CORRECT
```

**Why**: After `rotation.x = π`, a vertex at local `(cx, cy, cz)` appears at world `(cx, -cy, -cz)`. To bring world to (0,0,0): add `(-cx, cy, cz)`.
