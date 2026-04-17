# mosAIc Widget Prototypes

Standalone HTML demos for each Three.js-powered mosAIc module interface.

## Available Prototypes

### ✅ Screen-S Weather Widget
**File**: `screen-s-weather.html`
**Status**: Complete
**Features**:
- Animated weather background shaders (rain, cloudy, sunny)
- Live clock display
- Temperature and condition overlay
- Keyboard controls: R (rain), C (cloudy), S (sunny)
- Auto-cycles through conditions every 10 seconds

**Open in browser**: `open screen-s-weather.html`

### 🚧 Hub 3D Wall Configurator
**File**: `hub-wall-configurator.html`
**Status**: Planned
**Features**: Coming soon

### 🚧 Pixel Audio Visualizer
**File**: `pixel-audio-visualizer.html`
**Status**: Planned
**Features**: Coming soon

### 🚧 Round Circular Clock
**File**: `round-clock.html`
**Status**: Planned
**Features**: Coming soon

## Usage

1. **Open directly in browser**:
   ```bash
   open prototypes/screen-s-weather.html
   ```

2. **Serve with local HTTP server** (recommended for API integration):
   ```bash
   cd prototypes
   python3 -m http.server 8080
   # Visit: http://localhost:8080/screen-s-weather.html
   ```

3. **Integrate with Hub**: Once Wall Controller Agent is running, prototypes can fetch live data from `http://hub.local:8200/api/*`

## Development

Each prototype is:
- **Standalone** — No build process, open directly in browser
- **Self-contained** — Uses CDN for Three.js, all code in one file
- **Brand-compliant** — Uses mosAIc colors (#00D4AA teal, #FFB347 amber, #0D0D1A dark)
- **Educational** — Code is commented and structured for learning

## Next Steps

1. Complete remaining priority prototypes (Configurator, Audio Visualizer, Clock)
2. Add API integration for live weather data
3. Test on actual ESP32 displays (320x240, 480x480, etc.)
4. Optimize for 60fps on embedded hardware
5. Create education lesson plans for each widget

## Reference

- **Implementation Specs**: `../docs/WIDGET-IMPLEMENTATION-SPECS.md`
- **Three.js Mapping**: `../docs/INTERFACE-DESIGN-THREEJS.md`
- **Brand Guide**: `../docs/BRAND-BIBLE.md`
