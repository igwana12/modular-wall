# Modular Wall — CEO Executive Brief

**To**: Paperclip CEO Agent
**From**: Niko Katsaounis (Founder)
**Date**: 2026-04-06
**Priority**: HIGH — Active project, execution phase

---

## Mission

Build and launch **The Modular Wall** — a modular, AI-orchestrated, snap-together mixed-media wall computer for consumers. Open hardware, proprietary software. Target: Kickstarter by Q4 2026 with $150-300K goal.

## What It Is

A snap-together system of mixed display modules (screens, hologram fans, LED matrices, speakers, sensors, cameras, ambient lights) that magnetically attach to a wall surface and self-configure. Each module is an app that escaped the phone and became physical again. An AI conductor orchestrates content across all modules based on context, voice commands, and schedules.

**Nobody makes this.** 30+ competitors analyzed — the intersection of mixed media types + modular snap-together + AI orchestration is completely unoccupied.

## Product Definition

- **11 value propositions** (lead with ONE for launch: "ambient art + information display")
- **45+ module types** across displays, holograms, audio, cameras, sensors, kinetics, physical inputs, filler bricks
- **4 visual styles**: Minimal (cyberpunk), Rounded (Apple), Baroque (ornamental), Wood (warm)
- **Target audience**: Tech-forward adults 25-40, maker community, Home Assistant users, content creators
- **Beachhead**: 50-100K early adopters, 2-4M addressable in US

## Key Decisions Already Made

1. **Frame**: MakerBeamXL 15x15mm aluminum extrusion + 3D-printed PETG corners
2. **Wall mount**: Galvanized steel sheet — modules snap on magnetically
3. **Power**: Magnetic pogo pin edge connectors (4-pin: 5V, GND, CAN_H, CAN_L)
4. **Communication**: CAN Bus wired backbone + ArtNet/sACN WiFi + ESP-NOW sync
5. **Central compute**: Orange Pi 5+ 16GB ($109) or Jetson Orin Nano ($249)
6. **Module compute**: ESP32-S3 per module ($4-8)
7. **Pre-assembled electrical modules** — users do mechanical assembly only
8. **Open hardware** (STL/CAD/firmware), **proprietary software** (AI, configurator, marketplace)

## 8-Phase Roadmap

| Phase | Timeline | Focus | Budget |
|-------|----------|-------|--------|
| 0: Foundation | Week 1-2 | Orders, dev environment, decisions | $175 |
| 1: First Module | Week 2-4 | One working CYD screen module | — |
| 2: Wall Controller | Week 3-6 | FastAPI agent, API design, scenes | — |
| 3: Multi-Module | Week 5-8 | 5-10 modules working together | $250-400 |
| 4: Visual Campaign | Week 6-10 | Blender, Higgsfield, hero shots | — |
| 5: Handheld Controller | Week 8-12 | R1-style companion device | $50 |
| 6: Configurator + Website | Week 10-16 | AI onboarding, drag-and-drop configurator | — |
| 7: Globe 2.0 | Parallel | Spherical LED display sub-project | TBD |
| 8: Community + Launch | Week 14-20 | 100-unit pilot, beta testers, Kickstarter | $800-1,200 |

**Total pre-launch budget**: $2,000-3,000

## Financial Targets

| Period | Revenue Target |
|--------|---------------|
| Kickstarter | $150-300K (1,000-2,000 backers) |
| Year 1 | $200-400K |
| Year 2 | $440-780K |
| Year 3 | $1.5-2.9M |

**Blended gross margin target**: 60-65%

## Pricing (Kickstarter Tiers)

| Tier | Contents | Early Bird | Retail |
|------|----------|-----------|--------|
| Starter | Hub + 2 Glow + 1 Screen | $149 | $199 |
| Explorer | Hub + 1 Holo + 2 Glow + 1 Screen | $249 | $349 |
| Oracle | Hub + 2 Holo + 4 Glow + 2 Screen | $449 | $599 |
| Installation | Hub + 4 Holo + 8 Glow + 4 Screen + 2 Speaker | $899 | $1,199 |

## Council Mandates (5-Expert Review Completed)

1. **Narrow before widen** — Launch with 2 display types only (LCD + LED matrix), 1 hero use case
2. **Pre-assemble all electrical modules** — Users do mechanical assembly only
3. **Build ONE magical demo** — Depth camera silhouette → AI stylized avatar on LED matrix
4. **100-unit pilot before Kickstarter** — Measure assembly time, failure rate, NPS
5. **Three structured lesson plans** with starter kit

## Competitive Position

