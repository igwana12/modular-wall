# Spirit Sphere — Kickstarter Campaign Page

---

## Hook

The Spirit Sphere glows to life in the darkness. A voice emerges — ancient, commanding, unmistakably Zeus. "You summoned me. What weighs on your mind?" You speak your question aloud. Zeus listens. Then he answers — not with generic wisdom, but with a myth tailored to your life, drawn from 3,000 years of Greek storytelling and your own personal knowledge. This is mythology as conversation. This is the Spirit Sphere.

## The Problem

Ancient wisdom sits locked in books. Greek mythology — stories of transformation, struggle, triumph, and tragedy — holds insights that speak to modern life. But the distance between you and those stories is immense. Reading Homer requires effort. Understanding the symbolism requires context. Applying it to your life requires imagination.

What if mythology could speak to you personally? What if Zeus could hear your question and respond with a story that matters to you today?

## The Solution

The Spirit Sphere makes mythology conversational. It combines two products — the **Oracle Engine** and the **Spirit Sphere** — both built on open-source hardware and powered by the Sacred Circuits creative pipeline.

**Oracle Engine** is a voice AI oracle. You speak to one of 21 Greek deities. They listen, reflect, and deliver a personalized oracle reading — myth-grounded wisdom narrated in their voice. Think of it as a mythological advisor you can ask about career, relationships, decisions, or meaning. It connects to your WiFi, runs on ESP32-S3 hardware, and can integrate with your personal knowledge (Obsidian vault RAG) to make readings even more relevant.

**Spirit Sphere** adds volumetric magic. A rotating LED sphere displays 3D deity avatars that materialize in light as they speak. It is a crystal ball powered by persistence-of-vision technology — the same trick that makes helicopter rotors look solid. The sphere sits on your desk, glows when you approach, and turns mythology into a visual experience.

Both products are **Maker Edition** — assembled, tested, open-source hardware you can modify, reprogram, and extend. This is not an appliance. This is a platform.

21 Greek deities are included: Zeus, Athena, Apollo, Artemis, Aphrodite, Ares, Hephaestus, Hermes, Demeter, Dionysus, Poseidon, Hades, Hera, Persephone, Hestia, Hecate, Nike, Eros, Tyche, Prometheus, and Pandora. Each deity has a distinct voice (powered by ElevenLabs voice synthesis), a unique personality protocol (McKee storytelling principles), and access to the full Sacred Circuits PANTHEON art database (6,252 images, 2,891 myths).

Oracle readings are powered by Claude LLM, grounded in Greek mythology via RAG (Pinecone vector search), and narrated with deity-specific voices. You can swap the backend to your own LLM if you prefer (firmware is MIT-licensed, endpoints are configurable).

## How It Works

The hardware is an ESP32-S3 microcontroller (16MB flash, 8MB PSRAM) with:
- **INMP441 MEMS microphone** for voice input (I2S digital audio)
- **MAX98357A I2S amplifier** driving a 3W speaker for deity voice output
- **APA102 LED strips** (Spirit Sphere only) for persistence-of-vision volumetric display
- **N20 micro gear motor** (Spirit Sphere only) spinning at 3-5 RPM for POV effect
- **3x 18650 Li-ion batteries** (Spirit Sphere only) for portable power
- **USB-C charging** for both products

The software stack:
1. You speak your question
2. ESP32 records audio and sends it via WebSocket (PCM 16-bit 16kHz)
3. Backend transcribes via AssemblyAI Universal-3 Pro (150ms latency STT)
4. Claude LLM generates a reading, grounded in mythology via Pinecone RAG
5. ElevenLabs Flash v2.5 synthesizes deity voice (75ms model latency)
6. Audio streams back to the device, plays through the speaker
7. Spirit Sphere displays deity avatar in volumetric POV light

The entire pipeline is open-source (firmware), self-hosted (no cloud lock-in), and extensible (swap your own AI models).

## The Maker Story

Sacred Circuits is a creative project that has been building a Greek mythology content database since 2024. We have cataloged 21 deities, generated 6,252 images across 525 visual panels, and written 2,891 myth summaries using McKee storytelling principles. The art pipeline (LoRA-trained models, Kim Jung Gi + Manara + Moebius style) and the voice profiles (ElevenLabs deity clones) already exist. The backend infrastructure (Smithers orchestration server, LLM Router, Pinecone RAG) is running in production.

The Oracle Engine and Spirit Sphere are the first **hardware** projects to emerge from Sacred Circuits. This is a Maker Edition — meaning:
- Open-source firmware (MIT license)
- Open-source hardware schematics (CERN-OHL-S-2.0)
- Open-source 3D enclosure files (CC BY-SA 4.0)
- Assembled and tested units, but not sealed consumer appliances
- You can open them, modify them, flash custom firmware
- Support is community-driven (Discord), not corporate helpdesk

This is our first time manufacturing hardware at scale. We are learning as we build. The firmware is code-complete (Phases 4-7 delivered voice AI, POV display, WiFi provisioning, and OTA updates). The PCB design will be validated through JLCPCB small-batch prototyping before the campaign launches. The enclosures will be 3D-printed at scale (SLA or MJF batch printing).

