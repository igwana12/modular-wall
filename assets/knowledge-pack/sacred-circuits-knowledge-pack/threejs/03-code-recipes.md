# Three.js Code Recipes -- Sacred Circuits Knowledge Graph

> Verified against Three.js r170+ docs (threejs.org/docs).
> All imports use the ES-module paths shipped with the `three` npm package.

---

## Table of Contents

| # | Recipe | Complexity | Primary Project Fit |
|---|--------|-----------|---------------------|
| 1 | Scene Setup + Post-Processing Pipeline | beginner | All |
| 2 | GPU Particle System with Sacred Geometry | advanced | Orb / Spirit Sphere |
| 3 | Audio-Reactive Visual Feedback | intermediate | Pantheon / Spirit Sphere |
| 4 | GLTF Loading + Morph Target Facial Animation | intermediate | Pantheon (21 deities) |
| 5 | CSS3DRenderer Overlay for UI Panels | intermediate | mosAIc Wall / Pantheon |
| 6 | Wireframe / Edge Geometry for Constellation Characters | beginner | Constellation Characters |
| 7 | Bloom + UnrealBloomPass Sacred Glow | intermediate | Orb / Spirit Sphere |
| 8 | InstancedMesh for Large Particle Counts | intermediate | Orb / mosAIc |
| 9 | Raycaster Interaction System | beginner | Ritual Systems / All |
| 10 | WebXR Basic Setup | intermediate | Ritual Systems / XR |
| 11 | ShaderMaterial with Custom Uniforms | advanced | Orb / Spirit Sphere |
| 12 | Texture Animation (Sprite Sheets) | beginner | Pantheon / Cards |
| 13 | Camera Controls + Smooth Transitions | beginner | All |
| 14 | Light Probe / Environment Mapping | intermediate | Pantheon / Spirit Sphere |
| 15 | LOD System for Performance | intermediate | mosAIc / Pantheon |

---

## Recipe 1: Scene Setup + Post-Processing Pipeline

**APIs**: `WebGLRenderer`, `Scene`, `PerspectiveCamera`, `EffectComposer`, `RenderPass`, `ShaderPass`
**Project Fit**: All Sacred Circuits projects -- this is the foundation every scene needs.
**Complexity**: beginner

```js
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass }     from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass }     from 'three/examples/jsm/postprocessing/ShaderPass.js';

// --- Renderer ---
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap for perf
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// --- Scene + Camera ---
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,                                       // fov
  window.innerWidth / window.innerHeight,   // aspect
  0.1,                                      // near
  1000                                      // far
);
camera.position.set(0, 1.6, 5);

// --- Post-Processing ---
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Example: vignette pass (custom shader)
const VignetteShader = {
  uniforms: {
    tDiffuse:  { value: null },
    uDarkness: { value: 1.5 },
    uOffset:   { value: 1.0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uDarkness;
    uniform float uOffset;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      vec2 center = vUv - 0.5;
      float dist = length(center);
      texel.rgb *= smoothstep(0.8, uOffset * 0.5, dist * (uDarkness + uOffset));
      gl_FragColor = texel;
    }
  `,
};
composer.addPass(new ShaderPass(VignetteShader));

// --- Resize handler ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

// --- Render loop ---
const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();
  // update objects here
  composer.render();          // replaces renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate);
```

**Key Patterns**:
- Always cap `pixelRatio` at 2 to avoid GPU meltdown on retina displays.
- Use `setAnimationLoop` instead of `requestAnimationFrame` -- required for WebXR and cleaner cleanup.
- `EffectComposer` replaces `renderer.render()` once post-processing is active.

**Gotchas**:
- **Mistake**: Calling `renderer.render()` AND `composer.render()` produces a double-draw. | **Rule**: Use one or the other, never both.
- **Mistake**: Forgetting `composer.setSize()` on resize causes blurry output. | **Rule**: Every resize handler must update renderer, camera, AND composer.
- **Mistake**: Setting `toneMappingExposure` without enabling `toneMapping`. | **Rule**: `toneMappingExposure` only works when `toneMapping !== NoToneMapping`.

---

## Recipe 2: GPU Particle System with Sacred Geometry

**APIs**: `BufferGeometry`, `BufferAttribute`, `Points`, `ShaderMaterial`, `AdditiveBlending`
**Project Fit**: Orb / Spirit Sphere -- sacred glow particles orbiting the crystal ball.
**Complexity**: advanced

```js
import * as THREE from 'three';

const PARTICLE_COUNT = 50000;

// --- Build geometry with custom attributes ---
const geometry = new THREE.BufferGeometry();
const positions  = new Float32Array(PARTICLE_COUNT * 3);
const randoms    = new Float32Array(PARTICLE_COUNT);   // per-particle randomness
const phases     = new Float32Array(PARTICLE_COUNT);   // phase offset for orbits

for (let i = 0; i < PARTICLE_COUNT; i++) {
  // Distribute on sacred geometry patterns (torus knot parametric)
  const t = (i / PARTICLE_COUNT) * Math.PI * 2;
  const p = 2, q = 3;                                 // trefoil knot
  const r = 2 + Math.cos(q * t);
  positions[i * 3]     = r * Math.cos(p * t) + (Math.random() - 0.5) * 0.3;
  positions[i * 3 + 1] = r * Math.sin(p * t) + (Math.random() - 0.5) * 0.3;
  positions[i * 3 + 2] = -Math.sin(q * t)    + (Math.random() - 0.5) * 0.3;

  randoms[i] = Math.random();
  phases[i]  = Math.random() * Math.PI * 2;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('aRandom',  new THREE.BufferAttribute(randoms, 1));
geometry.setAttribute('aPhase',   new THREE.BufferAttribute(phases, 1));

// --- Shader material ---
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime:      { value: 0 },
    uSize:      { value: 4.0 },
    uColor1:    { value: new THREE.Color('#00e5c8') },  // Sacred Circuits teal
    uColor2:    { value: new THREE.Color('#ffd700') },  // Sacred gold
    uPixelRatio:{ value: Math.min(window.devicePixelRatio, 2) },
  },
  vertexShader: /* glsl */ `
    uniform float uTime;
    uniform float uSize;
    uniform float uPixelRatio;
    attribute float aRandom;
    attribute float aPhase;
    varying float vAlpha;
    varying float vMix;

    void main() {
      vec3 pos = position;

      // Orbital animation -- each particle spirals at its own rate
      float angle = uTime * (0.2 + aRandom * 0.5) + aPhase;
      pos.x += sin(angle) * 0.3 * aRandom;
      pos.y += cos(angle * 0.7) * 0.2;
      pos.z += sin(angle * 1.3) * 0.3 * (1.0 - aRandom);

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

      // Size attenuation (closer = bigger)
      gl_PointSize = uSize * uPixelRatio * (300.0 / -mvPosition.z);
      gl_Position  = projectionMatrix * mvPosition;

      // Pass varying to fragment
      vAlpha = smoothstep(0.0, 0.5, aRandom) * (0.4 + 0.6 * sin(uTime + aPhase));
      vMix   = aRandom;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying float vAlpha;
    varying float vMix;

    void main() {
      // Soft circle
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float strength = 1.0 - (dist * 2.0);
      strength = pow(strength, 3.0);                   // sharper falloff

      vec3 color = mix(uColor1, uColor2, vMix);
      gl_FragColor = vec4(color, strength * vAlpha);
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const particles = new THREE.Points(geometry, material);

// --- In animation loop ---
// material.uniforms.uTime.value = clock.getElapsedTime();
```

