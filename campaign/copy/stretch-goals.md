# Stretch Goals

All stretch goals are **software and firmware only** — zero hardware additions.

---

## Why Software-Only?

Adding hardware features mid-campaign is the #1 cause of crowdfunding failure. What happens:
1. Backers request feature ("can you add NFC?")
2. Creator adds it to stretch goals to generate excitement
3. BOM cost increases $5-15/unit
4. Margin evaporates, timeline explodes, quality suffers
5. Creator either cancels the project or ships a half-baked product

We are **not doing this.** The hardware design is locked. Oracle Engine BOM is $16.40. Spirit Sphere BOM is $60.25. These numbers will not change.

Stretch goals add **software value** — new features delivered via OTA firmware updates, web app releases, or mobile app launches. Every stretch goal ships to **ALL backers automatically** at no additional cost and no BOM impact.

This keeps the project sustainable, on-time, and high-quality.

---

## Stretch Goal Roadmap

### $25,000 — Five Additional Deity Voices

**What:** Add 5 more Greek deities to the PANTHEON, bringing the total from 21 to 26.

**Who:** Community vote. Backers choose which 5 deities to add from a shortlist (e.g., Cronos, Rhea, Gaia, Helios, Selene, Atlas, Mnemosyne, Themis).

**How:**
- ElevenLabs voice synthesis (create new deity voice profiles)
- McKee-guided oracle reading protocols (write personality prompts for each deity)
- PANTHEON art generation (create visual panels for new deities via FLUX LoRA pipeline)
- Pinecone RAG expansion (index new deity myths and symbolism)

**Delivery:** OTA firmware update + web app update. New deities appear in the deity selection menu. Available 2-3 months post-fulfillment (voice creation + prompt tuning + art generation takes time).

**No BOM cost.** Voice synthesis is API cost (marginal, absorbed). Art is created via existing Sacred Circuits pipeline. Firmware update is free.

---

### $50,000 — Multi-Language Support

**What:** Oracle readings in Spanish, French, and Italian (in addition to English and Greek).

**How:**
- Translate deity personality protocols into target languages (McKee principles are universal)
- ElevenLabs voice synthesis supports multilingual TTS (same deity voices, different languages)
- AssemblyAI Universal-3 Pro STT supports 100+ languages (already enabled, just need to expose language selection in firmware)
- Web UI language selector (user chooses language before starting a reading)

**Delivery:** OTA firmware update + web app update. Language selector appears in settings. Available 3-4 months post-fulfillment (translation + prompt testing takes time).

**No BOM cost.** Translation is labor (one-time). TTS and STT APIs already support multilingual (no price increase).

---

### $75,000 — Custom Personality Protocol Creator

**What:** Web UI tool that lets you create your own oracle personalities (not just Greek deities).

**How:**
- Web-based personality editor: define name, voice style, oracle reading approach, mythology/knowledge base
- Upload your own texts (e.g., Stoic philosophy, Tarot symbolism, Jungian archetypes) → indexed into private Pinecone namespace
- Connect your personality to the Oracle Engine via firmware config (change endpoint URL)
- Share personalities with the community (optional — publish to Sacred Circuits personality marketplace)

**Use cases:**
- Create a Stoic philosopher oracle (Marcus Aurelius, Epictetus)
- Create a Tarot reader oracle (Major Arcana symbolism)
- Create a Jungian analyst oracle (archetypes, shadow work, dream interpretation)
- Create a personal mentor oracle (upload your own journal, get reflections in your own voice)

**Delivery:** Web app launch. Available 4-6 months post-fulfillment (requires UX design, backend API, RAG tooling).

**No BOM cost.** This is pure software. Users who want private RAG hosting may pay for Pinecone storage (optional Pro tier), but basic personality creation is free.

---

### $100,000 — Ambient Animation Modes for Spirit Sphere

**What:** POV display animations that react to environment (weather, music, time of day).

**How:**
- **Weather-reactive mode:** Sphere displays clouds/rain/sun based on local weather API (OpenWeather)
- **Music-reactive mode:** LEDs pulse and visualize audio input (FFT analysis of microphone input, like a visualizer)
- **Time-of-day mode:** Sphere displays celestial animations (sun rise/set, moon phases, constellations) based on local time and geolocation
- **Meditation mode:** Slow breathing animation (inhale/exhale visual cues) for mindfulness practice

**Delivery:** OTA firmware update. New animation modes appear in Spirit Sphere settings menu. Available 2-3 months post-fulfillment (POV animation rendering is already implemented, just need to add mode logic).

**No BOM cost.** Firmware update only. No hardware changes.

---

### $150,000 — Mobile Companion App

**What:** iOS and Android app for reading history, deity favorites, voice settings, and remote oracle access.

