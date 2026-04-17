# Three.js Knowledge Graph — RAG Reference

This document is the single source of truth for Three.js API selection,
scoring, and implementation patterns across Sacred Circuits projects.
Use this for retrieval-augmented generation when building Three.js features.

## Overview

- **Total APIs**: 556
- **Total Examples**: 563
- **API→Example Mappings**: 2295

## Projects

| Tag | Project | Focus |
|-----|---------|-------|
| Pantheon | 21-Deity System | Audio, speech, GLTF characters, morph targets, CSS3D overlays |
| Orbs | Spirit Sphere | GPU particles, sacred glow, post-processing, shaders |
| Wall | mosAIc Installations | CSS2D/3D hybrid, DOM-3D mixing, large displays |
| Constellation | Celestial Characters | Wireframe, edges, lines, star fields, points |
| Ritual | Spatial Interactions | WebXR, raycasting, controls, spatial audio |

## Scoring System

Each API is scored 0.0–1.0 on four axes:
- **production_ready** (weight 0.4): API stability, docs quality, years in core
- **learning_value** (weight 0.3): tutorial availability, example clarity
- **blender_dep** (weight 0.2, inverted): 0.0 = pure code, 1.0 = needs complex Blender assets
- **priority_score** = (prod×0.4) + (learn×0.3) + ((1−blender)×0.2) + 0.1

---

## API Reference by Category

### Animation

#### KeyframeTrack

- **Docs**: https://threejs.org/docs/#api/en/animation/KeyframeTrack
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Pantheon
- **Domains**: animation

#### AnimationMixer

- **Docs**: https://threejs.org/docs/#api/en/animation/AnimationMixer
- **Scores**: prod=1.0 | learn=1.0 | blender=0.8 | priority=0.84
- **Projects**: Pantheon
- **Domains**: animation
- **Related APIs**: AnimationClip|AnimationAction|Object3D
- **Also Used In**: webgl_animation_keyframes|webgl_animation_skinning_blending|webgl_animation_skinning_additive_blending|webgl_animation_skinning_ik|webgl_animation_skinning_morph|webgl_animation_multiple|webgl_animation_walk|webgl_loader_collada_skinning|webgl_loader_gltf_animation_pointer|webgpu_animation_retargeting

#### AnimationObjectGroup

- **Docs**: https://threejs.org/docs/#api/en/animation/AnimationObjectGroup
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: animation|loading

#### AnimationUtils

- **Docs**: https://threejs.org/docs/#api/en/animation/AnimationUtils
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: animation

#### BooleanKeyframeTrack

- **Docs**: https://threejs.org/docs/#api/en/animation/tracks/BooleanKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: animation

#### ColorKeyframeTrack

- **Docs**: https://threejs.org/docs/#api/en/animation/tracks/ColorKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: animation|math

#### NumberKeyframeTrack

- **Docs**: https://threejs.org/docs/#api/en/animation/tracks/NumberKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: animation

#### PropertyBinding

- **Docs**: https://threejs.org/docs/#api/en/animation/PropertyBinding
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: animation

#### PropertyMixer

- **Docs**: https://threejs.org/docs/#api/en/animation/PropertyMixer
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: animation

#### QuaternionKeyframeTrack

- **Docs**: https://threejs.org/docs/#api/en/animation/tracks/QuaternionKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: animation|math

#### StringKeyframeTrack

- **Docs**: https://threejs.org/docs/#api/en/animation/tracks/StringKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: animation

#### VectorKeyframeTrack

- **Docs**: https://threejs.org/docs/#api/en/animation/tracks/VectorKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: animation|math

#### AnimationAction

- **Docs**: https://threejs.org/docs/#api/en/animation/AnimationAction
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Pantheon
- **Domains**: animation

#### AnimationClip

- **Docs**: https://threejs.org/docs/#api/en/animation/AnimationClip
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Pantheon
- **Domains**: animation
- **Related APIs**: AnimationMixer|KeyframeTrack|AnimationAction
- **Also Used In**: webgl_animation_keyframes|webgl_animation_skinning_blending|webgl_animation_skinning_additive_blending|webgl_animation_skinning_ik|webgl_animation_skinning_morph|webgl_animation_multiple|webgl_animation_walk|webgl_loader_collada_skinning|webgl_loader_gltf_animation_pointer|webgpu_animation_retargeting

#### CCDIKHelper

- **Docs**: https://threejs.org/docs/#examples/en/animation/CCDIKHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.5 | priority=0.56
- **Projects**: Constellation|Pantheon
- **Domains**: animation
- **Notes**: Addon/Example class

#### AnimationClipCreator

- **Docs**: https://threejs.org/docs/#examples/en/animation/AnimationClipCreator
- **Scores**: prod=0.5 | learn=0.4 | blender=0.5 | priority=0.52
- **Projects**: Pantheon
- **Domains**: animation
- **Notes**: Addon/Example class

#### CCDIKSolver

- **Docs**: https://threejs.org/docs/#examples/en/animation/CCDIKSolver
- **Scores**: prod=0.5 | learn=0.4 | blender=0.5 | priority=0.52
- **Projects**: Pantheon
- **Domains**: animation
- **Notes**: Addon/Example class

### Audio

#### Audio

- **Docs**: https://threejs.org/docs/#api/en/audio/Audio
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Pantheon
- **Domains**: audio
- **Related APIs**: AudioListener|AudioAnalyser|PositionalAudio

#### AudioListener

- **Docs**: https://threejs.org/docs/#api/en/audio/AudioListener
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Pantheon
- **Domains**: audio
- **Also Used In**: webaudio_orientation|webaudio_sandbox|webaudio_timing|webaudio_visualizer

#### AudioAnalyser

- **Docs**: https://threejs.org/docs/#api/en/audio/AudioAnalyser
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: audio

#### AudioContext

- **Docs**: https://threejs.org/docs/#api/en/audio/AudioContext
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon|Wall
- **Domains**: audio

#### PositionalAudio

- **Docs**: https://threejs.org/docs/#api/en/audio/PositionalAudio
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Domains**: audio
- **Related APIs**: Audio|AudioListener|Object3D

### Cameras

#### PerspectiveCamera

- **Docs**: https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Constellation
- **Domains**: rendering
- **Related APIs**: OrthographicCamera|CubeCamera|Camera
- **Key Examples** (559): webgl_animation_keyframes|webgl_animation_skinning_blending|webgl_animation_skinning_additive_blending|webgl_animation_skinning_ik|webgl_animation_skinning_morph|webgl_animation_multiple|webgl_animation_walk|webgl_batch_lod_bvh|webgl_camera|webgl_camera_logarithmicdepthbuffer

#### Camera

- **Docs**: https://threejs.org/docs/#api/en/cameras/Camera
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Constellation
- **Domains**: rendering

#### OrthographicCamera

- **Docs**: https://threejs.org/docs/#api/en/cameras/OrthographicCamera
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Constellation
- **Domains**: rendering
- **Related APIs**: PerspectiveCamera|Camera
- **Key Examples** (2): webgl_interactive_cubes_ortho|css3d_orthographic

#### ArrayCamera

- **Docs**: https://threejs.org/docs/#api/en/cameras/ArrayCamera
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation|Ritual
- **Domains**: math|xr
- **Key Examples** (2): webgl_camera_array|webgpu_camera_array

#### CubeCamera

- **Docs**: https://threejs.org/docs/#api/en/cameras/CubeCamera
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation
- **Domains**: rendering

#### StereoCamera

- **Docs**: https://threejs.org/docs/#api/en/cameras/StereoCamera
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation
- **Domains**: rendering

### Core

#### BufferGeometry

- **Docs**: https://threejs.org/docs/#api/en/core/BufferGeometry
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: geometry
- **Related APIs**: BufferAttribute|Mesh|Material
- **Also Used In**: webgl_interactive_buffergeometry|webgl_buffergeometry|webgl_buffergeometry_attributes_integer|webgl_buffergeometry_attributes_none|webgl_buffergeometry_custom_attributes_particles|webgl_buffergeometry_drawrange|webgl_buffergeometry_glbufferattribute|webgl_buffergeometry_indexed|webgl_buffergeometry_instancing|webgl_buffergeometry_instancing_billboards

#### Object3D

- **Docs**: https://threejs.org/docs/#api/en/core/Object3D
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: loading
- **Related APIs**: Scene|Mesh|Group

#### Raycaster

- **Docs**: https://threejs.org/docs/#api/en/core/Raycaster
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Ritual
- **Domains**: interaction|math
- **Related APIs**: Object3D|Camera|Vector2
- **Also Used In**: webgl_geometry_terrain_raycast|webgl_instancing_raycast|webgl_interactive_buffergeometry|webgl_interactive_cubes|webgl_interactive_cubes_gpu|webgl_interactive_cubes_ortho|webgl_interactive_lines|webgl_interactive_points|webgl_interactive_raycasting_points|webgl_interactive_voxelpainter

#### BufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/BufferAttribute
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: geometry

#### Clock

- **Docs**: https://threejs.org/docs/#api/en/core/Clock
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Domains**: rendering

#### EventDispatcher

- **Docs**: https://threejs.org/docs/#api/en/core/EventDispatcher
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Domains**: rendering

#### Layers

- **Docs**: https://threejs.org/docs/#api/en/core/Layers
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Domains**: rendering

#### Timer

- **Docs**: https://threejs.org/docs/#api/en/core/Timer
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Domains**: rendering

#### Uniform

- **Docs**: https://threejs.org/docs/#api/en/core/Uniform
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Domains**: rendering

#### InstancedBufferGeometry

- **Docs**: https://threejs.org/docs/#api/en/core/InstancedBufferGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### GLBufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/GLBufferAttribute
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: geometry

#### InstancedBufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/InstancedBufferAttribute
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: geometry

#### InterleavedBuffer

- **Docs**: https://threejs.org/docs/#api/en/core/InterleavedBuffer
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: geometry

#### InterleavedBufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/InterleavedBufferAttribute
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: geometry

#### RenderTarget

- **Docs**: https://threejs.org/docs/#api/en/core/RenderTarget
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual
- **Domains**: rendering|xr

#### Float16BufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Float16BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### Float32BufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Float32BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### InstancedInterleavedBuffer

- **Docs**: https://threejs.org/docs/#api/en/core/InstancedInterleavedBuffer
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### Int16BufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Int16BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### Int32BufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Int32BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### Int8BufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Int8BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### RenderTarget3D

- **Docs**: https://threejs.org/docs/#api/en/core/RenderTarget3D
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual
- **Domains**: rendering|xr

#### Uint16BufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Uint16BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### Uint32BufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Uint32BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### Uint8BufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Uint8BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### Uint8ClampedBufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Uint8ClampedBufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### UniformsGroup

- **Docs**: https://threejs.org/docs/#api/en/core/UniformsGroup
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: rendering
- **Also Used In**: webgl_ubo|webgl_ubo_arrays

### Extras

#### PMREMGenerator

- **Docs**: https://threejs.org/docs/#api/en/extras/PMREMGenerator
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Domains**: textures
- **Also Used In**: webgl_pmrem_cubemap|webgl_pmrem_equirectangular|webgl_pmrem_test|webgpu_pmrem_cubemap|webgpu_pmrem_equirectangular|webgpu_pmrem_scene|webgpu_pmrem_test

#### ArcCurve

- **Docs**: https://threejs.org/docs/#api/en/extras/curves/ArcCurve
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual
- **Domains**: xr

#### CatmullRomCurve3

- **Docs**: https://threejs.org/docs/#api/en/extras/curves/CatmullRomCurve3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: rendering

#### CubicBezierCurve3

- **Docs**: https://threejs.org/docs/#api/en/extras/curves/CubicBezierCurve3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Curve

- **Docs**: https://threejs.org/docs/#api/en/extras/core/Curve
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: rendering

#### CurvePath

- **Docs**: https://threejs.org/docs/#api/en/extras/core/CurvePath
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: rendering

#### EllipseCurve

- **Docs**: https://threejs.org/docs/#api/en/extras/curves/EllipseCurve
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: rendering

#### LineCurve

- **Docs**: https://threejs.org/docs/#api/en/extras/curves/LineCurve
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation
- **Domains**: rendering

#### LineCurve3

- **Docs**: https://threejs.org/docs/#api/en/extras/curves/LineCurve3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation
- **Domains**: rendering

#### Path

- **Docs**: https://threejs.org/docs/#api/en/extras/core/Path
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: rendering

#### QuadraticBezierCurve3

- **Docs**: https://threejs.org/docs/#api/en/extras/curves/QuadraticBezierCurve3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Shape

- **Docs**: https://threejs.org/docs/#api/en/extras/core/Shape
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: geometry

#### ShapePath

- **Docs**: https://threejs.org/docs/#api/en/extras/core/ShapePath
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: geometry

#### SplineCurve

- **Docs**: https://threejs.org/docs/#api/en/extras/curves/SplineCurve
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation
- **Domains**: rendering

#### Controls

- **Docs**: https://threejs.org/docs/#api/en/extras/Controls
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual
- **Domains**: interaction

#### CubicBezierCurve

- **Docs**: https://threejs.org/docs/#api/en/extras/curves/CubicBezierCurve
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: math

#### DataUtils

- **Docs**: https://threejs.org/docs/#api/en/extras/DataUtils
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: rendering

#### Earcut

- **Docs**: https://threejs.org/docs/#api/en/extras/Earcut
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual
- **Domains**: math|xr

#### ImageUtils

- **Docs**: https://threejs.org/docs/#api/en/extras/ImageUtils
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: rendering

#### QuadraticBezierCurve

- **Docs**: https://threejs.org/docs/#api/en/extras/curves/QuadraticBezierCurve
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: math

#### ShapeUtils

- **Docs**: https://threejs.org/docs/#api/en/extras/ShapeUtils
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry

#### TextureUtils

- **Docs**: https://threejs.org/docs/#api/en/extras/TextureUtils
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall
- **Domains**: textures

### Geometries

#### BoxGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/BoxGeometry
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: geometry
- **Also Used In**: webgl_geometry_minecraft

#### PlaneGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/PlaneGeometry
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Constellation
- **Domains**: geometry|math
- **Also Used In**: webgl_geometry_terrain|webgl_geometry_terrain_raycast|webgpu_tsl_procedural_terrain

#### SphereGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/SphereGeometry
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: geometry|math

#### CylinderGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/CylinderGeometry
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: geometry

#### CapsuleGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/CapsuleGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry|math

#### CircleGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/CircleGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### ConeGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/ConeGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### DodecahedronGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/DodecahedronGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### EdgesGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/EdgesGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation
- **Domains**: geometry

#### IcosahedronGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### OctahedronGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/OctahedronGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### PolyhedronGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/PolyhedronGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### RingGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/RingGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### TetrahedronGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### TorusGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/TorusGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### TorusKnotGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry

#### WireframeGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/WireframeGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation
- **Domains**: geometry

#### RoundedBoxGeometry

- **Docs**: https://threejs.org/docs/#examples/en/geometries/RoundedBoxGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry
- **Notes**: Addon/Example class

#### ExtrudeGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Orbs
- **Domains**: geometry

#### LatheGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/LatheGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Orbs
- **Domains**: geometry

#### ShapeGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/ShapeGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Orbs
- **Domains**: geometry

#### TubeGeometry

- **Docs**: https://threejs.org/docs/#api/en/geometries/TubeGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Orbs
- **Domains**: geometry

#### BoxLineGeometry

- **Docs**: https://threejs.org/docs/#examples/en/geometries/BoxLineGeometry
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Constellation
- **Domains**: geometry
- **Notes**: Addon/Example class

#### ConvexGeometry

- **Docs**: https://threejs.org/docs/#examples/en/geometries/ConvexGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Orbs
- **Domains**: geometry
- **Notes**: Addon/Example class

#### TextGeometry

- **Docs**: https://threejs.org/docs/#examples/en/geometries/TextGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Wall
- **Domains**: geometry
- **Related APIs**: FontLoader|ExtrudeGeometry|Font
- **Also Used In**: webgl_depth_texture|webgl_framebuffer_texture|webgl_geometry_text|webgl_geometry_text_shapes|webgl_geometry_text_stroke|webgl_loader_texture_dds|webgl_loader_texture_exr|webgl_loader_texture_ultrahdr|webgl_loader_texture_hdr|webgl_loader_texture_ktx
- **Notes**: Addon/Example class

#### ParametricFunctions

- **Docs**: https://threejs.org/docs/#examples/en/geometries/ParametricFunctions
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Constellation
- **Domains**: geometries
- **Notes**: Collection of parametric surface functions

#### DecalGeometry

- **Docs**: https://threejs.org/docs/#examples/en/geometries/DecalGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.8 | priority=0.63
- **Projects**: Orbs
- **Domains**: geometry
- **Also Used In**: webgl_decals
- **Notes**: Addon/Example class

#### ParametricGeometry

- **Docs**: https://threejs.org/docs/#examples/en/geometries/ParametricGeometry
- **Scores**: prod=0.5 | learn=0.7 | blender=0.5 | priority=0.61
- **Projects**: Ritual
- **Domains**: geometry|xr
- **Notes**: Addon/Example class

#### TeapotGeometry

- **Docs**: https://threejs.org/docs/#examples/en/geometries/TeapotGeometry
- **Scores**: prod=0.5 | learn=0.7 | blender=0.5 | priority=0.61
- **Projects**: Orbs
- **Domains**: geometry
- **Notes**: Addon/Example class

### Helpers

#### DirectionalLightHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation
- **Domains**: lighting

#### HemisphereLightHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/HemisphereLightHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation|Orbs
- **Domains**: lighting|math

#### PointLightHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/PointLightHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation
- **Domains**: lighting

#### SpotLightHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/SpotLightHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation
- **Domains**: lighting

#### LightProbeHelper

- **Docs**: https://threejs.org/docs/#examples/en/helpers/LightProbeHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation
- **Domains**: lighting
- **Notes**: Addon/Example class

#### RectAreaLightHelper

- **Docs**: https://threejs.org/docs/#examples/en/helpers/RectAreaLightHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation|Ritual
- **Domains**: lighting|xr
- **Notes**: Addon/Example class

#### AnimationPathHelper

- **Docs**: https://threejs.org/docs/#examples/en/helpers/AnimationPathHelper
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Pantheon|Constellation
- **Domains**: helpers
- **Notes**: Visualizes animation motion paths

#### TextureHelper

- **Docs**: https://threejs.org/docs/#examples/en/helpers/TextureHelper
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs
- **Domains**: helpers
- **Notes**: Visualizes a texture on a debug quad

#### OctreeHelper

- **Docs**: https://threejs.org/docs/#examples/en/helpers/OctreeHelper
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Ritual
- **Domains**: helpers
- **Notes**: Visualizes octree spatial subdivision

#### ArrowHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/ArrowHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Ritual
- **Domains**: xr

#### AxesHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/AxesHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: rendering

#### Box3Helper

- **Docs**: https://threejs.org/docs/#api/en/helpers/Box3Helper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: math

#### BoxHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/BoxHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: rendering

#### CameraHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/CameraHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: rendering

#### GridHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/GridHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: rendering

#### PlaneHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/PlaneHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: math

#### PolarGridHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/PolarGridHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Ritual
- **Domains**: xr

#### SkeletonHelper

- **Docs**: https://threejs.org/docs/#api/en/helpers/SkeletonHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Pantheon
- **Domains**: animation

#### PositionalAudioHelper

- **Docs**: https://threejs.org/docs/#examples/en/helpers/PositionalAudioHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Pantheon
- **Domains**: audio
- **Notes**: Addon/Example class

#### VertexNormalsHelper

- **Docs**: https://threejs.org/docs/#examples/en/helpers/VertexNormalsHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: materials
- **Notes**: Addon/Example class

#### VertexTangentsHelper

- **Docs**: https://threejs.org/docs/#examples/en/helpers/VertexTangentsHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Wall
- **Domains**: rendering
- **Notes**: Addon/Example class

#### ViewHelper

- **Docs**: https://threejs.org/docs/#examples/en/helpers/ViewHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: rendering
- **Notes**: Addon/Example class

#### RapierHelper

- **Docs**: https://threejs.org/docs/#examples/en/helpers/RapierHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Ritual
- **Domains**: helpers
- **Notes**: Debug visualization for Rapier physics bodies

### Lights

#### AmbientLight

- **Docs**: https://threejs.org/docs/#api/en/lights/AmbientLight
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: lighting
- **Related APIs**: DirectionalLight|HemisphereLight

#### DirectionalLight

- **Docs**: https://threejs.org/docs/#api/en/lights/DirectionalLight
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: lighting
- **Related APIs**: DirectionalLightShadow|AmbientLight|PointLight
- **Also Used In**: webgl_shadow_contact|webgl_shadowmap|webgl_shadowmap_performance|webgl_shadowmap_pointlight|webgl_shadowmap_viewer|webgl_shadowmap_vsm|webgl_shadowmesh|webgl_shadowmap_csm|webgl_shadowmap_pcss|webgl_shadowmap_progressive

#### PointLight

- **Docs**: https://threejs.org/docs/#api/en/lights/PointLight
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: lighting
- **Related APIs**: PointLightShadow|DirectionalLight|SpotLight
- **Also Used In**: webgl_shadowmap_pointlight|webgpu_lights_pointlights|webgpu_shadowmap_pointlight

#### SpotLight

- **Docs**: https://threejs.org/docs/#api/en/lights/SpotLight
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: lighting
- **Related APIs**: SpotLightShadow|PointLight|DirectionalLight
- **Also Used In**: webgl_lights_spotlight|webgl_lights_spotlights|webgpu_lights_ies_spotlight|webgpu_lights_spotlight

#### HemisphereLight

- **Docs**: https://threejs.org/docs/#api/en/lights/HemisphereLight
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: lighting|math
- **Also Used In**: webgl_lights_hemisphere

#### Light

- **Docs**: https://threejs.org/docs/#api/en/lights/Light
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: lighting

#### RectAreaLight

- **Docs**: https://threejs.org/docs/#api/en/lights/RectAreaLight
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Ritual
- **Domains**: lighting|xr
- **Also Used In**: webgl_lights_rectarealight|webgpu_lights_rectarealight

#### DirectionalLightShadow

- **Docs**: https://threejs.org/docs/#api/en/lights/shadows/DirectionalLightShadow
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: lighting|materials

#### LightProbe

- **Docs**: https://threejs.org/docs/#api/en/lights/LightProbe
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: lighting
- **Also Used In**: webgl_lightprobe|webgl_lightprobe_cubecamera|webgpu_lightprobe|webgpu_lightprobe_cubecamera

#### LightShadow

- **Docs**: https://threejs.org/docs/#api/en/lights/shadows/LightShadow
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: lighting|materials

#### PointLightShadow

- **Docs**: https://threejs.org/docs/#api/en/lights/shadows/PointLightShadow
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: lighting|materials

#### SpotLightShadow

- **Docs**: https://threejs.org/docs/#api/en/lights/shadows/SpotLightShadow
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: lighting|materials

#### LightProbeGenerator

- **Docs**: https://threejs.org/docs/#examples/en/lights/LightProbeGenerator
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: lighting
- **Notes**: Addon/Example class

#### RectAreaLightTexturesLib

- **Docs**: https://threejs.org/docs/#examples/en/lights/RectAreaLightTexturesLib
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Ritual|Wall
- **Domains**: lighting|textures|xr
- **Notes**: Addon/Example class

#### RectAreaLightUniformsLib

- **Docs**: https://threejs.org/docs/#examples/en/lights/RectAreaLightUniformsLib
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Ritual
- **Domains**: lighting|xr
- **Notes**: Addon/Example class

#### IESSpotLight

- **Docs**: https://threejs.org/docs/#api/en/lights/IESSpotLight
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: lighting

#### ProjectorLight

- **Docs**: https://threejs.org/docs/#api/en/lights/ProjectorLight
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Wall
- **Domains**: lighting

### Loaders

#### TextureLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/TextureLoader
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Wall
- **Domains**: loading|textures

#### Loader

- **Docs**: https://threejs.org/docs/#api/en/loaders/Loader
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: loading

#### GLTFLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/GLTFLoader
- **Scores**: prod=1.0 | learn=1.0 | blender=0.8 | priority=0.84
- **Projects**: Pantheon
- **Domains**: loading
- **Related APIs**: DRACOLoader|KTX2Loader|GLTFExporter
- **Key Examples** (21): webgl_loader_gltf|webgl_loader_gltf_animation_pointer|webgl_loader_gltf_progressive_lod|webgl_loader_gltf_avif|webgl_loader_gltf_compressed|webgl_loader_gltf_dispersion|webgl_loader_gltf_instancing|webgl_loader_gltf_iridescence|webgl_loader_gltf_sheen|webgl_loader_gltf_transmission
- **Notes**: Addon/Example class

#### LoadingManager

- **Docs**: https://threejs.org/docs/#api/en/loaders/LoadingManager
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Domains**: loading

#### Font

- **Docs**: https://threejs.org/docs/#examples/en/loaders/Font
- **Scores**: prod=0.8 | learn=0.6 | blender=0.1 | priority=0.78
- **Projects**: Wall|Pantheon
- **Domains**: loaders
- **Notes**: Font data class for TextGeometry

#### SVGLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/SVGLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Domains**: loading
- **Key Examples** (1): webgl_loader_svg
- **Notes**: Addon/Example class

#### KTX2Loader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/KTX2Loader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (3): webgl_loader_texture_ktx2|webgpu_loader_texture_ktx2|misc_exporter_ktx2
- **Notes**: Addon/Example class

#### EXRLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/EXRLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: loading|xr
- **Key Examples** (1): webgl_loader_texture_exr
- **Notes**: Addon/Example class

#### HDRLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/HDRLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: loading
- **Notes**: Addon/Example class

#### DRACOLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/DRACOLoader
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (2): webgl_loader_draco|misc_exporter_draco
- **Notes**: Addon/Example class

#### FBXLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/FBXLoader
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Pantheon
- **Domains**: loading
- **Related APIs**: GLTFLoader|OBJLoader|AnimationMixer
- **Key Examples** (2): webgl_loader_fbx|webgl_loader_fbx_nurbs
- **Notes**: Addon/Example class

#### FontLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/FontLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Wall
- **Domains**: loading
- **Notes**: Addon/Example class

#### LottieLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/LottieLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: loading
- **Notes**: Addon/Example class

#### TTFLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/TTFLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_ttf
- **Notes**: Addon/Example class

#### MaterialXLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/MaterialXLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: loading|materials
- **Key Examples** (2): webgpu_loader_materialx|webgpu_materialx_noise
- **Notes**: Addon/Example class

#### NRRDLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/NRRDLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_nrrd
- **Notes**: Addon/Example class

#### VTKLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/VTKLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_vtk
- **Notes**: Addon/Example class

#### XYZLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/XYZLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_xyz
- **Notes**: Addon/Example class

#### AnimationLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/AnimationLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Pantheon
- **Domains**: animation|loading

#### AudioLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/AudioLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Pantheon
- **Domains**: audio|loading

#### BufferGeometryLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/BufferGeometryLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: geometry|loading

#### CompressedTextureLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/CompressedTextureLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Wall
- **Domains**: loading|textures

#### CubeTextureLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/CubeTextureLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Wall
- **Domains**: loading|textures
- **Key Examples** (24): webgl_materials_cubemap|webgl_materials_cubemap_dynamic|webgl_materials_cubemap_refraction|webgl_materials_cubemap_mipmaps|webgl_materials_cubemap_render_to_mipmaps|webgl_materials_envmaps|webgl_materials_envmaps_exr|webgl_materials_envmaps_groundprojected|webgl_materials_envmaps_hdr|webgl_materials_envmaps_fasthdr

#### DataTextureLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/DataTextureLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Wall
- **Domains**: loading|textures

#### FileLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/FileLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: loading

#### ImageBitmapLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/ImageBitmapLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: interaction|loading

#### ImageLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/ImageLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: loading

#### LoaderUtils

- **Docs**: https://threejs.org/docs/#api/en/loaders/LoaderUtils
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: loading

#### MaterialLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/MaterialLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: loading|materials

#### NodeLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/NodeLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: loading

#### NodeMaterialLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/NodeMaterialLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: loading|materials

#### NodeObjectLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/NodeObjectLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: loading

#### ObjectLoader

- **Docs**: https://threejs.org/docs/#api/en/loaders/ObjectLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs
- **Domains**: loading

#### HDRCubeTextureLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/HDRCubeTextureLoader
- **Scores**: prod=0.7 | learn=0.5 | blender=0.4 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Domains**: loaders
- **Notes**: Loads HDR cube map textures for environment lighting

#### GCodeLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/GCodeLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: loaders
- **Key Examples** (1): webgl_loader_gcode
- **Notes**: Loads G-code CNC/3D printer files as line geometry

#### KTXLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/KTXLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: loaders
- **Notes**: Loads KTX compressed texture format

#### UltraHDRLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/UltraHDRLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: loaders
- **Notes**: Loads Ultra HDR gain map images

#### LUT3dlLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/LUT3dlLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: loaders
- **Notes**: Loads 3DL color lookup table files

#### LUTCubeLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/LUTCubeLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: loaders
- **Notes**: Loads .cube color lookup table files

#### LUTImageLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/LUTImageLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: loaders
- **Notes**: Loads color LUT from image files

#### OBJLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/OBJLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.8 | priority=0.63
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_obj
- **Notes**: Addon/Example class

#### STLLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/STLLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.8 | priority=0.63
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_stl
- **Notes**: Addon/Example class

#### PLYLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/PLYLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.8 | priority=0.63
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_ply
- **Notes**: Addon/Example class

#### ColladaLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/ColladaLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.8 | priority=0.63
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (3): webgl_loader_collada|webgl_loader_collada_kinematics|webgl_loader_collada_skinning
- **Notes**: Addon/Example class

#### MTLLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/MTLLoader
- **Scores**: prod=0.8 | learn=0.5 | blender=0.7 | priority=0.63
- **Projects**: Pantheon
- **Domains**: loaders
- **Notes**: Loads MTL material files for OBJ models

#### IESLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/IESLoader
- **Scores**: prod=0.7 | learn=0.4 | blender=0.4 | priority=0.62
- **Projects**: Pantheon
- **Domains**: loaders
- **Notes**: Loads IES photometric light profile data

#### VOXLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/VOXLoader
- **Scores**: prod=0.6 | learn=0.5 | blender=0.4 | priority=0.61
- **Projects**: Orbs|Constellation
- **Domains**: loaders
- **Key Examples** (2): webgl_interactive_voxelpainter|webgl_loader_vox
- **Notes**: Loads MagicaVoxel VOX voxel models

#### DDSLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/DDSLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.4 | priority=0.58
- **Projects**: Orbs
- **Domains**: loaders
- **Notes**: Loads DDS compressed texture format

#### TGALoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/TGALoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.4 | priority=0.58
- **Projects**: Orbs
- **Domains**: loaders
- **Notes**: Loads TGA image format as textures

#### PVRLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/PVRLoader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs
- **Domains**: loaders
- **Notes**: Loads PVRTC compressed texture format

#### Cache

- **Docs**: https://threejs.org/docs/#api/en/loaders/Cache
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: loading

#### PCDLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/PCDLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_pcd
- **Notes**: Addon/Example class

#### PDBLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/PDBLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_pdb
- **Notes**: Addon/Example class

#### USDLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/USDLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Notes**: Addon/Example class

#### LDrawLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/LDrawLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_ldraw
- **Notes**: Addon/Example class

#### Rhino3dmLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/Rhino3dmLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): webgl_loader_3dm
- **Notes**: Addon/Example class

#### BVHLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/BVHLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (3): webgl_batch_lod_bvh|webgl_loader_bvh|webgl_raycaster_bvh
- **Notes**: Addon/Example class

#### TIFFLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/TIFFLoader
- **Scores**: prod=0.6 | learn=0.3 | blender=0.4 | priority=0.55
- **Projects**: Orbs
- **Domains**: loaders
- **Notes**: Loads TIFF image format as textures

#### MD2Loader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/MD2Loader
- **Scores**: prod=0.5 | learn=0.4 | blender=0.4 | priority=0.54
- **Projects**: Pantheon
- **Domains**: loaders
- **Key Examples** (2): webgl_loader_md2|webgl_loader_md2_control
- **Notes**: Loads Quake II MD2 character models

#### AMFLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/AMFLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.7 | priority=0.52
- **Projects**: Pantheon
- **Domains**: loaders
- **Key Examples** (1): webgl_loader_amf
- **Notes**: Loads Additive Manufacturing Format files

#### KMZLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/KMZLoader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.4 | priority=0.51
- **Projects**: Pantheon
- **Domains**: loaders
- **Key Examples** (1): webgl_loader_kmz
- **Notes**: Loads Google Earth KMZ 3D model archives

#### VRMLLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/VRMLLoader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.4 | priority=0.51
- **Projects**: Ritual
- **Domains**: loaders
- **Key Examples** (1): webgl_loader_vrml
- **Notes**: Loads VRML virtual reality model format

#### ThreeMFLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/ThreeMFLoader
- **Scores**: prod=0.6 | learn=0.3 | blender=0.7 | priority=0.49
- **Projects**: Pantheon
- **Domains**: loaders
- **Key Examples** (2): webgl_loader_3mf|webgl_loader_3mf_materials
- **Notes**: Loads 3MF manufacturing format

#### MDDLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/MDDLoader
- **Scores**: prod=0.5 | learn=0.4 | blender=0.7 | priority=0.48
- **Projects**: Pantheon
- **Domains**: loaders
- **Key Examples** (1): webgl_loader_mdd
- **Notes**: Loads point cache animation data

#### LWOLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/LWOLoader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.7 | priority=0.45
- **Projects**: Pantheon
- **Domains**: loaders
- **Key Examples** (1): webgl_loader_lwo
- **Notes**: Loads LightWave 3D object files

#### TDSLoader

- **Docs**: https://threejs.org/docs/#examples/en/loaders/TDSLoader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.7 | priority=0.45
- **Projects**: Pantheon
- **Domains**: loaders
- **Key Examples** (1): webgl_loader_3ds
- **Notes**: Loads 3DS Max legacy format

#### ColladaComposer

- **Docs**: https://threejs.org/docs/#examples/en/loaders/ColladaComposer
- **Scores**: prod=0.5 | learn=0.3 | blender=0.7 | priority=0.45
- **Projects**: Pantheon
- **Domains**: loaders
- **Notes**: Composes Collada scene elements

#### ColladaParser

- **Docs**: https://threejs.org/docs/#examples/en/loaders/ColladaParser
- **Scores**: prod=0.5 | learn=0.3 | blender=0.7 | priority=0.45
- **Projects**: Pantheon
- **Domains**: loaders
- **Notes**: Parses Collada XML format

#### USDComposer

- **Docs**: https://threejs.org/docs/#examples/en/loaders/USDComposer
- **Scores**: prod=0.5 | learn=0.3 | blender=0.9 | priority=0.41
- **Projects**: Pantheon
- **Domains**: loaders
- **Notes**: Composes USD scene elements