**Key Patterns**:
- Custom vertex attributes (`aRandom`, `aPhase`) give each particle individuality without CPU-side updates.
- Additive blending + `depthWrite: false` produces the luminous, ethereal glow look.
- Size attenuation formula `(constant / -mvPosition.z)` maintains consistent visual size.

**Gotchas**:
- **Mistake**: Using `gl_FragColor = vec4(color, strength)` without `transparent: true` renders everything opaque. | **Rule**: Alpha blending requires both the material flag and the shader output.
- **Mistake**: Updating 50k positions on CPU each frame kills performance. | **Rule**: All per-particle animation belongs in the vertex shader; only update uniforms from JS.
- **Mistake**: Forgetting `depthWrite: false` causes particles to z-fight and flicker. | **Rule**: Transparent additive particles must never write to the depth buffer.

---

## Recipe 3: Audio-Reactive Visual Feedback

**APIs**: `AudioListener`, `Audio`, `AudioAnalyser`, `ShaderMaterial` uniforms
**Project Fit**: Pantheon (deity voices drive visuals), Spirit Sphere (orb pulses with voice).
**Complexity**: intermediate

```js
import * as THREE from 'three';

// --- Audio setup (must follow a user gesture) ---
const listener  = new THREE.AudioListener();
camera.add(listener);                           // attach to camera

const sound     = new THREE.Audio(listener);
const analyser  = new THREE.AudioAnalyser(sound, 256); // fftSize: 256 -> 128 bins

// Load audio file
const audioLoader = new THREE.AudioLoader();
audioLoader.load('/audio/deity-voice.mp3', (buffer) => {
  sound.setBuffer(buffer);
  sound.setLoop(false);
  sound.setVolume(0.8);
});

// --- OR: connect a live microphone ---
async function connectMicrophone() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioCtx = listener.context;            // reuse Three's AudioContext
  const source = audioCtx.createMediaStreamSource(stream);
  sound.setNodeSource(source);
}

// --- Reactive mesh ---
const orbGeometry = new THREE.SphereGeometry(1, 64, 64);
const orbMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime:          { value: 0 },
    uBass:          { value: 0 },     // low freq energy
    uMid:           { value: 0 },     // mid freq energy
    uTreble:        { value: 0 },     // high freq energy
    uAverage:       { value: 0 },     // overall volume
    uBaseColor:     { value: new THREE.Color('#00e5c8') },
  },
  vertexShader: /* glsl */ `
    uniform float uTime;
    uniform float uBass;
    uniform float uMid;
    varying vec3 vNormal;
    varying float vDisplacement;

    void main() {
      vNormal = normal;

      // Displace vertices based on audio bands
      float displacement = 0.0;
      displacement += sin(position.y * 3.0 + uTime) * uBass * 0.3;
      displacement += sin(position.x * 5.0 + uTime * 1.5) * uMid * 0.15;

      vec3 pos = position + normal * displacement;
      vDisplacement = displacement;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uBaseColor;
    uniform float uTreble;
    uniform float uAverage;
    varying vec3 vNormal;
    varying float vDisplacement;

    void main() {
      // Fresnel rim glow intensified by treble
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
      fresnel *= 1.0 + uTreble * 2.0;

      vec3 color = uBaseColor + vec3(vDisplacement * 0.5, fresnel * 0.3, uAverage * 0.4);
      float alpha = 0.6 + fresnel * 0.4;

      gl_FragColor = vec4(color, alpha);
    }
  `,
  transparent: true,
  wireframe: false,
});

const orb = new THREE.Mesh(orbGeometry, orbMaterial);

// --- In animation loop: extract frequency bands ---
function updateAudioUniforms(elapsed) {
  const data = analyser.getFrequencyData(); // Uint8Array, 0-255 per bin

  // Split into bands (128 bins for fftSize 256)
  const bass   = average(data, 0, 10)   / 255;   // ~0-300 Hz
  const mid    = average(data, 10, 60)   / 255;   // ~300-4000 Hz
  const treble = average(data, 60, 128)  / 255;   // ~4000+ Hz
  const avg    = analyser.getAverageFrequency() / 255;

  // Smooth with lerp to avoid jitter
  const u = orbMaterial.uniforms;
  u.uBass.value   = THREE.MathUtils.lerp(u.uBass.value,   bass,   0.1);
  u.uMid.value    = THREE.MathUtils.lerp(u.uMid.value,    mid,    0.1);
  u.uTreble.value = THREE.MathUtils.lerp(u.uTreble.value, treble, 0.1);
  u.uAverage.value= THREE.MathUtils.lerp(u.uAverage.value,avg,    0.08);
  u.uTime.value   = elapsed;
}

function average(data, start, end) {
  let sum = 0;
  for (let i = start; i < end; i++) sum += data[i];
  return sum / (end - start);
}
```

**Key Patterns**:
- `THREE.MathUtils.lerp()` smooths frequency data -- raw FFT values jitter heavily.
- Splitting into bass/mid/treble bands lets you map different frequencies to different visual parameters.
- Connecting a live mic uses `setNodeSource()` instead of `setBuffer()`.

**Gotchas**:
- **Mistake**: Creating AudioContext before user gesture triggers browser autoplay block. | **Rule**: Call `listener.context.resume()` inside a click/touch handler.
- **Mistake**: Using `fftSize: 2048` when you only need rough bands wastes CPU. | **Rule**: `fftSize: 256` (128 bins) is plenty for bass/mid/treble splits.
- **Mistake**: Passing raw FFT values directly to shader uniforms causes visual seizure. | **Rule**: Always lerp/smooth audio values between frames.

---

## Recipe 4: GLTF Loading + Morph Target Facial Animation

**APIs**: `GLTFLoader`, `AnimationMixer`, `AnimationAction`, `Mesh.morphTargetInfluences`
**Project Fit**: Pantheon -- 21 deity GLTF characters with speaking mouth animations and expressions.
**Complexity**: intermediate

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// --- Draco compression (optional but recommended for large models) ---
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// --- Deity model storage ---
const deities = new Map(); // name -> { model, mixer, morphMap, actions }

async function loadDeity(name, url) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(url, (gltf) => {
      const model = gltf.scene;
      model.scale.setScalar(1.0);

      // Find the skinned mesh with morph targets
      let faceMesh = null;
      model.traverse((child) => {
        if (child.isMesh && child.morphTargetDictionary) {
          faceMesh = child;
        }
        // Enable shadows
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Build morph target lookup: { "mouthOpen": 0, "eyeBlink": 1, ... }
      const morphMap = faceMesh?.morphTargetDictionary || {};

      // Animation mixer for skeletal animations
      const mixer = new THREE.AnimationMixer(model);
      const actions = {};
      gltf.animations.forEach((clip) => {
        actions[clip.name] = mixer.clipAction(clip);
      });

      const entry = { model, mixer, morphMap, faceMesh, actions };
      deities.set(name, entry);

      scene.add(model);
      resolve(entry);
    }, undefined, reject);
  });
}

