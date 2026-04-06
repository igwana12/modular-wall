# mosAIc Widget Implementation Specs

**Date**: 2026-04-06
**Status**: Active Development
**Parent Task**: SACA-74
**Purpose**: Detailed specifications for building Three.js widget interfaces for each mosAIc module

---

## Priority Order

Per SACA-74, widgets are prioritized as:

1. **Screen-S Weather Widget** — the first thing users see
2. **Hub 3D Wall Configurator** — the selling tool
3. **Pixel Audio Visualizer** — the demo that stops scrolling
4. **Round Circular Clock** — the module that breaks the grid
5. Everything else

---

## 1. Screen-S Weather Widget

### Overview
**Module**: Screen-S (2.8" LCD, 320x240)
**Assigned**: Apollo (Creative Director) + Hephaestus (Firmware Engineer)
**MVI Stack**: `CSS2DRenderer + CSS2DObject + ShaderMaterial + CanvasTexture`

### Visual Design
- **Background**: Animated particle shader matching weather condition (rain, snow, clouds, sun rays)
- **Layout**: 3D clock digits at top (TextGeometry), weather icon + temp in middle (CSS2DObject), 5-day forecast cards at bottom (CSS3DObject flip animation)
- **Brand colors**: Teal accents (#00D4AA), dark background (#0D0D1A)

### Technical Specification

#### Scene Structure
```javascript
// Scene hierarchy
Scene
├── PerspectiveCamera (fov: 45, aspect: 320/240)
├── CSS2DRenderer (overlay layer for DOM widgets)
├── WebGLRenderer (base 3D scene)
│
├── Background Shader (ShaderMaterial plane)
│   ├── Vertex shader: pass through
│   └── Fragment shader: animated particles based on weather
│
├── Clock Digits (TextGeometry + MeshStandardMaterial)
│   ├── Hours (extruded 3D text, depth: 5px)
│   ├── Minutes (extruded 3D text, depth: 5px)
│   └── Rotation animation on minute change
│
├── Weather Data Container (CSS2DObject)
│   ├── Icon (SVG weather icon)
│   ├── Temperature (large text, Geist Sans Bold)
│   ├── Condition (small text, "Partly Cloudy")
│   └── Location (small text, current city)
│
└── Forecast Cards (CSS3DObject × 5)
    └── Flip animation on scroll/tap
```

#### Shader: Weather Background

**Rain Shader**:
```glsl
// Fragment shader for rain effect
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Create falling rain streaks
    float rain = 0.0;
    for(float i = 0.0; i < 40.0; i++) {
        float x = fract(sin(i * 12.9898) * 43758.5453);
        float y = fract(cos(i * 78.233) * 43758.5453);

        // Streak position
        vec2 pos = vec2(x, fract(y - time * 0.3));
        float dist = distance(uv, pos);

        // Add streak if close enough
        if(dist < 0.002) {
            rain += 0.8;
        }
    }

    // Teal rain color with transparency
    vec3 color = mix(vec3(0.05, 0.05, 0.1), vec3(0.0, 0.83, 0.67), rain);
    gl_FragColor = vec4(color, 1.0);
}
```

**Cloudy Shader**:
```glsl
// Fragment shader for cloud gradient
uniform float time;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Animated gradient from dark to less dark
    float gradient = smoothstep(0.0, 1.0, uv.y);
    vec3 dark = vec3(0.05, 0.05, 0.1);
    vec3 lighter = vec3(0.1, 0.1, 0.15);

    // Subtle wave animation
    float wave = sin(uv.x * 3.0 + time * 0.5) * 0.05;
    vec3 color = mix(dark, lighter, gradient + wave);

    gl_FragColor = vec4(color, 1.0);
}
```

#### CSS2D Weather Container

```html
<div class="weather-container" style="
    font-family: 'Geist Sans', sans-serif;
    color: #F0F0F0;
    text-align: center;
    padding: 10px;
">
    <img src="/icons/weather/partly-cloudy.svg" width="80" height="80" />
    <div style="font-size: 48px; font-weight: bold; color: #00D4AA;">
        72°
    </div>
    <div style="font-size: 14px; color: #8888AA;">
        Partly Cloudy
    </div>
    <div style="font-size: 10px; color: #555577;">
        San Francisco, CA
    </div>
</div>
```

#### Data Source Integration

```javascript
// Wall Controller Agent API endpoint
const weatherData = await fetch('http://hub.local:8200/api/weather/current');
// Returns: { temp, condition, icon, location, forecast }

// Update scene every 5 minutes
setInterval(() => {
    updateWeatherShader(weatherData.condition); // rain, cloudy, sunny, snow
    updateTemperatureDisplay(weatherData.temp);
    updateForecastCards(weatherData.forecast);
}, 300000);
```

### Deliverables
- [ ] `screen-s-weather.html` — standalone demo
- [ ] Rain, cloudy, sunny, snow shader variants
- [ ] CSS2D weather container styling
- [ ] 3D clock digit TextGeometry
- [ ] Integration with Wall Controller Agent `/api/weather` endpoint
- [ ] Screenshot for brochure
- [ ] Education lesson outline: "Building a 3D Weather Widget with Three.js"

---

## 2. Hub 3D Wall Configurator

### Overview
**Module**: Hub (web dashboard)
**Assigned**: Athena (Industrial Designer) + Prometheus (Software Engineer)
**MVI Stack**: `CSS3DRenderer + CSS3DObject + Raycaster + OrbitControls`

### Visual Design
- **3D wall view**: Steel mounting plate as the background plane
- **Module cards**: Each module is a CSS3DObject card floating in 3D space
- **Interaction**: OrbitControls to rotate view, Raycaster for click-to-select, TransformControls for drag-and-drop placement
- **Live status**: Each card shows module's current content (clock, weather, glow color, etc.)

### Technical Specification

#### Scene Structure
```javascript
Scene
├── PerspectiveCamera (fov: 60, aspect: 16/9)
├── CSS3DRenderer (main renderer for DOM-based module cards)
├── OrbitControls (rotate, zoom, pan the wall)
│
├── Wall Mounting Plate (PlaneGeometry)
│   ├── MeshStandardMaterial (metallic: 0.8, roughness: 0.3)
│   └── Size: 1200x800mm (scaled to scene units)
│
├── Module Cards (CSS3DObject × N modules)
│   ├── Module preview card (HTML div with live content iframe)
│   ├── Position: grid layout on wall plane (x, y based on module slot)
│   └── Status indicator (color-coded border: teal = active, amber = idle, coral = error)
│
├── Grid Helper Lines (LineSegments)
│   └── Show snap grid for module placement
│
└── Raycaster (for mouse interaction)
    └── Detect which module card is clicked
```

#### CSS3D Module Card

```html
<div class="module-card" style="
    width: 150px;
    height: 150px;
    background: rgba(26, 26, 46, 0.9);
    border: 2px solid #00D4AA;
    border-radius: 8px;
    padding: 10px;
    font-family: 'Geist Sans', sans-serif;
    color: #F0F0F0;
    box-shadow: 0 4px 20px rgba(0, 212, 170, 0.3);
    backdrop-filter: blur(10px);
">
    <div class="module-header" style="
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    ">
        <span style="font-weight: bold; font-size: 12px;">Screen-S</span>
        <span class="status-dot" style="
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #00D4AA;
        "></span>
    </div>
    <div class="module-preview" style="
        width: 100%;
        height: 80px;
        background: #0D0D1A;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    ">
        <!-- Live module content iframe or screenshot -->
        <iframe src="http://hub.local:8200/module/screen-s-01/preview"
                width="100%" height="100%" frameborder="0"></iframe>
    </div>
    <div class="module-label" style="
        margin-top: 10px;
        font-size: 10px;
        color: #8888AA;
        text-align: center;
    ">
        2.8" LCD • 320x240
    </div>
</div>
```

#### Interaction: Drag-and-Drop

```javascript
// Raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// On mouse move
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// On click
function onClick(event) {
    raycaster.setFromCamera(mouse, camera);

    // Intersect with module cards
    const intersects = raycaster.intersectObjects(moduleCards, true);

    if (intersects.length > 0) {
        const selectedModule = intersects[0].object;
        // Highlight selected module
        selectedModule.element.style.border = '3px solid #FFB347';

        // Show module details panel
        showModuleDetails(selectedModule.userData.moduleId);
    }
}

// Drag-and-drop (simplified — use TransformControls for production)
let isDragging = false;
let draggedModule = null;

function onMouseDown(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(moduleCards, true);

    if (intersects.length > 0) {
        isDragging = true;
        draggedModule = intersects[0].object;
    }
}

function onMouseUp(event) {
    if (isDragging && draggedModule) {
        // Snap to grid
        snapToGrid(draggedModule.position);

        // Update module position in backend
        fetch(`http://hub.local:8200/api/modules/${draggedModule.userData.moduleId}/position`, {
            method: 'PUT',
            body: JSON.stringify({
                x: draggedModule.position.x,
                y: draggedModule.position.y
            })
        });

        isDragging = false;
        draggedModule = null;
    }
}
```

#### Grid Snapping

```javascript
const GRID_SIZE = 80; // 80mm module size