### Materials

#### MeshPhysicalMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: geometry|materials
- **Related APIs**: MeshStandardMaterial|Texture|PMREMGenerator
- **Also Used In**: webgl_loader_gltf_iridescence|webgl_loader_gltf_sheen|webgl_loader_gltf_transmission|webgl_loader_gltf_anisotropy|webgl_materials_physical_clearcoat|webgl_materials_physical_transmission|webgl_materials_physical_transmission_alpha|webgl_materials_texture_anisotropy|webgpu_clearcoat|webgpu_loader_gltf_anisotropy

#### MeshStandardMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs|Ritual
- **Domains**: geometry|materials|xr
- **Related APIs**: MeshPhysicalMaterial|MeshBasicMaterial|Texture
- **Also Used In**: webgl_materials_displacementmap|webgl_materials_normalmap|webgl_materials_normalmap_object_space|webgpu_materials_displacementmap

#### PointsMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/PointsMaterial
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Constellation|Orbs
- **Domains**: lighting|materials|particles

#### ShaderMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/ShaderMaterial
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: materials|rendering
- **Related APIs**: RawShaderMaterial|Material|WebGLRenderer
- **Also Used In**: webgl_shader|webgl_shader_lava

#### LineBasicMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/LineBasicMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Constellation|Orbs
- **Domains**: materials

#### Material

- **Docs**: https://threejs.org/docs/#api/en/materials/Material
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: materials

#### MeshBasicMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: geometry|materials

#### MeshLambertMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshLambertMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: geometry|materials

#### MeshMatcapMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshMatcapMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: geometry|materials
- **Also Used In**: webgl_materials_matcap|webgpu_materials_matcap

#### MeshPhongMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshPhongMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: geometry|materials
- **Also Used In**: webgl_materials_bumpmap

#### MeshToonMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshToonMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: geometry|materials
- **Also Used In**: webgl_materials_toon|webgpu_materials_toon

#### ShadowMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/ShadowMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: lighting|materials

#### SpriteMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/SpriteMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: materials|particles

#### LineDashedMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/LineDashedMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation|Orbs
- **Domains**: materials

#### MeshDepthMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshDepthMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry|materials|textures

#### MeshDistanceMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshDistanceMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry|materials

#### MeshNormalMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshNormalMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry|materials

#### RawShaderMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/RawShaderMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: materials|rendering
- **Also Used In**: webgl_buffergeometry_rawshader

#### WoodNodeMaterial

- **Docs**: https://threejs.org/docs/#examples/en/materials/WoodNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Pantheon
- **Domains**: materials
- **Notes**: Procedural wood grain node material

#### LDrawConditionalLineMaterial

- **Docs**: https://threejs.org/docs/#examples/en/materials/LDrawConditionalLineMaterial
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Constellation
- **Domains**: materials
- **Notes**: Conditional line material for LDraw rendering

### Math

#### Color

- **Docs**: https://threejs.org/docs/#api/en/math/Color
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: math
- **Related APIs**: Material|Light|Vector3

#### Vector3

- **Docs**: https://threejs.org/docs/#api/en/math/Vector3
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: math
- **Related APIs**: Vector2|Vector4|Matrix4

#### ImprovedNoise

- **Docs**: https://threejs.org/docs/#examples/en/math/ImprovedNoise
- **Scores**: prod=0.8 | learn=0.7 | blender=0.1 | priority=0.81
- **Projects**: Orbs|Constellation
- **Domains**: math
- **Notes**: Improved Perlin noise implementation

#### Matrix4

- **Docs**: https://threejs.org/docs/#api/en/math/Matrix4
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Domains**: math
- **Related APIs**: Vector3|Quaternion|Euler

#### Quaternion

- **Docs**: https://threejs.org/docs/#api/en/math/Quaternion
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Domains**: math
- **Related APIs**: Euler|Matrix4|Vector3

#### Capsule

- **Docs**: https://threejs.org/docs/#examples/en/math/Capsule
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Ritual
- **Domains**: math
- **Notes**: Capsule primitive for collision testing

#### ColorConverter

- **Docs**: https://threejs.org/docs/#examples/en/math/ColorConverter
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Orbs|Wall
- **Domains**: math
- **Notes**: Converts between color spaces (HSL/HSV/RGB)

#### BezierInterpolant

- **Docs**: https://threejs.org/docs/#api/en/math/interpolants/BezierInterpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Box3

- **Docs**: https://threejs.org/docs/#api/en/math/Box3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation
- **Domains**: math

#### CubicInterpolant

- **Docs**: https://threejs.org/docs/#api/en/math/interpolants/CubicInterpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Cylindrical

- **Docs**: https://threejs.org/docs/#api/en/math/Cylindrical
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### DiscreteInterpolant

- **Docs**: https://threejs.org/docs/#api/en/math/interpolants/DiscreteInterpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Euler

- **Docs**: https://threejs.org/docs/#api/en/math/Euler
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Frustum

- **Docs**: https://threejs.org/docs/#api/en/math/Frustum
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Interpolant

- **Docs**: https://threejs.org/docs/#api/en/math/Interpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Line3

- **Docs**: https://threejs.org/docs/#api/en/math/Line3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation
- **Domains**: math

#### LinearInterpolant

- **Docs**: https://threejs.org/docs/#api/en/math/interpolants/LinearInterpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation|Ritual
- **Domains**: math|xr

#### MathUtils

- **Docs**: https://threejs.org/docs/#api/en/math/MathUtils
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Matrix3

- **Docs**: https://threejs.org/docs/#api/en/math/Matrix3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Plane

- **Docs**: https://threejs.org/docs/#api/en/math/Plane
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation
- **Domains**: math
- **Also Used In**: webgl_clipping|webgl_clipping_advanced|webgl_clipping_intersection|webgl_clipping_stencil|webgpu_clipping

#### QuaternionLinearInterpolant

- **Docs**: https://threejs.org/docs/#api/en/math/interpolants/QuaternionLinearInterpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation|Ritual
- **Domains**: math|xr

#### Ray

- **Docs**: https://threejs.org/docs/#api/en/math/Ray
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Sphere

- **Docs**: https://threejs.org/docs/#api/en/math/Sphere
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Spherical

- **Docs**: https://threejs.org/docs/#api/en/math/Spherical
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### SphericalHarmonics3

- **Docs**: https://threejs.org/docs/#api/en/math/SphericalHarmonics3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual
- **Domains**: math|xr

#### Triangle

- **Docs**: https://threejs.org/docs/#api/en/math/Triangle
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Vector2

- **Docs**: https://threejs.org/docs/#api/en/math/Vector2
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### Vector4

- **Docs**: https://threejs.org/docs/#api/en/math/Vector4
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: math

#### ColorSpaces

- **Docs**: https://threejs.org/docs/#examples/en/math/ColorSpaces
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: math
- **Notes**: Extended color space conversion utilities

#### ConvexHull

- **Docs**: https://threejs.org/docs/#examples/en/math/ConvexHull
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: geometry|math
- **Notes**: Addon/Example class

#### Lut

- **Docs**: https://threejs.org/docs/#examples/en/math/Lut
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: loading|math
- **Notes**: Addon/Example class

#### MeshSurfaceSampler

- **Docs**: https://threejs.org/docs/#examples/en/math/MeshSurfaceSampler
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Pantheon
- **Domains**: geometry|math
- **Notes**: Addon/Example class

#### OBB

- **Docs**: https://threejs.org/docs/#examples/en/math/OBB
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: math
- **Also Used In**: webgl_math_obb
- **Notes**: Addon/Example class

#### Octree

- **Docs**: https://threejs.org/docs/#examples/en/math/Octree
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: geometry|math
- **Also Used In**: games_fps
- **Notes**: Addon/Example class

#### SimplexNoise

- **Docs**: https://threejs.org/docs/#examples/en/math/SimplexNoise
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: math
- **Notes**: Addon/Example class

#### Box2

- **Docs**: https://threejs.org/docs/#api/en/math/Box2
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: math

#### FrustumArray

- **Docs**: https://threejs.org/docs/#api/en/math/FrustumArray
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual
- **Domains**: math|xr

#### Matrix2

- **Docs**: https://threejs.org/docs/#api/en/math/Matrix2
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: math

### Objects

#### InstancedMesh

- **Docs**: https://threejs.org/docs/#api/en/objects/InstancedMesh
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: geometry
- **Related APIs**: Mesh|BatchedMesh|BufferGeometry
- **Key Examples** (21): webgl_instancing_morph|webgl_instancing_dynamic|webgl_instancing_performance|webgl_instancing_raycast|webgl_instancing_scatter|webgl_loader_gltf_instancing|webgl_modifier_curve_instanced|webgl_buffergeometry_instancing|webgl_buffergeometry_instancing_billboards|webgl_buffergeometry_instancing_interleaved

#### Line

- **Docs**: https://threejs.org/docs/#api/en/objects/Line
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Constellation
- **Domains**: geometry
- **Related APIs**: LineBasicMaterial|LineSegments|BufferGeometry
- **Also Used In**: webgl_geometry_extrude_splines|webgl_geometry_spline_editor|webgl_interactive_lines|webgl_lines_colors|webgl_lines_dashed|webgl_lines_fat|webgl_lines_fat_raycasting|webgl_lines_fat_wireframe|webgl_postprocessing_outline|webgl_buffergeometry_lines

#### Mesh

- **Docs**: https://threejs.org/docs/#api/en/objects/Mesh
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: geometry
- **Related APIs**: BufferGeometry|Material|Object3D

#### Points

- **Docs**: https://threejs.org/docs/#api/en/objects/Points
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Constellation|Orbs
- **Domains**: geometry|lighting|particles
- **Related APIs**: PointsMaterial|BufferGeometry|Sprite
- **Also Used In**: webgl_interactive_points|webgl_interactive_raycasting_points|webgl_points_billboards|webgl_points_dynamic|webgl_points_sprites|webgl_points_waves|webgl_buffergeometry_points|webgl_buffergeometry_points_interleaved|webgl_custom_attributes_points|webgl_custom_attributes_points2

#### Sprite

- **Docs**: https://threejs.org/docs/#api/en/objects/Sprite
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: geometry|particles
- **Related APIs**: SpriteMaterial|Points|Object3D
- **Also Used In**: webgl_points_sprites|webgl_raycaster_sprite|webgl_sprites|webgpu_instance_sprites|webgpu_sprites|css3d_sprites

#### BatchedMesh

- **Docs**: https://threejs.org/docs/#api/en/objects/BatchedMesh
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: geometry
- **Related APIs**: InstancedMesh|Mesh|BufferGeometry
- **Key Examples** (3): webgl_batch_lod_bvh|webgl_mesh_batch|webgpu_mesh_batch

#### LineSegments

- **Docs**: https://threejs.org/docs/#api/en/objects/LineSegments
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Constellation
- **Domains**: geometry

#### Group

- **Docs**: https://threejs.org/docs/#api/en/objects/Group
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Domains**: geometry

#### Lensflare

- **Docs**: https://threejs.org/docs/#examples/en/objects/Lensflare
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: geometry|lighting|xr
- **Also Used In**: webgl_lensflares|webgpu_lensflares|webgpu_postprocessing_lensflare
- **Notes**: Addon/Example class

#### MarchingCubes

- **Docs**: https://threejs.org/docs/#examples/en/objects/MarchingCubes
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: geometry|xr
- **Key Examples** (1): webgl_marchingcubes
- **Notes**: Addon/Example class

#### Reflector

- **Docs**: https://threejs.org/docs/#examples/en/objects/Reflector
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry
- **Related APIs**: Refractor|Water|Mesh
- **Key Examples** (2): webgl_mirror|webgpu_mirror
- **Notes**: Addon/Example class

#### Sky

- **Docs**: https://threejs.org/docs/#examples/en/objects/Sky
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry
- **Related APIs**: SkyMesh|ShaderMaterial|DirectionalLight
- **Key Examples** (2): webgl_shaders_sky|webgpu_sky
- **Notes**: Addon/Example class

#### SkyMesh

- **Docs**: https://threejs.org/docs/#examples/en/objects/SkyMesh
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry
- **Notes**: Addon/Example class

#### Water

- **Docs**: https://threejs.org/docs/#examples/en/objects/Water
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry
- **Related APIs**: WaterMesh|Reflector|ShaderMaterial
- **Key Examples** (6): webgl_shaders_ocean|webgl_gpgpu_water|webgpu_backdrop_water|webgpu_compute_water|webgpu_ocean|webgpu_water
- **Notes**: Addon/Example class

#### WaterMesh

- **Docs**: https://threejs.org/docs/#examples/en/objects/WaterMesh
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: geometry
- **Notes**: Addon/Example class

#### Bone

- **Docs**: https://threejs.org/docs/#api/en/objects/Bone
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Pantheon
- **Domains**: animation|geometry

#### LOD

- **Docs**: https://threejs.org/docs/#api/en/objects/LOD
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Orbs
- **Domains**: geometry
- **Related APIs**: Mesh|Object3D|Camera
- **Also Used In**: webgl_batch_lod_bvh|webgl_lod

#### Skeleton

- **Docs**: https://threejs.org/docs/#api/en/objects/Skeleton
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Constellation|Pantheon
- **Domains**: animation|geometry

#### SkinnedMesh

- **Docs**: https://threejs.org/docs/#api/en/objects/SkinnedMesh
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Orbs
- **Domains**: geometry
- **Related APIs**: Skeleton|Bone|AnimationMixer

#### LensflareMesh

- **Docs**: https://threejs.org/docs/#examples/en/objects/LensflareMesh
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Orbs
- **Domains**: objects
- **Notes**: Mesh-based lens flare with node material

#### Refractor

- **Docs**: https://threejs.org/docs/#examples/en/objects/Refractor
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: geometry
- **Key Examples** (3): webgl_materials_cubemap_refraction|webgl_refraction|webgpu_refraction
- **Notes**: Addon/Example class

#### ShadowMesh

- **Docs**: https://threejs.org/docs/#examples/en/objects/ShadowMesh
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: geometry|lighting|materials
- **Notes**: Addon/Example class

#### ClippingGroup

- **Docs**: https://threejs.org/docs/#api/en/objects/ClippingGroup
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: animation|geometry

#### GroundedSkybox

- **Docs**: https://threejs.org/docs/#examples/en/objects/GroundedSkybox
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: geometry
- **Notes**: Addon/Example class

#### LineLoop

- **Docs**: https://threejs.org/docs/#api/en/objects/LineLoop
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Constellation
- **Domains**: geometry

#### ReflectorForSSRPass

- **Docs**: https://threejs.org/docs/#examples/en/objects/ReflectorForSSRPass
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: objects
- **Notes**: Reflector optimized for screen-space reflections pass

#### LensflareElement

- **Docs**: https://threejs.org/docs/#examples/en/objects/LensflareElement
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual
- **Domains**: geometry|lighting|xr
- **Notes**: Addon/Example class

### Renderers

#### PostProcessing

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/PostProcessing
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: postprocessing|rendering
- **Related APIs**: EffectComposer|BloomNode|GTAONode

#### WebGLRenderer

- **Docs**: https://threejs.org/docs/#api/en/renderers/WebGLRenderer
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: rendering
- **Related APIs**: WebGPURenderer|Scene|Camera
- **Key Examples** (356): webgl_animation_keyframes|webgl_animation_skinning_blending|webgl_animation_skinning_additive_blending|webgl_animation_skinning_ik|webgl_animation_skinning_morph|webgl_animation_multiple|webgl_animation_walk|webgl_batch_lod_bvh|webgl_camera|webgl_camera_array

#### WebGPURenderer

- **Docs**: https://threejs.org/docs/#api/en/renderers/WebGPURenderer
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: rendering
- **Related APIs**: WebGLRenderer|Scene|Camera
- **Key Examples** (196): webgpu_animation_retargeting|webgpu_animation_retargeting_readyplayer|webgpu_backdrop|webgpu_backdrop_area|webgpu_backdrop_water|webgpu_camera|webgpu_camera_array|webgpu_camera_logarithmicdepthbuffer|webgpu_caustics|webgpu_centroid_sampling
- **Notes**: WebGPU API - experimental

#### CSS3DRenderer

- **Docs**: https://threejs.org/docs/#examples/en/renderers/CSS3DRenderer
- **Scores**: prod=0.7 | learn=1.0 | blender=0.1 | priority=0.86
- **Projects**: Wall
- **Domains**: css3d|rendering
- **Related APIs**: CSS3DObject|CSS2DRenderer|WebGLRenderer
- **Key Examples** (7): css3d_mixed|css3d_molecules|css3d_orthographic|css3d_periodictable|css3d_sandbox|css3d_sprites|css3d_youtube
- **Notes**: Addon/Example class

#### WebXRManager

- **Docs**: https://threejs.org/docs/#api/en/renderers/webxr/WebXRManager
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: rendering|xr

#### XRManager

- **Docs**: https://threejs.org/docs/#api/en/renderers/webxr/XRManager
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: rendering|xr

#### CSS2DObject

- **Docs**: https://threejs.org/docs/#examples/en/renderers/CSS2DObject
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Domains**: css3d|loading|rendering
- **Also Used In**: css2d_label
- **Notes**: Addon/Example class

#### CSS2DRenderer

- **Docs**: https://threejs.org/docs/#examples/en/renderers/CSS2DRenderer
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Domains**: css3d|rendering
- **Related APIs**: CSS2DObject|CSS3DRenderer|WebGLRenderer
- **Key Examples** (1): css2d_label
- **Notes**: Addon/Example class

#### CSS3DObject

