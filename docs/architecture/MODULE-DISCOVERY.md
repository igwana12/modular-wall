# mosAIc Module Discovery Protocol

**Date**: 2026-04-06
**Version**: 1.0
**Status**: Specification
**Related**: SACA-63 (critical)

---

## Overview

The **Module Discovery Protocol** defines how mosAIc modules auto-identify, register with the Wall Controller, negotiate capabilities, and handle hot-swap events. The system uses a combination of I2C EEPROM for module type identification and CAN Bus for network addressing and communication.

### Key Features
- **Auto-discovery**: Modules self-identify on power-up via I2C EEPROM
- **Hot-swap safe**: Plug/unplug modules while system is running
- **CAN Bus addressing**: Dynamic address assignment for up to 127 modules
- **Capability negotiation**: Modules declare their features and requirements
- **Safety-first**: PTC fuses, reverse polarity protection, overcurrent shutdown

---

## Hardware Architecture

### Module Edge Connector (4-Pin Magnetic Pogo)

```
┌─────────────────────────────────────┐
│         Module PCB (back)           │
│                                     │
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐        │
│  │ 1 │  │ 2 │  │ 3 │  │ 4 │        │  ← Pogo pins
│  └─┬─┘  └─┬─┘  └─┬─┘  └─┬─┘        │
│    │      │      │      │           │
│  +5V    GND   CAN_H  CAN_L          │
│    │      │      │      │           │
│    │      │    ┌─┴──────┴─┐         │
│    │      │    │  CAN     │         │
│    │      │    │  Trans   │         │
│    │      │    │  -ceiver │         │
│    │      │    └────┬─────┘         │
│    │      │         │               │
│  ┌─┴──────┴─────────┴──────┐        │
│  │     ESP32-S3            │        │
│  │   (N8R2 minimum)        │        │
│  │   I2C, CAN, WiFi        │        │
│  └─────────┬───────────────┘        │
│            │                        │
│      ┌─────┴──────┐                 │
│      │  I2C       │                 │
│      │  EEPROM    │ ← Module ID     │
│      │  24C02     │                 │
│      └────────────┘                 │
│                                     │
│  [Neodymium Magnets × 4]            │
│  [PTC Fuse] [TVS Diode]             │
└─────────────────────────────────────┘
```

### Pin Assignment

| Pin | Signal | Direction | Purpose | Spec |
|-----|--------|-----------|---------|------|
| 1 | +5V | Input | Power supply | 2A max per module |
| 2 | GND | — | Ground return | — |
| 3 | CAN_H | Bidirectional | CAN Bus high | ISO 11898, differential |
| 4 | CAN_L | Bidirectional | CAN Bus low | ISO 11898, differential |

**Note**: Older designs used I2C (SDA/SCL) on pins 3/4. CAN Bus is now preferred for reliability and noise immunity.

---

## Module Identification: I2C EEPROM

### EEPROM IC
- **Part**: AT24C02 (256 bytes) or equivalent
- **Address**: 0x50 (7-bit I2C address)
- **Size**: 256 bytes (enough for module metadata)
- **Cost**: ~$0.30/unit
- **Interface**: I2C on ESP32 GPIO pins (SDA/SCL separate from CAN pins)

### EEPROM Memory Map

```
Offset | Size | Field              | Example Value
-------|------|--------------------|-----------------
0x00   | 4    | Magic Number       | 0x4D534149 ("MSAI")
0x04   | 2    | Protocol Version   | 0x0100 (v1.0)
0x06   | 16   | Module Type        | "Screen-S\0"
0x16   | 16   | Module Serial      | "SS-00123456\0"
0x26   | 4    | Firmware Version   | 0x01020003 (v1.2.3)
0x2A   | 8    | MAC Address        | 0xAABBCCDDEEFF0000
0x32   | 2    | Hardware Revision  | 0x0001 (v0.1)
0x34   | 2    | Power Req (mA)     | 1500 (1.5A)
0x36   | 4    | Capability Flags   | 0x00000015 (see below)
0x3A   | 32   | Manufacturer       | "Sacred Circuits\0"
0x5A   | 32   | Model Name         | "mosAIc Screen-S v1.0\0"
0x7A   | 128  | JSON Capabilities  | {"display":{"res":[320,240]}}
0xFA   | 6    | Reserved           | 0x000000000000

Total: 256 bytes
```

