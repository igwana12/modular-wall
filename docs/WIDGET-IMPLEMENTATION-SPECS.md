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

## 5. Glow LED Pattern Engine

### Overview
**Module**: Glow (71x71mm, 16x16 SK6812 RGBW LED matrix = 256 LEDs)
**Assigned**: Hephaestus (Engineer) + Prometheus (Software Engineer)
**MVI Stack**: `DataTexture + ShaderMaterial + Color + Clock`

### Visual Design
- **Hub dashboard preview**: 16x16 Points visualization mirroring physical LEDs
- **Shader-generated patterns**: Circadian rhythm, mood waves, notification pulses
- **Real-time preview**: Live preview on Hub syncs with physical module
- **Color modes**: Circadian (sunrise/sunset), Mood (calm/energized), Notification (pulse)

### Technical Specification

#### Scene Structure
```javascript
Scene
├── PerspectiveCamera (fov: 45, aspect: 1.0)
├── WebGLRenderer (antialias: true)
│
├── LED Grid Preview (Points)
│   ├── BufferGeometry (16x16 = 256 points)
│   ├── PointsMaterial (size: 10, sizeAttenuation: false)
│   └── Color per point (matches physical LED)
│
└── Clock (for time-based animation)
```

#### LED Grid Setup

```javascript
const gridSize = 16;
const totalLEDs = gridSize * gridSize;

// Create point cloud for LED visualization
const positions = new Float32Array(totalLEDs * 3);
const colors = new Float32Array(totalLEDs * 3);

let index = 0;
for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
        positions[index * 3] = x - gridSize / 2;
        positions[index * 3 + 1] = y - gridSize / 2;
        positions[index * 3 + 2] = 0;
        index++;
    }
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: 10,
    vertexColors: true,
    sizeAttenuation: false
});

const ledGrid = new THREE.Points(geometry, material);
scene.add(ledGrid);
```

#### Pattern Generator: Circadian Rhythm

```javascript
const color = new THREE.Color();

function generateCircadianPattern(timeOfDay) {
    // timeOfDay: 0-24 hours
    const colors = geometry.attributes.color;

    for (let i = 0; i < totalLEDs; i++) {
        let hue, saturation, lightness;

        if (timeOfDay >= 6 && timeOfDay < 12) {
            // Morning: warm sunrise (orange to yellow)
            const progress = (timeOfDay - 6) / 6; // 0-1
            hue = 0.08 + progress * 0.08; // 0.08 (orange) to 0.16 (yellow)
            saturation = 0.8;
            lightness = 0.4 + progress * 0.3; // Getting brighter
        } else if (timeOfDay >= 12 && timeOfDay < 18) {
            // Day: bright neutral (cool white)
            hue = 0.55; // Cyan
            saturation = 0.3;
            lightness = 0.7;
        } else if (timeOfDay >= 18 && timeOfDay < 22) {
            // Evening: warm sunset (orange to red)
            const progress = (timeOfDay - 18) / 4;
            hue = 0.08 - progress * 0.08; // Orange to red
            saturation = 0.9;
            lightness = 0.5 - progress * 0.3; // Getting dimmer
        } else {
            // Night: very dim warm (red)
            hue = 0.0; // Red
            saturation = 0.7;
            lightness = 0.1;
        }

        color.setHSL(hue, saturation, lightness);
        colors.setXYZ(i, color.r, color.g, color.b);
    }

    colors.needsUpdate = true;
}
```

#### Pattern Generator: Mood Waves

```javascript
function generateMoodWave(time, moodType) {
    const colors = geometry.attributes.color;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const index = y * gridSize + x;

            // Wave parameters based on mood
            let baseHue, waveSpeed, waveAmplitude;

            if (moodType === 'calm') {
                baseHue = 0.55; // Teal/cyan
                waveSpeed = 0.3;
                waveAmplitude = 0.05;
            } else if (moodType === 'energized') {
                baseHue = 0.08; // Orange
                waveSpeed = 1.5;
                waveAmplitude = 0.15;
            } else if (moodType === 'focus') {
                baseHue = 0.67; // Purple
                waveSpeed = 0.5;
                waveAmplitude = 0.08;
            }

            // Calculate wave effect
            const wave1 = Math.sin(x * 0.5 + time * waveSpeed) * waveAmplitude;
            const wave2 = Math.cos(y * 0.5 + time * waveSpeed * 0.7) * waveAmplitude;
            const hue = (baseHue + wave1 + wave2) % 1.0;

            color.setHSL(hue, 0.8, 0.5);
            colors.setXYZ(index, color.r, color.g, color.b);
        }
    }

    colors.needsUpdate = true;
}
```

