# mosAIc — Website Copy

**Date**: 2026-04-08  
**Owner**: Niko (CEO)  
**Status**: Final — ready for web implementation  
**Related**: SACA-61

---

## Landing Page Hero

```
mosAIc
Your desktop. On your wall.

As software ate the world, AI is throwing it back up.
Apps are escaping the phone. The wall is where they land.

Screens. Sensors. Lights. Speakers. AI. Magnetic tiles that snap together.
The wall learns your patterns — it pulses when you arrive, glows when you focus, whispers when you forget.

Build it. Expand it. The wall grows with you.

[Start Building] [See How It Works]
```

---

## Value Propositions

### Physical Computing, Reimagined
Your phone trapped everything behind glass. mosAIc breaks it back out — calendar on one tile, weather on another, your voice notes glowing amber when you walk in the door. Touch it. Rearrange it. The wall is yours.

### Modular by Design
Start with three tiles. Add sensors when you need them. Snap on speakers when your wall deserves a voice. No waste — every module plugs into the grid, shares power, talks to its neighbors over CAN Bus. Ancient mosaic craft + modern edge computing.

### AI-Orchestrated Intelligence
The Hub learns what you pay attention to. It routes content to the right module at the right time — news to the Screen-S at breakfast, your health stats to the Round when you stretch, deity faces to the Mirror when you need to remember who you are. You don't program it. It watches.

### Open Hardware, Proprietary Magic
PCB files, STL housings, firmware — all open on GitHub. Build it yourself or commission a print farm. The software layer (widget animations, mythology pipeline, Sacred Circuits oracle readings) — that's where the magic lives. And that stays ours.

### Educational at Every Level
Every module is a lesson. Screen-S teaches touch sensing and SPI displays. Voice teaches I2S audio and wake-word detection. Pixel teaches addressable LEDs and FFT frequency analysis. You don't just buy mosAIc — you learn how technology works, one tile at a time.

---

## How It Works

### 1. Snap Modules Together
Each module has magnetic pogo pin connectors on all four edges. Align the tiles — click — they lock in place and power flows. No screws. No wiring harnesses. Magnetic grip strong enough to hang vertical, gentle enough to rearrange without tools.

### 2. The Hub Discovers Everything
The Hub module boots. CAN Bus wakes up. Every module introduces itself via I2C EEPROM — "I'm Screen-S-00123, I can show widgets and weather." The Hub maps the grid. Position data flows. The wall knows its own shape.

### 3. Widgets Route to Displays
You want weather? The Hub fetches it, renders a Three.js widget, pushes pixels to the closest Screen module. Audio visualizer? Pixel module gets real-time FFT data over WebSocket. Clock? Round module spins a GPU-shader ring. The right content lands on the right tile — automatically.

### 4. AI Learns Your Patterns
Hub runs a FastAPI agent with local LLM inference. It watches which modules you touch, when you arrive, what time you check email, how long you look at each tile. Patterns emerge. The wall anticipates. Calendar slides to eye level at 9 AM. Voice memo pulses amber when you're near the door. No rules — just observation.

### 5. Expand Forever
Need more? Add modules. The grid has no maximum size — just power budget and CAN Bus topology. Four modules today. Sixteen next month. Forty-two covering your entire desk wall. Every tile teaches. Every tile thinks. The mosaic never finishes.

---

## Module Descriptions

### Screen-S — $79
**2.8" LCD touchscreen. Widgets, dashboards, weather — whatever your AI decides matters right now.**

- **Display**: 320×240 IPS LCD, capacitive touch
- **CPU**: ESP32-S3 (dual-core 240MHz, WiFi, Bluetooth)
- **Size**: 76 × 116 × 20mm
- **Power**: 1.2W typical, 2.5W peak
- **Interfaces**: CAN Bus, WiFi, I2C EEPROM
- **What it shows**: Weather widgets, calendar, notifications, Three.js visualizations
- **Why it matters**: The gateway module — your first window into what the wall can do

**Use case**: Mount next to your desk. The wall knows when you sit down. Weather slides in. Email count updates. You touch the tile — it switches to your tasks. The first module everyone buys. The one that makes you want ten more.

---

### Screen-M — $129
**5" LCD multitouch. Dashboard central. Three widgets side-by-side, GPU-rendered, 60fps smooth.**

