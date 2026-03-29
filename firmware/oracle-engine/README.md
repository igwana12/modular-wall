# Oracle Engine Firmware — ESP32-S3

Firmware modules for the Oracle Engine (Spirit Sphere) running on ESP32-S3.

## Modules

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

#define FIRMWARE_VERSION "1.0.0"

void setup() {
    Serial.begin(115200);

    // Connect WiFi first...
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    while (WiFi.status() != WL_CONNECTED) { delay(500); }

    // Initialize OTA
    otaInit("http://192.168.1.100:8300", FIRMWARE_VERSION);

    // Check for update immediately at boot
    otaCheckForUpdate();
}

void loop() {
    // Periodic check (respects OTA_CHECK_INTERVAL_MS internally)
    otaCheckForUpdate();

    // ... rest of your loop
    delay(1000);
}
```

## Board Compatibility

The same code works on:
- **ESP32-S3-BOX-3** (development/demo)
- **ESP32-S3-DevKitC-1** (bare board)
- Any ESP32-S3-WROOM-1 (N16R8) based board

Pin configuration is handled in the main firmware scaffold (Phase 4 Plan 02),
not in individual modules.

## Project Structure

```
firmware/oracle-engine/
  ota_update.h        # OTA update header
  ota_update.cpp      # OTA update implementation
  README.md           # This file
  (main.ino)          # Created in Phase 4 Plan 02 — firmware scaffold
```

## Backend

OTA updates are served by `services/orb-backend/` at port 8300:
- `GET /api/ota/check?version=X.Y.Z` — check for updates
- `GET /api/ota/download` — download firmware binary
- `GET /api/ota/manifest` — view firmware manifest

Place firmware binaries in `services/orb-backend/firmware_bin/` and update
`manifest.json` with the new version, filename, size, and SHA256 hash.
