# mosAIc Module Interface Design — Three.js API Mapping

**Date**: 2026-04-06
**Source**: Three.js Knowledge Graph (411 APIs, 563 examples, 2295 mappings)
**Purpose**: Map Three.js APIs to each mosAIc module for delightful, interactive 3D interfaces

---

## Why Three.js for Module Interfaces

The mosAIc modules with screens (Screen-S, Screen-M, Pixel, Round, Mirror, eInk, Controller) can run web-based UIs via embedded browsers or LVGL web views. Three.js enables:
- **3D data visualizations** that feel alive (not flat charts)
- **Particle effects** for ambient/mood states
- **Smooth animations** for scene transitions
- **Shader effects** for visual delight (glow, distortion, waves)
- **CSS3D/2D hybrid** for mixing DOM elements with 3D scenes

The Hub runs a web server — module UIs can be served as web pages rendered on the ESP32's display via a lightweight browser or pre-rendered frame buffers.

---

## Module → Three.js Interface Mapping

### Screen-S (2.8" LCD, 320x240)
**Use case**: Weather, clock, calendar, dashboard widgets

| Three.js API | Score | What It Does for This Module |
|-------------|-------|------------------------------|
| **CSS2DRenderer** | 0.86 | Overlay HTML widgets (weather, time, calendar) on 3D scene |
| **CSS2DObject** | 0.86 | DOM elements positioned in 3D space — each widget is a CSS2D object |
| **CSS3DRenderer** | 0.77 | Perspective transforms on widget cards — tilt, flip, stack |
| **CSS3DObject** | 0.77 | Widget cards that rotate in 3D when switching content |
| **TextGeometry** | 0.77 | 3D extruded text for clock digits with depth and shadow |
| **CanvasTexture** | 0.77 | Dynamic textures — render charts/graphs onto 3D surfaces |
| **Sprite** | 0.86 | Notification dots, status indicators floating over widgets |
| **SpriteMaterial** | 0.86 | Animated notification sprites with opacity/scale transitions |
| **ShaderMaterial** | 0.89 | Custom shaders for weather effects (rain particles, cloud gradients) |

**Recommended UI**: Weather widget with rain particle shader background, 3D clock digits that rotate on the minute, CSS2D calendar cards that flip when scrolling.

**Example References**: `css2d_label`, `css3d_sprites`, `webgl_shader`

---

### Screen-M (5" LCD, 800x480)
**Use case**: Health dashboard, smart home control, media player

| Three.js API | Score | What It Does |
|-------------|-------|-------------|
| **CSS3DRenderer** | 0.77 | Cards for health metrics that flip to show detail |
| **CSS2DRenderer** | 0.86 | Overlay text labels on 3D health visualizations |
| **BufferGeometry** | 0.98 | Custom geometry for heart rate waveforms, step charts |
| **ShaderMaterial** | 0.89 | Pulse glow effects on health metrics, gradient backgrounds |
| **MeshPhysicalMaterial** | 0.89 | Glass-like panels for dashboard cards |
| **InstancedMesh** | 0.86 | Efficient rendering of many identical UI elements (grid of tiles) |
| **Raycaster** | 0.89 | Touch interaction — tap health cards, swipe between views |
| **TextureLoader** | 0.77 | Load album art, app icons, device thumbnails |
| **VideoTexture** | 0.77 | Live camera feeds from security cameras on 3D panels |

**Recommended UI**: Floating glass-panel dashboard with health metrics as 3D cards. Heart rate shown as a glowing ShaderMaterial waveform. Touch to flip cards and reveal detail.

**Example References**: `webgl_interactive_buffergeometry`, `css3d_sprites`, `webgl_materials_physical_clearcoat`

---

### Glow (71x71mm, 256 LEDs)
**Use case**: Ambient light, circadian rhythm, mood, notifications