- **Display**: 800×480 IPS LCD, 5-point multitouch
- **CPU**: ESP32-S3-N16R8 (16MB flash, 8MB PSRAM)
- **Size**: 140 × 116 × 22mm
- **Power**: 2.8W typical, 4.5W peak
- **Interfaces**: CAN Bus, WiFi, I2C, SPI
- **What it shows**: Multi-panel dashboards (weather + calendar + health), code editor, design mockups
- **Why it matters**: Where serious work happens on the wall

**Use case**: Your command center. Left panel: today's schedule. Middle: current weather and air quality. Right: steps and calories. Or flip it — code on the left, docs on the right, terminal at the bottom. The wall is your second monitor. Vertical. Modular. Rearrangeable.

---

### Glow — $49
**16×16 RGB LED matrix. Ambient patterns. Notification pulses. Circadian breathing.**

- **LEDs**: 256 × APA102 addressable RGB, 60fps refresh
- **CPU**: ESP32-S3-N8R2
- **Size**: 116 × 116 × 18mm (square tile)
- **Power**: 3.5W typical (50% brightness), 12W peak (white 100%)
- **Interfaces**: CAN Bus, SPI daisy-chain for multi-tile installations
- **Modes**: Circadian glow (warm AM, cool PM), notification flash, audio reactive, custom patterns
- **Why it matters**: The wall breathes. The wall feels alive.

**Use case**: Mounts above your monitor. Pulses amber at sunrise — gentle wake-up glow. Shifts to cool teal by noon. Flashes coral when a calendar event fires. Breathes with your music when the Pixel module hears bass. The Glow module is why people stop scrolling on the product page. It's the one in every hero shot.

---

### Pixel — $99
**2048 individually-addressable LEDs. Audio visualizer. Spectral FFT bars. VU meter. Eye candy.**

- **LEDs**: 2048 × WS2812B, 128×16 matrix layout
- **CPU**: ESP32-S3-N8R8 (8MB PSRAM for frame buffers)
- **Size**: 240 × 116 × 20mm (wide tile)
- **Power**: 6W typical (animated patterns), 25W peak (full white)
- **Audio input**: I2S microphone or line-in from Hub
- **Modes**: FFT frequency bars, waveform scope, VU meter, particle effects
- **Why it matters**: Music becomes light. Sound becomes shape.

**Use case**: You play a track. The Pixel module wakes. Bass hits — the bottom row pulses coral. Treble sparkles across the top in violet. Mid-range breathes teal. Real-time FFT analysis, GPU-accelerated shader effects, 60fps smooth. This is the module that stops people mid-sentence when they see it running.

---

### Voice — $89
**Far-field microphone array. Wake-word detection. Voice memos. AI oracle readings.**

- **Microphones**: 2× I2S MEMS (INMP441), beamforming
- **Speaker**: 3W mono, full-range driver
- **CPU**: ESP32-S3-N8R8
- **Size**: 116 × 116 × 24mm (square, deeper for speaker chamber)
- **Power**: 1.8W idle, 4.5W speaking
- **Wake words**: "Hey mosaic" (local Porcupine detection, no cloud)
- **Features**: Voice memos, TTS playback, mythology oracle readings (Sacred Circuits integration)
- **Why it matters**: The wall listens. The wall speaks back.

**Use case**: You walk to the wall. "Hey mosaic, remind me to call Sarah at 3." The Voice module glows violet. "Reminder set." At 2:55 PM, it speaks: "Call Sarah in five minutes." Or — you scan your oracle card with NFC. The Voice module channels Athena. A personalized reading flows through the 3W speaker. This is Sacred Circuits mythology brought to life.

---

### Round — $69
**Circular e-paper clock. Analog face. Digital precision. Weeks of battery (or wall-powered).**

- **Display**: 2.13" round e-paper, 1-bit monochrome
- **CPU**: ESP32-C3 (RISC-V, ultra-low-power)
- **Size**: 116mm diameter × 12mm thick
- **Power**: 0.02W average (updates once per minute), runs 3 weeks on battery or infinite wall-powered
- **RTC**: DS3231 precision real-time clock (±2 ppm, battery-backed)
- **Modes**: Analog clock face, countdown timer, moon phase, tide chart
- **Why it matters**: The module that breaks the grid. Circular tile. Timeless design.

