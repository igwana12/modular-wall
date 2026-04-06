# Networking Architecture — How Modules Communicate

**Date**: 2026-04-06
**Status**: Design — validated against ESP32 capabilities

---

## Overview

Modules communicate through **three independent layers**. No layer depends on another — if WiFi drops, CAN Bus still works. If a pogo pin fails, WiFi still works.

```
[Internet] <-- WiFi --> [Home Router] <-- WiFi --> [Hub Module]
                                                        |
                                                [CAN Bus via pogo pins]
                                                        |
                                    [Module] <-> [Module] <-> [Module]
                                          ^
                                    [ESP-NOW sync broadcast from Hub]
```

---

## Layer 1: Home WiFi (Internet + LAN Data)

### What It Does
- Every smart module joins your **existing home WiFi** as a regular client (STA mode)
- Same as any smart home device (Sonos, Hue, Ring)
- The Hub runs the Wall Controller Agent (FastAPI at port 8080 on your LAN)
- Modules send/receive data to Hub via HTTP, WebSocket, or MQTT over LAN
- Hub fetches internet data (weather APIs, calendar, health, stocks) and distributes

### Why Home WiFi (Not Mesh or Dedicated AP)
| Approach | Why Not |
|----------|---------|
| Wall creates own AP | Modules can't reach internet without Hub bridging — adds complexity |
| ESP-MESH | High latency (50-200ms), unreliable for real-time LED control, hard to debug |
| Dedicated SSID / extra router | Extra hardware, user confusion, cost |
| **Home WiFi** | **Zero extra hardware. Users already know how. Same as every IoT device.** |

### Which Modules Use WiFi
- **ALL modules with ESP32/ESP32-S3** have WiFi built-in (19 of 21 modules)
- WiFi costs $0 extra — it's on the ESP32 silicon
- Brick (no compute) and Cam-Depth (USB to Hub) are the only exceptions

### Traffic Types Over WiFi
| Traffic | Protocol | Direction | Latency Tolerance |
|---------|----------|-----------|-------------------|
| API data (weather, calendar) | HTTP/REST | Hub → Internet → Hub | Seconds OK |
| Module commands | WebSocket | Hub → Module | <100ms |
| Status/health | MQTT | Module → Hub | Seconds OK |
| LED pixel data | ArtNet/sACN (UDP) | Hub → LED modules | <20ms |
| Audio streaming | I2S over WiFi | Hub → Voice/Speaker | <50ms |
| Firmware updates | HTTP OTA | Hub → Module | Minutes OK |

### WiFi Capacity
- ESP32 supports 802.11 b/g/n (2.4 GHz)
- Typical home router handles 20+ IoT devices easily
- ArtNet multicast uses ~2 Mbps for 20 modules at 30fps — trivial
- Recommend 5 GHz router for Hub + 2.4 GHz for modules (dual-band)

---

## Layer 2: CAN Bus (Wired, Through Pogo Pins)

### What It Does
- Direct wired communication through the **magnetic pogo pin connectors**
- Pin 3: CAN_H, Pin 4: CAN_L (differential pair)
- When modules snap together, the CAN bus chain extends automatically
- **Primary channel for module-to-module commands** — fast, reliable, no WiFi dependency

### Why CAN Bus
- **Built into every ESP32** — just needs SN65HVD230 transceiver ($1 per module)
- **Differential signaling** — noise-resistant over copper bus bars
- **Multi-master** — any module can initiate communication
- **112 nodes per segment** — far more than any wall needs
- **1 Mbps** — plenty for commands and sensor data
- **Same protocol cars use** — proven in far harsher environments

### Traffic Types Over CAN Bus
| Traffic | Direction | Example |
|---------|-----------|---------|
| Module discovery | Hub reads I2C EEPROM | "What type of module just connected?" |
| WiFi provisioning | Hub → new module | "Here are the WiFi credentials" |
| Scene commands | Hub → all modules | "Switch to Morning scene" |
| Sensor data | Sensor → Hub | "Temperature is 22C, presence detected" |
| Power management | Hub → module | "Enter sleep mode" |
| Chain reaction triggers | Module → adjacent module | "Marble passed sensor — trigger next" |

### Wiring
```
Module A          Module B          Module C
[ESP32]           [ESP32]           [ESP32]
   |                 |                 |
[SN65HVD230]     [SN65HVD230]     [SN65HVD230]
   |                 |                 |
---CAN_H---[pogo]---CAN_H---[pogo]---CAN_H---
---CAN_L---[pogo]---CAN_L---[pogo]---CAN_L---
---+5V-----[pogo]---+5V-----[pogo]---+5V-----
---GND-----[pogo]---GND-----[pogo]---GND-----
```

