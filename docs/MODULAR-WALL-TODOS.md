# The Modular Wall — Master TODO List

**Created**: 2026-04-06
**Status**: Active — updated each session
**Source**: Synthesized from all 19 project documents

---

## PHASE 0: FOUNDATION (This Week)

### Decisions Needed (Niko)
- [ ] **Pick a product name** — "The Modular Wall" is placeholder. Short, memorable, implies building. Doesn't limit to "wall" if concept expands.
- [ ] **Brand positioning** — Sacred Circuits sub-brand, separate brand, or Greece-based creative studio entity?
- [ ] **Confirm launch hero use case** — Council recommends "ambient art + information display" with depth-camera-to-avatar viral demo
- [ ] **Confirm panel size standard** — Hardware-first sizing OK, but define min (80x80mm) and max (200x200mm)
- [ ] **First module to ship** — Council says LCD screen + LED pixel matrix only for launch
- [ ] **Visual style direction** — Review 4 Blender variants (Minimal, Rounded, Baroque, Wood). Council leans cyberpunk/transparent.
- [ ] **Pricing strategy** — Starter at $149 (early bird) / $199 (retail). Validate against BOM.
- [ ] **Software subscription boundary** — $5-10/month. Define free vs paid tier.
- [ ] **Education vs consumer positioning** — Primary buyer: maker who wants a wall, or learner who wants IoT?
- [ ] **Open source scope** — Hardware (STL/CAD/firmware) open. Where exactly is the line for module firmware?