// --- Drive morph targets from audio energy (speaking) ---
function updateDeityFace(name, audioEnergy) {
  const deity = deities.get(name);
  if (!deity?.faceMesh) return;

  const influences = deity.faceMesh.morphTargetInfluences;
  const map = deity.morphMap;

  // Mouth opens proportional to audio energy
  if (map.mouthOpen !== undefined) {
    const target = THREE.MathUtils.clamp(audioEnergy * 1.5, 0, 1);
    influences[map.mouthOpen] = THREE.MathUtils.lerp(
      influences[map.mouthOpen], target, 0.25
    );
  }

  // Subtle brow movement
  if (map.browInnerUp !== undefined) {
    influences[map.browInnerUp] = Math.sin(Date.now() * 0.003) * 0.15 + 0.1;
  }

  // Periodic blink
  if (map.eyeBlink !== undefined) {
    const blinkCycle = (Date.now() % 4000) / 4000;
    influences[map.eyeBlink] = blinkCycle > 0.95 ? 1.0 : 0.0;
  }
}

// --- Play a skeletal animation ---
function playAction(name, actionName, { fadeIn = 0.5, loop = true } = {}) {
  const deity = deities.get(name);
  if (!deity?.actions[actionName]) return;

  const action = deity.actions[actionName];
  action.reset();
  action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce);
  action.clampWhenFinished = !loop;
  action.fadeIn(fadeIn).play();
}

// --- In animation loop ---
// deities.forEach((d) => d.mixer.update(delta));
// updateDeityFace('athena', currentAudioEnergy);
```

**Key Patterns**:
- Morph targets in GLTF follow the ARKit naming convention (mouthOpen, eyeBlink, browInnerUp, etc.).
- Separate skeletal animation (AnimationMixer) from morph targets (morphTargetInfluences) -- they compose independently.
- Use `clampWhenFinished = true` for one-shot animations so they hold the final pose.

**Gotchas**:
- **Mistake**: Calling `mixer.update(delta)` with elapsed time instead of delta causes animation speed explosion. | **Rule**: `delta` is seconds since last frame, not total elapsed time.
- **Mistake**: Assuming all meshes in a GLTF have morph targets. | **Rule**: Always traverse and check `morphTargetDictionary` existence.
- **Mistake**: Not calling `action.reset()` before `play()` on a finished action. | **Rule**: Finished actions must be reset or they silently do nothing.

---

## Recipe 5: CSS3DRenderer Overlay for UI Panels

**APIs**: `CSS3DRenderer`, `CSS3DObject`, `CSS3DSprite`
**Project Fit**: mosAIc wall installations (DOM panels floating in 3D), Pantheon (deity info cards).
**Complexity**: intermediate

```js
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// --- Dual renderer setup ---
// WebGL for 3D objects
const glRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
glRenderer.setSize(window.innerWidth, window.innerHeight);
glRenderer.domElement.style.position = 'absolute';
glRenderer.domElement.style.top = '0';
document.body.appendChild(glRenderer.domElement);

// CSS3D for DOM elements in 3D space
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
cssRenderer.domElement.style.pointerEvents = 'none'; // let clicks through to WebGL
document.body.appendChild(cssRenderer.domElement);

// Shared scene and camera for both renderers
const scene    = new THREE.Scene();
const cssScene = new THREE.Scene(); // separate scene for CSS objects
const camera   = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// --- Create a DOM panel in 3D space ---
function createPanel(html, position, rotation, scale = 0.01) {
  const div = document.createElement('div');
  div.innerHTML = html;
  div.style.width = '400px';
  div.style.padding = '20px';
  div.style.background = 'rgba(0, 229, 200, 0.15)';    // teal glass
  div.style.border = '1px solid rgba(0, 229, 200, 0.4)';
  div.style.borderRadius = '12px';
  div.style.color = '#e0e0e0';
  div.style.fontFamily = 'system-ui, sans-serif';
  div.style.backdropFilter = 'blur(10px)';
  div.style.pointerEvents = 'auto';                      // re-enable for this panel

  const cssObject = new CSS3DObject(div);
  cssObject.position.copy(position);
  if (rotation) cssObject.rotation.copy(rotation);
  cssObject.scale.setScalar(scale);                       // scale DOWN -- DOM pixels are huge in 3D

  cssScene.add(cssObject);
  return { div, cssObject };
}

// --- Create deity info card ---
const deityCard = createPanel(
  `<h2 style="margin:0;color:#ffd700">Athena</h2>
   <p>Goddess of wisdom, craft, and strategic warfare.</p>
   <button id="btn-oracle" style="padding:8px 16px;cursor:pointer">
     Consult the Oracle
   </button>`,
  new THREE.Vector3(2, 1, 0),
  new THREE.Euler(0, -0.3, 0)
);

// DOM events work normally
deityCard.div.querySelector('#btn-oracle').addEventListener('click', () => {
  console.log('Oracle consultation triggered');
});

// --- Animate panels ---
function animate() {
  // Rotate card to face camera (billboard)
  // deityCard.cssObject.lookAt(camera.position);

  glRenderer.render(scene, camera);
  cssRenderer.render(cssScene, camera);
}
glRenderer.setAnimationLoop(animate);
```

**Key Patterns**:
- Two renderers sharing one camera but separate scenes -- CSS3D objects live in `cssScene`.
- Scale CSS3DObjects to ~0.01 because DOM pixels map 1:1 to Three.js units (a 400px div = 400 units without scaling).
- `pointerEvents: none` on the CSS renderer container, then `auto` on individual interactive panels.

**Gotchas**:
- **Mistake**: Putting CSS3DObject in the same scene as WebGL objects causes nothing to render. | **Rule**: CSS3D and WebGL objects need separate scenes, both rendered each frame.
- **Mistake**: Forgetting the scale factor produces panels that fill the entire viewport. | **Rule**: `scale.setScalar(0.01)` is the standard starting point for DOM-to-3D.
- **Mistake**: Z-ordering conflicts between CSS and WebGL layers. | **Rule**: Keep CSS panels slightly in front or behind WebGL geometry; exact coplanar causes flicker.

---

## Recipe 6: Wireframe / Edge Geometry for Constellation Characters

**APIs**: `EdgesGeometry`, `LineSegments`, `LineBasicMaterial`, `WireframeGeometry`, `BufferGeometry`
**Project Fit**: Constellation Characters -- celestial wireframe beings made of star-lines.
**Complexity**: beginner

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// --- Approach 1: Edge geometry from a loaded model ---
const loader = new GLTFLoader();
loader.load('/models/constellation-figure.glb', (gltf) => {
  gltf.scene.traverse((child) => {
    if (!child.isMesh) return;

    // Extract edges at threshold angle (only show "hard" edges)
    const edges = new THREE.EdgesGeometry(child.geometry, 15); // 15-degree threshold
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.7,
      linewidth: 1, // NOTE: linewidth > 1 only works on some backends
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);

    // Copy transform from original mesh
    wireframe.position.copy(child.position);
    wireframe.rotation.copy(child.rotation);
    wireframe.scale.copy(child.scale);

    scene.add(wireframe);
    // Optionally hide the solid mesh:
    // child.visible = false;
  });
});

// --- Approach 2: Custom constellation lines (connect star points) ---
function createConstellation(starPositions, connections) {
  // Star points
  const pointsGeo = new THREE.BufferGeometry();
  const posArray = new Float32Array(starPositions.flat());
  pointsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
  });
  const stars = new THREE.Points(pointsGeo, starMaterial);

  // Connection lines
  const linePositions = [];
  connections.forEach(([a, b]) => {
    linePositions.push(...starPositions[a], ...starPositions[b]);
  });
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position',
    new THREE.BufferAttribute(new Float32Array(linePositions), 3)
  );

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x4488ff,
    transparent: true,
    opacity: 0.4,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);

  const group = new THREE.Group();
  group.add(stars);
  group.add(lines);
  return group;
}

// --- Example: Orion-style constellation character ---
const orionStars = [
  [0, 2, 0],      // head
  [-0.5, 1, 0],   // left shoulder
  [0.5, 1, 0],    // right shoulder
  [0, 0.5, 0],    // torso center
  [-0.3, -0.5, 0],// left hip
  [0.3, -0.5, 0], // right hip
  [-0.5, -1.5, 0],// left foot
  [0.5, -1.5, 0], // right foot
];
const orionLines = [
  [0, 1], [0, 2],   // head to shoulders
  [1, 3], [2, 3],   // shoulders to center
  [3, 4], [3, 5],   // center to hips
  [4, 6], [5, 7],   // hips to feet
];

const orion = createConstellation(orionStars, orionLines);
scene.add(orion);

// --- Animate: twinkle stars ---
function twinkle(points, elapsed) {
  const sizes = points.geometry.attributes.position; // use for count
  points.material.opacity = 0.6 + Math.sin(elapsed * 2) * 0.3;
}
```

