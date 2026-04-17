# Modular Wall — Task Breakdown

**Parent Task**: SACA-52 — Modular Wall Project Setup & Team Assembly
**Status**: In Progress
**Owner**: Niko (CEO)
**Created**: 2026-04-06

---

## Phase 0: Foundation (Week 1-2) — CURRENT PHASE

### SACA-52.1 — Product Name & Brand Positioning
**Owner**: Niko (CEO)
**Assignee**: Calliope (CMO) — research & recommendations
**Priority**: HIGH
**Status**: TODO

**Description**:
✅ **COMPLETED** — Product name selected: **mosAIc** (lowercase m, capital AI)

Original task: Pick a product name to replace "The Modular Wall" placeholder. Consider:
- Short, memorable (2-3 words max)
- Implies building/assembly/modularity
- Doesn't limit to "wall" if concept expands
- Available domain name (.com or .io)
- Not trademarked by competitors

**Subtasks**:
- [ ] Generate 20+ name candidates with rationale
- [ ] Check domain availability for top 5
- [ ] Trademark search for top 5
- [ ] Present recommendations to Niko with mood/positioning for each
- [ ] CEO decision: select final name

**Dependencies**: None
**Deliverable**: Final product name documented in `docs/BRAND.md`

---

### SACA-52.2 — Visual Style Direction Selection
**Owner**: Niko (CEO)
**Assignee**: Athena (Designer) → Niko (CEO) for final decision
**Priority**: HIGH
**Status**: TODO

**Description**:
✅ **COMPLETED** — Visual style selected: **Minimal (Cyberpunk)**

Original task: Review 4 existing Blender style variants (Minimal, Rounded, Baroque, Wood) and select one for V1 launch. Council recommends cyberpunk/transparent aesthetic.

**Subtasks**:
- [ ] Athena: Document each of 4 styles with render screenshots
- [ ] Athena: Create comparison table (complexity, cost, aesthetic, market fit)
- [ ] Athena: Recommend one style with rationale (suggest: Minimal/cyberpunk)
- [ ] Niko: Review and select final style
- [ ] Athena: Archive non-selected variants, focus all Phase 4 work on winner

**Dependencies**: None
**Deliverable**: Style selection documented in `docs/VISUAL-STYLE.md`, Blender file cleaned up
**Blender File**: `~/Downloads/modular-wall-casing-4-styles.blend`

---

### SACA-52.3 — Component Orders (Phase 0 Budget: $175)
**Owner**: Daedalus (CTO)
**Assignee**: Oracle (Researcher) → Daedalus (approval)
**Priority**: CRITICAL
**Status**: TODO

**Description**:
Place first component orders to begin Phase 1 prototyping. Budget: $175.

