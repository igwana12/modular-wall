# Sacred Circuits Knowledge Pack — RAG Reference

Unified knowledge base for Three.js, JavaScript libraries, Web Audio,
and native audio frameworks — scored and tagged for Sacred Circuits projects.

## Overview

- **Total entries**: 1331
- **Three.js examples**: 563
- **API→Example mappings**: 2295

### Sources

| Source | Entries |
|--------|---------|
| threejs-docs | 556 |
| awesome-js | 299 |
| libhunt-js | 163 |
| native-audio | 110 |
| threejs-tools | 102 |
| web-audio | 101 |

## Projects

| Tag | Project | Focus |
|-----|---------|-------|
| Pantheon | 21-Deity System | Audio, speech, GLTF characters, morph targets, CSS3D overlays |
| Orbs | Spirit Sphere | GPU particles, sacred glow, post-processing, shaders |
| Wall | mosAIc Installations | CSS2D/3D hybrid, DOM-3D mixing, large displays |
| Constellation | Celestial Characters | Wireframe, edges, lines, star fields, points |
| Ritual | Spatial Interactions | WebXR, raycasting, controls, spatial audio |

## Scoring

- **production_ready** (0-1): Stability, docs quality, years in production
- **learning_value** (0-1): Tutorial availability, example clarity
- **blender_dep** (0-1): 0=pure code, 1=needs complex Blender assets
- **sacred_circuits_relevance** (0-1): Direct relevance to our projects
- **priority_score** = (prod×0.4) + (learn×0.3) + ((1-blender)×0.2) + 0.1

---

## Three.js APIs (Core + Addons) (556 entries)

### Addons

#### OrbitControls

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/controls/OrbitControls
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Ritual
- **Related**: MapControls|TrackballControls|Camera
- **Examples**: misc_controls_orbit

#### EffectComposer

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/EffectComposer
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: RenderPass|ShaderPass|PostProcessing
- **Examples**: webgl_postprocessing | webgl_postprocessing_3dlut | webgl_postprocessing_advanced | webgl_postprocessing_afterimage | webgl_postprocessing_backgrounds

#### UnrealBloomPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/UnrealBloomPass
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: EffectComposer|RenderPass|BloomNode
- **Examples**: webgl_postprocessing_unreal_bloom | webgl_postprocessing_unreal_bloom_selective | webgpu_postprocessing_bloom | webgpu_postprocessing_bloom_emissive | webgpu_postprocessing_bloom_selective

#### RenderPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/RenderPass
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### SSAOPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/SSAOPass
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Examples**: webgl_postprocessing_ssao

#### FXAAPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/FXAAPass
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### CSS3DRenderer

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/renderers/CSS3DRenderer
- **Scores**: prod=0.7 | learn=1.0 | blender=0.1 | priority=0.86
- **Projects**: Wall
- **Related**: CSS3DObject|CSS2DRenderer|WebGLRenderer
- **Examples**: css3d_mixed | css3d_molecules | css3d_orthographic | css3d_periodictable | css3d_sandbox

#### BloomNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/BloomNode
- **Scores**: prod=0.7 | learn=1.0 | blender=0.1 | priority=0.86
- **Projects**: Orbs
- **Related**: PostProcessing|UnrealBloomPass|GaussianBlurNode

#### BufferGeometryUtils

- Merge/optimize/transform BufferGeometry instances
- **URL**: https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils
- **Scores**: prod=0.9 | learn=0.7 | blender=0.1 | priority=0.85
- **Projects**: Pantheon|Orbs|Constellation

#### GLTFLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/GLTFLoader
- **Scores**: prod=1.0 | learn=1.0 | blender=0.8 | priority=0.84
- **Projects**: Pantheon
- **Related**: DRACOLoader|KTX2Loader|GLTFExporter
- **Examples**: webgl_loader_gltf | webgl_loader_gltf_animation_pointer | webgl_loader_gltf_progressive_lod | webgl_loader_gltf_avif | webgl_loader_gltf_compressed

#### ImprovedNoise

- Improved Perlin noise implementation
- **URL**: https://threejs.org/docs/#examples/en/math/ImprovedNoise
- **Scores**: prod=0.8 | learn=0.7 | blender=0.1 | priority=0.81
- **Projects**: Orbs|Constellation

#### WebGL

- WebGL feature detection and capability checking
- **URL**: https://threejs.org/docs/#examples/en/capabilities/WebGL
- **Scores**: prod=0.8 | learn=0.6 | blender=0.1 | priority=0.78
- **Projects**: Orbs

#### Font

- Font data class for TextGeometry
- **URL**: https://threejs.org/docs/#examples/en/loaders/Font
- **Scores**: prod=0.8 | learn=0.6 | blender=0.1 | priority=0.78
- **Projects**: Wall|Pantheon

#### ArcballControls

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/controls/ArcballControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Examples**: misc_controls_arcball

#### DragControls

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/controls/DragControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Examples**: misc_controls_drag

#### FirstPersonControls

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/controls/FirstPersonControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual

#### FlyControls

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/controls/FlyControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Examples**: misc_controls_fly

#### MapControls

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/controls/MapControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Examples**: misc_controls_map

#### PointerLockControls

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/controls/PointerLockControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Examples**: misc_controls_pointerlock

#### TrackballControls

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/controls/TrackballControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Examples**: misc_controls_trackball

#### TransformControls

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/controls/TransformControls
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Examples**: webxr_xr_controls_transform | misc_controls_transform

#### RoundedBoxGeometry

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/geometries/RoundedBoxGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### Line2

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lines/Line2
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation
- **Related**: LineMaterial|LineGeometry|LineSegments2

#### LineGeometry

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lines/LineGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation

#### LineMaterial

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lines/LineMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation|Orbs

#### Wireframe

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lines/Wireframe
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation
- **Related**: WireframeGeometry2|EdgesGeometry|LineSegments

#### SVGLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/SVGLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Examples**: webgl_loader_svg

#### KTX2Loader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/KTX2Loader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: webgl_loader_texture_ktx2 | webgpu_loader_texture_ktx2 | misc_exporter_ktx2

#### EXRLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/EXRLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Examples**: webgl_loader_texture_exr

#### HDRLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/HDRLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### GPUComputationRenderer

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/misc/GPUComputationRenderer
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: webgl_gpgpu_birds | webgl_gpgpu_birds_gltf | webgl_gpgpu_water | webgl_gpgpu_protoplanet

#### Lensflare

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/Lensflare
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Examples**: webgl_lensflares | webgpu_lensflares | webgpu_postprocessing_lensflare

#### MarchingCubes

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/MarchingCubes
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual
- **Examples**: webgl_marchingcubes

#### Reflector

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/Reflector
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Related**: Refractor|Water|Mesh
- **Examples**: webgl_mirror | webgpu_mirror

#### Sky

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/Sky
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Related**: SkyMesh|ShaderMaterial|DirectionalLight
- **Examples**: webgl_shaders_sky | webgpu_sky

#### SkyMesh

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/SkyMesh
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### Water

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/Water
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Related**: WaterMesh|Reflector|ShaderMaterial
- **Examples**: webgl_shaders_ocean | webgl_gpgpu_water | webgpu_backdrop_water | webgpu_compute_water | webgpu_ocean

#### WaterMesh

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/WaterMesh
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### AmmoPhysics

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/physics/AmmoPhysics
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: physics_ammo_break | physics_ammo_cloth | physics_ammo_instancing | physics_ammo_rope | physics_ammo_terrain

#### JoltPhysics

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/physics/JoltPhysics
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: physics_jolt_instancing

#### RapierPhysics

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/physics/RapierPhysics
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: physics_rapier_basic | physics_rapier_instancing | physics_rapier_joints | physics_rapier_character_controller | physics_rapier_vehicle_controller

#### ShaderPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/ShaderPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### SMAAPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/SMAAPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: webgl_postprocessing_smaa | webgpu_postprocessing_smaa

#### GTAOPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/GTAOPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: webgl_postprocessing_gtao

#### BokehPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/BokehPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: webgl_postprocessing_dof | webgl_postprocessing_dof2 | webgpu_postprocessing_dof | webgpu_postprocessing_dof_basic

#### OutlinePass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/OutlinePass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation|Orbs
- **Examples**: webgl_postprocessing_outline | webgpu_postprocessing_outline

#### SSRPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/SSRPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: webgl_postprocessing_ssr | webgpu_postprocessing_ssr

#### OutputPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/OutputPass
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### CSS2DObject

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/renderers/CSS2DObject
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Examples**: css2d_label

#### CSS2DRenderer

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/renderers/CSS2DRenderer
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Related**: CSS2DObject|CSS3DRenderer|WebGLRenderer
- **Examples**: css2d_label

#### CSS3DObject

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/renderers/CSS3DObject
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall
- **Examples**: css3d_mixed | css3d_molecules | css3d_orthographic | css3d_periodictable | css3d_sandbox

#### FXAANode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/FXAANode
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### GTAONode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/GTAONode
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### GaussianBlurNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/GaussianBlurNode
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### SSRNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/SSRNode
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### ARButton

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/webxr/ARButton
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual

#### VRButton

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/webxr/VRButton
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual

#### XRButton

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/webxr/XRButton
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual

#### DRACOLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/DRACOLoader
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Orbs
- **Examples**: webgl_loader_draco | misc_exporter_draco

#### FBXLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/FBXLoader
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Pantheon
- **Related**: GLTFLoader|OBJLoader|AnimationMixer
- **Examples**: webgl_loader_fbx | webgl_loader_fbx_nurbs

#### RenderTransitionPass

- Transition effect between two scenes
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/RenderTransitionPass
- **Scores**: prod=0.7 | learn=0.6 | blender=0.1 | priority=0.74
- **Projects**: Pantheon|Orbs

#### WebGPU

- WebGPU feature detection and capability checking
- **URL**: https://threejs.org/docs/#examples/en/capabilities/WebGPU
- **Scores**: prod=0.7 | learn=0.6 | blender=0.1 | priority=0.74
- **Projects**: Orbs

#### LightProbeHelper

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/helpers/LightProbeHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation

#### RectAreaLightHelper

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/helpers/RectAreaLightHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation|Ritual

#### SSGINode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/SSGINode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs

#### SSSNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/SSSNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs

#### DepthOfFieldNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/DepthOfFieldNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs

#### GodraysNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/GodraysNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs

#### AfterImageNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/AfterImageNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs

#### AnamorphicNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/AnamorphicNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs|Pantheon

#### ChromaticAberrationNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/ChromaticAberrationNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs

#### LensflareNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/LensflareNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Ritual

#### OutlineNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/OutlineNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation

#### SobelOperatorNode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/SobelOperatorNode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs

#### TRAANode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/TRAANode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs

#### SMAANode

- Three.js Shader Language node
- **URL**: https://threejs.org/docs/#examples/en/tsl/SMAANode
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Orbs

#### DotScreenPass

- Halftone dot screen effect
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/DotScreenPass
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Orbs|Wall

#### MaskPass

- Applies stencil mask from a scene
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/MaskPass
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Orbs

#### FullScreenQuad

- Helper for rendering full-screen quads in passes
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/FullScreenQuad
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Orbs

#### AnimationPathHelper

- Visualizes animation motion paths
- **URL**: https://threejs.org/docs/#examples/en/helpers/AnimationPathHelper
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Pantheon|Constellation

#### Capsule

- Capsule primitive for collision testing
- **URL**: https://threejs.org/docs/#examples/en/math/Capsule
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Ritual

#### ColorConverter

- Converts between color spaces (HSL/HSV/RGB)
- **URL**: https://threejs.org/docs/#examples/en/math/ColorConverter
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Orbs|Wall

#### LensflareMesh

- Mesh-based lens flare with node material
- **URL**: https://threejs.org/docs/#examples/en/objects/LensflareMesh
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Orbs

#### XRPlanes

- Detects and visualizes real-world planes in AR
- **URL**: https://threejs.org/docs/#examples/en/webxr/XRPlanes
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Ritual

#### SceneUtils

- Utility functions for scene manipulation
- **URL**: https://threejs.org/docs/#examples/en/utils/SceneUtils
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Pantheon|Orbs

#### GeometryUtils

- Geometry utility functions for hilbert curves etc
- **URL**: https://threejs.org/docs/#examples/en/utils/GeometryUtils
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Constellation

#### CameraUtils

- Camera frame and projection utilities
- **URL**: https://threejs.org/docs/#examples/en/utils/CameraUtils
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Wall

#### BoxLineGeometry

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/geometries/BoxLineGeometry
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Constellation

#### ConvexGeometry

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/geometries/ConvexGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Orbs

#### TextGeometry

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/geometries/TextGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Wall
- **Related**: FontLoader|ExtrudeGeometry|Font
- **Examples**: webgl_depth_texture | webgl_framebuffer_texture | webgl_geometry_text | webgl_geometry_text_shapes | webgl_geometry_text_stroke

#### LightProbeGenerator

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lights/LightProbeGenerator
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### RectAreaLightTexturesLib

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lights/RectAreaLightTexturesLib
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Ritual|Wall

#### RectAreaLightUniformsLib

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lights/RectAreaLightUniformsLib
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Ritual

#### LineSegments2

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lines/LineSegments2
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Constellation

#### LineSegmentsGeometry

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lines/LineSegmentsGeometry
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Constellation

#### WireframeGeometry2

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lines/WireframeGeometry2
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Constellation

#### FontLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/FontLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Wall

#### LottieLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/LottieLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### TTFLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/TTFLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Examples**: webgl_loader_ttf

#### MaterialXLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/MaterialXLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Examples**: webgpu_loader_materialx | webgpu_materialx_noise

#### NRRDLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/NRRDLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Examples**: webgl_loader_nrrd

#### VTKLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/VTKLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Examples**: webgl_loader_vtk

#### XYZLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/XYZLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Examples**: webgl_loader_xyz

#### Volume

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/misc/Volume
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### VolumeSlice

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/misc/VolumeSlice
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### Refractor

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/Refractor
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs
- **Examples**: webgl_materials_cubemap_refraction | webgl_refraction | webgpu_refraction

#### ShadowMesh

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/ShadowMesh
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### SAOPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/SAOPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### AfterimagePass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/AfterimagePass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### BloomPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/BloomPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### FilmPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/FilmPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### GlitchPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/GlitchPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### HalftonePass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/HalftonePass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### LUTPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/LUTPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### Pass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/Pass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### RenderPixelatedPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/RenderPixelatedPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### SSAARenderPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/SSAARenderPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs|Ritual

#### TAARenderPass

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/TAARenderPass
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs|Ritual

#### CSS3DSprite

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/renderers/CSS3DSprite
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs|Wall

#### SVGRenderer

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/renderers/SVGRenderer
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Wall
- **Examples**: webgl_loader_svg | svg_lines | svg_sandbox

#### XREstimatedLight

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/webxr/XREstimatedLight
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Ritual

#### ShadowMapViewer

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/utils/ShadowMapViewer
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### FlakesTexture

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/textures/FlakesTexture
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs|Wall

#### TiledLighting

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/lighting/TiledLighting
- **Scores**: prod=0.5 | learn=0.7 | blender=0.1 | priority=0.69
- **Projects**: Orbs

#### GroundedSkybox

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/GroundedSkybox
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### ClearPass

- Clears the render target
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/ClearPass
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### ClearMaskPass

- Clears the stencil mask
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/ClearMaskPass
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### SavePass

- Saves current render to a texture for later use
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/SavePass
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### TexturePass

- Renders a texture as a full-screen pass
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/TexturePass
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### CubeTexturePass

- Renders a cube map as background
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/CubeTexturePass
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### ParametricFunctions

- Collection of parametric surface functions
- **URL**: https://threejs.org/docs/#examples/en/geometries/ParametricFunctions
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Constellation

#### TextureHelper

- Visualizes a texture on a debug quad
- **URL**: https://threejs.org/docs/#examples/en/helpers/TextureHelper
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs

#### OctreeHelper

- Visualizes octree spatial subdivision
- **URL**: https://threejs.org/docs/#examples/en/helpers/OctreeHelper
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Ritual

#### HeartCurve

- Heart-shaped parametric curve
- **URL**: https://threejs.org/docs/#examples/en/curves/HeartCurve
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation

#### HelixCurve

- Helical spiral parametric curve
- **URL**: https://threejs.org/docs/#examples/en/curves/HelixCurve
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation|Orbs

#### Text2D

- 2D text label for XR interfaces
- **URL**: https://threejs.org/docs/#examples/en/webxr/Text2D
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Ritual|Wall

#### TubePainter

- Real-time tube painting in 3D (VR drawing)
- **URL**: https://threejs.org/docs/#examples/en/misc/TubePainter
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Ritual|Constellation

#### WoodNodeMaterial

- Procedural wood grain node material
- **URL**: https://threejs.org/docs/#examples/en/materials/WoodNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Pantheon

#### PixelationNode

- Node-based pixelation effect for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/PixelationNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Wall

#### FilmNode

- Node-based film grain effect for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/FilmNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs

#### DotScreenNode

- Node-based dot screen halftone for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/DotScreenNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Wall

#### RGBShiftNode

- Node-based RGB channel shift for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/RGBShiftNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs

#### Lut3DNode

- 3D color lookup table for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/Lut3DNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs

#### TransitionNode

- Scene transition effect for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/TransitionNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon|Orbs

#### RetroPassNode

- Retro CRT/console visual effect for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/RetroPassNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Wall

#### ToonOutlinePassNode

- Toon outline rendering pass for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/ToonOutlinePassNode
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation|Pantheon

#### HDRCubeTextureLoader

- Loads HDR cube map textures for environment lighting
- **URL**: https://threejs.org/docs/#examples/en/loaders/HDRCubeTextureLoader
- **Scores**: prod=0.7 | learn=0.5 | blender=0.4 | priority=0.65
- **Projects**: Orbs|Pantheon

#### XRControllerModel

- 3D model representing an XR controller
- **URL**: https://threejs.org/docs/#examples/en/webxr/XRControllerModel
- **Scores**: prod=0.7 | learn=0.5 | blender=0.4 | priority=0.65
- **Projects**: Ritual

#### XRHandModel

- 3D hand model from XR hand tracking data
- **URL**: https://threejs.org/docs/#examples/en/webxr/XRHandModel
- **Scores**: prod=0.7 | learn=0.5 | blender=0.4 | priority=0.65
- **Projects**: Ritual

#### XRHandMeshModel

- Mesh-based hand model from tracking
- **URL**: https://threejs.org/docs/#examples/en/webxr/XRHandMeshModel
- **Scores**: prod=0.7 | learn=0.5 | blender=0.4 | priority=0.65
- **Projects**: Ritual

#### CSMHelper

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/csm/CSMHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### PositionalAudioHelper

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/helpers/PositionalAudioHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Pantheon

#### VertexNormalsHelper

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/helpers/VertexNormalsHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### VertexTangentsHelper

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/helpers/VertexTangentsHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Wall

#### ViewHelper

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/helpers/ViewHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### SelectionHelper

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/interactive/SelectionHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Ritual

#### GCodeLoader

- Loads G-code CNC/3D printer files as line geometry
- **URL**: https://threejs.org/docs/#examples/en/loaders/GCodeLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation
- **Examples**: webgl_loader_gcode

#### KTXLoader

- Loads KTX compressed texture format
- **URL**: https://threejs.org/docs/#examples/en/loaders/KTXLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### UltraHDRLoader

- Loads Ultra HDR gain map images
- **URL**: https://threejs.org/docs/#examples/en/loaders/UltraHDRLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### LUT3dlLoader

- Loads 3DL color lookup table files
- **URL**: https://threejs.org/docs/#examples/en/loaders/LUT3dlLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### LUTCubeLoader

- Loads .cube color lookup table files
- **URL**: https://threejs.org/docs/#examples/en/loaders/LUTCubeLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### LUTImageLoader

- Loads color LUT from image files
- **URL**: https://threejs.org/docs/#examples/en/loaders/LUTImageLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### ColorEnvironment

- Solid color environment map
- **URL**: https://threejs.org/docs/#examples/en/environments/ColorEnvironment
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### RapierHelper

- Debug visualization for Rapier physics bodies
- **URL**: https://threejs.org/docs/#examples/en/helpers/RapierHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Ritual

#### ColorSpaces

- Extended color space conversion utilities
- **URL**: https://threejs.org/docs/#examples/en/math/ColorSpaces
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### ReflectorForSSRPass

- Reflector optimized for screen-space reflections pass
- **URL**: https://threejs.org/docs/#examples/en/objects/ReflectorForSSRPass
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### GrannyKnot

- Granny knot parametric curve
- **URL**: https://threejs.org/docs/#examples/en/curves/GrannyKnot
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### KnotCurve

- Decorative knot parametric curve
- **URL**: https://threejs.org/docs/#examples/en/curves/KnotCurve
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### TrefoilKnot

- Trefoil knot parametric curve
- **URL**: https://threejs.org/docs/#examples/en/curves/TrefoilKnot
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### TorusKnot

- Torus knot parametric curve
- **URL**: https://threejs.org/docs/#examples/en/curves/TorusKnot
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Orbs

#### CinquefoilKnot

- Cinquefoil knot parametric curve
- **URL**: https://threejs.org/docs/#examples/en/curves/CinquefoilKnot
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### VivianiCurve

- Viviani curve (sphere-cylinder intersection)
- **URL**: https://threejs.org/docs/#examples/en/curves/VivianiCurve
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### XRHandPrimitiveModel

- Simple primitive hand model (spheres/boxes)
- **URL**: https://threejs.org/docs/#examples/en/webxr/XRHandPrimitiveModel
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Ritual

#### OculusHandPointerModel

- Pointer ray model for Quest hand tracking
- **URL**: https://threejs.org/docs/#examples/en/webxr/OculusHandPointerModel
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Ritual

#### Gyroscope

- Object that maintains world orientation regardless of parent
- **URL**: https://threejs.org/docs/#examples/en/misc/Gyroscope
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Ritual

#### DenoiseNode

- Denoising filter for ray-traced effects
- **URL**: https://threejs.org/docs/#examples/en/tsl/DenoiseNode
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### BilateralBlurNode

- Edge-preserving bilateral blur for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/BilateralBlurNode
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### SSAAPassNode

- Super-sampling AA pass for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/SSAAPassNode
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### PixelationPassNode

- Full pixelation render pass for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/PixelationPassNode
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs|Wall

#### TiledLightsNode

- Tiled lighting node for efficient multi-light
- **URL**: https://threejs.org/docs/#examples/en/tsl/TiledLightsNode
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Pantheon|Orbs

#### GeometryCompressionUtils

- Compresses geometry data for reduced memory
- **URL**: https://threejs.org/docs/#examples/en/utils/GeometryCompressionUtils
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs|Constellation

#### DecalGeometry

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/geometries/DecalGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.8 | priority=0.63
- **Projects**: Orbs
- **Examples**: webgl_decals

#### OBJLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/OBJLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.8 | priority=0.63
- **Projects**: Orbs
- **Examples**: webgl_loader_obj

#### STLLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/STLLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.8 | priority=0.63
- **Projects**: Orbs
- **Examples**: webgl_loader_stl

#### PLYLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/PLYLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.8 | priority=0.63
- **Projects**: Orbs
- **Examples**: webgl_loader_ply

#### ColladaLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/ColladaLoader
- **Scores**: prod=0.7 | learn=0.7 | blender=0.8 | priority=0.63
- **Projects**: Orbs
- **Examples**: webgl_loader_collada | webgl_loader_collada_kinematics | webgl_loader_collada_skinning

#### MTLLoader

- Loads MTL material files for OBJ models
- **URL**: https://threejs.org/docs/#examples/en/loaders/MTLLoader
- **Scores**: prod=0.8 | learn=0.5 | blender=0.7 | priority=0.63
- **Projects**: Pantheon

#### IESLoader

- Loads IES photometric light profile data
- **URL**: https://threejs.org/docs/#examples/en/loaders/IESLoader
- **Scores**: prod=0.7 | learn=0.4 | blender=0.4 | priority=0.62
- **Projects**: Pantheon

#### SkeletonUtils

- Skeleton retargeting and manipulation utilities
- **URL**: https://threejs.org/docs/#examples/en/utils/SkeletonUtils
- **Scores**: prod=0.8 | learn=0.6 | blender=0.9 | priority=0.62
- **Projects**: Pantheon

#### ParametricGeometry

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/geometries/ParametricGeometry
- **Scores**: prod=0.5 | learn=0.7 | blender=0.5 | priority=0.61
- **Projects**: Ritual

#### TeapotGeometry

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/geometries/TeapotGeometry
- **Scores**: prod=0.5 | learn=0.7 | blender=0.5 | priority=0.61
- **Projects**: Orbs

#### VOXLoader

- Loads MagicaVoxel VOX voxel models
- **URL**: https://threejs.org/docs/#examples/en/loaders/VOXLoader
- **Scores**: prod=0.6 | learn=0.5 | blender=0.4 | priority=0.61
- **Projects**: Orbs|Constellation
- **Examples**: webgl_interactive_voxelpainter | webgl_loader_vox

#### CSMFrustum

- Frustum calculation for cascaded shadow splits
- **URL**: https://threejs.org/docs/#examples/en/csm/CSMFrustum
- **Scores**: prod=0.6 | learn=0.3 | blender=0.1 | priority=0.61
- **Projects**: Pantheon

#### TrefoilPolynomialKnot

- Polynomial trefoil knot curve
- **URL**: https://threejs.org/docs/#examples/en/curves/TrefoilPolynomialKnot
- **Scores**: prod=0.6 | learn=0.3 | blender=0.1 | priority=0.61
- **Projects**: Constellation

#### FigureEightPolynomialKnot

- Figure-eight polynomial knot curve
- **URL**: https://threejs.org/docs/#examples/en/curves/FigureEightPolynomialKnot
- **Scores**: prod=0.6 | learn=0.3 | blender=0.1 | priority=0.61
- **Projects**: Constellation

