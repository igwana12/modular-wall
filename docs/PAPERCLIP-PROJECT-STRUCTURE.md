# mosAIc — Paperclip Project Structure

**Created**: 2026-04-06
**CEO**: Niko
**Status**: Active — Phase 0-1 execution

---

## Project Overview

**Project ID**: `08fdd381-81cd-462d-bff2-b19d42008563`
**URL Key**: `modular-wall`
**Workspace**: `/Volumes/AI_WORKSPACE/modular-wall`
**GitHub**: `https://github.com/igwana12/modular-wall`

**Mission**: Build a modular, AI-orchestrated, snap-together mixed-media wall computer. Open hardware, proprietary software. TARGET: Kickstarter Q4 2026.

**Constraint**: LOCAL EXPERIMENT — virtual development only, use placeholder "mosAIc" for branding, no public launches.

---

## Team Structure (9 Specialists)

| Agent | Role | Responsibilities | Assigned Tasks |
|-------|------|-----------------|----------------|
| **Niko** | CEO & Mythmaker | Strategy, coordination, milestone tracking | SACA-52 (setup) ✓ |
| **Daedalus** | CTO / Hardware Lead | PCB design, power electronics, thermal, frame engineering | SACA-63 |
| **Hephaestus** | Firmware Engineer | ESP32 module firmware, ArtNet, CAN Bus, OTA | SACA-64 |
| **Prometheus** | Software Engineer | Wall Controller Agent (FastAPI), web configurator (Next.js) | SACA-60, SACA-62 |
| **Athena** | Industrial Designer | Enclosure design, 3D Blender models, material selection | SACA-57 |
| **Apollo** | Creative Director | Campaign visuals, Blender renders, promotional images | SACA-58, SACA-59 |
| **Calliope** | Content Lead | Copywriting, product descriptions, website content | SACA-61 |
| **Hermes** | PM | Sprint planning, Trello management, coordination | SACA-68 |
| **Oracle** | Researcher | Market research, component sourcing, partnership research | SACA-65, SACA-66, SACA-67 |

---

## Phase 0-1 Task Breakdown

### ✓ SACA-52: Project Setup & Team Assembly
**Status**: Done
**Owner**: Niko (CEO)
**Completed**: 2026-04-06

Created project, assembled team, created 12 sub-tasks across 4 work tracks.

---

### Design Track (3 tasks)

#### SACA-57: Design Blender 3D module housings (8 types)
**Priority**: High | **Status**: Todo | **Owner**: Athena
Create Blender 3D housing models for: Screen-S, Glow, Pixel, Voice, Sense, Brick, Hub, Controller.
**Output**: `.blend` files + STL exports → `/Volumes/AI_WORKSPACE/modular-wall/assets/3d/`

#### SACA-58: Generate promotional module renders
**Priority**: High | **Status**: Todo | **Owner**: Apollo
Create hero renders for each of the 8 module types using Blender.
**Style**: Cyberpunk, smoke acrylic, internal LED glow.
**Output**: PNG renders → `/Volumes/AI_WORKSPACE/modular-wall/assets/renders/`

#### SACA-59: Create composed wall scene renders
**Priority**: Medium | **Status**: Todo | **Owner**: Apollo
Assemble 12+ modules into a complete wall composition in Blender. Create 3-5 different scene variations.
**Output**: High-res renders for campaign use.

---

### Software Track (3 tasks)

#### SACA-60: Build local website prototype (Next.js)
**Priority**: High | **Status**: Todo | **Owner**: Prometheus
Create Next.js 15 + Tailwind 4 + shadcn/ui website.
**Pages**: Landing, How It Works, Configurator (mockup), FAQ.
**Style**: Cyberpunk aesthetic matching renders. All local, no deployment.
**Output**: `/Volumes/AI_WORKSPACE/modular-wall/website/`

#### SACA-61: Write website copy & module descriptions
**Priority**: High | **Status**: Todo | **Owner**: Calliope
Write compelling copy for: landing page hero, value propositions, how it works, module descriptions (all 8 types), FAQ.
**Brand voice**: Technical poetry, mythological depth.
**Placeholder**: Use "mosAIc" for product name.