#### Pattern Generator: Notification Pulse

```javascript
function generateNotificationPulse(time, notificationType) {
    const colors = geometry.attributes.color;

    // Notification color based on type
    const notificationColors = {
        slack: new THREE.Color(0xFFB347), // Amber
        calendar: new THREE.Color(0x00D4AA), // Teal
        email: new THREE.Color(0x8888FF), // Purple
        alert: new THREE.Color(0xFF4466)  // Coral
    };

    const pulseColor = notificationColors[notificationType] || notificationColors.alert;

    // Radial pulse from center
    const centerX = gridSize / 2;
    const centerY = gridSize / 2;
    const pulseSpeed = 2.0;
    const pulseRadius = (time * pulseSpeed) % gridSize;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const index = y * gridSize + x;
            const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

            // Pulse ring with fade
            const intensity = Math.max(0, 1.0 - Math.abs(dist - pulseRadius) / 2.0);

            if (intensity > 0) {
                color.copy(pulseColor);
                color.multiplyScalar(intensity);
            } else {
                color.setRGB(0.05, 0.05, 0.1); // Dark background
            }

            colors.setXYZ(index, color.r, color.g, color.b);
        }
    }

    colors.needsUpdate = true;
}
```

#### DataTexture for ESP32 Upload

```javascript
// Generate 16x16 color map to send to ESP32
function generateDataTexture() {
    const size = 16;
    const data = new Uint8Array(size * size * 4); // RGBA

    const colors = geometry.attributes.color;

    for (let i = 0; i < size * size; i++) {
        const r = colors.getX(i) * 255;
        const g = colors.getY(i) * 255;
        const b = colors.getZ(i) * 255;

        data[i * 4] = r;
        data[i * 4 + 1] = g;
        data[i * 4 + 2] = b;
        data[i * 4 + 3] = 255; // Alpha
    }

    return new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
}

// Send to Wall Controller API
async function uploadToModule() {
    const texture = generateDataTexture();
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');

    // Draw texture to canvas
    const imageData = ctx.createImageData(16, 16);
    imageData.data.set(texture.image.data);
    ctx.putImageData(imageData, 0, 0);

    // Convert to base64 and send
    const base64 = canvas.toDataURL('image/png');
    await fetch('http://hub.local:8200/api/modules/glow-01/pattern', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pattern: base64 })
    });
}
```

### Modes
1. **Circadian**: Auto-adjusts color temperature based on time of day
2. **Mood Wave**: Animated color waves (calm/energized/focus)
3. **Notification**: Pulse effect for incoming notifications
4. **Custom**: User-defined static color or pattern

### Deliverables
- [ ] `glow-led-engine.html` — standalone demo with all 4 modes
- [ ] Circadian rhythm pattern generator
- [ ] Mood wave pattern generator (3 presets)
- [ ] Notification pulse effect
- [ ] DataTexture upload to ESP32
- [ ] Integration with `/api/modules/glow-{id}/pattern` endpoint
- [ ] Screenshot for brochure
- [ ] Education lesson outline: "Generative LED Patterns with Three.js DataTexture"

---

## 6. Voice Waveform Visualizer

### Overview
**Module**: Voice (audio module with INMP441 mic + MAX98357A amp)
**Assigned**: Hephaestus (Engineer)
**MVI Stack**: `Audio + AudioAnalyser + ShaderMaterial + BufferGeometry`

### Visual Design
- **Oscilloscope waveform**: Classic glowing teal waveform on dark background
- **Displayed on Screen-S**: Voice visualization shown on nearby screen module
- **Real-time**: 60fps responsive to voice/audio input
- **Shader glow**: ShaderMaterial for glowing line effect

### Technical Specification