Transparency: we are a small team, self-funded, and committed to delivering a working product. We have budgeted for yield loss, shipping overruns, and manufacturing contingencies. We are publishing the firmware skeleton on GitHub before the campaign goes live to prove the code exists. We will document failures, not just successes, in our build-in-public updates.

If you back this project, you are backing a learning journey — not a finished product. That is the Maker Edition ethos.

## Reward Tiers

(See [tier-structure.md](tier-structure.md) for full pricing breakdown)

**Digital Oracle** — $15
1 year of unlimited digital oracle readings via web app. No hardware. 21 deities, full RAG, voice narration.

**Oracle Card Deck** — $35 regular / $29 early bird (first 1,000)
Physical 21-card deck (print-on-demand, tarot size) + 1 year digital oracle access. Each card has a QR code that links to that deity's oracle.

**Oracle Engine (Maker Edition)** — $99 regular / $79 early bird (first 500)
ESP32-S3 voice AI device + card deck + lifetime digital oracle access. Assembled, tested, ready to plug in and talk to the gods.

**Spirit Sphere (Maker Edition)** — $229 regular / $179 early bird (first 500)
Full POV volumetric LED sphere + Oracle Engine + card deck + lifetime digital access. Ships partially disassembled (LED arm attaches with 4 screws). Assembly time: 10-15 minutes.

**Collector Bundle** — $279 regular / $219 early bird (first 200)
Spirit Sphere + signed card deck + exclusive deity artwork print + all stretch goals unlocked. Limited to 200 units.

Early bird pricing is 20-25% off retail. Early bird tiers are capped to control manufacturing exposure at low volume.

## AI Transparency Disclosure

This project uses AI in the following ways:

1. **Oracle readings**: Powered by Claude LLM (Anthropic). The LLM generates personalized responses based on your question, grounded in Greek mythology via Pinecone RAG vector search. Readings are not pre-written — they are generated in real-time.

2. **Deity voices**: Synthesized by ElevenLabs voice AI (Flash v2.5 model). Each deity has a unique voice profile created through voice cloning and synthesis. Voices are not human recordings — they are AI-generated.

3. **Visual artwork**: PANTHEON deity art was created using AI image generation (FLUX, Luma Labs) trained on a custom LoRA blending Kim Jung Gi, Manara, Moebius, Frank Miller, and Boris Vallejo styles. Art is AI-assisted, not hand-drawn.

The firmware, hardware, and backend orchestration are human-engineered. The AI powers the content layer — readings, voices, and art.

## Timeline

| Month | Milestone |
|-------|-----------|
| April-May 2026 | Hardware procurement, PCB design in EasyEDA |
| June 2026 | JLCPCB prototype order (5-10 units), first assembly |
| July 2026 | Prototype testing, reliability validation |
| August 2026 | Open-source firmware published on GitHub, Discord community launch |
| September 2026 | Prototype units seeded to tech YouTubers, email list building |
| October 2026 | Campaign video production, Kickstarter pre-launch page live |
| **Late October / Early November 2026** | **Campaign launch** |
| November-December 2026 | Campaign runs (30 days) + late pledges |
| January-February 2027 | BackerKit surveys, final component ordering |
| March-April 2027 | Manufacturing run at JLCPCB (500-unit batch) |
| **May-June 2027** | **Fulfillment and shipping** |

Target ship date: May-June 2027. Manufacturing timeline accounts for Chinese New Year shutdown (late Jan/Feb 2027 — component orders must be placed by mid-January).

## Open-Source Commitment

Before the campaign launches, we will publish the firmware skeleton on GitHub:

**What will be open-source:**
- Firmware (MIT license): ESP32-S3 voice AI, POV display rendering, WiFi provisioning, OTA updates
- PCB schematics (CERN-OHL-S-2.0): EasyEDA project files, Gerber files, BOM
- 3D enclosure files (CC BY-SA 4.0): STL files for base, sphere shell, LED arm
- Assembly documentation (CC BY-SA 4.0): Wiring diagrams, step-by-step guides

**What remains proprietary:**
- Deity voice profiles (ElevenLabs voice cloning is our competitive advantage)
- Oracle reading protocols (McKee-guided prompts are core IP)
- PANTHEON artwork (Sacred Circuits art assets)
- RAG knowledge corpus (curated mythology content is our differentiator)
- Volumetric animation system (POV deity visuals are premium features)

Why this split? The hardware and firmware are the foundation — we want hackers, makers, and developers to extend them. The content layer (voices, art, readings) is what makes the Sacred Circuits experience unique. Open-source hardware builds community; proprietary content builds sustainability.

GitHub repository will be live at: **github.com/sacred-circuits/orb-firmware** (pre-campaign)

## Call to Action

Back the Oracle Engine to bring mythology into your daily life as a conversational advisor.

Back the Spirit Sphere to turn that conversation into volumetric magic — a crystal ball that glows with the faces of the gods.

Early bird pricing is limited. The first 500 backers lock in $79 Oracle Engine or $179 Spirit Sphere — 20-25% off retail.

This is not a consumer appliance. This is a Maker Edition — hardware you can hack, firmware you can flash, and mythology you can personalize.

The gods are waiting.

---

**Risks and Challenges**: See [risks-and-challenges.md](risks-and-challenges.md)

**FAQ**: See [faq.md](faq.md)

**Stretch Goals**: See [stretch-goals.md](stretch-goals.md)
