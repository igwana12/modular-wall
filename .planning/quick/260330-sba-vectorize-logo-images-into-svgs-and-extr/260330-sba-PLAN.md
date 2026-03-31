---
type: quick
tasks: 3
autonomous: true
files_modified:
  - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/*.svg
  - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/cleaned/*.png
  - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/*.mp4
  - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/pipeline.py
must_haves:
  truths:
    - "3 hero logos exist as clean SVGs with no paper texture"
    - "3 hero logos rendered as 3D extruded turntable videos"
    - "Pipeline script can process any of the 69 images"
  artifacts:
    - path: "/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/IMG_7046.svg"
      provides: "Zeus lightning bolt logo SVG"
    - path: "/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/IMG_7040.svg"
      provides: "Gorilla tech visor logo SVG"
    - path: "/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/IMG_7038.svg"
      provides: "Petal rosette logo SVG"
    - path: "/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/"
      provides: "3 turntable rotation MP4 videos"
---

<objective>
Vectorize 3 hero logo photographs into clean SVGs, then extrude them into 3D rotating animation videos via Blender MCP. Build a reusable pipeline for all 69 logos.

Purpose: Transform photographed B&W logo designs into digital SVG assets and 3D animated renders for use in JARVIS visuals and Sacred Circuits content.
Output: 3 clean SVGs, 3 turntable MP4 videos, 1 reusable pipeline script.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
Source images: ~/Downloads/IMG_7036.JPG through IMG_7106.JPG (69 photos of B&W logos from design book)
Output directory: /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/

Hero images:
- IMG_7046.JPG — Zeus figure hurling lightning bolt (strong silhouette, clean edges)
- IMG_7040.JPG — Gorilla/ape profile with tech visor (compact, internal white details)
- IMG_7038.JPG — Interlocking petal rosette (geometric, overlapping strokes)

All images are photographed from a book — expect paper texture, slight perspective skew, warm lighting cast. Logos themselves are solid black on off-white paper.

Blender MCP tools: mcp__blender__execute_blender_code, mcp__blender__get_scene_info, mcp__blender__get_viewport_screenshot
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install dependencies and build image-to-SVG pipeline</name>
  <files>
    /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/pipeline.py
    /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/cleaned/*.png
    /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/*.svg
  </files>
  <action>
    STEP 0 — Install missing tools:
    - `brew install potrace imagemagick`
    - `pip3 install Pillow`
    Verify each installs successfully before proceeding.

    STEP 1 — Create output directory structure:
    ```
    /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/
      cleaned/    # Thresholded B&W PNGs
      svg/        # Traced SVG files
      renders/    # 3D turntable videos
    ```

    STEP 2 — Build pipeline.py at /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/pipeline.py:
    A Python script that takes an input JPG path and produces a clean SVG. Steps:

    a) LOAD: Open JPG with Pillow
    b) GRAYSCALE: Convert to grayscale
    c) CROP: Auto-detect logo bounds (find bounding box of dark pixels with threshold 180), add 5% padding, crop to just the logo. This removes page numbers, dashed lines, and book edges visible in the photos.
    d) THRESHOLD: Apply binary threshold at 128 to get pure black/white. Use Pillow's `point()` method: pixels < 128 become 0 (black), >= 128 become 255 (white).
    e) SAVE PBM: Save as PBM (Portable Bitmap) format — potrace's native input. Pillow can save as PBM directly with `image.save('file.pbm')`.
    f) TRACE: Run potrace via subprocess: `potrace -s -o output.svg input.pbm` (-s for SVG output). Add `--turdsize 10` to remove small speckles (paper grain artifacts).
    g) CLEANUP: Remove intermediate PBM file. Save cleaned PNG to cleaned/ directory for reference.

    The script should accept: `python3 pipeline.py IMG_7046.JPG IMG_7040.JPG IMG_7038.JPG` (multiple files)
    Or: `python3 pipeline.py --all ~/Downloads/IMG_70*.JPG` for batch mode.

    STEP 3 — Run pipeline on 3 hero images:
    ```
    python3 /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/pipeline.py \
      ~/Downloads/IMG_7046.JPG ~/Downloads/IMG_7040.JPG ~/Downloads/IMG_7038.JPG
    ```

    Verify SVGs open correctly — check file size is reasonable (> 1KB, < 500KB each).
    If any SVG looks wrong (too much noise, lost detail), adjust threshold or turdsize and re-run.
  </action>
  <verify>
    <automated>ls -la /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/IMG_704{0,6}.svg /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/IMG_7038.svg && echo "All 3 SVGs exist"</automated>
  </verify>
  <done>3 clean SVG files exist in svg/ directory. Each contains traced vector paths with no paper texture artifacts. Pipeline script works for arbitrary input JPGs.</done>
</task>

<task type="auto">
  <name>Task 2: Extrude SVGs into 3D in Blender and render turntable animations</name>
  <files>
    /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/IMG_7046_turntable.mp4
    /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/IMG_7040_turntable.mp4
    /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/IMG_7038_turntable.mp4
  </files>
  <action>
    For each of the 3 hero SVGs, use mcp__blender__execute_blender_code to:

    A) SCENE SETUP (run once before first logo):
    - Clear default scene (delete cube, camera, light)
    - Set render engine to EEVEE (fast) or Cycles (quality — user preference, start with EEVEE for speed)
    - Set render resolution: 1080x1080 pixels
    - Set frame range: 1-120 (5 seconds at 24fps for one full rotation)
    - Set output format: FFmpeg video, MP4 container, H.264 codec
    - Add dark background (world color: #0a0a0a or subtle dark gradient)

    B) 3-POINT LIGHTING:
    - Key light: Area light, 500W, positioned upper-right-front, warm white (5500K)
    - Fill light: Area light, 200W, positioned left, cool white (6500K)
    - Rim light: Area light, 300W, positioned behind-above, neutral white
    - Optional: subtle HDRI environment for reflections (use built-in if available)

    C) FOR EACH SVG (clear mesh objects between logos, keep lights/camera):
    1. Import SVG: `bpy.ops.import_curve.svg(filepath=svg_path)`
    2. Select all imported curve objects, join them: `bpy.ops.object.join()`
    3. Convert curves to mesh: `bpy.ops.object.convert(target='MESH')`
    4. Add Solidify modifier: thickness 0.15 (gives 3D depth to the flat logo)
    5. OR use extrude on curves before mesh conversion: set bevel_depth or extrude property on curve data
    6. Center origin: `bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY')`
    7. Scale to fit viewport (normalize to ~2 units wide)
    8. Apply metallic material:
       - Base color: #C0C0C0 (silver) or #D4AF37 (gold)
       - Metallic: 1.0
       - Roughness: 0.3
       - Specular: 0.8
    9. Add camera: positioned to frame the logo nicely (distance ~5 units, slight angle above)
    10. Add turntable animation: keyframe object rotation Z from 0 to 360 degrees over 120 frames, set interpolation to linear
    11. Set output path: `/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/IMG_XXXX_turntable.mp4`
    12. Render animation: `bpy.ops.render.render(animation=True)`

    IMPORTANT Blender SVG import notes:
    - Blender imports SVG curves at very small scale — will need to scale up significantly (100x or more)
    - SVG import creates multiple curve objects (one per path) — must join before extrusion
    - The extrude property on curve data (`curve.extrude = 0.1`) works better than solidify for clean results
    - Set curve fill mode to 'BOTH' for solid faces on front and back

    Take a viewport screenshot after each logo is set up (before render) using mcp__blender__get_viewport_screenshot to verify it looks correct.
  </action>
  <verify>
    <automated>ls -la /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/*.mp4 && echo "Render files exist"</automated>
  </verify>
  <done>3 MP4 turntable videos exist in renders/ directory. Each shows a metallic extruded logo rotating 360 degrees over ~5 seconds with professional 3-point lighting on a dark background.</done>
</task>

<task type="checkpoint:human-verify" gate="non-blocking">
  <what-built>3 vectorized SVGs and 3D turntable render videos from photographed logo designs</what-built>
  <how-to-verify>
    1. Open SVGs in browser or Finder Quick Look:
       - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/IMG_7046.svg (Zeus lightning)
       - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/IMG_7040.svg (gorilla visor)
       - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/svg/IMG_7038.svg (petal rosette)
       Verify: clean vectors, no paper grain, recognizable shapes
    2. Play turntable videos:
       - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/IMG_7046_turntable.mp4
       - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/IMG_7040_turntable.mp4
       - /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/renders/IMG_7038_turntable.mp4
       Verify: smooth rotation, metallic appearance, good lighting, no artifacts
    3. To process remaining 66 logos: `python3 /Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos/pipeline.py --all ~/Downloads/IMG_70*.JPG`
  </how-to-verify>
  <resume-signal>Type "approved" or describe issues with specific logos</resume-signal>
</task>

</tasks>

<verification>
- 3 SVG files in svg/ directory, each > 1KB
- 3 MP4 files in renders/ directory, each > 100KB
- Pipeline script runs without errors on arbitrary input JPGs
- SVGs render correctly in a web browser
</verification>

<success_criteria>
3 hero logos (Zeus lightning, gorilla visor, petal rosette) transformed from book photographs into clean SVG vectors and 3D turntable animation videos. Pipeline script ready for batch processing remaining 66 logos.
</success_criteria>

<output>
After completion, create `.planning/quick/260330-sba-vectorize-logo-images-into-svgs-and-extr/260330-sba-SUMMARY.md`
</output>