**Key Patterns**:
- `EdgesGeometry(geometry, thresholdAngle)` extracts only the "interesting" edges, not every triangle edge.
- Combining `Points` (for star dots) with `LineSegments` (for connections) in a `Group` creates the classic constellation look.
- Threshold angle of 15 degrees is a good starting point for clean silhouettes.

**Gotchas**:
- **Mistake**: Using `WireframeGeometry` instead of `EdgesGeometry` produces a noisy triangle soup. | **Rule**: `WireframeGeometry` shows ALL triangles; `EdgesGeometry` shows only edges above a crease angle.
- **Mistake**: Expecting `linewidth > 1` to work in WebGL. | **Rule**: `linewidth` is capped at 1 on most platforms. Use `Line2`/`LineMaterial` from examples for thick lines.
- **Mistake**: Building LineSegments with an odd number of vertices. | **Rule**: `LineSegments` draws pairs -- vertices must come in multiples of 2.

---

## Recipe 7: Bloom + UnrealBloomPass Sacred Glow

**APIs**: `UnrealBloomPass`, `EffectComposer`, `RenderPass`, `Layers`
**Project Fit**: Orb / Spirit Sphere -- divine glow on sacred geometry, deity auras.
**Complexity**: intermediate

```js
import * as THREE from 'three';
import { EffectComposer }   from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass }       from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass }  from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass }       from 'three/examples/jsm/postprocessing/OutputPass.js';

// --- Basic bloom setup ---
const bloomParams = {
  strength:  1.5,    // glow intensity
  radius:    0.4,    // glow spread
  threshold: 0.85,   // brightness cutoff -- only bright things glow
};

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  bloomParams.strength,
  bloomParams.radius,
  bloomParams.threshold
);
composer.addPass(bloomPass);
composer.addPass(new OutputPass()); // color space correction

// --- Selective bloom using Layers ---
// Only objects on layer 1 should glow
const BLOOM_LAYER = 1;
const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_LAYER);

// Sacred orb glows
const orbMesh = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1, 4),
  new THREE.MeshStandardMaterial({
    color: 0x00e5c8,
    emissive: 0x00e5c8,
    emissiveIntensity: 2.0,   // drives bloom
  })
);
orbMesh.layers.enable(BLOOM_LAYER);
scene.add(orbMesh);

// Background pedestal does NOT glow
const pedestal = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.7, 0.3, 32),
  new THREE.MeshStandardMaterial({ color: 0x333333 })
);
// pedestal stays on default layer 0 only
scene.add(pedestal);

// --- Selective bloom render technique ---
const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const materials = {};

function darkenNonBloomed(obj) {
  if (obj.isMesh && !bloomLayer.test(obj.layers)) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterials(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

// --- Render loop with selective bloom ---
function animate() {
  // Pass 1: render bloom only on glowing objects
  scene.traverse(darkenNonBloomed);
  composer.render();
  scene.traverse(restoreMaterials);

  // For simple (non-selective) bloom, just use:
  // composer.render();
}
renderer.setAnimationLoop(animate);

// --- Runtime tuning ---
// bloomPass.strength  = 2.0;  // crank up for ritual moments
// bloomPass.threshold = 0.6;  // lower = more things glow
```

**Key Patterns**:
- `emissive` + `emissiveIntensity` on MeshStandardMaterial is what "feeds" the bloom pass.
- Selective bloom uses Layers: objects on the bloom layer get rendered, everything else is blacked out for the bloom pass.
- `OutputPass` at the end handles the linear-to-sRGB color space conversion.

**Gotchas**:
- **Mistake**: Bloom makes the whole scene glow when threshold is too low. | **Rule**: Start with threshold 0.85 and lower carefully; use selective bloom for precise control.
- **Mistake**: Missing `OutputPass` at the end of the chain causes washed-out colors. | **Rule**: Always add `OutputPass` as the final pass when using `SRGBColorSpace`.
- **Mistake**: Performance collapse from bloom on high-res displays. | **Rule**: Pass a reduced resolution to `UnrealBloomPass` constructor (e.g., half window size) for better FPS.

---

## Recipe 8: InstancedMesh for Large Particle Counts

**APIs**: `InstancedMesh`, `Matrix4`, `Color`, `DynamicDrawUsage`
**Project Fit**: Orb (thousands of sacred geometry fragments), mosAIc (repeated tile elements).
**Complexity**: intermediate