#### Scene Structure
```javascript
Scene
├── PerspectiveCamera (fov: 45, aspect: 320/240)
├── WebGLRenderer (antialias: true)
│
├── AudioListener (attached to camera)
├── Audio (microphone input)
├── AudioAnalyser (fftSize: 256)
│
├── Waveform Line (Line)
│   ├── BufferGeometry (256 points)
│   ├── ShaderMaterial (glowing teal line)
│   └── Updated each frame with amplitude data
│
└── Background Gradient (PlaneGeometry + ShaderMaterial)
```

#### Waveform Setup

```javascript
// Create waveform line geometry
const waveformPoints = 256;
const positions = new Float32Array(waveformPoints * 3);

for (let i = 0; i < waveformPoints; i++) {
    positions[i * 3] = (i / waveformPoints) * 10 - 5; // X: -5 to 5
    positions[i * 3 + 1] = 0; // Y: will be updated by audio
    positions[i * 3 + 2] = 0;
}

const waveformGeometry = new THREE.BufferGeometry();
waveformGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Glowing line shader
const waveformMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color: { value: new THREE.Color(0x00D4AA) },
        glowIntensity: { value: 1.5 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color;
        uniform float glowIntensity;
        varying vec2 vUv;

        void main() {
            // Glow effect
            vec3 glowColor = color * glowIntensity;
            gl_FragColor = vec4(glowColor, 1.0);
        }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending
});

const waveformLine = new THREE.Line(waveformGeometry, waveformMaterial);
scene.add(waveformLine);
```

#### Audio Analysis

```javascript
const listener = new THREE.AudioListener();
camera.add(listener);

const audio = new THREE.Audio(listener);

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(stream => {
        const mediaStreamSource = listener.context.createMediaStreamSource(stream);
        audio.setNodeSource(mediaStreamSource);
    });

const analyser = new THREE.AudioAnalyser(audio, 256);
```

#### Animation Loop

```javascript
function animate() {
    requestAnimationFrame(animate);

    // Get waveform time-domain data
    const data = analyser.data; // Uint8Array of length 256

    // Update waveform geometry
    const positions = waveformGeometry.attributes.position;

    for (let i = 0; i < waveformPoints; i++) {
        const amplitude = (data[i] / 255.0) * 2 - 1; // Normalize to -1 to 1
        const y = amplitude * 2; // Scale for visibility
        positions.setY(i, y);
    }

    positions.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();
```

### Deliverables
- [ ] `voice-waveform.html` — standalone demo
- [ ] Real-time waveform from microphone
- [ ] Glowing teal ShaderMaterial line
- [ ] AudioAnalyser time-domain integration
- [ ] Integration with Wall Controller `/api/audio/waveform` endpoint
- [ ] Screenshot for brochure
- [ ] Education lesson outline: "Real-Time Audio Visualization with Three.js"

---

## 7. Mirror AR Pipeline

### Overview
**Module**: Mirror (Ø120mm circular display + camera)
**Assigned**: Prometheus (Software Engineer) + Apollo (Creative Director)
**MVI Stack**: `VideoTexture + BufferGeometry + EffectComposer + UnrealBloomPass`

### Visual Design
- **Camera feed background**: VideoTexture from webcam/camera
- **Face mesh overlay**: MediaPipe 468-vertex face mesh rendered as BufferGeometry
- **AR filter effects**: Deity crowns, glows, particle effects
- **Post-processing**: UnrealBloomPass for ethereal glow
- **Stats overlay**: CSS2D exercise/health stats

### Technical Specification

#### Scene Structure
```javascript
Scene
├── PerspectiveCamera (fov: 50, aspect: 1.0)
├── WebGLRenderer (antialias: true)
├── EffectComposer (post-processing chain)
│   ├── RenderPass
│   └── UnrealBloomPass (strength: 1.5, radius: 0.5, threshold: 0.3)
│
├── Video Feed (PlaneGeometry + VideoTexture)
│   └── Camera feed as background
│
├── Face Mesh (BufferGeometry from MediaPipe)
│   ├── 468 vertices
│   ├── MeshStandardMaterial (semi-transparent for AR overlay)
│   └── ShaderMaterial for deity crown/helmet effect
│
└── CSS2DRenderer (exercise stats overlay)
```

#### Video Feed Setup

