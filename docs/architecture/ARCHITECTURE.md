# The Modular Wall — Technical Architecture

## System Overview

```
User Voice / App / AI Context
        │
        ▼
┌─────────────────────────┐
│   JARVIS / Smithers     │  AI Brain (existing infrastructure)
│   (FastAPI @ 8200)      │  Task routing, context detection, LLM calls
└─────────┬───────────────┘
          │ OSC commands
          ▼
┌─────────────────────────┐
│   TouchDesigner         │  Media Server (Windows + Nvidia GPU)
│   (Node-based visual)   │  Content generation, pixel mapping, sync
└─────────┬───────────────┘
          │
    ┌─────┼──────────────────────┐
    │     │                      │
    ▼     ▼                      ▼
  HDMI  ArtNet/sACN           MQTT
    │   (WiFi UDP)              │
    ▼     ▼                      ▼
Monitors  ESP32 Modules     Power/Status
(Screen)  (Holo, Pixel,     Management
          Glow, Speaker)
```

## Protocol Stack

### Layer 1: AI → Media Server (OSC)
JARVIS sends semantic commands to TouchDesigner via OSC (Open Sound Control):
```
/scene/activate "mythology_zeus"
/mood/transition "ocean" 5.0
/module/{id}/content "zeus-thunderbolt"
/wall/brightness 0.8
/audio/crossfade "ethereal" 2.0
```

### Layer 2: Media Server → Modules (ArtNet/sACN)
TouchDesigner renders pixel data and sends to each module via ArtNet over WiFi:
- Each module = 1-2 DMX universes (512 channels per universe)
- 144 RGB LEDs = 432 channels = ~1 universe
- 10 modules = ~10-20 universes (trivial for modern WiFi)
- ArtSync packets for frame-locked synchronization

### Layer 3: Module Sync (ESP-NOW)
For sub-millisecond synchronization between modules:
- Hub module broadcasts "render now" via ESP-NOW
- All modules buffer their ArtNet frame, render on ESP-NOW trigger
- ESP-NOW latency: ~1ms, range 220m
- WiFi and ESP-NOW run simultaneously on ESP32-S3

### Layer 4: Management (MQTT)
Non-real-time control and monitoring:
- Module discovery and registration
- Power on/off commands
- Temperature monitoring (DHT22 per module)
- Firmware OTA updates
- Health heartbeats

## Module Hardware Standard

### Shared Backplate (All Modules)
```
┌────────────────────────────┐
│                            │
│   ┌──────────────────┐     │
│   │   ESP32-S3       │     │
│   │   (N8R2 minimum) │     │
│   └──────┬───────────┘     │
│          │                 │
│   ┌──────┴───────────┐     │
│   │  Pogo Pin Array  │     │  ← 6-pin: VCC, GND, SPI_CLK, SPI_DAT, I2C_SDA, I2C_SCL
│   └──────────────────┘     │
│                            │
│   [Magnet] [Magnet]        │  ← N52 neodymium, 10mm x 3mm
│   [Magnet] [Magnet]        │    Alternating polarity for alignment
│                            │
│   Module-specific hardware │
│   mounted on front side    │
│                            │
└────────────────────────────┘
```

### Pogo Pin Connector (6-pin standard)
| Pin | Signal | Purpose |
|-----|--------|---------|
| 1 | VCC (5V) | Power bus |
| 2 | GND | Ground |
| 3 | SPI_CLK | LED data clock (APA102) |
| 4 | SPI_DAT | LED data |
| 5 | I2C_SDA | Inter-module communication |
| 6 | I2C_SCL | Inter-module clock |

Power passes through modules via pogo pins — each module can power its neighbors. Hub module provides main 5V power via USB-C PD (up to 100W).

### Module-Specific Hardware

