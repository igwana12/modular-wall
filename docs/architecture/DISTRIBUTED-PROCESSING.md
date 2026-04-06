# Distributed Processing — How Compute Scales

**Date**: 2026-04-06
**Status**: Architecture design

---

## The Question

As the wall grows (10, 20, 50 modules), does it need more centralized processing power? Can the ESP32s do distributed computing? How does processing scale?

## The Answer: Hybrid Architecture

The wall uses a **hub-and-spoke model with local intelligence at every node**:

```
[Hub / Central Brain]  ←→  [Module ESP32]  ←→  [Module ESP32]  ←→  ...
    (heavy compute)          (local compute)     (local compute)
```

**Each ESP32 module handles its OWN rendering and I/O.** The Hub only coordinates.

---

## What Each ESP32 Does Locally (No Hub Needed)

Every module's ESP32-S3 ($4-6) is a **complete computer** running at 240 MHz with:
- **512 KB SRAM + 8-16 MB PSRAM** — enough for full-screen framebuffers
- **WiFi + BLE + ESP-NOW** — all networking built in
- **Hardware SPI/I2S/I2C** — drives displays, LEDs, audio, sensors directly
- **Dual-core** — one core for communication, one core for rendering

### What runs on each module locally:
| Task | Runs on Module ESP32 | Needs Hub? |
|------|---------------------|-----------|
| Drive LCD display | YES — SPI/RGB parallel | NO |
| Drive LED matrix | YES — SPI (APA102) or parallel (HUB75) | NO |
| Read sensors | YES — I2C/ADC | NO |
| Play audio | YES — I2S to DAC/amp | NO |
| WiFi connection | YES — built in | NO |
| ArtNet frame receive | YES — UDP listener | Hub sends frames |
| CAN Bus messaging | YES — built-in TWAI | NO |
| OTA firmware update | YES — HTTP download | Hub serves files |
| Basic animations | YES — local state machine | NO |
| Wake word detection | YES — simple KWS model fits | NO |

**The ESP32 is NOT an Arduino Nano.** It's a dual-core 240MHz processor with 8MB RAM. It runs LVGL (full GUI framework), TensorFlow Lite Micro, and real-time audio processing simultaneously.

---

## What the Hub Does (Coordinator, Not Dictator)

The Hub (Orange Pi 5+ / RPi 5 / Jetson) handles tasks that are **too heavy for ESP32** or need **centralized coordination**:

| Task | Why Hub? | Could ESP32 Do It? |
|------|----------|-------------------|
| AI inference (LLM, vision) | Needs 4-16GB RAM + NPU | No — too heavy |
| Internet API calls | Centralized auth + caching | ESP32 can, but wasteful |
| Scene orchestration | Needs to know all module states | Distributed would be chaotic |
| Content routing decisions | AI-driven: "weather → screen, mood → glow" | No — needs context |
| Media transcoding | Video → frame sequences for displays | No — too slow |
| Auto Journal processing | NLP, photo ranking, data aggregation | No — needs RAM/storage |
| OTA firmware serving | Hosts firmware binaries | Could use cloud, but local is better |
| Web dashboard | FastAPI + React UI | No — needs full web server |

---

## Scaling: What Happens at 10, 20, 50 Modules?

### 10 Modules (Starter/Explorer)
- **Hub**: Raspberry Pi 5 8GB ($80) is plenty
- **WiFi**: 10 devices is trivial for any router
- **CAN Bus**: 10 nodes at 1 Mbps = ~100 Kbps per node — effortless
- **ArtNet**: 10 universes at 30fps = ~1.5 Mbps — no issue
- **Hub CPU load**: <20%

### 20 Modules (Full Wall)
- **Hub**: Orange Pi 5+ 16GB ($109) recommended for comfort
- **WiFi**: 20 devices is still normal (most routers handle 30+)
- **CAN Bus**: 20 nodes = ~50 Kbps per node — still comfortable
- **ArtNet**: 20 universes at 30fps = ~3 Mbps — no issue
- **Hub CPU load**: ~40%
- **Tip**: Use 5 GHz WiFi for Hub, 2.4 GHz for modules (dual-band router)

