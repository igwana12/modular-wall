---
phase: quick
plan: 260330-sba
subsystem: jarvis-visuals
tags: [svg, vectorize, blender, 3d, logo, potrace]
key-files:
  created:
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/zeus-lightning.svg
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/gorilla-profile.svg
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/rosette.svg
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/zeus-lightning-turntable.mp4
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/gorilla-profile-turntable.mp4
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/rosette-turntable.mp4
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/clean/IMG_7046_clean.png
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/clean/IMG_7040_clean.png
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/clean/IMG_7038_clean.png
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/vectorize_v2.py
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/blender_extrude_render.py
    - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/blender_debug.py
decisions:
  - "potrace turdsize=50 for zeus to remove book page artifacts (dotted line, page number)"
  - "Blender EEVEE (not EEVEE_NEXT) for Blender 5.1 compatibility"
  - "Camera positioned at 30-deg from Z axis to show extruded logo face, not edge"
  - "SVG curves joined before extrusion to preserve fill/hole winding order"
  - "Auto-crop to logo bounding box before potrace for cleaner vectors"
metrics:
  duration: 19min
  completed: 2026-03-30
  tasks: 3
  files: 12
---

# Quick Task 260330-sba: Vectorize Logo Images into SVGs and Extrude to 3D

Photo-to-SVG vectorization pipeline using Pillow + potrace, then 3D extrusion with metallic turntable animations via Blender 5.1 headless rendering.

## Tasks Completed

### Task 1: Clean + Vectorize (3 hero images)

**Pipeline:** JPG -> Grayscale -> Gaussian blur -> Threshold -> Auto-crop -> PBM -> potrace -> SVG

| Image | Source | SVG Paths | SVG Size | Notes |
|-------|--------|-----------|----------|-------|
| Zeus Lightning | IMG_7046.JPG (2858x2269) | 3 | 7.6KB | Cropped bottom 5% to remove page number line, turdsize=50 |
| Gorilla Profile | IMG_7040.JPG (1249x1512) | 4 | 5.3KB | Clean extraction, visor + muzzle + nostrils + ear |
| Rosette | IMG_7038.JPG (1137x1052) | 1 | 5.7KB | Single complex path with interlocking petals |

**Dependencies installed:** potrace 1.16, ImageMagick 7.1.2-18, Pillow 12.1.1

### Task 2: Blender 3D Extrusion + Turntable Render

**Pipeline:** SVG import -> Join curves -> Set fill_mode BOTH + extrude 0.12 + bevel 0.005 -> Convert to mesh -> Center + scale to 2.0 units -> Metallic material (silver, metallic=0.95, roughness=0.3) -> 3-point lighting -> Dark background (#0A0A0A) -> 360-degree rotation over 120 frames -> EEVEE render at 1920x1080 -> ffmpeg compile to H.264 MP4

| Logo | Frames | Render Time | MP4 Size |
|------|--------|-------------|----------|
| zeus-lightning | 120 | ~2min | 907KB |
| gorilla-profile | 120 | ~2min | 1.1MB |
| rosette | 120 | ~2min | 1.2MB |

### Task 3: Quality Assessment

All three logos render as recognizable 3D metallic shapes on dark backgrounds:

- **Zeus Lightning**: Bold silhouette of figure hurling lightning bolt. Small triangular artifact from book edge visible (could be removed with manual SVG editing). Overall shape is clean and dramatic.
- **Gorilla Profile**: Tech-visor ape head clearly visible with muzzle, rectangular visor, and ear. Good depth and detail preservation through the vectorization process.
- **Rosette**: Interlocking petal pattern with center dot. The most visually striking of the three in 3D due to the organic curves and the way light catches the overlapping forms.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Blender 5.1 API changes**
- **Found during:** Task 2
- **Issue:** `fcurves` attribute renamed in Blender 5.x Action API, EEVEE engine renamed from `BLENDER_EEVEE_NEXT` to `BLENDER_EEVEE`
- **Fix:** Added try/except for fcurves access, changed engine name
- **Files modified:** blender_extrude_render.py

**2. [Rule 1 - Bug] Camera viewing edge instead of face of extruded logo**
- **Found during:** Task 2
- **Issue:** SVG imports into XY plane, extrusion along Z. Camera at `(0, -Y, slight_Z)` looked at the thin edge, appearing as a solid rectangle.
- **Fix:** Repositioned camera to `(d*0.35, -d*0.25, d*1.6)` to look primarily down the Z axis at the logo face
- **Files modified:** blender_extrude_render.py, blender_debug.py

**3. [Rule 1 - Bug] SVG fill materials overriding metallic material**
- **Found during:** Task 2
- **Issue:** Blender SVG import creates black fill materials from SVG fill="#000000". These overrode the custom metallic material, making logos appear nearly black.
- **Fix:** Clear all existing materials before applying custom silver metallic material
- **Files modified:** blender_extrude_render.py, blender_debug.py

**4. [Rule 2 - Missing] Book page artifacts in Zeus SVG**
- **Found during:** Task 1
- **Issue:** Dotted line (page number separator) and page number "1747" appeared as 58 extra SVG paths
- **Fix:** Increased potrace turdsize from 10 to 50 for zeus, added bottom 5% crop to remove page artifacts
- **Files modified:** vectorize_v2.py

## Output Directory Structure

```
/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/
├── svg/
│   ├── zeus-lightning.svg (7.6KB, 3 paths)
│   ├── gorilla-profile.svg (5.3KB, 4 paths)
│   └── rosette.svg (5.7KB, 1 path)
├── renders/
│   ├── zeus-lightning-turntable.mp4 (907KB, 120 frames, 4s @ 30fps)
│   ├── gorilla-profile-turntable.mp4 (1.1MB, 120 frames, 4s @ 30fps)
│   ├── rosette-turntable.mp4 (1.2MB, 120 frames, 4s @ 30fps)
│   ├── zeus-lightning_seq/ (120 PNGs)
│   ├── gorilla-profile_seq/ (120 PNGs)
│   └── rosette_seq/ (120 PNGs)
├── clean/
│   ├── IMG_7046_clean.png (23KB)
│   ├── IMG_7040_clean.png (9.1KB)
│   └── IMG_7038_clean.png (11KB)
├── vectorize_v2.py (vectorization pipeline)
├── blender_extrude_render.py (3D render pipeline)
└── blender_debug.py (single-frame debug renderer)
```

## Pipeline Reuse

Both scripts are reusable for the remaining 66 images in ~/Downloads/ (IMG_7036-7106):

```bash
# Vectorize all: edit HERO_IMAGES dict in vectorize_v2.py
python3 vectorize_v2.py

# Render any SVG:
blender --background --python blender_extrude_render.py -- input.svg name output_dir
```

## Known Stubs

None -- all outputs are complete and functional.