**Order List**:
- [ ] MakerBeamXL 15x15mm starter kit (40 beams + brackets) — $100 — [makerbeam.com](https://www.makerbeam.com/makerbeamxl/)
- [ ] 2x CYD ESP32-2432S028R — $26 — [Amazon](https://www.amazon.com/DIYmalls-ESP32-2432S028R-Resistive-Touchscreen-Development/dp/B0DNM4SKSJ)
- [ ] SK6812 RGBW LED strip 5m 60/m — $20 — [BTF-Lighting](https://www.btf-lighting.com/products/1-sk6812-rgbw-4-in-1-pixels-individual-addressable-led-strip-dc5v)
- [ ] Neodymium magnets 10x3mm 50pcs — $8 — Amazon
- [ ] Adafruit 4-pin magnetic pogo connectors (4 pairs) — $10 — [Adafruit](https://www.adafruit.com/product/5358)
- [ ] Gray Smoke Acrylic #2064 — $10 — [Canal Plastics](https://www.canalplastic.com/products/2064-gray-smoke-acrylic-sheet)

**Subtasks**:
- [ ] Oracle: Validate current prices and availability
- [ ] Oracle: Check for bulk discounts or alternative suppliers
- [ ] Oracle: Create purchase spreadsheet with links and tracking
- [ ] Daedalus: Review and approve orders
- [ ] Oracle: Place orders and track shipping
- [ ] Oracle: Update Trello with order status

**Dependencies**: None (can start immediately)
**Deliverable**: Components ordered, tracking numbers in `docs/orders/phase-0-orders.md`
**Budget**: $175 confirmed

---

### SACA-52.4 — Development Environment Setup
**Owner**: Daedalus (CTO)
**Assignee**: Hephaestus (Firmware) + Prometheus (Software)
**Priority**: HIGH
**Status**: TODO

**Description**:
Set up all development tools and environments before components arrive.

**Hephaestus Tasks** (Firmware):
- [ ] Install Arduino IDE or PlatformIO for ESP32 development
- [ ] Configure ESP32-S3 board support
- [ ] Test toolchain with "Hello World" on spare ESP32 (if available)
- [ ] Create `firmware/` directory structure in repo
- [ ] Document setup steps in `firmware/README.md`

**Prometheus Tasks** (Software):
- [ ] Set up FastAPI development environment (Python 3.11+)
- [ ] Create `software/wall-controller/` directory structure
- [ ] Initialize Poetry/venv for dependency management
- [ ] Create basic FastAPI app skeleton with health endpoint
- [ ] Document setup steps in `software/wall-controller/README.md`

**Shared Tasks**:
- [ ] Both: Create GitHub Issues template
- [ ] Both: Set up branch protection rules (require PR reviews)
- [ ] Both: Document git workflow in `docs/GIT-WORKFLOW.md`

**Dependencies**: None
**Deliverable**: Dev environments ready, documented in respective READMEs

---

### SACA-52.5 — Blender Environment Setup
**Owner**: Athena (Designer)
**Assignee**: Apollo (Creative Director)
**Priority**: MEDIUM
**Status**: TODO

**Description**:
Prepare Blender environment for Phase 4 campaign work.

**Subtasks**:
- [ ] Install Poly Haven texture add-on
- [ ] Download 5-10 candidate material packs (metal, acrylic, electronics)
- [ ] Open existing `modular-wall-casing-4-styles.blend`
- [ ] Document current state (what's modeled, what's missing)
- [ ] Create test render with Poly Haven materials
- [ ] Document Blender version and render settings

**Dependencies**: SACA-52.2 (style selection) should complete first
**Deliverable**: Blender setup documented in `assets/blender/README.md`

---

### SACA-52.6 — JLCPCB Account & PCB Design Prep
**Owner**: Daedalus (CTO)
**Assignee**: Daedalus (self)
**Priority**: MEDIUM
**Status**: TODO

**Description**:
Set up PCB manufacturing account and begin backplane design.

**Subtasks**:
- [ ] Create JLCPCB account
- [ ] Install KiCad (or EasyEDA if preferred)
- [ ] Create `hardware/pcb/backplane/` directory
- [ ] Begin schematic: 4-pin connector footprints (5V, GND, CAN_H, CAN_L)
- [ ] Add safety components: PTC fuse, TVS diode, reverse polarity MOSFET
- [ ] Document BOM for backplane in `hardware/pcb/backplane/BOM.md`

**Dependencies**: SACA-52.3 (component orders) — magnets and pogo pins inform connector design
**Deliverable**: KiCad project initialized, safety schematic drafted

---

### SACA-52.7 — Trello Board Setup & Sprint 1 Planning
**Owner**: Hermes (PM)
**Assignee**: Hermes (self)
**Priority**: HIGH
**Status**: TODO

**Description**:
Organize existing Trello board and create Sprint 1 plan (Week 1-2).

**Subtasks**:
- [ ] Review existing 25+ cards on [Trello board](https://trello.com/b/gw9oUWSO/modular-wall)
- [ ] Create lists: Backlog, Sprint 1 (Week 1-2), In Progress, Blocked, Done
- [ ] Assign existing cards to correct lists
- [ ] Create cards for SACA-52.1 through SACA-52.7
- [ ] Tag cards by phase (Phase 0, Phase 1, etc.)
- [ ] Tag cards by owner (Niko, Daedalus, Hephaestus, etc.)
- [ ] Set due dates for Sprint 1 tasks
- [ ] Post Sprint 1 summary to Slack #the-wall

**Dependencies**: SACA-52.1 (team structure) complete
**Deliverable**: Trello board organized, Sprint 1 visible, Slack post complete

---

### SACA-52.8 — Slack #the-wall Channel Setup
**Owner**: Hermes (PM)
**Assignee**: Hermes (self)
**Priority**: MEDIUM
**Status**: TODO

**Description**:
Create and configure project Slack channel.

**Subtasks**:
- [ ] Create #the-wall channel (if doesn't exist)
- [ ] Set channel description: "The Modular Wall — modular AI-orchestrated mixed-media wall computer"
- [ ] Pin important links:
  - Trello: https://trello.com/b/gw9oUWSO/modular-wall
  - GitHub: https://github.com/igwana12/modular-wall
  - Google Sheets: Component Catalog
  - Obsidian: Project vault location
- [ ] Post project kickoff message with team roster
- [ ] Invite all agents to channel
- [ ] Set up GitHub → Slack integration for PR/Issue notifications

**Dependencies**: None
**Deliverable**: #the-wall channel active, team invited

---

## Phase 1: First Module Prototype (Week 2-4)

### SACA-53 — First CYD Screen Module Build
**Owner**: Daedalus (CTO)
**Assignees**: Daedalus (CTO), Athena (Designer), Hephaestus (Firmware)
**Priority**: CRITICAL
**Status**: BLOCKED (waiting for components from SACA-52.3)

**Description**:
Build one complete CYD screen module end-to-end. Success criteria: working screen module that powers on, connects to WiFi, displays content, and has functional edge connectors.

**Subtasks**: *(Will be expanded when SACA-52 complete and components arrive)*
- [ ] Design and 3D print corner brackets
- [ ] Cut MakerBeamXL beams to size
- [ ] Mount CYD board and SK6812 LED strip
- [ ] Cut and install smoke acrylic front panel
- [ ] Install magnetic pogo connectors
- [ ] Flash basic firmware (WiFi + clock/weather)
- [ ] Test and document

**Dependencies**:
- SACA-52.2 (style selection)
- SACA-52.3 (component orders — waiting for arrival)
- SACA-52.4 (dev environment setup)

**Deliverable**: One working module, full build documentation with photos

---

## Phase 2: Wall Controller Software (Week 3-6)

### SACA-54 — Wall Controller API Development
**Owner**: Prometheus (Software Engineer)
**Status**: BACKLOG
**Priority**: HIGH

*(Will be expanded after Phase 1 complete)*

---

## Phase 3: Multi-Module Wall (Week 5-8)

### SACA-55 — Build 5-10 Mixed Module Types
**Owner**: Daedalus (CTO)
**Status**: BACKLOG
**Priority**: HIGH

*(Will be expanded after Phase 2 complete)*

---

## Open Questions (CEO Decision Required)

From `docs/MODULAR-WALL-TODOS.md`, these decisions block downstream work:

1. **Product name** — "The Modular Wall" is placeholder *(SACA-52.1)*
2. **Brand positioning** — Sacred Circuits sub-brand, separate brand, or Greece entity? *(SACA-52.1)*
3. **Launch hero use case** — Council recommends "ambient art + information display" + depth-camera-avatar demo. Agree? *(Future task)*
4. **Panel size standard** — Min 80x80mm, max 200x200mm? *(Future task)*
5. **First module to ship** — LCD screen + LED pixel matrix only for launch? *(Future task)*
6. **Visual style** — Which of 4 Blender variants? *(SACA-52.2)*
7. **Pricing strategy** — Validate Starter at $149 (early bird) / $199 (retail) *(Future task)*
8. **Software subscription** — $5-10/month. Define free vs paid tier. *(Future task)*
9. **Education vs consumer** — Primary buyer: maker or learner? *(Future task)*
10. **Open source scope** — Where exactly is line for module firmware? *(Future task)*

---

## Budget Tracking

| Phase | Approved | Spent | Remaining |
|-------|----------|-------|-----------|
| Phase 0 | $175 | $0 | $175 |
| Phase 1-3 | $500-800 | $0 | TBD |
| Total Pre-Launch | $2,000-3,000 | $0 | TBD |

---

*Last updated: 2026-04-06 by Niko (CEO)*
*Next update: After Sprint 1 (Week 1-2) complete*