### 50 Modules (Installation / Commercial)
- **Hub**: Jetson Orin Nano ($249) for AI workloads at this scale
- **WiFi**: Split across 2 access points or use WiFi 6 router
- **CAN Bus**: Split into 2 segments with bridge (112 node limit per segment)
- **ArtNet**: 50 universes = ~7.5 Mbps — still fine
- **Hub CPU load**: ~70% — Jetson handles it
- **Add**: Second Hub as failover / load balance

### 100+ Modules (Exhibition)
- **Multiple Hubs**: 2-3 Hubs each managing a zone of the wall
- **Wired Ethernet backhaul**: Hubs connected via Ethernet switch, not WiFi
- **ArtNet**: Standard in entertainment — 1000+ universe installations exist
- **This is where it becomes a professional lighting/media system**

---

## Distributed Processing (ESP32 Mesh Compute)

### Can ESP32s Do Distributed Processing?

**Yes, but it's rarely needed.** Here's why:

The ESP32 is already handling its own rendering locally. The Hub is coordinating, not rendering. So compute is ALREADY distributed:

```
Hub: "Scene = Morning"
  → Module 1 (Glow): locally calculates sunrise gradient, drives 256 LEDs
  → Module 2 (Screen): locally renders weather widget, drives LCD
  → Module 3 (Pixel): locally animates sunrise pixel art, drives HUB75
  → Module 4 (Voice): locally plays morning briefing audio, drives I2S
  → Module 5 (Sense): locally monitors presence, reports to Hub
```

Each module is doing its OWN compute. The Hub just told them "it's morning."

### When You'd Actually Need Distributed ESP32 Compute

Only for tasks that are:
1. Too heavy for one ESP32 (>512KB working memory)
2. Too light for the Hub (not worth the WiFi roundtrip)
3. Parallelizable across modules

**Example**: Distributed audio processing — 4 Speaker modules each processing a different frequency band for spatial audio. Each ESP32 handles its own band locally.

**Example**: Distributed sensor fusion — 6 Sense modules each scanning a zone, sharing presence data via CAN Bus to build a composite room map without Hub involvement.

**In practice, this is an optimization for later — not needed for launch.**

---

## Processing Power Summary

| Module Count | Hub Recommended | Hub Cost | Hub CPU | Bottleneck |
|-------------|-----------------|----------|---------|-----------|
| 1-10 | Raspberry Pi 5 8GB | $80 | <20% | None |
| 10-20 | Orange Pi 5+ 16GB | $109 | ~40% | None |
| 20-50 | Jetson Orin Nano | $249 | ~70% | WiFi (use 2 APs) |
| 50-100 | 2x Jetson + Ethernet | $500+ | ~50% each | CAN Bus segments |
| 100+ | Professional setup | $1000+ | Varies | Architecture design |

### Key Insight
**Processing doesn't scale linearly with modules** because each module does its own rendering. Adding a 21st module doesn't make the Hub work harder at rendering — the Hub just sends one more "here's your content" command. The heavy lifting (driving pixels, processing audio, reading sensors) happens on each module's own ESP32.

The Hub only gets stressed when you add AI-heavy features (computer vision, voice AI, Auto Journal processing) — and those scale with the Hub hardware choice, not the module count.

---

## Arduino vs ESP32 — Why ESP32 Wins

| Feature | Arduino Nano | ESP32-S3 |
|---------|-------------|----------|
| CPU | 16 MHz, single core | 240 MHz, dual core |
| RAM | 2 KB SRAM | 512 KB + 8MB PSRAM |
| WiFi | None (need shield, $10+) | Built in ($0 extra) |
| BLE | None | Built in |
| Display driving | Can't drive LCD fast enough | Hardware SPI, RGB parallel |
| Audio | No I2S | Hardware I2S |
| CAN Bus | None | Built-in TWAI controller |
| AI inference | Impossible | TFLite Micro, keyword detection |
| Price | $3-5 | $4-6 |
| OTA updates | None | Built in |

**The ESP32-S3 costs $1-2 more than an Arduino Nano but is 100x more capable.** There's no reason to use Arduino for this project.

---

*Bottom line: Each ESP32 module is a self-contained computer that handles its own rendering. The Hub coordinates but doesn't render. Processing is already distributed by design. Adding more modules doesn't require more Hub power — it's the AI features that scale with Hub choice, not the module count.*