### Capability Flags (32-bit bitmask)

```c
#define CAP_DISPLAY          0x00000001  // Has display output
#define CAP_TOUCH            0x00000002  // Has touch input
#define CAP_LED_MATRIX       0x00000004  // Has LED matrix
#define CAP_AUDIO_OUT        0x00000008  // Has audio output
#define CAP_AUDIO_IN         0x00000010  // Has microphone
#define CAP_CAMERA           0x00000020  // Has camera
#define CAP_SENSOR           0x00000040  // Has environmental sensors
#define CAP_WIRELESS         0x00000080  // Has WiFi/BT
#define CAP_STORAGE          0x00000100  // Has local storage
#define CAP_CAN_BUS          0x00000200  // Supports CAN Bus
#define CAP_ARTNET           0x00000400  // Supports ArtNet/sACN
#define CAP_OTA_UPDATE       0x00000800  // Supports OTA firmware updates
#define CAP_HOT_SWAP         0x00001000  // Supports hot-swap
#define CAP_BATTERY          0x00002000  // Has battery backup
#define CAP_INPUT_BUTTONS    0x00004000  // Has physical buttons
#define CAP_INPUT_ENCODER    0x00008000  // Has rotary encoder
// Bits 16-31 reserved for future use
```

### Reading Module ID on Boot

```c
// ESP32-S3 firmware: Read EEPROM on startup
#include <Wire.h>

#define EEPROM_ADDR 0x50
#define EEPROM_SIZE 256

struct ModuleID {
    uint32_t magic;
    uint16_t protocolVersion;
    char moduleType[16];
    char serial[16];
    uint32_t firmwareVersion;
    uint8_t mac[6];
    uint16_t hwRevision;
    uint16_t powerReqMa;
    uint32_t capabilityFlags;
    char manufacturer[32];
    char modelName[32];
    char jsonCapabilities[128];
};

ModuleID readModuleID() {
    ModuleID id;
    Wire.begin(SDA_PIN, SCL_PIN);
    
    // Read entire EEPROM into struct
    for (int i = 0; i < sizeof(ModuleID); i++) {
        Wire.beginTransmission(EEPROM_ADDR);
        Wire.write((uint8_t)(i >> 8));   // Address high byte
        Wire.write((uint8_t)(i & 0xFF)); // Address low byte
        Wire.endTransmission();
        
        Wire.requestFrom(EEPROM_ADDR, 1);
        ((uint8_t*)&id)[i] = Wire.read();
    }
    
    // Validate magic number
    if (id.magic != 0x4D534149) {  // "MSAI"
        Serial.println("ERROR: Invalid EEPROM magic");
        // Fallback to default values or error state
    }
    
    return id;
}
```

---

## CAN Bus Network

### Why CAN Bus?
- **Reliable**: Automotive-grade protocol (ISO 11898)
- **Multi-master**: Any module can initiate communication
- **Noise immunity**: Differential signaling, error detection/correction
- **Broadcast**: One module can send to all, or to specific addresses
- **Speed**: 125 Kbps - 1 Mbps (we use 500 Kbps)
- **Low cost**: ESP32-S3 has built-in TWAI (CAN) controller, just needs $1 transceiver

### CAN Transceiver: SN65HVD230

```
ESP32-S3                  SN65HVD230              CAN Bus
─────────                 ──────────              ────────
GPIO_TX ───────────────── TXD
GPIO_RX ───────────────── RXD
                          CANH ─────────────────── CAN_H (Pin 3)
                          CANL ─────────────────── CAN_L (Pin 4)
GND ─────────────────────  GND ────────────────── GND (Pin 2)
3.3V ────────────────────  VCC
```

**Cost**: ~$1 per SN65HVD230 transceiver IC

### CAN Bus Topology

