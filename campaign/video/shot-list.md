# Campaign Video Shot List

Categorized shot list extracted from storyboard, organized by production readiness.

---

## READY NOW (No hardware needed)

These shots can be filmed immediately without working prototypes. Total preparation budget: $200-400.

### Talking Head Segments

| Shot | Description | Setup | Duration | Notes |
|------|-------------|-------|----------|-------|
| Creator intro | Creator speaking: "I'm [name], and this is a Maker Edition..." | Two softbox lights at 45°, clean desk background, eye-level camera | 15s | Can film with placeholder device on desk if desired, or empty desk |
| Maker story | "The cards, the voices, the readings — they already exist. We've cataloged 21 deities..." | Same setup as intro | 10s | Emphasize transparency and build-in-public ethos |
| Transparency segment | "If you back this project, you're backing a learning journey — not a finished product." | Same setup, serious tone | 5s | Key trust-building moment |

**Filming requirements:**
- Camera: iPhone horizontal or mirrorless
- Lighting: Two softbox lights ($50-80 total)
- Audio: Lavalier mic ($50-100)
- Background: Clean desk or neutral wall
- **Estimated time:** 2-3 hours (multiple takes, adjust lighting)

---

### B-Roll (Problem Section)

| Shot | Description | Setup | Duration | Notes |
|------|-------------|-------|----------|-------|
| Ancient book close-up | Pages with Greek text or mythology illustrations | Overhead or close-up shot, natural light | 4s | Stock footage acceptable (Pexels, Unsplash) |
| Museum statue | Zeus or Athena statue in glass case | Medium shot, static | 4s | Stock footage acceptable, or film at local museum |
| Digital encyclopedia scroll | Hand scrolling through mythology content on tablet/phone | Top-down shot, screen recording composite | 4s | Screen record mythology Wikipedia page or app |
| Empty desk contemplation | Desk with lamp, closed book, suggesting reflection | Wide shot, static | 4s | Simple setup, any desk + lamp |
| Person closing book | Person closes mythology book, looks thoughtful | Medium profile shot | 4s | Simple acting, no dialogue |

**Filming requirements:**
- Camera: iPhone or mirrorless
- Lighting: Natural or softbox
- Props: Mythology books (any Greek myth anthology), tablet/phone
- **Estimated time:** 1-2 hours
- **Alternative:** Use stock footage for Shots 1-2 to save time

---

### Screen Recordings

| Shot | Description | Duration | Notes |
|------|-------------|----------|-------|
| GitHub repo | Firmware repository with README, LICENSE, files visible | 6s | Record after repo published (August 2026 timeline) |
| Oracle web app | Screen recording of digital oracle reading experience | 3s (part of B-roll montage) | Already built (Phase 2), can record immediately |
| Card deck layout | PANTHEON deity cards laid out on table | 3s (part of B-roll montage) | Can film once cards printed, or use digital mockups |
| PANTHEON artwork | Deity art scrolling on screen | 3s (part of B-roll montage) | Screen record from Sacred Circuits content DB |

**Filming requirements:**
- Screen recording software (QuickTime, OBS)
- PANTHEON art exports
- Access to oracle web app (oracle subdomain)
- **Estimated time:** 1 hour

---

### Voiceover Recording

| Section | Script Length | Notes |
|---------|--------------|-------|
| 30s demo | ~60 words | Authoritative, warm tone |
| Full video Problem | ~80 words | Conversational, thoughtful |
| Full video Solution Demo | ~90 words | Clear, building excitement |
| Full video How It Works | ~100 words | Educational, confident |
| Full video Tiers and CTA | ~70 words | Direct, compelling |
| **Total** | **~400 words** | **2-3 minutes total** |

**Recording requirements:**
- Quiet room (bedroom, closet with blankets for sound dampening)
- USB condenser mic or lavalier ($50-100)
- Audacity or GarageBand (free)
- Multiple takes for each section (choose best)
- **Estimated time:** 2-3 hours (including retakes and editing)

---

### Post-Production Assets

