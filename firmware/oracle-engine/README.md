# Oracle Engine Firmware — ESP32-S3

Firmware modules for the Oracle Engine (Spirit Sphere) running on ESP32-S3.

## Modules

### WiFi Provisioning (`wifi_provision.h` / `wifi_provision.cpp`)

Captive portal WiFi provisioning for consumer devices. Users connect to the
device's AP from a phone, get redirected to a setup page, enter WiFi credentials
and server URL, and the device reboots connected. Credentials persist in NVS
flash across reboots and firmware updates.

**Dependencies (all built-in with Arduino ESP32 Core 3.x):**
- WiFi.h
- WebServer.h
- DNSServer.h
- Preferences.h

**Usage:**

```cpp
#include "wifi_provision.h"

void setup() {
    Serial.begin(115200);

    // Initialize provisioning (reads stored credentials from NVS)
    wifiProvisionInit();

    // Try connecting with stored credentials (15s timeout)
    if (!wifiProvisionConnect(15000)) {
        // No credentials or connection failed — start captive portal
        // This blocks until user submits credentials, then reboots
        wifiProvisionPortal();
    }

    // Connected! Continue with OTA, WebSocket, etc.
    Serial.printf("IP: %s\n", WiFi.localIP().toString().c_str());
}
```

**Captive Portal Flow:**
1. Device creates AP named `OracleEngine-XXXX` (last 4 hex of MAC)
2. User connects to AP from phone
3. Phone auto-opens portal (DNS redirect to 192.168.4.1)
4. User selects WiFi network (scan or manual entry), enters password
5. Optionally configure server URL and default deity
6. Device saves to NVS flash, reboots, connects to WiFi

**Factory Reset WiFi:** Call `wifiProvisionClear()` to erase stored credentials
and force captive portal on next boot.

### OTA Update (`ota_update.h` / `ota_update.cpp`)

Over-the-air firmware update module. Checks the orb-backend server for newer
firmware versions and self-flashes over WiFi.

**Dependencies:**
- WiFi.h (built-in)
- HTTPClient.h (built-in)
- HTTPUpdate.h (Arduino ESP32 Core 3.x)
- ArduinoJson 7.x

**Usage:**

```cpp
#include "ota_update.h"

void setup() {
    // After WiFi connected...
    otaInit("http://192.168.1.100:8300", FIRMWARE_VERSION);
    otaCheckForUpdate();
}

void loop() {
    // Periodic check (respects OTA_CHECK_INTERVAL_MS internally)
    otaCheckForUpdate();
}
```

## Multi-Board Compilation

The firmware supports multiple ESP32-S3 boards via compile-time `BOARD_TYPE`
selection in `config.h`. Pin mappings and hardware differences are handled
automatically.

### Supported Boards

| Board | BOARD_TYPE | Notes |
|-------|-----------|-------|
| ESP32-S3-DevKitC-1 + INMP441 + MAX98357A | `BOARD_DEVKITC1` (default) | Bare board with external mic + amp |
| ESP32-S3-BOX-3 | `BOARD_BOX3` | Built-in mic + speaker (ES7210/ES8311 codecs) |

### Compilation

**Default (DevKitC-1):** No extra flags needed — `BOARD_TYPE` defaults to
`BOARD_DEVKITC1`.

**BOX-3:** Pass compiler flag:
```
-DBOARD_TYPE=BOARD_BOX3
```

In Arduino IDE, add to "Additional compiler flags" or edit `config.h` directly:
```cpp
#define BOARD_TYPE BOARD_BOX3
```

### Pin Mappings

**DevKitC-1 (BOARD_DEVKITC1):**
| Function | GPIO | Notes |
|----------|------|-------|
| I2S Mic SCK | 5 | INMP441 BCK |
| I2S Mic WS | 6 | INMP441 LRCK |
| I2S Mic SD | 7 | INMP441 DOUT |
| I2S Spk SCK | 12 | MAX98357A BCK |
| I2S Spk WS | 13 | MAX98357A LRCK |
| I2S Spk SD | 14 | MAX98357A DIN |
| LED | 2 | Built-in LED |
| PTT Button | 0 | BOOT button |

**BOX-3 (BOARD_BOX3):**
| Function | GPIO | Notes |
|----------|------|-------|
| I2S BCK | 41 | Shared mic+speaker |
| I2S LRCK | 42 | Shared mic+speaker |
| I2S Mic SD | 2 | ES7210 ADC data in |
| I2S Spk SD | 15 | ES8311 DAC data out |
| I2C SDA | 8 | Codec control |
| I2C SCL | 18 | Codec control |
| PTT Button | 0 | BOOT button |

## All Module Dependencies

| Library | Source | Used By |
|---------|--------|---------|
| WiFi.h | Built-in | wifi_provision, wifi_manager, ota_update |
| WebServer.h | Built-in | wifi_provision |
| DNSServer.h | Built-in | wifi_provision |
| Preferences.h | Built-in | wifi_provision |
| HTTPClient.h | Built-in | ota_update |
| HTTPUpdate.h | Arduino ESP32 Core 3.x | ota_update |
| ArduinoJson 7.x | Library Manager | ota_update, ws_client |
| WebSockets (Markus Sattler) | Library Manager | ws_client |

All built-in libraries ship with Arduino ESP32 Core 3.x. Only ArduinoJson and
WebSockets need manual installation via Arduino Library Manager.

## Board Compatibility

The same code works on:
- **ESP32-S3-BOX-3** (development/demo)
- **ESP32-S3-DevKitC-1** (bare board)
- Any ESP32-S3-WROOM-1 (N16R8) based board

Pin configuration is selected via `BOARD_TYPE` in `config.h`.

## Project Structure

```
firmware/oracle-engine/
  oracle-engine.ino   # Main firmware (state machine, PTT, WebSocket voice AI)
  config.h            # Shared configuration, pin defs, board selection
  wifi_provision.h    # WiFi provisioning header
  wifi_provision.cpp  # Captive portal WiFi provisioning
  wifi_manager.h      # Simple WiFi connect/reconnect
  wifi_manager.cpp    # WiFi manager implementation
  audio_i2s.h         # I2S audio capture/playback header
  audio_i2s.cpp       # I2S audio implementation
  ota_update.h        # OTA update header
  ota_update.cpp      # OTA update implementation
  ws_client.h         # WebSocket client header
  ws_client.cpp       # WebSocket client implementation
  README.md           # This file
```

## Backend

OTA updates are served by `services/orb-backend/` at port 8300:
- `GET /api/ota/check?version=X.Y.Z` — check for updates
- `GET /api/ota/download` — download firmware binary
- `GET /api/ota/manifest` — view firmware manifest

Place firmware binaries in `services/orb-backend/firmware_bin/` and update
`manifest.json` with the new version, filename, size, and SHA256 hash.