```
┌────────┐       ┌────────┐       ┌────────┐       ┌────────┐
│ Hub    │───────│Screen-S│───────│ Glow   │───────│ Pixel  │
│ Module │ 120Ω  │ Module │       │ Module │       │ Module │ 120Ω
└────────┘  ↑    └────────┘       └────────┘       └────────┘  ↑
           Term                                                Term
```

- **Termination**: 120Ω resistors at both ends of the CAN bus
- **Topology**: Daisy-chain (not star)
- **Max length**: 40m at 500 Kbps
- **Max modules**: 127 (CAN spec limit)

### CAN Addressing Scheme

CAN uses 11-bit identifiers (CAN 2.0A) or 29-bit (CAN 2.0B). We use **11-bit** for simplicity.

**Address Space**:
```
0x000 - 0x00F: Broadcast and system messages
0x010 - 0x07F: Module addresses (dynamic assignment)
0x080 - 0x0FF: Hub and controller reserved
0x100 - 0x7FF: Extended uses (scenes, groups, etc.)
```

**System Message IDs**:
```c
#define CAN_ID_BROADCAST      0x000  // Sent to all modules
#define CAN_ID_DISCOVERY_REQ  0x001  // Hub requests modules to identify
#define CAN_ID_DISCOVERY_RSP  0x002  // Module responds with ID
#define CAN_ID_HEARTBEAT      0x003  // Periodic "I'm alive" from modules
#define CAN_ID_EMERGENCY      0x004  // Emergency shutdown (overheat, etc.)
#define CAN_ID_TIME_SYNC      0x005  // Time synchronization
#define CAN_ID_SCENE_CHANGE   0x006  // Scene activation broadcast
```

### Dynamic Address Assignment

Modules boot with **no address** and request one from the Hub via discovery protocol.

**Boot Sequence**:
1. Module powers on, reads EEPROM, gets module type + serial
2. Module listens on CAN bus for 500ms (detect if Hub is present)
3. Module sends `DISCOVERY_REQUEST` with serial number
4. Hub responds with assigned CAN address
5. Module adopts address and begins normal operation

---

## Discovery Protocol Flow

### 1. Hub Initiated Discovery (Cold Boot)

Hub sends periodic broadcast asking for modules to identify:

```
Hub → Broadcast (CAN ID 0x001):
  Message: DISCOVERY_REQUEST
  Data: [timestamp (4 bytes)]
```

Modules respond with their EEPROM data:

```
Module → Hub (CAN ID 0x002):
  Message: DISCOVERY_RESPONSE
  Data:
    - Serial (16 bytes, truncated to 8 for CAN)
    - Module Type (encoded as 1-byte enum)
    - Capability Flags (4 bytes)
    - Requested Address (1 byte, 0x00 = "assign me one")
```

Hub processes responses and assigns addresses:

```
Hub → Module (CAN ID 0x010-0x07F):
  Message: ADDRESS_ASSIGNED
  Data:
    - New CAN Address (1 byte)
    - Hub IP Address (4 bytes)
    - Network Config (optional)
```

Module acknowledges:

```
Module → Hub (using new address):
  Message: ACK
  Data: [module serial]
```

### 2. Hot-Swap Discovery (Module Added While Running)

When a new module is plugged in:

**Physical detection**:
- Module draws power from bus bar (Pin 1: +5V)
- PTC fuse limits inrush current
- TVS diode clamps voltage spikes
- ESP32-S3 boots in ~300ms

**Network join**:
1. Module listens for 500ms to detect CAN traffic
2. If traffic detected, waits for Hub heartbeat (sent every 1 second)
3. Module sends `DISCOVERY_REQUEST` between heartbeats
4. Hub detects new module, assigns address, sends config
5. Module registers with Wall Controller via WiFi (HTTP POST `/api/wall/modules`)

### 3. Module Removal Detection

**Hub perspective**:
- Modules send CAN heartbeat every 5 seconds (CAN ID 0x003)
- If no heartbeat for 10 seconds, Hub marks module as `offline`
- Wall Controller API broadcasts WebSocket event: `module.offline`

**Module perspective (graceful shutdown)**:
- If module detects power loss (via GPIO monitoring), sends `GOODBYE` message
- Hub immediately marks module offline (no 10-second wait)

---

