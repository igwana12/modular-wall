# The Orb — Requirements (Oracle Cards + Spirit Sphere)

**Defined:** 2026-03-28
**Core Value:** Each card activates a personalized AI oracle experience — mythology meets technology, delivered through the Sacred Circuits pipeline.

## v1 Requirements

### Infrastructure

- [x] **INFRA-01**: SC pipeline audit completed — all gaps documented with severity
- [x] **INFRA-02**: orb-backend FastAPI service running at :8300 with deity config system
- [x] **INFRA-03**: Reading pipeline connected: Smithers → LLM Router → Pinecone RAG → ElevenLabs TTS
- [x] **INFRA-04**: Content DB queryable by god name (6,252 SC images + 2,891 Midjourney)
- [x] **INFRA-05**: Streaming SSE endpoint for web readings (no buffered responses)

### Oracle Reading Experience

- [x] **READ-01**: QR scan to reading starts in under 3 seconds on mobile
- [x] **READ-02**: User selects intention/question before reading begins
- [x] **READ-03**: AI generates personalized reading using deity personality + mythology RAG
- [x] **READ-04**: Reading delivered with deity voice narration via ElevenLabs (minimum 5 gods at launch)
- [x] **READ-05**: PANTHEON artwork displayed during reading (god-specific visuals)
- [x] **READ-06**: McKee storytelling principles applied in reading prompt engineering
- [x] **READ-07**: Daily card / single pull reading mode (primary engagement loop)
- [x] **READ-08**: Free tier with limited readings per month
- [x] **READ-09**: Paid tier via Stripe ($9.99/mo) with unlimited readings
- [x] **READ-10**: Digital guidebook per god (mythology, keywords, meanings)

### Oracle Cards Physical Product

- [x] **CARD-01**: 21 card designs using PANTHEON art with consistent layout/branding
- [x] **CARD-02**: QR code on each card linking to permanent URL for that god's reading
- [x] **CARD-03**: Cards printed via print-on-demand service (Game Crafter or MakePlayingCards)
- [x] **CARD-04**: Card packaging with brand identity and instructions

### Oracle Cards Launch

- [x] **LAUNCH-01**: Landing page at oracleball.ai with email capture
- [x] **LAUNCH-02**: Email list of 5,000+ signups before full launch
- [x] **LAUNCH-03**: $1 reservation deposit system for early access
- [x] **LAUNCH-04**: Revenue validation: first 100 paid readings

### ESP32 Hardware Fundamentals

- [x] **HW-01**: ESP32-S3 dev board running with LED blink + WiFi connection
- [x] **HW-02**: I2S audio capture (INMP441 mic) and playback (MAX98357A amp)
- [x] **HW-03**: WebSocket connection to orb-backend maintained over WiFi
- [x] **HW-04**: Full voice round-trip: speak → STT → LLM → TTS → hear response on hardware
- [x] **HW-05**: Voice round-trip latency measured and documented (<5s target)

### POV Display Prototype

- [x] **POV-01**: 2D flat POV propeller working with APA102/SK9822 LEDs (learning gate)
- [x] **POV-02**: Hall effect sensor position synchronization verified
- [x] **POV-03**: Single arm spherical POV with FastLED DMA rendering
- [ ] **POV-04**: Image visible at 3-5 RPM in ambient room lighting (not just darkness)
- [ ] **POV-05**: Motor noise level under 45dB measured at 30cm

### Oracle Engine Product Shell

- [x] **ENGINE-01**: Local LLM fallback via Ollama on home server when cloud unavailable
- [x] **ENGINE-02**: Swappable personality protocols — config file swap changes deity voice/knowledge without reflash
- [x] **ENGINE-03**: RAG knowledge system queries mythology corpus from networked storage
- [x] **ENGINE-04**: Same electronics fit inside 2+ form factors (desk crystal, stuffed animal, lamp)
- [x] **ENGINE-05**: OTA firmware updates over WiFi
- [x] **ENGINE-06**: WiFi provisioning via BLE or captive portal (setup <10 min)

### Spirit Sphere Integration

- [ ] **SPHERE-01**: Voice AI + POV display running simultaneously on one ESP32-S3
- [ ] **SPHERE-02**: Core 0 handles audio, Core 1 handles LEDs (no conflicts)
- [x] **SPHERE-03**: 3D printed enclosure (base + sphere mount) with 4-6 iteration budget
- [x] **SPHERE-04**: Battery powered (3x 18650 Li-ion) with USB-C charging pass-through
- [x] **SPHERE-05**: At least 1 deity avatar animation displayed on POV
- [ ] **SPHERE-06**: Physical mic mute button with LED indicator
- [x] **SPHERE-07**: Reliable 10-minute demo capability
- [ ] **SPHERE-08**: OTA firmware update mechanism
- [ ] **SPHERE-09**: WiFi provisioning via BLE or captive portal (setup <10 min)

### Kickstarter Campaign