- **Docs**: https://threejs.org/docs/#examples/en/renderers/CSS3DObject
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Domains**: css3d|loading|rendering
- **Also Used In**: css3d_mixed|css3d_molecules|css3d_orthographic|css3d_periodictable|css3d_sandbox|css3d_sprites|css3d_youtube
- **Notes**: Addon/Example class

#### CSS3DSprite

- **Docs**: https://threejs.org/docs/#examples/en/renderers/CSS3DSprite
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs|Wall
- **Domains**: css3d|particles|rendering
- **Notes**: Addon/Example class

#### SVGRenderer

- **Docs**: https://threejs.org/docs/#examples/en/renderers/SVGRenderer
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Wall
- **Domains**: loading|rendering
- **Key Examples** (3): webgl_loader_svg|svg_lines|svg_sandbox
- **Notes**: Addon/Example class

#### CubeRenderTarget

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/CubeRenderTarget
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual
- **Domains**: rendering|xr

#### Renderer

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/Renderer
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: rendering

#### WebGLRenderTarget

- **Docs**: https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual
- **Domains**: rendering|xr
- **Also Used In**: webgl_rtt|webgl_multiple_rendertargets|webgl_rendertarget_texture2darray|webgpu_multiple_rendertargets|webgpu_multiple_rendertargets_readback|webgpu_rendertarget_2d-array_3d|webgpu_rtt

#### WebGLCubeRenderTarget

- **Docs**: https://threejs.org/docs/#api/en/renderers/WebGLCubeRenderTarget
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual
- **Domains**: rendering|xr

#### SVGObject

- **Docs**: https://threejs.org/docs/#examples/en/renderers/SVGObject
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Wall
- **Domains**: renderers
- **Notes**: Object3D wrapper for SVG elements

#### BlendMode

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/BlendMode
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: animation|rendering

#### BundleGroup

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/BundleGroup
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: rendering

#### CanvasTarget

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/CanvasTarget
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Constellation|Ritual
- **Domains**: rendering|textures|xr

#### Info

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/Info
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: rendering

#### QuadMesh

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/QuadMesh
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry|rendering

#### StorageBufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/StorageBufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry|rendering

#### StorageInstancedBufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/StorageInstancedBufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry|rendering

#### StorageTexture

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/StorageTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall
- **Domains**: rendering|textures

#### StorageArrayTexture

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/StorageArrayTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual|Wall
- **Domains**: math|rendering|textures|xr

#### Storage3DTexture

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/Storage3DTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall
- **Domains**: rendering|textures

#### IndirectStorageBufferAttribute

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/IndirectStorageBufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: geometry|rendering

#### TimestampQueryPool

- **Docs**: https://threejs.org/docs/#api/en/renderers/common/TimestampQueryPool
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Domains**: rendering

#### WebGLArrayRenderTarget

- **Docs**: https://threejs.org/docs/#api/en/renderers/WebGLArrayRenderTarget
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual
- **Domains**: math|rendering|xr

#### WebGL3DRenderTarget

- **Docs**: https://threejs.org/docs/#api/en/renderers/WebGL3DRenderTarget
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual
- **Domains**: rendering|xr

#### WebXRDepthSensing

- **Docs**: https://threejs.org/docs/#api/en/renderers/webxr/WebXRDepthSensing
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual
- **Domains**: materials|rendering|textures|xr

#### Projector

- **Docs**: https://threejs.org/docs/#examples/en/renderers/Projector
- **Scores**: prod=0.2 | learn=0.3 | blender=0.1 | priority=0.45
- **Projects**: Wall
- **Domains**: renderers
- **Notes**: Projects 3D objects to 2D screen coordinates (legacy)

### Scenes

#### Scene

- **Docs**: https://threejs.org/docs/#api/en/scenes/Scene
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: rendering
- **Related APIs**: Object3D|Fog|FogExp2
- **Key Examples** (563): webgl_animation_keyframes|webgl_animation_skinning_blending|webgl_animation_skinning_additive_blending|webgl_animation_skinning_ik|webgl_animation_skinning_morph|webgl_animation_multiple|webgl_animation_walk|webgl_batch_lod_bvh|webgl_camera|webgl_camera_array

#### Fog

- **Docs**: https://threejs.org/docs/#api/en/scenes/Fog
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: rendering

#### FogExp2

- **Docs**: https://threejs.org/docs/#api/en/scenes/FogExp2
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: rendering

### Textures

#### CubeTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/CubeTexture
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Wall
- **Domains**: textures

#### DataTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/DataTexture
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Wall
- **Domains**: textures

#### DepthTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/DepthTexture
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Wall
- **Domains**: materials|textures

#### Texture

- **Docs**: https://threejs.org/docs/#api/en/textures/Texture
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Wall
- **Domains**: textures
- **Related APIs**: TextureLoader|Material|DataTexture

#### VideoTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/VideoTexture
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Wall
- **Domains**: textures
- **Also Used In**: webgl_materials_video|webgl_materials_video_webcam|webgl_video_kinect|webgl_video_panorama_equirectangular|webgpu_materials_video|webgpu_video_frame|webgpu_video_panorama|webxr_vr_video

#### CanvasTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/CanvasTexture
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Domains**: rendering|textures

#### CompressedTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/CompressedTexture
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Domains**: textures

#### Data3DTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/Data3DTexture
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Domains**: textures

#### DataArrayTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/DataArrayTexture
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual|Wall
- **Domains**: math|postprocessing|textures|xr

#### FramebufferTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/FramebufferTexture
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Domains**: geometry|textures

#### FlakesTexture

- **Docs**: https://threejs.org/docs/#examples/en/textures/FlakesTexture
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs|Wall
- **Domains**: textures
- **Notes**: Addon/Example class

#### Source

- **Docs**: https://threejs.org/docs/#api/en/textures/Source
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: textures

#### CompressedArrayTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/CompressedArrayTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual|Wall
- **Domains**: math|textures|xr

#### CompressedCubeTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/CompressedCubeTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall
- **Domains**: textures

#### CubeDepthTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/CubeDepthTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall
- **Domains**: materials|textures

#### ExternalTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/ExternalTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall
- **Domains**: textures

#### VideoFrameTexture

- **Docs**: https://threejs.org/docs/#api/en/textures/VideoFrameTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall
- **Domains**: textures

### Controls

#### OrbitControls

- **Docs**: https://threejs.org/docs/#examples/en/controls/OrbitControls
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Ritual
- **Domains**: interaction
- **Related APIs**: MapControls|TrackballControls|Camera
- **Key Examples** (1): misc_controls_orbit
- **Notes**: Addon/Example class

#### ArcballControls

- **Docs**: https://threejs.org/docs/#examples/en/controls/ArcballControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: interaction|xr
- **Key Examples** (1): misc_controls_arcball
- **Notes**: Addon/Example class

#### DragControls

- **Docs**: https://threejs.org/docs/#examples/en/controls/DragControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: interaction
- **Key Examples** (1): misc_controls_drag
- **Notes**: Addon/Example class

#### FirstPersonControls

- **Docs**: https://threejs.org/docs/#examples/en/controls/FirstPersonControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: interaction
- **Notes**: Addon/Example class

#### FlyControls

- **Docs**: https://threejs.org/docs/#examples/en/controls/FlyControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: interaction
- **Key Examples** (1): misc_controls_fly
- **Notes**: Addon/Example class

#### MapControls

- **Docs**: https://threejs.org/docs/#examples/en/controls/MapControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: interaction
- **Key Examples** (1): misc_controls_map
- **Notes**: Addon/Example class

#### PointerLockControls

- **Docs**: https://threejs.org/docs/#examples/en/controls/PointerLockControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: interaction|lighting
- **Key Examples** (1): misc_controls_pointerlock
- **Notes**: Addon/Example class

#### TrackballControls

- **Docs**: https://threejs.org/docs/#examples/en/controls/TrackballControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: interaction
- **Key Examples** (1): misc_controls_trackball
- **Notes**: Addon/Example class

#### TransformControls

- **Docs**: https://threejs.org/docs/#examples/en/controls/TransformControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: interaction
- **Key Examples** (2): webxr_xr_controls_transform|misc_controls_transform
- **Notes**: Addon/Example class

### Postprocessing

#### EffectComposer

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/EffectComposer
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: postprocessing
- **Related APIs**: RenderPass|ShaderPass|PostProcessing
- **Key Examples** (55): webgl_postprocessing|webgl_postprocessing_3dlut|webgl_postprocessing_advanced|webgl_postprocessing_afterimage|webgl_postprocessing_backgrounds|webgl_postprocessing_transition|webgl_postprocessing_dof|webgl_postprocessing_dof2|webgl_postprocessing_fxaa|webgl_postprocessing_glitch
- **Notes**: Addon/Example class

#### UnrealBloomPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/UnrealBloomPass
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Domains**: postprocessing
- **Related APIs**: EffectComposer|RenderPass|BloomNode
- **Also Used In**: webgl_postprocessing_unreal_bloom|webgl_postprocessing_unreal_bloom_selective|webgpu_postprocessing_bloom|webgpu_postprocessing_bloom_emissive|webgpu_postprocessing_bloom_selective
- **Notes**: Addon/Example class

#### RenderPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/RenderPass
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: postprocessing|rendering
- **Notes**: Addon/Example class

#### SSAOPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/SSAOPass
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: postprocessing
- **Also Used In**: webgl_postprocessing_ssao
- **Notes**: Addon/Example class

#### FXAAPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/FXAAPass
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Addon/Example class

#### ShaderPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/ShaderPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: materials|postprocessing|rendering
- **Notes**: Addon/Example class

#### SMAAPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/SMAAPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: postprocessing
- **Also Used In**: webgl_postprocessing_smaa|webgpu_postprocessing_smaa
- **Notes**: Addon/Example class

#### GTAOPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/GTAOPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: postprocessing
- **Also Used In**: webgl_postprocessing_gtao
- **Notes**: Addon/Example class

#### BokehPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/BokehPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: postprocessing
- **Also Used In**: webgl_postprocessing_dof|webgl_postprocessing_dof2|webgpu_postprocessing_dof|webgpu_postprocessing_dof_basic
- **Notes**: Addon/Example class

#### OutlinePass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/OutlinePass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation|Orbs
- **Domains**: postprocessing
- **Also Used In**: webgl_postprocessing_outline|webgpu_postprocessing_outline
- **Notes**: Addon/Example class

#### SSRPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/SSRPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: postprocessing
- **Also Used In**: webgl_postprocessing_ssr|webgpu_postprocessing_ssr
- **Notes**: Addon/Example class

#### OutputPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/OutputPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Addon/Example class

#### RenderTransitionPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/RenderTransitionPass
- **Scores**: prod=0.7 | learn=0.6 | blender=0.1 | priority=0.74
- **Projects**: Pantheon|Orbs
- **Domains**: postprocessing
- **Notes**: Transition effect between two scenes

#### DotScreenPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/DotScreenPass
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Orbs|Wall
- **Domains**: postprocessing
- **Notes**: Halftone dot screen effect

#### MaskPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/MaskPass
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Applies stencil mask from a scene

#### FullScreenQuad

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/FullScreenQuad
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Helper for rendering full-screen quads in passes

#### SAOPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/SAOPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Addon/Example class

#### AfterimagePass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/AfterimagePass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Addon/Example class

#### BloomPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/BloomPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Addon/Example class

#### FilmPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/FilmPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Addon/Example class

#### GlitchPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/GlitchPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Addon/Example class

#### HalftonePass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/HalftonePass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Addon/Example class

#### LUTPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/LUTPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: loading|math|postprocessing
- **Notes**: Addon/Example class

#### Pass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/Pass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Addon/Example class

#### RenderPixelatedPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/RenderPixelatedPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: postprocessing|rendering
- **Notes**: Addon/Example class

#### SSAARenderPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/SSAARenderPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs|Ritual
- **Domains**: postprocessing|rendering|xr
- **Notes**: Addon/Example class

#### TAARenderPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/TAARenderPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs|Ritual
- **Domains**: postprocessing|rendering|xr
- **Notes**: Addon/Example class

#### ClearPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/ClearPass
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Clears the render target

#### ClearMaskPass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/ClearMaskPass
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Clears the stencil mask

#### SavePass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/SavePass
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Saves current render to a texture for later use

#### TexturePass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/TexturePass
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Renders a texture as a full-screen pass

#### CubeTexturePass

- **Docs**: https://threejs.org/docs/#examples/en/postprocessing/CubeTexturePass
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Renders a cube map as background

### Effects

#### AnaglyphEffect

- **Docs**: https://threejs.org/docs/#examples/en/effects/AnaglyphEffect
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: rendering
- **Notes**: Addon/Example class

#### AsciiEffect

- **Docs**: https://threejs.org/docs/#examples/en/effects/AsciiEffect
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Wall
- **Domains**: rendering
- **Notes**: Addon/Example class

#### OutlineEffect

- **Docs**: https://threejs.org/docs/#examples/en/effects/OutlineEffect
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Constellation
- **Domains**: postprocessing
- **Notes**: Addon/Example class

#### ParallaxBarrierEffect

- **Docs**: https://threejs.org/docs/#examples/en/effects/ParallaxBarrierEffect
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual
- **Domains**: xr
- **Notes**: Addon/Example class

#### StereoEffect

- **Docs**: https://threejs.org/docs/#examples/en/effects/StereoEffect
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: rendering
- **Notes**: Addon/Example class

### Exporters

#### EXRExporter

- **Docs**: https://threejs.org/docs/#examples/en/exporters/EXRExporter
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual
- **Domains**: loading|xr
- **Key Examples** (1): misc_exporter_exr
- **Notes**: Addon/Example class

#### KTX2Exporter

- **Docs**: https://threejs.org/docs/#examples/en/exporters/KTX2Exporter
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): misc_exporter_ktx2
- **Notes**: Addon/Example class

#### DRACOExporter

- **Docs**: https://threejs.org/docs/#examples/en/exporters/DRACOExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): misc_exporter_draco
- **Notes**: Addon/Example class

#### GLTFExporter

- **Docs**: https://threejs.org/docs/#examples/en/exporters/GLTFExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Pantheon
- **Domains**: loading
- **Key Examples** (1): misc_exporter_gltf
- **Notes**: Addon/Example class

#### OBJExporter

- **Docs**: https://threejs.org/docs/#examples/en/exporters/OBJExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): misc_exporter_obj
- **Notes**: Addon/Example class

#### PLYExporter

- **Docs**: https://threejs.org/docs/#examples/en/exporters/PLYExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): misc_exporter_ply
- **Notes**: Addon/Example class

#### STLExporter

- **Docs**: https://threejs.org/docs/#examples/en/exporters/STLExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): misc_exporter_stl
- **Notes**: Addon/Example class

#### USDZExporter

- **Docs**: https://threejs.org/docs/#examples/en/exporters/USDZExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Domains**: loading
- **Key Examples** (1): misc_exporter_usdz
- **Notes**: Addon/Example class

### Lines

#### Line2

- **Docs**: https://threejs.org/docs/#examples/en/lines/Line2
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation
- **Domains**: rendering
- **Related APIs**: LineMaterial|LineGeometry|LineSegments2
- **Notes**: Addon/Example class

#### LineGeometry

- **Docs**: https://threejs.org/docs/#examples/en/lines/LineGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation
- **Domains**: geometry
- **Notes**: Addon/Example class

#### LineMaterial

- **Docs**: https://threejs.org/docs/#examples/en/lines/LineMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation|Orbs
- **Domains**: materials
- **Notes**: Addon/Example class

#### Wireframe

- **Docs**: https://threejs.org/docs/#examples/en/lines/Wireframe
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation
- **Domains**: rendering
- **Related APIs**: WireframeGeometry2|EdgesGeometry|LineSegments
- **Notes**: Addon/Example class

#### LineSegments2

- **Docs**: https://threejs.org/docs/#examples/en/lines/LineSegments2
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Constellation
- **Domains**: rendering
- **Notes**: Addon/Example class

#### LineSegmentsGeometry

- **Docs**: https://threejs.org/docs/#examples/en/lines/LineSegmentsGeometry
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Constellation
- **Domains**: geometry
- **Notes**: Addon/Example class

#### WireframeGeometry2

- **Docs**: https://threejs.org/docs/#examples/en/lines/WireframeGeometry2
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Constellation
- **Domains**: geometry
- **Notes**: Addon/Example class

### Interactive

#### SelectionHelper

- **Docs**: https://threejs.org/docs/#examples/en/interactive/SelectionHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Ritual
- **Domains**: interaction
- **Notes**: Addon/Example class

#### HTMLMesh

- **Docs**: https://threejs.org/docs/#examples/en/interactive/HTMLMesh
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Wall
- **Domains**: geometry|interaction
- **Notes**: Addon/Example class

#### InteractiveGroup

- **Docs**: https://threejs.org/docs/#examples/en/interactive/InteractiveGroup
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual
- **Domains**: interaction
- **Notes**: Addon/Example class

#### SelectionBox

- **Docs**: https://threejs.org/docs/#examples/en/interactive/SelectionBox
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual
- **Domains**: interaction
- **Notes**: Addon/Example class

### Webxr

#### ARButton

- **Docs**: https://threejs.org/docs/#examples/en/webxr/ARButton
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: xr
- **Notes**: Addon/Example class

#### VRButton

- **Docs**: https://threejs.org/docs/#examples/en/webxr/VRButton
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: xr
- **Notes**: Addon/Example class

#### XRButton

- **Docs**: https://threejs.org/docs/#examples/en/webxr/XRButton
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Domains**: xr
- **Notes**: Addon/Example class

#### XREstimatedLight