**Use case**: Every wall needs a clock. But not a digital 7-segment LED brick. The Round module renders an analog face — ink on paper, no backlight, no eye strain. Updates once per minute. Runs forever. Mount it anywhere in the grid — the circle interrupts the squares, creates visual tension, makes the whole composition feel intentional. Craft meets technology.

---

### Mirror — $149
**Smart mirror with AR overlay. Deity face filters. Workout form tracking. Mythology brought to life.**

- **Camera**: ESP32-CAM (2MP OV2640)
- **Display**: 5" semi-transparent LCD + rear mirror film
- **CPU**: ESP32-S3-N16R8
- **Size**: 140 × 180 × 28mm (portrait tile)
- **Power**: 3.5W typical
- **Features**: Face detection (MediaPipe), deity filter overlays, workout pose estimation, Sacred Circuits mythology integration
- **Why it matters**: The mirror shows you who you could be.

**Use case**: You stand in front of the Mirror module. It sees your face. The Hub routes a deity overlay — maybe Athena (wisdom), maybe Ares (strength), maybe Apollo (radiance). The filter appears. Eyes glow. Sacred geometry pulses. This is mythology as interface. Or — you do pushups. The Mirror tracks your form. Rep count updates. "Elbows in. Three more." The wall coaches.

---

### Holo — $199
**Volumetric POV display. Spinning persistence-of-vision. 3D sacred geometry floating in air.**

- **LEDs**: 256 × APA102 on rotating arm
- **Motor**: BLDC with hall-effect feedback, 1200 RPM
- **CPU**: ESP32-S3-N8R8
- **Size**: 200 × 200 × 60mm (needs depth for spin clearance)
- **Power**: 8W running
- **Modes**: Platonic solids (icosahedron, octahedron), mandalas, Greek letter glyphs, custom 3D models
- **Safety**: Proximity sensor stops spin if hand approaches
- **Why it matters**: Hologram without holograms. Ancient forms suspended in light.

**Use case**: The Holo module spins. An icosahedron materializes in midair — teal edges, magenta vertices, rotating slowly. Geometry that Plato knew, rendered with LEDs and persistence of vision. You reach toward it — the motor stops instantly, safety sensor triggered. The sacred made visible. The module nobody needs. The one everyone wants.

---

### Hub — $199
**The brain. Wall Controller Agent. FastAPI server. Module discovery. AI inference. Web configurator.**

- **CPU**: Raspberry Pi 5 (quad-core Cortex-A76, 8GB RAM)
- **Storage**: 128GB NVMe SSD
- **Network**: Gigabit Ethernet, WiFi 6, Bluetooth 5.2
- **CAN Bus**: Dual-channel SN65HVD230 transceiver
- **Power**: 12W typical, 15W peak
- **Size**: 180 × 140 × 35mm (wide + deep for Pi and SSD)
- **Software**: FastAPI Wall Controller, Three.js widget server, local LLM (1B-3B param), scene manager
- **Interfaces**: 30+ REST endpoints, WebSocket real-time, mDNS discovery
- **Why it matters**: Without the Hub, modules are tiles. With it, they're a mosaic.

**Use case**: The Hub boots. CAN Bus discovery runs. Every module reports in. The wall map builds. You open `http://hub.local:8200` in a browser — the web configurator loads. A 3D preview of your wall, live module status, drag-and-drop scene editor. You create a "Morning" scene: weather on Screen-S, calendar on Screen-M, amber glow on Glow, clock on Round. Save. At 7 AM tomorrow, the scene activates automatically. The Hub learned your wake time. It orchestrates. The wall thinks.

---

### Controller — $59
**Rotary encoder. OLED screen. Physical control. Dial to select modules. Click to activate scenes.**

- **Input**: Rotary encoder (36 detents, RGB LED ring), push button
- **Display**: 1.3" OLED (128×64, white on black)
- **CPU**: ESP32-C3
- **Size**: 76 × 76 × 24mm (square, small tile)
- **Power**: 0.8W
- **Function**: Scene selector, module brightness control, manual overrides
- **Why it matters**: AI is great. Knobs are better.