## Safety Mechanisms

### 1. Reverse Polarity Protection

```
Pin 1 (+5V) ──────┬─────── Schottky Diode ──────┬──── Module +5V Rail
                  │                              │
                  └── P-Channel MOSFET Gate ─────┘
                              │
Pin 2 (GND) ──────────────────┴──────────────────── Module GND
```

**Method**: P-channel MOSFET with body diode. If polarity is reversed, MOSFET stays off, no current flows.

**Cost**: ~$0.30 per module (MOSFET + Schottky diode)

### 2. Overcurrent Protection (PTC Fuse)

```
Pin 1 (+5V) ─── PTC Fuse (2A) ─── Module Power Rail
```

- **Part**: Bel Fuse 0ZCJ0200FF2E (2A hold, 4A trip)
- **Behavior**: Self-resetting. If module draws >2A, fuse heats up, resistance increases, current drops. Fuse resets when cool.
- **Cost**: ~$0.10/unit

### 3. Overvoltage Protection (TVS Diode)

```
Module +5V Rail ───┬─── TVS Diode (6.8V) ─── GND
                   │
             [Module Circuits]
```

- **Part**: SMBJ6.8A (6.8V clamp)
- **Behavior**: If voltage spike exceeds 6.8V, diode conducts and clamps to safe level
- **Cost**: ~$0.10/unit

### 4. ESD Protection (CAN Bus)

```
CAN_H ────┬──── TVS Array ────┬──── GND
          │                   │
CAN_L ────┘                   └──── GND
```

- **Part**: PESD1CAN (dual TVS for CAN)
- **Protects**: CAN transceiver from ESD on pogo pins
- **Cost**: ~$0.20/unit

### Total Safety BOM per Module: ~$0.70

---

## Hot-Swap Behavior

### Safe Hot-Swap Requirements

1. **Power sequencing**: Module must not draw >2A inrush current
   - Solution: Bulk capacitors limited to 100µF total
   - PTC fuse limits inrush

2. **CAN bus glitch**: Plugging/unplugging must not corrupt CAN frames
   - Solution: CAN controller has error recovery, will retransmit

3. **Magnet alignment**: Pogo pins must align before power flows
   - Solution: Magnet polarity guides alignment. Pins recessed 0.5mm to ensure magnet contact first.

4. **User safety**: No exposed high voltage, no spark
   - Solution: 5V is safe touch voltage. Magnetic connection = low insertion force, no arcing.

### Hot-Swap Test Protocol

1. Power on wall with 5 modules running
2. Unplug module #3 (Glow module) while playing audio on Pixel module
3. Verify:
   - No CAN bus errors on other modules
   - Wall Controller detects offline within 10 seconds
   - Audio continues without glitch
4. Re-plug module #3
5. Verify:
   - Module boots and auto-discovers
   - Wall Controller registers module within 5 seconds
   - Module resumes previous content/scene

---

## Module Registration API

When module successfully joins CAN network, it registers with Wall Controller via WiFi.

### POST /api/wall/modules/register

**Request**:
```json
{
  "serial": "SS-00123456",
  "type": "Screen-S",
  "canAddress": 16,
  "ip": "192.168.1.101",
  "mac": "AA:BB:CC:DD:EE:FF",
  "firmware": "1.2.3",
  "hardware": {
    "revision": "v0.1",
    "eepromData": {
      "manufacturer": "Sacred Circuits",
      "model": "mosAIc Screen-S v1.0",
      "powerReqMa": 1500,
      "capabilityFlags": 21
    }
  },
  "capabilities": {
    "display": {
      "resolution": [320, 240],
      "touchscreen": true
    },
    "wifi": {
      "protocols": ["802.11b/g/n"]
    }
  }
}
```

**Response**: `201 Created`
```json
{
  "moduleId": "screen-s-01",
  "canAddress": 16,
  "registered": true,
  "assignedPosition": { "x": 0, "y": 0 },
  "defaultContent": "http://hub.local:8200/widgets/clock.html"
}
```

---

## Firmware Implementation

### ESP32-S3 Discovery Code (Simplified)

