# Hologram Fan — Technical Research

## How Commercial Hologram Fans Work
POV (persistence of vision) LED fans spin at 600-1500 RPM. LED strips on the blades update at each angular position, creating the illusion of a floating image. The human eye integrates the rapidly changing LED positions into a cohesive 2D/3D image.

## Commercial Fan Protocol (Reverse-Engineered)

### WiFi Connection
- Fan creates WiFi AP: SSID starts with "3D-..." or "3D Circle XXXXX"
- Fan IP: 192.168.4.1 (hardcoded default)
- TCP port: 20320

### Packet Format
```
[PREFIX: C0EEB7C9BAA3] + [OPCODE + ARGS] + [CHECKSUM: 3 bytes] + [SUFFIX: C0EEBDF9E5B7]
```
Checksum formula: `[length/323, ((length/17)%19)+99, ((length%323)%17)+98]`

### Available TCP Commands
- Power on/off
- Brightness control (low/high toggle)
- Rotation direction (clockwise/counterclockwise)
- Play/pause/next/previous/delete effects
- List stored effects
- Upload new files (send filename as UTF-8, then raw binary data)
- WiFi management (get/set SSID and password)
- Format storage / clear cache
- Loop mode (single/continuous)

### Open Source Libraries
| Repo | Language | Stars | Notes |
|------|----------|-------|-------|
| marshift/fanatic | TypeScript/Deno | 5 | Best code quality, "3D Circle" compatible |
| token47/ledfan | Python | 2 | Best protocol docs, full hex opcodes |
| carusooo/5d-fan-display | Python | 1 | Decompiled from Android APK |
| jnweiger/led-hologram-propeller | Python | 45 | Polar coordinate image conversion |
| ruslanmv/3D-AI-Chatbot-with-Real-Time-LED-Holographic | Python | 5 | ChatGPT + hologram fan integration |

### Critical Limitation
**Commercial fans are file-playback devices, NOT real-time displays.** They store pre-encoded content and loop it. There is no real-time pixel streaming path worth building on. Some models accept HTTP frame uploads at ~10-20 FPS but with unacceptable latency and frame drops.

## Why Custom Fans Are Necessary

For real-time AI-orchestrated display, custom POV fans built with ESP32-S3 + APA102 LEDs are required:

| Capability | Commercial | Custom ESP32 |
|-----------|-----------|-------------|
| Content source | Pre-loaded files | Real-time ArtNet streaming |
| Framerate | 25-30 FPS (pre-rendered) | 20-40 FPS (live) |
| Pixel control | None (playlist only) | Full per-pixel ArtNet |
| Network | Own AP (isolated) | Joins home WiFi (STA mode) |
| Sync | None | ESP-NOW sub-ms sync |
| Integration | None | TouchDesigner, JARVIS, OSC |
| Firmware | Locked | Fully custom |

### Why APA102 Not WS2812B
- APA102: 20kHz PWM refresh rate, SPI protocol (CLK+DAT), immune to WiFi interrupt timing
- WS2812B: inadequate refresh for POV, single-wire protocol corrupted by ESP32 WiFi interrupts
- SK9822: Budget APA102 clone (4.7kHz PWM, still adequate for 3-5 RPM)

### Reference Projects
- Mercator ESP32 Spherical POV Display (mdwdotla)
- PCBWay High-Res POV Display (ESP32-WROOM, 128 LEDs, 20 FPS)
- ESP32 ArtNet Node Receiver (16 universes, 40+ FPS, 99%+ reliability)

## The Purchased Fan
- Model: "3D Circle" type (Chinese manufacture)
- Purchased: 2026-04-02
- Use: Prototype validation, content preview, demo unit
- Can be controlled via TCP bridge from Smithers for basic playlist switching
- NOT suitable for real-time interactive display