**Use case**: The wall does too much automatically. You want manual override. You turn the Controller knob — the OLED cycles through scenes: Morning, Focus, Evening, Sleep. You click. The selected scene activates instantly. Or — you hold the knob, turn — global brightness adjustment for all modules. The Controller is the escape hatch. The tactile override. The reminder that you built this, you control it, the wall serves you.

---

### eInk — $89  
**4.2" e-paper display. Black/white/red tri-color. Daily schedule. Task list. Quotes. Zero eye strain.**

- **Display**: 4.2" tri-color e-paper (400×300, 1-bit per channel)
- **CPU**: ESP32-C3
- **Size**: 116 × 140 × 12mm (thin tile)
- **Power**: 0.01W standby (updates 1-2x per day), 0.5W during refresh
- **Modes**: Calendar view, task list, quote of the day, Sacred Circuits daily oracle
- **Why it matters**: Information that stays. No refresh flicker. No backlight burn.

**Use case**: You glance at the eInk module. Today's schedule — rendered in high-contrast black and red. Three tasks. Two meetings. One reminder. It hasn't changed in four hours. It won't change until something updates. The eInk module is the antidote to refresh-rate addiction. Information at rest. The wall as paper.

---

## FAQ

### How much does a starter wall cost?
Three tiles (Screen-S, Glow, Hub): **$327**. That's your first functional wall — weather widget, ambient glow, AI orchestration. Add modules as you grow.

### How does power distribution work?
Every module has a PTC fuse (2A) and reverse-polarity protection. The Hub supplies 5V over magnetic pogo pins. Daisy-chain power flows tile-to-tile. The Hub can power up to 40 low-power modules or 15 high-power modules (Screen-M, Pixel, Holo). Need more? Add a second Hub or external 5V brick with barrel jack.

### Is it safe to hot-swap modules?
Yes. The discovery protocol handles graceful insertion and removal. Unplug a Screen-S mid-widget — the Hub detects disconnection within 2 seconds, reroutes content to the next available display. Plug it back in — rediscovery, re-registration, content resumes. No reboots. No crashes.

### What if I don't want AI orchestration?
Turn it off. The Hub runs a FastAPI server with manual scene controls. Use the web configurator (`http://hub.local:8200`) to create scenes, assign widgets to specific modules, set schedules. The AI layer is optional — pattern learning, auto-routing, predictive content. You control how much intelligence the wall has.

### Can I build my own modules?
Yes. PCB files, STL housings, firmware templates — all on GitHub (`igwana12/modular-wall`). The I2C EEPROM protocol is documented. The CAN Bus message format is open. Build a custom sensor. A weird LED pattern. A Geiger counter. As long as it speaks CAN and identifies via EEPROM, the Hub will discover it.

### Does it work with Home Assistant?
Phase 2. The Wall Controller Agent will expose an MQTT bridge and REST webhook endpoints. Control your wall from HA. Trigger wall scenes from HA automations. Two-way sync. Not shipping at launch, but the API architecture supports it.

### How loud is the Holo module?
The BLDC motor runs at 1200 RPM — about as loud as a laptop fan under load (35-40 dB). Proximity sensor stops the spin if you get close. You can also schedule quiet hours (Holo sleeps, static LED patterns only) or disable the motor entirely and use it as a 256-LED Glow-XL.

### What's the Sacred Circuits connection?
Sacred Circuits is the parent brand — Greek mythology meets AI. mosAIc is the hardware platform. The mythology layer (deity face filters, oracle readings, sacred geometry animations) is proprietary content that runs on top of the open hardware. You can build a wall without mythology. But the magic happens when you add it.

### When does it ship?
Phase 0 (specs and prototypes) — April 2026. Phase 1 (alpha batch, 50 units) — June 2026. Kickstarter campaign — Q4 2026. First public shipments — Q1 2027. All dates subject to PCB fab times and injection molding tooling.

### Why "mosAIc" and not "Mosaic"?
The AI is the point. Ancient mosaic tiles + modern intelligence. The capital "AI" makes it visible — subtle but unmissable. Plus, nobody else can trademark it this way. It's ours.

---

*Last updated: 2026-04-08*  
*Owner: Niko (CEO)*  
*Ready for: Website implementation (Prometheus), design (Euterpe)*