```c
#include "driver/twai.h"  // ESP32 CAN (TWAI) driver

#define CAN_TX_PIN GPIO_NUM_5
#define CAN_RX_PIN GPIO_NUM_4

void setup() {
    // 1. Read module ID from EEPROM
    ModuleID id = readModuleID();
    
    // 2. Initialize CAN bus
    twai_general_config_t g_config = TWAI_GENERAL_CONFIG_DEFAULT(CAN_TX_PIN, CAN_RX_PIN, TWAI_MODE_NORMAL);
    twai_timing_config_t t_config = TWAI_TIMING_CONFIG_500KBITS();
    twai_filter_config_t f_config = TWAI_FILTER_CONFIG_ACCEPT_ALL();
    
    twai_driver_install(&g_config, &t_config, &f_config);
    twai_start();
    
    // 3. Listen for Hub discovery request
    twai_message_t rx_msg;
    if (twai_receive(&rx_msg, pdMS_TO_TICKS(2000)) == ESP_OK) {
        if (rx_msg.identifier == CAN_ID_DISCOVERY_REQ) {
            // Hub is online, send discovery response
            sendDiscoveryResponse(id);
        }
    }
    
    // 4. Wait for address assignment
    while (assignedAddress == 0) {
        if (twai_receive(&rx_msg, pdMS_TO_TICKS(5000)) == ESP_OK) {
            if (rx_msg.identifier == CAN_ID_ADDRESS_ASSIGN) {
                assignedAddress = rx_msg.data[0];
                Serial.printf("Assigned CAN address: 0x%02X\n", assignedAddress);
            }
        }
    }
    
    // 5. Connect to WiFi and register with Wall Controller
    connectWiFi();
    registerWithWallController(id, assignedAddress);
    
    // 6. Begin normal operation
    startHeartbeat();
    loadDefaultContent();
}

void sendDiscoveryResponse(ModuleID id) {
    twai_message_t tx_msg;
    tx_msg.identifier = CAN_ID_DISCOVERY_RSP;
    tx_msg.data_length_code = 8;
    
    // Pack module type and serial into CAN frame
    tx_msg.data[0] = getModuleTypeEnum(id.moduleType);
    memcpy(&tx_msg.data[1], id.serial, 7);  // Truncate serial to 7 bytes
    
    twai_transmit(&tx_msg, pdMS_TO_TICKS(1000));
}

void startHeartbeat() {
    // Send heartbeat every 5 seconds
    while (true) {
        twai_message_t hb_msg;
        hb_msg.identifier = CAN_ID_HEARTBEAT;
        hb_msg.data_length_code = 4;
        
        uint32_t uptime = millis();
        memcpy(hb_msg.data, &uptime, 4);
        
        twai_transmit(&hb_msg, pdMS_TO_TICKS(100));
        delay(5000);
    }
}
```

---

## Wiring Diagram: Module Edge Connector

```
                    Module PCB (Top View)
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         ┌───────────────────────────────┐              │
│         │      ESP32-S3-WROOM-1         │              │
│         │         (N8R2)                │              │
│         └───────────┬───────────────────┘              │
│                     │                                  │
│         I2C  ───────┤                                  │
│         SDA/SCL     │                                  │
│           │         │                                  │
│      ┌────▼──────┐  │                                  │
│      │  EEPROM   │  │                                  │
│      │  24C02    │  │                                  │
│      │  0x50     │  │                                  │
│      └───────────┘  │                                  │
│                     │                                  │
│         CAN  ───────┤                                  │
│         TX/RX       │                                  │
│           │         │                                  │
│      ┌────▼──────────▼──┐                              │
│      │   SN65HVD230     │                              │
│      │   CAN Transceiver│                              │
│      └────┬──────┬───────┘                             │
│           │      │                                     │
│        CANH    CANL                                    │
│           │      │                                     │
│  ┌────────┴──────┴─────────┐  Power Protection        │
│  │                          │  ┌──────────────┐        │
│  │   Magnetic Pogo Pins     │  │ PTC Fuse     │        │
│  │   (Edge of PCB)          │  │ 2A           │        │
│  │                          │  ├──────────────┤        │
│  │  [1] [2] [3] [4]         │  │ TVS Diode    │        │
│  │   │   │   │   │          │  │ 6.8V         │        │
│  └───┼───┼───┼───┼──────────┘  ├──────────────┤        │
│      │   │   │   │             │ Reverse Pol. │        │
│     +5V GND │   │             │ Protection   │        │
│             │   │             └──────────────┘        │
│           CAN_H CAN_L                                  │
│                                                        │
│  [N52 Neodymium Magnets × 4]                          │
│  Alternating polarity for alignment                    │
└─────────────────────────────────────────────────────────┘
```