- **Docs**: https://threejs.org/docs/#examples/en/webxr/XREstimatedLight
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Ritual
- **Domains**: lighting|xr
- **Notes**: Addon/Example class

#### XRControllerModelFactory

- **Docs**: https://threejs.org/docs/#examples/en/webxr/XRControllerModelFactory
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual
- **Domains**: geometry|xr
- **Notes**: Addon/Example class

#### XRHandModelFactory

- **Docs**: https://threejs.org/docs/#examples/en/webxr/XRHandModelFactory
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual
- **Domains**: xr
- **Notes**: Addon/Example class

### WebXR

#### XRPlanes

- **Docs**: https://threejs.org/docs/#examples/en/webxr/XRPlanes
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Ritual
- **Domains**: webxr
- **Notes**: Detects and visualizes real-world planes in AR

#### Text2D

- **Docs**: https://threejs.org/docs/#examples/en/webxr/Text2D
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Ritual|Wall
- **Domains**: webxr
- **Notes**: 2D text label for XR interfaces

#### XRControllerModel

- **Docs**: https://threejs.org/docs/#examples/en/webxr/XRControllerModel
- **Scores**: prod=0.7 | learn=0.5 | blender=0.4 | priority=0.65
- **Projects**: Ritual
- **Domains**: webxr
- **Notes**: 3D model representing an XR controller

#### XRHandModel

- **Docs**: https://threejs.org/docs/#examples/en/webxr/XRHandModel
- **Scores**: prod=0.7 | learn=0.5 | blender=0.4 | priority=0.65
- **Projects**: Ritual
- **Domains**: webxr
- **Notes**: 3D hand model from XR hand tracking data

#### XRHandMeshModel

- **Docs**: https://threejs.org/docs/#examples/en/webxr/XRHandMeshModel
- **Scores**: prod=0.7 | learn=0.5 | blender=0.4 | priority=0.65
- **Projects**: Ritual
- **Domains**: webxr
- **Notes**: Mesh-based hand model from tracking

#### XRHandPrimitiveModel

- **Docs**: https://threejs.org/docs/#examples/en/webxr/XRHandPrimitiveModel
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Ritual
- **Domains**: webxr
- **Notes**: Simple primitive hand model (spheres/boxes)

#### OculusHandPointerModel

- **Docs**: https://threejs.org/docs/#examples/en/webxr/OculusHandPointerModel
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Ritual
- **Domains**: webxr
- **Notes**: Pointer ray model for Quest hand tracking

#### OculusHandModel

- **Docs**: https://threejs.org/docs/#examples/en/webxr/OculusHandModel
- **Scores**: prod=0.6 | learn=0.4 | blender=0.4 | priority=0.58
- **Projects**: Ritual
- **Domains**: webxr
- **Notes**: Meta Quest hand tracking model

### Physics

#### AmmoPhysics

- **Docs**: https://threejs.org/docs/#examples/en/physics/AmmoPhysics
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: physics
- **Key Examples** (6): physics_ammo_break|physics_ammo_cloth|physics_ammo_instancing|physics_ammo_rope|physics_ammo_terrain|physics_ammo_volume
- **Notes**: Addon/Example class

#### JoltPhysics

- **Docs**: https://threejs.org/docs/#examples/en/physics/JoltPhysics
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: physics
- **Key Examples** (1): physics_jolt_instancing
- **Notes**: Addon/Example class

#### RapierPhysics

- **Docs**: https://threejs.org/docs/#examples/en/physics/RapierPhysics
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: physics
- **Key Examples** (6): physics_rapier_basic|physics_rapier_instancing|physics_rapier_joints|physics_rapier_character_controller|physics_rapier_vehicle_controller|physics_rapier_terrain
- **Notes**: Addon/Example class

### Environments

#### ColorEnvironment

- **Docs**: https://threejs.org/docs/#examples/en/environments/ColorEnvironment
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: environments
- **Notes**: Solid color environment map

#### DebugEnvironment

- **Docs**: https://threejs.org/docs/#examples/en/environments/DebugEnvironment
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: rendering
- **Notes**: Addon/Example class

#### RoomEnvironment

- **Docs**: https://threejs.org/docs/#examples/en/environments/RoomEnvironment
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: rendering
- **Notes**: Addon/Example class

### Shaders

#### UniformsUtils

- **Docs**: https://threejs.org/docs/#api/en/renderers/shaders/UniformsUtils
- **Scores**: prod=0.8 | learn=0.6 | blender=0.1 | priority=0.78
- **Projects**: Orbs
- **Domains**: shaders
- **Notes**: Utility for cloning and merging shader uniforms

### Csm

#### CSMHelper

- **Docs**: https://threejs.org/docs/#examples/en/csm/CSMHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: lighting
- **Notes**: Addon/Example class

#### CSM

- **Docs**: https://threejs.org/docs/#examples/en/csm/CSM
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: lighting
- **Notes**: Addon/Example class

### CSM

#### CSMFrustum

- **Docs**: https://threejs.org/docs/#examples/en/csm/CSMFrustum
- **Scores**: prod=0.6 | learn=0.3 | blender=0.1 | priority=0.61
- **Projects**: Pantheon
- **Domains**: csm
- **Notes**: Frustum calculation for cascaded shadow splits

#### CSMShadowNode

- **Docs**: https://threejs.org/docs/#examples/en/csm/CSMShadowNode
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Pantheon
- **Domains**: csm
- **Notes**: Node material shadow node for CSM

#### CSMShader

- **Docs**: https://threejs.org/docs/#examples/en/csm/CSMShader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Pantheon
- **Domains**: csm
- **Notes**: Shader code for cascaded shadow map rendering

### Curves

#### HeartCurve

- **Docs**: https://threejs.org/docs/#examples/en/curves/HeartCurve
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Heart-shaped parametric curve

#### HelixCurve

- **Docs**: https://threejs.org/docs/#examples/en/curves/HelixCurve
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation|Orbs
- **Domains**: curves
- **Notes**: Helical spiral parametric curve

#### GrannyKnot

- **Docs**: https://threejs.org/docs/#examples/en/curves/GrannyKnot
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Granny knot parametric curve

#### KnotCurve

- **Docs**: https://threejs.org/docs/#examples/en/curves/KnotCurve
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Decorative knot parametric curve

#### TrefoilKnot

- **Docs**: https://threejs.org/docs/#examples/en/curves/TrefoilKnot
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Trefoil knot parametric curve

#### TorusKnot

- **Docs**: https://threejs.org/docs/#examples/en/curves/TorusKnot
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Orbs
- **Domains**: curves
- **Notes**: Torus knot parametric curve

#### CinquefoilKnot

- **Docs**: https://threejs.org/docs/#examples/en/curves/CinquefoilKnot
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Cinquefoil knot parametric curve

#### VivianiCurve

- **Docs**: https://threejs.org/docs/#examples/en/curves/VivianiCurve
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Viviani curve (sphere-cylinder intersection)

#### TrefoilPolynomialKnot

- **Docs**: https://threejs.org/docs/#examples/en/curves/TrefoilPolynomialKnot
- **Scores**: prod=0.6 | learn=0.3 | blender=0.1 | priority=0.61
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Polynomial trefoil knot curve

#### FigureEightPolynomialKnot

- **Docs**: https://threejs.org/docs/#examples/en/curves/FigureEightPolynomialKnot
- **Scores**: prod=0.6 | learn=0.3 | blender=0.1 | priority=0.61
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Figure-eight polynomial knot curve

#### NURBSUtils

- **Docs**: https://threejs.org/docs/#examples/en/curves/NURBSUtils
- **Scores**: prod=0.6 | learn=0.4 | blender=0.4 | priority=0.58
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Utility functions for NURBS calculations

#### DecoratedTorusKnot4a

- **Docs**: https://threejs.org/docs/#examples/en/curves/DecoratedTorusKnot4a
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Decorative torus knot variant 4a

#### DecoratedTorusKnot4b

- **Docs**: https://threejs.org/docs/#examples/en/curves/DecoratedTorusKnot4b
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Decorative torus knot variant 4b

#### DecoratedTorusKnot5a

- **Docs**: https://threejs.org/docs/#examples/en/curves/DecoratedTorusKnot5a
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Decorative torus knot variant 5a

#### DecoratedTorusKnot5c

- **Docs**: https://threejs.org/docs/#examples/en/curves/DecoratedTorusKnot5c
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Constellation
- **Domains**: curves
- **Notes**: Decorative torus knot variant 5c

#### NURBSCurve

- **Docs**: https://threejs.org/docs/#examples/en/curves/NURBSCurve
- **Scores**: prod=0.5 | learn=0.4 | blender=0.5 | priority=0.52
- **Projects**: Orbs
- **Domains**: rendering
- **Notes**: Addon/Example class

#### NURBSSurface

- **Docs**: https://threejs.org/docs/#examples/en/curves/NURBSSurface
- **Scores**: prod=0.5 | learn=0.4 | blender=0.5 | priority=0.52
- **Projects**: Pantheon
- **Domains**: rendering
- **Also Used In**: webgl_geometry_nurbs|webgl_loader_fbx_nurbs
- **Notes**: Addon/Example class

#### NURBSVolume

- **Docs**: https://threejs.org/docs/#examples/en/curves/NURBSVolume
- **Scores**: prod=0.5 | learn=0.4 | blender=0.7 | priority=0.48
- **Projects**: Orbs
- **Domains**: curves
- **Notes**: NURBS volume for solid modeling

### GPGPU

#### BitonicSort

- **Docs**: https://threejs.org/docs/#examples/en/gpgpu/BitonicSort
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: gpgpu
- **Notes**: GPU-based bitonic sort algorithm

### Misc

#### GPUComputationRenderer

- **Docs**: https://threejs.org/docs/#examples/en/misc/GPUComputationRenderer
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: rendering
- **Key Examples** (4): webgl_gpgpu_birds|webgl_gpgpu_birds_gltf|webgl_gpgpu_water|webgl_gpgpu_protoplanet
- **Notes**: Addon/Example class

#### Volume

- **Docs**: https://threejs.org/docs/#examples/en/misc/Volume
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: rendering
- **Notes**: Addon/Example class

#### VolumeSlice

- **Docs**: https://threejs.org/docs/#examples/en/misc/VolumeSlice
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: rendering
- **Notes**: Addon/Example class

#### TubePainter

- **Docs**: https://threejs.org/docs/#examples/en/misc/TubePainter
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Ritual|Constellation
- **Domains**: misc
- **Notes**: Real-time tube painting in 3D (VR drawing)

#### Gyroscope

- **Docs**: https://threejs.org/docs/#examples/en/misc/Gyroscope
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Ritual
- **Domains**: misc
- **Notes**: Object that maintains world orientation regardless of parent

#### ProgressiveLightMap

- **Docs**: https://threejs.org/docs/#examples/en/misc/ProgressiveLightMap
- **Scores**: prod=0.6 | learn=0.5 | blender=0.4 | priority=0.61
- **Projects**: Orbs|Pantheon
- **Domains**: misc
- **Notes**: Progressive lightmap baking in real-time

#### ConvexObjectBreaker

- **Docs**: https://threejs.org/docs/#examples/en/misc/ConvexObjectBreaker
- **Scores**: prod=0.6 | learn=0.5 | blender=0.4 | priority=0.61
- **Projects**: Ritual
- **Domains**: misc
- **Notes**: Breaks convex objects into pieces for destruction effects

### Modifiers

#### EdgeSplitModifier

- **Docs**: https://threejs.org/docs/#examples/en/modifiers/EdgeSplitModifier
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Constellation
- **Domains**: rendering
- **Also Used In**: webgl_modifier_edgesplit
- **Notes**: Addon/Example class

#### Flow

- **Docs**: https://threejs.org/docs/#examples/en/modifiers/Flow
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: animation
- **Notes**: Addon/Example class

#### InstancedFlow

- **Docs**: https://threejs.org/docs/#examples/en/modifiers/InstancedFlow
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: animation
- **Notes**: Addon/Example class

#### SimplifyModifier

- **Docs**: https://threejs.org/docs/#examples/en/modifiers/SimplifyModifier
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: rendering
- **Also Used In**: webgl_modifier_simplifier
- **Notes**: Addon/Example class

#### TessellateModifier

- **Docs**: https://threejs.org/docs/#examples/en/modifiers/TessellateModifier
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: rendering
- **Also Used In**: webgl_modifier_tessellation
- **Notes**: Addon/Example class

### TSL

#### BloomNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/BloomNode
- **Scores**: prod=0.7 | learn=1.0 | blender=0.1 | priority=0.86
- **Projects**: Orbs
- **Domains**: postprocessing
- **Related APIs**: PostProcessing|UnrealBloomPass|GaussianBlurNode
- **Notes**: Three.js Shader Language node

#### FXAANode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/FXAANode
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### GTAONode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/GTAONode
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### GaussianBlurNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/GaussianBlurNode
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### SSRNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/SSRNode
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### SSGINode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/SSGINode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### SSSNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/SSSNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### DepthOfFieldNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/DepthOfFieldNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs
- **Domains**: materials|postprocessing|textures
- **Notes**: Three.js Shader Language node

#### GodraysNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/GodraysNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs
- **Domains**: math|postprocessing
- **Notes**: Three.js Shader Language node

#### AfterImageNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/AfterImageNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### AnamorphicNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/AnamorphicNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs|Pantheon
- **Domains**: animation|postprocessing
- **Notes**: Three.js Shader Language node

#### ChromaticAberrationNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/ChromaticAberrationNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### LensflareNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/LensflareNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Ritual
- **Domains**: lighting|postprocessing|xr
- **Notes**: Three.js Shader Language node

#### OutlineNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/OutlineNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### SobelOperatorNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/SobelOperatorNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### TRAANode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/TRAANode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### SMAANode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/SMAANode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs
- **Domains**: postprocessing
- **Notes**: Three.js Shader Language node

#### PixelationNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/PixelationNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Wall
- **Domains**: tsl
- **Notes**: Node-based pixelation effect for WebGPU

#### FilmNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/FilmNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs
- **Domains**: tsl
- **Notes**: Node-based film grain effect for WebGPU

#### DotScreenNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/DotScreenNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Wall
- **Domains**: tsl
- **Notes**: Node-based dot screen halftone for WebGPU

#### RGBShiftNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/RGBShiftNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs
- **Domains**: tsl
- **Notes**: Node-based RGB channel shift for WebGPU

#### Lut3DNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/Lut3DNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs
- **Domains**: tsl
- **Notes**: 3D color lookup table for WebGPU

#### TransitionNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/TransitionNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon|Orbs
- **Domains**: tsl
- **Notes**: Scene transition effect for WebGPU

#### RetroPassNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/RetroPassNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Wall
- **Domains**: tsl
- **Notes**: Retro CRT/console visual effect for WebGPU

#### ToonOutlinePassNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/ToonOutlinePassNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation|Pantheon
- **Domains**: tsl
- **Notes**: Toon outline rendering pass for WebGPU

#### DenoiseNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/DenoiseNode
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: tsl
- **Notes**: Denoising filter for ray-traced effects

#### BilateralBlurNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/BilateralBlurNode
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: tsl
- **Notes**: Edge-preserving bilateral blur for WebGPU

#### SSAAPassNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/SSAAPassNode
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: tsl
- **Notes**: Super-sampling AA pass for WebGPU

#### PixelationPassNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/PixelationPassNode
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs|Wall
- **Domains**: tsl
- **Notes**: Full pixelation render pass for WebGPU

#### TiledLightsNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/TiledLightsNode
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Pantheon|Orbs
- **Domains**: tsl
- **Notes**: Tiled lighting node for efficient multi-light

#### AnaglyphPassNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/AnaglyphPassNode
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual
- **Domains**: tsl
- **Notes**: Anaglyph stereoscopic pass for WebGPU

#### TileShadowNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/TileShadowNode
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Pantheon
- **Domains**: tsl
- **Notes**: Tiled shadow map node for many lights

#### ParallaxBarrierPassNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/ParallaxBarrierPassNode
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Ritual
- **Domains**: tsl
- **Notes**: Parallax barrier pass for WebGPU

#### StereoCompositePassNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/StereoCompositePassNode
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Ritual
- **Domains**: tsl
- **Notes**: Stereo composite pass for WebGPU VR

#### StereoPassNode

- **Docs**: https://threejs.org/docs/#examples/en/tsl/StereoPassNode
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Ritual
- **Domains**: tsl
- **Notes**: Basic stereo rendering pass for WebGPU

#### TileShadowNodeHelper

- **Docs**: https://threejs.org/docs/#examples/en/tsl/TileShadowNodeHelper
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Pantheon
- **Domains**: tsl
- **Notes**: Helper for tile shadow visualization

### Utils

#### BufferGeometryUtils

- **Docs**: https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils
- **Scores**: prod=0.9 | learn=0.7 | blender=0.1 | priority=0.85
- **Projects**: Pantheon|Orbs|Constellation
- **Domains**: utils
- **Notes**: Merge/optimize/transform BufferGeometry instances

#### SceneUtils

- **Docs**: https://threejs.org/docs/#examples/en/utils/SceneUtils
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Pantheon|Orbs
- **Domains**: utils
- **Notes**: Utility functions for scene manipulation

#### GeometryUtils

- **Docs**: https://threejs.org/docs/#examples/en/utils/GeometryUtils
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Constellation
- **Domains**: utils
- **Notes**: Geometry utility functions for hilbert curves etc

#### CameraUtils

- **Docs**: https://threejs.org/docs/#examples/en/utils/CameraUtils
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Wall
- **Domains**: utils
- **Notes**: Camera frame and projection utilities

#### ShadowMapViewer

- **Docs**: https://threejs.org/docs/#examples/en/utils/ShadowMapViewer
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: interaction|lighting|materials
- **Notes**: Addon/Example class