### Orders (~$174)
- [ ] MakerBeamXL 15x15mm starter kit (40 beams + brackets) — $100 — [makerbeam.com](https://www.makerbeam.com/makerbeamxl/) or [Amazon](https://www.amazon.com/MakerBeam-XL-Anodized-Including-Brackets/dp/B06XJ2CMWM)
- [ ] 2x CYD ESP32-2432S028R — $26 — [Amazon](https://www.amazon.com/DIYmalls-ESP32-2432S028R-Resistive-Touchscreen-Development/dp/B0DNM4SKSJ)
- [ ] SK6812 RGBW LED strip 5m 60/m — $20 — [BTF-Lighting](https://www.btf-lighting.com/products/1-sk6812-rgbw-4-in-1-pixels-individual-addressable-led-strip-dc5v)
- [ ] Neodymium magnets 10x3mm 50pcs — $8 — Amazon
- [ ] Adafruit 4-pin magnetic pogo connectors (4 pairs) — $10 — [Adafruit](https://www.adafruit.com/product/5358)
- [ ] Gray Smoke Acrylic #2064 — $10 — [Canal Plastics](https://www.canalplastic.com/products/2064-gray-smoke-acrylic-sheet)

### Environment Setup
- [ ] Install Arduino IDE / PlatformIO for ESP32 development
- [ ] Run `npx paperclipai onboard` to set up Paperclip
- [ ] Create GitHub repo for wall-controller-agent
- [ ] Create GitHub repo for module firmware
- [ ] Set up JLCPCB account for PCB manufacturing

---

## PHASE 1: FIRST MODULE PROTOTYPE (Week 2-4)

### Build One CYD Screen Module End-to-End
- [ ] 3D print corner pieces — use [MakerWorld Corner Bracket Generator](https://makerworld.com/en/models/709750) (parametric, 15x15mm)
- [ ] Print material: **PETG or ABS only** (PLA will creep under load). 50-100% infill.
- [ ] Cut MakerBeamXL beams to size for one module frame
- [ ] Mount CYD board via standoffs to back panel
- [ ] Wire SK6812 strip inside enclosure for internal glow
- [ ] Cut smoke acrylic front panel
- [ ] Install magnetic pogo connectors on edges
- [ ] Flash basic firmware: WiFi connect + display clock/weather
- [ ] Document entire build with photos and video

### Success Criteria
- [ ] One working screen module that powers on, connects to WiFi, displays content, and has functional edge connectors

---

## PHASE 2: WALL CONTROLLER SOFTWARE (Week 3-6)

### Wall Controller Agent API (FastAPI)
- [ ] Design API spec:
  - `POST /modules/{id}/content` — push content to module
  - `GET /modules` — list discovered modules
  - `POST /scenes/{name}/activate` — switch presets
  - `GET /health` — system status
  - WebSocket endpoint for real-time updates
- [ ] Module discovery protocol (I2C EEPROM reads)
- [ ] Content routing engine (weather→screen, ambient→glow, music→LED matrix)
- [ ] Scene/preset system (Morning, Focus, Movie, Sleep)
- [ ] Basic web UI dashboard

### Communication Stack
- [ ] CAN Bus (TWAI) over backplane — needs SN65HVD230 transceiver ($1/module)
- [ ] ArtNet/sACN over WiFi for LED control (WLED firmware)
- [ ] I2C for module discovery

---

## PHASE 3: MULTI-MODULE WALL (Week 5-8)

### Build 5-10 Mixed Modules
- [ ] Screen-S x2 (CYD 2.8") — $15 each
- [ ] Glow x3 (SK6812 RGBW ambient) — $15 each
- [ ] Pixel x1 (64x32 HUB75 P2.5 + ESP32 Trinity) — $40
- [ ] Voice x1 (exciter + MAX98357A + INMP441) — $12
- [ ] Sense-Presence x1 (LD2410C mmWave) — $12
- [ ] Brick-Plain x2 (3D-printed filler) — $2 each

### Assembly & Testing
- [ ] Mount MakerBeamXL rails on wall (French cleat system)
- [ ] Connect modules via magnetic pogo edge connectors
- [ ] Wire Mean Well RSP-150-5 PSU (5V/30A) to copper bus bar
- [ ] PTC fuses at each tap point
- [ ] Test power delivery to all modules simultaneously
- [ ] Test CAN bus reliability across 10 nodes
- [ ] Test module hot-swap
- [ ] Thermal monitoring (watch for 60-70C pockets)

### Budget: ~$250-400 additional

---

## PHASE 4: VISUAL CAMPAIGN (Week 6-10)

### Blender
- [ ] Refine 4 existing style variants with Poly Haven textures
- [ ] Create composed wall scene (12+ modules in grid)
- [ ] Render key frames for Higgsfield input
- [ ] Create Wood + Brass style variant (new)

### Campaign Assets
- [ ] Finish remaining 2 Higgsfield images (prompts 5-6)
- [ ] Generate hero shots via Nano Banana (photon-1)
- [ ] Generate video clips via Luma Labs
- [ ] Create lookbook/mood board
- [ ] Short 60-second "build and power on" timelapse
- [ ] Website mockup / landing page wireframes

### Skill to Build
- [ ] Create "product-campaign-generator" skill:
  1. Reads template-prompts.md from project directory
  2. Opens Higgsfield via Playwright MCP
  3. Iterates through prompts — types, clicks Generate
  4. Downloads results to project folder

---

## PHASE 5: HANDHELD CONTROLLER (Week 8-12)

### Hardware
- [ ] Order 2.1" Round IPS + Rotary Encoder + ESP32-S3 (~$25) — [Amazon](https://www.amazon.com/Circular-Display-Magnetic-Encoder-ESP32-S3/dp/B0BYNWJQWH)
- [ ] Physical buttons: select, back, mode (~$3)
- [ ] Small LiPo 500-1000mAh (~$5)
- [ ] Optional: INMP441 mic (~$3)
- [ ] Design 3D-printed enclosure (R1-inspired: ~78x78x13mm)

### Firmware
- [ ] WiFi connection to Wall Controller API
- [ ] Rotary encoder scrolls through modules/scenes
- [ ] Display shows current module status / scene preview
- [ ] Button handlers: select/back/mode
- [ ] USB-C charging

---

## PHASE 6: CONFIGURATOR & WEBSITE (Week 10-16)

- [ ] AI onboarding conversation (interview + recommend config)
- [ ] Visual wall configurator (drag-and-drop modules, real-time pricing)
- [ ] Personalized instruction manual system (LEGO-style, per-config)
- [ ] Digital twin / account system
- [ ] Stripe integration for payments
- [ ] Landing page with $1 refundable deposit

---

## PHASE 7: GLOBE 2.0 (Parallel Track)

- [ ] Research spherical LED displays (flexible LED matrix on sphere)
- [ ] Prototype with existing POV globe firmware at `/Users/claw2501/firmware/pov-globe/`
- [ ] NASA/ESA data integration
- [ ] Design shelf bracket module with pogo pin connectivity
- [ ] Connect to recycled ocean plastic story (Bits to Pieces)

---

## PHASE 8: COMMUNITY & LAUNCH PREP (Week 14-20)

### 100-Unit Pilot Run
- [ ] Pre-assemble all electrical modules as sealed, tested units
- [ ] Target: <30 min assembly, <5% failure rate, >4.0 star rating
- [ ] Measure: assembly time, failure rate, NPS score

### Beta Tester Recruitment
- [ ] Home Assistant community (500K+)
- [ ] r/esp32 (100K+), r/homeassistant (700K+)
- [ ] Nation of Makers, Fab Foundation
- [ ] 10-20 tech/smart home YouTubers

### Education
- [ ] Lesson 1: Build your first module (mechanical + first power-on)
- [ ] Lesson 2: Connect to WiFi and display data (firmware)
- [ ] Lesson 3: Add a sensor and create automation (IoT)
- [ ] Align to CSTA K-12 CS Standards + NGSS Engineering Design

### Partnership Outreach (Priority Order)
1. [ ] Home Assistant — technical integration path
2. [ ] Adafruit / SparkFun / Pimoroni — distribution + community
3. [ ] Bambu Lab / Prusa — co-marketing
4. [ ] Precious Plastic — recycled filament for Bits to Pieces
5. [ ] Elecrow — CrowPanel volume pricing

### Launch
- [ ] Kickstarter with $50K minimum goal
- [ ] Target: $150-300K (1,000-2,000 backers)
- [ ] Discord server for early adopters
- [ ] Content creator seeding (ship prototypes to 10-20 YouTubers)

---

## ONGOING / THIS SESSION

- [ ] Create #the-wall Slack channel — post project kickoff
- [ ] Update Trello board — add missing cards from master plan
- [ ] Post to Smithers — full session context
- [ ] Create GitHub repos (wall-controller-agent, module-firmware)
- [ ] Finish Higgsfield images 5-6
- [ ] Refine Blender models with Poly Haven materials
- [ ] Research 3D print farm partners for volume
- [ ] Research recycled plastic filament suppliers
- [ ] Research Home Assistant integration path
- [ ] Research Giphy API terms for commercial use

---

## RESEARCH NEEDED

- [ ] 3D print farm partner — resin (figurines) + FDM (frames) at volume
- [ ] Recycled PETG/PLA filament — consistent quality ocean plastic
- [ ] Home Assistant add-on technical path
- [ ] Giphy API — terms, rate limits, commercial licensing
- [ ] Bambu Lab / Prusa co-marketing partnership
- [ ] Spherical LED display products at consumer prices
- [ ] Injection molding quotes for corner pieces at 1K+ volume
- [ ] JLCPCB backplane PCB design and pricing
- [ ] Kickstarter campaign strategy (stretch goals, video plan)
- [ ] Insurance / liability for wall-mounted electronics

---

## KEY METRICS TO TRACK

| Metric | Target | Current |
|--------|--------|---------|
| Documents in Obsidian | — | 19 (+1 this file) |
| Trello cards | 50+ | 25+ |
| Components cataloged | 80+ | 80 |
| Blender style variants | 5 | 4 |
| Campaign images generated | 16 | 5 |
| Working prototype modules | 1 | 0 |
| GitHub repos | 2 | 0 |
| Slack channel | Active | Creating now |
| Budget spent | <$175 Phase 0 | $0 |
| Product name | Decided | TBD |

---

*Updated: 2026-04-06 — Session 2*
