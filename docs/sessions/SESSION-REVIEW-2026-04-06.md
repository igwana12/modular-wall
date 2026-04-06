# Modular Wall — Session Review & Next Steps

**Date**: 2026-04-06
**Session Duration**: ~5 hours
**Research Agents Used**: 16+

---

## What We Built This Session

### The Product
A modular, snap-together wall computer — your desktop surrounding you. Each module is an app that escaped the phone and became physical again. Built from open hardware you assemble yourself.

**Core thesis**: "As software ate the world, AI is going to throw it back up."

Rooted in the **First Waver** philosophy from Niko's Odyssey memoir — the generation born 1975-1985 with one foot in analog and one in digital, uniquely positioned to bridge both worlds through physical computing.

### Documents Created (14 files in Obsidian)

| Document | What It Contains | Lines |
|----------|-----------------|-------|
| **ENHANCED-BRIEF.md** | Master document — thesis, 11+ value props, 45+ module types, architecture, customer journey, council synthesis | 600+ |
| **COMPETITIVE-RESEARCH.md** | 30+ competitors analyzed across 8 categories | 320 |
| **COUNCIL-REVIEW.md** | 5-expert analysis (hardware, market, STEM, interaction, manufacturing) | 121 |
| **GLOBE-2.0-TREATMENT.md** | Original treatment + patent + 2018 engineering thread + LED pivot | 158 |
| **PROJECT-ECOSYSTEM.md** | Organizational philosophy — each project stands alone | 93 |
| **CROSS-REFERENCES.md** | Links to Odyssey, TR-01, Sacred Circuits, all related work | 116 |
| **COMPONENT-RESEARCH-FRAME.md** | MakerBeamXL frame, handheld controller, depth cameras | 87 |
| **HARDWARE-VISUAL-CATALOG.md** | 80 components with specs + purchase links | 196 |
| **PARTNERSHIPS.md** | 8 partnership categories, communities, recycled plastic | 130 |
| **SESSION-REVIEW-2026-04-06.md** | This document | — |
| **VISION.md** | Original v1 vision (pre-existing) | 91 |
| **ARCHITECTURE.md** | Technical deep dive (pre-existing) | 314 |
| **BUSINESS-PLAN.md** | Revenue model (pre-existing) | 252 |
| **RESEARCH-HOLOGRAM-FANS.md** | Hologram fan research (pre-existing) | 71 |

### External Systems Set Up

| System | Status | URL |
|--------|--------|-----|
| **Trello Board** | Live, 14 cards, 10 labels, 7 lists | https://trello.com/b/gw9oUWSO/modular-wall |
| **Google Sheets** | 79 components, 13 columns (with dimensions) | "Modular Wall Components" tab in Entity Master |
| **Blender File** | 4 style variants (Minimal, Rounded, Baroque, Wood) | ~/Downloads/modular-wall-casing-4-styles.blend |
| **CSV Export** | All components with dimensions | ~/Downloads/modular-wall-hardware-components.csv |

---

## What The Product Is (Summary)

### 11 Value Propositions
1. **Ambient Light System** — circadian, mood, weather-responsive
2. **Audio System** — Spotify, spatial audio, distributed speakers
3. **Smart Home Dashboard** — Home Assistant, Matter, device control
4. **Health & Wellness Monitor** — Fitbit, Oura, Apple Health visualization
5. **Mixed Media Art Surface** — holograms, pixel art, e-ink, projections
6. **Education Platform** — learn IoT/AI by building the wall itself
7. **Information Display** — clock, calendar, weather, stocks, news
8. **Handheld Controller** — R1-style companion device
9. **Creative Capture Studio** — voice, motion, sketch capture → AI reflection
10. **External Hardware Integration** — Nest, Kinect, AR/VR headsets
11. **Service Widgets** — Uber, OpenTable, DoorDash as physical screens

### Module Categories (45+ types)
- **Displays**: 26 options (LCD, AMOLED, e-ink, LED matrix, round, transparent)
- **Holograms**: 6 options (POV fans, DLP projector, Looking Glass, LED cube)
- **Audio**: 9 options (exciters, drivers, subwoofer, DACs, mics)
- **Cameras**: 8 options (ESP32-CAM, Pi Camera, AI vision, thermal, depth)
- **Sensors**: 7 options (mmWave, PIR, gesture, environmental, light, distance)
- **Kinetic/Toys**: 11 options (marble tracks, electromagnets, automata, fidget blocks)
- **Physical Inputs**: 9 options (knobs, switches, buttons, sliders, arcade buttons)
- **Robotics**: 5 options (pan-tilt, servos, linear actuators)
- **Compute**: 5 options (Orange Pi, Pi 5, Jetson, XIAO, M5Stamp)
- **Controllers**: 5 options (M5Stack Dial, MaTouch, T-Deck, CardPuter, Core2)
- **Filler Bricks**: 5 options (plain, art, glow, photo, reclaimed plastic)
- **Frame/Power**: 8 options (MakerBeamXL, acrylic, LED strips, PSU, magnets)

### 4 Visual Styles
1. **Minimal** — dark matte, thin bezel, screen-first
2. **Rounded** — white matte, pill-shaped, Apple-inspired
3. **Baroque** — gold antique frame, ornamental corners
4. **Wood** — walnut finish, gentle curves, brass accents

### Key Design Decisions Made
- Panel sizes determined by hardware dimensions (not standardized grid)
- 3D-printed corners + aluminum I-beam rods + acrylic panels
- MakerBeamXL (15x15mm) as the primary extrusion
- Display recessed, solid back, USB-C access
- Modules snap onto wall-mounted rail via magnets + pogo pins
- Each project stands alone; integration only when natural