- [ ] **KS-01**: Campaign video: 30s demo + 2-3min full (production budget $2-5K)
- [ ] **KS-02**: "Maker Edition" positioning (not consumer appliance)
- [ ] **KS-03**: $179 early bird tier (first 500 units)
- [ ] **KS-04**: Accurate shipping costs via BackerKit with real dimensional quotes
- [ ] **KS-05**: PCB design validated with small-batch JLCPCB order
- [x] **KS-06**: Discord community active before campaign launch
- [x] **KS-07**: Open-source firmware skeleton published on GitHub (pre-campaign)
- [ ] **KS-08**: 5-10 prototype units seeded to tech YouTubers

## v2 Requirements

### Enhanced Oracle Cards
- **READ-V2-01**: NFC chip integration in cards (adds $0.50-1.00/card)
- **READ-V2-02**: Multi-card spread readings (3-card, Celtic cross)
- **READ-V2-03**: Shareable reading cards / social media images
- **READ-V2-04**: Reading journal with pattern analytics

### Enhanced Spirit Sphere
- **SPHERE-V2-01**: 21 deity avatar animations (launch with 3-5)
- **SPHERE-V2-02**: Full companion web app (not just setup page)
- **SPHERE-V2-03**: Personal RAG from Obsidian vault
- **SPHERE-V2-04**: Wireless charging dock
- **SPHERE-V2-05**: Wake word detection (v1 is push-to-talk)
- **SPHERE-V2-06**: Animation marketplace for custom voxel animations

### Scale
- **SCALE-01**: Enterprise edition ($499, company branding)
- **SCALE-02**: Injection mold tooling for sphere + base
- **SCALE-03**: Custom PCB fabrication at scale
- **SCALE-04**: FCC Part 15 + CE certification

## Out of Scope

| Feature | Reason |
|---------|--------|
| Smart home integration | Scope creep killed Rabbit R1 and Humane Pin — stay focused |
| Camera / visual recognition | Not core to oracle experience, adds privacy concerns |
| App store / third-party skills | Premature platform play — build one great experience first |
| Always-on listening | Privacy concern, battery drain, not needed for oracle use case |
| SIM card / cellular | WiFi sufficient for desk product, cellular adds $15+ BOM |
| Mobile native app | Web PWA covers mobile, native app only if traction proves it |
| Self-printed cards | Amateur quality poisons brand — print-on-demand from day one |
| Open source hardware pre-fulfillment | Protect manufacturing advantage until backers receive units |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Complete |
| READ-01 | Phase 2 | Complete |
| READ-02 | Phase 2 | Complete |
| READ-03 | Phase 2 | Complete |
| READ-04 | Phase 2 | Complete |
| READ-05 | Phase 2 | Complete |
| READ-06 | Phase 2 | Complete |
| READ-07 | Phase 2 | Complete |
| READ-08 | Phase 2 | Complete |
| READ-09 | Phase 2 | Complete |
| READ-10 | Phase 2 | Complete |
| CARD-01 | Phase 3 | Complete |
| CARD-02 | Phase 3 | Complete |
| CARD-03 | Phase 3 | Complete |
| CARD-04 | Phase 3 | Complete |
| LAUNCH-01 | Phase 3 | Complete |
| LAUNCH-02 | Phase 3 | Complete |
| LAUNCH-03 | Phase 3 | Complete |
| LAUNCH-04 | Phase 3 | Pending |
| HW-01 | Phase 4 | Complete |
| HW-02 | Phase 4 | Complete |
| HW-03 | Phase 4 | Complete |
| HW-04 | Phase 4 | Complete |
| HW-05 | Phase 4 | Complete |
| ENGINE-01 | Phase 5 | Complete |
| ENGINE-02 | Phase 5 | Complete |
| ENGINE-03 | Phase 5 | Complete |
| ENGINE-04 | Phase 5 | Complete |
| ENGINE-05 | Phase 5 | Complete |
| ENGINE-06 | Phase 5 | Complete |
| POV-01 | Phase 6 | Complete |
| POV-02 | Phase 6 | Complete |
| POV-03 | Phase 6 | Complete |
| POV-04 | Phase 6 | Pending |
| POV-05 | Phase 6 | Pending |
| SPHERE-01 | Phase 7 | Pending |
| SPHERE-02 | Phase 7 | Pending |
| SPHERE-03 | Phase 7 | Complete |
| SPHERE-04 | Phase 7 | Complete |
| SPHERE-05 | Phase 7 | Complete |
| SPHERE-06 | Phase 7 | Pending |
| SPHERE-07 | Phase 7 | Complete |
| SPHERE-08 | Phase 7 | Pending |
| SPHERE-09 | Phase 7 | Pending |
| KS-01 | Phase 8 | Pending |
| KS-02 | Phase 8 | Pending |
| KS-03 | Phase 8 | Pending |
| KS-04 | Phase 8 | Pending |
| KS-05 | Phase 8 | Pending |
| KS-06 | Phase 8 | Complete |
| KS-07 | Phase 8 | Complete |
| KS-08 | Phase 8 | Pending |

**Coverage:**
- v1 requirements: 53 total (47 original + 6 ENGINE)
- Mapped to phases: 53
- Unmapped: 0

---
*Requirements defined: 2026-03-28*
*Last updated: 2026-03-28 after initial definition*