**Features:**
- **Reading history:** Browse past oracle readings, save favorites, share with friends
- **Deity favorites:** Mark preferred deities, set default deity for quick readings
- **Voice settings:** Adjust TTS speed, voice pitch, reading length
- **Remote oracle:** Trigger a reading from your phone (Spirit Sphere glows and responds even when you are not home)
- **Push notifications:** "Your oracle is ready" when a long reading finishes generating
- **Obsidian vault sync:** Upload vault from phone for personal RAG (currently requires desktop)

**Delivery:** App launch (iOS App Store + Google Play). Available 6-9 months post-fulfillment (mobile app development + app store approval takes time).

**No BOM cost.** Pure software. App is free for all Kickstarter backers (lifetime). New users post-launch may pay $4.99 one-time or use the free web app.

---

## Stretch Goals Summary Table

| Funding Level | Goal | Delivery Timeline | BOM Impact |
|---------------|------|-------------------|------------|
| $25K | 5 additional deity voices (26 total) | 2-3 months post-fulfillment | $0 |
| $50K | Multi-language support (Spanish, French, Italian) | 3-4 months post-fulfillment | $0 |
| $75K | Custom personality protocol creator (web UI) | 4-6 months post-fulfillment | $0 |
| $100K | Ambient animation modes (weather, music, time, meditation) | 2-3 months post-fulfillment | $0 |
| $150K | Mobile companion app (iOS + Android) | 6-9 months post-fulfillment | $0 |

---

## What If We Exceed $150K?

**$200K — Open-Source Animation SDK**

Publish the Spirit Sphere POV animation rendering engine as an open-source library (MIT license). Includes:
- C++ animation primitives (shapes, particles, sprites)
- Equirectangular → POV column projection functions
- Example animations (spinning cube, particle fountain, DNA helix, planetary orbits)
- Blender plugin to export animations as binary POV data

Why: Community-created animations extend the product lifespan. Makers can share animations on GitHub, Discord, or a future Sacred Circuits marketplace.

**$250K — Voice Cloning for Personal Oracles**

Let backers clone their own voice (or a loved one's voice) as a custom oracle personality.

How:
- Upload 10 minutes of voice samples → ElevenLabs voice cloning API
- Create a personality protocol (e.g., "my grandmother's wisdom")
- Oracle reads in your grandmother's voice, pulling from uploaded texts (letters, journals, recorded stories)

Use case: Immortalize a loved one's voice and wisdom. Create a personal mentor oracle. Talk to your past self (upload old journal entries, hear them read back in your own voice).

Delivery: 6-9 months post-fulfillment (voice cloning workflow + UX design).

---

## What Stretch Goals Will NOT Include

**No hardware additions:**
- Extra sensors (temperature, humidity, CO2, motion) — adds BOM cost, complicates assembly
- Larger batteries — increases enclosure size, shipping cost, and assembly complexity
- More LED arms (6-8 arms instead of 1) — requires mechanical redesign, slip ring upgrade, higher power draw
- Brushless gimbal motor — requires motor driver, PID tuning, adds $20+ BOM cost
- Camera for face tracking — requires ESP32-S2 upgrade (AI acceleration), adds $15+ BOM cost

**No scope creep:**
- Multiple oracle modes (I Ching, astrology, runes) — deferred to v2 or separate product
- Integration with smart home (HomeKit, Alexa, Google Home) — possible via open firmware, not a stretch goal
- Blockchain / NFT integration — not happening, ever
- Subscription tiers during Kickstarter — hardware backers get lifetime access, period

**No physical rewards:**
- T-shirts, stickers, posters — adds fulfillment complexity for low value
- Kickstarter exclusive hardware variants (gold-plated, limited edition colors) — manufacturing nightmare
- Additional card decks — card deck is already included in all hardware tiers

---

## Stretch Goal Delivery Promise

Every stretch goal ships to **ALL backers** automatically. No tier upgrades. No add-ons. No exclusions.

If you back the Oracle Engine at $79 early bird and the campaign hits $150K, you get:
- 5 additional deity voices
- Multi-language support
- Custom personality protocol creator
- Mobile companion app

If you back the Spirit Sphere, you also get:
- Ambient animation modes (weather, music, time, meditation)

**Delivery timeline:** Stretch goals are delivered post-fulfillment (2-9 months after hardware ships). Hardware ships first (May-June 2027). Software stretch goals follow as OTA updates and app releases throughout 2027.

**What if a stretch goal is delayed?** We communicate immediately. If the mobile app slips from August 2027 to October 2027, backers hear about it in the July update — not in September when it was supposed to launch.

**What if a stretch goal is too hard to build?** We pivot. Example: Custom personality protocol creator requires 6 months of development. If it proves too complex, we simplify (e.g., template-based personalities instead of freeform editor) or swap it for an equivalent feature (e.g., Obsidian vault web UI instead of personality creator). Backers vote on the pivot.

Transparency. Communication. Flexibility. These are the principles that keep software stretch goals sustainable.

---

## Questions?

Post in the Kickstarter comments or join Discord (discord.gg/sacred-circuits). Stretch goal ideas welcome — but remember: **software-only, no hardware additions.**