function snapToGrid(position) {
    position.x = Math.round(position.x / GRID_SIZE) * GRID_SIZE;
    position.y = Math.round(position.y / GRID_SIZE) * GRID_SIZE;
    position.z = 0; // Keep on wall plane
}
```

### API Integration

```javascript
// Fetch all modules from Wall Controller
const modules = await fetch('http://hub.local:8200/api/modules').then(r => r.json());
// Returns: [{ id, type, position: {x, y}, status, previewUrl }]

// Create CSS3DObject for each module
modules.forEach(module => {
    const card = createModuleCard(module);
    const css3dObject = new CSS3DObject(card);
    css3dObject.position.set(module.position.x, module.position.y, 0);
    css3dObject.userData.moduleId = module.id;
    scene.add(css3dObject);
    moduleCards.push(css3dObject);
});
```

### Deliverables
- [ ] `hub-wall-configurator.html` — standalone demo
- [ ] CSS3D module card components for all 11 module types
- [ ] Raycaster click-to-select interaction
- [ ] TransformControls drag-and-drop (or custom drag handler)
- [ ] OrbitControls for wall rotation
- [ ] Grid snap logic
- [ ] Integration with `/api/modules` and `/api/modules/{id}/position` endpoints
- [ ] Screenshot for brochure
- [ ] Education lesson outline: "Building an Interactive 3D Interface with CSS3DRenderer"

---

## 3. Pixel Audio Visualizer

### Overview
**Module**: Pixel (166x86mm HUB75, 64x32 resolution = 2048 LEDs)
**Assigned**: Apollo (Creative Director) + Prometheus (Software Engineer)
**MVI Stack**: `InstancedMesh(2048) + AudioAnalyser + BufferAttribute + Color`

### Visual Design
- **2048 glowing cubes** — one per LED pixel
- **Audio-reactive**: FFT frequency data maps to cube height and color
- **Color cycling**: HSV rainbow spectrum across frequency bands
- **Smooth animation**: 60fps with BufferAttribute updates

### Technical Specification

#### Scene Structure
```javascript
Scene
├── PerspectiveCamera (fov: 50, aspect: 64/32)
├── WebGLRenderer (antialias: true)
│
├── AudioListener (attached to camera)
├── Audio (connected to microphone or audio input)
├── AudioAnalyser (fftSize: 2048)
│
├── InstancedMesh (2048 instances)
│   ├── BoxGeometry (1x1x1 cube)
│   ├── MeshStandardMaterial (emissive color per instance)
│   └── Matrix per instance (position + scale based on audio)
│
└── DirectionalLight (for cube shading)
```

#### Audio Setup

```javascript
// Initialize AudioListener
const listener = new THREE.AudioListener();
camera.add(listener);