```js
import * as THREE from 'three';

const COUNT = 10000;
const dummy = new THREE.Object3D(); // reusable transform helper

// --- Create instanced mesh ---
const geometry = new THREE.OctahedronGeometry(0.05, 0); // tiny sacred shape
const material = new THREE.MeshStandardMaterial({
  color: 0xffd700,
  emissive: 0x00e5c8,
  emissiveIntensity: 0.5,
  metalness: 0.8,
  roughness: 0.2,
});

const mesh = new THREE.InstancedMesh(geometry, material, COUNT);
mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // hint: we update every frame

// --- Initialize positions in a sphere distribution ---
const instanceData = []; // store per-instance state for animation

for (let i = 0; i < COUNT; i++) {
  // Fibonacci sphere distribution (even spacing)
  const phi   = Math.acos(1 - 2 * (i + 0.5) / COUNT);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  const r     = 2 + Math.random() * 0.5;

  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);

  dummy.position.set(x, y, z);
  dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  dummy.scale.setScalar(0.5 + Math.random() * 1.5);
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);

  // Per-instance color
  const hue = 0.45 + Math.random() * 0.15; // teal-to-gold range
  mesh.setColorAt(i, new THREE.Color().setHSL(hue, 0.8, 0.6));

  // Store for animation
  instanceData.push({ phi, theta, r, speed: 0.2 + Math.random() * 0.5 });
}

mesh.instanceMatrix.needsUpdate = true;
mesh.instanceColor.needsUpdate = true;
scene.add(mesh);

// --- Animate instances ---
function updateInstances(elapsed) {
  for (let i = 0; i < COUNT; i++) {
    const d = instanceData[i];

    // Orbital motion
    const angle = elapsed * d.speed;
    const x = d.r * Math.sin(d.phi) * Math.cos(d.theta + angle);
    const y = d.r * Math.sin(d.phi) * Math.sin(d.theta + angle);
    const z = d.r * Math.cos(d.phi);

    dummy.position.set(x, y, z);
    dummy.rotation.x = elapsed * d.speed * 0.5;
    dummy.rotation.y = elapsed * d.speed * 0.3;
    dummy.scale.setScalar(0.8 + Math.sin(elapsed * d.speed + i) * 0.2);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}
```

**Key Patterns**:
- One draw call for 10,000 objects vs 10,000 individual meshes = massive GPU performance win.
- `DynamicDrawUsage` tells the driver the buffer changes every frame -- avoids a pipeline stall.
- Fibonacci sphere distribution gives visually even spacing without clustering at poles.

**Gotchas**:
- **Mistake**: Forgetting `instanceMatrix.needsUpdate = true` after `setMatrixAt`. | **Rule**: Every frame you update matrices, you must flag the buffer.
- **Mistake**: Calling `dummy.updateMatrix()` without setting position/rotation/scale first. | **Rule**: Always set ALL transform components on the dummy before `updateMatrix()`.
- **Mistake**: Using InstancedMesh for 50 objects. | **Rule**: Below ~100 instances, regular meshes are simpler and fast enough.

---

## Recipe 9: Raycaster Interaction System

**APIs**: `Raycaster`, `Vector2`, `EventDispatcher`
**Project Fit**: Ritual Systems (spatial invocations), all interactive projects.
**Complexity**: beginner

```js
import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const pointer   = new THREE.Vector2();

// --- Track interactive objects ---
const interactives = []; // meshes that respond to interaction

function registerInteractive(mesh, callbacks = {}) {
  mesh.userData.callbacks = callbacks;
  interactives.push(mesh);
  return mesh;
}

// --- Pointer tracking ---
window.addEventListener('pointermove', (event) => {
  pointer.x =  (event.clientX / window.innerWidth)  * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// --- Hover state ---
let hoveredObject = null;

function updateHover() {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(interactives, false);

  if (intersects.length > 0) {
    const hit = intersects[0].object;
    if (hoveredObject !== hit) {
      // Mouse leave old
      if (hoveredObject?.userData.callbacks.onLeave) {
        hoveredObject.userData.callbacks.onLeave(hoveredObject);
      }
      // Mouse enter new
      hoveredObject = hit;
      if (hit.userData.callbacks.onEnter) {
        hit.userData.callbacks.onEnter(hit, intersects[0]);
      }
      document.body.style.cursor = 'pointer';
    }
  } else if (hoveredObject) {
    if (hoveredObject.userData.callbacks.onLeave) {
      hoveredObject.userData.callbacks.onLeave(hoveredObject);
    }
    hoveredObject = null;
    document.body.style.cursor = 'default';
  }
}

// --- Click handling ---
window.addEventListener('click', () => {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(interactives, false);

  if (intersects.length > 0) {
    const hit = intersects[0];
    if (hit.object.userData.callbacks.onClick) {
      hit.object.userData.callbacks.onClick(hit.object, hit);
    }
  }
});

// --- Usage: register a deity statue ---
const athenaStatue = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({ color: 0xffd700 })
);

registerInteractive(athenaStatue, {
  onEnter: (mesh) => {
    mesh.material.emissive.setHex(0x00e5c8);
    mesh.material.emissiveIntensity = 0.5;
  },
  onLeave: (mesh) => {
    mesh.material.emissive.setHex(0x000000);
    mesh.material.emissiveIntensity = 0;
  },
  onClick: (mesh, intersection) => {
    console.log('Invoke Athena oracle at', intersection.point);
    // Trigger oracle reading flow
  },
});

scene.add(athenaStatue);

// --- In animation loop ---
// updateHover();
```

**Key Patterns**:
- Normalized device coordinates: x/y in [-1, 1] range, y inverted from screen space.
- Separate hover state tracking (enter/leave) from click handling.
- `intersectObjects(array, false)` -- second param `false` means don't recurse into children (faster).

**Gotchas**:
- **Mistake**: Running raycaster against the entire scene graph. | **Rule**: Always pass a curated array of interactive objects, never `scene.children`.
- **Mistake**: Forgetting the `recursive` parameter when models are `Group` containers. | **Rule**: Set `recursive: true` when your interactive objects are GLTFs (mesh is nested inside Group).
- **Mistake**: Raycasting every pixel of mousemove kills FPS. | **Rule**: Throttle `updateHover()` to once per frame (in the animation loop), not in the event handler.

---

## Recipe 10: WebXR Basic Setup

**APIs**: `WebGLRenderer.xr`, `XRButton` (VRButton/ARButton), `XRControllerModelFactory`
**Project Fit**: Ritual Systems -- spatial deity invocations in VR/AR.
**Complexity**: intermediate

```js
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

// --- Enable XR on renderer ---
renderer.xr.enabled = true;

// --- Add VR or AR button ---
// For VR:
document.body.appendChild(VRButton.createButton(renderer));
// For AR:
// document.body.appendChild(ARButton.createButton(renderer, {
//   requiredFeatures: ['hit-test'],
//   optionalFeatures: ['dom-overlay'],
// }));

// --- Controller setup ---
const controllerModelFactory = new XRControllerModelFactory();

function setupController(index) {
  const controller = renderer.xr.getController(index);
  controller.addEventListener('selectstart', onSelectStart);
  controller.addEventListener('selectend', onSelectEnd);
  controller.addEventListener('squeeze', onSqueeze);
  scene.add(controller);

  // Visual model (matches actual hardware)
  const grip = renderer.xr.getControllerGrip(index);
  grip.add(controllerModelFactory.createControllerModel(grip));
  scene.add(grip);

  // Pointer ray
  const rayGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -5),
  ]);
  const ray = new THREE.Line(
    rayGeometry,
    new THREE.LineBasicMaterial({ color: 0x00e5c8 })
  );
  controller.add(ray);

  return controller;
}

const controller0 = setupController(0);
const controller1 = setupController(1);

// --- XR interaction callbacks ---
function onSelectStart(event) {
  const controller = event.target;

  // Raycast from controller into scene
  const tempMatrix = new THREE.Matrix4();
  tempMatrix.identity().extractRotation(controller.matrixWorld);

  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

  const intersects = raycaster.intersectObjects(interactives, true);
  if (intersects.length > 0) {
    const hit = intersects[0].object;
    // Attach object to controller (grab)
    controller.attach(hit);
    controller.userData.selected = hit;
  }
}

function onSelectEnd(event) {
  const controller = event.target;
  if (controller.userData.selected) {
    // Release back to scene
    scene.attach(controller.userData.selected);
    controller.userData.selected = null;
  }
}

function onSqueeze(event) {
  // Ritual gesture -- invoke deity
  console.log('Ritual squeeze detected');
}

// --- Animation loop (must use setAnimationLoop for XR) ---
function animate(timestamp, frame) {
  // `frame` is the XRFrame when in XR session, undefined otherwise
  if (frame) {
    // XR-specific logic here
    const referenceSpace = renderer.xr.getReferenceSpace();
    const session = renderer.xr.getSession();
  }

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
```

