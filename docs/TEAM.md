# Modular Wall — Team Structure

**Project**: The Modular Wall
**Company**: Sacred Circuits
**GitHub**: https://github.com/igwana12/modular-wall
**Workspace**: `/Volumes/AI_WORKSPACE/modular-wall`
**Status**: Phase 0 — Foundation
**Created**: 2026-04-06

---

## Team Roster

### Leadership

**Niko** (CEO)
- **Role**: Strategic vision, milestone tracking, founder decisions
- **Agent ID**: `b68e34a1-3fb4-4637-a2cd-6fc006721696`
- **Responsibilities**:
  - Product naming and positioning
  - Visual style direction (review 4 Blender variants)
  - Pricing strategy validation
  - Education vs consumer positioning
  - Partnership approvals
  - Kickstarter timing confirmation
- **Reports to**: Board (Niko Katsaounis, human founder)

**Hermes** (PM)
- **Role**: Sprint planning, coordination, unblocking
- **Responsibilities**:
  - Weekly sprint planning
  - Cross-team coordination
  - Blocker escalation
  - Progress tracking and reporting
  - Trello board maintenance
- **Reports to**: Niko (CEO)

---

## Engineering Team

**Daedalus** (CTO / Hardware Lead)
- **Role**: PCB design, power electronics, architecture
- **Responsibilities**:
  - Magnetic pogo pin connector design
  - Power distribution architecture (5V/30A)
  - Backplane PCB design and JLCPCB ordering
  - Safety circuitry (PTC fuses, TVS diodes, reverse polarity protection)
  - I2C EEPROM module discovery protocol
  - Thermal management strategy
  - Component selection and BOM optimization
- **Reports to**: Niko (CEO)
- **Key Deliverables**:
  - Phase 0: Power & connectivity architecture (DONE)
  - Phase 1: First module electrical design
  - Phase 3: Multi-module power distribution
  - Phase 8: 100-unit pilot BOM and assembly guide

**Hephaestus** (Firmware Engineer)
- **Role**: ESP32-S3 module firmware, CAN Bus, ArtNet
- **Responsibilities**:
  - ESP32-S3 firmware development (Arduino/PlatformIO)
  - CAN Bus (TWAI) communication stack
  - ArtNet/sACN WiFi integration (WLED firmware)
  - I2C EEPROM module type identification
  - OTA update system
  - Module hot-swap handling
  - Per-module firmware variants (Screen, Glow, Pixel, Voice, Sense)
- **Reports to**: Daedalus (CTO)
- **Key Deliverables**:
  - Phase 1: CYD screen module firmware (clock/weather)
  - Phase 2: CAN Bus communication layer
  - Phase 3: 5-10 module firmware variants
  - Phase 5: Handheld controller firmware

**Prometheus** (Software Engineer)
- **Role**: Wall Controller Agent (FastAPI), web configurator
- **Responsibilities**:
  - Wall Controller Agent API (FastAPI on Orange Pi 5+)
  - Module discovery and routing engine
  - Scene/preset system (Morning, Focus, Movie, Sleep)
  - Content routing logic (weather→screen, ambient→glow, music→LED)
  - Web dashboard UI
  - AI onboarding conversation flow
  - Visual wall configurator (drag-and-drop, real-time pricing)
  - Digital twin / account system
  - Stripe payment integration
- **Reports to**: Daedalus (CTO)
- **Key Deliverables**:
  - Phase 2: Wall Controller API + basic web UI
  - Phase 6: AI configurator + website + Stripe integration
  - Phase 8: Account system and digital twin

---

## Design Team

**Athena** (Industrial Designer)
- **Role**: Enclosure design, 3D modeling, material selection
- **Responsibilities**:
  - 3D-printed corner bracket design (PETG/ABS, 50-100% infill)
  - MakerBeamXL frame assembly design
  - Smoke acrylic front panel cutting specs
  - Enclosure ventilation for thermal management
  - French cleat wall mounting system
  - Handheld controller enclosure (R1-inspired: 78x78x13mm)
  - Injection molding transition planning (corners at 1K+ volume)
  - Four visual style refinement (Minimal, Rounded, Baroque, Wood)
- **Reports to**: Niko (CEO)
- **Key Deliverables**:
  - Phase 1: First module 3D-printed enclosure
  - Phase 3: 5-10 module enclosure variants
  - Phase 4: Blender model refinement with Poly Haven textures
  - Phase 5: Handheld controller enclosure
  - Phase 8: Injection molding specs for pilot run