#### ProgressiveLightMap

- Progressive lightmap baking in real-time
- **URL**: https://threejs.org/docs/#examples/en/misc/ProgressiveLightMap
- **Scores**: prod=0.6 | learn=0.5 | blender=0.4 | priority=0.61
- **Projects**: Orbs|Pantheon

#### ConvexObjectBreaker

- Breaks convex objects into pieces for destruction effects
- **URL**: https://threejs.org/docs/#examples/en/misc/ConvexObjectBreaker
- **Scores**: prod=0.6 | learn=0.5 | blender=0.4 | priority=0.61
- **Projects**: Ritual

#### UVsDebug

- UV coordinate visualization for debugging
- **URL**: https://threejs.org/docs/#examples/en/utils/UVsDebug
- **Scores**: prod=0.6 | learn=0.5 | blender=0.4 | priority=0.61
- **Projects**: Pantheon|Orbs

#### SortUtils

- Sorting utilities for depth ordering
- **URL**: https://threejs.org/docs/#examples/en/utils/SortUtils
- **Scores**: prod=0.6 | learn=0.3 | blender=0.1 | priority=0.61
- **Projects**: Orbs

#### WebGLTextureUtils

- WebGL-specific texture utility functions
- **URL**: https://threejs.org/docs/#examples/en/utils/WebGLTextureUtils
- **Scores**: prod=0.6 | learn=0.3 | blender=0.1 | priority=0.61
- **Projects**: Orbs

#### CSM

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/csm/CSM
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### AnaglyphEffect

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/effects/AnaglyphEffect
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### AsciiEffect

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/effects/AsciiEffect
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Wall

#### OutlineEffect

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/effects/OutlineEffect
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Constellation

#### ParallaxBarrierEffect

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/effects/ParallaxBarrierEffect
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual

#### StereoEffect

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/effects/StereoEffect
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### DebugEnvironment

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/environments/DebugEnvironment
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### RoomEnvironment

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/environments/RoomEnvironment
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### EXRExporter

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/exporters/EXRExporter
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual
- **Examples**: misc_exporter_exr

#### KTX2Exporter

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/exporters/KTX2Exporter
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Examples**: misc_exporter_ktx2

#### HTMLMesh

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/interactive/HTMLMesh
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Wall

#### InteractiveGroup

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/interactive/InteractiveGroup
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual

#### SelectionBox

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/interactive/SelectionBox
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual

#### ConvexHull

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/math/ConvexHull
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### Lut

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/math/Lut
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### MeshSurfaceSampler

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/math/MeshSurfaceSampler
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Pantheon

#### OBB

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/math/OBB
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Examples**: webgl_math_obb

#### Octree

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/math/Octree
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Examples**: games_fps

#### SimplexNoise

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/math/SimplexNoise
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### EdgeSplitModifier

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/modifiers/EdgeSplitModifier
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Constellation
- **Examples**: webgl_modifier_edgesplit

#### Flow

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/modifiers/Flow
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### InstancedFlow

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/modifiers/InstancedFlow
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### SimplifyModifier

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/modifiers/SimplifyModifier
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Examples**: webgl_modifier_simplifier

#### TessellateModifier

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/modifiers/TessellateModifier
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs
- **Examples**: webgl_modifier_tessellation

#### LensflareElement

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/objects/LensflareElement
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual

#### XRControllerModelFactory

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/webxr/XRControllerModelFactory
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual

#### XRHandModelFactory

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/webxr/XRHandModelFactory
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual

#### SceneOptimizer

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/utils/SceneOptimizer
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### WorkerPool

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/utils/WorkerPool
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### SVGObject

- Object3D wrapper for SVG elements
- **URL**: https://threejs.org/docs/#examples/en/renderers/SVGObject
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Wall

#### AnaglyphPassNode

- Anaglyph stereoscopic pass for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/AnaglyphPassNode
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Ritual

#### TileShadowNode

- Tiled shadow map node for many lights
- **URL**: https://threejs.org/docs/#examples/en/tsl/TileShadowNode
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Pantheon

#### BitonicSort

- GPU-based bitonic sort algorithm
- **URL**: https://threejs.org/docs/#examples/en/gpgpu/BitonicSort
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### DDSLoader

- Loads DDS compressed texture format
- **URL**: https://threejs.org/docs/#examples/en/loaders/DDSLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.4 | priority=0.58
- **Projects**: Orbs

#### TGALoader

- Loads TGA image format as textures
- **URL**: https://threejs.org/docs/#examples/en/loaders/TGALoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.4 | priority=0.58
- **Projects**: Orbs

#### NURBSUtils

- Utility functions for NURBS calculations
- **URL**: https://threejs.org/docs/#examples/en/curves/NURBSUtils
- **Scores**: prod=0.6 | learn=0.4 | blender=0.4 | priority=0.58
- **Projects**: Constellation

#### OculusHandModel

- Meta Quest hand tracking model
- **URL**: https://threejs.org/docs/#examples/en/webxr/OculusHandModel
- **Scores**: prod=0.6 | learn=0.4 | blender=0.4 | priority=0.58
- **Projects**: Ritual

#### PVRLoader

- Loads PVRTC compressed texture format
- **URL**: https://threejs.org/docs/#examples/en/loaders/PVRLoader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs

#### CSMShadowNode

- Node material shadow node for CSM
- **URL**: https://threejs.org/docs/#examples/en/csm/CSMShadowNode
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Pantheon

#### CSMShader

- Shader code for cascaded shadow map rendering
- **URL**: https://threejs.org/docs/#examples/en/csm/CSMShader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Pantheon

#### DecoratedTorusKnot4a

- Decorative torus knot variant 4a
- **URL**: https://threejs.org/docs/#examples/en/curves/DecoratedTorusKnot4a
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Constellation

#### DecoratedTorusKnot4b

- Decorative torus knot variant 4b
- **URL**: https://threejs.org/docs/#examples/en/curves/DecoratedTorusKnot4b
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Constellation

#### DecoratedTorusKnot5a

- Decorative torus knot variant 5a
- **URL**: https://threejs.org/docs/#examples/en/curves/DecoratedTorusKnot5a
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Constellation

#### DecoratedTorusKnot5c

- Decorative torus knot variant 5c
- **URL**: https://threejs.org/docs/#examples/en/curves/DecoratedTorusKnot5c
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Constellation

#### LDrawConditionalLineMaterial

- Conditional line material for LDraw rendering
- **URL**: https://threejs.org/docs/#examples/en/materials/LDrawConditionalLineMaterial
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Constellation

#### ParallaxBarrierPassNode

- Parallax barrier pass for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/ParallaxBarrierPassNode
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Ritual

#### StereoCompositePassNode

- Stereo composite pass for WebGPU VR
- **URL**: https://threejs.org/docs/#examples/en/tsl/StereoCompositePassNode
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Ritual

#### StereoPassNode

- Basic stereo rendering pass for WebGPU
- **URL**: https://threejs.org/docs/#examples/en/tsl/StereoPassNode
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Ritual

#### TileShadowNodeHelper

- Helper for tile shadow visualization
- **URL**: https://threejs.org/docs/#examples/en/tsl/TileShadowNodeHelper
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Pantheon

#### WebGPUTextureUtils

- WebGPU-specific texture utility functions
- **URL**: https://threejs.org/docs/#examples/en/utils/WebGPUTextureUtils
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs

#### CCDIKHelper

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/animation/CCDIKHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.5 | priority=0.56
- **Projects**: Constellation|Pantheon

#### DRACOExporter

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/exporters/DRACOExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Examples**: misc_exporter_draco

#### GLTFExporter

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/exporters/GLTFExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Pantheon
- **Examples**: misc_exporter_gltf

#### OBJExporter

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/exporters/OBJExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Examples**: misc_exporter_obj

#### PLYExporter

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/exporters/PLYExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Examples**: misc_exporter_ply

#### STLExporter

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/exporters/STLExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Examples**: misc_exporter_stl

#### USDZExporter

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/exporters/USDZExporter
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Examples**: misc_exporter_usdz

#### PCDLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/PCDLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Examples**: webgl_loader_pcd

#### PDBLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/PDBLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Examples**: webgl_loader_pdb

#### USDLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/USDLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs

#### LDrawLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/LDrawLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Examples**: webgl_loader_ldraw

#### Rhino3dmLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/Rhino3dmLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Examples**: webgl_loader_3dm

#### BVHLoader

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/loaders/BVHLoader
- **Scores**: prod=0.5 | learn=0.7 | blender=0.8 | priority=0.55
- **Projects**: Orbs
- **Examples**: webgl_batch_lod_bvh | webgl_loader_bvh | webgl_raycaster_bvh

#### TIFFLoader

- Loads TIFF image format as textures
- **URL**: https://threejs.org/docs/#examples/en/loaders/TIFFLoader
- **Scores**: prod=0.6 | learn=0.3 | blender=0.4 | priority=0.55
- **Projects**: Orbs

#### MD2Loader

- Loads Quake II MD2 character models
- **URL**: https://threejs.org/docs/#examples/en/loaders/MD2Loader
- **Scores**: prod=0.5 | learn=0.4 | blender=0.4 | priority=0.54
- **Projects**: Pantheon
- **Examples**: webgl_loader_md2 | webgl_loader_md2_control

#### Tab

- Inspector tab UI component
- **URL**: https://threejs.org/docs/#examples/en/inspector/Tab
- **Scores**: prod=0.4 | learn=0.3 | blender=0.1 | priority=0.53
- **Projects**: Orbs

#### AnimationClipCreator

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/animation/AnimationClipCreator
- **Scores**: prod=0.5 | learn=0.4 | blender=0.5 | priority=0.52
- **Projects**: Pantheon

#### CCDIKSolver

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/animation/CCDIKSolver
- **Scores**: prod=0.5 | learn=0.4 | blender=0.5 | priority=0.52
- **Projects**: Pantheon

#### NURBSCurve

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/curves/NURBSCurve
- **Scores**: prod=0.5 | learn=0.4 | blender=0.5 | priority=0.52
- **Projects**: Orbs

#### NURBSSurface

- Addon/Example class
- **URL**: https://threejs.org/docs/#examples/en/curves/NURBSSurface
- **Scores**: prod=0.5 | learn=0.4 | blender=0.5 | priority=0.52
- **Projects**: Pantheon
- **Examples**: webgl_geometry_nurbs | webgl_loader_fbx_nurbs

#### AMFLoader

- Loads Additive Manufacturing Format files
- **URL**: https://threejs.org/docs/#examples/en/loaders/AMFLoader
- **Scores**: prod=0.6 | learn=0.4 | blender=0.7 | priority=0.52
- **Projects**: Pantheon
- **Examples**: webgl_loader_amf

#### KMZLoader

- Loads Google Earth KMZ 3D model archives
- **URL**: https://threejs.org/docs/#examples/en/loaders/KMZLoader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.4 | priority=0.51
- **Projects**: Pantheon
- **Examples**: webgl_loader_kmz

#### VRMLLoader

- Loads VRML virtual reality model format
- **URL**: https://threejs.org/docs/#examples/en/loaders/VRMLLoader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.4 | priority=0.51
- **Projects**: Ritual
- **Examples**: webgl_loader_vrml

#### LDrawUtils

- Utility functions for LDraw model processing
- **URL**: https://threejs.org/docs/#examples/en/utils/LDrawUtils
- **Scores**: prod=0.5 | learn=0.3 | blender=0.4 | priority=0.51
- **Projects**: Pantheon

#### ThreeMFLoader

- Loads 3MF manufacturing format
- **URL**: https://threejs.org/docs/#examples/en/loaders/ThreeMFLoader
- **Scores**: prod=0.6 | learn=0.3 | blender=0.7 | priority=0.49
- **Projects**: Pantheon
- **Examples**: webgl_loader_3mf | webgl_loader_3mf_materials

#### MDDLoader

- Loads point cache animation data
- **URL**: https://threejs.org/docs/#examples/en/loaders/MDDLoader
- **Scores**: prod=0.5 | learn=0.4 | blender=0.7 | priority=0.48
- **Projects**: Pantheon
- **Examples**: webgl_loader_mdd

#### NURBSVolume

- NURBS volume for solid modeling
- **URL**: https://threejs.org/docs/#examples/en/curves/NURBSVolume
- **Scores**: prod=0.5 | learn=0.4 | blender=0.7 | priority=0.48
- **Projects**: Orbs

#### LWOLoader

- Loads LightWave 3D object files
- **URL**: https://threejs.org/docs/#examples/en/loaders/LWOLoader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.7 | priority=0.45
- **Projects**: Pantheon
- **Examples**: webgl_loader_lwo

#### TDSLoader

- Loads 3DS Max legacy format
- **URL**: https://threejs.org/docs/#examples/en/loaders/TDSLoader
- **Scores**: prod=0.5 | learn=0.3 | blender=0.7 | priority=0.45
- **Projects**: Pantheon
- **Examples**: webgl_loader_3ds

#### Projector

- Projects 3D objects to 2D screen coordinates (legacy)
- **URL**: https://threejs.org/docs/#examples/en/renderers/Projector
- **Scores**: prod=0.2 | learn=0.3 | blender=0.1 | priority=0.45
- **Projects**: Wall

#### ColladaComposer

- Composes Collada scene elements
- **URL**: https://threejs.org/docs/#examples/en/loaders/ColladaComposer
- **Scores**: prod=0.5 | learn=0.3 | blender=0.7 | priority=0.45
- **Projects**: Pantheon

#### ColladaParser

- Parses Collada XML format
- **URL**: https://threejs.org/docs/#examples/en/loaders/ColladaParser
- **Scores**: prod=0.5 | learn=0.3 | blender=0.7 | priority=0.45
- **Projects**: Pantheon

#### USDComposer

- Composes USD scene elements
- **URL**: https://threejs.org/docs/#examples/en/loaders/USDComposer
- **Scores**: prod=0.5 | learn=0.3 | blender=0.9 | priority=0.41
- **Projects**: Pantheon

### Extras

#### Interpolations

- Bezier and Catmull-Rom interpolation functions
- **URL**: https://threejs.org/docs/#api/en/extras/Interpolations
- **Scores**: prod=0.7 | learn=0.5 | blender=0.1 | priority=0.71
- **Projects**: Constellation|Orbs

### Materials

#### NodeMaterial

- Base class for node-based shader materials
- **URL**: https://threejs.org/docs/#api/en/materials/NodeMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### Line2NodeMaterial

- Node material for wide lines with Line2 addon
- **URL**: https://threejs.org/docs/#api/en/materials/Line2NodeMaterial
- **Scores**: prod=0.7 | learn=0.6 | blender=0.1 | priority=0.74
- **Projects**: Constellation

#### LineBasicNodeMaterial

- Node-based line material for WebGPU renderer
- **URL**: https://threejs.org/docs/#api/en/materials/LineBasicNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation

#### LineDashedNodeMaterial

- Node-based dashed line material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/LineDashedNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation

#### MeshBasicNodeMaterial

- Node-based unlit mesh material
- **URL**: https://threejs.org/docs/#api/en/materials/MeshBasicNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Wall

#### MeshLambertNodeMaterial

- Node-based Lambert material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/MeshLambertNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon

#### MeshMatcapNodeMaterial

- Node-based matcap material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/MeshMatcapNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon

#### MeshNormalNodeMaterial

- Node-based normal material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/MeshNormalNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Constellation

#### MeshPhongNodeMaterial

- Node-based Phong material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/MeshPhongNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon

#### MeshToonNodeMaterial

- Node-based toon material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/MeshToonNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon

#### PointsNodeMaterial

- Node-based points material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/PointsNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs|Constellation

#### SpriteNodeMaterial

- Node-based sprite material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/SpriteNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Pantheon|Orbs

#### VolumeNodeMaterial

- Node material for volumetric rendering
- **URL**: https://threejs.org/docs/#api/en/materials/VolumeNodeMaterial
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs

#### NodeMaterialObserver

- Observes and tracks changes in NodeMaterial properties
- **URL**: https://threejs.org/docs/#api/en/materials/NodeMaterialObserver
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Orbs

#### ShadowNodeMaterial

- Node-based shadow material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/ShadowNodeMaterial
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Pantheon

#### SSSLightingModel

- Subsurface scattering lighting model implementation
- **URL**: https://threejs.org/docs/#api/en/materials/SSSLightingModel
- **Scores**: prod=0.6 | learn=0.5 | blender=0.4 | priority=0.61
- **Projects**: Orbs|Pantheon

#### MeshPhysicalNodeMaterial

- Node-based PBR physical material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/MeshPhysicalNodeMaterial
- **Scores**: prod=0.6 | learn=0.6 | blender=0.7 | priority=0.58
- **Projects**: Pantheon|Orbs

#### MeshSSSNodeMaterial

- Subsurface scattering material for translucent objects
- **URL**: https://threejs.org/docs/#api/en/materials/MeshSSSNodeMaterial
- **Scores**: prod=0.6 | learn=0.6 | blender=0.7 | priority=0.58
- **Projects**: Pantheon|Orbs

#### MeshStandardNodeMaterial

- Node-based standard PBR material for WebGPU
- **URL**: https://threejs.org/docs/#api/en/materials/MeshStandardNodeMaterial
- **Scores**: prod=0.6 | learn=0.6 | blender=0.7 | priority=0.58
- **Projects**: Pantheon|Orbs

### Reference

#### Audio

- **URL**: https://threejs.org/docs/#api/en/audio/Audio
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Pantheon
- **Related**: AudioListener|AudioAnalyser|PositionalAudio

#### AudioListener

- **URL**: https://threejs.org/docs/#api/en/audio/AudioListener
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Pantheon
- **Examples**: webaudio_orientation | webaudio_sandbox | webaudio_timing | webaudio_visualizer

#### PerspectiveCamera

- **URL**: https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Constellation
- **Related**: OrthographicCamera|CubeCamera|Camera
- **Examples**: webgl_animation_keyframes | webgl_animation_skinning_blending | webgl_animation_skinning_additive_blending | webgl_animation_skinning_ik | webgl_animation_skinning_morph

#### BufferGeometry

- **URL**: https://threejs.org/docs/#api/en/core/BufferGeometry
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: BufferAttribute|Mesh|Material
- **Examples**: webgl_interactive_buffergeometry | webgl_buffergeometry | webgl_buffergeometry_attributes_integer | webgl_buffergeometry_attributes_none | webgl_buffergeometry_custom_attributes_particles

#### Object3D

- **URL**: https://threejs.org/docs/#api/en/core/Object3D
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: Scene|Mesh|Group

#### Raycaster

- **URL**: https://threejs.org/docs/#api/en/core/Raycaster
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Ritual
- **Related**: Object3D|Camera|Vector2
- **Examples**: webgl_geometry_terrain_raycast | webgl_instancing_raycast | webgl_interactive_buffergeometry | webgl_interactive_cubes | webgl_interactive_cubes_gpu

#### BoxGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/BoxGeometry
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Examples**: webgl_geometry_minecraft

#### PlaneGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/PlaneGeometry
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Constellation
- **Examples**: webgl_geometry_terrain | webgl_geometry_terrain_raycast | webgpu_tsl_procedural_terrain

#### SphereGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/SphereGeometry
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs

#### AmbientLight

- **URL**: https://threejs.org/docs/#api/en/lights/AmbientLight
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: DirectionalLight|HemisphereLight

#### DirectionalLight

- **URL**: https://threejs.org/docs/#api/en/lights/DirectionalLight
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: DirectionalLightShadow|AmbientLight|PointLight
- **Examples**: webgl_shadow_contact | webgl_shadowmap | webgl_shadowmap_performance | webgl_shadowmap_pointlight | webgl_shadowmap_viewer

#### PointLight

- **URL**: https://threejs.org/docs/#api/en/lights/PointLight
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: PointLightShadow|DirectionalLight|SpotLight
- **Examples**: webgl_shadowmap_pointlight | webgpu_lights_pointlights | webgpu_shadowmap_pointlight

#### SpotLight

- **URL**: https://threejs.org/docs/#api/en/lights/SpotLight
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: SpotLightShadow|PointLight|DirectionalLight
- **Examples**: webgl_lights_spotlight | webgl_lights_spotlights | webgpu_lights_ies_spotlight | webgpu_lights_spotlight

#### TextureLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/TextureLoader
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Wall

#### MeshPhysicalMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: MeshStandardMaterial|Texture|PMREMGenerator
- **Examples**: webgl_loader_gltf_iridescence | webgl_loader_gltf_sheen | webgl_loader_gltf_transmission | webgl_loader_gltf_anisotropy | webgl_materials_physical_clearcoat

#### MeshStandardMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs|Ritual
- **Related**: MeshPhysicalMaterial|MeshBasicMaterial|Texture
- **Examples**: webgl_materials_displacementmap | webgl_materials_normalmap | webgl_materials_normalmap_object_space | webgpu_materials_displacementmap

#### PointsMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/PointsMaterial
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Constellation|Orbs

#### ShaderMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/ShaderMaterial
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: RawShaderMaterial|Material|WebGLRenderer
- **Examples**: webgl_shader | webgl_shader_lava

#### Color

- **URL**: https://threejs.org/docs/#api/en/math/Color
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: Material|Light|Vector3

#### Vector3

- **URL**: https://threejs.org/docs/#api/en/math/Vector3
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: Vector2|Vector4|Matrix4

#### InstancedMesh

- **URL**: https://threejs.org/docs/#api/en/objects/InstancedMesh
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: Mesh|BatchedMesh|BufferGeometry
- **Examples**: webgl_instancing_morph | webgl_instancing_dynamic | webgl_instancing_performance | webgl_instancing_raycast | webgl_instancing_scatter

#### Line

- **URL**: https://threejs.org/docs/#api/en/objects/Line
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Constellation
- **Related**: LineBasicMaterial|LineSegments|BufferGeometry
- **Examples**: webgl_geometry_extrude_splines | webgl_geometry_spline_editor | webgl_interactive_lines | webgl_lines_colors | webgl_lines_dashed

#### Mesh

- **URL**: https://threejs.org/docs/#api/en/objects/Mesh
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: BufferGeometry|Material|Object3D

#### Points

- **URL**: https://threejs.org/docs/#api/en/objects/Points
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Constellation|Orbs
- **Related**: PointsMaterial|BufferGeometry|Sprite
- **Examples**: webgl_interactive_points | webgl_interactive_raycasting_points | webgl_points_billboards | webgl_points_dynamic | webgl_points_sprites

#### Sprite

- **URL**: https://threejs.org/docs/#api/en/objects/Sprite
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: SpriteMaterial|Points|Object3D
- **Examples**: webgl_points_sprites | webgl_raycaster_sprite | webgl_sprites | webgpu_instance_sprites | webgpu_sprites

#### Scene

- **URL**: https://threejs.org/docs/#api/en/scenes/Scene
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: Object3D|Fog|FogExp2
- **Examples**: webgl_animation_keyframes | webgl_animation_skinning_blending | webgl_animation_skinning_additive_blending | webgl_animation_skinning_ik | webgl_animation_skinning_morph

#### PostProcessing

- **URL**: https://threejs.org/docs/#api/en/renderers/common/PostProcessing
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: EffectComposer|BloomNode|GTAONode

#### WebGLRenderer

- **URL**: https://threejs.org/docs/#api/en/renderers/WebGLRenderer
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: WebGPURenderer|Scene|Camera
- **Examples**: webgl_animation_keyframes | webgl_animation_skinning_blending | webgl_animation_skinning_additive_blending | webgl_animation_skinning_ik | webgl_animation_skinning_morph

#### WebGPURenderer

- WebGPU API - experimental
- **URL**: https://threejs.org/docs/#api/en/renderers/WebGPURenderer
- **Scores**: prod=1.0 | learn=1.0 | blender=0.1 | priority=0.98
- **Projects**: Orbs
- **Related**: WebGLRenderer|Scene|Camera
- **Examples**: webgpu_animation_retargeting | webgpu_animation_retargeting_readyplayer | webgpu_backdrop | webgpu_backdrop_area | webgpu_backdrop_water

#### KeyframeTrack

- **URL**: https://threejs.org/docs/#api/en/animation/KeyframeTrack
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Pantheon

#### Camera

- **URL**: https://threejs.org/docs/#api/en/cameras/Camera
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Constellation

#### OrthographicCamera

- **URL**: https://threejs.org/docs/#api/en/cameras/OrthographicCamera
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Constellation
- **Related**: PerspectiveCamera|Camera
- **Examples**: webgl_interactive_cubes_ortho | css3d_orthographic

#### BufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/BufferAttribute
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### CylinderGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/CylinderGeometry
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### HemisphereLight

- **URL**: https://threejs.org/docs/#api/en/lights/HemisphereLight
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Examples**: webgl_lights_hemisphere

#### Light

- **URL**: https://threejs.org/docs/#api/en/lights/Light
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### RectAreaLight

- **URL**: https://threejs.org/docs/#api/en/lights/RectAreaLight
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Ritual
- **Examples**: webgl_lights_rectarealight | webgpu_lights_rectarealight

#### Loader

- **URL**: https://threejs.org/docs/#api/en/loaders/Loader
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### LineBasicMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/LineBasicMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Constellation|Orbs

#### Material

- **URL**: https://threejs.org/docs/#api/en/materials/Material
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### MeshBasicMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### MeshLambertMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/MeshLambertMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### MeshMatcapMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/MeshMatcapMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Examples**: webgl_materials_matcap | webgpu_materials_matcap

#### MeshPhongMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/MeshPhongMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Examples**: webgl_materials_bumpmap

#### MeshToonMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/MeshToonMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Examples**: webgl_materials_toon | webgpu_materials_toon

#### ShadowMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/ShadowMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### SpriteMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/SpriteMaterial
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### BatchedMesh

- **URL**: https://threejs.org/docs/#api/en/objects/BatchedMesh
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs
- **Related**: InstancedMesh|Mesh|BufferGeometry
- **Examples**: webgl_batch_lod_bvh | webgl_mesh_batch | webgpu_mesh_batch