```javascript
// Get camera feed
const video = document.createElement('video');
video.autoplay = true;

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
        video.srcObject = stream;
    });

const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

const videoGeometry = new THREE.PlaneGeometry(4, 3);
const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
videoMesh.position.z = -1;
scene.add(videoMesh);
```

#### MediaPipe Face Mesh Integration

```javascript
// MediaPipe Face Mesh (requires @mediapipe/face_mesh)
import { FaceMesh } from '@mediapipe/face_mesh';

const faceMesh = new FaceMesh({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
});

faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

let faceMeshGeometry = null;

faceMesh.onResults((results) => {
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0]; // 468 vertices

        // Update BufferGeometry with face landmarks
        if (!faceMeshGeometry) {
            const positions = new Float32Array(landmarks.length * 3);
            faceMeshGeometry = new THREE.BufferGeometry();
            faceMeshGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.MeshStandardMaterial({
                color: 0x00D4AA,
                emissive: 0x00D4AA,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.7,
                wireframe: true
            });

            const mesh = new THREE.Mesh(faceMeshGeometry, material);
            scene.add(mesh);
        }

        // Update positions
        const positions = faceMeshGeometry.attributes.position;
        landmarks.forEach((landmark, i) => {
            // Convert normalized coords to 3D space
            positions.setXYZ(i, landmark.x * 4 - 2, -(landmark.y * 3 - 1.5), -landmark.z);
        });
        positions.needsUpdate = true;
    }
});

// Feed video frames to MediaPipe
function processFaceMesh() {
    faceMesh.send({ image: video });
    requestAnimationFrame(processFaceMesh);
}
processFaceMesh();
```

#### Deity Filter: Crown Overlay

```javascript
// Add glowing crown particles above head
function addDeityCrown(faceLandmarks) {
    // Get forehead landmark (approximate top of head)
    const foreheadIndex = 10; // MediaPipe landmark for forehead
    const forehead = faceLandmarks[foreheadIndex];

    // Create particle system for crown
    const particleCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 0.3 + Math.random() * 0.2;
        const height = 0.5 + Math.random() * 0.3;

        positions[i * 3] = forehead.x * 4 - 2 + Math.cos(angle) * radius;
        positions[i * 3 + 1] = -(forehead.y * 3 - 1.5) + height;
        positions[i * 3 + 2] = -forehead.z + Math.sin(angle) * radius;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xFFB347, // Amber glow
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const crown = new THREE.Points(geometry, material);
    scene.add(crown);
    return crown;
}
```

#### Post-Processing: Bloom Effect

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // strength
    0.5, // radius
    0.3  // threshold
);
composer.addPass(bloomPass);

// Render with bloom
function animate() {
    requestAnimationFrame(animate);
    composer.render();
}
```

### Deliverables
- [ ] `mirror-ar.html` — standalone demo
- [ ] VideoTexture camera feed
- [ ] MediaPipe face mesh integration
- [ ] Deity crown particle overlay
- [ ] UnrealBloomPass post-processing
- [ ] CSS2D exercise stats overlay
- [ ] Integration with Wall Controller `/api/camera/feed` and `/api/health/stats` endpoints
- [ ] Screenshot for brochure
- [ ] Education lesson outline: "Building AR Filters with Three.js and MediaPipe"

---

## 8. Controller Radial Menu

### Overview
**Module**: Controller (Ø62mm handheld, 480x480 round display + rotary encoder)
**Assigned**: Athena (Industrial Designer)
**MVI Stack**: `TorusGeometry + Sprite + ShaderMaterial + RingGeometry`

### Visual Design
- **Circular menu**: Module icons arranged on TorusGeometry track
- **Rotary encoder sync**: Menu rotates as physical encoder turns
- **Selection highlight**: ShaderMaterial glowing ring at selected position
- **Center preview**: Selected module preview in center circle

### Technical Specification

#### Scene Structure
```javascript
Scene
├── PerspectiveCamera (fov: 50, aspect: 1.0)
├── WebGLRenderer (antialias: true)
│
├── Menu Track (TorusGeometry)
│   ├── Radius: 0.7, tube: 0.02
│   └── Subtle glow material
│
├── Module Icons (Sprite × N modules)
│   ├── Arranged on torus track
│   └── Scale based on distance from selection
│
├── Selection Ring (RingGeometry)
│   ├── ShaderMaterial (glowing teal ring)
│   └── Rotates with encoder input
│
└── Center Preview (CircleGeometry)
    └── Shows selected module status