// Create Audio and connect to microphone
const audio = new THREE.Audio(listener);

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(stream => {
        const mediaStreamSource = listener.context.createMediaStreamSource(stream);
        audio.setNodeSource(mediaStreamSource);
    });

// Create AudioAnalyser
const analyser = new THREE.AudioAnalyser(audio, 2048);
```

#### InstancedMesh Setup

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    emissive: 0x00D4AA,
    emissiveIntensity: 1.0,
    metalness: 0.5,
    roughness: 0.3
});

const instancedMesh = new THREE.InstancedMesh(geometry, material, 2048);

// Position instances in 64x32 grid
const dummy = new THREE.Object3D();
for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 64; x++) {
        const index = y * 64 + x;
        dummy.position.set(x - 32, 0, y - 16); // Center grid
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(index, dummy.matrix);
    }
}

scene.add(instancedMesh);
```

#### Animation Loop: Audio-Reactive

```javascript
const color = new THREE.Color();

function animate() {
    requestAnimationFrame(animate);

    // Get FFT frequency data
    const data = analyser.getFrequencyData();
    // data is Uint8Array of length 1024 (half of fftSize)

    // Map frequency data to 64x32 grid
    for (let y = 0; y < 32; y++) {
        for (let x = 0; x < 64; x++) {
            const index = y * 64 + x;

            // Map x position to frequency bin
            const freqIndex = Math.floor((x / 64) * data.length);
            const amplitude = data[freqIndex] / 255.0; // Normalize to 0-1

            // Scale cube height based on amplitude
            dummy.position.set(x - 32, amplitude * 10, y - 16);
            dummy.scale.set(0.9, amplitude * 10 + 0.1, 0.9);
            dummy.updateMatrix();
            instancedMesh.setMatrixAt(index, dummy.matrix);

            // Set color based on frequency (HSV rainbow)
            const hue = x / 64; // 0-1 across width
            color.setHSL(hue, 1.0, 0.5 + amplitude * 0.3);
            instancedMesh.setColorAt(index, color);
        }
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    instancedMesh.instanceColor.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();
```