#### LineSegments

- **URL**: https://threejs.org/docs/#api/en/objects/LineSegments
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Constellation

#### Fog

- **URL**: https://threejs.org/docs/#api/en/scenes/Fog
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### FogExp2

- **URL**: https://threejs.org/docs/#api/en/scenes/FogExp2
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Orbs

#### CubeTexture

- **URL**: https://threejs.org/docs/#api/en/textures/CubeTexture
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Wall

#### DataTexture

- **URL**: https://threejs.org/docs/#api/en/textures/DataTexture
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Wall

#### DepthTexture

- **URL**: https://threejs.org/docs/#api/en/textures/DepthTexture
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Wall

#### Texture

- **URL**: https://threejs.org/docs/#api/en/textures/Texture
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Wall
- **Related**: TextureLoader|Material|DataTexture

#### VideoTexture

- **URL**: https://threejs.org/docs/#api/en/textures/VideoTexture
- **Scores**: prod=1.0 | learn=0.7 | blender=0.1 | priority=0.89
- **Projects**: Wall
- **Examples**: webgl_materials_video | webgl_materials_video_webcam | webgl_video_kinect | webgl_video_panorama_equirectangular | webgpu_materials_video

#### AnimationMixer

- **URL**: https://threejs.org/docs/#api/en/animation/AnimationMixer
- **Scores**: prod=1.0 | learn=1.0 | blender=0.8 | priority=0.84
- **Projects**: Pantheon
- **Related**: AnimationClip|AnimationAction|Object3D
- **Examples**: webgl_animation_keyframes | webgl_animation_skinning_blending | webgl_animation_skinning_additive_blending | webgl_animation_skinning_ik | webgl_animation_skinning_morph

#### Clock

- **URL**: https://threejs.org/docs/#api/en/core/Clock
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs

#### EventDispatcher

- **URL**: https://threejs.org/docs/#api/en/core/EventDispatcher
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs

#### Layers

- **URL**: https://threejs.org/docs/#api/en/core/Layers
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs

#### Timer

- **URL**: https://threejs.org/docs/#api/en/core/Timer
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs

#### Uniform

- **URL**: https://threejs.org/docs/#api/en/core/Uniform
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs

#### PMREMGenerator

- **URL**: https://threejs.org/docs/#api/en/extras/PMREMGenerator
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Examples**: webgl_pmrem_cubemap | webgl_pmrem_equirectangular | webgl_pmrem_test | webgpu_pmrem_cubemap | webgpu_pmrem_equirectangular

#### LoadingManager

- **URL**: https://threejs.org/docs/#api/en/loaders/LoadingManager
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs

#### Matrix4

- **URL**: https://threejs.org/docs/#api/en/math/Matrix4
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Related**: Vector3|Quaternion|Euler

#### Quaternion

- **URL**: https://threejs.org/docs/#api/en/math/Quaternion
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs
- **Related**: Euler|Matrix4|Vector3

#### Group

- **URL**: https://threejs.org/docs/#api/en/objects/Group
- **Scores**: prod=1.0 | learn=0.4 | blender=0.1 | priority=0.8
- **Projects**: Orbs

#### AnimationObjectGroup

- **URL**: https://threejs.org/docs/#api/en/animation/AnimationObjectGroup
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon

#### AnimationUtils

- **URL**: https://threejs.org/docs/#api/en/animation/AnimationUtils
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon

#### BooleanKeyframeTrack

- **URL**: https://threejs.org/docs/#api/en/animation/tracks/BooleanKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon

#### ColorKeyframeTrack

- **URL**: https://threejs.org/docs/#api/en/animation/tracks/ColorKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon

#### NumberKeyframeTrack

- **URL**: https://threejs.org/docs/#api/en/animation/tracks/NumberKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon

#### PropertyBinding

- **URL**: https://threejs.org/docs/#api/en/animation/PropertyBinding
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### PropertyMixer

- **URL**: https://threejs.org/docs/#api/en/animation/PropertyMixer
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon

#### QuaternionKeyframeTrack

- **URL**: https://threejs.org/docs/#api/en/animation/tracks/QuaternionKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon

#### StringKeyframeTrack

- **URL**: https://threejs.org/docs/#api/en/animation/tracks/StringKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon

#### VectorKeyframeTrack

- **URL**: https://threejs.org/docs/#api/en/animation/tracks/VectorKeyframeTrack
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon

#### AudioAnalyser

- **URL**: https://threejs.org/docs/#api/en/audio/AudioAnalyser
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon

#### AudioContext

- **URL**: https://threejs.org/docs/#api/en/audio/AudioContext
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon|Wall

#### PositionalAudio

- **URL**: https://threejs.org/docs/#api/en/audio/PositionalAudio
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Pantheon
- **Related**: Audio|AudioListener|Object3D

#### ArrayCamera

- **URL**: https://threejs.org/docs/#api/en/cameras/ArrayCamera
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation|Ritual
- **Examples**: webgl_camera_array | webgpu_camera_array

#### CubeCamera

- **URL**: https://threejs.org/docs/#api/en/cameras/CubeCamera
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation

#### StereoCamera

- **URL**: https://threejs.org/docs/#api/en/cameras/StereoCamera
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation

#### InstancedBufferGeometry

- **URL**: https://threejs.org/docs/#api/en/core/InstancedBufferGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### CapsuleGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/CapsuleGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### CircleGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/CircleGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### ConeGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/ConeGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### DodecahedronGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/DodecahedronGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### EdgesGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/EdgesGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation

#### IcosahedronGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### OctahedronGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/OctahedronGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### PolyhedronGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/PolyhedronGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### RingGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/RingGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### TetrahedronGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### TorusGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/TorusGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### TorusKnotGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### WireframeGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/WireframeGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation

#### DirectionalLightShadow

- **URL**: https://threejs.org/docs/#api/en/lights/shadows/DirectionalLightShadow
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### LightProbe

- **URL**: https://threejs.org/docs/#api/en/lights/LightProbe
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: webgl_lightprobe | webgl_lightprobe_cubecamera | webgpu_lightprobe | webgpu_lightprobe_cubecamera

#### LightShadow

- **URL**: https://threejs.org/docs/#api/en/lights/shadows/LightShadow
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### PointLightShadow

- **URL**: https://threejs.org/docs/#api/en/lights/shadows/PointLightShadow
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### SpotLightShadow

- **URL**: https://threejs.org/docs/#api/en/lights/shadows/SpotLightShadow
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### LineDashedMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/LineDashedMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Constellation|Orbs

#### MeshDepthMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/MeshDepthMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### MeshDistanceMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/MeshDistanceMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### MeshNormalMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/MeshNormalMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs

#### RawShaderMaterial

- **URL**: https://threejs.org/docs/#api/en/materials/RawShaderMaterial
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Orbs
- **Examples**: webgl_buffergeometry_rawshader

#### CanvasTexture

- **URL**: https://threejs.org/docs/#api/en/textures/CanvasTexture
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall

#### CompressedTexture

- **URL**: https://threejs.org/docs/#api/en/textures/CompressedTexture
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall

#### Data3DTexture

- **URL**: https://threejs.org/docs/#api/en/textures/Data3DTexture
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall

#### DataArrayTexture

- **URL**: https://threejs.org/docs/#api/en/textures/DataArrayTexture
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual|Wall

#### FramebufferTexture

- **URL**: https://threejs.org/docs/#api/en/textures/FramebufferTexture
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Wall

#### WebXRManager

- **URL**: https://threejs.org/docs/#api/en/renderers/webxr/WebXRManager
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual

#### XRManager

- **URL**: https://threejs.org/docs/#api/en/renderers/webxr/XRManager
- **Scores**: prod=0.7 | learn=0.7 | blender=0.1 | priority=0.77
- **Projects**: Ritual

#### AnimationAction

- **URL**: https://threejs.org/docs/#api/en/animation/AnimationAction
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Pantheon

#### AnimationClip

- **URL**: https://threejs.org/docs/#api/en/animation/AnimationClip
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Pantheon
- **Related**: AnimationMixer|KeyframeTrack|AnimationAction
- **Examples**: webgl_animation_keyframes | webgl_animation_skinning_blending | webgl_animation_skinning_additive_blending | webgl_animation_skinning_ik | webgl_animation_skinning_morph

#### Bone

- **URL**: https://threejs.org/docs/#api/en/objects/Bone
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Pantheon

#### LOD

- **URL**: https://threejs.org/docs/#api/en/objects/LOD
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Orbs
- **Related**: Mesh|Object3D|Camera
- **Examples**: webgl_batch_lod_bvh | webgl_lod

#### Skeleton

- **URL**: https://threejs.org/docs/#api/en/objects/Skeleton
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Constellation|Pantheon

#### SkinnedMesh

- **URL**: https://threejs.org/docs/#api/en/objects/SkinnedMesh
- **Scores**: prod=1.0 | learn=0.7 | blender=0.8 | priority=0.75
- **Projects**: Orbs
- **Related**: Skeleton|Bone|AnimationMixer

#### DirectionalLightHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation

#### HemisphereLightHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/HemisphereLightHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation|Orbs

#### PointLightHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/PointLightHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation

#### SpotLightHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/SpotLightHelper
- **Scores**: prod=0.6 | learn=0.7 | blender=0.1 | priority=0.73
- **Projects**: Constellation

#### ExtrudeGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Orbs

#### LatheGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/LatheGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Orbs

#### ShapeGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/ShapeGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Orbs

#### TubeGeometry

- **URL**: https://threejs.org/docs/#api/en/geometries/TubeGeometry
- **Scores**: prod=0.7 | learn=0.7 | blender=0.5 | priority=0.69
- **Projects**: Orbs

#### GLBufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/GLBufferAttribute
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### InstancedBufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/InstancedBufferAttribute
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### InterleavedBuffer

- **URL**: https://threejs.org/docs/#api/en/core/InterleavedBuffer
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### InterleavedBufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/InterleavedBufferAttribute
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### RenderTarget

- **URL**: https://threejs.org/docs/#api/en/core/RenderTarget
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual

#### ArcCurve

- **URL**: https://threejs.org/docs/#api/en/extras/curves/ArcCurve
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual

#### CatmullRomCurve3

- **URL**: https://threejs.org/docs/#api/en/extras/curves/CatmullRomCurve3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### CubicBezierCurve3

- **URL**: https://threejs.org/docs/#api/en/extras/curves/CubicBezierCurve3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Curve

- **URL**: https://threejs.org/docs/#api/en/extras/core/Curve
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### CurvePath

- **URL**: https://threejs.org/docs/#api/en/extras/core/CurvePath
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### EllipseCurve

- **URL**: https://threejs.org/docs/#api/en/extras/curves/EllipseCurve
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### LineCurve

- **URL**: https://threejs.org/docs/#api/en/extras/curves/LineCurve
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation

#### LineCurve3

- **URL**: https://threejs.org/docs/#api/en/extras/curves/LineCurve3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation

#### Path

- **URL**: https://threejs.org/docs/#api/en/extras/core/Path
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### QuadraticBezierCurve3

- **URL**: https://threejs.org/docs/#api/en/extras/curves/QuadraticBezierCurve3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Shape

- **URL**: https://threejs.org/docs/#api/en/extras/core/Shape
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### ShapePath

- **URL**: https://threejs.org/docs/#api/en/extras/core/ShapePath
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### SplineCurve

- **URL**: https://threejs.org/docs/#api/en/extras/curves/SplineCurve
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation

#### BezierInterpolant

- **URL**: https://threejs.org/docs/#api/en/math/interpolants/BezierInterpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Box3

- **URL**: https://threejs.org/docs/#api/en/math/Box3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation

#### CubicInterpolant

- **URL**: https://threejs.org/docs/#api/en/math/interpolants/CubicInterpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Cylindrical

- **URL**: https://threejs.org/docs/#api/en/math/Cylindrical
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### DiscreteInterpolant

- **URL**: https://threejs.org/docs/#api/en/math/interpolants/DiscreteInterpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Euler

- **URL**: https://threejs.org/docs/#api/en/math/Euler
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Frustum

- **URL**: https://threejs.org/docs/#api/en/math/Frustum
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Interpolant

- **URL**: https://threejs.org/docs/#api/en/math/Interpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Line3

- **URL**: https://threejs.org/docs/#api/en/math/Line3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation

#### LinearInterpolant

- **URL**: https://threejs.org/docs/#api/en/math/interpolants/LinearInterpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation|Ritual

#### MathUtils

- **URL**: https://threejs.org/docs/#api/en/math/MathUtils
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Matrix3

- **URL**: https://threejs.org/docs/#api/en/math/Matrix3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Plane

- **URL**: https://threejs.org/docs/#api/en/math/Plane
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation
- **Examples**: webgl_clipping | webgl_clipping_advanced | webgl_clipping_intersection | webgl_clipping_stencil | webgpu_clipping

#### QuaternionLinearInterpolant

- **URL**: https://threejs.org/docs/#api/en/math/interpolants/QuaternionLinearInterpolant
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Constellation|Ritual

#### Ray

- **URL**: https://threejs.org/docs/#api/en/math/Ray
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Sphere

- **URL**: https://threejs.org/docs/#api/en/math/Sphere
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Spherical

- **URL**: https://threejs.org/docs/#api/en/math/Spherical
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### SphericalHarmonics3

- **URL**: https://threejs.org/docs/#api/en/math/SphericalHarmonics3
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual

#### Triangle

- **URL**: https://threejs.org/docs/#api/en/math/Triangle
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Vector2

- **URL**: https://threejs.org/docs/#api/en/math/Vector2
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Vector4

- **URL**: https://threejs.org/docs/#api/en/math/Vector4
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### ClippingGroup

- **URL**: https://threejs.org/docs/#api/en/objects/ClippingGroup
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### Source

- **URL**: https://threejs.org/docs/#api/en/textures/Source
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### CubeRenderTarget

- **URL**: https://threejs.org/docs/#api/en/renderers/common/CubeRenderTarget
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual

#### Renderer

- **URL**: https://threejs.org/docs/#api/en/renderers/common/Renderer
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Orbs

#### WebGLRenderTarget

- **URL**: https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual
- **Examples**: webgl_rtt | webgl_multiple_rendertargets | webgl_rendertarget_texture2darray | webgpu_multiple_rendertargets | webgpu_multiple_rendertargets_readback

#### WebGLCubeRenderTarget

- **URL**: https://threejs.org/docs/#api/en/renderers/WebGLCubeRenderTarget
- **Scores**: prod=0.7 | learn=0.4 | blender=0.1 | priority=0.68
- **Projects**: Ritual

#### IESSpotLight

- **URL**: https://threejs.org/docs/#api/en/lights/IESSpotLight
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### ProjectorLight

- **URL**: https://threejs.org/docs/#api/en/lights/ProjectorLight
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Wall

#### AnimationLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/AnimationLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Pantheon

#### AudioLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/AudioLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Pantheon

#### BufferGeometryLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/BufferGeometryLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### CompressedTextureLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/CompressedTextureLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Wall

#### CubeTextureLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/CubeTextureLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Wall
- **Examples**: webgl_materials_cubemap | webgl_materials_cubemap_dynamic | webgl_materials_cubemap_refraction | webgl_materials_cubemap_mipmaps | webgl_materials_cubemap_render_to_mipmaps

#### DataTextureLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/DataTextureLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Wall

#### FileLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/FileLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### ImageBitmapLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/ImageBitmapLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### ImageLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/ImageLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### LoaderUtils

- **URL**: https://threejs.org/docs/#api/en/loaders/LoaderUtils
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### MaterialLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/MaterialLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### NodeLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/NodeLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### NodeMaterialLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/NodeMaterialLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### NodeObjectLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/NodeObjectLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### ObjectLoader

- **URL**: https://threejs.org/docs/#api/en/loaders/ObjectLoader
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Orbs

#### LineLoop

- **URL**: https://threejs.org/docs/#api/en/objects/LineLoop
- **Scores**: prod=0.4 | learn=0.7 | blender=0.1 | priority=0.65
- **Projects**: Constellation

#### ArrowHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/ArrowHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Ritual

#### AxesHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/AxesHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### Box3Helper

- **URL**: https://threejs.org/docs/#api/en/helpers/Box3Helper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### BoxHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/BoxHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### CameraHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/CameraHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### GridHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/GridHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### PlaneHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/PlaneHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation

#### PolarGridHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/PolarGridHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Ritual

#### SkeletonHelper

- **URL**: https://threejs.org/docs/#api/en/helpers/SkeletonHelper
- **Scores**: prod=0.6 | learn=0.4 | blender=0.1 | priority=0.64
- **Projects**: Constellation|Pantheon

#### Float16BufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Float16BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### Float32BufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Float32BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### InstancedInterleavedBuffer

- **URL**: https://threejs.org/docs/#api/en/core/InstancedInterleavedBuffer
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### Int16BufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Int16BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### Int32BufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Int32BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### Int8BufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Int8BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### RenderTarget3D

- **URL**: https://threejs.org/docs/#api/en/core/RenderTarget3D
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual

#### Uint16BufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Uint16BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### Uint32BufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Uint32BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### Uint8BufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Uint8BufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### Uint8ClampedBufferAttribute

- **URL**: https://threejs.org/docs/#api/en/core/bufferAttributeTypes/Uint8ClampedBufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### UniformsGroup

- **URL**: https://threejs.org/docs/#api/en/core/UniformsGroup
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs
- **Examples**: webgl_ubo | webgl_ubo_arrays

#### Controls

- **URL**: https://threejs.org/docs/#api/en/extras/Controls
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual

#### CubicBezierCurve

- **URL**: https://threejs.org/docs/#api/en/extras/curves/CubicBezierCurve
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### DataUtils

- **URL**: https://threejs.org/docs/#api/en/extras/DataUtils
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### Earcut

- **URL**: https://threejs.org/docs/#api/en/extras/Earcut
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual

#### ImageUtils

- **URL**: https://threejs.org/docs/#api/en/extras/ImageUtils
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### QuadraticBezierCurve

- **URL**: https://threejs.org/docs/#api/en/extras/curves/QuadraticBezierCurve
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### ShapeUtils

- **URL**: https://threejs.org/docs/#api/en/extras/ShapeUtils
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### TextureUtils

- **URL**: https://threejs.org/docs/#api/en/extras/TextureUtils
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall

#### Cache

- **URL**: https://threejs.org/docs/#api/en/loaders/Cache
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### Box2

- **URL**: https://threejs.org/docs/#api/en/math/Box2
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### FrustumArray

- **URL**: https://threejs.org/docs/#api/en/math/FrustumArray
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual

#### Matrix2

- **URL**: https://threejs.org/docs/#api/en/math/Matrix2
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### CompressedArrayTexture

- **URL**: https://threejs.org/docs/#api/en/textures/CompressedArrayTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual|Wall

#### CompressedCubeTexture

- **URL**: https://threejs.org/docs/#api/en/textures/CompressedCubeTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall

#### CubeDepthTexture

- **URL**: https://threejs.org/docs/#api/en/textures/CubeDepthTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall

#### ExternalTexture

- **URL**: https://threejs.org/docs/#api/en/textures/ExternalTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall

#### VideoFrameTexture

- **URL**: https://threejs.org/docs/#api/en/textures/VideoFrameTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall

#### BlendMode

- **URL**: https://threejs.org/docs/#api/en/renderers/common/BlendMode
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### BundleGroup

- **URL**: https://threejs.org/docs/#api/en/renderers/common/BundleGroup
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### CanvasTarget

- **URL**: https://threejs.org/docs/#api/en/renderers/common/CanvasTarget
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Constellation|Ritual

#### Info

- **URL**: https://threejs.org/docs/#api/en/renderers/common/Info
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### QuadMesh

- **URL**: https://threejs.org/docs/#api/en/renderers/common/QuadMesh
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### StorageBufferAttribute

- **URL**: https://threejs.org/docs/#api/en/renderers/common/StorageBufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### StorageInstancedBufferAttribute

- **URL**: https://threejs.org/docs/#api/en/renderers/common/StorageInstancedBufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### StorageTexture

- **URL**: https://threejs.org/docs/#api/en/renderers/common/StorageTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall

#### StorageArrayTexture

- **URL**: https://threejs.org/docs/#api/en/renderers/common/StorageArrayTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual|Wall

#### Storage3DTexture

- **URL**: https://threejs.org/docs/#api/en/renderers/common/Storage3DTexture
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Wall

#### IndirectStorageBufferAttribute

- **URL**: https://threejs.org/docs/#api/en/renderers/common/IndirectStorageBufferAttribute
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### TimestampQueryPool

- **URL**: https://threejs.org/docs/#api/en/renderers/common/TimestampQueryPool
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Orbs

#### WebGLArrayRenderTarget

- **URL**: https://threejs.org/docs/#api/en/renderers/WebGLArrayRenderTarget
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual

#### WebGL3DRenderTarget

- **URL**: https://threejs.org/docs/#api/en/renderers/WebGL3DRenderTarget
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual

#### WebXRDepthSensing

- **URL**: https://threejs.org/docs/#api/en/renderers/webxr/WebXRDepthSensing
- **Scores**: prod=0.4 | learn=0.4 | blender=0.1 | priority=0.56
- **Projects**: Ritual

### Renderers

#### UniformsUtils

- Utility for cloning and merging shader uniforms
- **URL**: https://threejs.org/docs/#api/en/renderers/shaders/UniformsUtils
- **Scores**: prod=0.8 | learn=0.6 | blender=0.1 | priority=0.78
- **Projects**: Orbs

#### RenderPipeline

- Configurable rendering pipeline
- **URL**: https://threejs.org/docs/#api/en/renderers/RenderPipeline
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs

#### GLSLNodeBuilder

- Compiles node graph to GLSL shaders
- **URL**: https://threejs.org/docs/#api/en/renderers/GLSLNodeBuilder
- **Scores**: prod=0.6 | learn=0.5 | blender=0.1 | priority=0.67
- **Projects**: Orbs

#### WGSLNodeBuilder

- Compiles node graph to WGSL shaders
- **URL**: https://threejs.org/docs/#api/en/renderers/WGSLNodeBuilder
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### InspectorBase

- Base class for renderer inspection tools
- **URL**: https://threejs.org/docs/#api/en/renderers/InspectorBase
- **Scores**: prod=0.5 | learn=0.4 | blender=0.1 | priority=0.6
- **Projects**: Orbs

#### WebGLTimestampQueryPool

- WebGL-specific timestamp query pool
- **URL**: https://threejs.org/docs/#api/en/renderers/WebGLTimestampQueryPool
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs

#### WebGPUTimestampQueryPool

- WebGPU-specific timestamp query pool
- **URL**: https://threejs.org/docs/#api/en/renderers/WebGPUTimestampQueryPool
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs

#### WGSLNodeFunction

- WGSL function representation in node system
- **URL**: https://threejs.org/docs/#api/en/renderers/WGSLNodeFunction
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs

#### WGSLNodeParser

- Parses WGSL code into node graph
- **URL**: https://threejs.org/docs/#api/en/renderers/WGSLNodeParser
- **Scores**: prod=0.5 | learn=0.3 | blender=0.1 | priority=0.57
- **Projects**: Orbs

---

## Three.js Tools & Resources (102 entries)

### 3D Modeling

#### Spline

- 3D design tool for interactive web experiences with real-time collaboration
- **URL**: https://spline.design
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Wall
- **Related**: Scene|Mesh|Material

#### Blender

- Free open-source 3D creation suite for modeling animation rendering
- **URL**: https://blender.org
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Constellation|Orbs
- **Related**: GLTFLoader|BufferGeometry

#### Womp

- Simplified browser-based 3D creation tool with intuitive interface
- **URL**: https://womp.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs
- **Related**: GLTFLoader|Mesh

#### Plasticity

- Modern CAD tool for precise 3D modeling with NURBS
- **URL**: https://plasticity.xyz
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs
- **Related**: BufferGeometry|GLTFLoader

#### Smooth Voxels

- Converts voxel models into smooth organic 3D shapes
- **URL**: https://smoothvoxels.glitch.me
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: BufferGeometry|Mesh

#### Rodin

- AI model generator for 3D assets from text or image prompts
- **URL**: https://hyperhuman.deemos.com/rodin
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs
- **Related**: GLTFLoader|Mesh

#### Sam3d

- AI-powered tool converting pictures to detailed 3D models
- **URL**: https://sam3d.app
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon
- **Related**: GLTFLoader|Mesh

### Animation

#### GSAP

- High-performance timeline animation library for web
- **URL**: https://greensock.com/gsap
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Wall|Ritual
- **Related**: AnimationMixer|Clock

#### Anime.js

- Powerful lightweight animation library for 2D UI and 3D scenes
- **URL**: https://animejs.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Pantheon
- **Related**: AnimationMixer|Clock

#### Theatre.js

- Motion design library for animating 3D scenes with visual timeline
- **URL**: https://theatrejs.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Ritual
- **Related**: AnimationMixer|Camera|Object3D

#### Mixamo

- Free 3D character animations and auto-rigging from Adobe
- **URL**: https://mixamo.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon
- **Related**: SkeletonUtils|AnimationMixer|BVHLoader

#### Cascadeur

- AI-assisted physics-based character animation software
- **URL**: https://cascadeur.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon
- **Related**: AnimationMixer|SkeletonHelper

#### AccuRIG

- Auto rigging tool for 3D character models
- **URL**: https://actorcore.reallusion.com/auto-rig
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon
- **Related**: Skeleton|Bone|SkeletonHelper

#### Deepmotion

- AI motion capture from video or text descriptions
- **URL**: https://deepmotion.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Ritual
- **Related**: AnimationMixer|SkeletonUtils

#### Mesh2motion

- Rig and animate 3D models directly in the browser
- **URL**: https://mesh2motion.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon
- **Related**: Skeleton|AnimationMixer

