# The Orb — Project Overview (Oracle Cards + Spirit Sphere)

## What This Is

Two converging Sacred Circuits products that bring Greek mythology to life through AI. **Oracle Cards** (Phase A): a physical+digital collectible card deck where 21 Greek gods deliver personalized AI oracle readings via QR code. **Spirit Sphere** (Phase B): a desktop volumetric LED crystal ball with voice AI, personal knowledge RAG, and animated 3D avatars. Cards validate the market and generate revenue; the Sphere is the flagship hardware product for Kickstarter.

## Core Value

Each card activates a personalized AI oracle experience — mythology meets technology, delivered through the Sacred Circuits creative pipeline that already exists.

## Requirements

### Validated

(None yet — ship to validate)

### Active

#### Oracle Cards (Phase A — faster to market, SC pipeline ~80% built)
- [ ] Audit existing Sacred Circuits pipeline and identify the 20% gap
- [ ] 21 Greek god card designs using existing PANTHEON art (525 panels)
- [ ] QR code on each card links to personalized AI oracle reading web experience
- [ ] Oracle reading flow: user scans QR → selects question/intention → AI research + myth correlation → voice narration + visual presentation → delivered to phone/browser
- [ ] Print-ready card files (high-quality cardstock, self-printed for v1)
- [ ] Web app for oracle readings (mobile-first)
- [ ] ElevenLabs deity voice profiles for each god's reading
- [ ] Content DB integration (6,252 SC images + 2,891 Midjourney searchable by god)
- [ ] Landing page and email list (target: 5,000 signups)
- [ ] Revenue model: tiered access (free sample readings, paid full readings)

#### Spirit Sphere (Phase B — hardware, first-time builder)
- [ ] Working ESP32-S3 prototype with POV volumetric LED display (6-8 arms)
- [ ] Battery-powered (3x 18650 Li-ion) with USB-C charging pass-through
- [ ] N20 micro gear motor (3-5 RPM, <35dB, rubber-damped)
- [ ] Audio I/O: INMP441 MEMS mic + MAX98357A amp + 3W speaker
- [ ] Cloud backend: AssemblyAI STT → Claude LLM → ElevenLabs TTS
- [ ] Obsidian vault RAG via Pinecone vector search
- [ ] Firmware: C++ Arduino, FastLED DMA, ESP32 I2S, ArduinoWebSockets
- [ ] Component sourcing: exact parts from Mouser/DigiKey/Adafruit/AliExpress
- [ ] Engineering drawings: base, LED arm assembly, slip ring, sphere mount, wire routing
- [ ] 3D-printed enclosure (self-built, iterate designs)
- [ ] Kickstarter campaign: $179 early bird / $199 regular / $249 retail
- [ ] Campaign video (30s demo + 2-3min full, $2-5K production budget)
- [ ] Open-source: STL/CAD files, firmware skeleton, WebSocket protocol
- [ ] Proprietary: volumetric animations, voice models, RAG pipeline, companion app

### Out of Scope

- Professional card manufacturing (v1 is self-printed, defer to post-validation)
- Mobile native app (web-first, mobile app if traction proves it)
- Enterprise edition ($499 branded version — defer to Year 2)
- Animation marketplace (defer to post-Kickstarter)
- Docker isolation / SaaS backend (self-hosted on existing infra)
- Brushless gimbal motor (v2 upgrade if camera tracking added)
- Wireless charging dock (v2 accessory)

## Context

- **Existing infrastructure**: Smithers (:8200), LLM Router (:8100), OpenClaw Gateway (:18789), SC pipeline (localhost:5173), PANTHEON art, Content DB, ElevenLabs deity voices, Obsidian vault
- **SC pipeline status**: ~80% built per Emergence Report. Needs audit to identify gaps before Oracle Cards can ship.
- **Hardware experience**: Owner is new to ESP32/Arduino — Spirit Sphere phase must account for learning curve, simpler sub-builds, and community/tutorial resources
- **Budget**: $2-5K self-funded for prototyping before Kickstarter
- **Competitive landscape**: No competitor combines volumetric 3D + AI voice + personal RAG at $249. Echo is generic, Rabbit R1 is screen-based, Looking Glass starts $349 no AI, Humane Pin $699 and failed.
- **Business model**: Hardware margin 72% at scale ($50-70 BOM vs $249 retail). Subscription: Free 500 queries/mo, Pro $9.99/mo, Creator $19.99/mo. Break-even: 1,370 units.

## Constraints

- **Timeline**: Starting April 2026. Cards target market validation within 2-3 months. Sphere targets Kickstarter by holiday 2026.
- **Budget**: $2-5K pre-Kickstarter self-funding covers prototypes + video production
- **Hardware skill**: First hardware project — phases must include learning milestones, not just build milestones
- **Infrastructure**: Must self-host on existing stack (Smithers, LLM Router) — no new cloud costs
- **Open source strategy**: Hardware open (STL/CAD/firmware), software proprietary (animations, voices, RAG)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Cards before Sphere | Cards leverage 80% existing infra, validate market, generate revenue before hardware investment | -- Pending |
| $179 Kickstarter pricing | LLM Council: $249 too high for KS, $179 hits impulse threshold, 30-40% discount expected | -- Pending |
| Battery-powered MVP | Portability is the magic ("move room to room, show friends"), USB-C pass-through for plugged use | -- Pending |
| N20 micro gear motor | Sweet spot: 3-5 RPM, <35dB, $3-5 BOM, proven, simple PWM control | -- Pending |
| Self-hosted backend | Already have LLM Router + Smithers + Cloudflare tunnels. Add one container: orb-backend:8300 | -- Pending |
| Open hardware / proprietary software | Prusa model: hardware hackers promote, monetize software/content layer | -- Pending |
| Self-printed cards for v1 | Validate before investing in professional manufacturing | -- Pending |
| Builder does hardware himself | Learning investment, full control, deeper product understanding | -- Pending |

## Current Milestone: v1.1 Claude Code Infrastructure Upgrades

**Goal:** Upgrade the existing Smithers-controlled system with 6 tactical improvements that enhance session mobility, automation, visual QA, and security.

**Target features:**
- Activate 5 existing scheduled tasks (morning-briefing, api-health-check, wispr-daily-sync, weekly-improvement, daily-obsidian-note)
- Configure teleport/remote control for cross-device session mobility
- Add visual QA hook for JARVIS frontend work (Playwright-based screenshot + compare)
- Activate `/loop` polling for orb-backend health, Trello, and log monitoring
- Tighten approval boundaries in `gsd-prompt-guard.js` (Slack channel restrictions, main branch protection, secret file guards)
- Add context profiles to Smithers routing policy (task-type → directory mapping)

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-01 after milestone v1.1 start*