#### Alternative: VU Meter Mode

```javascript
// Instead of full 2D grid, show classic VU meter bars
function vuMeterMode() {
    const barCount = 32; // 32 frequency bands
    const data = analyser.getFrequencyData();

    for (let i = 0; i < barCount; i++) {
        const freqIndex = Math.floor((i / barCount) * data.length);
        const amplitude = data[freqIndex] / 255.0;

        // Draw vertical bar for each frequency band
        for (let y = 0; y < 32; y++) {
            const index = y * 64 + i * 2; // 2 pixels wide per bar
            const isLit = (y / 32) < amplitude;

            if (isLit) {
                // Color gradient: green -> yellow -> red
                const barHue = (1.0 - y / 32) * 0.33; // 0.33 = green, 0 = red
                color.setHSL(barHue, 1.0, 0.5);
                instancedMesh.setColorAt(index, color);
                instancedMesh.setColorAt(index + 1, color);
            } else {
                // Dark when not lit
                color.setRGB(0.05, 0.05, 0.1);
                instancedMesh.setColorAt(index, color);
                instancedMesh.setColorAt(index + 1, color);
            }
        }
    }

    instancedMesh.instanceColor.needsUpdate = true;
}
```

### Modes
1. **Full Grid Audio Reactive**: All 2048 LEDs respond to audio
2. **VU Meter**: Classic vertical bar visualization
3. **Waveform**: Rolling oscilloscope-style waveform
4. **Spectrum Circle**: Radial frequency visualization

### Deliverables
- [ ] `pixel-audio-visualizer.html` — standalone demo
- [ ] InstancedMesh setup (2048 cubes)
- [ ] AudioAnalyser integration
- [ ] Full grid audio-reactive mode
- [ ] VU meter mode
- [ ] Color cycling (HSV rainbow)
- [ ] Integration with Wall Controller `/api/audio/stream` endpoint
- [ ] Screenshot/video for brochure
- [ ] Education lesson outline: "Audio Visualization with Three.js and Web Audio API"