### Controls

#### OrbitControls

- Mouse-based orbit camera control for Three.js
- **URL**: https://threejs.org/docs/#examples/en/controls/OrbitControls
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation|Ritual
- **Related**: Camera|EventDispatcher

#### TransformControls

- Interactive transform gizmo for moving rotating scaling objects
- **URL**: https://threejs.org/docs/#examples/en/controls/TransformControls
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Constellation
- **Related**: Object3D|Camera

### Environment

#### Skybox Lab

- AI-driven 360 skybox environment creation tool
- **URL**: https://skybox.blockadelabs.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Related**: CubeTextureLoader|Scene

#### HDRI-to-CubeMap

- Convert HDRI panoramas to CubeMap format for Three.js
- **URL**: https://matheowis.github.io/HDRI-to-CubeMap
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Related**: CubeTextureLoader|PMREMGenerator

#### Three Scatter

- Create scatter and distribution systems within Three.js
- **URL**: https://github.com/dgreenheck/three-scatter
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs
- **Related**: InstancedMesh|BufferGeometry

### Exporters

#### GLTFExporter

- Three.js exporter for saving scenes to glTF/GLB format
- **URL**: https://threejs.org/docs/#examples/en/exporters/GLTFExporter
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation
- **Related**: Scene|Mesh|Material

#### USDZExporter

- Three.js exporter for Apple USDZ AR format
- **URL**: https://threejs.org/docs/#examples/en/exporters/USDZExporter
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual
- **Related**: Mesh|Material

### Framework

#### React Three Fiber

- React renderer for Three.js creating declarative 3D scenes
- **URL**: https://docs.pmnd.rs/react-three-fiber
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Wall|Constellation|Ritual
- **Related**: WebGLRenderer|Scene|Camera

#### Drei

- Collection of reusable helpers and abstractions for R3F
- **URL**: https://drei.pmnd.rs
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Wall|Constellation
- **Related**: Various

#### Threlte

- Three.js framework for Svelte with declarative components
- **URL**: https://threlte.xyz
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall
- **Related**: Scene|WebGLRenderer

#### Tres.js

- Declarative Vue.js framework for Three.js scenes
- **URL**: https://tresjs.org
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall
- **Related**: Scene|WebGLRenderer

#### ThreePipe

- Framework for creating configurable 3D web experiences
- **URL**: https://threepipe.org
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Wall
- **Related**: WebGLRenderer|Scene

#### Hology Engine

- Game engine for creating 3D games for web mobile and VR
- **URL**: https://hology.app
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Pantheon
- **Related**: Scene|WebGLRenderer|Physics

### Interactivity

#### THREE.Interactive

- Simplified interactive object handling for Three.js
- **URL**: https://github.com/markuslerner/THREE.Interactive
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Wall
- **Related**: Raycaster|EventDispatcher

#### Pointer Events

- Framework-agnostic pointer event system for 3D objects
- **URL**: https://github.com/nicedoc/pointer-events
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Wall
- **Related**: Raycaster|EventDispatcher

#### convai

- AI-powered conversational 3D characters
- **URL**: https://convai.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Ritual
- **Related**: AnimationMixer|AudioListener

### Learning

#### Threejs Journey

- Comprehensive Three.js mastery course by Bruno Simon
- **URL**: https://threejs-journey.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Wall|Constellation|Ritual
- **Related**: Various

#### Fragments

- Creative coding and shader art kickstart resource
- **URL**: https://fragments.dev
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: ShaderMaterial

#### WebGL2 & GLSL Primer

- Zero-to-hero spaced repetition guide for WebGL and GLSL
- **URL**: https://webgl2fundamentals.org
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: ShaderMaterial|WebGLRenderer

#### Irradiance

- 3D web development tutorials and guides
- **URL**: https://irradiance.quest
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs
- **Related**: Various

#### Suboptimal Engineer

- YouTube channel covering WebGL shaders and creative 3D
- **URL**: https://youtube.com/@SuboptimalEng
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: ShaderMaterial|Various

#### Robot Bobby

- Creative coding tutorials with THREE.js focus
- **URL**: https://youtube.com/@RobotBobby
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: Various

#### Three.js Roadmap

- Collection of fundamental Three.js courses and paths
- **URL**: https://threejsresources.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Wall|Constellation
- **Related**: Various

### Loaders

#### GLTFLoader

- Official Three.js loader for glTF/GLB 3D models
- **URL**: https://threejs.org/docs/#examples/en/loaders/GLTFLoader
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation
- **Related**: BufferGeometry|Material|AnimationMixer

#### DRACOLoader

- Three.js loader for DRACO compressed geometry data
- **URL**: https://threejs.org/docs/#examples/en/loaders/DRACOLoader
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation
- **Related**: BufferGeometry|GLTFLoader

#### FBXLoader

- Three.js loader for Autodesk FBX model files
- **URL**: https://threejs.org/docs/#examples/en/loaders/FBXLoader
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon
- **Related**: Skeleton|AnimationMixer

#### BVHLoader

- Three.js loader for BVH skeletal animation data
- **URL**: https://threejs.org/docs/#examples/en/loaders/BVHLoader
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon
- **Related**: Skeleton|AnimationMixer

#### SVGLoader

- Three.js loader for SVG vector graphics as 3D geometry
- **URL**: https://threejs.org/docs/#examples/en/loaders/SVGLoader
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Constellation
- **Related**: ShapePath|ExtrudeGeometry

#### HDRLoader

- Three.js loader for HDR environment map images
- **URL**: https://threejs.org/docs/#examples/en/loaders/RGBELoader
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Related**: PMREMGenerator|Scene

### Materials & Textures

#### Polyhaven

- Free high-quality HDRIs textures and 3D models
- **URL**: https://polyhaven.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon|Constellation
- **Related**: TextureLoader|HDRLoader|MeshStandardMaterial

#### AmbientCG

- Free PBR materials and textures for 3D projects
- **URL**: https://ambientcg.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: TextureLoader|MeshStandardMaterial

#### Substance3D

- Adobe professional 3D materials and texture creation
- **URL**: https://substance3d.adobe.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Related**: MeshStandardMaterial|TextureLoader

#### Cosmic Texture Browser

- Matcap browser with live preview for Three.js
- **URL**: https://cosmictexturebrowser.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Related**: MeshMatcapMaterial|TextureLoader

### Models

#### Sketchfab

- Massive 3D model library and marketplace
- **URL**: https://sketchfab.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Constellation
- **Related**: GLTFLoader|OBJLoader

#### Kenney

- Thousands of free game assets including 3D models
- **URL**: https://kenney.nl
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Ritual
- **Related**: GLTFLoader

#### market.pmnd.rs

- Curated tools models and assets for React Three ecosystem
- **URL**: https://market.pmnd.rs
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Wall
- **Related**: GLTFLoader|Various

#### Meshy AI

- AI-generated 3D models from text or image prompts
- **URL**: https://meshy.ai
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon
- **Related**: GLTFLoader|Mesh

#### Tripo AI

- AI 3D model generator for game and web assets
- **URL**: https://tripo3d.ai
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon
- **Related**: GLTFLoader|Mesh

### Performance

#### Spector.js

- WebGL scene inspection and debugging tool
- **URL**: https://spector.babylonjs.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation
- **Related**: WebGLRenderer

#### Stats.js

- Lightweight JavaScript performance monitor showing FPS
- **URL**: https://github.com/mrdoob/stats.js
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation
- **Related**: WebGLRenderer|Clock

#### Three.js DevTools

- Browser extension for inspecting Three.js scene graphs
- **URL**: https://github.com/nicedoc/three-devtools
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation|Wall
- **Related**: Scene|Object3D|Material

#### Needle Inspector

- Chrome extension for inspecting Needle Engine projects
- **URL**: https://needle.tools
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs
- **Related**: Scene|WebGLRenderer

### Physics

#### Rapier

- Fast cross-platform physics engine with WASM backend
- **URL**: https://rapier.rs
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Ritual
- **Related**: Mesh|BufferGeometry

#### Cannon.js

- Lightweight JavaScript physics engine for 3D simulations
- **URL**: https://schteppe.github.io/cannon.js
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Ritual
- **Related**: Mesh|BufferGeometry

#### Ammo.js

- Full-featured JavaScript port of Bullet physics engine
- **URL**: https://github.com/kripken/ammo.js
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Ritual
- **Related**: Mesh|BufferGeometry

#### Jolt Physics

- JavaScript port of JoltPhysics engine
- **URL**: https://github.com/jrouwe/JoltPhysics.js
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual
- **Related**: Mesh|BufferGeometry

### Post-Processing

#### Poimandres Postprocessing

- Comprehensive post-processing effects library for Three.js
- **URL**: https://github.com/pmndrs/postprocessing
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Related**: EffectComposer|WebGLRenderer

#### Ultimate Lens Flare

- Post-processing lens flare effect for Three.js
- **URL**: https://github.com/ektogamat/lensflare-threejs
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs
- **Related**: EffectComposer

#### Three Good Godrays

- Godray volumetric light effect using postprocessing
- **URL**: https://github.com/n8python/goodGodrays
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Related**: EffectComposer|DirectionalLight

#### EffectComposer

- Three.js post-processing pipeline manager
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/EffectComposer
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Related**: WebGLRenderer|ShaderPass

#### UnrealBloomPass

- Bloom glow effect pass for Three.js post-processing
- **URL**: https://threejs.org/docs/#examples/en/postprocessing/UnrealBloomPass
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Related**: EffectComposer

### Rendering

#### Three.js GPU PathTracer

- GPU-accelerated path tracing renderer for Three.js
- **URL**: https://github.com/gkjohnson/three-gpu-pathtracer
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon
- **Related**: WebGLRenderer|MeshStandardMaterial

#### Tinybvh

- Minimal bounding volume hierarchy library for ray tracing
- **URL**: https://github.com/jbikker/tinybvh
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs
- **Related**: Raycaster|BufferGeometry

#### vis.gl

- GPU-powered WebGL visualization frameworks by Uber
- **URL**: https://vis.gl
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Wall
- **Related**: WebGLRenderer

#### CSS3DRenderer

- Three.js renderer for CSS 3D transformed DOM elements
- **URL**: https://threejs.org/docs/#examples/en/renderers/CSS3DRenderer
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall
- **Related**: CSS3DRenderer|CSS3DObject

### Shaders

#### Shadertoy

- Community platform for creating and sharing GLSL shaders
- **URL**: https://shadertoy.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: ShaderMaterial|RawShaderMaterial

#### Nodetoy

- Visual node-based shader editor for WebGL
- **URL**: https://nodetoy.io
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: ShaderMaterial|NodeMaterial

#### The Book of Shaders

- Interactive guide to mastering GLSL fragment shaders
- **URL**: https://thebookofshaders.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: ShaderMaterial|RawShaderMaterial

#### Shaders.app

- Interactive GLSL shader editor and playground
- **URL**: https://shaders.app
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs
- **Related**: ShaderMaterial

#### TSL Graph

- Visual node editor for Three.js Shading Language
- **URL**: https://threejsresources.com/tools
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: NodeMaterial|TSL

#### GLSL Viewer

- Online WebGL shader editor and preview tool
- **URL**: https://glslviewer.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs
- **Related**: ShaderMaterial

### Tools

#### GLB Optimizer

- Compress and optimize GLB/GLTF models for web delivery
- **URL**: https://glb.babylonpress.org
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation
- **Related**: GLTFLoader|BufferGeometry

#### OptimizeGLB

- Compress GLB and GLTF models with Draco and texture optimization
- **URL**: https://optimizeglb.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation
- **Related**: GLTFLoader|DRACOLoader

#### Meshamorphosis

- Batch converter for FBX OBJ and GLTF model formats
- **URL**: https://meshamorphosis.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Constellation
- **Related**: GLTFLoader|OBJLoader|FBXLoader

#### GLTF/GLB Viewer for VS Code

- VS Code extension for previewing 3D models inline
- **URL**: https://marketplace.visualstudio.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Constellation
- **Related**: GLTFLoader

#### MSDF Font Generator

- Generate multi-channel signed distance field fonts for WebGL text
- **URL**: https://msdf-bmfont-xml.donmccurdy.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Pantheon
- **Related**: ShaderMaterial|BufferGeometry

#### Troika Three Text

- High-quality SDF text rendering library for Three.js
- **URL**: https://protectwise.github.io/troika/troika-three-text
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Pantheon
- **Related**: Mesh|ShaderMaterial

#### Three MSDF Text

- MSDF-based text rendering utility for Three.js
- **URL**: https://github.com/leoncvlt/three-msdf-text
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Pantheon
- **Related**: ShaderMaterial|Mesh

#### Facetype.js

- Convert fonts to Three.js JSON format for TextGeometry
- **URL**: https://gero3.github.io/facetype.js
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Pantheon
- **Related**: TextGeometry|FontLoader

#### lil-gui

- Lightweight floating panel controller library for parameters
- **URL**: https://lil-gui.georgealways.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation|Ritual
- **Related**: Various

#### Tweakpane

- Compact pane-based UI control panel library
- **URL**: https://tweakpane.github.io/docs
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation
- **Related**: Various

#### Dat.gui

- Classic lightweight controller library for Three.js parameters
- **URL**: https://github.com/dataarts/dat.gui
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation
- **Related**: Various

#### Leva

- React-first GUI controls library for R3F projects
- **URL**: https://github.com/pmndrs/leva
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Wall
- **Related**: Various

#### EZ-Tree

- Procedural tree generation tool for Three.js scenes
- **URL**: https://github.com/dgreenheck/ez-tree
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs
- **Related**: BufferGeometry|InstancedMesh

#### Threedsvg

- Convert SVG paths to extruded 3D logos and shapes
- **URL**: https://threedsvg.com
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Constellation
- **Related**: ExtrudeGeometry|SVGLoader

#### hex-to-glsl

- Convert hex color codes to GLSL vec3/vec4 vectors
- **URL**: https://hexto.glsl.app
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation
- **Related**: ShaderMaterial

#### R3F Flow Field Particles

- GPGPU particle system for React Three Fiber
- **URL**: https://github.com/pmndrs/r3f-flow-field
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs
- **Related**: Points|ShaderMaterial|BufferGeometry

#### Wiggle

- Dynamic motion effects utility for natural movement
- **URL**: https://github.com/pmndrs/wiggle
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs
- **Related**: Object3D|AnimationMixer

#### webglstudio

- Browser-based 3D development environment
- **URL**: https://webglstudio.org
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs|Constellation
- **Related**: Scene|WebGLRenderer

#### Triplex

- No-code visual builder for 2D and 3D web experiences
- **URL**: https://triplex.dev
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Pantheon
- **Related**: Scene|Mesh|Material

### Utilities

#### BufferGeometryUtils

- Utility functions for merging and manipulating geometries
- **URL**: https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs
- **Related**: BufferGeometry|Mesh

#### SkeletonUtils

- Skeleton and animation utility functions for retargeting
- **URL**: https://threejs.org/docs/#examples/en/utils/SkeletonUtils
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon
- **Related**: Skeleton|AnimationMixer|Bone

### VR/AR/XR

#### A-Frame

- Web framework for building 3D and VR experiences with HTML
- **URL**: https://aframe.io
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual
- **Related**: WebGLRenderer|WebXRManager

#### Hyperfy

- WebXR platform for persistent 3D virtual worlds
- **URL**: https://hyperfy.io
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual
- **Related**: WebXRManager|Scene

#### Zappar

- Augmented reality platform for web and mobile experiences
- **URL**: https://zap.works
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual
- **Related**: WebXRManager|Camera

#### Mattercraft

- Visual editor for 3D AR VR and WebXR experiences
- **URL**: https://zap.works/mattercraft
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual
- **Related**: WebXRManager|Scene

### Viewers

#### Modelviewer.dev

- Google web component for easy 3D model display
- **URL**: https://modelviewer.dev
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Wall
- **Related**: GLTFLoader

---

## JavaScript Libraries (Awesome JS) (299 entries)

### Animation

#### Anime.js

- Lightweight JavaScript animation library
- **URL**: https://animejs.com/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Pantheon|Orbs|Wall

#### GSAP

- Professional-grade animation platform
- **URL**: https://gsap.com/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Pantheon|Orbs|Wall|Ritual

#### Animate.css

- Cross-browser library of CSS animations
- **URL**: https://animate.style/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Wall

#### React Spring

- Spring-physics based React animation library
- **URL**: https://react-spring.dev/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Wall|Orbs|Pantheon

#### Framer Motion

- Production-ready React animation library
- **URL**: https://www.framer.com/motion/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Wall|Pantheon

#### anime.js

- JavaScript animation engine
- **URL**: https://animejs.com/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Pantheon|Orbs|Wall

#### GreenSock ScrollTrigger

- Scroll-based animation triggering
- **URL**: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Pantheon|Wall|Ritual

#### Lottie

- Render After Effects animations natively on web
- **URL**: https://airbnb.io/lottie/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon|Wall

#### Theatre.js

- Animation toolbox for web
- **URL**: https://www.theatrejs.com/
- **Scores**: prod=0.8 | learn=0.9 | blender=0.0 | priority=0.89
- **Projects**: Pantheon|Orbs

#### AOS

- Animate on scroll library
- **URL**: https://michalsnik.github.io/aos/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall

#### tsParticles

- TypeScript particles animation library
- **URL**: https://particles.js.org/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Orbs|Constellation

#### AutoAnimate

- Zero-config drop-in animation utility
- **URL**: https://auto-animate.formkit.com/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall

#### Motion One

- Web Animations API powered library
- **URL**: https://motion.dev/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall|Pantheon

#### Barba.js

- Fluid page transitions between pages
- **URL**: https://barba.js.org/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall

#### Locomotive Scroll

- Smooth scroll and parallax library
- **URL**: https://locomotivemtl.github.io/locomotive-scroll/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall|Ritual

#### Velocity.js

- Accelerated JavaScript animation engine
- **URL**: http://velocityjs.org/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Pantheon|Wall

#### Tween.js

- JavaScript tweening engine for smooth animations
- **URL**: https://tweenjs.github.io/tween.js/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Orbs|Pantheon

#### ScrollMagic

- Scroll interaction and animation library
- **URL**: http://scrollmagic.io/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall|Ritual

#### Mo.js

- Motion graphics library with declarative API
- **URL**: https://mojs.github.io/
- **Scores**: prod=0.7 | learn=0.8 | blender=0.0 | priority=0.82
- **Projects**: Pantheon|Orbs

#### TweenJS

- Tweening and animation library from CreateJS
- **URL**: https://www.createjs.com/tweenjs
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Pantheon|Orbs

#### particlesJS

- Lightweight particles animation library
- **URL**: https://vincentgarreau.com/particles.js/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Orbs|Constellation

#### Popmotion

- Animator's toolbox for JavaScript
- **URL**: https://popmotion.io/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Pantheon|Wall

#### Rellax

- Lightweight vanilla parallax library
- **URL**: https://dixonandmoe.com/rellax/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### CountUp.js

- Animating a numerical value by counting up
- **URL**: https://inorganik.github.io/countUp.js/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### Dynamics.js

- Physics-based animations for interfaces
- **URL**: http://dynamicsjs.com/
- **Scores**: prod=0.6 | learn=0.7 | blender=0.0 | priority=0.75
- **Projects**: Orbs|Pantheon

#### AlloyFinger

- Smooth animations and gesture support
- **URL**: https://github.com/AlioyTeam/AlloyFinger
- **Scores**: prod=0.6 | learn=0.6 | blender=0.0 | priority=0.72
- **Projects**: Ritual

#### Bounce.js

- Create delightful CSS3 powered animations
- **URL**: http://bouncejs.com/
- **Scores**: prod=0.5 | learn=0.6 | blender=0.0 | priority=0.68
- **Projects**: Wall

#### Anima

- Minimal JavaScript animation library
- **URL**: https://animajs.com/
- **Scores**: prod=0.3 | learn=0.5 | blender=0.0 | priority=0.57
- **Projects**: Wall

### Audio

#### Howler.js

- Modern Web Audio API wrapper for sound control
- **URL**: https://howlerjs.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon|Ritual

#### Tone.js

- WebAudio framework for interactive music
- **URL**: https://tonejs.github.io/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon|Ritual|Orbs

#### MediaElement.js

- HTML5 audio/video player with plugin support
- **URL**: https://www.mediaelement.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Pantheon

#### SoundJS

- Simple API for working with audio from CreateJS
- **URL**: https://www.createjs.com/soundjs
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Pantheon

#### jPlayer

- jQuery HTML5 audio and video plugin
- **URL**: https://jplayer.org/
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### JuliusJS

- Speech recognition library for the web
- **URL**: https://github.com/zzmp/juliusjs
- **Scores**: prod=0.3 | learn=0.6 | blender=0.0 | priority=0.6
- **Projects**: Pantheon

### Build Tools

#### Vite

- Next generation frontend build tool
- **URL**: https://vitejs.dev/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Infrastructure

#### Storybook

- UI component development environment
- **URL**: https://storybook.js.org/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Infrastructure|Wall

#### webpack

- Module bundler for JavaScript applications
- **URL**: https://webpack.js.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### Rollup

- Next-generation ES module bundler
- **URL**: https://rollupjs.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### ESLint

- Pluggable JavaScript and JSX linting utility
- **URL**: https://eslint.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### Prettier

- Opinionated code formatter
- **URL**: https://prettier.io/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### esbuild

- Extremely fast JavaScript bundler
- **URL**: https://esbuild.github.io/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Infrastructure

#### Parcel

- Zero-configuration web application bundler
- **URL**: https://parceljs.org/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Infrastructure

#### SystemJS

- Universal module loader
- **URL**: https://github.com/systemjs/systemjs
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### ESDoc

- Good documentation generator for JavaScript
- **URL**: https://esdoc.org/
- **Scores**: prod=0.6 | learn=0.6 | blender=0.0 | priority=0.72
- **Projects**: Infrastructure

#### RequireJS

- File and module loader for JavaScript
- **URL**: https://requirejs.org/
- **Scores**: prod=0.6 | learn=0.5 | blender=0.0 | priority=0.69
- **Projects**: Infrastructure

#### browserify

- Browser-side require() the Node.js way
- **URL**: https://browserify.org/
- **Scores**: prod=0.6 | learn=0.5 | blender=0.0 | priority=0.69
- **Projects**: Infrastructure

#### dox

- JavaScript documentation generator producing JSON
- **URL**: https://github.com/tj/dox
- **Scores**: prod=0.6 | learn=0.5 | blender=0.0 | priority=0.69
- **Projects**: Infrastructure

### Canvas

#### p5.js

- Creative coding library inspired by Processing
- **URL**: https://p5js.org/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Orbs|Constellation|Pantheon

#### Fabric.js

- Canvas library with SVG-to-Canvas parser
- **URL**: http://fabricjs.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Constellation|Wall

#### Paper.js

- Vector graphics scripting framework
- **URL**: http://paperjs.org/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Constellation|Orbs

#### Konva

- 2D canvas framework for desktop and mobile
- **URL**: https://konvajs.org/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Constellation|Wall

#### svg.js

- Lightweight library for manipulating and animating SVG
- **URL**: https://svgjs.dev/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Constellation|Wall

#### Rough.js

- Create graphics with hand-drawn sketchy appearance
- **URL**: https://roughjs.com/
- **Scores**: prod=0.7 | learn=0.8 | blender=0.0 | priority=0.82
- **Projects**: Constellation|Wall

#### Two.js

- Renderer-agnostic 2D drawing API
- **URL**: https://two.js.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Constellation|Orbs

#### Snap.svg

- SVG animation library by Adobe
- **URL**: http://snapsvg.io/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Constellation

#### heatmap.js

- HTML5 canvas-based heatmaps
- **URL**: https://www.patrick-wied.at/static/heatmapjs/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Constellation

#### Raphael

- Cross-browser vector graphics library
- **URL**: https://dmitrybaranovskiy.github.io/raphael/
- **Scores**: prod=0.6 | learn=0.5 | blender=0.0 | priority=0.69
- **Projects**: Constellation

### DOM

#### jQuery

- Fast small feature-rich DOM manipulation library
- **URL**: https://jquery.com/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Wall

#### Cheerio

- Core jQuery for server-side HTML parsing
- **URL**: https://cheerio.js.org/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Infrastructure

#### Zepto.js

- Lightweight jQuery alternative for modern browsers
- **URL**: https://zeptojs.com/
- **Scores**: prod=0.6 | learn=0.5 | blender=0.0 | priority=0.69
- **Projects**: Wall

### Data Visualization

#### D3.js

- Data-driven visualization library for HTML and SVG
- **URL**: https://d3js.org/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Constellation|Wall

#### Chart.js

- Simple HTML5 charts using canvas
- **URL**: https://www.chartjs.org/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Wall|Constellation

#### ECharts

- Enterprise-grade charting library by Apache
- **URL**: https://echarts.apache.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall|Constellation

#### Plotly.js

- High-level charting library for interactive graphs
- **URL**: https://plotly.com/javascript/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Constellation|Wall

#### Recharts

- Composable charting library built on React and D3
- **URL**: https://recharts.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall|Constellation

#### Cytoscape.js

- Fully featured graph theory library
- **URL**: https://js.cytoscape.org/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Constellation

#### ApexCharts.js

- Modern charting library with simple API
- **URL**: https://apexcharts.com/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall

#### Nivo

- Supercharged React dataviz components
- **URL**: https://nivo.rocks/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall|Constellation

#### amCharts

- Advanced charting library for JS/TS
- **URL**: https://www.amcharts.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Victory

- Composable React components for visualization
- **URL**: https://formidable.com/open-source/victory/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Sigma.js

- JavaScript library dedicated to graph drawing
- **URL**: http://sigmajs.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Constellation

#### G2

- Data-driven visualization grammar for statistical charts
- **URL**: https://g2.antv.antgroup.com/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Constellation

#### G6