| Asset | Description | Tool | Duration | Notes |
|-------|-------------|------|----------|-------|
| Animated flow chart | Voice AI pipeline: "Your Voice → ESP32 → Oracle Backend → AI → Deity Voice" | After Effects, Blender, or DaVinci Resolve Fusion | 7s | Simple node diagram with labels, no animation complexity needed |
| Text overlay plates | Pricing, product names, URL/CTA | DaVinci Resolve or After Effects | N/A | Clean sans-serif font, high contrast |
| Fade to black transitions | Smooth fades between sections | DaVinci Resolve | N/A | Standard video editing |

**Creation requirements:**
- DaVinci Resolve (free) or After Effects
- Typography: Bold sans-serif (Montserrat, Inter, Roboto)
- Color scheme: White text on dark backgrounds for readability
- **Estimated time:** 2-4 hours

---

## BLOCKED (Needs working hardware)

These shots CANNOT be filmed until Oracle Engine and Spirit Sphere prototypes are assembled, tested, and functional. Hardware procurement timeline per Phase 08 production plan: June-July 2026.

### Spirit Sphere — Primary Demos

| Shot | Description | Hardware Needed | Blocking Reason | Duration |
|------|-------------|----------------|----------------|----------|
| Hook: Sphere glow in darkness | Spirit Sphere glowing, pulsing light, deity face materializing | Fully functional Spirit Sphere with POV display | POV display must render deity animation | 3s |
| Zeus speaking | Zeus face visible inside sphere | Spirit Sphere + deity animation rendering | Volumetric deity face must be visible and sharp | 3s |
| Full reveal | Pull back to show Spirit Sphere on desk | Spirit Sphere | Glow and POV display must be visible | 4s |
| Athena conversation | Person asks question, Athena's face materializes, responds | Spirit Sphere + backend voice AI | Full voice AI pipeline must work (WebSocket, TTS, POV sync) | 20s |
| Deity montage | Quick cuts: Aphrodite, Apollo, Hades faces | Spirit Sphere + 4+ deity animations | Multiple deity animations must be rendered and loaded | 10s |
| POV display mechanics | Side angle of LED arm spinning, deity face forming | Spirit Sphere | LED persistence-of-vision effect must be visible and sharp | 7s |
| Product shot (CTA) | Spirit Sphere glowing on desk, side-by-side with Oracle Engine | Both devices | Both must be assembled and functional | 10s |
| Final glow pulse | Spirit Sphere pulses and fades | Spirit Sphere | Clean fade effect | 3s |

**Required components (Spirit Sphere):**
- ESP32-S3-WROOM-1 module (N16R8)
- APA102 or SK9822 LED strip (144 LEDs/m, 36 LEDs per arm)
- N20 micro gear motor (3-5 RPM)
- US5881LUA Hall effect sensor
- 6-wire slip ring
- 3x 18650 Li-ion batteries + 3S BMS
- 3D-printed enclosure (base + sphere shell + LED arm)
- Firmware: POV display rendering + voice AI integration
- Backend: WebSocket audio relay, AssemblyAI STT, ElevenLabs TTS

**Blocking dependencies:**
- **Hardware procurement:** ESP32 modules, LEDs, motors (June 2026)
- **PCB design:** EasyEDA → JLCPCB prototype order (June 2026)
- **Assembly:** First functional unit (July 2026)
- **Firmware:** POV rendering tested and stable (July 2026)
- **Backend:** Voice AI pipeline working end-to-end (already complete, Phase 4)

---

### Oracle Engine — Voice Demos

| Shot | Description | Hardware Needed | Blocking Reason | Duration |
|------|-------------|----------------|----------------|----------|
| Person asking question | Person speaks to Oracle Engine: "Zeus, I'm facing a decision..." | Oracle Engine | Device must record and transmit audio | 5s |
| Oracle Engine processing | Close-up of Oracle Engine glowing, processing indicator | Oracle Engine | Status LED must pulse during processing | 3s |
| Zeus response | Wide shot, person listening to Zeus oracle reading | Oracle Engine + backend | Full voice AI pipeline must work (mic → STT → LLM → TTS → speaker) | 12s |
| Oracle Engine product shot | Oracle Engine on desk, glowing | Oracle Engine | Device must be assembled and functional | 7s |