---

## How It's Organized

```
PROJECTS/modular-wall/
├── ENHANCED-BRIEF.md          ← START HERE (master document)
├── COMPETITIVE-RESEARCH.md    ← Market landscape
├── COUNCIL-REVIEW.md          ← Expert feedback
├── GLOBE-2.0-TREATMENT.md     ← Globe sub-project
├── PROJECT-ECOSYSTEM.md       ← How projects relate
├── CROSS-REFERENCES.md        ← Links to Odyssey, Sacred Circuits
├── COMPONENT-RESEARCH-FRAME.md ← Frame + controller research
├── HARDWARE-VISUAL-CATALOG.md  ← Component shopping list
├── PARTNERSHIPS.md             ← Communities + partners
├── SESSION-REVIEW-2026-04-06.md ← This document
├── VISION.md                   ← Original v1
├── ARCHITECTURE.md             ← Technical deep dive
├── BUSINESS-PLAN.md            ← Revenue model
└── RESEARCH-HOLOGRAM-FANS.md   ← Hologram research
```

**External**:
- Trello: Task tracking + sprint planning
- Google Sheets: Component catalog with specs/prices/dimensions
- Blender: Visual prototyping

---

## Next Steps — Prioritized

### Phase 0: POWER & CONNECTIVITY (CRITICAL — Unresolved)
**Status**: Research in progress
**Question**: How do modules connect to each other for power + data?
**Options being researched**:
- USB-C daisy-chain between modules (short colored cables)
- Pogo pin bus bar on the wall rail
- Edge connectors between adjacent modules
- Hybrid: wall rail provides power, USB-C for data

**This must be resolved before physical prototyping begins.**

### Phase 1: FIRST PROTOTYPE (Niko's Side)
1. Order MakerBeamXL starter kit (~$100)
2. Order 2x CYD ESP32-2432S028R (~$26)
3. Order SK6812 RGBW strip, smoke acrylic, magnets (~$30)
4. 3D print first corner piece (use parametric generator from MakerWorld)
5. Assemble one working screen module by hand
6. **Timeline**: Can start immediately, ~2 weeks to first working module

### Phase 2: WALL CONTROLLER SOFTWARE (Claude's Side)
1. Design the Wall Controller Agent API (Python/FastAPI on Orange Pi)
2. Module discovery protocol (I2C EEPROM)
3. Content routing engine (which content → which panel)
4. Scene/preset system (morning, focus, movie, sleep)
5. **Timeline**: Can start in parallel with Phase 1

### Phase 3: VISUAL CAMPAIGN (Collaborative)
1. Refine Blender models with proper materials (Poly Haven textures)
2. Create a composed wall scene (multiple modules in grid)
3. Generate campaign images via Nano Banana / AI image generation
4. Create a mood board / lookbook for the product
5. **Depends on**: Phase 1 having real photos to reference

### Phase 4: HANDHELD CONTROLLER PROTOTYPE
1. Order MaTouch 2.1" Rotary (~$45) or M5Stack Dial (~$30)
2. Design 3D-printed enclosure
3. Write ESP32 firmware — WiFi → Wall Controller API
4. **Depends on**: Phase 2 API being defined

### Phase 5: WEBSITE / CONFIGURATOR
1. Design the AI-guided onboarding conversation
2. Build the visual wall configurator (drag-and-drop modules)
3. Personalized instruction manual system
4. Digital twin / account system
5. **Depends on**: Module catalog being finalized

### Phase 6: GLOBE 2.0 (Parallel Track)
1. Research spherical LED displays
2. Prototype with existing POV globe firmware
3. NASA/ESA data integration
4. **Can run independently of main wall project**

---

## What Niko Needs To Do

1. **Decide on a name** — this product needs a name before anything public
2. **Order first components** (~$150) — MakerBeamXL, CYDs, LEDs, acrylic
3. **Try the parametric corner generator** on MakerWorld with your 3D printer
4. **Review the Google Sheets hardware catalog** — approve/reject components by clicking through purchase links
5. **Think about power connectivity** — USB-C cables vs bus bar vs pogo pins
6. **Consider brand positioning** — Sacred Circuits sub-brand, separate brand, or creative studio?
7. **Review the Blender file** — give feedback on which style direction feels right

## What Claude Needs To Do

1. **Complete power research** — resolve the inter-module connectivity question
2. **Refine Blender models** — better materials, proper scale, composed wall scene
3. **Generate campaign visuals** — use Nano Banana once Blender scenes are solid
4. **Write Wall Controller Agent spec** — API design, module protocol
5. **Attach key documents to Trello cards** — cloud-accessible while traveling
6. **Update Google Sheets** with any new components or dimensions
7. **Research 3D print farm partners** — who can print at volume with quality

## How We Coordinate

- **Trello** is the task board — cards move through Backlog → Research → Design → Prototyping → Done
- **Google Sheets** is the component catalog — living document, add/remove as we learn
- **Obsidian** is the knowledge base — all ideas, research, philosophy, cross-references
- **Blender** is the visual lab — iterate on designs, render campaign material
- **Claude sessions** — each session picks up from the ENHANCED-BRIEF.md and this review document

---

## Open Design Questions

1. **Power/Connectivity** — how modules connect (in research now)
2. **Product name** — TBD
3. **Panel size standard** — hardware-first sizing confirmed, but what's the minimum/maximum?
4. **Wood + brass style** — needs Blender model
5. **Shelf module** — how do 3D objects (globe, hologram fan) attach?
6. **First module to ship** — which module type is the "hero" for launch?
7. **Pricing strategy** — starter kit price point, expansion pricing
8. **Material sourcing** — recycled plastic filament supplier