**Key Patterns**:
- `renderer.xr.enabled = true` must be set before creating the animation loop.
- Controllers emit DOM-like events: `selectstart`, `selectend`, `squeeze`, `connected`, `disconnected`.
- `controller.attach(object)` reparents the object to the controller's transform (grab behavior).

**Gotchas**:
- **Mistake**: Using `requestAnimationFrame` with WebXR. | **Rule**: WebXR requires `renderer.setAnimationLoop()` -- RAF does not sync with the XR display.
- **Mistake**: Forgetting to set reference space type before session start. | **Rule**: Call `renderer.xr.setReferenceSpaceType('local-floor')` before appending VRButton.
- **Mistake**: Placing the camera far from origin in VR. | **Rule**: In VR, the camera position is overridden by the headset; place your scene around the origin.

---

## Recipe 11: ShaderMaterial with Custom Uniforms

**APIs**: `ShaderMaterial`, `UniformsLib`, `UniformsUtils`, `Clock`
**Project Fit**: Orb / Spirit Sphere -- custom sacred energy shaders, ritual effects.
**Complexity**: advanced

```js
import * as THREE from 'three';

// --- Sacred energy shader ---
const SacredEnergyMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime:        { value: 0 },
    uIntensity:   { value: 1.0 },
    uColor1:      { value: new THREE.Color('#00e5c8') },  // teal
    uColor2:      { value: new THREE.Color('#ffd700') },  // gold
    uNoiseScale:  { value: 3.0 },
    uPulseSpeed:  { value: 1.5 },
    uFresnelPow:  { value: 2.5 },
    uTexture:     { value: null },                         // optional texture
  },

  vertexShader: /* glsl */ `
    uniform float uTime;
    uniform float uIntensity;
    uniform float uNoiseScale;

    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    varying float vNoise;

    // Simplex-style noise (compact 3D)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g  = step(x0.yzx, x0.xyz);
      vec3 l  = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      // Noise displacement
      float noise = snoise(position * uNoiseScale + uTime * 0.3);
      vNoise = noise;

      vec3 displaced = position + normal * noise * 0.1 * uIntensity;
      vWorldPos = (modelMatrix * vec4(displaced, 1.0)).xyz;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
  `,

  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform float uIntensity;
    uniform float uPulseSpeed;
    uniform float uFresnelPow;
    uniform vec3 uColor1;
    uniform vec3 uColor2;

    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    varying float vNoise;

    void main() {
      // Fresnel rim lighting
      vec3 viewDir = normalize(cameraPosition - vWorldPos);
      float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), uFresnelPow);

      // Pulsing energy
      float pulse = sin(uTime * uPulseSpeed) * 0.5 + 0.5;

      // Mix colors based on noise + pulse
      float mixFactor = vNoise * 0.5 + 0.5;
      mixFactor = mixFactor * 0.7 + pulse * 0.3;
      vec3 color = mix(uColor1, uColor2, mixFactor);

      // Final compositing
      float alpha = (fresnel * 0.6 + 0.2) * uIntensity;
      color += fresnel * uColor2 * 0.5; // gold rim glow

      gl_FragColor = vec4(color, alpha);
    }
  `,

  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.DoubleSide,
});

// Apply to sacred geometry
const sacredOrb = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1, 6),
  SacredEnergyMaterial
);
scene.add(sacredOrb);

// --- In animation loop ---
// SacredEnergyMaterial.uniforms.uTime.value = clock.getElapsedTime();
// SacredEnergyMaterial.uniforms.uIntensity.value = currentRitualIntensity;
```

**Key Patterns**:
- Inline simplex noise in GLSL avoids texture-based noise lookups (faster on mobile GPUs).
- Fresnel effect creates the "sacred glow at edges" look without post-processing.
- All visual parameters are uniforms -- JS controls them in real time without recompiling the shader.

**Gotchas**:
- **Mistake**: Modifying uniform `.value` reference instead of property (e.g., `uniform.value = new Color()` each frame). | **Rule**: Mutate in-place: `uniform.value.set(r,g,b)` for Color, `uniform.value = float` for numbers.
- **Mistake**: Forgetting `normalMatrix` in vertex shader causes lighting to break on scaled objects. | **Rule**: Always transform normals with `normalMatrix`, not `modelMatrix`.
- **Mistake**: Using `cameraPosition` in fragment shader without it being available. | **Rule**: Three.js auto-injects `cameraPosition` as a uniform for ShaderMaterial -- but only when `material.isMaterial` is true (which it is by default).

---

## Recipe 12: Texture Animation (Sprite Sheets)

**APIs**: `TextureLoader`, `SpriteMaterial`, `Sprite`, `Texture.offset`, `Texture.repeat`
**Project Fit**: Pantheon (deity ability effects), Oracle Cards (animated sigils).
**Complexity**: beginner

```js
import * as THREE from 'three';

// --- Sprite sheet animator class ---
class SpriteSheetAnimator {
  constructor(texture, tilesX, tilesY, totalFrames, fps = 12) {
    this.texture = texture;
    this.tilesX = tilesX;
    this.tilesY = tilesY;
    this.totalFrames = totalFrames;
    this.fps = fps;
    this.currentFrame = 0;
    this.elapsed = 0;
    this.loop = true;

    // Configure texture for tiling
    texture.repeat.set(1 / tilesX, 1 / tilesY);
    texture.magFilter = THREE.NearestFilter; // pixel-perfect for pixel art
    // Use LinearFilter for smooth art:
    // texture.magFilter = THREE.LinearFilter;
  }

  update(delta) {
    this.elapsed += delta;
    const frameDuration = 1 / this.fps;

    if (this.elapsed >= frameDuration) {
      this.elapsed -= frameDuration;
      this.currentFrame++;

      if (this.currentFrame >= this.totalFrames) {
        this.currentFrame = this.loop ? 0 : this.totalFrames - 1;
      }

      const col = this.currentFrame % this.tilesX;
      const row = Math.floor(this.currentFrame / this.tilesX);

      this.texture.offset.x = col / this.tilesX;
      this.texture.offset.y = 1 - (row + 1) / this.tilesY; // flip Y
    }
  }
}

// --- Usage: animated sacred fire effect ---
const fireTexture = new THREE.TextureLoader().load('/textures/fire-spritesheet.png');
const fireAnimator = new SpriteSheetAnimator(
  fireTexture,
  8,    // columns in sprite sheet
  4,    // rows
  30,   // total frames
  15    // fps
);