**Required components (Oracle Engine):**
- ESP32-S3-WROOM-1 module (N16R8)
- INMP441 MEMS microphone
- MAX98357A I2S amplifier
- 3W 4-ohm speaker (40mm)
- Custom PCB (2-layer, SMT assembled)
- USB-C connector + passives
- 3D-printed enclosure
- Firmware: Voice AI client (already code-complete, Phase 4)
- Backend: WebSocket audio relay + oracle reading generation (already complete)

**Blocking dependencies:**
- **Hardware procurement:** ESP32 modules, microphones, speakers, amplifiers (June 2026)
- **PCB design:** EasyEDA → JLCPCB prototype order (June 2026)
- **Assembly:** First functional unit (July 2026)
- **Backend:** Already operational (Phase 4 complete)

---

### Hardware Close-Ups

| Shot | Description | Hardware Needed | Blocking Reason | Duration |
|------|-------------|----------------|----------------|----------|
| PCB with ESP32 module | Close-up of assembled PCB, ESP32 module visible, components labeled | Oracle Engine or Spirit Sphere PCB | PCB must be assembled (JLCPCB SMT) | 5s |
| PCB component labels | Macro shot: ESP32, MEMS mic, I2S amp, labeled on screen | Oracle Engine PCB | Components must be populated on PCB | 7s |

**Blocking dependencies:**
- **PCB fabrication:** JLCPCB 5-10 unit batch (June-July 2026)
- **Assembly:** SMT assembly complete, components soldered

---

### Lighting and Setup Requirements (Hardware Shots)

**Critical for Spirit Sphere glow visibility:**
- **Low ambient light:** <10 lux (near darkness)
- **LED glow as primary light source:** Camera exposure adjusted to make POV display visible
- **Black backdrop:** Maximize contrast for deity face visibility
- **Slow shutter speed:** If POV display appears flickering, use 1/30s or slower shutter

**Camera settings:**
- Manual exposure mode
- ISO 800-3200 (depending on LED brightness)
- Aperture f/2.8 or wider (shallow depth of field, LED glow sharp)
- White balance: Manual (5000K-6500K for neutral LED color)

**Filming challenges:**
- **POV display visibility:** Persistence-of-vision effect may not translate to camera at all frame rates — test at 24fps, 30fps, 60fps to find optimal capture rate
- **Motor noise:** N20 motor hum may be audible — record ambient room tone separately for noise reduction in post
- **LED flicker:** If APA102 refresh rate and camera frame rate interact poorly, adjust shutter speed or frame rate

**Estimated filming time (once hardware ready):** 8-12 hours across 2-3 days
- Multiple takes for each shot
- Lighting adjustments for optimal glow visibility
- Audio sync testing for voice demos
- POV display capture testing (frame rate, shutter speed)

---

## POST-PRODUCTION (No hardware required, editing only)

These elements are created entirely in post-production using video editing software.

### Editing Tasks

| Task | Description | Tool | Estimated Time |
|------|-------------|------|----------------|
| Animated flow chart | Voice AI pipeline diagram with node labels and animated connections | DaVinci Resolve Fusion or After Effects | 2-3 hours |
| Color grading | Enhance LED glow visibility, balance exposure across shots | DaVinci Resolve Color page | 4-6 hours |
| Audio mixing | Blend voiceover, deity voices, ambient soundscape | DaVinci Resolve Fairlight or Audacity | 3-5 hours |
| Audio mastering | Normalize levels, EQ, compression, final export | DaVinci Resolve Fairlight | 1-2 hours |
| Text overlays | Pricing, product names, URL/CTA, component labels | DaVinci Resolve Edit page | 2-3 hours |
| Transitions | Fade to black, cross-dissolves between sections | DaVinci Resolve Edit page | 1-2 hours |
| Final export | 4K master, 1080p Kickstarter upload, social media versions | DaVinci Resolve Deliver page | 1-2 hours |

**Total post-production time:** 14-23 hours (2-4 days)

---

## Production Timeline Estimate

