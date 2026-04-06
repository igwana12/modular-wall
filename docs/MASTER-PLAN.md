# The Modular Wall — Master Plan

**Date**: 2026-04-05
**Version**: 1.0
**Status**: Actionable Roadmap
**Source**: Synthesized from ENHANCED-BRIEF, COUNCIL-REVIEW, SESSION-REVIEW, POWER-CONNECTIVITY, BUSINESS-PLAN, PROJECT-ECOSYSTEM, PARTNERSHIPS, COMPONENT-RESEARCH, and HARDWARE-VISUAL-CATALOG.

---

## 1. Executive Summary

A modular, snap-together wall computer built from open hardware — each module is an app that escaped the phone and became physical again. Rooted in the "First Waver" thesis that AI dissolves the programming barrier that locked hardware to specialists, making it possible for anyone to build a living, intelligent wall surface from mixed screens, holograms, speakers, sensors, and lights. The council of five experts converges on three mandates: narrow to one hero use case before widening, pre-assemble all electrical modules so users only do mechanical assembly, and build one magical demo (depth camera silhouette to AI-stylized avatar on LED matrix) that carries the launch. The business model targets $150-300K via Kickstarter with 60-65% blended gross margins, scaling to $1.5-2.9M by Year 3 through hardware sales, expansion modules, software subscriptions, and a content marketplace.

---

## 2. Product Definition

**What it is**: A modular, AI-orchestrated mixed-media wall computer you build yourself from snap-together open-hardware modules.

**Core thesis**: As software ate the world and compressed physical objects behind glass, AI is throwing them back up — dissolving the programming barrier so anyone can give digital intelligence a physical body. The wall is where the analog human meets the digital AI mind.

**Target audience**: Tech-forward adults 25-40 who own smart home devices and maker tools (2-4M addressable in the US). Beachhead: AI/tech enthusiasts, home office upgraders, content creators, ESP32/Home Assistant community, Sacred Circuits audience. Estimated 50-100K early adopters.

**11 Value Propositions**:
- **Ambient Light System** — circadian, mood, and weather-responsive LED panels that shift throughout the day
- **Audio System** — distributed speakers, surface exciters, spatial audio from multiple wall positions
- **Smart Home Dashboard** — Home Assistant, Matter, Thread integration; the wall IS your smart home interface
- **Health & Wellness Monitor** — Apple Health, Fitbit, Oura, Withings data visualized beautifully across panels
- **Mixed Media Art Surface** — holograms, pixel art, e-ink, edge-lit sacred geometry, video, projections
- **Education Platform** — the wall teaches you IoT/AI as you build it; each module = a lesson
- **Information Display** — clock, calendar, weather, stocks, news across multiple screen types
- **Handheld Controller** — R1-style companion device with round display and rotary encoder
- **Creative Capture Studio** — voice, motion, video, sketch capture fed through AI and reflected back
- **External Hardware Integration** — Nest, cameras, medical IoT, 3D printers, weather stations
- **Service Widgets** — Uber, OpenTable, DoorDash, Spotify as physical voice-activated screen panels

> **Council mandate**: Lead with ONE for launch messaging (ambient art + information display: "A wall that thinks"). The other 10 are expansion territory.

---

## 3. Phased Roadmap

### Phase 0: Foundation (Week 1-2)

**Power & Connectivity** — RESOLVED
- Magnetic pogo pin edge connectors (Nanoleaf-style) for module-to-module
- Hidden copper bus bar backbone behind wall mounting plate for power
- Short colored USB-C cables for non-adjacent modules
- 4-pin per connection: +5V, GND, CAN_H/SDA, CAN_L/SCL
- Safety per module: PTC fuse ($0.10) + reverse polarity protection ($0.20) + TVS diode ($0.10) = $0.40/module
- Recommended connectors: Adafruit DIY 4-pin magnetic ($2.50/pair) or HytePro M402 ($2/pair)

**Order First Components** (~$150 budget):