---

## BOM: Module Discovery Hardware

| Component | Part Number | Qty | Unit Cost | Purpose |
|-----------|-------------|-----|-----------|---------|
| ESP32-S3-WROOM-1-N8R2 | Espressif | 1 | $4.00 | MCU with CAN controller |
| I2C EEPROM 256B | AT24C02 | 1 | $0.30 | Module ID storage |
| CAN Transceiver | SN65HVD230 | 1 | $1.00 | CAN bus interface |
| PTC Fuse 2A | 0ZCJ0200FF2E | 1 | $0.10 | Overcurrent protection |
| TVS Diode 6.8V | SMBJ6.8A | 1 | $0.10 | Overvoltage protection |
| Reverse Polarity FET | AO3401 P-channel | 1 | $0.20 | Reverse polarity block |
| Schottky Diode | SS14 | 1 | $0.10 | Polarity detection |
| Magnetic Pogo Pins 4-pin | Adafruit #5358 | 1 pair | $2.50 | Edge connector |
| Neodymium Magnets 10x3mm | N52 grade | 4 | $0.20 | Module attachment |
| **Total per module** | | | **$8.50** | Core discovery hardware |

**Note**: This is the *discovery-specific* BOM. Display, LED, audio, etc. are additional.

---

## Testing & Validation

### Discovery Test Cases

1. **Cold boot with 10 modules**
   - All modules discover and register within 15 seconds
   - No address conflicts
   - All modules appear in Wall Controller API

2. **Hot-swap add**
   - Plug in 11th module while system running
   - Module discovers within 5 seconds
   - No CAN errors on other modules

3. **Hot-swap remove**
   - Unplug module #5
   - Hub detects offline within 10 seconds
   - Other modules unaffected

4. **Power cycle hub**
   - Hub reboots, modules stay powered
   - Hub re-discovers all modules on boot
   - Modules retain content/state

5. **CAN bus error recovery**
   - Inject noise on CAN bus (simulate EMI)
   - Verify error frames retransmitted
   - System recovers within 1 second

6. **EEPROM corruption**
   - Module with corrupted EEPROM (invalid magic number)
   - Module boots into safe mode, displays error
   - User can reflash EEPROM via USB

### Acceptance Criteria

- ✅ 100% module discovery rate (no false negatives)
- ✅ <5 second discovery time for hot-swap
- ✅ <10 second offline detection
- ✅ Zero CAN bus errors under normal operation
- ✅ Survives 1000 hot-swap cycles
- ✅ No damage from reverse polarity insertion
- ✅ Safe overcurrent shutdown (PTC fuse trips)

---

## Future Enhancements

### Phase 2+ Features
- **Mesh networking**: Modules relay messages if WiFi weak
- **BLE discovery**: Use BLE for initial setup before WiFi configured
- **NFC tap**: Tap phone to module to configure/update
- **CAN FD**: Upgrade to CAN FD (8 Mbps) for video streaming
- **LoRa**: Long-range low-power option for outdoor walls
- **EEPROM OTA**: Update module ID via OTA (write-protect pin control)

---

## Related Documentation

- **Wall Controller API**: `docs/architecture/WALL-CONTROLLER-API.md` (SACA-62)
- **Power & Connectivity**: `docs/architecture/POWER-CONNECTIVITY.md`
- **System Architecture**: `docs/architecture/ARCHITECTURE.md`
- **ESP32 Firmware**: `docs/architecture/ESP32-FIRMWARE.md` (SACA-64, to be created)

---

**Status**: ✅ Specification Complete — Ready for Firmware Implementation (SACA-63)