#### GeometryCompressionUtils

- **Docs**: https://threejs.org/docs/#examples/en/utils/GeometryCompressionUtils
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs|Constellation
- **Domains**: utils
- **Notes**: Compresses geometry data for reduced memory

#### SkeletonUtils

- **Docs**: https://threejs.org/docs/#examples/en/utils/SkeletonUtils
- **Scores**: prod=0.8 | learn=0.6 | blender=0.9 | priority=0.62
- **Projects**: Pantheon
- **Domains**: utils
- **Notes**: Skeleton retargeting and manipulation utilities

#### UVsDebug

- **Docs**: https://threejs.org/docs/#examples/en/utils/UVsDebug
- **Scores**: prod=0.6 | learn=0.5 | blender=0.4 | priority=0.61
- **Projects**: Pantheon|Orbs
- **Domains**: utils
- **Notes**: UV coordinate visualization for debugging

#### SortUtils

- **Docs**: https://threejs.org/docs/#examples/en/utils/SortUtils
- **Scores**: prod=0.6 | learn=0.3 | blender=0.1 | priority=0.61
- **Projects**: Orbs
- **Domains**: utils
- **Notes**: Sorting utilities for depth ordering

#### WebGLTextureUtils

- **Docs**: https://threejs.org/docs/#examples/en/utils/WebGLTextureUtils
- **Scores**: prod=0.6 | learn=0.3 | blender=0.1 | priority=0.61
- **Projects**: Orbs
- **Domains**: utils
- **Notes**: WebGL-specific texture utility functions

#### SceneOptimizer

- **Docs**: https://threejs.org/docs/#examples/en/utils/SceneOptimizer
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: rendering
- **Notes**: Addon/Example class

#### WorkerPool

- **Docs**: https://threejs.org/docs/#examples/en/utils/WorkerPool
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: loading
- **Notes**: Addon/Example class

#### WebGPUTextureUtils

- **Docs**: https://threejs.org/docs/#examples/en/utils/WebGPUTextureUtils
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs
- **Domains**: utils
- **Notes**: WebGPU-specific texture utility functions

#### LDrawUtils

- **Docs**: https://threejs.org/docs/#examples/en/utils/LDrawUtils
- **Scores**: prod=0.5 | learn=0.3 | blender=0.4 | priority=0.51
- **Projects**: Pantheon
- **Domains**: utils
- **Notes**: Utility functions for LDraw model processing

### Capabilities

#### WebGL

- **Docs**: https://threejs.org/docs/#examples/en/capabilities/WebGL
- **Scores**: prod=0.8 | learn=0.6 | blender=0.1 | priority=0.78
- **Projects**: Orbs
- **Domains**: capabilities
- **Notes**: WebGL feature detection and capability checking

#### WebGPU

- **Docs**: https://threejs.org/docs/#examples/en/capabilities/WebGPU
- **Scores**: prod=0.7 | learn=0.6 | blender=0.1 | priority=0.74
- **Projects**: Orbs
- **Domains**: capabilities
- **Notes**: WebGPU feature detection and capability checking

### Inspector

#### Tab

- **Docs**: https://threejs.org/docs/#examples/en/inspector/Tab
- **Scores**: prod=0.4 | learn=0.3 | blender=0.1 | priority=0.53
- **Projects**: Orbs
- **Domains**: inspector
- **Notes**: Inspector tab UI component

### Lighting

#### TiledLighting

- **Docs**: https://threejs.org/docs/#examples/en/lighting/TiledLighting
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Domains**: lighting
- **Notes**: Addon/Example class

### Debug

#### InspectorBase

- **Docs**: https://threejs.org/docs/#api/en/renderers/InspectorBase
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: debug
- **Notes**: Base class for renderer inspection tools

### Line

#### Line2NodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/Line2NodeMaterial
- **Scores**: prod=0.7 | learn=0.6 | blender=0.1 | priority=0.74
- **Projects**: Constellation
- **Domains**: line
- **Notes**: Node material for wide lines with Line2 addon

#### LineBasicNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/LineBasicNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation
- **Domains**: line
- **Notes**: Node-based line material for WebGPU renderer

#### LineDashedNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/LineDashedNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation
- **Domains**: line
- **Notes**: Node-based dashed line material for WebGPU

### Mesh

#### MeshBasicNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshBasicNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Wall
- **Domains**: mesh
- **Notes**: Node-based unlit mesh material

#### MeshLambertNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshLambertNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon
- **Domains**: mesh
- **Notes**: Node-based Lambert material for WebGPU

#### MeshMatcapNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshMatcapNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon
- **Domains**: mesh
- **Notes**: Node-based matcap material for WebGPU

#### MeshNormalNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshNormalNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation
- **Domains**: mesh
- **Notes**: Node-based normal material for WebGPU

#### MeshPhongNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshPhongNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon
- **Domains**: mesh
- **Notes**: Node-based Phong material for WebGPU

#### MeshToonNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshToonNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon
- **Domains**: mesh
- **Notes**: Node-based toon material for WebGPU

#### MeshPhysicalNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshPhysicalNodeMaterial
- **Scores**: prod=0.6 | learn=0.6 | blender=0.7 | priority=0.58
- **Projects**: Pantheon|Orbs
- **Domains**: mesh
- **Notes**: Node-based PBR physical material for WebGPU

#### MeshSSSNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshSSSNodeMaterial
- **Scores**: prod=0.6 | learn=0.6 | blender=0.7 | priority=0.58
- **Projects**: Pantheon|Orbs
- **Domains**: mesh
- **Notes**: Subsurface scattering material for translucent objects

#### MeshStandardNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/MeshStandardNodeMaterial
- **Scores**: prod=0.6 | learn=0.6 | blender=0.7 | priority=0.58
- **Projects**: Pantheon|Orbs
- **Domains**: mesh
- **Notes**: Node-based standard PBR material for WebGPU

### Node

#### NodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/NodeMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Domains**: node
- **Notes**: Base class for node-based shader materials

#### NodeMaterialObserver

- **Docs**: https://threejs.org/docs/#api/en/materials/NodeMaterialObserver
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs
- **Domains**: node
- **Notes**: Observes and tracks changes in NodeMaterial properties

### NodeSystem

#### GLSLNodeBuilder

- **Docs**: https://threejs.org/docs/#api/en/renderers/GLSLNodeBuilder
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs
- **Domains**: nodesystem
- **Notes**: Compiles node graph to GLSL shaders

#### WGSLNodeBuilder

- **Docs**: https://threejs.org/docs/#api/en/renderers/WGSLNodeBuilder
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Domains**: nodesystem
- **Notes**: Compiles node graph to WGSL shaders

#### WGSLNodeFunction

- **Docs**: https://threejs.org/docs/#api/en/renderers/WGSLNodeFunction
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs
- **Domains**: nodesystem
- **Notes**: WGSL function representation in node system

#### WGSLNodeParser

- **Docs**: https://threejs.org/docs/#api/en/renderers/WGSLNodeParser
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs
- **Domains**: nodesystem
- **Notes**: Parses WGSL code into node graph

### Pipeline

#### RenderPipeline

- **Docs**: https://threejs.org/docs/#api/en/renderers/RenderPipeline
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs
- **Domains**: pipeline
- **Notes**: Configurable rendering pipeline

### Points

#### PointsNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/PointsNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Constellation
- **Domains**: points
- **Notes**: Node-based points material for WebGPU

### Profiling

#### WebGLTimestampQueryPool

- **Docs**: https://threejs.org/docs/#api/en/renderers/WebGLTimestampQueryPool
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs
- **Domains**: profiling
- **Notes**: WebGL-specific timestamp query pool

#### WebGPUTimestampQueryPool

- **Docs**: https://threejs.org/docs/#api/en/renderers/WebGPUTimestampQueryPool
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs
- **Domains**: profiling
- **Notes**: WebGPU-specific timestamp query pool

### Special

#### SpriteNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/SpriteNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon|Orbs
- **Domains**: special
- **Notes**: Node-based sprite material for WebGPU

#### VolumeNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/VolumeNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs
- **Domains**: special
- **Notes**: Node material for volumetric rendering

#### ShadowNodeMaterial

- **Docs**: https://threejs.org/docs/#api/en/materials/ShadowNodeMaterial
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Pantheon
- **Domains**: special
- **Notes**: Node-based shadow material for WebGPU

#### SSSLightingModel

- **Docs**: https://threejs.org/docs/#api/en/materials/SSSLightingModel
- **Scores**: prod=0.6 | learn=0.5 | blender=0.4 | priority=0.61
- **Projects**: Orbs|Pantheon
- **Domains**: special
- **Notes**: Subsurface scattering lighting model implementation

### Utilities

#### Interpolations

- **Docs**: https://threejs.org/docs/#api/en/extras/Interpolations
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Constellation|Orbs
- **Domains**: utilities
- **Notes**: Bezier and Catmull-Rom interpolation functions

---

## Quick Reference: Top APIs per Project

### Top 20 for Pantheon

| # | API | Priority | Prod | Learn | Blender | Examples |
|---|-----|----------|------|-------|---------|----------|
| 1 | Audio | 0.98 | 1.0 | 1.0 | 0.1 | 4 |
| 2 | AudioListener | 0.98 | 1.0 | 1.0 | 0.1 | 4 |
| 3 | KeyframeTrack | 0.89 | 1.0 | 0.7 | 0.1 | 16 |
| 4 | BufferGeometryUtils | 0.85 | 0.9 | 0.7 | 0.1 | 0 |
| 5 | AnimationMixer | 0.84 | 1.0 | 1.0 | 0.8 | 16 |
| 6 | GLTFLoader | 0.84 | 1.0 | 1.0 | 0.8 | 21 |
| 7 | Font | 0.78 | 0.8 | 0.6 | 0.1 | 0 |
| 8 | AnimationObjectGroup | 0.77 | 0.7 | 0.7 | 0.1 | 16 |
| 9 | AnimationUtils | 0.77 | 0.7 | 0.7 | 0.1 | 16 |
| 10 | BooleanKeyframeTrack | 0.77 | 0.7 | 0.7 | 0.1 | 16 |
| 11 | ColorKeyframeTrack | 0.77 | 0.7 | 0.7 | 0.1 | 16 |
| 12 | NumberKeyframeTrack | 0.77 | 0.7 | 0.7 | 0.1 | 16 |
| 13 | PropertyMixer | 0.77 | 0.7 | 0.7 | 0.1 | 16 |
| 14 | QuaternionKeyframeTrack | 0.77 | 0.7 | 0.7 | 0.1 | 16 |
| 15 | StringKeyframeTrack | 0.77 | 0.7 | 0.7 | 0.1 | 16 |
| 16 | VectorKeyframeTrack | 0.77 | 0.7 | 0.7 | 0.1 | 16 |
| 17 | AudioAnalyser | 0.77 | 0.7 | 0.7 | 0.1 | 4 |
| 18 | AudioContext | 0.77 | 0.7 | 0.7 | 0.1 | 4 |
| 19 | PositionalAudio | 0.77 | 0.7 | 0.7 | 0.1 | 4 |
| 20 | AnimationAction | 0.75 | 1.0 | 0.7 | 0.8 | 16 |

### Top 20 for Orbs

| # | API | Priority | Prod | Learn | Blender | Examples |
|---|-----|----------|------|-------|---------|----------|
| 1 | BufferGeometry | 0.98 | 1.0 | 1.0 | 0.1 | 18 |
| 2 | Object3D | 0.98 | 1.0 | 1.0 | 0.1 | 18 |
| 3 | BoxGeometry | 0.98 | 1.0 | 1.0 | 0.1 | 1 |
| 4 | SphereGeometry | 0.98 | 1.0 | 1.0 | 0.1 | 18 |
| 5 | AmbientLight | 0.98 | 1.0 | 1.0 | 0.1 | 21 |
| 6 | DirectionalLight | 0.98 | 1.0 | 1.0 | 0.1 | 18 |
| 7 | PointLight | 0.98 | 1.0 | 1.0 | 0.1 | 3 |
| 8 | SpotLight | 0.98 | 1.0 | 1.0 | 0.1 | 4 |
| 9 | MeshPhysicalMaterial | 0.98 | 1.0 | 1.0 | 0.1 | 15 |
| 10 | MeshStandardMaterial | 0.98 | 1.0 | 1.0 | 0.1 | 4 |
| 11 | PointsMaterial | 0.98 | 1.0 | 1.0 | 0.1 | 22 |
| 12 | ShaderMaterial | 0.98 | 1.0 | 1.0 | 0.1 | 2 |
| 13 | Color | 0.98 | 1.0 | 1.0 | 0.1 | 0 |
| 14 | Vector3 | 0.98 | 1.0 | 1.0 | 0.1 | 0 |
| 15 | InstancedMesh | 0.98 | 1.0 | 1.0 | 0.1 | 21 |
| 16 | Mesh | 0.98 | 1.0 | 1.0 | 0.1 | 18 |
| 17 | Points | 0.98 | 1.0 | 1.0 | 0.1 | 14 |
| 18 | Sprite | 0.98 | 1.0 | 1.0 | 0.1 | 6 |
| 19 | Scene | 0.98 | 1.0 | 1.0 | 0.1 | 563 |
| 20 | PostProcessing | 0.98 | 1.0 | 1.0 | 0.1 | 19 |

### Top 20 for Wall

| # | API | Priority | Prod | Learn | Blender | Examples |
|---|-----|----------|------|-------|---------|----------|
| 1 | TextureLoader | 0.98 | 1.0 | 1.0 | 0.1 | 1 |
| 2 | CubeTexture | 0.89 | 1.0 | 0.7 | 0.1 | 12 |
| 3 | DataTexture | 0.89 | 1.0 | 0.7 | 0.1 | 13 |
| 4 | DepthTexture | 0.89 | 1.0 | 0.7 | 0.1 | 13 |
| 5 | Texture | 0.89 | 1.0 | 0.7 | 0.1 | 13 |
| 6 | VideoTexture | 0.89 | 1.0 | 0.7 | 0.1 | 8 |
| 7 | CSS3DRenderer | 0.86 | 0.7 | 1.0 | 0.1 | 7 |
| 8 | Font | 0.78 | 0.8 | 0.6 | 0.1 | 0 |
| 9 | AudioContext | 0.77 | 0.7 | 0.7 | 0.1 | 4 |
| 10 | CanvasTexture | 0.77 | 0.7 | 0.7 | 0.1 | 13 |
| 11 | CompressedTexture | 0.77 | 0.7 | 0.7 | 0.1 | 13 |
| 12 | Data3DTexture | 0.77 | 0.7 | 0.7 | 0.1 | 7 |
| 13 | DataArrayTexture | 0.77 | 0.7 | 0.7 | 0.1 | 13 |
| 14 | FramebufferTexture | 0.77 | 0.7 | 0.7 | 0.1 | 13 |
| 15 | SVGLoader | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 16 | CSS2DObject | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 17 | CSS2DRenderer | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 18 | CSS3DObject | 0.77 | 0.7 | 0.7 | 0.1 | 7 |
| 19 | DotScreenPass | 0.71 | 0.7 | 0.5 | 0.1 | 0 |
| 20 | ColorConverter | 0.71 | 0.7 | 0.5 | 0.1 | 0 |

### Top 20 for Constellation

| # | API | Priority | Prod | Learn | Blender | Examples |
|---|-----|----------|------|-------|---------|----------|
| 1 | PerspectiveCamera | 0.98 | 1.0 | 1.0 | 0.1 | 559 |
| 2 | PlaneGeometry | 0.98 | 1.0 | 1.0 | 0.1 | 3 |
| 3 | PointsMaterial | 0.98 | 1.0 | 1.0 | 0.1 | 22 |
| 4 | Line | 0.98 | 1.0 | 1.0 | 0.1 | 17 |
| 5 | Points | 0.98 | 1.0 | 1.0 | 0.1 | 14 |
| 6 | Camera | 0.89 | 1.0 | 0.7 | 0.1 | 6 |
| 7 | OrthographicCamera | 0.89 | 1.0 | 0.7 | 0.1 | 2 |
| 8 | LineBasicMaterial | 0.89 | 1.0 | 0.7 | 0.1 | 22 |
| 9 | LineSegments | 0.89 | 1.0 | 0.7 | 0.1 | 8 |
| 10 | BufferGeometryUtils | 0.85 | 0.9 | 0.7 | 0.1 | 0 |
| 11 | ImprovedNoise | 0.81 | 0.8 | 0.7 | 0.1 | 0 |
| 12 | ArrayCamera | 0.77 | 0.7 | 0.7 | 0.1 | 2 |
| 13 | CubeCamera | 0.77 | 0.7 | 0.7 | 0.1 | 6 |
| 14 | StereoCamera | 0.77 | 0.7 | 0.7 | 0.1 | 6 |
| 15 | EdgesGeometry | 0.77 | 0.7 | 0.7 | 0.1 | 18 |
| 16 | WireframeGeometry | 0.77 | 0.7 | 0.7 | 0.1 | 18 |
| 17 | LineDashedMaterial | 0.77 | 0.7 | 0.7 | 0.1 | 22 |
| 18 | Line2 | 0.77 | 0.7 | 0.7 | 0.1 | 8 |
| 19 | LineGeometry | 0.77 | 0.7 | 0.7 | 0.1 | 8 |
| 20 | LineMaterial | 0.77 | 0.7 | 0.7 | 0.1 | 8 |

### Top 20 for Ritual