| Item | Source | Est. Cost |
|------|--------|-----------|
| MakerBeamXL 15x15mm starter kit (40 beams + brackets) | makerbeam.com | $100 |
| 2x CYD ESP32-2432S028R (Cheap Yellow Display) | Amazon | $26 |
| SK6812 RGBW LED strip (5m, 60 LED/m) | Amazon/BTF-Lighting | $20 |
| Neodymium magnets 10x3mm (50pcs) | Amazon | $8 |
| Adafruit 4-pin magnetic pogo connectors (4 pairs) | Adafruit | $10 |
| Gray Smoke Acrylic #2064 (1 sheet) | Canal Plastics | $10 |
| **Total** | | **~$174** |

**Set Up Development Environment**:
- Arduino IDE / PlatformIO for ESP32 firmware
- Blender for enclosure visualization (file exists: `~/Downloads/modular-wall-casing-4-styles.blend`)
- Trello board: https://trello.com/b/gw9oUWSO/modular-wall (live, 14 cards)
- Google Sheets component catalog (79 components, 13 columns)

**Choose Product Name**: Decision needed from Niko. Placeholder: "The Modular Wall."

---

### Phase 1: First Module Prototype (Week 2-4)

**Build one CYD screen module end-to-end**:
1. 3D print corner pieces using [MakerWorld Corner Bracket Generator](https://makerworld.com/en/models/709750) — parametric, customizable for 15x15mm extrusion
2. Print material: PETG or ABS (NOT PLA — will creep under load). 50-100% infill for structural corners
3. Cut MakerBeamXL beams to size for one module frame
4. Mount CYD board via standoffs to back panel
5. Wire SK6812 strip inside enclosure for internal glow
6. Cut smoke acrylic front panel
7. Install magnetic pogo connectors on edges
8. Flash basic firmware: WiFi connect + display clock/weather
9. Document entire build process with photos and video (education content for later)

**Success criteria**: One working screen module that powers on, connects to WiFi, displays content, and has functional edge connectors.

**Council note**: Print material = PETG/ABS only. For sold kits later, injection-molded corners (~$0.80-1.50/corner vs $0.30 filament).

---

### Phase 2: Wall Controller Software (Week 3-6)

**Wall Controller Agent** — a lightweight display compositor, NOT a conversational AI:

1. **API design** (FastAPI on Orange Pi 5+ or Raspberry Pi):
   - `POST /modules/{id}/content` — push content to a specific module
   - `GET /modules` — list discovered modules with type/position
   - `POST /scenes/{name}/activate` — switch presets
   - `GET /health` — system status
   - WebSocket endpoint for real-time updates

2. **Module discovery protocol**:
   - I2C EEPROM on each module stores type ID
   - When module snaps into rail, central compute reads EEPROM
   - Auto-configures content routing based on module type
   - Hot-swappable — rearrange wall anytime

3. **Content routing engine**:
   - Weather data -> screen module
   - Ambient color -> glow module
   - Music visualizer -> LED matrix
   - Health data -> dedicated panel
   - Rules-based + AI-suggested routing

4. **Scene/preset system**:
   - Morning: warm light, calendar, weather, sleep summary
   - Focus: dim ambient, clock only, DND
   - Movie: all lights dim, bias lighting active
   - Sleep: red-shifted glow, no screens

5. **Basic web UI**: Simple dashboard to monitor modules and switch scenes

**Communication stack**:
- CAN Bus (TWAI) over backplane for module commands (built into ESP32, just needs SN65HVD230 transceiver at $1)
- ArtNet/sACN over WiFi for LED control (WLED firmware)
- I2C for module discovery

---

### Phase 3: Multi-Module Wall (Week 5-8)

**Build 5-10 modules (mixed types)**:

| Module | Type | BOM | Priority |
|--------|------|-----|----------|
| Screen-S x2 | CYD 2.8" LCD | $15 each | Must Build |
| Glow x3 | SK6812 RGBW ambient | $15 each | Must Build |
| Pixel x1 | 64x32 HUB75 P2.5 + ESP32 Trinity | $40 | Must Build |
| Voice x1 | Exciter + MAX98357A + INMP441 | $12 | Build Second |
| Sense-Presence x1 | LD2410C mmWave | $12 | Build Second |
| Brick-Plain x2 | 3D-printed filler | $2 each | Must Build |

**Assembly**:
- Mount MakerBeamXL rails on wall (French cleat system from same extrusion stock)
- Connect modules via magnetic pogo edge connectors
- Wire Mean Well RSP-150-5 PSU (5V/30A) to copper bus bar backbone
- PTC fuses at each tap point for safety

**Testing**:
- Power delivery to all modules simultaneously
- Data bus reliability (CAN bus across 10 nodes)
- Module hot-swap (remove/add while system running)
- Thermal monitoring (council warns: dense grid = 60-70C thermal pockets)
- Vibration isolation test (foam gaskets at mount points, ~$0.05/gasket)

**Success criteria**: 5+ modules working as a coordinated wall, controlled by Wall Controller Agent, switching between scenes.

**Additional components budget**: ~$250-400

---

### Phase 4: Visual Campaign (Week 6-10)

1. **Refine Blender models** — 4 existing style variants (Minimal, Rounded, Baroque, Wood). Apply Poly Haven textures, proper scale, composed wall scenes
2. **Product photography** — shoot real prototype wall with proper lighting
3. **Generate campaign images** — use Nano Banana (photon-1) for hero shots, Luma Labs for video
4. **Create lookbook/mood board** — cyberpunk art installation aesthetic, not consumer electronics
5. **Website mockup / landing page** — AI-guided onboarding conversation flow + visual wall configurator wireframes
6. **Short demo video** — 60-second "build and power on" timelapse

**Key aesthetic**: Smoke-tinted acrylic, internal LED glow, electronics visible as decoration. Stealth glow (black diffusion acrylic — invisible when off, glows when on).

---

### Phase 5: Handheld Controller (Week 8-12)

**Recommended build** (from COMPONENT-RESEARCH):
- 2.1" Round IPS Display with magnetic rotary encoder + ESP32-S3 (~$25) — [Amazon](https://www.amazon.com/Circular-Display-Magnetic-Encoder-ESP32-S3/dp/B0BYNWJQWH)
- Physical buttons: select, back, mode (~$3)
- Small LiPo battery 500-1000mAh (~$5)
- Optional: INMP441 mic for voice commands (~$3)
- 3D-printed enclosure (R1-inspired form factor: ~78x78x13mm)
- **Estimated BOM: $40-50**

**Firmware**:
- WiFi connection to Wall Controller Agent API
- Rotary encoder scrolls through modules/scenes
- Display shows current module status / scene preview
- Buttons for select/back/mode
- Charges via USB-C

**The key insight**: Rotary encoder + round display = satisfying physical dial like R1's scroll wheel but with visual feedback.

---

### Phase 6: Configurator & Website (Week 10-16)

1. **AI onboarding conversation**:
   - Interview: age, experience, budget, interests
   - Recommend configuration based on profile
   - "Based on your interests, here's a starter wall — a stereo module with a small screen that plays GIFs matched to your music, plus two ambient glow blocks. Want to see it?"

2. **Visual wall configurator**:
   - Drag-and-drop modules onto virtual wall grid
   - Real-time price updates
   - AI suggests complementary modules
   - Free filler bricks included to complete design
   - Calculate required cable lengths for non-adjacent modules

3. **Personalized instruction manual system**:
   - Custom to exact purchased configuration
   - LEGO-style step-by-step, click-through tasks
   - QR codes on modules link to specific lessons
   - Progress tracking on profile
   - Video guides for tricky steps

4. **Digital twin / account system**:
   - Live virtual version of physical wall
   - Phone app mirrors wall for remote control
   - Add new module -> twin updates automatically
   - Share wall designs with community

---

### Phase 7: Globe 2.0 (Parallel Track)

**Independent project** (per PROJECT-ECOSYSTEM philosophy — each project stands alone):
- Spherical LED display showing satellite/climate data
- Could sit on a shelf module as part of the wall, but doesn't have to
- Research: spherical LED displays, POV globe firmware
- NASA/ESA data integration for live Earth visualization
- Patent history exists from 2018 engineering thread
- **Connection to wall**: Shelf bracket module with pogo pin connectivity could hold Globe 2.0

---

### Phase 8: Community & Launch Prep (Week 14-20)

**100-unit pilot run** (council mandate — before any Kickstarter):
- Pre-assemble all electrical modules as sealed, tested units
- Users do mechanical assembly only (snap frame + slide panels)
- Measure: assembly time, failure rate, NPS score
- Target: <30 min assembly, <5% failure rate, >4.0 star rating

**Beta tester recruitment**:
- Home Assistant community (500K+ users)
- r/esp32 (100K+ members), r/homeassistant (700K+ members)
- Nation of Makers (US makerspace network)
- Fab Foundation (global fab lab network)
- 10-20 tech/smart home YouTubers for seeding

**3 structured lesson plans** (ship with starter kit):
- Lesson 1: Build your first module (mechanical assembly + first power-on)
- Lesson 2: Connect to WiFi and display data (firmware basics)
- Lesson 3: Add a sensor and create an automation (IoT fundamentals)
- Aligned to CSTA K-12 CS Standards + NGSS Engineering Design
- Use-Modify-Create pedagogical framework

**Partnership outreach priority**:
1. Home Assistant — technical integration path to become an HA add-on
2. Adafruit/SparkFun/Pimoroni — distribution + community reach
3. Bambu Lab/Prusa — co-marketing (their users = our audience)
4. Precious Plastic — recycled filament for "Bits to Pieces" line
5. Elecrow — CrowPanel volume pricing + co-marketing

**Launch decision**: Kickstarter vs direct sales vs hybrid. Council recommends Kickstarter with $50K minimum goal. Business plan targets $150-300K (1,000-2,000 backers).

---

## 4. Budget Breakdown

### Immediate: ~$175

| Item | Cost |
|------|------|
| MakerBeamXL starter kit (40 beams + brackets + hardware) | $100 |
| 2x CYD ESP32-2432S028R | $26 |
| SK6812 RGBW LED strip 5m | $20 |
| Neodymium magnets 10x3mm (50pcs) | $8 |
| Adafruit 4-pin magnetic pogo connectors (4 pairs) | $10 |
| Gray Smoke Acrylic sheet | $10 |
| **Total** | **~$174** |

### Phase 1-3: $500-800

| Item | Cost |
|------|------|
| Orange Pi 5+ 16GB (Brain-AI) | $109 |
| Mean Well RSP-150-5 PSU (5V/30A) | $40 |
| 64x32 HUB75 P2.5 panel + ESP32 Trinity | $50 |
| 3x additional CYD or Elecrow CrowPanel screens | $40-65 |
| Dayton DAEX13CT-4 exciters + MAX98357A amps | $15 |
| LD2410C mmWave presence sensor | $5 |
| PETG filament (2kg for enclosures) | $50 |
| Additional acrylic sheets (smoke + diffusion) | $30 |
| Backplane PCB + pogo pins | $30 |
| Wiring, connectors, SN65HVD230 transceivers, misc | $50 |
| MaTouch 2.1" round + encoder (handheld controller) | $25 |
| LiPo battery + buttons for controller | $10 |
| **Total** | **~$465-515** |

### Full Development Through Launch-Ready: $2,000-3,000

| Category | Cost |
|----------|------|
| Phase 0-3 components (above) | $640-690 |
| Depth camera (Luxonis OAK-D Pro for magical demo) | $200-300 |
| 100-unit pilot run components | $800-1,200 |
| PCB manufacturing (5 revisions via JLCPCB) | $200 |
| Video production for campaign | $200 |
| Landing page + Stripe setup | $200 |
| Content creator seeding (shipping) | $150 |
| Contingency | $250 |
| **Total** | **~$2,640-3,190** |

---

## 5. Module Priority Matrix

### Must Build First (Phase 1-3) — High Visual Impact, Low Complexity

| Module | Visual Impact | Complexity | Cost | Education Value | Why First |
|--------|-------------|-----------|------|----------------|-----------|
| **Screen-S** (CYD 2.8") | High | Low | $15 | High | All-in-one ESP32+touch+WiFi, cheapest smart module |
| **Glow** (SK6812 RGBW) | High | Low | $15 | Medium | Instant "wow" — ambient light sells the concept |
| **Brick-Plain** (3D-printed filler) | Medium | Minimal | $2 | Low | Completes the grid, makes wall look full |
| **Pixel** (HUB75 64x32 + Trinity) | Very High | Medium | $40 | High | Tidbyt-style pixel art, most demo-able module |

### Build Second (Phase 3-5) — Add Interactivity

| Module | Visual Impact | Complexity | Cost | Education Value |
|--------|-------------|-----------|------|----------------|
| **Voice** (exciter + amp + mic) | Medium | Medium | $12 | High |
| **Sense-Presence** (mmWave) | Low (invisible) | Low | $12 | High |
| **Glow-Edge** (laser-engraved acrylic) | Very High | Medium | $25 | Medium |
| **Handheld Controller** | High | High | $45 | Very High |

### Build Later (Phase 5-8) — Expand Capabilities

| Module | Visual Impact | Complexity | Cost | Education Value |
|--------|-------------|-----------|------|----------------|
| **Screen-L** (CrowPanel 5") | High | Low | $35 | Medium |
| **eInk** (7.5" e-Paper) | High | Medium | $55 | Medium |
| **Round** (1.43" AMOLED) | Very High | Medium | $30 | Medium |
| **Speaker-S** (full-range driver) | Medium | Medium | $20 | High |
| **Cam-AI** (Grove Vision AI) | Medium | High | $22 | Very High |

### Future (Post-Launch) — Premium & Experimental

| Module | Visual Impact | Complexity | Cost | Education Value |
|--------|-------------|-----------|------|----------------|
| **Holo-Fan** (POV fan) | Extreme | High | $100-150 | Medium |
| **Cam-Depth** (OAK-D Pro) | High | Very High | $200-300 | Very High |
| **Holo-Looking** (Looking Glass) | Extreme | High | $150-300 | Medium |
| **Sub** (Tang Band subwoofer) | Medium | Medium | $80 | Medium |
| **Marble-Track** (kinetic chain) | Very High | Medium | $5-10 | Very High |
| **Globe 2.0** (spherical LED) | Extreme | Very High | TBD | High |

---

## 6. Tools & Systems

| Tool | Purpose | Status |
|------|---------|--------|
| **Trello** | Task tracking + sprint planning | Live — https://trello.com/b/gw9oUWSO/modular-wall |
| **Google Sheets** | Component catalog (79 items, 13 cols, with dimensions) | Live — "Modular Wall Components" tab in Entity Master |
| **Obsidian** | Knowledge base — all ideas, research, philosophy, cross-references | Live — 14 files in PROJECTS/modular-wall/ |
| **Blender** | Visual prototyping — 4 style variants modeled | File: ~/Downloads/modular-wall-casing-4-styles.blend |
| **Slack** | Communications | Existing infrastructure |
| **GitHub** | Code repository (Wall Controller Agent, firmware) | Not yet created |
| **Arduino IDE / PlatformIO** | ESP32 firmware development | To set up |
| **JLCPCB** | PCB manufacturing (backplane, module boards) | Account needed |
| **Nano Banana** | Campaign image generation (photon-1) | Existing tool |
| **Luma Labs** | Video generation for campaign | Existing tool |

---

## 7. Key Decisions Needed

1. **Product name** — "The Modular Wall" is a placeholder. This needs a real name before anything public-facing. Consider: short, memorable, implies building/assembly, doesn't limit to "wall" if the concept expands.

2. **Brand positioning** — Sacred Circuits sub-brand, separate brand, or creative studio entity (possibly Greece-based)? Each has different implications for audience overlap, IP, and fundraising.

3. **Launch hero use case** — Council recommends "ambient art + information display" as the lead, with the depth-camera-to-avatar demo as the viral moment. Agree or pivot?

4. **Panel size standard** — Hardware-first sizing confirmed (no fixed grid), but what's the minimum and maximum module size? Likely 80x80mm (smallest screen) to 200x200mm (large display). Needs formal decision.

5. **First module to ship** — Which module type is the "hero" in the starter kit? Council says: LCD screen + LED pixel matrix. Two types only for launch.

6. **Visual style direction** — Four Blender variants exist (Minimal, Rounded, Baroque, Wood). Which direction for V1? Council leans cyberpunk/transparent. Review Blender file and decide.

7. **Pricing strategy** — Business plan proposes Starter at $149 (early bird) / $199 (retail). Validate against actual BOM + assembly costs from pilot run.

8. **Software subscription model** — $5-10/month for premium content/scenes/AI features. Free tier vs paid tier boundary needs definition.

9. **Education vs consumer positioning** — Is the primary buyer a maker who wants a wall, or a learner who wants to understand IoT? This drives packaging, documentation, and pricing.

10. **Kickstarter timing** — Business plan says Q4 2026 / Q1 2027. Realistic given current phase? Pilot run of 100 units must happen first.

11. **Open source scope** — Hardware (STL/CAD/firmware) is open. Software (AI orchestration, configurator, content marketplace) is proprietary. Where exactly is the line for module firmware?

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| 1 | **User assembly failure** — 5% connection failure rate x 20 connections = 64% probability of at least one fault per build | HIGH | HIGH | Pre-assemble all electrical modules as sealed units. Users do mechanical assembly only. 100-unit pilot measures actual failure rates before scale. |
| 2 | **Scope creep** — 45+ module types, 11 value props, too broad to execute | HIGH | HIGH | Council mandate: launch with 2 display types (LCD + LED matrix), 1 hero use case (ambient display), 1 target customer (tech-forward 25-40). Expand after 1,000 units validated. |
| 3 | **Thermal management** — dense grid of ESP32 panels + enclosed acrylic creates 60-70C thermal pockets | MEDIUM | HIGH | Ventilation slots in 3D-printed enclosures. Thermal testing in Phase 3. Limit continuous high-power modules adjacent to each other. Consider active cooling for Brain module. |
| 4 | **3D print quality variance** — Bambu X1C user gets perfect corners, Ender 3 user gets garbage. Support burden falls on worst printers. | MEDIUM | MEDIUM | Offer pre-printed corners in starter kit ($30-50 premium). Keep STLs open-source for customizers. Specify minimum print requirements (PETG/ABS, 50%+ infill). Long-term: injection-molded corners. |
| 5 | **ESP32-S3 supply chain** — single-sourced from Espressif/TSMC 40nm, lead times stretched to 20-40 weeks in past shortages | LOW | HIGH | Maintain 90-day buffer inventory at scale. Dual-source: XIAO ESP32S3 as alternative. Order 4-6 months before ship date. At 1,000 kits, buffer costs ~$20K. |

**Additional risks to monitor**:
- Kickstarter fatigue for modular hardware (Phonebloks, Project Ara, Blocks Smartwatch all died)
- Nanoleaf launching a similar mixed-media product (mitigated by AI orchestration moat + module diversity)
- WiFi reliability with 10+ ESP32 modules in close proximity (mitigated by CAN bus wired backbone)
- Weight on wall mount: 12-16 modules = 5-8kg, 3D-printed corners may creep/deform over 6-18 months under sustained load + thermal cycling

---

## Related Documents

- [ENHANCED-BRIEF.md](ENHANCED-BRIEF.md) — Master document (thesis, value props, module catalog, architecture)
- [COUNCIL-REVIEW.md](COUNCIL-REVIEW.md) — 5-expert analysis and recommendations
- [SESSION-REVIEW-2026-04-06.md](SESSION-REVIEW-2026-04-06.md) — Session review and next steps
- [POWER-CONNECTIVITY.md](POWER-CONNECTIVITY.md) — Power solution (magnetic pogo pins)
- [BUSINESS-PLAN.md](BUSINESS-PLAN.md) — Revenue model and go-to-market
- [PROJECT-ECOSYSTEM.md](PROJECT-ECOSYSTEM.md) — Organizational philosophy
- [PARTNERSHIPS.md](PARTNERSHIPS.md) — Communities and partnership targets
- [COMPETITIVE-RESEARCH.md](COMPETITIVE-RESEARCH.md) — 30+ competitors analyzed
- [HARDWARE-VISUAL-CATALOG.md](HARDWARE-VISUAL-CATALOG.md) — 80 components with specs and links
- [COMPONENT-RESEARCH-FRAME.md](COMPONENT-RESEARCH-FRAME.md) — Frame system, controller, depth cameras
- [ARCHITECTURE.md](ARCHITECTURE.md) — Technical deep dive
Let's go through this entire conversation and review it, every single piece and all of the attached documents, and start putting together