- Graph visualization engine by AntV
- **URL**: https://g6.antv.antgroup.com/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Constellation

#### C3.js

- D3-based reusable chart library
- **URL**: https://c3js.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### BillBoard.js

- D3-based reusable chart library
- **URL**: https://naver.github.io/billboard.js/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### Frappe Charts

- Simple responsive modern SVG charts
- **URL**: https://frappe.io/charts
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### CanvasJS

- Responsive HTML5 charting with high performance
- **URL**: https://canvasjs.com/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### react-vis

- React components for data visualization by Uber
- **URL**: https://uber.github.io/react-vis/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### Chartist.js

- Simple responsive chart library built with SVG
- **URL**: https://gionkunz.github.io/chartist-js/
- **Scores**: prod=0.6 | learn=0.6 | blender=0.0 | priority=0.72
- **Projects**: Wall

### Date/Time

#### date-fns

- Modern JavaScript date utility library
- **URL**: https://date-fns.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### Day.js

- 2KB immutable date library alternative to Moment
- **URL**: https://day.js.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### Luxon

- DateTime library by Moment team
- **URL**: https://moment.github.io/luxon/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Infrastructure

#### Moment.js

- Parse validate manipulate and display dates
- **URL**: https://momentjs.com/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Infrastructure

#### Tempo

- Tree-shakable date library for native Date
- **URL**: https://tempo.formkit.com/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Infrastructure

#### timeago.js

- Sub-2kb time-ago formatting library
- **URL**: https://timeago.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

### Editors

#### CodeMirror

- Versatile in-browser code editor
- **URL**: https://codemirror.net/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### Monaco Editor

- Code editor powering VS Code
- **URL**: https://microsoft.github.io/monaco-editor/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### Quill

- Modern rich text editor with cross-browser support
- **URL**: https://quilljs.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### ace

- Ajax.org Cloud9 code editor
- **URL**: https://ace.c9.io/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Wall

#### TinyMCE

- JavaScript rich text editor
- **URL**: https://www.tiny.cloud/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Wall

#### Trix

- Rich text editor for everyday writing
- **URL**: https://trix-editor.org/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### jsoneditor

- Web-based JSON viewing and editing tool
- **URL**: https://jsoneditoronline.org/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### medium-editor

- Medium.com WYSIWYG editor clone
- **URL**: https://yabwe.github.io/medium-editor/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### Trumbowyg

- Lightweight WYSIWYG editor
- **URL**: https://alex-d.github.io/Trumbowyg/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### Summernote

- Super simple WYSIWYG editor
- **URL**: https://summernote.org/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

### Forms

#### Zod

- TypeScript-first schema validation
- **URL**: https://zod.dev/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Infrastructure|Wall

#### Flatpickr

- Lightweight dependency-free date picker
- **URL**: https://flatpickr.js.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### validator.js

- String validation and sanitization utility
- **URL**: https://github.com/chriso/validator.js
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Infrastructure

#### Yup

- JavaScript schema builder and validator
- **URL**: https://github.com/jquense/yup
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Infrastructure|Wall

#### Select2

- Enhanced select boxes with search
- **URL**: https://select2.org/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Cleave.js

- Format input fields as you type
- **URL**: https://nosir.github.io/cleave.js/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Inputmask

- Input masking for predefined formats
- **URL**: https://robinherbots.github.io/Inputmask/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Dropzone

- Drag-and-drop file upload with previews
- **URL**: https://www.dropzone.dev/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Parsley.js

- Frontend form validation library
- **URL**: https://parsleyjs.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### vest

- Declarative form validation inspired by testing
- **URL**: https://vestjs.dev/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### Selectize.js

- Customizable select and autocomplete control
- **URL**: https://selectize.dev/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### AutoNumeric.js

- Live currency and number formatting
- **URL**: https://autonumeric.org/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### Chosen

- jQuery plugin for select customization
- **URL**: https://harvesthq.github.io/chosen/
- **Scores**: prod=0.6 | learn=0.5 | blender=0.0 | priority=0.69
- **Projects**: Wall

### Gesture

#### Hammer.js

- Multi-touch gesture recognition library
- **URL**: https://hammerjs.github.io/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Ritual

#### Touchemulator

- Touch behavior emulation for testing
- **URL**: https://github.com/hammerjs/touchemulator
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual

### HTTP

#### Axios

- Promise-based HTTP client for browser and Node
- **URL**: https://axios-http.com/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Infrastructure

#### Socket.io

- Real-time bidirectional event-based communication
- **URL**: https://socket.io/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure|Pantheon

#### node-fetch

- Lightweight fetch API for Node.js
- **URL**: https://github.com/node-fetch/node-fetch
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### ky

- Tiny HTTP client based on Fetch
- **URL**: https://github.com/sindresorhus/ky
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Deepstream.io

- Realtime server for collaborative applications
- **URL**: https://deepstream.io/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Infrastructure

#### SuperAgent

- Lightweight HTTP request library
- **URL**: https://github.com/ladjs/superagent
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### Primus

- Universal wrapper for real-time frameworks
- **URL**: https://github.com/primus/primus
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### SocketCluster

- Highly scalable realtime microframework
- **URL**: https://socketcluster.io/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

### Image Processing

#### Jimp

- Image processing library for Node.js
- **URL**: https://jimp-dev.github.io/jimp/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### tracking.js

- Computer vision library for the web
- **URL**: https://trackingjs.com/
- **Scores**: prod=0.6 | learn=0.7 | blender=0.0 | priority=0.75
- **Projects**: Ritual|Pantheon

#### CamanJS

- Canvas image manipulation with filters
- **URL**: http://camanjs.com/
- **Scores**: prod=0.6 | learn=0.6 | blender=0.0 | priority=0.72
- **Projects**: Wall

#### ocrad.js

- OCR in JavaScript via Emscripten
- **URL**: https://antimatter15.github.io/ocrad.js/
- **Scores**: prod=0.5 | learn=0.6 | blender=0.0 | priority=0.68
- **Projects**: Infrastructure

### Machine Learning

#### TensorFlow.js

- ML library for JavaScript and Node
- **URL**: https://www.tensorflow.org/js
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Infrastructure|Pantheon

#### Brain.js

- GPU-accelerated neural networks in JavaScript
- **URL**: https://brain.js.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Infrastructure

#### ConvNetJS

- Deep learning in JavaScript browser
- **URL**: https://cs.stanford.edu/people/karpathy/convnetjs/
- **Scores**: prod=0.5 | learn=0.8 | blender=0.0 | priority=0.74
- **Projects**: Infrastructure

#### Synaptic.js

- Architecture-free neural network library
- **URL**: https://caza.la/synaptic/
- **Scores**: prod=0.5 | learn=0.7 | blender=0.0 | priority=0.71
- **Projects**: Infrastructure

### Maps

#### Leaflet

- Interactive mobile-friendly mapping library
- **URL**: https://leafletjs.com/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Wall

#### Mapbox GL JS

- WebGL-powered interactive vector maps
- **URL**: https://www.mapbox.com/mapbox-gljs
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall|Orbs

#### OpenLayers

- High-performance mapping library
- **URL**: https://openlayers.org/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

### Routing

#### Express

- Fast unopinionated minimalist web framework
- **URL**: https://expressjs.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### Fastify

- Fast and low overhead web framework
- **URL**: https://fastify.dev/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### Koa

- Next-generation web framework with async/await
- **URL**: https://koajs.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Hapi

- Rich framework for building apps and services
- **URL**: https://hapi.dev/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Adonis.js

- Node.js web framework with ergonomics focus
- **URL**: https://adonisjs.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

### State Management

#### Zustand

- Small fast scalable React state management
- **URL**: https://zustand-demo.pmnd.rs/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Wall

#### RxJS

- Reactive programming library using Observables
- **URL**: https://rxjs.dev/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure|Wall

#### MobX

- Transparent functional reactive state management
- **URL**: https://mobx.js.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### Redux

- Predictable state container for JS apps
- **URL**: https://redux.js.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall|Infrastructure

#### Jotai

- Primitive flexible React state management
- **URL**: https://jotai.org/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall

#### Recoil

- State management for React from Facebook
- **URL**: https://recoiljs.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

### Templating

#### Pug

- Robust elegant template engine for Node.js
- **URL**: https://pugjs.org/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### EJS

- Effective JavaScript templating
- **URL**: https://ejs.co/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Handlebars

- Mustache-compatible semantic templating
- **URL**: https://handlebarsjs.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Nunjucks

- Rich powerful templating by Mozilla
- **URL**: https://mozilla.github.io/nunjucks/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

### Testing

#### Jest

- JavaScript testing framework with simplicity focus
- **URL**: https://jestjs.io/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Infrastructure

#### Playwright

- Node.js library for browser automation
- **URL**: https://playwright.dev/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Infrastructure

#### Cypress

- Fast reliable E2E testing for web
- **URL**: https://www.cypress.io/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Infrastructure

#### Mocha

- Flexible test framework for Node.js and browser
- **URL**: https://mochajs.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### Chai

- BDD/TDD assertion library for Node.js
- **URL**: https://www.chaijs.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Jasmine

- BDD testing framework for JavaScript
- **URL**: https://jasmine.github.io/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Sinon.js

- Test spies stubs and mocks for JavaScript
- **URL**: https://sinonjs.org/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Nock

- HTTP mocking and expectations library
- **URL**: https://github.com/nock/nock
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Nightwatch.js

- E2E testing against Selenium server
- **URL**: https://nightwatchjs.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Infrastructure

#### QUnit

- Unit testing framework for JavaScript
- **URL**: https://qunitjs.com/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

### Typography

#### Typed.js

- Typing animation library
- **URL**: https://mattboldt.com/demos/typed-js/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall|Pantheon

#### OpenType.js

- JavaScript parser for OpenType and TrueType fonts
- **URL**: https://opentype.js.org/
- **Scores**: prod=0.7 | learn=0.8 | blender=0.0 | priority=0.82
- **Projects**: Pantheon|Wall

#### TypeIt

- Most versatile JavaScript typewriter effect
- **URL**: https://typeitjs.com/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall|Pantheon

#### Splitting.js

- CSS variable-driven text splitting
- **URL**: https://splitting.js.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall|Pantheon

#### Fitty

- Snugly resize text to fit its parent
- **URL**: https://rikschennink.github.io/fitty/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### Lettering.js

- jQuery font manipulation plugin
- **URL**: https://letteringjs.com/
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

### UI

#### React

- Library for building user interfaces with components
- **URL**: https://react.dev/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Wall|Infrastructure

#### Vue.js

- Intuitive fast composable MVVM framework
- **URL**: https://vuejs.org/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Wall

#### Svelte

- Compiler-based UI framework
- **URL**: https://svelte.dev/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Wall

#### Swiper

- Modern mobile touch slider
- **URL**: https://swiperjs.com/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Wall|Ritual

#### Angular

- Platform for building mobile and desktop web apps
- **URL**: https://angular.dev/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### SortableJS

- Reorderable drag-and-drop lists
- **URL**: https://sortablejs.github.io/Sortable/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### reveal.js

- HTML presentation framework
- **URL**: https://revealjs.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall|Pantheon

#### SweetAlert2

- Beautiful responsive customizable popups
- **URL**: https://sweetalert2.github.io/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### Popper.js

- Tooltip and popover positioning engine
- **URL**: https://popper.js.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### AG Grid

- Enterprise-grade data grid component
- **URL**: https://www.ag-grid.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### FullCalendar

- Full-sized drag-and-drop event calendar
- **URL**: https://fullcalendar.io/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### React Native

- Framework for building native mobile apps with React
- **URL**: https://reactnative.dev/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### Electron

- Build cross-platform desktop apps with web tech
- **URL**: https://www.electronjs.org/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall|Infrastructure

#### Tauri

- Build smaller faster more secure desktop apps
- **URL**: https://tauri.app/
- **Scores**: prod=0.8 | learn=0.9 | blender=0.0 | priority=0.89
- **Projects**: Wall|Infrastructure

#### Alpine.js

- Reactive nature of Vue/React at low cost
- **URL**: https://alpinejs.dev/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall

#### Splide

- Accessible flexible carousel in TypeScript
- **URL**: https://splidejs.com/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall

#### Keen Slider

- Mobile-friendly slider library
- **URL**: https://keen-slider.io/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall

#### PhotoSwipe

- Mobile/desktop image gallery with gestures
- **URL**: https://photoswipe.com/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall

#### driver.js

- Lightweight vanilla JS focus engine for tours
- **URL**: https://driverjs.com/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Wall

#### Preact

- Fast 3kB React alternative with same API
- **URL**: https://preactjs.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Ember.js

- Framework for ambitious web applications
- **URL**: https://emberjs.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Slick

- Feature-rich carousel jQuery plugin
- **URL**: https://kenwheeler.github.io/slick/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Glide.js

- Dependency-free lightweight slider
- **URL**: https://glidejs.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### FullPage.js

- Fullscreen scrolling website tool
- **URL**: https://alvarotrigo.com/fullPage/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall|Ritual

#### NProgress

- Slim progress bars for Ajax applications
- **URL**: https://ricostacruz.com/nprogress/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Micromodal

- Lightweight accessible modal library
- **URL**: https://micromodal.vercel.app/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### toastr

- Simple JavaScript toast notifications
- **URL**: https://codeseven.github.io/toastr/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### intro.js

- Feature introduction and user guide framework
- **URL**: https://introjs.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### shepherd

- Guide users through app experiences
- **URL**: https://shepherdjs.dev/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### HANDSONTABLE

- JavaScript/HTML5 spreadsheet for developers
- **URL**: https://handsontable.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### DataTables

- jQuery plugin for dynamic data tables
- **URL**: https://datatables.net/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### TimelineJS3

- Storytelling timeline built in JavaScript
- **URL**: https://timeline.knightlab.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall|Pantheon

#### Mithril.js

- Client-side MVC framework under 10kb
- **URL**: https://mithril.js.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### Million

- Sub-1kb compiler-focused virtual DOM
- **URL**: https://million.dev/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### impress.js

- Prezi-like presentation framework
- **URL**: https://impress.js.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### ProgressBar.js

- Responsive animated progress bars
- **URL**: https://kimmobrunfeldt.github.io/progressbar.js/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall|Orbs

#### iziToast

- Elegant responsive notification plugin
- **URL**: https://izitoast.marcelodolza.com/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### notie

- Clean notification and input suite
- **URL**: https://jaredreich.com/notie/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### toastify-js

- Pure JavaScript toast notification library
- **URL**: https://apvarun.github.io/toastify-js/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### Notyf

- Minimalistic responsive toast library
- **URL**: https://carlosroso.com/notyf/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### Frappe Datatable

- Simple modern interactive datatable library
- **URL**: https://frappe.io/datatable
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### Jspreadsheet CE

- Lightweight vanilla JS interactive tables
- **URL**: https://bossanova.uk/jspreadsheet/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### RevoGrid

- Fast responsive Excel-like data grid
- **URL**: https://revolist.github.io/revogrid/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### Vis Timeline

- Interactive timelines and 2D graphs
- **URL**: https://visjs.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall|Constellation

#### React-Chrono

- React timeline component in various formats
- **URL**: https://react-chrono.prabhumurthy.com/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Wall

#### Inferno

- Extremely fast React-like library
- **URL**: https://infernojs.org/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### Pace

- Automatic page load progress bar
- **URL**: https://codebyzach.github.io/pace/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### Tingle.js

- 2kB vanilla modal plugin
- **URL**: https://tingle.robinparisi.com/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### Meteor

- Ultra-simple full-stack JavaScript platform
- **URL**: https://www.meteor.com/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### Hyperapp

- 1kb library for building frontend applications
- **URL**: https://github.com/hyperapp/hyperapp
- **Scores**: prod=0.6 | learn=0.7 | blender=0.0 | priority=0.75
- **Projects**: Wall

#### Backbone.js

- MVC framework giving structure to JS apps
- **URL**: https://backbonejs.org/
- **Scores**: prod=0.7 | learn=0.5 | blender=0.0 | priority=0.73
- **Projects**: Wall

#### Labella.js

- Timeline label layout by Twitter
- **URL**: https://twitter.github.io/labella.js/
- **Scores**: prod=0.6 | learn=0.6 | blender=0.0 | priority=0.72
- **Projects**: Wall|Constellation

#### Timesheet.js

- Simple timeline library with HTML5 and CSS3
- **URL**: https://sbstjn.github.io/timesheet.js/
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

### Utilities

#### Prisma

- Next-generation ORM for Node.js and TypeScript
- **URL**: https://www.prisma.io/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Infrastructure

#### Lodash

- Modern utility library with performance focus
- **URL**: https://lodash.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### localForage

- Offline storage using IndexedDB/WebSQL/localStorage
- **URL**: https://localforage.github.io/localForage/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure|Wall

#### i18next

- Internationalization framework for JavaScript
- **URL**: https://www.i18next.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure|Wall

#### Papa Parse

- Powerful CSV parsing and export library
- **URL**: https://www.papaparse.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### Fuse.js

- Lightweight fuzzy-search library
- **URL**: https://www.fusejs.io/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall|Infrastructure

#### nodemon

- Monitor source changes and restart server
- **URL**: https://nodemon.io/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### Inquirer.js

- Collection of interactive CLI prompts
- **URL**: https://github.com/SBoudrias/Inquirer.js
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Infrastructure

#### Stripe.js

- Stripe payment integration client library
- **URL**: https://stripe.com/docs/js
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall|Infrastructure

#### DOMPurify

- DOM-only XSS sanitizer for HTML/SVG
- **URL**: https://github.com/cure53/DOMPurify
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Infrastructure

#### PDF.js

- PDF viewer built with HTML5
- **URL**: https://mozilla.github.io/pdf.js/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Wall

#### PM2

- Production process manager with load balancer
- **URL**: https://pm2.keymetrics.io/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Infrastructure

#### Sequelize

- Promise-based ORM for multiple SQL databases
- **URL**: https://sequelize.org/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Infrastructure

#### Ghost

- Open source publishing platform
- **URL**: https://ghost.org/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Infrastructure

#### Winston

- Multi-transport async logging library
- **URL**: https://github.com/winstonjs/winston
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Infrastructure

#### Pino

- Very low overhead Node.js logger
- **URL**: https://getpino.io/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Infrastructure

#### Nodemailer

- Send emails with Node.js
- **URL**: https://nodemailer.com/
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Infrastructure

#### Ramda

- Practical functional library for JavaScript
- **URL**: https://ramdajs.com/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Infrastructure

#### Dexie.js

- Friendly IndexedDB wrapper library
- **URL**: https://dexie.org/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Infrastructure|Wall

#### chroma.js

- JavaScript library for color manipulations
- **URL**: https://gka.github.io/chroma.js/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Orbs|Constellation

#### Math.js

- Extensive math library for JavaScript and Node
- **URL**: https://mathjs.org/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Infrastructure|Orbs

#### faker.js

- Generate massive amounts of fake data
- **URL**: https://fakerjs.dev/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Infrastructure

#### Node-RED

- Flow-based programming for IoT
- **URL**: https://nodered.org/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Orbs|Infrastructure

#### Mousetrap

- Simple keyboard shortcut handling
- **URL**: https://craig.is/killing/mice
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall|Infrastructure

#### Async

- Utility module for asynchronous JavaScript
- **URL**: https://camel.apache.org/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### PouchDB

- Browser database inspired by CouchDB
- **URL**: https://pouchdb.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### js-cookie

- Simple lightweight cookie handling
- **URL**: https://github.com/js-cookie/js-cookie
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Format.js

- JavaScript libraries for internationalization
- **URL**: https://formatjs.io/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### jsPDF

- Client-side JavaScript PDF generation
- **URL**: https://parall.ax/products/jspdf
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### PDFKit

- JavaScript PDF generation library for Node
- **URL**: https://pdfkit.org/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Lunr.js

- Client-side full-text search for static sites
- **URL**: https://lunrjs.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Objection.js

- SQL-friendly ORM built on Knex for Node.js
- **URL**: https://vincit.github.io/objection.js/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Clinic.js

- Tools for diagnosing Node.js performance
- **URL**: https://clinicjs.org/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

#### Johnny-Five

- JavaScript robotics programming framework
- **URL**: https://johnny-five.io/
- **Scores**: prod=0.7 | learn=0.8 | blender=0.0 | priority=0.82
- **Projects**: Orbs

#### Underscore

- Functional programming helpers without extending objects
- **URL**: https://underscorejs.org/
- **Scores**: prod=0.8 | learn=0.6 | blender=0.0 | priority=0.8
- **Projects**: Infrastructure

#### query-string

- Parse and stringify URL query strings
- **URL**: https://github.com/sindresorhus/query-string
- **Scores**: prod=0.8 | learn=0.6 | blender=0.0 | priority=0.8
- **Projects**: Infrastructure

#### SSH2

- SSH2 client and server modules for Node.js
- **URL**: https://github.com/mscdex/ssh2
- **Scores**: prod=0.8 | learn=0.6 | blender=0.0 | priority=0.8
- **Projects**: Infrastructure

#### sql.js

- SQLite compiled to JavaScript via Emscripten
- **URL**: https://sql.js.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Infrastructure

#### TinyColor

- Fast small color manipulation and conversion
- **URL**: https://bgrins.github.io/TinyColor/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Orbs|Wall

#### Chance.js

- Random generator for strings numbers and more
- **URL**: https://chancejs.com/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Infrastructure

#### blessed-contrib

- Terminal dashboard widgets with ASCII art
- **URL**: https://github.com/yaronn/blessed-contrib
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Infrastructure

#### Remult

- CRUD framework for full-stack TypeScript
- **URL**: https://remult.dev/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Infrastructure

#### KeyboardJS

- Keyboard combo binding library
- **URL**: https://robertwhurst.github.io/KeyboardJS/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### Bluebird

- Full-featured promise library with performance
- **URL**: http://bluebirdjs.com/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### store.js

- Cross-browser localStorage wrapper
- **URL**: https://github.com/marcuswestin/store.js
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### Numeral.js

- Formatting and manipulating numbers
- **URL**: http://numeraljs.com/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Wall

#### voca

- Ultimate string manipulation library
- **URL**: https://vocajs.com/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### he

- Robust HTML entity encoder/decoder
- **URL**: https://github.com/mathiasbynens/he
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### URI.js

- JavaScript URL mutation library
- **URL**: https://medialize.github.io/URI.js/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### diff2html

- Git diff output parser and HTML generator
- **URL**: https://diff2html.xyz/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### Hexo

- Fast simple powerful blog framework
- **URL**: https://hexo.io/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### loglevel

- Minimal logging with reliable log level methods
- **URL**: https://github.com/pimterry/loglevel
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### Bunyan

- Simple fast JSON logging for Node.js
- **URL**: https://github.com/trentm/node-bunyan
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### bowser

- Browser detection library
- **URL**: https://github.com/bowser-js/bowser
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### NodeGit

- Native Node bindings to Git
- **URL**: https://www.nodegit.org/
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### blessed

- Curses-like library for terminal interfaces
- **URL**: https://github.com/chjj/blessed
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Infrastructure

#### Cylon.js

- Next-generation robotics framework
- **URL**: https://cylonjs.com/
- **Scores**: prod=0.6 | learn=0.7 | blender=0.0 | priority=0.75
- **Projects**: Orbs

#### VerbalExpressions

- Construct regular expressions in readable code
- **URL**: https://verbalexpressions.github.io/JSVerbalExpressions/
- **Scores**: prod=0.6 | learn=0.7 | blender=0.0 | priority=0.75
- **Projects**: Infrastructure

#### sprintf.js

- sprintf implementation for JavaScript
- **URL**: https://github.com/alexei/sprintf.js
- **Scores**: prod=0.7 | learn=0.5 | blender=0.0 | priority=0.73
- **Projects**: Infrastructure

#### Sugar

- JavaScript utility library for native objects
- **URL**: https://sugarjs.com/
- **Scores**: prod=0.6 | learn=0.6 | blender=0.0 | priority=0.72
- **Projects**: Infrastructure

#### NeDB

- Embedded persistent database for browser/Electron
- **URL**: https://github.com/louischatriot/nedb
- **Scores**: prod=0.6 | learn=0.6 | blender=0.0 | priority=0.72
- **Projects**: Infrastructure

#### Vorpal

- Framework for building interactive CLIs
- **URL**: https://vorpal.js.org/
- **Scores**: prod=0.6 | learn=0.6 | blender=0.0 | priority=0.72
- **Projects**: Infrastructure

#### accounting.js

- Number money and currency formatting
- **URL**: https://openexchangerates.github.io/accounting.js/
- **Scores**: prod=0.6 | learn=0.5 | blender=0.0 | priority=0.69
- **Projects**: Wall

### Video

#### Video.js

- Open source HTML5 video player
- **URL**: https://videojs.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon|Wall

#### Plyr

- Simple accessible HTML5 media player
- **URL**: https://plyr.io/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Wall

#### Shaka Player

- DASH/HLS adaptive streaming player
- **URL**: https://shaka-player-demo.appspot.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Wall

#### Fluent-ffmpeg

- Fluent API to FFmpeg for Node.js
- **URL**: https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Infrastructure

### WebGL/3D

#### Three.js

- JavaScript 3D library for WebGL rendering
- **URL**: https://threejs.org/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Orbs|Pantheon|Constellation

#### Babylon.js

- Powerful 3D engine with WebGL support
- **URL**: https://www.babylonjs.com/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Orbs|Pantheon

#### Phaser

- HTML5 game framework for Canvas and WebGL
- **URL**: https://phaser.io/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Orbs|Ritual

#### React Three Fiber

- React renderer for Three.js
- **URL**: https://docs.pmnd.rs/react-three-fiber/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Orbs|Pantheon|Constellation

#### Drei

- Useful helpers for React Three Fiber
- **URL**: https://drei.pmnd.rs/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Orbs|Pantheon

#### Pixi.js

- Fast 2D WebGL renderer with Canvas fallback
- **URL**: https://pixijs.com/
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Orbs|Constellation|Wall

