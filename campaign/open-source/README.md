# The Orb -- Open-Source Voice AI Oracle

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hardware: CERN-OHL-S-2.0](https://img.shields.io/badge/Hardware-CERN--OHL--S--2.0-blue.svg)](https://ohwr.org/cern_ohl_s_v2.txt)
[![ESP32-S3](https://img.shields.io/badge/MCU-ESP32--S3-red.svg)](https://www.espressif.com/en/products/socs/esp32-s3)
[![Arduino](https://img.shields.io/badge/Framework-Arduino-teal.svg)](https://www.arduino.cc/)
[![Kickstarter](https://img.shields.io/badge/Kickstarter-Coming%20October%202026-green.svg)](#kickstarter)

An ESP32-S3 voice AI device that channels 21 Greek deity personas for personalized oracle readings. Speak to Zeus, hear Athena's wisdom, or consult Aphrodite on matters of the heart.

The Orb is a desktop crystal ball that listens, thinks, and speaks -- powered by cloud AI with a local ESP32-S3 brain. Ask a question, and one of 21 Greek gods answers with their unique voice, personality, and mythological wisdom.

---

## Products

This repository contains firmware for three products:

| Product | Description | Directory |
|---------|-------------|-----------|
| **Oracle Engine** | Voice AI oracle -- speak and hear deity responses | `firmware/oracle-engine/` |
| **POV Globe** | Persistence-of-vision LED sphere with volumetric animations | `firmware/pov-globe/` |
| **Spirit Sphere** | Combined: Oracle Engine + POV Globe in one device | `firmware/spirit-sphere/` |

The **Oracle Engine** works standalone on an ESP32-S3-BOX-3 or any ESP32-S3 with a microphone and speaker. The **POV Globe** is the LED display subsystem. The **Spirit Sphere** combines both into the full desktop crystal ball experience.

---

## Quick Start

### Hardware Requirements

**Minimum (Oracle Engine only):**
- ESP32-S3-BOX-3 (recommended, has built-in mic + speaker) **OR**
- ESP32-S3-DevKitC-1 + INMP441 MEMS microphone + MAX98357A I2S amplifier + 3W 4-ohm speaker

**Full Spirit Sphere:**
- ESP32-S3-WROOM-1 (N16R8)
- INMP441 I2S MEMS microphone
- MAX98357A I2S amplifier + 3W speaker
- APA102 or SK9822 LED strips (144 LEDs/m, 6-8 arms)
- N20 micro gear motor (3-5V, 3-5 RPM)
- US5881LUA Hall effect sensor
- 4-wire slip ring (12.5mm bore)
- 3x 18650 Li-ion batteries + 3S BMS
- 3D-printed enclosure (STL files in `hardware/enclosure/`)

See [`hardware/bom/bom.md`](hardware/bom/bom.md) for the complete bill of materials with sourcing links.

### Software Requirements

- [Arduino IDE 2.x](https://www.arduino.cc/en/software) (recommended)
- [Arduino ESP32 Core 3.x](https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html)
- Libraries:
  - FastLED 3.7+ (LED control)
  - ArduinoWebSockets (WebSocket client)
  - ArduinoJson 7.x (JSON parsing)

### Flash Instructions

1. Install Arduino IDE 2.x and add ESP32 board support
2. Install required libraries via Library Manager
3. Open `firmware/oracle-engine/oracle-engine.ino` (or your target product)
4. Edit `config.h`:
   - Set `WIFI_SSID` and `WIFI_PASSWORD`
   - Set `BACKEND_HOST` to your orb-backend server address
5. Select board: **ESP32-S3 Dev Module** (or ESP32-S3-BOX-3 if using that)
6. Set USB CDC On Boot: **Enabled**
7. Set Flash Size: **16MB** (for N16R8)
8. Connect via USB-C and click Upload

---

## Architecture

```
+------------------+          WebSocket (WSS)          +------------------+
|                  |  --------------------------------> |                  |
|    ESP32-S3      |    PCM audio up (mic)             |   orb-backend    |
|                  |  <-------------------------------- |    (FastAPI)     |
|  - Mic capture   |    PCM audio down (TTS)           |                  |
|  - Speaker out   |                                    |  - AssemblyAI    |
|  - LED control   |    JSON messages                   |    (STT)         |
|  - Motor control |  <------------------------------> |  - Claude LLM    |
|  - WiFi          |    (config, status, transcript)   |    (Oracle)      |
|                  |                                    |  - ElevenLabs    |
+------------------+                                    |    (TTS)         |
                                                        +------------------+
```

The ESP32-S3 handles all local I/O: microphone capture, speaker output, LED animations, and motor control. A single WebSocket connection to the cloud backend handles the AI pipeline: speech-to-text (AssemblyAI), oracle reading generation (Claude LLM), and text-to-speech (ElevenLabs deity voices).

---

## Licensing

This project uses a multi-license approach:

| Component | License | Scope |
|-----------|---------|-------|
| **Firmware** (C++ code) | [MIT](LICENSE) | All `.ino`, `.cpp`, `.h` files |
| **Hardware** (PCB, schematics) | [CERN-OHL-S-2.0](LICENSE-HARDWARE) | All files in `hardware/pcb/` |
| **Enclosure** (3D models) | [CC BY-SA 4.0](LICENSE-ENCLOSURE) | All STL/STEP files in `hardware/enclosure/` |

### What's Open

- All firmware source code
- Hardware schematics and PCB designs
- 3D-printable enclosure files
- Bill of materials and wiring diagrams
- Assembly documentation

### What's Proprietary

The following are **not** included in this repository and are proprietary to Sacred Circuits:

- Deity voice profiles (ElevenLabs voice clones for 21 Greek gods)
- Oracle prompt engineering (the LLM prompts that create deity personalities)
- PANTHEON art assets (card illustrations, animations)
- Volumetric LED animations (the 3D sphere display content)
- Companion web app (oracleball.ai)

You can build the hardware and flash the firmware, but you'll need to provide your own backend with STT, LLM, and TTS services. The firmware works with any WebSocket-compatible backend that speaks the documented protocol.

---

## Kickstarter

**[Campaign launching October 2026]**

The Orb is coming to Kickstarter with three tiers:

- **Oracle Engine** ($149 early bird) -- Voice AI oracle, no LED display
- **Spirit Sphere** ($179 early bird) -- Full crystal ball with POV LED globe
- **Maker Edition** ($249 early bird) -- Unassembled kit with extra components and documentation

[Follow us on Kickstarter to get notified at launch.](#)

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Areas where we especially welcome help:
- New LED animation patterns for the POV globe
- Enclosure remixes and alternative designs
- Documentation improvements and translations
- Bug fixes and performance optimizations

---

## Community

- **Discord:** [The Orb -- Sacred Circuits](#) (join for build help, discussions, and deity voice demos)
- **Reddit:** [r/esp32](#) (technical discussions)
- **Email:** Subscribe at [oracleball.ai](#) for updates

---

## Acknowledgments

Built by [Sacred Circuits](https://sacredcircuits.com) -- where mythology meets technology.

Inspired by the [Mercator ESP32 spherical POV display](https://mdwdotla.medium.com/mercator-an-esp32-based-spherical-persistence-of-vision-display-a4beff4f826e) and the incredible ESP32 maker community.