---

## 4. Round Circular Clock UI

### Overview
**Module**: Round (Ø91mm, 466x466 AMOLED circular display)
**Assigned**: Athena (Industrial Designer) + Apollo (Creative Director)
**MVI Stack**: `RingGeometry + TorusGeometry + Sprite + ShaderMaterial`

### Visual Design
- **Clock face**: Circular gradient ShaderMaterial background
- **Hour markers**: 12 Sprites orbiting on a TorusGeometry track
- **Hands**: Glowing lines (second, minute, hour) with ShaderMaterial emission
- **Notification orbit**: Additional TorusGeometry ring at edge where notification icons orbit
- **Progress rings**: Multiple RingGeometry rings for timers, reminders, etc.

### Technical Specification

#### Scene Structure
```javascript
Scene
├── PerspectiveCamera (fov: 50, aspect: 1.0)
├── WebGLRenderer (antialias: true)
│
├── Clock Face Background (CircleGeometry)
│   ├── ShaderMaterial (radial gradient: dark center → lighter edge)
│   └── Size: radius = 1.0 (normalized)
│
├── Hour Marker Track (TorusGeometry)
│   ├── Radius: 0.8, tube: 0.01
│   └── Invisible (used for positioning only)
│
├── Hour Markers (Sprite × 12)
│   ├── Position: calculated from angle (0°, 30°, 60°, ..., 330°)
│   ├── SpriteMaterial (texture: simple dot or number)
│   └── Scale: 0.05
│
├── Clock Hands (Line)
│   ├── Hour hand (thick, short)
│   ├── Minute hand (medium, medium)
│   └── Second hand (thin, long, glowing teal)
│
├── Notification Orbit Track (TorusGeometry)
│   ├── Radius: 0.95 (near edge)
│   └── Visible with subtle glow
│
├── Notification Icons (Sprite × N)
│   └── Orbit around notification track
│
└── Progress Rings (RingGeometry × N)
    ├── Inner radius: 0.85, outer radius: 0.90
    ├── ShaderMaterial (partial ring based on progress %)
    └── Colors: timer = amber, reminder = teal
```

#### Clock Face Shader

```glsl
// Fragment shader for radial gradient clock face
varying vec2 vUv;

void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);

    // Radial gradient from dark center to lighter edge
    vec3 darkCenter = vec3(0.05, 0.05, 0.1);
    vec3 lightEdge = vec3(0.1, 0.1, 0.15);

    vec3 color = mix(darkCenter, lightEdge, dist * 2.0);
    gl_FragColor = vec4(color, 1.0);
}
```

#### Hour Markers Positioning

```javascript
const hourMarkers = [];
const torusRadius = 0.8;

for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2; // Start at 12 o'clock

    // Position on torus track
    const x = Math.cos(angle) * torusRadius;
    const y = Math.sin(angle) * torusRadius;

    // Create sprite
    const spriteMaterial = new THREE.SpriteMaterial({
        map: createHourMarkerTexture(i === 0 ? 12 : i), // 12, 1, 2, ..., 11
        color: 0x8888AA
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(x, y, 0);
    sprite.scale.set(0.1, 0.1, 1);

    scene.add(sprite);
    hourMarkers.push(sprite);
}

function createHourMarkerTexture(hour) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#F0F0F0';
    ctx.font = 'bold 48px Geist Sans';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(hour.toString(), 32, 32);

    return new THREE.CanvasTexture(canvas);
}
```

#### Clock Hands