| Three.js API | Score | What It Does |
|-------------|-------|-------------|
| **ShaderMaterial** | 0.89 | Custom color transition shaders (sunrise gradient, mood waves) |
| **UniformsLib** | 0.77 | Pass time/color/mood uniforms to LED shaders |
| **Color** | 0.89 | Precise color space conversions (HSL for circadian, sRGB for display) |
| **MathUtils** | 0.89 | Smooth lerp between colors, easing functions for transitions |
| **Clock** | 0.89 | Time-based animation — sunrise/sunset color curves |
| **DataTexture** | 0.77 | Generate 16x16 pixel maps sent to the LED matrix |
| **BufferGeometry** | 0.98 | Represent 16x16 LED grid as point cloud for preview |
| **Points** | 0.86 | Visualize LED grid as individual glowing points |
| **PointsMaterial** | 0.86 | Per-point color/size for LED simulation |

**Recommended UI**: Hub's web dashboard uses Three.js to show a live preview of the Glow module's LED state — a 16x16 point grid that mirrors the physical LEDs in real-time. ShaderMaterial generates the actual color patterns sent to the ESP32.

**Example References**: `webgl_buffergeometry_custom_attributes_particles`, `webgl_points_sprites`

---

### Pixel (166x86mm, HUB75 2048 LEDs)
**Use case**: Pixel art, VU meters, scrolling text, animations

| Three.js API | Score | What It Does |
|-------------|-------|-------------|
| **InstancedMesh** | 0.86 | Render 2048 LED pixels as instanced cubes — massive performance |
| **DataTexture** | 0.77 | Frame buffer for pixel art — 64x32 texture mapped to LED grid |
| **CanvasTexture** | 0.77 | Draw pixel art on canvas, upload as texture to display |
| **ShaderMaterial** | 0.89 | Audio-reactive VU meter shaders, color cycling effects |
| **AudioAnalyser** | 0.77 | FFT frequency data → pixel art VU meter visualization |
| **AudioListener** | 0.98 | Capture audio for real-time music visualization |
| **Clock** | 0.89 | Frame-rate independent animation for smooth pixel art |
| **BufferAttribute** | 0.86 | Per-pixel color attributes updated each frame |
| **Color** | 0.89 | HSV/HSL color cycling for retro arcade effects |
| **MathUtils.lerp** | 0.89 | Smooth pixel transitions, fade effects |

**Recommended UI**: Audio-reactive pixel art engine. AudioAnalyser feeds FFT data → ShaderMaterial maps frequencies to 64x32 color grid → InstancedMesh renders 2048 glowing cubes. Also: classic Tetris, Game of Life, scrolling text.

**Example References**: `webaudio_visualizer`, `webgl_instancing_performance`, `webgl_buffergeometry_instancing`

---

### Voice / Speaker-S (Audio modules)
**Use case**: Audio visualization, voice waveform, spatial audio

| Three.js API | Score | What It Does |
|-------------|-------|-------------|
| **Audio** | 0.98 | Core audio playback through speakers |
| **AudioListener** | 0.98 | Spatial audio listener positioning |
| **AudioAnalyser** | 0.77 | Real-time FFT for voice waveform display |
| **PositionalAudio** | 0.77 | 3D positioned audio — sound appears to come from specific wall location |
| **AudioContext** | 0.77 | Low-level audio processing |
| **ShaderMaterial** | 0.89 | Voice waveform visualization shader |
| **BufferGeometry** | 0.98 | Dynamic waveform mesh updated per frame |
| **Points** | 0.86 | Particle-based audio visualization (frequency → particle positions) |

**Recommended UI**: When the Voice module is active, the Hub dashboard shows a Three.js voice waveform on the Screen-S module — AudioAnalyser feeds amplitude data to a ShaderMaterial that renders a glowing teal oscilloscope. PositionalAudio makes multi-speaker walls sound spatial.

**Example References**: `webaudio_visualizer`, `webaudio_sandbox`, `webaudio_orientation`

---

### Round (Ø91mm, 466x466 AMOLED)
**Use case**: Circular clock, gauge, notification orbit

