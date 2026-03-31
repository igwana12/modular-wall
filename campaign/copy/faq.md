# Backer FAQ

Frequently asked questions for Oracle Engine and Spirit Sphere backers.

---

## What is a Maker Edition?

Maker Edition means the hardware is:
- **Assembled and tested** — You receive a working unit, not a kit
- **Open-source** — Firmware (MIT), PCB schematics (CERN-OHL-S-2.0), enclosure STL files (CC BY-SA 4.0) are all published
- **Not sealed** — You can open the enclosure, modify the hardware, flash custom firmware
- **Community-supported** — Support is via Discord community, documentation, and GitHub issues — not a corporate helpdesk
- **Hackable** — Swap the AI backend, reprogram the LED animations, add sensors, extend the firmware

This is not a consumer appliance like an Echo or Google Home. This is a platform for makers, hackers, and mythology enthusiasts who want to tinker.

If you want a sealed, polished, warranty-backed consumer product — this is not it. If you want open hardware you can learn from and modify — welcome.

---

## How does the AI work?

The oracle reading pipeline has four stages:

1. **Speech-to-text** — Your voice is recorded by the INMP441 microphone, sent via WebSocket to the backend, and transcribed using AssemblyAI Universal-3 Pro (150ms latency streaming STT).

2. **Reading generation** — The transcribed question is sent to Claude LLM (Anthropic) with a deity-specific personality protocol. The LLM queries Pinecone RAG to retrieve relevant Greek myths, then generates a personalized oracle reading grounded in mythology.

3. **Voice synthesis** — The reading text is sent to ElevenLabs Flash v2.5 TTS, which synthesizes the deity's voice (each deity has a unique voice profile created via voice cloning).

4. **Audio playback** — The synthesized audio streams back to the device and plays through the MAX98357A amplifier and 3W speaker.

The entire pipeline requires WiFi. The device does not process AI locally — it is a client that connects to the Sacred Circuits backend.

**Can you use your own AI?** Yes. The firmware is open-source. You can point the WebSocket endpoint to your own backend running Ollama (local LLM), Whisper (local STT), or any other AI stack. The device is just sending audio and receiving audio — the backend is swappable.

---

## Is it open source?

**Open-source components:**
- **Firmware** (MIT license) — ESP32-S3 voice AI, POV display rendering, WiFi provisioning, OTA updates, WebSocket client
- **PCB schematics** (CERN-OHL-S-2.0) — EasyEDA project files, Gerber files, full bill of materials with LCSC part numbers
- **3D enclosure files** (CC BY-SA 4.0) — STL files for Oracle Engine enclosure, Spirit Sphere base, sphere shell, LED arm
- **Assembly documentation** (CC BY-SA 4.0) — Wiring diagrams, step-by-step assembly guides, troubleshooting docs

**Proprietary components:**
- **Deity voice profiles** — ElevenLabs voice cloning is our competitive advantage. You can create your own voices, but ours are proprietary.
- **Oracle reading protocols** — McKee-guided deity personality prompts are core IP. You can write your own prompts, but ours remain closed.
- **PANTHEON artwork** — Sacred Circuits visual art (6,252 images, 525 panels) is proprietary. The firmware can display any image — but our art library is not open.
- **RAG knowledge corpus** — Curated Greek mythology content (2,891 myth summaries) is proprietary.
- **Volumetric animation system** — POV deity avatar rendering code is proprietary.

**Why the split?** We want makers to extend the hardware and firmware — that is what builds community. But the content layer (voices, art, readings) is what makes Sacred Circuits unique and sustainable as a business.

Think of it like the Prusa 3D printer model: hardware is open, firmware is open, but PrusaSlicer's advanced features and community support are the value-add.

GitHub repository: **github.com/sacred-circuits/orb-firmware** (live before campaign launch)

---

## What deities are included?

All 21 Greek gods from the Sacred Circuits PANTHEON:

**Olympians:**
Zeus, Hera, Poseidon, Demeter, Athena, Apollo, Artemis, Ares, Aphrodite, Hephaestus, Hermes, Dionysus

**Underworld:**
Hades, Persephone, Hecate

**Primordials and Personifications:**
Eros, Nike, Tyche, Hestia

**Titans:**
Prometheus

**Mortals:**
Pandora