| # | API | Priority | Prod | Learn | Blender | Examples |
|---|-----|----------|------|-------|---------|----------|
| 1 | Raycaster | 0.98 | 1.0 | 1.0 | 0.1 | 16 |
| 2 | MeshStandardMaterial | 0.98 | 1.0 | 1.0 | 0.1 | 4 |
| 3 | OrbitControls | 0.98 | 1.0 | 1.0 | 0.1 | 1 |
| 4 | RectAreaLight | 0.89 | 1.0 | 0.7 | 0.1 | 2 |
| 5 | ArrayCamera | 0.77 | 0.7 | 0.7 | 0.1 | 2 |
| 6 | DataArrayTexture | 0.77 | 0.7 | 0.7 | 0.1 | 13 |
| 7 | WebXRManager | 0.77 | 0.7 | 0.7 | 0.1 | 19 |
| 8 | XRManager | 0.77 | 0.7 | 0.7 | 0.1 | 19 |
| 9 | ArcballControls | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 10 | DragControls | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 11 | FirstPersonControls | 0.77 | 0.7 | 0.7 | 0.1 | 8 |
| 12 | FlyControls | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 13 | MapControls | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 14 | PointerLockControls | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 15 | TrackballControls | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 16 | TransformControls | 0.77 | 0.7 | 0.7 | 0.1 | 2 |
| 17 | EXRLoader | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 18 | Lensflare | 0.77 | 0.7 | 0.7 | 0.1 | 3 |
| 19 | MarchingCubes | 0.77 | 0.7 | 0.7 | 0.1 | 1 |
| 20 | ARButton | 0.77 | 0.7 | 0.7 | 0.1 | 19 |

---

## MVI Stacks (High Prod, Low Blender)

APIs with production_ready ≥ 0.8 and blender_dep ≤ 0.3:

| API | Priority | Category | Projects |
|-----|----------|----------|----------|
| Audio | 0.98 | Audio | Pantheon |
| AudioListener | 0.98 | Audio | Pantheon |
| PerspectiveCamera | 0.98 | Cameras | Constellation |
| BufferGeometry | 0.98 | Core | Orbs |
| Object3D | 0.98 | Core | Orbs |
| Raycaster | 0.98 | Core | Ritual |
| BoxGeometry | 0.98 | Geometries | Orbs |
| PlaneGeometry | 0.98 | Geometries | Constellation |
| SphereGeometry | 0.98 | Geometries | Orbs |
| AmbientLight | 0.98 | Lights | Orbs |
| DirectionalLight | 0.98 | Lights | Orbs |
| PointLight | 0.98 | Lights | Orbs |
| SpotLight | 0.98 | Lights | Orbs |
| TextureLoader | 0.98 | Loaders | Wall |
| MeshPhysicalMaterial | 0.98 | Materials | Orbs |
| MeshStandardMaterial | 0.98 | Materials | Orbs|Ritual |
| PointsMaterial | 0.98 | Materials | Constellation|Orbs |
| ShaderMaterial | 0.98 | Materials | Orbs |
| Color | 0.98 | Math | Orbs |
| Vector3 | 0.98 | Math | Orbs |
| InstancedMesh | 0.98 | Objects | Orbs |
| Line | 0.98 | Objects | Constellation |
| Mesh | 0.98 | Objects | Orbs |
| Points | 0.98 | Objects | Constellation|Orbs |
| Sprite | 0.98 | Objects | Orbs |
| Scene | 0.98 | Scenes | Orbs |
| PostProcessing | 0.98 | Renderers | Orbs |
| WebGLRenderer | 0.98 | Renderers | Orbs |
| WebGPURenderer | 0.98 | Renderers | Orbs |
| OrbitControls | 0.98 | Controls | Ritual |

---

## Examples Index

Total: 563 official Three.js examples

### css2d (1 examples)

- **css2d_label** [intermediate] — Projects: Pantheon — APIs: CSS2DRenderer|Scene|PerspectiveCamera|CSS2DObject

### css3d (7 examples)

- **css3d_mixed** [intermediate] — Projects: Pantheon — APIs: CSS3DRenderer|Scene|PerspectiveCamera|CSS3DObject
- **css3d_molecules** [intermediate] — Projects: Pantheon — APIs: CSS3DRenderer|Scene|PerspectiveCamera|CSS3DObject
- **css3d_orthographic** [intermediate] — Projects: Pantheon — APIs: CSS3DRenderer|Scene|OrthographicCamera|CSS3DObject
- **css3d_periodictable** [intermediate] — Projects: Pantheon — APIs: CSS3DRenderer|Scene|PerspectiveCamera|CSS3DObject
- **css3d_sandbox** [intermediate] — Projects: Pantheon — APIs: CSS3DRenderer|Scene|PerspectiveCamera|CSS3DObject|GUI
- **css3d_sprites** [intermediate] — Projects: Pantheon|Orbs|Constellation — APIs: CSS3DRenderer|Scene|PerspectiveCamera|Sprite|CSS3DObject
- **css3d_youtube** [intermediate] — Projects: Pantheon — APIs: CSS3DRenderer|Scene|PerspectiveCamera|CSS3DObject

### games (1 examples)

- **games_fps** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Octree

### misc (21 examples)

- **misc_animation_groups** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **misc_animation_keys** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **misc_boxselection** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **misc_controls_arcball** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|ArcballControls
- **misc_controls_drag** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DragControls
- **misc_controls_fly** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|FlyControls
- **misc_controls_map** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MapControls
- **misc_controls_orbit** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|OrbitControls
- **misc_controls_pointerlock** [beginner] — Projects: Pantheon|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|PointerLockControls
- **misc_controls_trackball** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TrackballControls
- **misc_controls_transform** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TransformControls
- **misc_exporter_draco** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DRACOLoader|DRACOExporter
- **misc_exporter_exr** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession|EXRExporter
- **misc_exporter_gcode** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|GCodeExporter
- **misc_exporter_gltf** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader|GLTFExporter
- **misc_exporter_ktx2** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|KTX2Loader|KTX2Exporter
- **misc_exporter_obj** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|OBJExporter
- **misc_exporter_ply** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|PLYExporter
- **misc_exporter_stl** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|STLExporter
- **misc_exporter_usdz** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|USDZLoader|USDZExporter
- **misc_raycaster_helper** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Raycaster

### physics (13 examples)

- **physics_ammo_break** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AmmoPhysics
- **physics_ammo_cloth** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AmmoPhysics
- **physics_ammo_instancing** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh|AmmoPhysics
- **physics_ammo_rope** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AmmoPhysics
- **physics_ammo_terrain** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AmmoPhysics
- **physics_ammo_volume** [intermediate] — Projects: Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|AmmoPhysics|DataTexture3D
- **physics_jolt_instancing** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh|JoltPhysics
- **physics_rapier_basic** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|RapierPhysics
- **physics_rapier_character_controller** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|RapierPhysics
- **physics_rapier_instancing** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh|RapierPhysics
- **physics_rapier_joints** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|RapierPhysics
- **physics_rapier_terrain** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|RapierPhysics
- **physics_rapier_vehicle_controller** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|RapierPhysics

### svg (2 examples)

- **svg_lines** [intermediate] — Projects: Constellation — APIs: SVGRenderer|Scene|PerspectiveCamera|Line
- **svg_sandbox** [intermediate] — Projects: Pantheon — APIs: SVGRenderer|Scene|PerspectiveCamera|GUI

### tests (2 examples)

- **misc_uv_tests** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_furnace_test** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera

### webaudio (4 examples)

- **webaudio_orientation** [intermediate] — Projects: Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|AudioListener
- **webaudio_sandbox** [intermediate] — Projects: Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|AudioListener|GUI
- **webaudio_timing** [intermediate] — Projects: Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|AudioListener
- **webaudio_visualizer** [intermediate] — Projects: Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|AudioListener

### webgl (216 examples)

- **webgl_animation_keyframes** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **webgl_animation_multiple** [intermediate] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **webgl_animation_skinning_additive_blending** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **webgl_animation_skinning_blending** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **webgl_animation_skinning_ik** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **webgl_animation_skinning_morph** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **webgl_animation_walk** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **webgl_batch_lod_bvh** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|BatchedMesh|BVHLoader|LOD
- **webgl_camera** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_camera_array** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|ArrayCamera
- **webgl_camera_logarithmicdepthbuffer** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_clipping** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Plane
- **webgl_clipping_advanced** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Plane
- **webgl_clipping_intersection** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Plane
- **webgl_clipping_stencil** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Plane
- **webgl_decals** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DecalGeometry
- **webgl_depth_texture** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_effects_anaglyph** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_effects_ascii** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_effects_parallaxbarrier** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|ParallaxUV
- **webgl_effects_stereo** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_framebuffer_texture** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_geometries** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_geometry_colors** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_geometry_colors_lookuptable** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_geometry_convex** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_geometry_csg** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|CSG
- **webgl_geometry_cube** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_geometry_extrude_shapes** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_geometry_extrude_splines** [intermediate] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Line
- **webgl_geometry_minecraft** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|BoxGeometry
- **webgl_geometry_nurbs** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|NURBSSurface
- **webgl_geometry_shapes** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_geometry_spline_editor** [intermediate] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Line
- **webgl_geometry_teapot** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_geometry_terrain** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|PlaneGeometry
- **webgl_geometry_terrain_raycast** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Raycaster|PlaneGeometry
- **webgl_geometry_text** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_geometry_text_shapes** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_geometry_text_stroke** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_helpers** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_instancing_dynamic** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh
- **webgl_instancing_morph** [intermediate] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh
- **webgl_instancing_performance** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh
- **webgl_instancing_raycast** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh|Raycaster
- **webgl_instancing_scatter** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh
- **webgl_interactive_buffergeometry** [advanced] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry|Raycaster
- **webgl_interactive_cubes** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Raycaster
- **webgl_interactive_cubes_gpu** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Raycaster
- **webgl_interactive_cubes_ortho** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|OrthographicCamera|Raycaster
- **webgl_interactive_lines** [intermediate] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Line|Raycaster
- **webgl_interactive_points** [intermediate] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Points|Raycaster
- **webgl_interactive_raycasting_points** [intermediate] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Points|Raycaster
- **webgl_interactive_voxelpainter** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|VOXLoader|Raycaster
- **webgl_lensflares** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Lensflare
- **webgl_lightprobe** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|LightProbe
- **webgl_lightprobe_cubecamera** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|LightProbe
- **webgl_lights_hemisphere** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|HemisphereLight
- **webgl_lights_physical** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_lights_rectarealight** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|RectAreaLight
- **webgl_lights_spotlight** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|SpotLight
- **webgl_lights_spotlights** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|SpotLight
- **webgl_lines_colors** [beginner] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Line
- **webgl_lines_dashed** [intermediate] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Line
- **webgl_lines_fat** [intermediate] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Line
- **webgl_lines_fat_raycasting** [intermediate] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Line|Raycaster
- **webgl_lines_fat_wireframe** [intermediate] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Line
- **webgl_loader_3dm** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Rhino3dmLoader
- **webgl_loader_3ds** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TDSLoader
- **webgl_loader_3dtiles** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TilesLoader
- **webgl_loader_3mf** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|ThreeMFLoader
- **webgl_loader_3mf_materials** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|ThreeMFLoader
- **webgl_loader_amf** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AMFLoader
- **webgl_loader_bvh** [intermediate] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|BVHLoader
- **webgl_loader_collada** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|ColladaLoader
- **webgl_loader_collada_kinematics** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|ColladaLoader
- **webgl_loader_collada_skinning** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip|ColladaLoader
- **webgl_loader_draco** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DRACOLoader
- **webgl_loader_fbx** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|FBXLoader
- **webgl_loader_fbx_nurbs** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|FBXLoader|NURBSSurface
- **webgl_loader_gcode** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|GCodeLoader
- **webgl_loader_gltf** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader
- **webgl_loader_gltf_animation_pointer** [intermediate] — Projects: Pantheon|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip|GLTFLoader
- **webgl_loader_gltf_anisotropy** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader|MeshPhysicalMaterial
- **webgl_loader_gltf_avif** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader
- **webgl_loader_gltf_compressed** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader
- **webgl_loader_gltf_dispersion** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader
- **webgl_loader_gltf_instancing** [intermediate] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh|GLTFLoader
- **webgl_loader_gltf_iridescence** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader|MeshPhysicalMaterial
- **webgl_loader_gltf_progressive_lod** [intermediate] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader
- **webgl_loader_gltf_sheen** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader|MeshPhysicalMaterial
- **webgl_loader_gltf_transmission** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader|MeshPhysicalMaterial
- **webgl_loader_gltf_variants** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader
- **webgl_loader_ifc** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|IFCLoader
- **webgl_loader_imagebitmap** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_loader_kmz** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|KMZLoader
- **webgl_loader_ldraw** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|LDrawLoader
- **webgl_loader_lwo** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|LWOLoader
- **webgl_loader_md2** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MD2Loader
- **webgl_loader_md2_control** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MD2Loader
- **webgl_loader_mdd** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MDDLoader
- **webgl_loader_nrrd** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|NRRDLoader
- **webgl_loader_obj** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|OBJLoader
- **webgl_loader_pcd** [intermediate] — Projects: Pantheon|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|PCDLoader
- **webgl_loader_pdb** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|PDBLoader
- **webgl_loader_ply** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|PLYLoader
- **webgl_loader_stl** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|STLLoader
- **webgl_loader_svg** [intermediate] — Projects: Pantheon — APIs: SVGRenderer|Scene|PerspectiveCamera|SVGLoader
- **webgl_loader_texture_dds** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_loader_texture_exr** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|EXRLoader|XRSession|TextGeometry
- **webgl_loader_texture_hdr** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|RGBELoader|TextGeometry
- **webgl_loader_texture_ktx** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_loader_texture_ktx2** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|KTX2Loader|TextGeometry
- **webgl_loader_texture_lottie** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_loader_texture_pvrtc** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_loader_texture_tga** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_loader_texture_tiff** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_loader_texture_ultrahdr** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|RGBELoader|TextGeometry
- **webgl_loader_ttf** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TTFLoader
- **webgl_loader_usdz** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|USDZLoader
- **webgl_loader_vox** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|VOXLoader
- **webgl_loader_vrml** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|VRMLLoader
- **webgl_loader_vtk** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|VTKLoader
- **webgl_loader_xyz** [intermediate] — Projects: Pantheon|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|XYZLoader
- **webgl_lod** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|LOD
- **webgl_marchingcubes** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MarchingCubes
- **webgl_materials_alphahash** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_materials_blending** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_materials_blending_custom** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_materials_bumpmap** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MeshPhongMaterial
- **webgl_materials_car** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_materials_channels** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_materials_cubemap** [beginner] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgl_materials_cubemap_dynamic** [beginner] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgl_materials_cubemap_mipmaps** [beginner] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgl_materials_cubemap_refraction** [beginner] — Projects: Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader|Refractor
- **webgl_materials_cubemap_render_to_mipmaps** [beginner] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgl_materials_displacementmap** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MeshStandardMaterial
- **webgl_materials_envmaps** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgl_materials_envmaps_exr** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader|XRSession
- **webgl_materials_envmaps_fasthdr** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|RGBELoader|CubeTextureLoader
- **webgl_materials_envmaps_groundprojected** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgl_materials_envmaps_hdr** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|RGBELoader|CubeTextureLoader
- **webgl_materials_matcap** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|MeshMatcapMaterial
- **webgl_materials_normalmap** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MeshStandardMaterial
- **webgl_materials_normalmap_object_space** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MeshStandardMaterial
- **webgl_materials_physical_clearcoat** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|MeshPhysicalMaterial
- **webgl_materials_physical_transmission** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|MeshPhysicalMaterial
- **webgl_materials_physical_transmission_alpha** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|MeshPhysicalMaterial
- **webgl_materials_subsurface_scattering** [intermediate] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_materials_texture_anisotropy** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MeshPhysicalMaterial|TextGeometry
- **webgl_materials_texture_canvas** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_materials_texture_filters** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_materials_texture_manualmipmap** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_materials_texture_partialupdate** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_materials_texture_rotation** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_materials_toon** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MeshToonMaterial
- **webgl_materials_video** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|VideoTexture
- **webgl_materials_video_webcam** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|VideoTexture
- **webgl_materials_wireframe** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_math_obb** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|OBB
- **webgl_math_orientation_transform** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_mesh_batch** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|BatchedMesh
- **webgl_mirror** [intermediate] — Projects: Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|Reflector
- **webgl_modifier_curve** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|CurveModifier
- **webgl_modifier_curve_instanced** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh|CurveModifier
- **webgl_modifier_edgesplit** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|EdgeSplitModifier
- **webgl_modifier_simplifier** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|SimplifyModifier
- **webgl_modifier_subdivision** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|SubdivisionModifier
- **webgl_modifier_tessellation** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TessellateModifier
- **webgl_morphtargets** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MorphTarget
- **webgl_morphtargets_face** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MorphTarget
- **webgl_morphtargets_horse** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MorphTarget
- **webgl_morphtargets_sphere** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|MorphTarget
- **webgl_morphtargets_webcam** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|MorphTarget
- **webgl_multiple_elements** [intermediate] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_multiple_elements_text** [intermediate] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_multiple_scenes_comparison** [intermediate] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_multiple_views** [intermediate] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_panorama_cube** [beginner] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgl_panorama_equirectangular** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgl_pmrem_cubemap** [beginner] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader|PMREMGenerator
- **webgl_pmrem_equirectangular** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|PMREMGenerator
- **webgl_pmrem_test** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|PMREMGenerator
- **webgl_points_billboards** [intermediate] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Points
- **webgl_points_dynamic** [intermediate] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Points
- **webgl_points_sprites** [intermediate] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Points|Sprite
- **webgl_points_waves** [beginner] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Points
- **webgl_portal** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_random_uv** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_raycaster_bvh** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|BVHLoader|Raycaster
- **webgl_raycaster_sprite** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Sprite|Raycaster
- **webgl_raycaster_texture** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|Raycaster|TextGeometry
- **webgl_read_float_buffer** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_refraction** [intermediate] — Projects: Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|Refractor
- **webgl_renderer_pathtracer** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_rtt** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|WebGLRenderTarget
- **webgl_shader** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|ShaderMaterial
- **webgl_shader_lava** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|ShaderMaterial
- **webgl_shaders_ocean** [intermediate] — Projects: Orbs|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|Water
- **webgl_shaders_sky** [intermediate] — Projects: Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|Sky
- **webgl_shadow_contact** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgl_shadowmap** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgl_shadowmap_performance** [intermediate] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgl_shadowmap_pointlight** [intermediate] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|DirectionalLight|PointLight
- **webgl_shadowmap_viewer** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgl_shadowmap_vsm** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgl_shadowmesh** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgl_sprites** [intermediate] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Sprite
- **webgl_test_memory** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_test_memory2** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_test_wide_gamut** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_tonemapping** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|ToneMapping
- **webgl_video_kinect** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|VideoTexture
- **webgl_video_panorama_equirectangular** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader|VideoTexture
- **webgl_watch** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera

### webgl_advanced (48 examples)

- **webgl_buffergeometry** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry
- **webgl_buffergeometry_attributes_integer** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry
- **webgl_buffergeometry_attributes_none** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry
- **webgl_buffergeometry_custom_attributes_particles** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry
- **webgl_buffergeometry_drawrange** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry
- **webgl_buffergeometry_glbufferattribute** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry
- **webgl_buffergeometry_indexed** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry
- **webgl_buffergeometry_instancing** [expert] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh|BufferGeometry
- **webgl_buffergeometry_instancing_billboards** [expert] — Projects: Pantheon|Orbs|Wall|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh|BufferGeometry
- **webgl_buffergeometry_instancing_interleaved** [expert] — Projects: Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh|BufferGeometry
- **webgl_buffergeometry_lines** [expert] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry|Line
- **webgl_buffergeometry_lines_indexed** [expert] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry|Line
- **webgl_buffergeometry_points** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry|Points
- **webgl_buffergeometry_points_interleaved** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry|Points
- **webgl_buffergeometry_rawshader** [expert] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry|RawShaderMaterial
- **webgl_buffergeometry_selective_draw** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry
- **webgl_buffergeometry_uint** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|BufferGeometry
- **webgl_clipculldistance** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_custom_attributes** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_custom_attributes_lines** [expert] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Line
- **webgl_custom_attributes_points** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Points
- **webgl_custom_attributes_points2** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Points
- **webgl_custom_attributes_points3** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Points
- **webgl_gpgpu_birds** [expert] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|GPUComputationRenderer
- **webgl_gpgpu_birds_gltf** [expert] — Projects: Pantheon|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|GLTFLoader|GPUComputationRenderer
- **webgl_gpgpu_protoplanet** [expert] — Projects: Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|GPUComputationRenderer
- **webgl_gpgpu_water** [expert] — Projects: Orbs|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|Water|GPUComputationRenderer
- **webgl_materials_modified** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_multiple_rendertargets** [expert] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|WebGLRenderTarget
- **webgl_multisampled_renderbuffers** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_performance** [expert] — Projects: Pantheon|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_rendertarget_texture2darray** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|WebGLRenderTarget|TextGeometry
- **webgl_reversed_depth_buffer** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_shadowmap_csm** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgl_shadowmap_pcss** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgl_shadowmap_progressive** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgl_simple_gi** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera
- **webgl_texture2darray** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_texture2darray_compressed** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_texture2darray_layerupdate** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_texture3d** [expert] — Projects: Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_texture3d_partialupdate** [expert] — Projects: Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|TextGeometry
- **webgl_ubo** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|UniformsGroup
- **webgl_ubo_arrays** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|UniformsGroup
- **webgl_volume_cloud** [expert] — Projects: Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|DataTexture3D
- **webgl_volume_instancing** [expert] — Projects: Orbs|Wall — APIs: WebGLRenderer|Scene|PerspectiveCamera|InstancedMesh|DataTexture3D
- **webgl_volume_perlin** [expert] — Projects: Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|DataTexture3D
- **webgl_worker_offscreencanvas** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera

### webgl_postprocessing (26 examples)

- **webgl_postprocessing** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_3dlut** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_advanced** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_afterimage** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_backgrounds** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_dof** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|BokehPass
- **webgl_postprocessing_dof2** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|BokehPass
- **webgl_postprocessing_fxaa** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|FXAAShader
- **webgl_postprocessing_glitch** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_godrays** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|GodRaysEffect
- **webgl_postprocessing_gtao** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|GTAOPass
- **webgl_postprocessing_masking** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_outline** [intermediate] — Projects: Pantheon|Constellation|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|Line|EffectComposer|OutlinePass
- **webgl_postprocessing_pixel** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_procedural** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_rgb_halftone** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_sao** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_smaa** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|SMAAPass
- **webgl_postprocessing_sobel** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|SobelOperator
- **webgl_postprocessing_ssaa** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_ssao** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|SSAOPass
- **webgl_postprocessing_ssr** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|SSRPass
- **webgl_postprocessing_taa** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_transition** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer
- **webgl_postprocessing_unreal_bloom** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|UnrealBloomPass
- **webgl_postprocessing_unreal_bloom_selective** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGLRenderer|Scene|PerspectiveCamera|EffectComposer|UnrealBloomPass

### webgpu (196 examples)

- **webgpu_animation_retargeting** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **webgpu_animation_retargeting_readyplayer** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **webgpu_backdrop** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_backdrop_area** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_backdrop_water** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|Water
- **webgpu_camera** [beginner] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_camera_array** [beginner] — Projects: Pantheon — APIs: WebGPURenderer|Scene|ArrayCamera
- **webgpu_camera_logarithmicdepthbuffer** [beginner] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_caustics** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|CausticsEffect
- **webgpu_centroid_sampling** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_clearcoat** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|MeshPhysicalMaterial
- **webgpu_clipping** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|Plane
- **webgpu_compute_audio** [expert] — Projects: Constellation|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode
- **webgpu_compute_birds** [expert] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode
- **webgpu_compute_cloth** [expert] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode
- **webgpu_compute_geometry** [expert] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode
- **webgpu_compute_particles** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode
- **webgpu_compute_particles_fluid** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode
- **webgpu_compute_particles_rain** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode
- **webgpu_compute_particles_snow** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode
- **webgpu_compute_points** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|Points|ComputeNode
- **webgpu_compute_reduce** [expert] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode
- **webgpu_compute_sort_bitonic** [expert] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode
- **webgpu_compute_texture** [expert] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode|TextGeometry
- **webgpu_compute_texture_3d** [expert] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode|TextGeometry
- **webgpu_compute_texture_pingpong** [expert] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode|TextGeometry
- **webgpu_compute_water** [expert] — Projects: Orbs|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|Water|ComputeNode
- **webgpu_cubemap_adjustments** [beginner] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgpu_cubemap_dynamic** [beginner] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgpu_cubemap_mix** [beginner] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgpu_custom_fog** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_custom_fog_background** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_custom_fog_scattering** [intermediate] — Projects: Orbs|Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_depth_texture** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TextGeometry
- **webgpu_display_stereo** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_equirectangular** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_fog_height** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_hdr** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|RGBELoader
- **webgpu_instance_mesh** [intermediate] — Projects: Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera|InstancedMesh
- **webgpu_instance_path** [intermediate] — Projects: Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera|InstancedMesh
- **webgpu_instance_points** [intermediate] — Projects: Pantheon|Orbs|Wall|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|InstancedMesh|Points
- **webgpu_instance_sprites** [intermediate] — Projects: Pantheon|Orbs|Wall|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|InstancedMesh|Sprite
- **webgpu_instance_uniform** [intermediate] — Projects: Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera|InstancedMesh
- **webgpu_instancing_morph** [intermediate] — Projects: Pantheon|Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera|InstancedMesh
- **webgpu_layers** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_lensflares** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|Lensflare
- **webgpu_lightprobe** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|LightProbe
- **webgpu_lightprobe_cubecamera** [beginner] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|LightProbe
- **webgpu_lights_custom** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_lights_ies_spotlight** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|SpotLight
- **webgpu_lights_phong** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_lights_physical** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_lights_pointlights** [intermediate] — Projects: Pantheon|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|PointLight
- **webgpu_lights_projector** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_lights_rectarealight** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|RectAreaLight
- **webgpu_lights_selective** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_lights_spotlight** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|SpotLight
- **webgpu_lights_tiled** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_lines_fat** [intermediate] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|Line
- **webgpu_lines_fat_raycasting** [intermediate] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|Line|Raycaster
- **webgpu_lines_fat_wireframe** [intermediate] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|Line
- **webgpu_loader_gltf** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|GLTFLoader
- **webgpu_loader_gltf_anisotropy** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|GLTFLoader|MeshPhysicalMaterial
- **webgpu_loader_gltf_compressed** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|GLTFLoader
- **webgpu_loader_gltf_dispersion** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|GLTFLoader
- **webgpu_loader_gltf_iridescence** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|GLTFLoader|MeshPhysicalMaterial
- **webgpu_loader_gltf_sheen** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|GLTFLoader|MeshPhysicalMaterial
- **webgpu_loader_gltf_transmission** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|GLTFLoader|MeshPhysicalMaterial
- **webgpu_loader_materialx** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|MaterialXLoader
- **webgpu_loader_texture_ktx2** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|KTX2Loader|TextGeometry
- **webgpu_materials** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_materials_alphahash** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_materials_arrays** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_materials_basic** [beginner] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_materials_cubemap_mipmaps** [beginner] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgpu_materials_displacementmap** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|MeshStandardMaterial
- **webgpu_materials_envmaps** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgpu_materials_envmaps_bpcem** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|CubeTextureLoader
- **webgpu_materials_lightmap** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_materials_matcap** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|MeshMatcapMaterial
- **webgpu_materials_sss** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_materials_texture_manualmipmap** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TextGeometry
- **webgpu_materials_toon** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|MeshToonMaterial
- **webgpu_materials_transmission** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|MeshPhysicalMaterial
- **webgpu_materials_video** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|VideoTexture
- **webgpu_materialx_noise** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|MaterialXLoader
- **webgpu_mesh_batch** [intermediate] — Projects: Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera|BatchedMesh
- **webgpu_mirror** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|Reflector
- **webgpu_modifier_curve** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|CurveModifier
- **webgpu_morphtargets** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|MorphTarget
- **webgpu_morphtargets_face** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|MorphTarget
- **webgpu_mrt** [advanced] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_mrt_mask** [advanced] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_multiple_canvas** [intermediate] — Projects: Pantheon|Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_multiple_elements** [intermediate] — Projects: Pantheon|Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_multiple_rendertargets** [advanced] — Projects: Pantheon|Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera|WebGLRenderTarget
- **webgpu_multiple_rendertargets_readback** [advanced] — Projects: Pantheon|Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera|WebGLRenderTarget
- **webgpu_multisampled_renderbuffers** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_occlusion** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|OcclusionTest
- **webgpu_ocean** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|Water
- **webgpu_parallax_uv** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|ParallaxUV
- **webgpu_particles** [intermediate] — Projects: Pantheon|Orbs|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_performance** [intermediate] — Projects: Pantheon|Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_performance_renderbundle** [intermediate] — Projects: Pantheon|Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_pmrem_cubemap** [beginner] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|CubeTextureLoader|PMREMGenerator
- **webgpu_pmrem_equirectangular** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|PMREMGenerator
- **webgpu_pmrem_scene** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|PMREMGenerator
- **webgpu_pmrem_test** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|PMREMGenerator
- **webgpu_portal** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_postprocessing** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_3dlut** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_afterimage** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_anamorphic** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_ao** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_bloom** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|UnrealBloomPass
- **webgpu_postprocessing_bloom_emissive** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|UnrealBloomPass
- **webgpu_postprocessing_bloom_selective** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|UnrealBloomPass
- **webgpu_postprocessing_ca** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_difference** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_dof** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|BokehPass
- **webgpu_postprocessing_dof_basic** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|BokehPass
- **webgpu_postprocessing_fxaa** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|FXAAShader
- **webgpu_postprocessing_godrays** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|GodRaysEffect
- **webgpu_postprocessing_lensflare** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|Lensflare
- **webgpu_postprocessing_masking** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_motion_blur** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_outline** [intermediate] — Projects: Pantheon|Constellation|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|Line|EffectComposer|OutlinePass
- **webgpu_postprocessing_pixel** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_radial_blur** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_retro** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_smaa** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|SMAAPass
- **webgpu_postprocessing_sobel** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|SobelOperator
- **webgpu_postprocessing_ssaa** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_ssgi** [expert] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_ssr** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer|SSRPass
- **webgpu_postprocessing_sss** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_traa** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_postprocessing_transition** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|EffectComposer
- **webgpu_procedural_texture** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TextGeometry|ProceduralTexture
- **webgpu_reflection** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_reflection_blurred** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_reflection_roughness** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_refraction** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|Refractor
- **webgpu_rendertarget_2d-array_3d** [advanced] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|WebGLRenderTarget
- **webgpu_reversed_depth_buffer** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_rtt** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|WebGLRenderTarget
- **webgpu_sandbox** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|GUI
- **webgpu_shadertoy** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|ShaderToyNode
- **webgpu_shadow_contact** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgpu_shadowmap** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgpu_shadowmap_array** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgpu_shadowmap_csm** [expert] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgpu_shadowmap_opacity** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgpu_shadowmap_pointlight** [intermediate] — Projects: Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|DirectionalLight|PointLight
- **webgpu_shadowmap_progressive** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgpu_shadowmap_vsm** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|DirectionalLight
- **webgpu_skinning** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip
- **webgpu_skinning_instancing** [intermediate] — Projects: Pantheon|Wall — APIs: WebGPURenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip|InstancedMesh
- **webgpu_skinning_points** [intermediate] — Projects: Pantheon|Orbs|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|AnimationMixer|AnimationClip|Points
- **webgpu_sky** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|Sky
- **webgpu_sprites** [intermediate] — Projects: Pantheon|Orbs|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|Sprite
- **webgpu_storage_buffer** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|StorageBufferNode
- **webgpu_struct_drawindirect** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_test_memory** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera
- **webgpu_texturegrad** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TextGeometry
- **webgpu_textures_2d-array** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TextGeometry
- **webgpu_textures_2d-array_compressed** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TextGeometry
- **webgpu_textures_anisotropy** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|MeshPhysicalMaterial|TextGeometry
- **webgpu_textures_partialupdate** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TextGeometry
- **webgpu_tonemapping** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|ToneMapping
- **webgpu_tsl_angular_slicing** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_compute_attractors_particles** [expert] — Projects: Pantheon|Orbs|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|ComputeNode|TSL
- **webgpu_tsl_earth** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_editor** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_galaxy** [intermediate] — Projects: Pantheon|Constellation — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_halftone** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_interoperability** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_procedural_terrain** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL|PlaneGeometry
- **webgpu_tsl_raging_sea** [expert] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_transpiler** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_vfx_flames** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_vfx_linkedparticles** [intermediate] — Projects: Pantheon|Orbs|Constellation|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_vfx_tornado** [intermediate] — Projects: Pantheon|Ritual — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_tsl_wood** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|TSL
- **webgpu_video_frame** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|VideoTexture
- **webgpu_video_panorama** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|CubeTextureLoader|VideoTexture
- **webgpu_volume_caustics** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|DataTexture3D|CausticsEffect
- **webgpu_volume_cloud** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|DataTexture3D
- **webgpu_volume_lighting** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|DataTexture3D
- **webgpu_volume_lighting_rectarea** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|DataTexture3D
- **webgpu_volume_lighting_traa** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|DataTexture3D
- **webgpu_volume_perlin** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|DataTexture3D
- **webgpu_water** [intermediate] — Projects: Orbs — APIs: WebGPURenderer|Scene|PerspectiveCamera|Water
- **webgpu_xr_cubes** [beginner] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|XRSession
- **webgpu_xr_native_layers** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|XRSession
- **webgpu_xr_rollercoaster** [intermediate] — Projects: Pantheon — APIs: WebGPURenderer|Scene|PerspectiveCamera|XRSession

### webxr (26 examples)

- **webxr_ar_camera_access** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_ar_cones** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_ar_hittest** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_ar_lighting** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_ar_plane_detection** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_vr_handinput** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_vr_handinput_cubes** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_vr_handinput_pointerclick** [intermediate] — Projects: Pantheon|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_vr_handinput_pointerdrag** [intermediate] — Projects: Pantheon|Constellation — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_vr_handinput_pressbutton** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_vr_handinput_profiles** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_vr_layers** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_vr_panorama** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader|XRSession
- **webxr_vr_panorama_depth** [intermediate] — Projects: Pantheon|Orbs — APIs: WebGLRenderer|Scene|PerspectiveCamera|CubeTextureLoader|XRSession
- **webxr_vr_rollercoaster** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_vr_sandbox** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession|GUI
- **webxr_vr_teleport** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_vr_video** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession|VideoTexture
- **webxr_xr_ballshooter** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_xr_controls_transform** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|TransformControls|XRSession
- **webxr_xr_cubes** [beginner] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_xr_dragging** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_xr_dragging_custom_depth** [expert] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_xr_haptics** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_xr_paint** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
- **webxr_xr_sculpt** [intermediate] — Projects: Pantheon — APIs: WebGLRenderer|Scene|PerspectiveCamera|XRSession