| Three.js API | Score | What It Does |
|-------------|-------|-------------|
| **ShaderMaterial** | 0.89 | Circular gradient shaders, radial progress rings |
| **RingGeometry** | 0.89 | Clock face rings, progress indicators, notification orbits |
| **CircleGeometry** | 0.89 | Clock face background, gauge backgrounds |
| **TorusGeometry** | 0.89 | Notification orbit ring — items circle around the display edge |
| **Sprite** | 0.86 | Notification icons orbiting in 3D space around clock center |
| **TextGeometry** | 0.77 | 3D clock digits with depth and glow |
| **Clock** | 0.89 | Accurate time tracking for smooth second hand animation |
| **MathUtils** | 0.89 | Polar coordinates for circular layouts (angle → position) |
| **CSS3DObject** | 0.77 | DOM-based widgets arranged in circular patterns |

**Recommended UI**: 3D analog clock with floating hour markers (Sprites orbiting in a torus), glowing second hand (ShaderMaterial with emission), notification items that orbit the clock face on a TorusGeometry track. Circular progress rings for timers.

**Example References**: `css3d_sprites`, `webgl_geometry_shapes`

---

### Mirror (Ø120mm, camera + display)
**Use case**: AR filters, face mesh, exercise tracking

| Three.js API | Score | What It Does |
|-------------|-------|-------------|
| **VideoTexture** | 0.77 | Camera feed as texture on the display surface |
| **ShaderMaterial** | 0.89 | AR filter overlays — color grading, glow effects, face distortion |
| **BufferGeometry** | 0.98 | Face mesh from MediaPipe (468 vertices) rendered as geometry |
| **MeshStandardMaterial** | 0.98 | Realistic face mesh rendering with lighting |
| **SkeletonHelper** | 0.86 | Visualize body pose skeleton from pose estimation |
| **Bone** | 0.86 | Skeletal structure for body tracking overlay |
| **Raycaster** | 0.89 | Touch interaction on the mirror surface |
| **CSS2DRenderer** | 0.86 | Overlay exercise stats (reps, heart rate) on mirror feed |
| **EffectComposer** | 0.77 | Post-processing chain for filter effects (bloom, vignette, color shift) |
| **UnrealBloomPass** | 0.77 | Glow effect on face mesh for deity filter overlays |
| **GlitchPass** | 0.77 | Glitch effect for creative face filters |

**Recommended UI**: Camera feed via VideoTexture → MediaPipe face mesh as BufferGeometry overlay → ShaderMaterial for deity crown/helmet effects → UnrealBloomPass for ethereal glow → CSS2D overlay for exercise stats. The full AR filter pipeline in Three.js.

**Example References**: `webgl_postprocessing_unreal_bloom`, `webgl_effects_anaglyph`, `webgl_loader_gltf_animation_pointer`

---

### Holo (140x140mm, POV fan)
**Use case**: Floating 3D visuals, sacred geometry, wow factor