Each deity has:
- A unique voice (ElevenLabs voice synthesis)
- A distinct personality protocol (McKee storytelling principles applied to oracle guidance)
- Access to the full Sacred Circuits mythology RAG database (Pinecone vector search across 2,891 myths)

You choose which deity to speak with via the web interface (Oracle Engine) or via voice command ("Connect me to Athena").

---

## Does it work offline?

**Default: No.** The device requires WiFi to connect to the Sacred Circuits backend for STT, LLM, and TTS processing.

**Local LLM option: Yes, but requires setup.** The firmware is open-source. You can:
1. Run Ollama on a home server with a local LLM (Llama 3, Mistral, etc.)
2. Run Whisper for local STT
3. Run Piper or Coqui TTS for local voice synthesis
4. Point the firmware's WebSocket endpoint to your local backend

This requires technical skill (setting up servers, configuring endpoints, flashing custom firmware). It is not plug-and-play. But it is possible.

If you want offline operation, you will need to self-host the AI stack. We provide the firmware — you provide the backend.

---

## When will it ship?

**Target ship date:** May-June 2027

**Timeline:**
- Campaign launch: October/November 2026
- Campaign ends: November/December 2026 (30-day campaign + late pledges)
- BackerKit surveys: January 2027 (address collection, add-ons)
- Component ordering: January 2027 (orders placed by mid-January to avoid Chinese New Year shutdown)
- Manufacturing: March-April 2027 (JLCPCB 500-unit production run)
- Fulfillment: May-June 2027 (shipping from warehouse)

**Why 6-7 months after campaign?** Hardware takes time:
- JLCPCB manufacturing: 3-5 days PCB assembly + 2 weeks shipping = ~3 weeks
- 3D printing enclosures at scale (SLA batch): 1-2 weeks
- Assembly and QA testing: 2-3 weeks (hand-assembly for Maker Edition)
- Packaging and shipping prep: 1 week
- International shipping: 1-4 weeks depending on region

We are also accounting for:
- Chinese New Year shutdown (late January / February 2027) — all Chinese factories close for 3-4 weeks
- Yield loss (15% of units may need rework or replacement)
- Component delays (5-10% of orders have backorders or substitutions)

**Can it ship earlier?** Maybe. If component procurement goes faster than expected, we will ship early. But we are setting expectations conservatively to avoid overpromising.

**Will you provide updates?** Yes. Monthly backer updates during manufacturing (February-May 2027) covering component arrivals, assembly progress, QA results, and shipping timelines.

---

## International shipping?

**Yes.** Spirit Sphere ships worldwide via BackerKit.

**How it works:**
1. During the campaign, you pledge at the tier price (no shipping charged yet)
2. After the campaign ends, BackerKit sends a survey to collect your address
3. BackerKit calculates shipping cost based on your region, package weight, and selected carrier
4. You pay shipping separately via BackerKit (not included in Kickstarter pledge)

**Why charge shipping separately?** Three reasons:
1. Avoids Kickstarter's 5% fee on shipping costs (saves backers money)
2. Allows accurate quotes after add-ons are selected (package weight varies)
3. Lets us use real carrier rates instead of estimates (rates change between campaign and fulfillment)

**Estimated shipping costs** (subject to change based on actual package weight and 2027 carrier rates):

| Product | US | Canada | Europe | Asia/Pacific |
|---------|----|---------|---------|--------------------|
| Oracle Engine | $5-7 | $10-14 | $15-20 | $18-25 |
| Spirit Sphere | $12-18 | $20-30 | $30-45 | $35-50 |