#### Leva

- React GUI panel for tweaking parameters
- **URL**: https://leva.pmnd.rs/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Orbs

#### Rapier

- High-performance physics engine via WASM
- **URL**: https://rapier.rs/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Orbs

#### Postprocessing

- Post-processing effects for Three.js
- **URL**: https://pmndrs.github.io/postprocessing/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Orbs|Pantheon

#### A-Frame

- Web framework for building VR experiences
- **URL**: https://aframe.io/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Ritual|Orbs

#### Spline

- 3D design tool for the web
- **URL**: https://spline.design/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Orbs|Pantheon

#### Matter.js

- 2D physics engine for the web
- **URL**: https://brm.io/matter-js/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Orbs|Ritual

#### PixiJS Filters

- Collection of WebGL filters for PixiJS
- **URL**: https://pixijs.io/filters/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Orbs|Pantheon

#### PlayCanvas

- WebGL game engine for interactive 3D content
- **URL**: https://playcanvas.com/
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Orbs

#### Zdog

- Flat round pseudo-3D engine for canvas/SVG
- **URL**: https://zzz.dog/
- **Scores**: prod=0.7 | learn=0.8 | blender=0.0 | priority=0.82
- **Projects**: Orbs|Constellation

#### OGL

- Minimal WebGL framework
- **URL**: https://ogl-dev.github.io/ogl/
- **Scores**: prod=0.7 | learn=0.8 | blender=0.0 | priority=0.82
- **Projects**: Orbs

#### regl

- Functional WebGL programming
- **URL**: http://regl.party/
- **Scores**: prod=0.7 | learn=0.8 | blender=0.0 | priority=0.82
- **Projects**: Orbs

#### Cannon-es

- Lightweight 3D physics engine
- **URL**: https://pmndrs.github.io/cannon-es/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Orbs

#### TWGL.js

- Tiny WebGL helper library
- **URL**: https://twgljs.org/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Orbs

---

## JavaScript Libraries (LibHunt) (163 entries)

### Animation

#### GSAP

- Robust JavaScript toolset for high-performance animations across CSS SVG Canvas React Vue WebGL
- **URL**: https://js.libhunt.com/greensock-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs

#### anime.js

- Lightweight JavaScript animation library for the modern web
- **URL**: https://js.libhunt.com/anime-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs

#### Velocity

- Accelerated JavaScript animation library
- **URL**: https://js.libhunt.com/velocity-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### Mo.js

- Motion graphics toolbelt for the web
- **URL**: https://js.libhunt.com/greensock-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Constellation

#### animate.css

- Cross-browser library of CSS animations with just-add-water usage
- **URL**: https://js.libhunt.com/compare-greensock-js-vs-animate-css
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### AutoAnimate

- Zero-config drop-in animation utility for smooth transitions
- **URL**: https://js.libhunt.com/auto-animate-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Pantheon

#### Effeckt.css

- Performant CSS transitions and animations collection
- **URL**: https://js.libhunt.com/categories/102-animations
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### barba.js

- Create badass fluid smooth transitions between pages
- **URL**: https://js.libhunt.com/categories/102-animations
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Wall

#### tsParticles

- Highly customizable particle effects confetti and fireworks for React Vue Angular Svelte
- **URL**: https://js.libhunt.com/tsparticles-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Pantheon

#### particles.js

- Lightweight JavaScript library for creating particles
- **URL**: https://js.libhunt.com/particles-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### Dynamic.js

- JavaScript library to create physics-based animations
- **URL**: https://js.libhunt.com/categories/102-animations
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs

#### typicaljs

- Animated typing in ~400 bytes of JavaScript
- **URL**: https://js.libhunt.com/typical-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### motus

- Animation library that mimics CSS keyframes when scrolling
- **URL**: https://js.libhunt.com/motus-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Ritual

#### Swup

- Versatile and extensible page transition library for server-rendered websites
- **URL**: https://js.libhunt.com/categories/102-animations
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Pantheon

#### lottie-web

- Render After Effects animations natively on web and mobile
- **URL**: https://js.libhunt.com/libs/animation
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs

#### Rive

- Runtime for interactive animations on web mobile and desktop
- **URL**: https://js.libhunt.com/libs/animation
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs

#### Framer Motion

- Production-ready motion library for React with declarative API
- **URL**: https://js.libhunt.com/libs/animation
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Wall

#### react-spring

- Spring-physics based React animation library
- **URL**: https://js.libhunt.com/libs/animation
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Wall

#### Popmotion

- Functional reactive animation library
- **URL**: https://js.libhunt.com/libs/animation
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### Motion One

- New animation library built on the Web Animations API
- **URL**: https://js.libhunt.com/libs/animation
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Wall

#### Typed.js

- JavaScript typing animation library
- **URL**: https://js.libhunt.com/typical-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Pantheon

#### canvas-confetti

- Performant confetti animation in the browser with no dependencies
- **URL**: https://js.libhunt.com/tsparticles-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Orbs

### Audio

#### AmplitudeJS

- Open Source HTML5 Web Audio Library - design your web audio player with no dependencies
- **URL**: https://js.libhunt.com/amplitudejs-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### SoundJS

- JavaScript library for consistent audio API across browsers supporting WebAudio HTML5 and Flash
- **URL**: https://js.libhunt.com/soundjs-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### ts-audio

- Agnostic easy-to-use TypeScript audio library
- **URL**: https://js.libhunt.com/ts-audio-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### Ion.Sound

- JavaScript library for playing sounds on user actions and events
- **URL**: https://js.libhunt.com/ion-sound-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### Howler.js

- Audio library for the modern web with consistent API across all platforms
- **URL**: https://js.libhunt.com/libs/audio
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### Tone.js

- Web Audio framework for creating interactive music in the browser
- **URL**: https://js.libhunt.com/libs/audio
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon|Ritual

### Bundlers

#### webpack

- Module bundler that packs many modules into few bundled assets
- **URL**: https://js.libhunt.com/webpack-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Rollup

- Next-generation ES module bundler
- **URL**: https://js.libhunt.com/compare-rollup-vs-webpack
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Parcel

- Zero configuration build tool for the web
- **URL**: https://js.libhunt.com/parcel-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Gulp

- Streaming build system leveraging Node.js streams
- **URL**: https://js.libhunt.com/categories/3-bundlers
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Grunt

- JavaScript task runner for automation
- **URL**: https://js.libhunt.com/categories/3-bundlers
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Snowpack

- Lightning-fast frontend build tool for the modern web
- **URL**: https://js.libhunt.com/categories/3-bundlers
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### webpack-dashboard

- CLI dashboard for webpack dev server
- **URL**: https://js.libhunt.com/categories/3-bundlers
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Microbundle

- Zero-configuration bundler for tiny modules
- **URL**: https://js.libhunt.com/categories/3-bundlers
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Brunch

- Fast front-end web app build tool with simple config
- **URL**: https://js.libhunt.com/categories/3-bundlers
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### FuseBox

- Bundler/module loader with first-class TypeScript support
- **URL**: https://js.libhunt.com/categories/3-bundlers
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

### Canvas

#### PixiJS

- Fast 2D WebGL renderer with Canvas fallback for rich interactive graphics and games
- **URL**: https://js.libhunt.com/pixi-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation

#### p5.js

- Client-side JS platform for creative coding based on Processing principles
- **URL**: https://js.libhunt.com/three-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs

#### Konva.js

- HTML5 Canvas JavaScript framework for interactive desktop and mobile apps
- **URL**: https://js.libhunt.com/compare-konva-vs-pixi-js
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs

#### Paper.js

- Swiss Army Knife of Vector Graphics Scripting - Scriptographer for the browser
- **URL**: https://js.libhunt.com/pixi-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### fabric.js

- JavaScript canvas library with SVG-to-canvas and canvas-to-SVG parser
- **URL**: https://js.libhunt.com/libs/canvas
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs

#### two.js

- Renderer-agnostic 2D drawing API for SVG Canvas and WebGL
- **URL**: https://js.libhunt.com/two-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs

#### react-canvas

- High-performance canvas rendering for React components
- **URL**: https://js.libhunt.com/compare-react-canvas-vs-pixi-js
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Constellation

### Canvas/SVG

#### ART

- Retained-mode vector drawing API for SVG Canvas and VML
- **URL**: https://js.libhunt.com/compare-art-vs-pixi-js
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

### Color

#### TinyColor

- Small fast library for color manipulation and conversion with no dependencies
- **URL**: https://js.libhunt.com/tinycolor-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs

#### chroma.js

- Tiny zero-dependency library for color conversions color scales and Color Brewer
- **URL**: https://js.libhunt.com/chroma-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs

#### color

- Immutable color conversion and manipulation with CSS color string support
- **URL**: https://js.libhunt.com/color-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### color2k

- Color parsing and manipulation with 2.8kB bundle size
- **URL**: https://js.libhunt.com/color2k-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### randomColor

- Attractive random color generator for JavaScript
- **URL**: https://js.libhunt.com/randomcolor-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

### Data Visualization

#### D3.js

- Data-driven documents - visualize data using SVG Canvas and HTML web standards
- **URL**: https://js.libhunt.com/d3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Chart.js

- Simple HTML5 Charts using the canvas tag
- **URL**: https://js.libhunt.com/chart-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Apache ECharts

- Free powerful charting and visualization library based on zrender canvas
- **URL**: https://js.libhunt.com/echarts-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Recharts

- Redefined chart library built with React and D3
- **URL**: https://js.libhunt.com/recharts-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Wall

#### c3

- D3-based reusable chart library for deeper web app integration
- **URL**: https://js.libhunt.com/c3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### dc.js

- Dimensional charting with crossfilter rendered using D3
- **URL**: https://js.libhunt.com/dc-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### d3plus

- JavaScript re-usable chart library extending D3 for easy beautiful visualizations
- **URL**: https://js.libhunt.com/d3plus-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### cubism

- D3 plugin for visualizing time series from Graphite Cube and other sources
- **URL**: https://js.libhunt.com/cubism-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Frappe Charts

- GitHub-inspired modern and responsive charts with zero dependencies
- **URL**: https://js.libhunt.com/charts-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### G2Plot

- Interactive statistical chart library based on G2
- **URL**: https://js.libhunt.com/g2plot-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### victory-chart

- React chart component for data visualization
- **URL**: https://js.libhunt.com/victory-chart-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Wall

#### react-vis

- Collection of React components for common data visualization charts
- **URL**: https://js.libhunt.com/react-vis-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Wall

#### Vega

- Visualization grammar for creating and sharing interactive data visualization designs
- **URL**: https://js.libhunt.com/d3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Highcharts

- Interactive JavaScript charting library with broad browser support
- **URL**: https://js.libhunt.com/d3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Plotly.js

- Open-source JavaScript graphing library built on D3 and WebGL
- **URL**: https://js.libhunt.com/d3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### ApexCharts

- Modern interactive open-source charting library
- **URL**: https://js.libhunt.com/chart-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Wall

#### billboard.js

- Re-usable easy-to-use D3-based chart library
- **URL**: https://js.libhunt.com/chart-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### nivo

- Rich set of data visualization components built on D3 and React
- **URL**: https://js.libhunt.com/recharts-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Wall

#### visx

- Collection of reusable low-level visualization components for React from Airbnb
- **URL**: https://js.libhunt.com/recharts-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Wall

#### JointJS

- JavaScript diagramming library for interactive flowcharts and visual tools
- **URL**: https://js.libhunt.com/libs/svg
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Cytoscape.js

- Graph theory analysis and visualization library
- **URL**: https://js.libhunt.com/d3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### sigma.js

- JavaScript library for drawing graphs and networks
- **URL**: https://js.libhunt.com/d3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### vis.js

- Dynamic browser-based visualization library for networks timelines and datasets
- **URL**: https://js.libhunt.com/d3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### mermaid

- Markdown-inspired diagramming and charting tool
- **URL**: https://js.libhunt.com/d3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Infrastructure

#### GoJS

- JavaScript/TypeScript library for interactive diagrams and complex visualizations
- **URL**: https://js.libhunt.com/libs/svg
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Treemap

- D3 treemap visualization component
- **URL**: https://js.libhunt.com/libs/canvas/data-visualization/svg/treemap
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### deck.gl

- WebGL2-powered framework for visual exploratory data analysis of large datasets
- **URL**: https://js.libhunt.com/d3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation|Orbs

### Debug/Tools

#### stats.js

- JavaScript performance monitor for FPS MS and custom panels
- **URL**: https://js.libhunt.com/dat-gui-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure|Orbs

#### Tweakpane

- Compact pane library for fine-tuning parameters and monitoring values
- **URL**: https://js.libhunt.com/dat-gui-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Infrastructure

#### lil-gui

- Drop-in replacement for dat.gui with modern features
- **URL**: https://js.libhunt.com/dat-gui-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Infrastructure

#### Spector.js

- WebGL inspector for debugging and profiling WebGL scenes
- **URL**: https://js.libhunt.com/libs/webgl
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Infrastructure

### Editors

#### Quill

- Modern WYSIWYG editor built for compatibility - worlds #1 rich text editor
- **URL**: https://js.libhunt.com/quill-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### ProseMirror

- Well-behaved rich semantic content editor with collaborative editing
- **URL**: https://js.libhunt.com/prosemirror-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Infrastructure

#### TipTap

- Powerful rich text editor framework with modular architecture
- **URL**: https://js.libhunt.com/prosemirror-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### CodeMirror

- Versatile text editor for the browser specialized for code with 100+ language modes
- **URL**: https://js.libhunt.com/codemirror-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Monaco Editor

- The code editor that powers VS Code
- **URL**: https://js.libhunt.com/monaco-editor-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Ace

- Ajax.org Cloud9 Editor - standalone code editor written in JavaScript
- **URL**: https://js.libhunt.com/categories/18-editors
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

### Form Widgets

#### Select2

- jQuery replacement for select boxes with search and remote data
- **URL**: https://js.libhunt.com/categories/85-form-widgets
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

### Form Widgets/Debug

#### dat.GUI

- Lightweight controller library for JavaScript parameter tweaking
- **URL**: https://js.libhunt.com/dat-gui-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Infrastructure

### Functional Programming

#### lodash

- Utility library making JavaScript easier for arrays numbers objects strings
- **URL**: https://js.libhunt.com/lodash-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### underscore

- Utility-belt library for functional programming without extending core objects
- **URL**: https://js.libhunt.com/underscore-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Ramda

- Practical functional library emphasizing immutability and side-effect free functions
- **URL**: https://js.libhunt.com/ramda-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### rambda

- Faster and smaller alternative to Ramda
- **URL**: https://js.libhunt.com/rambda-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### ModernDash

- Modern utility library for JavaScript
- **URL**: https://js.libhunt.com/moderndash-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Sugar

- Library for working with native JavaScript objects
- **URL**: https://js.libhunt.com/categories/57-functional-programming
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### lazy.js

- Utility library with lazy evaluation for better performance
- **URL**: https://js.libhunt.com/categories/57-functional-programming
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

### Game Engines

#### Phaser

- Fun free fast 2D game framework for HTML5 games supporting Canvas and WebGL
- **URL**: https://js.libhunt.com/phaser-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Ritual

#### PlayCanvas

- Advanced 2D+3D graphics engine with physics animations and VR controller support
- **URL**: https://js.libhunt.com/engine-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Ritual

#### Matter.js

- 2D rigid body physics engine for the web
- **URL**: https://js.libhunt.com/matter-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Ritual

#### melonJS

- Fresh modern lightweight HTML5 game engine
- **URL**: https://js.libhunt.com/compare-melonjs-vs-kaboom
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### KAPLAY

- JavaScript/TypeScript game library that feels like a game (successor to Kaboom.js)
- **URL**: https://js.libhunt.com/kaplay-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### GDevelop

- Free and easy game-making app with no-code visual editor
- **URL**: https://js.libhunt.com/gdevelop-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### Impact

- Open source cross-platform game development framework
- **URL**: https://js.libhunt.com/categories/6583-game-engines
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### Cocos

- Open source cross-platform game development framework
- **URL**: https://js.libhunt.com/compare-cocos-vs-gdevelop
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

### Gesture/Interaction

#### hammer.js

- JavaScript library for detecting touch gestures
- **URL**: https://js.libhunt.com/hammer-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual

#### Dragula

- Drag and drop so simple it hurts
- **URL**: https://js.libhunt.com/compare-hammer-js-vs-dragula
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Wall

#### touchemulator

- Emulate multi-touch input on desktop triggering W3C touch events
- **URL**: https://js.libhunt.com/touchemulator-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual

#### HumanInput

- Human input detection library for gestures
- **URL**: https://js.libhunt.com/categories/98-gesture
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual

#### westures

- Modern multi-touch gesture library
- **URL**: https://js.libhunt.com/categories/98-gesture
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual

#### Dropzone

- Easy drag-and-drop library with image previews and progress bars
- **URL**: https://js.libhunt.com/libs/drag-and-drop
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Ritual

#### SortableJS

- Reorderable drag-and-drop lists for modern browsers and touch devices
- **URL**: https://js.libhunt.com/libs/drag-and-drop
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Wall

### Image Processing

#### cropper

- JavaScript image cropping library
- **URL**: https://js.libhunt.com/categories/103-image-processing
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### pica

- Resize images in browser with high quality and blazing speed
- **URL**: https://js.libhunt.com/categories/103-image-processing
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Infrastructure

#### lena.js

- Tiny JavaScript library for image processing with filters
- **URL**: https://js.libhunt.com/categories/103-image-processing
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### JsBarcode

- Barcode generation library for JavaScript
- **URL**: https://js.libhunt.com/compare-jsbarcode-vs-pixi-js
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

### Maps

#### Leaflet

- Open-source JavaScript library for mobile-friendly interactive maps
- **URL**: https://js.libhunt.com/leaflet-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### CesiumJS

- JavaScript library for 3D globes and 2D maps using WebGL without plugins
- **URL**: https://js.libhunt.com/cesium-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation

#### OpenGlobus

- Open-source JS/TS library for virtual globes and geospatial data visualization
- **URL**: https://js.libhunt.com/openglobus-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs|Constellation

#### mapbox.js

- Mapbox JavaScript API as Leaflet plugin
- **URL**: https://js.libhunt.com/compare-mapbox-js-vs-cesium
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### OpenLayers

- High-performance map library for web applications
- **URL**: https://js.libhunt.com/leaflet-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### H3.js

- Hexagonal hierarchical geospatial indexing system
- **URL**: https://js.libhunt.com/h3-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Turf.js

- Advanced geospatial analysis for browsers and Node.js
- **URL**: https://js.libhunt.com/turf-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

### Physics

#### cannon-es

- Lightweight 3D physics engine for the web (ES module fork of cannon.js)
- **URL**: https://js.libhunt.com/matter-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### ammo.js

- Direct port of Bullet Physics to JavaScript using Emscripten
- **URL**: https://js.libhunt.com/engine-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### Rapier

- Fast deterministic cross-platform physics engine in Rust/WASM
- **URL**: https://js.libhunt.com/matter-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

### Reactive Programming

#### RxJS

- Reactive Extensions Library for composing async event-based programs
- **URL**: https://js.libhunt.com/categories/58-reactive-programming
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### MobX

- Battle-tested state management using transparent functional reactive programming
- **URL**: https://js.libhunt.com/mobx-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure|Wall

#### Cycle.js

- Framework for cleaner code using functional and reactive patterns
- **URL**: https://js.libhunt.com/categories/58-reactive-programming
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Bacon.js

- Functional reactive programming library for JavaScript
- **URL**: https://js.libhunt.com/categories/58-reactive-programming
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Most.js

- Ultra-high performance reactive programming library
- **URL**: https://js.libhunt.com/categories/58-reactive-programming
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

### SVG

#### SVG.js

- Lightweight library for manipulating and animating SVG
- **URL**: https://js.libhunt.com/libs/svg
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Snap.svg

- JavaScript SVG library for the modern web
- **URL**: https://js.libhunt.com/libs/svg
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

#### Raphael

- Cross-browser JavaScript vector graphics library using SVG and VML
- **URL**: https://js.libhunt.com/libs/svg
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Constellation

### Scroll

#### ScrollMagic

- Magical scroll interactions - trigger animations based on scroll position
- **URL**: https://js.libhunt.com/scrollmagic-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Pantheon

#### locomotive-scroll

- Detection of elements in viewport with smooth scrolling and parallax
- **URL**: https://js.libhunt.com/locomotive-scroll-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Wall

#### skrollr

- Stand-alone parallax scrolling JavaScript library for mobile and desktop
- **URL**: https://js.libhunt.com/skrollr-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual

#### parallax

- Simple interactive parallax scrolling effect
- **URL**: https://js.libhunt.com/parallax-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Wall

#### simpleParallax

- Easy way to add parallax animations on images
- **URL**: https://js.libhunt.com/simpleparallax-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Wall

#### Rellax

- Lightweight vanilla JavaScript parallax library
- **URL**: https://js.libhunt.com/scrollmagic-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Wall

#### iScroll

- High performance small footprint dependency-free multi-platform scroller
- **URL**: https://js.libhunt.com/categories/93-scroll
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### Trig.js

- Lightweight CSS scroll animations that react to element position
- **URL**: https://js.libhunt.com/trig-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Wall

#### Lenis

- Smooth scroll library with modern API
- **URL**: https://js.libhunt.com/locomotive-scroll-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Wall

### Scroll/Animation

#### GSAP ScrollTrigger

- Scroll-driven animation plugin for GSAP
- **URL**: https://js.libhunt.com/scrollmagic-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Pantheon

### Sliders

#### Swiper

- Most modern mobile touch slider with hardware accelerated transitions
- **URL**: https://js.libhunt.com/swiper-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### Glide.js

- Dependency-free JavaScript ES6 slider and carousel - lightweight flexible fast
- **URL**: https://js.libhunt.com/glide-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### Splide

- Lightweight flexible accessible slider/carousel in TypeScript
- **URL**: https://js.libhunt.com/compare-splide-vs-swiper
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### Flickity

- Touch responsive flickable carousels
- **URL**: https://js.libhunt.com/flickity-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### slick

- Fully responsive carousel with dependency on jQuery
- **URL**: https://js.libhunt.com/compare-slick-vs-swiper
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall

#### PhotoSwipe

- JavaScript image gallery for mobile and desktop with touch gestures
- **URL**: https://js.libhunt.com/categories/83-sliders
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Ritual

### Sliders/Presentation

#### reveal.js

- HTML presentation framework for creating stunning presentations
- **URL**: https://js.libhunt.com/categories/83-sliders
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Constellation

#### impress.js

- Presentation framework based on CSS3 transforms and transitions
- **URL**: https://js.libhunt.com/categories/83-sliders
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Wall|Constellation

### Testing

#### Jest

- Delightful JavaScript testing framework
- **URL**: https://js.libhunt.com/categories/4-testing-frameworks
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Cypress

- Fast easy reliable testing for anything that runs in a browser
- **URL**: https://js.libhunt.com/cypress-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Playwright

- Web testing and automation for Chromium Firefox and WebKit with single API
- **URL**: https://js.libhunt.com/playwright-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Mocha

- Simple flexible fun JavaScript test framework for Node and browser
- **URL**: https://js.libhunt.com/mocha-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

#### Nightmare

- High-level browser automation library built on Electron
- **URL**: https://js.libhunt.com/nightmare-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Infrastructure

### WebGL/3D

#### three.js

- Easy-to-use lightweight cross-browser general purpose 3D library with WebGL WebGPU SVG and CSS3D renderers
- **URL**: https://js.libhunt.com/three-js-alternatives
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### babylon.js

- Powerful beautiful simple open game and rendering engine in a friendly JavaScript framework
- **URL**: https://js.libhunt.com/compare-babylon-js-vs-three-js
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### ogl

- Minimal WebGL library with GPU-accelerated rendering
- **URL**: https://js.libhunt.com/libs/webgl
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### regl

- Functional WebGL programming interface
- **URL**: https://js.libhunt.com/libs/webgl
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### TWGL

- Tiny WebGL helper library making WebGL less verbose
- **URL**: https://js.libhunt.com/libs/webgl
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

### XR/Spatial

#### A-Frame

- Web framework for building VR experiences with HTML and Entity-Component system
- **URL**: https://js.libhunt.com/aframe-changelog
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual|Orbs

---

## Web Audio API & Libraries (101 entries)

### Audio Framework

#### Tone.js

- Interactive music framework built on Web Audio API for creating music in the browser
- **URL**: https://tonejs.github.io/
- **Scores**: prod=1.0 | learn=1.0 | blender=0.0 | priority=1.0
- **Projects**: Pantheon|Orbs|Ritual
- **Related**: Web Audio API|AudioContext

### Audio Library

#### howler.js

- Audio library for modern web with cross-browser support and simple API
- **URL**: https://howlerjs.com/
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Pantheon|Ritual
- **Related**: Web Audio API|HTML5 Audio

#### Wavesurfer.js

- Audio waveform visualization and interaction library
- **URL**: https://wavesurfer-js.org/
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Orbs|Pantheon
- **Related**: Web Audio API|Canvas|AnalyserNode

#### peaks.js

- Browser-based audio waveform visualization from BBC
- **URL**: https://github.com/bbc/peaks.js
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon
- **Related**: Web Audio API|Canvas|Wavesurfer.js

#### Pizzicato.js

- Simplified Web Audio API library with clean short API and built-in effects
- **URL**: https://alemangui.github.io/pizzicato/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Orbs|Ritual
- **Related**: Web Audio API|AnalyserNode

#### XSound

- Batteries-included library for audio management/loading/streaming/effects/visualization
- **URL**: https://korilakkuma.github.io/XSound/
- **Scores**: prod=0.8 | learn=0.8 | blender=0.0 | priority=0.86
- **Projects**: Pantheon|Orbs|Ritual
- **Related**: Web Audio API|AnalyserNode|MediaStream

#### Tuna

