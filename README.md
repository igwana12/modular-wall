# The Modular Wall

**A modular, AI-orchestrated, snap-together mixed-media wall computer you build yourself.**

Each module is an app that escaped the phone and became physical again — but now it's programmable, connected, intelligent, and built by you.

## What Is This?

A snap-together system of mixed display modules — screens, hologram fans, LED matrices, speakers, sensors, cameras, and ambient lights — that magnetically attach to a wall surface and self-configure into an AI-orchestrated media surface.

**Core thesis**: As software ate the world and compressed physical objects behind glass, AI is throwing them back up — dissolving the programming barrier so anyone can give digital intelligence a physical body.

## Repository Structure

```
modular-wall/
├── docs/                          # All project documentation
│   ├── ENHANCED-BRIEF.md          # Master document — start here
│   ├── MASTER-PLAN.md             # 8-phase roadmap
│   ├── MODULAR-WALL-TODOS.md      # Prioritized action items
│   ├── VISION.md                  # Original product vision
│   ├── GLOBE-2.0-TREATMENT.md     # Globe sub-project treatment
│   ├── PROJECT-ECOSYSTEM.md       # How projects relate
│   ├── CROSS-REFERENCES.md        # Links to related work
│   ├── research/                  # Market & component research
│   │   ├── COMPETITIVE-RESEARCH.md
│   │   ├── COMPONENT-RESEARCH-FRAME.md
│   │   ├── HARDWARE-VISUAL-CATALOG.md
│   │   └── RESEARCH-HOLOGRAM-FANS.md
│   ├── council/                   # Expert review
│   │   └── COUNCIL-REVIEW.md
│   ├── architecture/              # Technical architecture
│   │   ├── ARCHITECTURE.md
│   │   └── POWER-CONNECTIVITY.md
│   ├── business/                  # Business planning
│   │   ├── BUSINESS-PLAN.md
│   │   └── PARTNERSHIPS.md
│   ├── campaign/                  # Marketing campaign
│   │   └── CAMPAIGN-HIGGSFIELD.md
│   └── sessions/                  # Session logs
│       ├── SESSION-REVIEW-2026-04-06.md
│       └── HANDOFF-2026-04-06.md
├── firmware/                      # ESP32 firmware
│   ├── modules/                   # Per-module firmware (screen, glow, pixel, etc.)
│   ├── hub/                       # Hub module firmware
│   └── controller/                # Handheld controller firmware
├── hardware/                      # Hardware design files
│   ├── cad/                       # 3D models (STL, STEP, Blender)
│   ├── pcb/                       # PCB designs (KiCad)
│   └── bom/                       # Bills of materials
├── software/                      # Software
│   ├── wall-controller/           # Wall Controller Agent (FastAPI)
│   ├── configurator/              # Web-based wall configurator
│   └── api/                       # API specifications
├── assets/                        # Creative assets
│   ├── blender/                   # Blender project files
│   ├── images/                    # Generated images
│   ├── videos/                    # Campaign videos
│   └── prompts/                   # AI generation prompts
└── .planning/                     # GSD planning artifacts
```

## Module Types (45+)

| Category | Examples | Count |
|----------|---------|-------|
| Displays | LCD, AMOLED, e-ink, LED matrix, round, transparent | 26 |
| Holograms | POV fans, DLP projector, Looking Glass, LED cube | 6 |
| Audio | Exciters, drivers, subwoofer, DACs, mics | 9 |
| Cameras | ESP32-CAM, AI vision, thermal, depth | 8 |
| Sensors | mmWave, PIR, gesture, environmental | 7 |
| Kinetic/Toys | Marble tracks, electromagnets, automata | 11 |
| Physical Inputs | Knobs, switches, buttons, sliders | 9 |
| Filler Bricks | Plain, art, glow, photo, reclaimed plastic | 5 |

## Tech Stack

- **Module compute**: ESP32-S3 per module
- **Central brain**: Orange Pi 5+ / Jetson Orin Nano
- **Communication**: CAN Bus (wired) + ArtNet/sACN (WiFi) + ESP-NOW (sync)
- **Frame**: MakerBeamXL 15x15mm aluminum extrusion + 3D-printed PETG corners
- **Connectivity**: Magnetic pogo pin edge connectors (4-pin: 5V, GND, CAN_H, CAN_L)
- **Wall mount**: Galvanized steel sheet — modules snap on magnetically
- **Software**: FastAPI (Wall Controller Agent) + Next.js (Configurator)

## Budget

| Phase | Cost |
|-------|------|
| Phase 0: First components | ~$175 |
| Phase 1-3: Multi-module wall | ~$500-800 |
| Full development through launch | ~$2,000-3,000 |

## Links

- **Trello**: https://trello.com/b/gw9oUWSO/modular-wall
- **Docs**: Start with [ENHANCED-BRIEF.md](docs/ENHANCED-BRIEF.md)

## Open Hardware

Hardware designs (STL, CAD, PCB, firmware) are open source. Software (AI orchestration, configurator, content marketplace) is proprietary. See [docs/PROJECT-ECOSYSTEM.md](docs/PROJECT-ECOSYSTEM.md) for philosophy.

## License

Hardware: [CERN-OHL-P-2.0](https://ohwr.org/cern_ohl_p_v2.txt) (Permissive)
Software: Proprietary (TBD)

---

*A Sacred Circuits project. Built by humans, powered by AI.*