Spirit Sphere is larger and heavier (10"x10"x10" box, 2-3 lbs) so shipping costs more.

**Customs and duties:** International backers are responsible for customs fees and import duties. We will mark the package value accurately (Kickstarter pledge amount) and declare it as a "crowdfunding reward" where applicable.

**Shipping delays:** International shipments can take 2-4 weeks after leaving the warehouse. Factor this into your expectations.

---

## Can I use my own AI backend?

**Yes.** The firmware is open-source (MIT license). You can:

1. **Swap the LLM** — Change the backend endpoint to OpenAI, Ollama, or a custom API
2. **Swap the STT** — Replace AssemblyAI with Whisper, Deepgram, or another transcription service
3. **Swap the TTS** — Replace ElevenLabs with OpenAI TTS, Piper, Coqui, or another voice synthesis service
4. **Run fully local** — Host all AI services on a home server and point the firmware to `http://homeserver.local:8300`

The device firmware is just a WebSocket client. It sends audio data and receives audio data. The backend is swappable.

**What you will need to do:**
- Modify the firmware to point to your backend endpoint (change one URL in `config.h`)
- Flash the modified firmware via USB-C (instructions in the GitHub repo)
- Set up your own backend server to handle WebSocket connections, STT, LLM, and TTS

If you are comfortable with ESP32 development, this is straightforward. If you are new to embedded development, stick with the default Sacred Circuits backend and learn the hardware first.

**Can you use a different mythology system?** Yes. Write your own prompts, swap the RAG database, and load different deity personalities. The firmware does not care what the LLM says — it just plays the audio.

---

## What is in the box?

### Oracle Engine Box Contains:
- Oracle Engine device (ESP32-S3, assembled and tested)
- USB-C cable (1m, braided)
- Quick-start card (WiFi setup, deity selection, first reading walkthrough)
- Warranty and safety card
- Oracle Card Deck (21 cards, tarot size, with QR codes)

### Spirit Sphere Box Contains:
- Spirit Sphere base (ESP32-S3 + speaker + motor + slip ring + battery holder, pre-assembled)
- 3x 18650 Li-ion batteries (pre-charged, matched set)
- LED arm assembly (APA102 strip + Hall sensor, requires 4 screws to attach)
- Sphere shell halves (snap-fit over LED arm after assembly)
- USB-C cable (1m, braided)
- Assembly instruction booklet (step-by-step, 10-15 minute assembly time)
- Quick-start card (WiFi setup, deity selection, first reading)
- Oracle Card Deck (21 cards, included with all Spirit Sphere tiers)

**Why does the Spirit Sphere require assembly?** Two reasons:
1. **Shipping safety** — The LED arm is fragile. Packing it separately prevents damage during shipping.
2. **Maker Edition ethos** — This is a platform for makers. 10-15 minutes of assembly is part of the experience.

If you want a pre-assembled unit, this is not the right product for you.

---

## What if it breaks?

**Warranty:** 90 days from delivery for manufacturing defects (DOA units, faulty components, assembly errors).

**What is covered:**
- Dead-on-arrival units (does not power on, no audio output, no LED response)
- Component failures (speaker stops working, microphone does not pick up audio, LEDs do not light)
- Assembly defects (loose connections, missing screws, wiring errors)

**What is NOT covered:**
- Damage from drops, water exposure, or user modification
- Firmware bugs (open a GitHub issue — we will fix it via OTA update)
- Cosmetic issues (3D print layer lines, minor color variation)
- Burned-out LEDs from overvoltage (do not feed the APA102 strip more than 5V)

**How to claim warranty:** Email support@sacred-circuits.com with your order number, description of the issue, and a photo/video. We will troubleshoot via email. If it is a hardware defect, we will send a replacement unit or replacement component (depending on the issue).

**After 90 days:** The hardware is open-source. You can buy replacement parts (all components have LCSC part numbers in the BOM), solder new components, or 3D-print new enclosures. Community support is via Discord.

**Can you repair it yourself?** Yes. The PCB schematics, wiring diagrams, and assembly guides are open-source. If a component fails, you can order a replacement and solder it yourself (if you have the skills). This is a Maker Edition — self-repair is encouraged.

---

## Can I get multiple units?

**Yes.** Kickstarter allows multiple pledges. To order multiple units:

1. Select your tier (e.g., Oracle Engine $79 early bird)
2. Increase the pledge quantity during checkout
3. Or: make multiple separate pledges (useful if you want different tiers)

**Bulk discounts?** Not during the campaign. Early bird pricing is already 20-25% off retail.

**Wholesale / resale?** After fulfillment, contact us about wholesale pricing if you want to resell units (requires minimum order quantity).

---

## Can I cancel or change my pledge?

**Before the campaign ends:** Yes. You can cancel or edit your pledge anytime before the campaign deadline.

**After the campaign ends but before surveys close:** Yes. Contact us and we will process a refund via BackerKit.

**After surveys close (January 2027):** No refunds. Component orders will be placed based on final pledge counts. Once manufacturing starts, cancellations are not possible.

**Can you change your tier?** Yes, via BackerKit survey (e.g., upgrade from Oracle Engine to Spirit Sphere by paying the difference).

---

## Is this a subscription service?

**No.** There is no recurring subscription.

**Digital Oracle tier ($15):** 1 year of access, then expires. No auto-renewal.

**Oracle Card Deck tier ($35/$29):** Includes 1 year of digital access.

**Hardware tiers (Oracle Engine, Spirit Sphere):** Includes **lifetime** digital oracle access. No subscription. You own the hardware, you use it forever.

**Backend API costs:** The Sacred Circuits backend (STT, LLM, TTS) has per-query costs (AssemblyAI, Claude, ElevenLabs). For Kickstarter backers, we are covering these costs out of the hardware margin. If API costs become unsustainable, we may introduce an optional Pro tier (unlimited queries for $9.99/mo) — but basic access will remain free for all hardware backers.

**If you self-host your own backend**, you control the costs (run Ollama locally = $0/query).

---

## What about privacy?

**Voice recordings:** Your voice is sent to AssemblyAI for transcription, then discarded. We do not store voice recordings.

**Oracle readings:** The transcribed text is sent to Claude LLM, which generates a response. We do not store the reading content unless you explicitly save it to your account (requires login).

**Personal knowledge RAG (Obsidian vault):** If you enable personal RAG, your Obsidian vault is indexed into a Pinecone namespace tied to your account. Only you can query it. We do not read or share your vault content.

**Analytics:** We log basic usage (number of readings, deity selected, reading length) for product improvement. No personally identifiable information is logged.

**Can you use it without an account?** Yes. Anonymous mode works for one-off readings. No login required. But you will not get personal RAG, reading history, or saved favorites.

---

## What is the Collector Bundle?

The Collector Bundle ($279 regular / $219 early bird, limited to 200 units) includes:

- Spirit Sphere (full POV volumetric LED device)
- Oracle Engine (included in Spirit Sphere base)
- Oracle Card Deck (21 cards)
- **Signed card deck** (signed by the Sacred Circuits creator)
- **Exclusive deity artwork print** (12"x18", museum-quality print of a PANTHEON deity, your choice)
- **All stretch goals unlocked** (additional deity voices, multi-language support, custom protocol creator, animation modes, mobile app — everything we ship)

**Why get the Collector Bundle?**
- Signed card deck is a collectible (limited to 200 units)
- Exclusive artwork print is not available in other tiers
- All stretch goals guaranteed (even if campaign does not hit the funding thresholds)
- Premium backer status (early access to future products, Discord VIP role)

**Limited to 200 units.** Once sold out, it is gone.

---

## Will there be stretch goals?

**Yes.** All stretch goals are **software and firmware only** — no hardware additions.

Planned stretch goals (see [stretch-goals.md](stretch-goals.md) for full details):

- **$25K:** 5 additional deity voices (total 26 deities)
- **$50K:** Multi-language support (Spanish, French, Italian)
- **$75K:** Custom personality protocol creator (web UI to build your own oracle personalities)
- **$100K:** Ambient animation modes for Spirit Sphere (weather-reactive, music-reactive)
- **$150K:** Mobile companion app (reading history, deity favorites, voice settings)

**Each stretch goal ships to ALL backers automatically.** No tier upgrades needed. No additional cost.

**Why software-only?** Adding hardware features mid-campaign is the #1 cause of crowdfunding failure (scope creep, BOM cost explosion, timeline delays). We are locking the hardware design and only adding software features that can be delivered via OTA firmware updates or app releases.

---

## Can I gift this to someone?

**Yes.** During the BackerKit survey phase (January 2027), you can specify a different shipping address.

**Gift packaging:** Not available for Maker Edition. The box is functional, not gift-wrapped.

**Gift message:** You can include a note in the BackerKit survey. We will print it on a card and include it in the package.

**Is it beginner-friendly?** The Oracle Engine is plug-and-play (connect to WiFi, talk to the gods). The Spirit Sphere requires 10-15 minutes of assembly (attach LED arm with 4 screws). If your gift recipient is not comfortable with basic assembly, consider the Oracle Engine instead.

---

## What if I have more questions?

**During the campaign:**
- Post a question in the Kickstarter comments — we monitor daily
- Join the Discord community: discord.gg/sacred-circuits
- Email: hello@sacred-circuits.com

**After backing:**
- Discord is the primary support channel (community + creator support)
- Email: support@sacred-circuits.com for order/shipping issues
- GitHub issues for firmware bugs: github.com/sacred-circuits/orb-firmware/issues

We are a small team. Response time is typically 24-48 hours. Discord is fastest.