```

#### Radial Menu Setup

```javascript
const modules = [
    { name: 'Screen-S', icon: 'screen-icon.png', color: 0x00D4AA },
    { name: 'Glow', icon: 'glow-icon.png', color: 0xFFB347 },
    { name: 'Pixel', icon: 'pixel-icon.png', color: 0xFF4466 },
    { name: 'Voice', icon: 'voice-icon.png', color: 0x8888FF }
    // ... more modules
];

const torusRadius = 0.7;
const moduleSprites = [];

modules.forEach((module, i) => {
    const angle = (i / modules.length) * Math.PI * 2;

    // Load icon texture
    const texture = new THREE.TextureLoader().load(module.icon);
    const material = new THREE.SpriteMaterial({
        map: texture,
        color: module.color
    });

    const sprite = new THREE.Sprite(material);
    sprite.position.set(
        Math.cos(angle) * torusRadius,
        Math.sin(angle) * torusRadius,
        0
    );
    sprite.scale.set(0.2, 0.2, 1);
    sprite.userData.moduleData = module;

    scene.add(sprite);
    moduleSprites.push(sprite);
});
```

#### Rotary Encoder Integration

```javascript
let encoderPosition = 0;
let selectedIndex = 0;

// Simulate rotary encoder input (in production, read from ESP32 I2C/UART)
function onEncoderRotate(delta) {
    encoderPosition += delta;

    // Calculate selected module
    const anglePerModule = (Math.PI * 2) / modules.length;
    selectedIndex = Math.floor((encoderPosition * anglePerModule) / (Math.PI * 2)) % modules.length;
    if (selectedIndex < 0) selectedIndex += modules.length;

    // Update selection ring position
    const selectionAngle = selectedIndex * anglePerModule;
    selectionRing.rotation.z = selectionAngle;

    // Scale sprites based on proximity to selection
    moduleSprites.forEach((sprite, i) => {
        const distToSelection = Math.abs(i - selectedIndex);
        const scale = distToSelection === 0 ? 0.3 : 0.2 - (distToSelection * 0.02);
        sprite.scale.set(scale, scale, 1);
    });

    // Update center preview
    updateCenterPreview(modules[selectedIndex]);
}

// Keyboard simulation for demo (arrow keys)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') onEncoderRotate(1);
    if (e.key === 'ArrowLeft') onEncoderRotate(-1);
});
```

#### Selection Ring Shader

```javascript
const selectionRing = new THREE.Mesh(
    new THREE.RingGeometry(0.65, 0.75, 64, 1, 0, Math.PI / 6), // 30° arc
    new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(0x00D4AA) },
            glowIntensity: { value: 2.0 }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            uniform float glowIntensity;
            varying vec2 vUv;

            void main() {
                vec3 glowColor = color * glowIntensity;
                gl_FragColor = vec4(glowColor, 0.8);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide
    })
);
scene.add(selectionRing);
```

### Deliverables
- [ ] `controller-menu.html` — standalone demo
- [ ] Radial menu with module icons
- [ ] Rotary encoder simulation (keyboard arrows)
- [ ] Selection ring with glow shader
- [ ] Center preview circle
- [ ] Integration with ESP32 rotary encoder via `/api/controller/encoder` WebSocket
- [ ] Screenshot for brochure
- [ ] Education lesson outline: "Building Radial Interfaces with Three.js"

---

## 9. eInk Content Renderer

### Overview
**Module**: eInk (180x120mm, 800x480 e-paper display)
**Assigned**: Apollo (Creative Director)
**MVI Stack**: `CanvasTexture + ShaderMaterial(dither) + TextGeometry + SVGLoader`

### Visual Design
- **Pre-rendered content**: Three.js renders on Hub, converts to e-ink compatible image
- **Dithering shader**: Color → grayscale/BW dithering for e-ink display
- **Typography layouts**: Quotes, schedules, minimalist art
- **SVG vector art**: Clean line art suitable for e-ink

### Technical Specification

#### Scene Structure
```javascript
Scene (rendered off-screen on Hub)
├── OrthographicCamera (800x480 resolution)
├── WebGLRenderer (preserveDrawingBuffer: true)
│
├── Text Content (TextGeometry or CSS2D)
│   └── Quote, schedule, or calendar layout
│
├── Vector Art (SVGLoader)
│   └── Minimalist illustrations
│
└── Dithering Pass (ShaderMaterial)
    └── Converts render to e-ink compatible bitmap