```javascript
const clock = new THREE.Clock();

function updateClockHands() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate angles (0° = 12 o'clock, clockwise)
    const secondAngle = (seconds / 60) * Math.PI * 2 - Math.PI / 2;
    const minuteAngle = (minutes / 60) * Math.PI * 2 - Math.PI / 2;
    const hourAngle = ((hours + minutes / 60) / 12) * Math.PI * 2 - Math.PI / 2;

    // Update hand positions (draw as lines from center)
    updateHand(hourHand, hourAngle, 0.4, 0.03); // short, thick
    updateHand(minuteHand, minuteAngle, 0.6, 0.02); // medium
    updateHand(secondHand, secondAngle, 0.75, 0.01, 0x00D4AA); // long, thin, teal glow
}

function updateHand(handMesh, angle, length, width, color = 0xF0F0F0) {
    const x = Math.cos(angle) * length;
    const y = Math.sin(angle) * length;

    // Update line geometry
    const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, 0)
    ]);

    handMesh.geometry.dispose();
    handMesh.geometry = geometry;
    handMesh.material.color.setHex(color);
    handMesh.material.linewidth = width * 100; // Scale for visibility
}
```

#### Notification Orbit

```javascript
// Notification icons orbit the clock edge
const notificationTrack = new THREE.TorusGeometry(0.95, 0.01, 16, 100);
const notificationMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFB347,
    transparent: true,
    opacity: 0.3
});
const notificationRing = new THREE.Mesh(notificationTrack, notificationMaterial);
scene.add(notificationRing);

// Add orbiting notification icons
const notifications = [
    { icon: 'slack', angle: 0 },
    { icon: 'calendar', angle: Math.PI / 2 },
    { icon: 'email', angle: Math.PI }
];

function animateNotifications(time) {
    notifications.forEach((notif, i) => {
        const angle = notif.angle + time * 0.5; // Slow orbit
        const x = Math.cos(angle) * 0.95;
        const y = Math.sin(angle) * 0.95;

        notificationSprites[i].position.set(x, y, 0.1);
    });
}
```

#### Progress Ring (Timer/Reminder)

```javascript
// Draw partial ring based on progress percentage
function createProgressRing(progress, color) {
    const thetaLength = (progress / 100) * Math.PI * 2;

    const ring = new THREE.RingGeometry(0.85, 0.90, 64, 1, 0, thetaLength);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    });

    return new THREE.Mesh(ring, material);
}

// Example: 75% timer progress in amber
const timerRing = createProgressRing(75, 0xFFB347);
scene.add(timerRing);
```

### Deliverables
- [ ] `round-clock.html` — standalone demo
- [ ] Radial gradient ShaderMaterial clock face
- [ ] Hour markers positioned on torus track
- [ ] Animated clock hands (hour, minute, second)
- [ ] Notification orbit with icon sprites
- [ ] Progress ring system for timers/reminders
- [ ] Integration with Wall Controller `/api/time` and `/api/notifications` endpoints
- [ ] Screenshot for brochure
- [ ] Education lesson outline: "Building Circular UIs with Three.js Geometry"

---

## Implementation Timeline

### Week 1
- [ ] Screen-S Weather Widget (Apollo + Hephaestus)
- [ ] Hub 3D Wall Configurator (Athena + Prometheus)

### Week 2
- [ ] Pixel Audio Visualizer (Apollo + Prometheus)
- [ ] Round Circular Clock (Athena + Apollo)

### Week 3
- [ ] Remaining widgets (Glow, Voice, Mirror, Controller, eInk, Holo)

---

## Testing & Integration

Each widget must:
1. **Run standalone** — HTML file that can be opened in any browser
2. **Integrate with Hub** — Fetch data from Wall Controller Agent API
3. **Render on module** — Either run directly on module or receive frame buffers from Hub
4. **Match brand** — Use mosAIc colors, typography, aesthetic from Brand Bible
5. **Include education** — Lesson outline explaining what you learn building it

---

## Reference
- **Parent task**: SACA-74
- **Three.js mapping**: `docs/INTERFACE-DESIGN-THREEJS.md`
- **Brand guide**: `docs/BRAND-BIBLE.md`
- **API docs**: `docs/architecture/ARCHITECTURE.md`