- Easy-to-use audio effects library for Web Audio API
- **URL**: https://github.com/Theodeus/tuna
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Orbs|Ritual
- **Related**: Web Audio API|BiquadFilterNode|ConvolverNode

#### Wad

- Audio manipulation library with effects/filters/panning/microphone support
- **URL**: https://github.com/rserota/wad
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Pantheon|Orbs
- **Related**: Web Audio API|Tuna|AnalyserNode

#### Amplitude.js

- Open-source HTML5 audio player library with no dependencies
- **URL**: https://521dimensions.com/open-source/amplitudejs
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Pantheon
- **Related**: HTML5 Audio|Web Audio API

#### virtual-audio-graph

- Declarative React-inspired API overlay for Web Audio API state management
- **URL**: https://virtual-audio-graph.netlify.com/
- **Scores**: prod=0.7 | learn=0.7 | blender=0.0 | priority=0.79
- **Projects**: Orbs
- **Related**: Web Audio API|AudioNode

#### SoundJS

- Audio management library from CreateJS suite for loading and managing sounds
- **URL**: https://createjs.com/soundjs
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Pantheon
- **Related**: CreateJS|Web Audio API|HTML5 Audio

#### Musquito

- Tiny vanilla JavaScript audio library using Web Audio API
- **URL**: https://github.com/nicholasstephan/musquito
- **Scores**: prod=0.6 | learn=0.5 | blender=0.0 | priority=0.69
- **Projects**: Ritual
- **Related**: Web Audio API|AudioBuffer

#### Theresas-Sound-World

- Modular low-level Web Audio API method library (TSW)
- **URL**: https://github.com/stuartmemo/theresas-sound-world
- **Scores**: prod=0.5 | learn=0.6 | blender=0.0 | priority=0.68
- **Projects**: Orbs
- **Related**: Web Audio API|AudioNode

### Tone.js

#### Tone.Synth

- Basic monophonic synthesizer with single oscillator and ADSR envelope
- **URL**: https://tonejs.github.io/docs/Synth
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Orbs|Ritual
- **Related**: Tone.FMSynth|Tone.AMSynth|Tone.PolySynth

#### Tone.Player

- Loads and plays back individual audio files with scheduling
- **URL**: https://tonejs.github.io/docs/Player
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Pantheon|Ritual
- **Related**: Tone.Sampler|AudioBuffer

#### Tone.Filter

- Frequency-based audio filter with lowpass/highpass/bandpass modes
- **URL**: https://tonejs.github.io/docs/Filter
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Pantheon|Orbs
- **Related**: BiquadFilterNode|Tone.EQ3

#### Tone.Reverb

- Convolution-based reverb effect for room/space simulation
- **URL**: https://tonejs.github.io/docs/Reverb
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Ritual|Pantheon
- **Related**: ConvolverNode|Tone.FeedbackDelay

#### Tone.Transport

- Global transport for synchronizing and scheduling musical events
- **URL**: https://tonejs.github.io/docs/Transport
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Ritual|Orbs
- **Related**: Tone.Loop|Tone.Sequence|Tone.Part

#### Tone.Meter

- Audio level meter for monitoring signal amplitude
- **URL**: https://tonejs.github.io/docs/Meter
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Orbs|Pantheon
- **Related**: AnalyserNode|Tone.FFT

#### Tone.FFT

- Fast Fourier Transform analyzer for frequency spectrum data
- **URL**: https://tonejs.github.io/docs/FFT
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Orbs
- **Related**: AnalyserNode|Tone.Waveform

#### Tone.FMSynth

- FM synthesis-based monophonic synthesizer for complex harmonic tones
- **URL**: https://tonejs.github.io/docs/FMSynth
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Ritual|Orbs
- **Related**: Tone.Synth|Tone.AMSynth

#### Tone.AMSynth

- Amplitude modulation synthesis-based monophonic synthesizer
- **URL**: https://tonejs.github.io/docs/AMSynth
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Ritual|Orbs
- **Related**: Tone.Synth|Tone.FMSynth

#### Tone.PolySynth

- Wrapper enabling polyphonic (multi-note) playback from monophonic synths
- **URL**: https://tonejs.github.io/docs/PolySynth
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Ritual|Orbs
- **Related**: Tone.Synth|Tone.FMSynth

#### Tone.Oscillator

- Generates periodic waveforms with sample-accurate scheduling
- **URL**: https://tonejs.github.io/docs/Oscillator
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Orbs|Ritual
- **Related**: Tone.Synth|OscillatorNode

#### Tone.Compressor

- Dynamics compressor for volume normalization
- **URL**: https://tonejs.github.io/docs/Compressor
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Pantheon
- **Related**: DynamicsCompressorNode|Tone.Limiter

#### Tone.Gain

- Utility gain node for signal routing and volume control
- **URL**: https://tonejs.github.io/docs/Gain
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Pantheon|Orbs
- **Related**: GainNode|Tone.Channel

#### Tone.Loop

- Creates looped callback events synchronized to the Transport
- **URL**: https://tonejs.github.io/docs/Loop
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Ritual|Orbs
- **Related**: Tone.Transport|Tone.Sequence

#### Tone.Waveform

- Time-domain waveform analyzer for oscilloscope-style display
- **URL**: https://tonejs.github.io/docs/Waveform
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Orbs
- **Related**: AnalyserNode|Tone.FFT

#### Tone.FeedbackDelay

- Delay effect with feedback loop for echo and rhythmic delay
- **URL**: https://tonejs.github.io/docs/FeedbackDelay
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Ritual
- **Related**: DelayNode|Tone.Reverb

#### Tone.EQ3

- Three-band equalizer (low/mid/high)
- **URL**: https://tonejs.github.io/docs/EQ3
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon
- **Related**: BiquadFilterNode|Tone.Filter

#### Tone.Panner3D

- 3D spatial audio panner in Tone.js
- **URL**: https://tonejs.github.io/docs/Panner3D
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Ritual
- **Related**: PannerNode|AudioListener|Tone.Panner

#### Tone.Convolver

- Convolution reverb effect using impulse response buffers
- **URL**: https://tonejs.github.io/docs/Convolver
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Ritual|Pantheon
- **Related**: ConvolverNode|Tone.Reverb

#### Tone.PitchShift

- Real-time pitch shifting without changing playback speed
- **URL**: https://tonejs.github.io/docs/PitchShift
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon
- **Related**: Tone.FrequencyShifter|DelayNode

#### Tone.LFO

- Low-frequency oscillator for modulating other parameters
- **URL**: https://tonejs.github.io/docs/LFO
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Orbs|Ritual
- **Related**: OscillatorNode|AudioParam

#### Tone.Envelope

- ADSR envelope generator for shaping signal amplitude over time
- **URL**: https://tonejs.github.io/docs/Envelope
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Ritual
- **Related**: AudioParam|Tone.AmplitudeEnvelope

#### Tone.AmplitudeEnvelope

- Envelope connected to a gain node for volume shaping
- **URL**: https://tonejs.github.io/docs/AmplitudeEnvelope
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Ritual|Pantheon
- **Related**: Tone.Envelope|GainNode

#### Tone.CrossFade

- Crossfade between two audio inputs
- **URL**: https://tonejs.github.io/docs/CrossFade
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon|Ritual
- **Related**: GainNode|Tone.Gain

#### Tone.Recorder

- Record audio from any Tone.js node to a blob
- **URL**: https://tonejs.github.io/docs/Recorder
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon
- **Related**: MediaRecorder|MediaStreamAudioDestinationNode

#### Tone.NoiseSynth

- Synthesizer using filtered noise as its sound source
- **URL**: https://tonejs.github.io/docs/NoiseSynth
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Ritual
- **Related**: Tone.Noise|Tone.Synth

#### Tone.Sampler

- Multi-sample instrument with automatic pitch-shifting between notes
- **URL**: https://tonejs.github.io/docs/Sampler
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Ritual
- **Related**: Tone.Player|AudioBuffer

#### Tone.Noise

- White/pink/brown noise generator
- **URL**: https://tonejs.github.io/docs/Noise
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Ritual
- **Related**: Tone.NoiseSynth|Tone.Filter

#### Tone.Distortion

- Distortion audio effect with adjustable amount
- **URL**: https://tonejs.github.io/docs/Distortion
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Orbs
- **Related**: Tone.Filter|WaveShaperNode

#### Tone.Chorus

- Chorus effect for thickening and widening audio signals
- **URL**: https://tonejs.github.io/docs/Chorus
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Ritual
- **Related**: Tone.Vibrato|Tone.Phaser

#### Tone.Phaser

- Phaser effect creating sweeping notch-filter movement
- **URL**: https://tonejs.github.io/docs/Phaser
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Orbs
- **Related**: Tone.Chorus|BiquadFilterNode

#### Tone.Tremolo

- Amplitude modulation effect for rhythmic volume pulsing
- **URL**: https://tonejs.github.io/docs/Tremolo
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Orbs|Ritual
- **Related**: Tone.Vibrato|GainNode

#### Tone.Limiter

- Brick-wall limiter preventing signal from exceeding threshold
- **URL**: https://tonejs.github.io/docs/Limiter
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Pantheon
- **Related**: Tone.Compressor|DynamicsCompressorNode

#### Tone.Sequence

- Step sequencer for creating patterns of events
- **URL**: https://tonejs.github.io/docs/Sequence
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Ritual
- **Related**: Tone.Transport|Tone.Part

#### Tone.Part

- Schedule an array of events along a timeline
- **URL**: https://tonejs.github.io/docs/Part
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Ritual
- **Related**: Tone.Transport|Tone.Sequence

#### Tone.Channel

- Channel strip with volume and panning controls
- **URL**: https://tonejs.github.io/docs/Channel
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Pantheon|Ritual
- **Related**: Tone.Gain|StereoPannerNode

#### Tone.Panner

- Stereo panning wrapper in Tone.js
- **URL**: https://tonejs.github.io/docs/Panner
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Ritual|Orbs
- **Related**: StereoPannerNode|Tone.Panner3D

#### Tone.Signal

- Chainable audio-rate signal for parameter automation
- **URL**: https://tonejs.github.io/docs/Signal
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Orbs|Ritual
- **Related**: AudioParam|ConstantSourceNode

#### Tone.MonoSynth

- Monophonic synthesizer with filter and filter envelope
- **URL**: https://tonejs.github.io/docs/MonoSynth
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Ritual
- **Related**: Tone.Synth|Tone.Filter

#### Tone.AutoFilter

- LFO-driven filter for automatic sweeping filter effects
- **URL**: https://tonejs.github.io/docs/AutoFilter
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Orbs
- **Related**: BiquadFilterNode|Tone.LFO

#### Tone.AutoPanner

- LFO-driven automatic stereo panning
- **URL**: https://tonejs.github.io/docs/AutoPanner
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Ritual|Orbs
- **Related**: StereoPannerNode|Tone.LFO

#### Tone.DuoSynth

- Two-voice synthesizer with shared vibrato
- **URL**: https://tonejs.github.io/docs/DuoSynth
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Ritual
- **Related**: Tone.MonoSynth|Tone.Vibrato

#### Tone.PluckSynth

- Karplus-Strong plucked string synthesis
- **URL**: https://tonejs.github.io/docs/PluckSynth
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Ritual
- **Related**: Tone.Synth|DelayNode

#### Tone.MembraneSynth

- Drum-like synthesis using a pitched membrane model
- **URL**: https://tonejs.github.io/docs/MembraneSynth
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Ritual
- **Related**: Tone.Synth|OscillatorNode

#### Tone.MetalSynth

- Metallic percussion synthesis (cymbals/gongs/bells)
- **URL**: https://tonejs.github.io/docs/MetalSynth
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Ritual
- **Related**: Tone.FMSynth|Tone.Envelope

#### Tone.Vibrato

- Pitch modulation effect for natural wobble
- **URL**: https://tonejs.github.io/docs/Vibrato
- **Scores**: prod=0.8 | learn=0.6 | blender=0.0 | priority=0.8
- **Projects**: Ritual
- **Related**: Tone.Tremolo|Tone.Chorus

#### Tone.BitCrusher

- Bit depth reduction effect for lo-fi digital distortion
- **URL**: https://tonejs.github.io/docs/BitCrusher
- **Scores**: prod=0.8 | learn=0.6 | blender=0.0 | priority=0.8
- **Projects**: Orbs
- **Related**: AudioWorkletNode|Tone.Distortion

#### Tone.Split

- Split a stereo signal into two mono signals
- **URL**: https://tonejs.github.io/docs/Split
- **Scores**: prod=0.8 | learn=0.6 | blender=0.0 | priority=0.8
- **Projects**: Orbs
- **Related**: ChannelSplitterNode|Tone.Merge

#### Tone.Merge

- Merge two mono signals into a stereo signal
- **URL**: https://tonejs.github.io/docs/Merge
- **Scores**: prod=0.8 | learn=0.6 | blender=0.0 | priority=0.8
- **Projects**: Orbs
- **Related**: ChannelMergerNode|Tone.Split

#### Tone.AutoWah

- Envelope-following auto-wah filter effect
- **URL**: https://tonejs.github.io/docs/AutoWah
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Orbs
- **Related**: BiquadFilterNode|Tone.Filter

#### Tone.FrequencyShifter

- Shifts all frequencies by a fixed amount (not pitch-preserving)
- **URL**: https://tonejs.github.io/docs/FrequencyShifter
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Orbs
- **Related**: Tone.PitchShift|OscillatorNode

### Web Audio API

#### AudioContext

- Represents an audio-processing graph built from linked audio modules
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
- **Scores**: prod=1.0 | learn=1.0 | blender=0.0 | priority=1.0
- **Projects**: Pantheon|Orbs|Ritual
- **Related**: BaseAudioContext|AudioDestinationNode|AudioListener

#### GainNode

- Controls the volume/amplitude of audio passing through it
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/GainNode
- **Scores**: prod=1.0 | learn=1.0 | blender=0.0 | priority=1.0
- **Projects**: Pantheon|Orbs|Ritual
- **Related**: AudioParam|AudioNode

#### AnalyserNode

- Provides real-time frequency and time-domain analysis data
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
- **Scores**: prod=1.0 | learn=1.0 | blender=0.0 | priority=1.0
- **Projects**: Orbs|Pantheon
- **Related**: Float32Array|Uint8Array|AudioNode

#### AudioNode

- Base interface for audio-processing modules in the audio graph
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioNode
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Pantheon|Orbs
- **Related**: AudioContext|AudioParam

#### AudioParam

- Audio-related parameter that can be scheduled and automated over time
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioParam
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Pantheon|Orbs
- **Related**: AudioNode|GainNode|OscillatorNode

#### OscillatorNode

- Generates periodic waveforms (sine/triangle/square/sawtooth/custom)
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Orbs|Ritual
- **Related**: AudioScheduledSourceNode|PeriodicWave|GainNode

#### AudioBufferSourceNode

- Plays back audio data stored in an AudioBuffer
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Pantheon|Ritual
- **Related**: AudioBuffer|AudioScheduledSourceNode

#### BiquadFilterNode

- Simple low-order filter for highpass/lowpass/bandpass/notch/etc
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Pantheon|Orbs
- **Related**: AudioParam|IIRFilterNode

#### StereoPannerNode

- Simple stereo left/right panning of audio signal
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Ritual|Orbs
- **Related**: PannerNode|AudioParam

#### AudioBuffer

- Short audio asset stored in memory from decoded audio data
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Pantheon|Ritual
- **Related**: AudioBufferSourceNode|AudioContext

#### AudioDestinationNode

- Final destination node representing the output device (speakers)
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioDestinationNode
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Pantheon|Orbs|Ritual
- **Related**: AudioContext|AudioNode

#### ConvolverNode

- Performs linear convolution for reverb and acoustic space simulation
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Ritual|Pantheon
- **Related**: AudioBuffer|GainNode

#### DelayNode

- Delay-line that introduces time delay between input and output
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/DelayNode
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Ritual|Orbs
- **Related**: AudioParam|GainNode

#### DynamicsCompressorNode

- Compresses loud signals to prevent clipping and normalize volume
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Pantheon
- **Related**: GainNode|AudioParam

#### PannerNode

- 3D spatial positioning and panning of audio in 3D space
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/PannerNode
- **Scores**: prod=1.0 | learn=0.8 | blender=0.0 | priority=0.94
- **Projects**: Ritual|Orbs
- **Related**: AudioListener|StereoPannerNode

#### AudioWorkletNode

- AudioNode that executes custom processing code via AudioWorklet
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode
- **Scores**: prod=0.9 | learn=0.9 | blender=0.0 | priority=0.93
- **Projects**: Pantheon|Orbs
- **Related**: AudioWorklet|AudioWorkletProcessor|AudioParamMap

#### AudioListener

- Represents the position and orientation of the listener in 3D space
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioListener
- **Scores**: prod=1.0 | learn=0.7 | blender=0.0 | priority=0.91
- **Projects**: Ritual
- **Related**: PannerNode|AudioContext

#### BaseAudioContext

- Base definition for online and offline audio-processing graphs
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon|Orbs
- **Related**: AudioContext|OfflineAudioContext

#### MediaStreamAudioSourceNode

- Audio source from a live MediaStream (microphone/webcam)
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon
- **Related**: MediaStream|AudioContext

#### AudioWorklet

- Interface for loading custom audio processing modules
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon|Orbs
- **Related**: AudioWorkletNode|AudioWorkletProcessor

#### AudioWorkletProcessor

- Runs custom audio processing code in a separate thread
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor
- **Scores**: prod=0.9 | learn=0.8 | blender=0.0 | priority=0.9
- **Projects**: Pantheon|Orbs
- **Related**: AudioWorkletNode|AudioWorkletGlobalScope

#### OfflineAudioContext

- Audio context that renders to an AudioBuffer rather than speakers
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Pantheon
- **Related**: AudioContext|AudioBuffer

#### MediaElementAudioSourceNode

- Audio source from an HTML audio or video element
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/MediaElementAudioSourceNode
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Pantheon
- **Related**: HTMLMediaElement|AudioContext

#### AudioScheduledSourceNode

- Parent interface for audio source nodes with start/stop scheduling
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Pantheon|Orbs
- **Related**: OscillatorNode|AudioBufferSourceNode|ConstantSourceNode

#### WaveShaperNode

- Non-linear distortion using a curve-shaping function
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
- **Scores**: prod=0.9 | learn=0.7 | blender=0.0 | priority=0.87
- **Projects**: Orbs|Ritual
- **Related**: AudioNode|Float32Array

#### PeriodicWave

- Describes a periodic waveform shape for use with OscillatorNode
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/PeriodicWave
- **Scores**: prod=0.8 | learn=0.7 | blender=0.0 | priority=0.83
- **Projects**: Orbs
- **Related**: OscillatorNode|AudioContext

#### IIRFilterNode

- General infinite impulse response filter for custom frequency response
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/IIRFilterNode
- **Scores**: prod=0.8 | learn=0.6 | blender=0.0 | priority=0.8
- **Projects**: Pantheon
- **Related**: BiquadFilterNode|AudioParam

#### ChannelSplitterNode

- Separates multi-channel audio into individual mono outputs
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/ChannelSplitterNode
- **Scores**: prod=0.8 | learn=0.6 | blender=0.0 | priority=0.8
- **Projects**: Orbs
- **Related**: ChannelMergerNode|AudioNode

#### ChannelMergerNode

- Combines multiple mono inputs into a single multi-channel output
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/ChannelMergerNode
- **Scores**: prod=0.8 | learn=0.6 | blender=0.0 | priority=0.8
- **Projects**: Orbs
- **Related**: ChannelSplitterNode|AudioNode

#### AudioParamMap

- Map-like interface providing access to a group of AudioParam objects
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioParamMap
- **Scores**: prod=0.8 | learn=0.5 | blender=0.0 | priority=0.77
- **Projects**: Orbs
- **Related**: AudioWorkletNode|AudioParam

#### MediaStreamAudioDestinationNode

- Routes audio output to a WebRTC MediaStream instead of speakers
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioDestinationNode
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Pantheon
- **Related**: MediaStream|AudioContext

#### ConstantSourceNode

- Outputs a constant value signal useful for automation
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/ConstantSourceNode
- **Scores**: prod=0.7 | learn=0.6 | blender=0.0 | priority=0.76
- **Projects**: Orbs
- **Related**: AudioScheduledSourceNode|AudioParam

#### MediaStreamTrackAudioSourceNode

- Audio source from a specific MediaStreamTrack
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrackAudioSourceNode
- **Scores**: prod=0.7 | learn=0.5 | blender=0.0 | priority=0.73
- **Projects**: Pantheon
- **Related**: MediaStreamTrack|AudioContext

#### AudioWorkletGlobalScope

- Global scope available inside AudioWorklet processing code
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletGlobalScope
- **Scores**: prod=0.7 | learn=0.5 | blender=0.0 | priority=0.73
- **Projects**: Orbs
- **Related**: AudioWorkletProcessor|AudioWorkletNode

#### ScriptProcessorNode

- DEPRECATED - Legacy JavaScript audio processing on main thread
- **URL**: https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode
- **Scores**: prod=0.3 | learn=0.4 | blender=0.0 | priority=0.54
- **Projects**: Pantheon
- **Related**: AudioWorkletNode|AudioProcessingEvent

### howler.js

#### Howl

- Core howler.js object representing an individual sound instance
- **URL**: https://howlerjs.com/#api
- **Scores**: prod=1.0 | learn=0.9 | blender=0.0 | priority=0.97
- **Projects**: Pantheon|Ritual
- **Related**: Howler|Web Audio API

#### Howler

- Global howler.js controller managing codec detection and global settings
- **URL**: https://howlerjs.com/#api
- **Scores**: prod=1.0 | learn=0.7 | blender=0.0 | priority=0.91
- **Projects**: Pantheon
- **Related**: Howl|Web Audio API

---

## Native Audio (JUCE + Essentia) (110 entries)

### Audio Basics

#### AudioBuffer

- Core class for multi-channel audio sample buffer manipulation
- **URL**: https://docs.juce.com/master/classAudioBuffer.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

#### AudioChannelSet

- Manages channel layout configuration for mono/stereo/surround
- **URL**: https://docs.juce.com/master/classAudioChannelSet.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### MidiMessage

- Core MIDI message creation and parsing
- **URL**: https://docs.juce.com/master/classMidiMessage.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### MidiBuffer

- Time-stamped container for MIDI event sequences
- **URL**: https://docs.juce.com/master/classMidiBuffer.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### MidiFile

- Reading and writing Standard MIDI Files
- **URL**: https://docs.juce.com/master/classMidiFile.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### Synthesiser

- Polyphonic synthesizer framework with voice management
- **URL**: https://docs.juce.com/master/classSynthesiser.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Ritual

#### SynthesiserVoice

- Individual voice implementation for polyphonic synthesis
- **URL**: https://docs.juce.com/master/classSynthesiserVoice.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Ritual

#### MPESynthesiser

- MIDI Polyphonic Expression synthesizer for expressive control
- **URL**: https://docs.juce.com/master/classMPESynthesiser.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual

#### FloatVectorOperations

- SIMD-optimized vector math operations on audio samples
- **URL**: https://docs.juce.com/master/classFloatVectorOperations.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

### Audio Devices

#### AudioDeviceManager

- Manages audio hardware selection and configuration
- **URL**: https://docs.juce.com/master/classAudioDeviceManager.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### AudioIODevice

- Represents a physical audio input/output device
- **URL**: https://docs.juce.com/master/classAudioIODevice.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### MidiInput

- Receives MIDI messages from hardware controllers
- **URL**: https://docs.juce.com/master/classMidiInput.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

### Audio Problems

#### ClickDetector

- Impulsive noise detection for audio quality
- **URL**: https://essentia.upf.edu/reference/std_ClickDetector.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### SNR

- Signal-to-noise ratio estimation
- **URL**: https://essentia.upf.edu/reference/std_SNR.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

### DSP

#### dsp::FFT

- Fast Fourier Transform for spectral analysis and processing
- **URL**: https://docs.juce.com/master/classdsp_1_1FFT.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

#### dsp::Convolution

- Convolution engine for impulse response processing
- **URL**: https://docs.juce.com/master/classdsp_1_1Convolution.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual;Pantheon

#### dsp::IIR::Filter

- Infinite impulse response filter for real-time audio
- **URL**: https://docs.juce.com/master/classdsp_1_1IIR_1_1Filter.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### dsp::FIR::Filter

- Finite impulse response filter for linear-phase processing
- **URL**: https://docs.juce.com/master/classdsp_1_1FIR_1_1Filter.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### dsp::Oscillator

- Waveform generator with anti-aliasing for synthesis
- **URL**: https://docs.juce.com/master/classdsp_1_1Oscillator.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual;Orbs

#### dsp::Reverb

- Algorithmic reverb processor
- **URL**: https://docs.juce.com/master/classdsp_1_1Reverb.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual;Pantheon

#### dsp::Compressor

- Dynamic range compressor
- **URL**: https://docs.juce.com/master/classdsp_1_1Compressor.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### dsp::Limiter

- Peak limiter for output protection
- **URL**: https://docs.juce.com/master/classdsp_1_1Limiter.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### dsp::NoiseGate

- Noise gate for removing background noise
- **URL**: https://docs.juce.com/master/classdsp_1_1NoiseGate.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### dsp::Chorus

- Chorus effect processor
- **URL**: https://docs.juce.com/master/classdsp_1_1Chorus.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Ritual

#### dsp::Phaser

- Phaser effect processor
- **URL**: https://docs.juce.com/master/classdsp_1_1Phaser.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual

#### dsp::WaveShaper

- Nonlinear waveshaping distortion
- **URL**: https://docs.juce.com/master/classdsp_1_1WaveShaper.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual;Pantheon

#### dsp::DelayLine

- Variable-length delay line for echo and effects
- **URL**: https://docs.juce.com/master/classdsp_1_1DelayLine.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual

#### dsp::Panner