```

#### Dithering Shader (Floyd-Steinberg)

```javascript
const ditheringShader = new THREE.ShaderMaterial({
    uniforms: {
        tDiffuse: { value: null }, // Input render
        resolution: { value: new THREE.Vector2(800, 480) }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        varying vec2 vUv;

        // Floyd-Steinberg dithering
        float dither(float gray, vec2 uv) {
            // Simplified: threshold at 0.5
            return gray > 0.5 ? 1.0 : 0.0;
        }

        void main() {
            vec4 color = texture2D(tDiffuse, vUv);

            // Convert to grayscale
            float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));

            // Apply dithering
            float dithered = dither(gray, vUv * resolution);

            gl_FragColor = vec4(vec3(dithered), 1.0);
        }
    `
});
```

#### Content Layout: Daily Quote

```javascript
function renderDailyQuote(quote, author) {
    // Clear scene
    while(scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // Load font
    const loader = new THREE.FontLoader();
    loader.load('fonts/Geist_Sans_Regular.json', (font) => {
        // Quote text
        const quoteGeometry = new THREE.TextGeometry(quote, {
            font: font,
            size: 24,
            height: 0,
            curveSegments: 12
        });

        const quoteMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const quoteMesh = new THREE.Mesh(quoteGeometry, quoteMaterial);
        quoteMesh.position.set(50, 300, 0);
        scene.add(quoteMesh);

        // Author attribution
        const authorGeometry = new THREE.TextGeometry(`— ${author}`, {
            font: font,
            size: 18,
            height: 0
        });

        const authorMesh = new THREE.Mesh(authorGeometry, quoteMaterial);
        authorMesh.position.set(500, 100, 0);
        scene.add(authorMesh);

        // Render and dither
        renderAndDither();
    });
}
```

#### Render and Upload to eInk Module

```javascript
function renderAndDither() {
    // Render scene to texture
    renderer.render(scene, camera);

    // Apply dithering shader
    const renderTarget = new THREE.WebGLRenderTarget(800, 480);
    renderer.setRenderTarget(renderTarget);
    // ... apply dithering pass

    // Extract as image
    const canvas = renderer.domElement;
    const dataURL = canvas.toDataURL('image/png');

    // Send to eInk module
    fetch('http://hub.local:8200/api/modules/eink-01/display', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataURL })
    });
}
```

### Deliverables
- [ ] `eink-renderer.html` — standalone demo
- [ ] Dithering shader (Floyd-Steinberg or similar)
- [ ] Quote layout template
- [ ] Schedule/calendar layout template
- [ ] SVGLoader for vector art
- [ ] Integration with `/api/modules/eink-{id}/display` endpoint
- [ ] Screenshot for brochure
- [ ] Education lesson outline: "Rendering for E-Ink Displays with Three.js"

---

## 10. Holo Sacred Geometry Engine

### Overview
**Module**: Holo (140x140mm POV hologram fan)
**Assigned**: Apollo (Creative Director) + Athena (Industrial Designer)
**MVI Stack**: `Points + IcosahedronGeometry + EdgesGeometry + ShaderMaterial`

### Visual Design
- **Sacred geometry patterns**: Flower of Life, Metatron's Cube, platonic solids
- **Wireframe aesthetic**: EdgesGeometry with glowing lines
- **Particle mandalas**: Points-based rotating patterns
- **Hologram shader**: Scan-line effect, transparency, flicker

### Technical Specification

#### Scene Structure
```javascript
Scene
├── PerspectiveCamera (fov: 50, aspect: 1.0)
├── WebGLRenderer (antialias: true, alpha: true)
│
├── Platonic Solid (IcosahedronGeometry)
│   ├── EdgesGeometry (wireframe)
│   ├── ShaderMaterial (hologram glow + scan lines)
│   └── Rotation animation
│
└── Particle Mandala (Points)
    ├── BufferGeometry (geometric pattern)
    └── PointsMaterial (glowing particles)
```

#### Sacred Geometry: Flower of Life

```javascript
function createFlowerOfLife(radius, circles) {
    const points = [];

    // Central circle
    for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2;
        points.push(new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
        ));
    }

    // Surrounding circles (6 petals)
    for (let petal = 0; petal < 6; petal++) {
        const petalAngle = (petal / 6) * Math.PI * 2;
        const centerX = Math.cos(petalAngle) * radius;
        const centerY = Math.sin(petalAngle) * radius;

        for (let i = 0; i < 60; i++) {
            const angle = (i / 60) * Math.PI * 2;
            points.push(new THREE.Vector3(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius,
                0
            ));
        }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00D4AA,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    return new THREE.Points(geometry, material);
}
```

#### Platonic Solid: Rotating Icosahedron

```javascript
const icosahedron = new THREE.IcosahedronGeometry(1, 0);
const edges = new THREE.EdgesGeometry(icosahedron);

const hologramShader = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xCC44FF) } // Magenta
    },
    vertexShader: `
        varying vec3 vPosition;
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vPosition;

        void main() {
            // Scan-line effect
            float scanLine = fract(vPosition.y * 10.0 + time * 2.0);
            float scanIntensity = smoothstep(0.4, 0.6, scanLine);

            // Flicker
            float flicker = 0.9 + sin(time * 50.0) * 0.1;

            vec3 glowColor = color * (scanIntensity * 0.5 + 0.5) * flicker;
            gl_FragColor = vec4(glowColor, 0.7);
        }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending
});