| Three.js API | Score | What It Does |
|-------------|-------|-------------|
| **Points** | 0.86 | Particle-based sacred geometry — mandala patterns from point clouds |
| **PointsMaterial** | 0.86 | Glowing particles for holographic effect |
| **ShaderMaterial** | 0.89 | Custom hologram shaders — scan-line, transparency, flicker |
| **BufferGeometry** | 0.98 | Custom geometry for sacred geometry patterns (flower of life, metatron's cube) |
| **IcosahedronGeometry** | 0.89 | Platonic solids for rotating sacred geometry |
| **OctahedronGeometry** | 0.89 | Geometric primitives for holographic display |
| **EdgesGeometry** | 0.77 | Wireframe-style holographic rendering |
| **LineBasicMaterial** | 0.86 | Glowing lines for wireframe holograms |
| **MathUtils** | 0.89 | Rotation, oscillation for hypnotic spinning effects |
| **GPUComputationRenderer** | 0.60 | GPU particle simulations for advanced holographic effects |

**Recommended UI**: Sacred geometry engine — IcosahedronGeometry with EdgesGeometry wireframe + ShaderMaterial hologram glow effect. Rotating, pulsing, breathing sacred geometry patterns. Points-based mandala that evolves over time via GPU particle simulation.

**Example References**: `webgl_buffergeometry_custom_attributes_particles`, `webgl_lines_fat`, `webgl_geometry_shapes`

---

### Hub (Web Dashboard)
**Use case**: Module management, wall configurator, scene control

| Three.js API | Score | What It Does |
|-------------|-------|-------------|
| **CSS3DRenderer** | 0.77 | 3D wall visualization — modules as CSS3D cards in space |
| **CSS3DObject** | 0.77 | Each module represented as a 3D DOM element card |
| **CSS2DRenderer** | 0.86 | Module labels, status indicators overlaid on 3D wall view |
| **InstancedMesh** | 0.86 | Efficient rendering of module grid (many similar objects) |
| **Raycaster** | 0.89 | Click to select modules in the 3D wall configurator |
| **OrbitControls** | 0.86 | Rotate/zoom the 3D wall view |
| **SVGLoader** | 0.77 | Load module icons as SVG geometry |
| **TextGeometry** | 0.77 | Module labels in 3D space |
| **MeshPhysicalMaterial** | 0.89 | Glass-like module preview cards |
| **TransformControls** | 0.77 | Drag modules in the 3D configurator |
| **HTMLMesh** | 0.60 | Embed HTML interfaces as 3D objects in the wall view |
| **BatchedMesh** | 0.60 | Performance optimization for large module counts |

**Recommended UI**: 3D wall configurator where you orbit around a virtual steel wall and drag CSS3DObject module cards onto it. Each card shows the module's live status. Raycaster handles click selection, TransformControls handles drag-and-drop. The entire wall dashboard is a Three.js scene with DOM elements mixed in.

**Example References**: `css3d_sprites`, `webgl_instancing_raycast`, `misc_controls_transform`

---

### Controller (Ø62mm handheld, 480x480)
**Use case**: Module selection, scene switching, dial control

| Three.js API | Score | What It Does |
|-------------|-------|-------------|
| **CSS3DRenderer** | 0.77 | Circular menu of modules rendered in 3D |
| **TorusGeometry** | 0.89 | Circular dial UI matching the physical rotary encoder |
| **ShaderMaterial** | 0.89 | Radial menu highlight shader synced to encoder rotation |
| **Sprite** | 0.86 | Module icons as sprites arranged in a circle |
| **RingGeometry** | 0.89 | Selection ring that follows the rotary encoder position |
| **MathUtils** | 0.89 | Angle calculation from encoder input → menu position |
| **Raycaster** | 0.89 | Select module by pointing controller at the wall |

**Recommended UI**: Circular 3D menu that rotates as you turn the physical encoder. Module icons (Sprites) arranged on a TorusGeometry track. Current selection highlighted with a ShaderMaterial glow ring. Twist to scroll, click to select.

---

### eInk (180x120mm, 800x480 e-paper)
**Use case**: Always-on quotes, art, schedule

| Three.js API | Score | What It Does |
|-------------|-------|-------------|
| **CanvasTexture** | 0.77 | Pre-render complex layouts to canvas → convert to e-ink compatible bitmap |
| **TextGeometry** | 0.77 | Generate typographic layouts for quotes and text art |
| **SVGLoader** | 0.77 | Load vector art for clean e-ink rendering |
| **ShaderMaterial** | 0.89 | Dithering shader to convert color → e-ink compatible grayscale/BW |
| **CSS2DRenderer** | 0.86 | Layout engine for scheduling content on the e-ink display |

**Recommended UI**: Content is pre-rendered using Three.js on the Hub, converted to e-ink compatible bitmap via a dithering ShaderMaterial, then pushed to the module. The e-ink module itself is too low-power to run Three.js — it receives pre-rendered frames.

---

## Top 20 Three.js APIs for mosAIc (by priority score × module coverage)

| # | API | Score | Modules Using It |
|---|-----|-------|-----------------|
| 1 | **BufferGeometry** | 0.98 | Screen-M, Glow, Pixel, Voice, Mirror, Holo |
| 2 | **Audio** | 0.98 | Voice, Speaker-S, Pixel |
| 3 | **AudioListener** | 0.98 | Voice, Speaker-S, Pixel |
| 4 | **MeshStandardMaterial** | 0.98 | Mirror, Hub, Screen-M |
| 5 | **ShaderMaterial** | 0.89 | ALL modules — custom effects everywhere |
| 6 | **Raycaster** | 0.89 | Screen-M, Hub, Controller, Mirror |
| 7 | **Color** | 0.89 | Glow, Pixel, Round |
| 8 | **MathUtils** | 0.89 | Glow, Pixel, Round, Controller, Holo |
| 9 | **Clock** | 0.89 | Glow, Pixel, Round |
| 10 | **RingGeometry** | 0.89 | Round, Controller |
| 11 | **MeshPhysicalMaterial** | 0.89 | Screen-M, Hub |
| 12 | **CSS2DRenderer** | 0.86 | Screen-S, Screen-M, Mirror, Hub, eInk |
| 13 | **CSS2DObject** | 0.86 | Screen-S, Screen-M, Mirror, Hub |
| 14 | **InstancedMesh** | 0.86 | Pixel, Hub, Screen-M |
| 15 | **OrbitControls** | 0.86 | Hub (3D wall configurator) |
| 16 | **Sprite** | 0.86 | Screen-S, Round, Holo, Controller |
| 17 | **SpriteMaterial** | 0.86 | Screen-S, Round, Controller |
| 18 | **Points** | 0.86 | Glow, Pixel, Holo, Voice |
| 19 | **PointsMaterial** | 0.86 | Glow, Pixel, Holo |
| 20 | **SkeletonHelper** | 0.86 | Mirror (body tracking) |

---

## MVI Stacks (Minimum Viable Interface)

High production value, low Blender dependency — pure code approaches:

### MVI-1: Dashboard (Screen-S, Screen-M)
```
CSS2DRenderer + CSS3DObject + ShaderMaterial(background) + CanvasTexture
```
DOM widgets in 3D space with shader backgrounds. No 3D models needed.

### MVI-2: Ambient (Glow)
```
DataTexture + ShaderMaterial + Color + Clock
```
Shader generates 16x16 color grid per frame. Pure math, no geometry.

### MVI-3: Pixel Art (Pixel)
```
InstancedMesh(2048) + BufferAttribute(color) + AudioAnalyser
```
2048 instanced cubes with per-instance color. Audio-reactive.

### MVI-4: Circular UI (Round, Controller)
```
RingGeometry + TorusGeometry + Sprite + ShaderMaterial
```
Radial layouts with sprites on torus tracks. Encoder-synced.

### MVI-5: Hologram (Holo)
```
Points + PointsMaterial + IcosahedronGeometry + EdgesGeometry + ShaderMaterial
```
Wireframe sacred geometry with glowing particle effects. Pure code.

### MVI-6: AR Mirror (Mirror)
```
VideoTexture + BufferGeometry(face mesh) + EffectComposer + UnrealBloomPass
```
Camera → face mesh → post-processing chain. MediaPipe handles the ML.

---

## Integration Notes

- **Hub serves all UIs** — Three.js scenes are web pages served by the FastAPI Wall Controller
- **ESP32 displays** receive pre-rendered frame buffers, not live Three.js
- **Three.js runs on the Hub's browser** (or a headless browser on the Hub SBC)
- **Module screens** get JPEG/PNG frames pushed at 15-30fps over WiFi
- **Exception**: If module has a powerful enough SBC (RPi in Mirror), it can run Three.js locally

---

## Source Files

| File | Location | Contents |
|------|----------|----------|
| threejs_rag.md | ~/.openclaw/workspace-main/threejs-knowledge-graph/ | 4068 lines — full API reference with scores |
| perfect_apis.csv | .../raw/perfect_catalogs/ | 411 APIs with scores and tags |
| perfect_examples.csv | .../raw/perfect_examples/ | 563 examples with API mappings |
| implementation-map.csv | .../raw/examples/ | 2295 API→example cross-references |

---

*Every module deserves a delightful interface. Three.js makes data feel alive, interactions feel physical, and the wall feel like it's breathing.*