| What Exists | What They Lack |
|------------|----------------|
| Nanoleaf (light panels, $80-300) | No screens, no audio, no AI, no sensors |
| Govee (cheap LEDs, $30-150) | No modularity between product types |
| Tidbyt/Divoom (pixel displays) | Standalone, not modular |
| Samsung The Wall ($100K+ MicroLED) | Insane price, only screens |
| Hypervsn (hologram wall, $3,200/unit) | Enterprise only |

**Gap**: Nobody combines mixed media + modular snap-together + AI orchestration at consumer prices.

## Existing Assets

- **19 documents** in Obsidian knowledge base
- **80 components cataloged** with specs, prices, purchase links
- **4 Blender style variants** modeled
- **30+ competitor analysis** complete
- **5-expert council review** complete
- **Trello board** live with 25+ cards
- **Google Sheets** component catalog (79 items, 13 columns)
- **5 of 16 campaign images** generated on Higgsfield
- **GitHub repo**: github.com/igwana12/modular-wall

## Infrastructure Available

- **Smithers** (FastAPI @ 8200) — AI orchestration, task routing
- **JARVIS** — Voice AI with 5 voices, Greek STT
- **Sacred Circuits** — Content library (318 mythology entities), visual pipeline
- **Paperclip** — Agent orchestration platform
- **Slack** — Team communication (#the-wall channel)
- **Trello** — Task tracking
- **Google Sheets** — Component catalog + budget tracking

## Decisions Needed From Founder (Niko)

1. Product name (placeholder: "The Modular Wall")
2. Brand positioning (Sacred Circuits sub-brand vs. separate entity)
3. Visual style direction (4 variants exist — pick one for V1)
4. Education vs consumer positioning
5. Kickstarter timing confirmation (Q4 2026)

## Team Structure Needed

### Immediate (CEO to Assign)

| Role | Responsibility | Tools |
|------|---------------|-------|
| **CEO** | Strategy, roadmap execution, milestone tracking | Trello, Slack, Obsidian |
| **CTO / Hardware Lead** | PCB design, power electronics, thermal management | KiCad, Arduino IDE, JLCPCB |
| **Firmware Engineer** | ESP32-S3 module firmware, ArtNet, CAN Bus, OTA | PlatformIO, C++ |
| **Software Engineer** | Wall Controller Agent (FastAPI), web configurator (Next.js) | Python, TypeScript |
| **Industrial Designer** | Enclosure design, 3D modeling, material selection | Blender, Fusion 360 |
| **Creative Director** | Campaign visuals, video production, brand identity | Blender, Higgsfield, Luma |
| **Community Manager** | Discord, Reddit, YouTube outreach, beta program | Slack, Discord, social |
| **Supply Chain** | Component sourcing, BOM optimization, manufacturer relations | Google Sheets, JLCPCB |

### Post-Kickstarter (Scale)
- QA / Testing engineer
- Teacher / Curriculum developer (3 lesson plans)
- Content marketplace developer
- Customer support

## Risk Register (Top 5)

1. **User assembly failure** (HIGH/HIGH) — Mitigate: pre-assemble electrical modules
2. **Scope creep** (HIGH/HIGH) — Mitigate: launch with 2 display types only
3. **Thermal management** (MEDIUM/HIGH) — Mitigate: ventilation, thermal testing Phase 3
4. **3D print quality variance** (MEDIUM/MEDIUM) — Mitigate: pre-printed corners in kit
5. **ESP32-S3 supply chain** (LOW/HIGH) — Mitigate: 90-day buffer, dual-source XIAO

## Success Criteria

- [ ] First working prototype module by end of Week 4
- [ ] 5+ modules coordinated wall demo by Week 8
- [ ] Campaign video complete by Week 10
- [ ] 100-unit pilot run complete before Kickstarter
- [ ] Kickstarter: 1,000+ backers, $150K+ raised, 80%+ funded in 48h

---

**Action Required**: Build your team from available Paperclip agents, assign roles, create sprint plan for Phase 0-1, and begin execution. Report progress to #the-wall Slack channel.

## Reference Documents

All docs live in the GitHub repo: `github.com/igwana12/modular-wall`

| Doc | Location |
|-----|----------|
| Master Brief | `docs/ENHANCED-BRIEF.md` |
| Master Plan | `docs/MASTER-PLAN.md` |
| TODO List | `docs/MODULAR-WALL-TODOS.md` |
| Architecture | `docs/architecture/ARCHITECTURE.md` |
| Power System | `docs/architecture/POWER-CONNECTIVITY.md` |
| Business Plan | `docs/business/BUSINESS-PLAN.md` |
| Competitive Research | `docs/research/COMPETITIVE-RESEARCH.md` |
| Component Catalog | `docs/research/HARDWARE-VISUAL-CATALOG.md` |
| Council Review | `docs/council/COUNCIL-REVIEW.md` |
| Campaign Prompts | `docs/campaign/CAMPAIGN-HIGGSFIELD.md` |