const icosahedronMesh = new THREE.LineSegments(edges, hologramShader);
scene.add(icosahedronMesh);

// Rotation animation
function animate() {
    requestAnimationFrame(animate);

    icosahedronMesh.rotation.x += 0.005;
    icosahedronMesh.rotation.y += 0.01;
    hologramShader.uniforms.time.value += 0.016;

    renderer.render(scene, camera);
}
```

#### Metatron's Cube

```javascript
function createMetatronsCube() {
    // 13 circles arranged in sacred geometry pattern
    const circles = [
        new THREE.Vector2(0, 0), // Center
        new THREE.Vector2(1, 0),
        new THREE.Vector2(-1, 0),
        new THREE.Vector2(0, 1),
        new THREE.Vector2(0, -1),
        new THREE.Vector2(0.866, 0.5),
        new THREE.Vector2(0.866, -0.5),
        new THREE.Vector2(-0.866, 0.5),
        new THREE.Vector2(-0.866, -0.5),
        new THREE.Vector2(0.5, 0.866),
        new THREE.Vector2(-0.5, 0.866),
        new THREE.Vector2(0.5, -0.866),
        new THREE.Vector2(-0.5, -0.866)
    ];

    const points = [];
    const radius = 0.3;

    circles.forEach(center => {
        for (let i = 0; i < 60; i++) {
            const angle = (i / 60) * Math.PI * 2;
            points.push(new THREE.Vector3(
                center.x + Math.cos(angle) * radius,
                center.y + Math.sin(angle) * radius,
                0
            ));
        }
    });

    // Connect centers with lines
    const linePoints = [];
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            linePoints.push(new THREE.Vector3(circles[i].x, circles[i].y, 0));
            linePoints.push(new THREE.Vector3(circles[j].x, circles[j].y, 0));
        }
    }

    const linesGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x00D4AA,
        transparent: true,
        opacity: 0.5
    });

    return new THREE.LineSegments(linesGeometry, linesMaterial);
}
```

### Deliverables
- [ ] `holo-sacred-geometry.html` — standalone demo
- [ ] Flower of Life particle pattern
- [ ] Metatron's Cube wireframe
- [ ] Rotating platonic solids (Icosahedron, Octahedron)
- [ ] Hologram scan-line shader
- [ ] Integration with `/api/modules/holo-{id}/pattern` endpoint
- [ ] Screenshot/video for brochure
- [ ] Education lesson outline: "Sacred Geometry Visualization with Three.js"

---

## Reference
- **Parent task**: SACA-74
- **Three.js mapping**: `docs/INTERFACE-DESIGN-THREEJS.md`
- **Brand guide**: `docs/BRAND-BIBLE.md`
- **API docs**: `docs/architecture/ARCHITECTURE.md`
