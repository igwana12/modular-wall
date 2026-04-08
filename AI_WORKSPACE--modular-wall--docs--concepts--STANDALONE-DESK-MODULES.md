# mosAIc Singles — Standalone Desk Modules

**Date**: 2026-04-06
**Status**: Concept — major product line expansion
**Impact**: Changes go-to-market — desk modules are a lower-barrier entry point than a wall

---

## The Insight

Every mosAIc module already has WiFi built into its ESP32. **Any single module can work completely standalone.** Connect to WiFi, pull data, display content — no wall, no Hub, no steel plate required.

This means:
- A Screen-S on your desk = a smart clock / weather display / dashboard
- A Glow on your nightstand = a smart ambient light
- A Pixel on your shelf = a Tidbyt-style pixel art display
- A Round on your desk = a circular clock / notification indicator
- A Mirror on your vanity = a smart mirror with ring light

**You don't need to buy a wall. You buy one module. Then maybe another. Then eventually you build the wall.**

---

## mosAIc Singles vs mosAIc Wall

| Feature | Singles (Desk) | Wall (Mounted) |
|---------|---------------|----------------|
| **Requires Hub** | No — each module connects to WiFi independently | Yes — Hub coordinates |
| **Requires steel plate** | No — sits in a desk stand/cradle | Yes — magnets snap to steel |
| **Power** | USB-C directly (5V from any charger) | Pogo pins from wall bus bar |
| **Communication** | WiFi only (no CAN Bus, no pogo data) | WiFi + CAN Bus + ESP-NOW |
| **Multi-module sync** | No — each module is independent | Yes — Hub orchestrates scenes |
| **Firmware** | Same firmware, standalone mode flag | Same firmware, wall mode flag |
| **Price** | Same module price + $5-10 desk stand | Same module price (wall mount included) |

### The Key: Same Module, Different Frame

The electronics are identical. The only difference is the enclosure:
- **Wall module**: Flat back with magnets + pogo pins, slides onto steel wall
- **Desk module**: Same electronics, but housed in a **desk stand/cradle** — angled, weighted base, USB-C power from the back

### Desk Stand Designs

| Stand Type | Description | For Modules | BOM |
|-----------|-------------|-------------|-----|
| **Wedge** | 15° angled wedge, weighted rubber base | Rectangles (Screen-S, Hub, eInk) | $3 |
| **Puck** | Flat circular cradle with cable channel | Circles (Round, Mirror, Controller) | $3 |
| **Frame** | Vertical picture-frame stand with rear prop | Larger modules (Screen-M, Pixel, eInk) | $5 |
| **Clip** | Monitor mount clip (attaches to screen bezel) | Small squares (Sense, Cam-AI) | $4 |
| **Shelf** | Small shelf bracket for wall-adjacent placement | Any module + 3D objects | $5 |

All stands are 3D-printable. STL files published on GitHub. Or buy pre-printed from us.

---

## Use Cases — Desk Singles

### One Module on Your Desk

| Module | Standalone Use Case | Competitor It Replaces |
|--------|-------------------|----------------------|
| **Screen-S** ($79) | Smart clock + weather + calendar on desk | Tidbyt ($180), LaMetric ($200), Echo Show |
| **Glow** ($49) | Smart ambient desk light | Nanoleaf Elements ($100), Govee desk lamp |
| **Pixel** ($59) | Pixel art display + Spotify now-playing | Tidbyt ($180), Divoom Pixoo ($80) |
| **Round** ($69) | Circular desk clock + notification indicator | Amazon Echo Spot ($80) |
| **Mirror** ($129) | Vanity mirror with ring light + AR | HiMirror ($200+) |
| **eInk** ($59) | Always-on quote/art/schedule display | Boox desk display ($150+) |
| **Voice** ($39) | Desk speaker + mic for voice commands | Echo Dot ($50) |
| **Sense** ($29) | Desk air quality / temp / presence | Awair Element ($149) |

**Every Single undercuts its competitor by 30-60%.** And when the user is ready, the module pops out of its desk stand and snaps onto the wall.

### Two Modules on Your Desk
- **Screen-S + Glow**: Smart clock with ambient backlight
- **Pixel + Voice**: Music visualizer with speaker
- **Round + Sense**: Clock that knows when you're at your desk
- **Screen-S + Voice**: Mini smart display with voice assistant