#### Holo Module (POV Hologram Fan)
- APA102 LED strip (72-144 LEDs on blade arm)
- N20 micro gear motor (3-5 RPM for ambient, up to 20 RPM for high-res)
- US5881LUA Hall effect sensor (revolution sync)
- 4-wire slip ring (power + SPI to rotating assembly)
- Acrylic safety cover (3mm clear, anti-reflective)
- Matte black back panel

#### Screen Module
- 4" or 5" IPS display (800x480 or 720x720 round)
- SPI or MIPI DSI interface to ESP32-S3
- Framebuffer rendering from ArtNet data
- Optional: touch input via capacitive overlay

#### Glow Module
- 8x8 or 12x12 APA102 LED matrix behind frosted diffuser
- Frosted acrylic or silicone diffuser panel
- Simple but effective ambient lighting

#### Pixel Module
- 16x16 or 32x32 WS2812B matrix (lower refresh OK since not POV)
- Clear or lightly frosted cover
- Retro pixel art aesthetic

#### Speaker Module
- 3W full-range driver + MAX98357A I2S amp
- I2S audio data from ESP32 (received via WiFi from TouchDesigner)
- Bass port design in enclosure
- Multiple speakers = distributed/spatial audio

#### Sense Module (Input Only)
- INMP441 I2S MEMS microphone
- DHT22 temperature/humidity
- PIR or mmWave presence sensor
- No visual output — feeds data back to AI

## Hub Module (Required, One Per Wall)

The Hub is the coordinator:
```
┌─────────────────────────────────┐
│  Hub Module                     │
│                                 │
│  ESP32-S3 (N16R8)              │
│  ├── WiFi STA: home network    │
│  ├── WiFi AP: module config    │
│  ├── ESP-NOW: sync broadcast   │
│  ├── MQTT client: status       │
│  └── ArtNet relay: pixel data  │
│                                 │
│  USB-C PD input (100W)         │
│  5V power distribution bus     │
│  Status LED indicator          │
│  Physical reset button         │
└─────────────────────────────────┘
```

## Wall Rail System

Modules mount to an aluminum wall rail (think IKEA picture rail):
```
Wall
│
│  ┌─ Aluminum Rail ──────────────────────────┐
│  │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │  ← Mounting holes (screws to wall)
│  │  ═══════════════════════════════════════  │  ← Steel strip (magnets attach here)
│  │  + + + + + + + + + + + + + + + + + + + +  │  ← Power bus (optional, for wired power)
│  └──────────────────────────────────────────┘
│
│  Modules snap magnetically to the rail
│  Pogo pins on back of module contact rail conductors
│  Modules can also snap to each other (side magnets)
```

## Software Architecture

### Configuration App (Web-based)
```
┌──────────────────────────────────────┐
│  Wall Configurator                   │
│                                      │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│  │Holo│ │Scrn│ │Glow│ │Glow│       │  ← Drag-and-drop virtual grid
│  └────┘ └────┘ └────┘ └────┘       │    mirrors physical layout
│  ┌────┐ ┌─────────────┐ ┌────┐     │
│  │Pixl│ │  Screen 2x1 │ │Spkr│     │
│  └────┘ └─────────────┘ └────┘     │
│                                      │
│  Scenes: [Morning] [Focus] [JARVIS]  │
│  AI Mode: "Make it feel oceanic"     │
│  Schedule: Morning 6am, Focus 9am   │
│                                      │
└──────────────────────────────────────┘
```

### Firmware Architecture (Per Module)
```
main.cpp
├── WiFiManager       — Connect to home network, fallback AP mode
├── ArtNetReceiver    — Listen for ArtNet pixel data on assigned universe
├── ESPNowSync        — Receive sync triggers from Hub
├── MQTTClient        — Report health, receive config commands
├── ModuleDriver      — Abstract base class
│   ├── HoloDriver    — POV rendering, motor control, Hall sensor
│   ├── ScreenDriver  — Framebuffer rendering to display
│   ├── GlowDriver    — LED matrix diffused output
│   ├── PixelDriver   — LED matrix pixel art output
│   ├── SpeakerDriver — I2S audio output
│   └── SenseDriver   — Sensor readings, mic input
├── OTAUpdater        — Over-the-air firmware updates
└── ConfigStore       — NVS preferences (module ID, universe, etc.)
```