// As a Sprite (always faces camera)
const fireSprite = new THREE.Sprite(
  new THREE.SpriteMaterial({
    map: fireTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
  })
);
fireSprite.scale.set(2, 2, 1);
scene.add(fireSprite);

// --- OR: as a plane mesh (oriented in world space) ---
const firePlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.MeshBasicMaterial({
    map: fireTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
);
scene.add(firePlane);

// --- In animation loop ---
// fireAnimator.update(delta);
```

**Key Patterns**:
- `texture.repeat` sets the UV window size; `texture.offset` slides the window across the sheet.
- Y-axis is flipped (`1 - (row + 1) / tilesY`) because Three.js textures start from bottom-left.
- Use `Sprite` for always-facing-camera effects; use `PlaneGeometry` for world-anchored effects.

**Gotchas**:
- **Mistake**: Sprite sheet Y offset goes up instead of down, playing rows in reverse. | **Rule**: Three.js UV origin is bottom-left; subtract from 1.0 for top-down sheet layouts.
- **Mistake**: Using `LinearFilter` on pixel art causes blurring. | **Rule**: Use `NearestFilter` for pixel art, `LinearFilter` for painted/photographic art.
- **Mistake**: Not setting `texture.repeat` before `texture.offset` causes full-image flash on first frame. | **Rule**: Set `repeat` immediately after texture creation, before the first render.

---

## Recipe 13: Camera Controls + Smooth Transitions

**APIs**: `OrbitControls`, `Vector3.lerp`, `Quaternion.slerp`, `MathUtils.damp`
**Project Fit**: All projects -- orbiting deity models, transitioning between views.
**Complexity**: beginner

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// --- OrbitControls setup ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;    // smooth deceleration
controls.dampingFactor = 0.05;
controls.maxDistance = 20;
controls.minDistance = 1;
controls.maxPolarAngle = Math.PI * 0.85;  // prevent going under the floor
controls.autoRotate = false;
controls.autoRotateSpeed = 1.0;

// --- Smooth camera transition system ---
class CameraTransition {
  constructor(camera, controls) {
    this.camera = camera;
    this.controls = controls;
    this.isTransitioning = false;
    this.progress = 0;
    this.duration = 1.5; // seconds

    this.startPos    = new THREE.Vector3();
    this.endPos      = new THREE.Vector3();
    this.startTarget = new THREE.Vector3();
    this.endTarget   = new THREE.Vector3();
  }

  transitionTo(position, target, duration = 1.5) {
    this.startPos.copy(this.camera.position);
    this.endPos.copy(position);
    this.startTarget.copy(this.controls.target);
    this.endTarget.copy(target);
    this.duration = duration;
    this.progress = 0;
    this.isTransitioning = true;
    this.controls.enabled = false; // disable user input during transition
  }

  update(delta) {
    if (!this.isTransitioning) {
      this.controls.update(); // normal damping
      return;
    }

    this.progress += delta / this.duration;

    if (this.progress >= 1) {
      this.progress = 1;
      this.isTransitioning = false;
      this.controls.enabled = true;
    }

    // Ease-in-out curve
    const t = this.progress < 0.5
      ? 4 * this.progress * this.progress * this.progress
      : 1 - Math.pow(-2 * this.progress + 2, 3) / 2;

    this.camera.position.lerpVectors(this.startPos, this.endPos, t);
    this.controls.target.lerpVectors(this.startTarget, this.endTarget, t);
    this.controls.update();
  }
}

const cameraTransition = new CameraTransition(camera, controls);

// --- Predefined camera positions for deity views ---
const CAMERA_VIEWS = {
  overview: {
    pos: new THREE.Vector3(0, 5, 10),
    target: new THREE.Vector3(0, 0, 0),
  },
  athena: {
    pos: new THREE.Vector3(2, 1.6, 3),
    target: new THREE.Vector3(2, 1.2, 0),
  },
  zeus: {
    pos: new THREE.Vector3(-3, 2, 4),
    target: new THREE.Vector3(-3, 1.5, 0),
  },
  orbCloseup: {
    pos: new THREE.Vector3(0, 0.5, 2),
    target: new THREE.Vector3(0, 0, 0),
  },
};

function flyTo(viewName, duration = 1.5) {
  const view = CAMERA_VIEWS[viewName];
  if (view) {
    cameraTransition.transitionTo(view.pos, view.target, duration);
  }
}

// --- In animation loop ---
// cameraTransition.update(delta);

// --- Usage ---
// flyTo('athena');
// flyTo('orbCloseup', 2.0);
```

**Key Patterns**:
- `enableDamping` + `controls.update()` in the loop gives buttery-smooth inertial movement.
- Cubic ease-in-out via `4t^3` / `1 - (-2t+2)^3 / 2` prevents jarring starts and stops.
- Disable controls during transitions to prevent user interference mid-flight.

**Gotchas**:
- **Mistake**: Enabling damping but forgetting `controls.update()` in the loop. | **Rule**: Damping requires `update()` every frame or it does nothing.
- **Mistake**: Setting `camera.position` directly while OrbitControls is active. | **Rule**: OrbitControls overrides camera each frame; modify `controls.target` and use transitions.
- **Mistake**: Lerping position but not target causes the camera to look at the wrong place during transition. | **Rule**: Always lerp both `camera.position` AND `controls.target` together.

---

## Recipe 14: Light Probe / Environment Mapping

**APIs**: `CubeTextureLoader`, `PMREMGenerator`, `LightProbe`, `LightProbeHelper`, `MeshStandardMaterial.envMap`
**Project Fit**: Pantheon (reflective deity armor), Spirit Sphere (crystal ball reflections).
**Complexity**: intermediate

```js
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator.js';

// --- Option 1: HDR Environment Map (recommended for PBR) ---
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

new RGBELoader().load('/envmaps/sacred-temple.hdr', (hdrTexture) => {
  const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;

  // Apply as scene environment (affects all PBR materials)
  scene.environment = envMap;

  // Optional: also use as background
  // scene.background = envMap;

  // Generate light probe from environment
  const lightProbe = new THREE.LightProbe();
  lightProbe.copy(LightProbeGenerator.fromCubeRenderTarget(
    renderer,
    pmremGenerator.fromEquirectangular(hdrTexture)
  ));
  lightProbe.intensity = 1.0;
  scene.add(lightProbe);

  hdrTexture.dispose();
  pmremGenerator.dispose();
});

// --- Option 2: Cube texture from 6 images ---
const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeMap = cubeTextureLoader.load([
  '/envmaps/px.jpg', '/envmaps/nx.jpg', // +x, -x
  '/envmaps/py.jpg', '/envmaps/ny.jpg', // +y, -y
  '/envmaps/pz.jpg', '/envmaps/nz.jpg', // +z, -z
]);
// scene.environment = cubeMap;

// --- Reflective crystal ball material ---
const crystalMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 0.0,
  transmission: 0.95,    // glass-like transparency
  thickness: 1.5,        // refraction depth
  ior: 1.5,              // index of refraction (glass = 1.5)
  envMapIntensity: 1.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.0,
  // envMap auto-inherited from scene.environment
});

const crystalBall = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  crystalMaterial
);
scene.add(crystalBall);

// --- Deity armor with metallic reflections ---
const armorMaterial = new THREE.MeshStandardMaterial({
  color: 0xffd700,       // gold
  metalness: 0.9,
  roughness: 0.15,
  envMapIntensity: 2.0,  // boost reflections
  // envMap auto-inherited from scene.environment
});
```

**Key Patterns**:
- `scene.environment` sets the env map for ALL PBR materials automatically -- no need to assign `.envMap` per material.
- `PMREMGenerator` pre-filters the environment map for different roughness levels (crucial for PBR).
- `MeshPhysicalMaterial` with `transmission` creates convincing glass/crystal without custom shaders.

**Gotchas**:
- **Mistake**: Loading `.hdr` files with `TextureLoader` instead of `RGBELoader`. | **Rule**: HDR requires `RGBELoader`; standard loaders clip to LDR.
- **Mistake**: Forgetting to call `pmremGenerator.dispose()` after use. | **Rule**: PMREM generates large render targets; dispose after generating the env map.
- **Mistake**: Setting both `metalness: 1.0` and `transmission: 1.0` produces black output. | **Rule**: Transmission and metalness are mutually exclusive; metallic objects cannot be transmissive.

---

## Recipe 15: LOD System for Performance

**APIs**: `LOD`, `LOD.addLevel()`, `LOD.autoUpdate`
**Project Fit**: mosAIc (hundreds of tiles at varying distances), Pantheon (21 deities at different detail levels).
**Complexity**: intermediate

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// --- Procedural LOD: same shape, different detail ---
function createProceduralLOD() {
  const lod = new THREE.LOD();

  // High detail (close up)
  const highDetail = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 5),  // 20,480 triangles
    new THREE.MeshStandardMaterial({ color: 0x00e5c8, flatShading: false })
  );
  lod.addLevel(highDetail, 0);             // visible from 0 to 10 units

  // Medium detail
  const medDetail = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 2),   // 320 triangles
    new THREE.MeshStandardMaterial({ color: 0x00e5c8, flatShading: false })
  );
  lod.addLevel(medDetail, 10);             // visible from 10 to 30 units

  // Low detail
  const lowDetail = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 0),   // 20 triangles
    new THREE.MeshStandardMaterial({ color: 0x00e5c8, flatShading: true })
  );
  lod.addLevel(lowDetail, 30);             // visible beyond 30 units

  // Ultra-low: sprite impostor
  const spriteMat = new THREE.SpriteMaterial({
    color: 0x00e5c8,
    sizeAttenuation: true,
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(2, 2, 1);
  lod.addLevel(sprite, 60);               // billboard beyond 60 units

  return lod;
}

// --- GLTF-based LOD (load multiple detail levels) ---
async function createGLTFLod(urls) {
  // urls: [{ url, distance }, ...]
  // e.g., [
  //   { url: '/models/athena-high.glb', distance: 0 },
  //   { url: '/models/athena-mid.glb',  distance: 8 },
  //   { url: '/models/athena-low.glb',  distance: 20 },
  // ]
  const loader = new GLTFLoader();
  const lod = new THREE.LOD();

  const loadPromises = urls.map(({ url, distance }) =>
    new Promise((resolve, reject) => {
      loader.load(url, (gltf) => {
        lod.addLevel(gltf.scene, distance);
        resolve();
      }, undefined, reject);
    })
  );

  await Promise.all(loadPromises);
  return lod;
}

// --- LOD manager for many objects ---
class LODManager {
  constructor() {
    this.lodObjects = [];
  }

  add(lod, position) {
    lod.position.copy(position);
    lod.autoUpdate = true; // auto-switch levels based on camera distance
    scene.add(lod);
    this.lodObjects.push(lod);
    return lod;
  }

  // Manual update with hysteresis to prevent flipping
  updateAll(camera) {
    this.lodObjects.forEach((lod) => {
      lod.update(camera);
    });
  }

  // Performance stats
  getStats() {
    let totalTris = 0;
    this.lodObjects.forEach((lod) => {
      const currentLevel = lod.getCurrentLevel();
      const child = lod.getObjectForDistance(
        lod.position.distanceTo(camera.position)
      );
      if (child?.geometry) {
        const index = child.geometry.index;
        totalTris += index ? index.count / 3 : child.geometry.attributes.position.count / 3;
      }
    });
    return { totalTriangles: totalTris, objectCount: this.lodObjects.length };
  }
}

// --- Usage: mosAIc wall with 200 LOD tiles ---
const lodManager = new LODManager();

for (let i = 0; i < 200; i++) {
  const lod = createProceduralLOD();
  const x = (i % 20) * 3 - 30;
  const y = Math.floor(i / 20) * 3 - 15;
  lodManager.add(lod, new THREE.Vector3(x, y, 0));
}

// --- In animation loop ---
// lodManager.updateAll(camera); // only needed if autoUpdate is false
```

**Key Patterns**:
- `addLevel(object, distance)` -- distance is from the camera; lower distance = higher detail.
- `autoUpdate: true` (default) handles switching automatically in the render loop.
- Sprite impostors at the furthest LOD level are nearly free to render.

**Gotchas**:
- **Mistake**: LOD levels added in wrong order (high distance first). | **Rule**: `addLevel` sorts internally, but adding in ascending distance order is clearest.
- **Mistake**: LOD objects all share the same material instance, causing all to change simultaneously. | **Rule**: Each LOD level should have its own material instance if you animate material properties.
- **Mistake**: LOD flickering at boundary distances when camera oscillates. | **Rule**: Use the `hysteresis` parameter in `addLevel(object, distance, hysteresis)` (default 0) to add a deadzone.

---

## Appendix: Import Reference

Quick copy-paste block for all imports used across these recipes:

```js
// --- Core ---
import * as THREE from 'three';

// --- Controls ---
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// --- Loaders ---
import { GLTFLoader }  from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader }  from 'three/examples/jsm/loaders/RGBELoader.js';

// --- Post-Processing ---
import { EffectComposer }  from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass }      from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass }      from 'three/examples/jsm/postprocessing/OutputPass.js';

// --- CSS3D ---
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// --- WebXR ---
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

// --- Lights ---
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator.js';
```

---

## Appendix: Project-to-Recipe Matrix

| Project | Must-Have Recipes | Nice-to-Have |
|---------|-------------------|-------------|
| **Orb / Spirit Sphere** | 1, 2, 3, 7, 8, 11 | 14, 15 |
| **Pantheon (21 deities)** | 1, 3, 4, 7, 9, 13 | 5, 12, 14, 15 |
| **mosAIc Wall** | 1, 5, 8, 15 | 6, 9, 13 |
| **Constellation Characters** | 1, 6, 7, 13 | 2, 9, 11 |
| **Ritual Systems / XR** | 1, 9, 10 | 3, 11, 13 |
| **Oracle Cards (web)** | 1, 7, 12, 13 | 9, 11 |

---

*Generated for the Sacred Circuits Three.js Knowledge Graph.*
*API references verified against Three.js r170+ documentation (threejs.org/docs).*