---

## Layer 3: ESP-NOW (Wireless Sync)

### What It Does
- Peer-to-peer protocol from Espressif, runs alongside WiFi on the same radio
- Hub broadcasts a **sync pulse** and all modules render their next frame simultaneously
- **Sub-millisecond latency**, 220m range
- No router involved — direct peer-to-peer

### Why ESP-NOW
- Solves the "all LEDs must update at the same instant" problem
- WiFi multicast has jitter (5-50ms) — visible as LED flicker
- ESP-NOW is deterministic — all modules receive within 1ms
- Zero extra cost — already in the ESP32 silicon
- Can run simultaneously with WiFi (same radio, different protocol)

### How It Works
1. Hub buffers the next frame of LED data for each module (received via ArtNet over WiFi)
2. Hub sends ESP-NOW broadcast: "RENDER frame #1234 NOW"
3. All modules receiving the broadcast immediately push their buffered frame to LEDs
4. Result: perfectly synchronized LED transitions across 20+ modules

---

## Setup Flow (User Experience)

### First-Time Setup (2 minutes)
1. User plugs Hub into power (USB-C PD or wall adapter)
2. Hub creates temporary WiFi AP: `MODULAR-Setup-XXXX`
3. User connects phone to that AP
4. Phone auto-opens setup page (captive portal at 192.168.4.1)
5. User selects home WiFi network, enters password
6. Hub joins home WiFi, setup AP disappears
7. Hub starts Wall Controller Agent, accessible at `http://modular.local:8080`

### Adding New Modules (10 seconds)
1. User snaps new module onto wall (magnetic + pogo pin connection)
2. Module gets power through pogo pins → boots up
3. Hub detects new module via CAN Bus I2C EEPROM read
4. Hub pushes WiFi credentials to module over CAN Bus (AES encrypted)
5. Module joins home WiFi automatically
6. Hub auto-configures content routing based on module type
7. **User does nothing** — module just appears in the dashboard

### Removing/Moving Modules
1. User pulls module off wall
2. Hub detects missing CAN Bus heartbeat within 2 seconds
3. Hub marks module as offline in dashboard
4. User places module in new position
5. Hub re-detects, reconfigures routing
6. **Zero reconfiguration needed**

---

## Security

| Concern | Mitigation |
|---------|-----------|
| WiFi credentials in transit | AES-128 encrypted over CAN Bus, never sent over WiFi |
| Module impersonation | Each module has unique ID burned in EEPROM at factory |
| OTA firmware tampering | Signed firmware images, Hub validates signature before pushing |
| Network exposure | Wall Controller binds to LAN only, not exposed to internet |
| Privacy | All processing local (on Hub), no cloud dependency |

---

## Brick Passthrough

Bricks have no compute but CAN have **passthrough pogo pins** — simple copper traces that carry power and CAN data through the brick to the next module. This means:

- A Brick between two smart modules doesn't break the chain
- Power and data flow through Bricks transparently
- Optional — basic Bricks can be fully passive (no passthrough) for cost saving
- Passthrough adds ~$0.50 to Brick BOM (copper traces + pogo pin pads)

---

## Bandwidth Budget (Worst Case: 20 Modules)

| Traffic | Bandwidth | Protocol |
|---------|-----------|----------|
| 10 LED modules × 512 channels × 30fps | ~1.5 Mbps | ArtNet UDP multicast |
| 4 Screen modules × 100KB/update × 1fps | ~3.2 Mbps | HTTP/WebSocket |
| 2 Camera modules × 720p × 15fps | ~30 Mbps | RTSP or HTTP MJPEG |
| MQTT status heartbeats × 20 modules | ~0.01 Mbps | MQTT |
| CAN Bus (wired, separate) | 1 Mbps max | CAN 2.0B |
| **Total WiFi** | **~35 Mbps** | Well within 802.11n |

Standard home WiFi (150-300 Mbps on 2.4 GHz, 800+ Mbps on 5 GHz) handles this easily.

---

*Bottom line: Your wall connects to your home WiFi like any smart device. The pogo pins carry power + CAN Bus for reliability. ESP-NOW handles sub-millisecond sync. No mesh, no extra router, no complexity.*