## Networking Topology

```
Internet
    │
Home Router (5GHz)
    │
    ├── TouchDesigner Workstation (Ethernet preferred)
    │     ├── HDMI → Monitor modules (direct GPU output)
    │     ├── ArtNet UDP multicast → All ESP32 modules
    │     └── OSC ← JARVIS/Smithers
    │
    ├── Smithers (existing, FastAPI @ 8200)
    │     └── OSC → TouchDesigner
    │
    ├── Hub Module (WiFi STA)
    │     ├── ESP-NOW broadcast → All modules (sync clock)
    │     └── MQTT → Smithers (status reporting)
    │
    ├── Module 1 - Holo (WiFi STA)
    │     └── ArtNet listener, universe 1
    ├── Module 2 - Screen (WiFi STA)
    │     └── ArtNet listener, universe 2-3
    ├── Module 3 - Glow (WiFi STA)
    │     └── ArtNet listener, universe 4
    └── ...
```

## Bill of Materials (Per Module Type)

### Holo Module BOM
| Part | Unit Cost | Source |
|------|-----------|--------|
| ESP32-S3-WROOM-1 (N8R2) | $3.50 | AliExpress |
| APA102 LED strip 144/m (0.5m) | $8.00 | AliExpress |
| N20 micro gear motor 5RPM | $3.00 | AliExpress |
| US5881LUA Hall sensor | $0.50 | AliExpress |
| 4-wire slip ring 12.5mm | $4.00 | AliExpress |
| Acrylic cover 3mm | $3.00 | Local |
| PCB (custom backplate) | $2.00 | JLCPCB |
| Magnets N52 10x3mm (x4) | $2.00 | AliExpress |
| Pogo pins + housing | $1.50 | AliExpress |
| Enclosure (3D printed) | $3.00 | Self |
| Buck converter 5V 3A | $1.00 | AliExpress |
| Misc (wires, caps, resistors) | $1.50 | — |
| **Total** | **~$33** | |

### Screen Module BOM
| Part | Unit Cost |
|------|-----------|
| ESP32-S3-WROOM-1 (N8R2) | $3.50 |
| 4" IPS 800x480 SPI display | $12.00 |
| PCB + backplate | $2.00 |
| Magnets + pogo pins | $3.50 |
| Enclosure (3D printed) | $3.00 |
| Misc | $1.00 |
| **Total** | **~$25** |

### Glow Module BOM
| Part | Unit Cost |
|------|-----------|
| ESP32-S3-WROOM-1 (N8R2) | $3.50 |
| APA102 8x8 matrix (64 LEDs) | $4.00 |
| Frosted acrylic diffuser | $2.00 |
| PCB + backplate | $2.00 |
| Magnets + pogo pins | $3.50 |
| Enclosure | $2.00 |
| **Total** | **~$17** |

## Development Phases

### Phase 1: Single Holo Module Prototype
- Build one custom POV fan with ESP32-S3 + APA102
- Verify ArtNet reception from TouchDesigner
- Validate visual quality and framerate

### Phase 2: Multi-Module Communication
- Build Hub module
- Test ESP-NOW sync between Hub and 3 modules
- Implement ArtNet universe assignment
- Test MQTT health reporting

### Phase 3: Backplate Standardization
- Design universal PCB backplate
- Test pogo pin power pass-through
- Design magnetic alignment system
- 3D print enclosure prototypes

### Phase 4: TouchDesigner Integration
- Build JARVIS → OSC → TouchDesigner pipeline
- Create content templates for each module type
- Implement scene switching logic
- Test end-to-end: voice command → wall reaction

### Phase 5: Configuration App
- Web-based wall layout editor
- Scene creation and scheduling
- AI natural language scene generation
- Module firmware OTA update system