- Stereo panning processor
- **URL**: https://docs.juce.com/master/classdsp_1_1Panner.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual;Orbs

#### dsp::Oversampling

- Oversampling for anti-aliased nonlinear processing
- **URL**: https://docs.juce.com/master/classdsp_1_1Oversampling.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### dsp::StateVariableTPTFilter

- Multi-mode SVF filter (LP/HP/BP/Notch)
- **URL**: https://docs.juce.com/master/classdsp_1_1StateVariableTPTFilter.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### dsp::LadderFilter

- Classic analog-modeled ladder filter
- **URL**: https://docs.juce.com/master/classdsp_1_1LadderFilter.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual;Pantheon

#### dsp::LinkwitzRileyFilter

- Crossover filter for multi-band processing
- **URL**: https://docs.juce.com/master/classdsp_1_1LinkwitzRileyFilter.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### dsp::BallisticsFilter

- Attack/release envelope follower
- **URL**: https://docs.juce.com/master/classdsp_1_1BallisticsFilter.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### dsp::WindowingFunction

- Window functions for spectral analysis (Hann/Hamming/Blackman)
- **URL**: https://docs.juce.com/master/classdsp_1_1WindowingFunction.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### dsp::ProcessorChain

- Chain multiple DSP processors in series
- **URL**: https://docs.juce.com/master/classdsp_1_1ProcessorChain.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Ritual

#### dsp::DryWetMixer

- Blend between dry and wet signal paths
- **URL**: https://docs.juce.com/master/classdsp_1_1DryWetMixer.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Ritual

### Duration/Silence

#### FadeDetection

- Detect fade-in and fade-out regions in audio
- **URL**: https://essentia.upf.edu/reference/std_FadeDetection.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### StartStopSilence

- Detect where sound begins and ends in recording
- **URL**: https://essentia.upf.edu/reference/std_StartStopSilence.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

### Envelope/SFX

#### Envelope

- Signal envelope via non-symmetric lowpass filter
- **URL**: https://essentia.upf.edu/reference/std_Envelope.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### LogAttackTime

- Log attack time of signal envelope
- **URL**: https://essentia.upf.edu/reference/std_LogAttackTime.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

### Extractors

#### MusicExtractor

- All-in-one music feature extraction pipeline
- **URL**: https://essentia.upf.edu/reference/std_MusicExtractor.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

### File I/O

#### AudioFormatManager

- Manages audio file format codecs for reading/writing
- **URL**: https://docs.juce.com/master/classAudioFormatManager.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

#### AudioFormatReader

- Reads audio data from files in various formats
- **URL**: https://docs.juce.com/master/classAudioFormatReader.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

#### AudioTransportSource

- Playback transport control with start/stop/seek
- **URL**: https://docs.juce.com/master/classAudioTransportSource.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

### Filters

#### EqualLoudness

- Equal-loudness contour filter (ISO 226)
- **URL**: https://essentia.upf.edu/reference/std_EqualLoudness.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### DCRemoval

- DC offset removal via highpass filter
- **URL**: https://essentia.upf.edu/reference/std_DCRemoval.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

### Fingerprinting

#### Chromaprinter

- Audio fingerprinting using Chromaprint algorithm
- **URL**: https://essentia.upf.edu/reference/std_Chromaprinter.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

### Input/Output

#### MonoLoader

- Audio file loader with automatic downmix and resampling
- **URL**: https://essentia.upf.edu/reference/std_MonoLoader.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### AudioLoader

- Multi-channel audio file loader with metadata
- **URL**: https://essentia.upf.edu/reference/std_AudioLoader.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

### Loudness

#### LoudnessEBUR128

- EBU R128 broadcast loudness measurement
- **URL**: https://essentia.upf.edu/reference/std_LoudnessEBUR128.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### ReplayGain

- ReplayGain loudness normalization value
- **URL**: https://essentia.upf.edu/reference/std_ReplayGain.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### DynamicComplexity

- Average absolute deviation of loudness over time
- **URL**: https://essentia.upf.edu/reference/std_DynamicComplexity.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### Loudness

- Steven's power law loudness estimation
- **URL**: https://essentia.upf.edu/reference/std_Loudness.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

### Machine Learning

#### TensorflowPredictMusiCNN

- Music auto-tagging using MusiCNN deep learning model
- **URL**: https://essentia.upf.edu/reference/std_TensorflowPredictMusiCNN.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### TensorflowPredictVGGish

- Audio feature extraction using VGGish embeddings
- **URL**: https://essentia.upf.edu/reference/std_TensorflowPredictVGGish.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

### Music Similarity

#### CrossSimilarityMatrix

- Euclidean cross-similarity between feature sequences
- **URL**: https://essentia.upf.edu/reference/std_CrossSimilarityMatrix.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

### Pitch

#### PitchYin

- Fundamental frequency estimation using YIN algorithm
- **URL**: https://essentia.upf.edu/reference/std_PitchYin.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### PitchYinFFT

- FFT-based YIN pitch estimation for faster processing
- **URL**: https://essentia.upf.edu/reference/std_PitchYinFFT.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### PitchMelodia

- Predominant melody extraction using MELODIA algorithm
- **URL**: https://essentia.upf.edu/reference/std_PitchMelodia.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### PitchCREPE

- Deep learning pitch estimation using CREPE neural network
- **URL**: https://essentia.upf.edu/reference/std_PitchCREPE.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### Vibrato

- Detects vibrato presence and estimates rate/extent
- **URL**: https://essentia.upf.edu/reference/std_Vibrato.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

### Plugin Hosting

#### AudioProcessor

- Core base class for audio plugin and standalone processors
- **URL**: https://docs.juce.com/master/classAudioProcessor.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Ritual

#### AudioPluginInstance

- Loaded plugin instance for hosting third-party effects
- **URL**: https://docs.juce.com/master/classAudioPluginInstance.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual

#### AudioProcessorValueTreeState

- Thread-safe parameter state with undo and serialization
- **URL**: https://docs.juce.com/master/classAudioProcessorValueTreeState.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

### Rhythm

#### BeatTrackerMultiFeature

- Beat position estimation using multiple onset features
- **URL**: https://essentia.upf.edu/reference/std_BeatTrackerMultiFeature.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### BeatTrackerDegara

- Beat tracking using complex spectral difference
- **URL**: https://essentia.upf.edu/reference/std_BeatTrackerDegara.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### RhythmExtractor2013

- Complete rhythm analysis with BPM and beat positions
- **URL**: https://essentia.upf.edu/reference/std_RhythmExtractor2013.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### OnsetDetection

- Onset detection functions (HFC/complex/flux methods)
- **URL**: https://essentia.upf.edu/reference/std_OnsetDetection.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### Danceability

- Danceability estimation from rhythmic features
- **URL**: https://essentia.upf.edu/reference/std_Danceability.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### TempoCNN

- Deep learning tempo estimation using convolutional networks
- **URL**: https://essentia.upf.edu/reference/std_TempoCNN.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### NoveltyCurve

- Onset detection function from spectral band differences
- **URL**: https://essentia.upf.edu/reference/std_NoveltyCurve.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### SuperFluxExtractor

- Onset detection using SuperFlux algorithm
- **URL**: https://essentia.upf.edu/reference/std_SuperFluxExtractor.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

### Segmentation

#### SBic

- Audio segmentation using Bayesian Information Criterion
- **URL**: https://essentia.upf.edu/reference/std_SBic.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

### Spectral

#### MFCC

- Mel-frequency cepstral coefficients for timbre analysis
- **URL**: https://essentia.upf.edu/reference/std_MFCC.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Orbs

#### MelBands

- Energy distribution across perceptual mel frequency bands
- **URL**: https://essentia.upf.edu/reference/std_MelBands.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### BarkBands

- Energy in Bark-scale critical frequency bands
- **URL**: https://essentia.upf.edu/reference/std_BarkBands.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### SpectralCentroidTime

- Brightness measurement as spectral center of gravity
- **URL**: https://essentia.upf.edu/reference/std_SpectralCentroidTime.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

#### SpectralContrast

- Spectral peak-valley contrast measurement
- **URL**: https://essentia.upf.edu/reference/std_SpectralContrast.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### SpectralComplexity

- Number of spectral peaks as complexity measure
- **URL**: https://essentia.upf.edu/reference/std_SpectralComplexity.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### Flux

- Spectral change rate between consecutive frames
- **URL**: https://essentia.upf.edu/reference/std_Flux.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### RollOff

- Frequency below which N% of spectral energy resides
- **URL**: https://essentia.upf.edu/reference/std_RollOff.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### LPC

- Linear Predictive Coefficients for vocal tract modeling
- **URL**: https://essentia.upf.edu/reference/std_LPC.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### ERBBands

- Equivalent Rectangular Bandwidth frequency band energies
- **URL**: https://essentia.upf.edu/reference/std_ERBBands.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### GFCC

- Gammatone-frequency cepstral coefficients
- **URL**: https://essentia.upf.edu/reference/std_GFCC.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### BFCC

- Bark-frequency cepstral coefficients
- **URL**: https://essentia.upf.edu/reference/std_BFCC.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### HFC

- High Frequency Content for onset and brightness detection
- **URL**: https://essentia.upf.edu/reference/std_HFC.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### PowerSpectrum

- Power spectrum (squared magnitude) computation
- **URL**: https://essentia.upf.edu/reference/std_PowerSpectrum.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

### Standard

#### Windowing

- Window functions (Hann/Hamming/Blackman) for spectral analysis
- **URL**: https://essentia.upf.edu/reference/std_Windowing.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### FrameCutter

- Slices audio signal into overlapping analysis frames
- **URL**: https://essentia.upf.edu/reference/std_FrameCutter.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

#### Spectrum

- Magnitude spectrum computation from time-domain signal
- **URL**: https://essentia.upf.edu/reference/std_Spectrum.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### AutoCorrelation

- Autocorrelation for periodicity and pitch analysis
- **URL**: https://essentia.upf.edu/reference/std_AutoCorrelation.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### ConstantQ

- Constant-Q transform with logarithmic frequency resolution
- **URL**: https://essentia.upf.edu/reference/std_ConstantQ.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### Resample

- Audio signal resampling to target sample rate
- **URL**: https://essentia.upf.edu/reference/std_Resample.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

### Statistics

#### Energy

- Signal energy computation
- **URL**: https://essentia.upf.edu/reference/std_Energy.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### RMS

- Root mean square level of audio signal
- **URL**: https://essentia.upf.edu/reference/std_RMS.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### ZeroCrossingRate

- Rate of sign changes in audio signal
- **URL**: https://essentia.upf.edu/reference/std_ZeroCrossingRate.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

#### Entropy

- Shannon entropy of signal distribution
- **URL**: https://essentia.upf.edu/reference/std_Entropy.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

### Synthesis

#### HarmonicModelAnal

- Harmonic model analysis for sinusoidal decomposition
- **URL**: https://essentia.upf.edu/reference/std_HarmonicModelAnal.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Ritual

#### SineModelSynth

- Sinusoidal model synthesis from analysis data
- **URL**: https://essentia.upf.edu/reference/std_SineModelSynth.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon;Ritual

### Tonal

#### HPCP

- Harmonic Pitch Class Profile for tonal content analysis
- **URL**: https://essentia.upf.edu/reference/std_HPCP.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon

#### Key

- Musical key estimation from harmonic pitch profiles
- **URL**: https://essentia.upf.edu/reference/std_Key.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### ChordsDetection

- Chord sequence estimation from pitch class profiles
- **URL**: https://essentia.upf.edu/reference/std_ChordsDetection.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### Dissonance

- Sensory dissonance measurement from spectral peaks
- **URL**: https://essentia.upf.edu/reference/std_Dissonance.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Ritual;Orbs

#### Inharmonicity

- Deviation from perfect harmonic series
- **URL**: https://essentia.upf.edu/reference/std_Inharmonicity.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### Chromagram

- Constant-Q chromagram computation via FFT
- **URL**: https://essentia.upf.edu/reference/std_Chromagram.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs

#### TuningFrequency

- Concert pitch / tuning frequency estimation
- **URL**: https://essentia.upf.edu/reference/std_TuningFrequency.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Ritual

#### HarmonicPeaks

- Harmonic peak extraction from spectral peaks
- **URL**: https://essentia.upf.edu/reference/std_HarmonicPeaks.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

#### Tristimulus

- Timbre descriptor based on harmonic energy distribution
- **URL**: https://essentia.upf.edu/reference/std_Tristimulus.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

### Transformations

#### PCA

- Principal Component Analysis for feature reduction
- **URL**: https://essentia.upf.edu/reference/std_PCA.html
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Pantheon

### Web

#### Essentia.js

- JavaScript port of Essentia for web-based audio analysis
- **URL**: https://mtg.github.io/essentia.js/
- **Scores**: prod=0.5 | learn=0.5 | blender=0.0 | priority=0.65
- **Projects**: Orbs;Pantheon;Ritual

---

## Quick Reference: Top 25 per Project (All Sources)

### Top 25 for Pantheon

| # | Name | Source | Priority | Category |
|---|------|--------|----------|----------|
| 1 | AudioContext | web-audio | 1.0 | Web Audio API |
| 2 | GainNode | web-audio | 1.0 | Web Audio API |
| 3 | AnalyserNode | web-audio | 1.0 | Web Audio API |
| 4 | Tone.js | web-audio | 1.0 | Audio Framework |
| 5 | Audio | threejs-docs | 0.98 | Reference |
| 6 | AudioListener | threejs-docs | 0.98 | Reference |
| 7 | AudioNode | web-audio | 0.97 | Web Audio API |
| 8 | AudioParam | web-audio | 0.97 | Web Audio API |
| 9 | AudioBufferSourceNode | web-audio | 0.97 | Web Audio API |
| 10 | BiquadFilterNode | web-audio | 0.97 | Web Audio API |
| 11 | Tone.Player | web-audio | 0.97 | Tone.js |
| 12 | Tone.Filter | web-audio | 0.97 | Tone.js |
| 13 | Tone.Reverb | web-audio | 0.97 | Tone.js |
| 14 | Tone.Meter | web-audio | 0.97 | Tone.js |
| 15 | howler.js | web-audio | 0.97 | Audio Library |
| 16 | Howl | web-audio | 0.97 | howler.js |
| 17 | AudioBuffer | web-audio | 0.94 | Web Audio API |
| 18 | AudioDestinationNode | web-audio | 0.94 | Web Audio API |
| 19 | ConvolverNode | web-audio | 0.94 | Web Audio API |
| 20 | DynamicsCompressorNode | web-audio | 0.94 | Web Audio API |
| 21 | Tone.Compressor | web-audio | 0.94 | Tone.js |
| 22 | Tone.Gain | web-audio | 0.94 | Tone.js |
| 23 | Three.js | awesome-js | 0.93 | WebGL/3D |
| 24 | Babylon.js | awesome-js | 0.93 | WebGL/3D |
| 25 | Anime.js | awesome-js | 0.93 | Animation |

### Top 25 for Orbs

| # | Name | Source | Priority | Category |
|---|------|--------|----------|----------|
| 1 | AudioContext | web-audio | 1.0 | Web Audio API |
| 2 | GainNode | web-audio | 1.0 | Web Audio API |
| 3 | AnalyserNode | web-audio | 1.0 | Web Audio API |
| 4 | Tone.js | web-audio | 1.0 | Audio Framework |
| 5 | BufferGeometry | threejs-docs | 0.98 | Reference |
| 6 | Object3D | threejs-docs | 0.98 | Reference |
| 7 | BoxGeometry | threejs-docs | 0.98 | Reference |
| 8 | SphereGeometry | threejs-docs | 0.98 | Reference |
| 9 | AmbientLight | threejs-docs | 0.98 | Reference |
| 10 | DirectionalLight | threejs-docs | 0.98 | Reference |
| 11 | PointLight | threejs-docs | 0.98 | Reference |
| 12 | SpotLight | threejs-docs | 0.98 | Reference |
| 13 | MeshPhysicalMaterial | threejs-docs | 0.98 | Reference |
| 14 | MeshStandardMaterial | threejs-docs | 0.98 | Reference |
| 15 | PointsMaterial | threejs-docs | 0.98 | Reference |
| 16 | ShaderMaterial | threejs-docs | 0.98 | Reference |
| 17 | Color | threejs-docs | 0.98 | Reference |
| 18 | Vector3 | threejs-docs | 0.98 | Reference |
| 19 | InstancedMesh | threejs-docs | 0.98 | Reference |
| 20 | Mesh | threejs-docs | 0.98 | Reference |
| 21 | Points | threejs-docs | 0.98 | Reference |
| 22 | Sprite | threejs-docs | 0.98 | Reference |
| 23 | Scene | threejs-docs | 0.98 | Reference |
| 24 | PostProcessing | threejs-docs | 0.98 | Reference |
| 25 | WebGLRenderer | threejs-docs | 0.98 | Reference |

### Top 25 for Wall

| # | Name | Source | Priority | Category |
|---|------|--------|----------|----------|
| 1 | TextureLoader | threejs-docs | 0.98 | Reference |
| 2 | D3.js | awesome-js | 0.93 | Data Visualization |
| 3 | Chart.js | awesome-js | 0.93 | Data Visualization |
| 4 | Anime.js | awesome-js | 0.93 | Animation |
| 5 | GSAP | awesome-js | 0.93 | Animation |
| 6 | Animate.css | awesome-js | 0.93 | Animation |
| 7 | React | awesome-js | 0.93 | UI |
| 8 | Vue.js | awesome-js | 0.93 | UI |
| 9 | Svelte | awesome-js | 0.93 | UI |
| 10 | Leaflet | awesome-js | 0.93 | Maps |
| 11 | Zod | awesome-js | 0.93 | Forms |
| 12 | Swiper | awesome-js | 0.93 | UI |
| 13 | Zustand | awesome-js | 0.93 | State Management |
| 14 | Storybook | awesome-js | 0.93 | Build Tools |
| 15 | React Spring | awesome-js | 0.93 | Animation |
| 16 | Framer Motion | awesome-js | 0.93 | Animation |
| 17 | anime.js | awesome-js | 0.93 | Animation |
| 18 | GreenSock ScrollTrigger | awesome-js | 0.93 | Animation |
| 19 | Pixi.js | awesome-js | 0.9 | WebGL/3D |
| 20 | Fabric.js | awesome-js | 0.9 | Canvas |
| 21 | ECharts | awesome-js | 0.9 | Data Visualization |
| 22 | Plotly.js | awesome-js | 0.9 | Data Visualization |
| 23 | Recharts | awesome-js | 0.9 | Data Visualization |
| 24 | Lottie | awesome-js | 0.9 | Animation |
| 25 | Video.js | awesome-js | 0.9 | Video |

### Top 25 for Constellation

| # | Name | Source | Priority | Category |
|---|------|--------|----------|----------|
| 1 | PerspectiveCamera | threejs-docs | 0.98 | Reference |
| 2 | PlaneGeometry | threejs-docs | 0.98 | Reference |
| 3 | PointsMaterial | threejs-docs | 0.98 | Reference |
| 4 | Line | threejs-docs | 0.98 | Reference |
| 5 | Points | threejs-docs | 0.98 | Reference |
| 6 | Three.js | awesome-js | 0.93 | WebGL/3D |
| 7 | D3.js | awesome-js | 0.93 | Data Visualization |
| 8 | Chart.js | awesome-js | 0.93 | Data Visualization |
| 9 | React Three Fiber | awesome-js | 0.93 | WebGL/3D |
| 10 | p5.js | awesome-js | 0.93 | Canvas |
| 11 | Pixi.js | awesome-js | 0.9 | WebGL/3D |
| 12 | Fabric.js | awesome-js | 0.9 | Canvas |
| 13 | ECharts | awesome-js | 0.9 | Data Visualization |
| 14 | Plotly.js | awesome-js | 0.9 | Data Visualization |
| 15 | Recharts | awesome-js | 0.9 | Data Visualization |
| 16 | Camera | threejs-docs | 0.89 | Reference |
| 17 | OrthographicCamera | threejs-docs | 0.89 | Reference |
| 18 | LineBasicMaterial | threejs-docs | 0.89 | Reference |
| 19 | LineSegments | threejs-docs | 0.89 | Reference |
| 20 | Paper.js | awesome-js | 0.86 | Canvas |
| 21 | Cytoscape.js | awesome-js | 0.86 | Data Visualization |
| 22 | Nivo | awesome-js | 0.86 | Data Visualization |
| 23 | chroma.js | awesome-js | 0.86 | Utilities |
| 24 | tsParticles | awesome-js | 0.86 | Animation |
| 25 | Konva | awesome-js | 0.86 | Canvas |

### Top 25 for Ritual

| # | Name | Source | Priority | Category |
|---|------|--------|----------|----------|
| 1 | AudioContext | web-audio | 1.0 | Web Audio API |
| 2 | GainNode | web-audio | 1.0 | Web Audio API |
| 3 | Tone.js | web-audio | 1.0 | Audio Framework |
| 4 | Raycaster | threejs-docs | 0.98 | Reference |
| 5 | MeshStandardMaterial | threejs-docs | 0.98 | Reference |
| 6 | OrbitControls | threejs-docs | 0.98 | Addons |
| 7 | OscillatorNode | web-audio | 0.97 | Web Audio API |
| 8 | AudioBufferSourceNode | web-audio | 0.97 | Web Audio API |
| 9 | StereoPannerNode | web-audio | 0.97 | Web Audio API |
| 10 | Tone.Synth | web-audio | 0.97 | Tone.js |
| 11 | Tone.Player | web-audio | 0.97 | Tone.js |
| 12 | Tone.Reverb | web-audio | 0.97 | Tone.js |
| 13 | Tone.Transport | web-audio | 0.97 | Tone.js |
| 14 | howler.js | web-audio | 0.97 | Audio Library |
| 15 | Howl | web-audio | 0.97 | howler.js |
| 16 | AudioBuffer | web-audio | 0.94 | Web Audio API |
| 17 | AudioDestinationNode | web-audio | 0.94 | Web Audio API |
| 18 | ConvolverNode | web-audio | 0.94 | Web Audio API |
| 19 | DelayNode | web-audio | 0.94 | Web Audio API |
| 20 | PannerNode | web-audio | 0.94 | Web Audio API |
| 21 | Tone.FMSynth | web-audio | 0.94 | Tone.js |
| 22 | Tone.AMSynth | web-audio | 0.94 | Tone.js |
| 23 | Tone.PolySynth | web-audio | 0.94 | Tone.js |
| 24 | Tone.Oscillator | web-audio | 0.94 | Tone.js |
| 25 | Tone.Loop | web-audio | 0.94 | Tone.js |

## MVI Stacks (High Prod, Low Blender, All Sources)

| Name | Source | Priority | Projects |
|------|--------|----------|----------|
| AudioContext | web-audio | 1.0 | Pantheon|Orbs|Ritual |
| GainNode | web-audio | 1.0 | Pantheon|Orbs|Ritual |
| AnalyserNode | web-audio | 1.0 | Orbs|Pantheon |
| Tone.js | web-audio | 1.0 | Pantheon|Orbs|Ritual |
| Audio | threejs-docs | 0.98 | Pantheon |
| AudioListener | threejs-docs | 0.98 | Pantheon |
| PerspectiveCamera | threejs-docs | 0.98 | Constellation |
| BufferGeometry | threejs-docs | 0.98 | Orbs |
| Object3D | threejs-docs | 0.98 | Orbs |
| Raycaster | threejs-docs | 0.98 | Ritual |
| BoxGeometry | threejs-docs | 0.98 | Orbs |
| PlaneGeometry | threejs-docs | 0.98 | Constellation |
| SphereGeometry | threejs-docs | 0.98 | Orbs |
| AmbientLight | threejs-docs | 0.98 | Orbs |
| DirectionalLight | threejs-docs | 0.98 | Orbs |
| PointLight | threejs-docs | 0.98 | Orbs |
| SpotLight | threejs-docs | 0.98 | Orbs |
| TextureLoader | threejs-docs | 0.98 | Wall |
| MeshPhysicalMaterial | threejs-docs | 0.98 | Orbs |
| MeshStandardMaterial | threejs-docs | 0.98 | Orbs|Ritual |
| PointsMaterial | threejs-docs | 0.98 | Constellation|Orbs |
| ShaderMaterial | threejs-docs | 0.98 | Orbs |
| Color | threejs-docs | 0.98 | Orbs |
| Vector3 | threejs-docs | 0.98 | Orbs |
| InstancedMesh | threejs-docs | 0.98 | Orbs |
| Line | threejs-docs | 0.98 | Constellation |
| Mesh | threejs-docs | 0.98 | Orbs |
| Points | threejs-docs | 0.98 | Constellation|Orbs |
| Sprite | threejs-docs | 0.98 | Orbs |
| Scene | threejs-docs | 0.98 | Orbs |
| PostProcessing | threejs-docs | 0.98 | Orbs |
| WebGLRenderer | threejs-docs | 0.98 | Orbs |
| WebGPURenderer | threejs-docs | 0.98 | Orbs |
| OrbitControls | threejs-docs | 0.98 | Ritual |
| EffectComposer | threejs-docs | 0.98 | Orbs |
| UnrealBloomPass | threejs-docs | 0.98 | Orbs |
| AudioNode | web-audio | 0.97 | Pantheon|Orbs |
| AudioParam | web-audio | 0.97 | Pantheon|Orbs |
| OscillatorNode | web-audio | 0.97 | Orbs|Ritual |
| AudioBufferSourceNode | web-audio | 0.97 | Pantheon|Ritual |

## Three.js Examples Index

Total: 563 official examples

| Category | Count |
|----------|-------|
| webgl | 216 |
| webgpu | 196 |
| webgl_advanced | 48 |
| webgl_postprocessing | 26 |
| webxr | 26 |
| misc | 21 |
| physics | 13 |
| css3d | 7 |
| webaudio | 4 |
| svg | 2 |
| tests | 2 |
| games | 1 |
| css2d | 1 |