#### SACA-62: Design Wall Controller API spec (FastAPI)
**Priority**: Critical | **Status**: Todo | **Owner**: Prometheus
Define REST API for Wall Controller Agent: module discovery, content routing, scene management, WebSocket updates.
**Output**: OpenAPI spec + architecture doc → `/Volumes/AI_WORKSPACE/modular-wall/docs/architecture/`

---

### Engineering Track (3 tasks)

#### SACA-63: Design module discovery protocol
**Priority**: Critical | **Status**: Todo | **Owner**: Daedalus
Spec out I2C EEPROM-based module type detection, CAN Bus addressing, hot-swap behavior.
Include safety: PTC fuses, reverse polarity protection.
**Output**: Protocol doc + wiring diagrams.

#### SACA-64: Create ESP32 firmware architecture doc
**Priority**: High | **Status**: Todo | **Owner**: Hephaestus
Define firmware architecture for ESP32-S3 modules: boot sequence, WiFi setup, ArtNet/sACN LED control, CAN Bus communication, OTA updates.
**Output**: Architecture doc + code structure.

---

### Research Track (3 tasks)

#### SACA-65: Research 3D print farm partners
**Priority**: Medium | **Status**: Todo | **Owner**: Oracle
Find 3D printing services for volume production: FDM (PETG enclosures) + resin (detailed parts).
**Compare**: Price per part, lead times, quality, minimums.
**Target**: <$2/corner at 1K+ units.
**Output**: Research doc with 3-5 vendors.

#### SACA-66: Research recycled plastic filament suppliers
**Priority**: Low | **Status**: Todo | **Owner**: Oracle
Find recycled ocean plastic PETG/PLA suppliers with consistent quality.
**Evaluate**: Precious Plastic network, commercial suppliers.
**Output**: Supplier list + cost comparison.

#### SACA-67: Research Home Assistant integration path
**Priority**: Medium | **Status**: Todo | **Owner**: Oracle
Map technical requirements for Home Assistant add-on: MQTT broker, discovery protocol, REST API, WebSocket.
Find example add-ons.
**Output**: Integration strategy doc.

---

### PM Track (1 task)

#### SACA-68: Set up sprint board & track Phase 0-1 progress
**Priority**: High | **Status**: Todo | **Owner**: Hermes
Create sprint board in Trello (board already exists at https://trello.com/b/gw9oUWSO/modular-wall).
Organize cards by track (Design, Software, Engineering, Research).
Weekly sync on progress.
**Output**: Active Trello board + weekly status updates.

---

## Reference Documentation

All project docs live in `/Volumes/AI_WORKSPACE/modular-wall/docs/`:

| Document | Purpose |
|----------|---------|
| `PAPERCLIP-CEO-BRIEF.md` | Full project context for CEO |
| `MASTER-PLAN.md` | 8-phase roadmap with timeline |
| `MODULAR-WALL-TODOS.md` | Prioritized action items |
| `ENHANCED-BRIEF.md` | Complete product definition |
| `BUSINESS-PLAN.md` | Revenue model & go-to-market |
| `ARCHITECTURE.md` | Technical deep dive |
| `POWER-CONNECTIVITY.md` | Power system design |
| `COMPETITIVE-RESEARCH.md` | 30+ competitors analyzed |
| `HARDWARE-VISUAL-CATALOG.md` | 80 components with specs |
| `COUNCIL-REVIEW.md` | 5-expert analysis & mandates |
| `PAPERCLIP-PROJECT-STRUCTURE.md` | This file |

---

## Next Steps

1. **Hermes** (PM) sets up sprint tracking in Trello
2. **All agents** begin work on assigned tasks
3. **Weekly syncs** to track Phase 0-1 progress
4. **CEO reviews** milestone completion and unblocks teams

**Coordination**: #the-wall Slack channel (to be created)
**Trello Board**: https://trello.com/b/gw9oUWSO/modular-wall

---

*Updated: 2026-04-06*
*Version: 1.0.0*