### Phase 1: READY NOW Shots (Can start immediately)
**Timeline:** 2-3 days of filming + 1 day of rough editing
- Day 1: Talking head segments (creator intro, maker story, transparency)
- Day 2: B-roll (books, desk, museum) + screen recordings
- Day 3: Voiceover recording (all sections, multiple takes)
- Day 4: Rough assembly in DaVinci Resolve (voiceover + B-roll synced)

**Output:** 30-40% of full video complete (all non-hardware shots)

---

### Phase 2: BLOCKED Shots (Once hardware prototypes ready)
**Timeline:** 3-5 days of filming
- Day 1: Oracle Engine voice demo (lighting setup, multiple takes, audio sync)
- Day 2: Spirit Sphere glow and POV display (low ambient light, frame rate testing)
- Day 3: PCB close-ups and hardware detail shots (macro lens, component labels)
- Day 4: Product shots (side-by-side, CTA shots, clean background)
- Day 5: Reshoots and pickup shots (fix any issues from Days 1-4)

**Output:** 100% of shots filmed

---

### Phase 3: POST-PRODUCTION (Final assembly)
**Timeline:** 3-5 days
- Day 1: Final edit assembly (all shots synced, timing locked)
- Day 2: Color grading (enhance glow, balance exposure)
- Day 3: Audio mixing and mastering (voiceover + deity voices + ambient)
- Day 4: Text overlays, animated flow chart, final polish
- Day 5: Export and compression (4K master, 1080p web, social crops)

**Output:** Campaign video ready for upload

---

### Total Production Time (From Start to Finish)
**Best case (no reshoots):** 8-11 days
**Realistic (with reshoots and iteration):** 12-16 days
**With delays (hardware issues, re-lighting):** 18-21 days

---

## Shot List Summary

| Category | Shot Count | Can Film Now? | Blocking Dependency |
|----------|------------|---------------|-------------------|
| **READY NOW** | 10 shots | Yes | None |
| - Talking head | 3 shots | Yes | None |
| - B-roll | 5 shots | Yes | None (stock footage acceptable for 2 shots) |
| - Screen recordings | 4 shots | Yes (3 shots) | 1 shot requires GitHub repo publish (August 2026) |
| - Voiceover | All sections | Yes | None |
| - Post-production assets | 3 elements | Yes | None |
| **BLOCKED** | 17 shots | No | Functional hardware prototypes |
| - Spirit Sphere demos | 8 shots | No | Spirit Sphere prototype (July 2026) |
| - Oracle Engine demos | 4 shots | No | Oracle Engine prototype (July 2026) |
| - Hardware close-ups | 2 shots | No | Assembled PCBs (July 2026) |
| - Product shots | 3 shots | No | Both devices functional (July 2026) |
| **POST-PRODUCTION** | 7 tasks | Yes | None (editing software only) |
| **Total** | **27 shots + 7 tasks** | **37% ready** | **Hardware procurement complete by July 2026** |

---

## Gear Requirements (See gear-and-setup.md for full details)

**Minimum viable setup:** $200-400
- iPhone (current model) or borrow mirrorless camera
- Basic tripod ($30)
- Lavalier mic ($50-100)
- Two softbox lights ($50-80)
- DaVinci Resolve (free)

**Nice-to-have upgrades:** +$200-500
- Mirrorless camera with manual controls ($200-300 used)
- Macro lens for PCB close-ups ($50-100)
- Wireless lavalier mic ($100-150)
- Black backdrop for Spirit Sphere shots ($20-40)

---

## Key Takeaways

1. **37% of video can be prepared now** — talking head, B-roll, voiceover, screen recordings
2. **63% is blocked until July 2026** — all hardware demos require functional prototypes
3. **Critical dependency:** Hardware procurement timeline (June-July 2026) determines when full video production can complete
4. **Filming strategy:** Shoot READY NOW shots immediately, then wait for hardware. Do NOT delay pre-production work.
5. **Post-production is NOT blocked** — can create text overlays, animated diagrams, and rough assembly before hardware shots exist
6. **Estimated total production time:** 12-16 days (realistic), from first shot to final export