### Computer Integration (WiFi Data Stream)
Any module can receive data from your computer via the local network:
- **Screen-S showing system stats**: CPU/GPU temp, RAM usage, network speed
- **Pixel showing Spotify**: Now-playing album art as pixel art
- **Glow showing notification color**: Green = all clear, amber = pending, red = urgent
- **Round showing Pomodoro timer**: Circular countdown synced to your work app

**How it works**: A lightweight Python/Node script runs on your computer, pushes data to the module via HTTP on your LAN:
```
curl http://mosaic-screen-s.local/api/content \
  -d '{"widget": "system-stats", "cpu": 42, "ram": 67}'
```
No Hub needed. Direct WiFi to module.

---

## Firmware: Standalone Mode

The same firmware runs on wall modules and desk modules. A config flag determines behavior:

```cpp
// config.h
#define MOSAIC_MODE_STANDALONE  0  // WiFi only, no CAN, no Hub
#define MOSAIC_MODE_WALL        1  // Full wall mode: WiFi + CAN + ESP-NOW

int mosaic_mode = MOSAIC_MODE_STANDALONE;  // Set during first boot
```

### First Boot Flow (Standalone)
1. Module powers on via USB-C
2. Creates AP: "mosAIc-Setup-XXXX"
3. User connects phone, enters WiFi credentials
4. Module joins WiFi, starts in standalone mode
5. Opens web UI at `http://mosaic-xxxxx.local`
6. User configures widgets/content from phone browser
7. Done — module works independently forever

### Upgrade to Wall
1. User buys Hub + steel plate
2. Pops module out of desk stand
3. Snaps onto wall (magnets + pogo pins)
4. Hub discovers module via CAN Bus
5. Module auto-switches from standalone to wall mode
6. Now coordinated with other modules via Hub
7. **Zero reconfiguration — WiFi creds and content preserved**

---

## Business Impact

### Lower Entry Barrier
- **Wall starter kit**: $185 (Hub + 5 modules) — commitment
- **Single desk module**: $49-79 — impulse buy
- **Conversion funnel**: Buy one Single → love it → buy more → eventually build the wall

### New Revenue Stream
- Desk stands: $5-10 each, 70%+ margin (3D-printed)
- Singles as gifts: Perfect stocking stuffer / birthday gift at $49-79
- Corporate desk accessories: Branded modules for offices

### Market Positioning
mosAIc Singles compete directly with:
- **Tidbyt** ($180) — Screen-S does the same for $79
- **Divoom Pixoo** ($80) — Pixel does more for $59
- **Echo Show 5** ($90) — Screen-S + Voice = $118, but open hardware
- **Nanoleaf Elements** ($100) — Glow does ambient for $49

### Pricing Tiers

| Product | Contents | Price |
|---------|----------|-------|
| **Single module** | Module + USB-C cable | $29-129 (module price) |
| **Single + Stand** | Module + desk stand + USB-C | $39-139 (+$10) |
| **Desk Duo** | 2 complementary modules + 2 stands | $89-169 |
| **Desk → Wall Upgrade Kit** | Hub + steel plate + pogo adapters | $79 |

---

## Education Angle

Singles are an even better education entry point than the wall:
- **Cost**: $49-79 vs $185 for wall starter
- **Space**: Sits on a desk, no wall mounting needed
- **Simplicity**: One module, one USB-C cable, one WiFi connection
- **The Guide**: Works on a single Screen-S — teaches from day one
- **Progression**: Start with one module → learn → add more → build the wall

### Lesson: "Build Your Own Desk Gadget"
**Learn**: How consumer electronics products work — from raw components to finished device
**Build**: Assemble a module, design a desk stand, configure via WiFi, display custom content
**Industry**: Consumer electronics, product design, IoT
**Skills**: ESP32, 3D printing, web APIs, UI design

---

## Sacred Circuits Crossover

- **Oracle Desk Module**: A Round module on a small altar/stand — tap an Oracle Card, deity speaks
- **Ambient Deity**: A Glow module that shifts color based on the current ruling deity in the Greek calendar
- **Mythology Clock**: A Screen-S showing time with rotating deity illustrations

---

*"You don't need a wall. You need one tile. The rest follows."*