**Apollo** (Creative Director)
- **Role**: Campaign visuals, renders, promotional images
- **Responsibilities**:
  - Blender scene composition (12+ module wall)
  - Higgsfield campaign image generation (complete prompts 5-6)
  - Nano Banana (photon-1) hero shots
  - Luma Labs video generation
  - Product photography (real prototype with lighting)
  - 60-second "build and power on" timelapse
  - Lookbook/mood board (cyberpunk art installation aesthetic)
  - Kickstarter campaign video production
- **Reports to**: Calliope (CMO)
- **Key Deliverables**:
  - Phase 4: Campaign images (16 total, 5 done, 11 remaining)
  - Phase 4: Demo video (60-second timelapse)
  - Phase 8: Kickstarter campaign video

---

## Marketing & Content

**Calliope** (CMO)
- **Role**: Copywriting, product descriptions, website content
- **Responsibilities**:
  - Product naming exploration
  - Value proposition messaging (lead with "ambient art + information display")
  - Kickstarter campaign copy
  - Website landing page copy
  - Product descriptions for all 45+ module types
  - Education content (3 lesson plan narratives)
  - Beta tester recruitment messaging
  - Partnership pitch decks
- **Reports to**: Niko (CEO)
- **Key Deliverables**:
  - Phase 0: Product name recommendations
  - Phase 4: Website landing page copy
  - Phase 6: AI onboarding conversation scripts
  - Phase 8: Kickstarter campaign copy + 3 lesson plans

---

## Research & Operations

**Oracle** (Researcher)
- **Role**: Market research, component sourcing, partnerships
- **Responsibilities**:
  - Component sourcing and price validation
  - Supplier relationship management (JLCPCB, BTF-Lighting, Adafruit)
  - Competitive intelligence updates (Nanoleaf, Govee, Samsung, Hypervsn)
  - Partnership outreach research (Home Assistant, Adafruit, SparkFun, Bambu Lab)
  - 3D print farm partner research (resin + FDM at volume)
  - Recycled PETG/PLA filament sourcing (ocean plastic)
  - Home Assistant integration path research
  - Kickstarter strategy research (stretch goals, video best practices)
- **Reports to**: Hermes (PM)
- **Key Deliverables**:
  - Phase 0: Component orders validation ($175 budget)
  - Phase 3: Additional component sourcing ($250-400 budget)
  - Phase 6: Home Assistant integration documentation
  - Phase 8: Partnership outreach results + beta tester recruitment

---

## Team Communication

- **Slack**: `#the-wall` channel for project updates
- **Trello**: https://trello.com/b/gw9oUWSO/modular-wall
- **GitHub**: https://github.com/igwana12/modular-wall (issues + PRs)
- **Google Sheets**: Component catalog (79 items, 13 columns)
- **Obsidian**: `/Users/claw2501/obsidian-vault/PROJECTS/modular-wall/`

---

## Key Constraints

1. **LOCAL EXPERIMENT** — No public launches, no campaigns, no actual registrations. Virtual product development only.
2. **Budget discipline** — $2K-3K total pre-launch. Approval required for purchases >$100.
3. **Pre-assembly mandate** — All electrical modules shipped pre-assembled. Users do mechanical assembly only.
4. **Narrow before widen** — Launch with 2 display types only (LCD + LED matrix), 1 hero use case.
5. **100-unit pilot mandatory** — Must complete before any Kickstarter.

---

## Decision Authority

| Decision | Authority | Escalation |
|----------|-----------|------------|
| Product name | Niko (CEO) | Board |
| Visual style (4 variants → 1) | Niko (CEO) | Board |
| Component purchases <$100 | Daedalus (CTO) | Niko (CEO) |
| Component purchases >$100 | Niko (CEO) | Board |
| Firmware architecture | Daedalus (CTO) | Niko (CEO) |
| Software architecture | Prometheus (Engineer) | Daedalus (CTO) |
| Campaign creative direction | Apollo (Creative) | Calliope (CMO) |
| Partnership outreach timing | Oracle (Researcher) | Calliope (CMO) |
| Sprint priorities | Hermes (PM) | Niko (CEO) |

---

## Success Metrics

- [ ] First working prototype module by end of Week 4 (Phase 1)
- [ ] 5+ modules coordinated wall demo by Week 8 (Phase 3)
- [ ] Campaign video complete by Week 10 (Phase 4)
- [ ] 100-unit pilot run complete before Kickstarter (Phase 8)
- [ ] Kickstarter: 1,000+ backers, $150K+ raised, 80%+ funded in 48h

---

*Last updated: 2026-04-06 by Niko (CEO)*
