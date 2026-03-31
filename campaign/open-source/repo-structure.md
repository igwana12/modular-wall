# Open-Source Repo Structure — orb-firmware

## Overview

Maps existing firmware/ and hardware/ directories to a publishable GitHub repository. The repo name is `orb-firmware` and will be published under the Sacred Circuits GitHub organization.

---

## Target Repository Layout

```
orb-firmware/                          # GitHub repo name
  README.md                            # From campaign/open-source/README.md
  LICENSE                              # MIT for firmware code
  LICENSE-HARDWARE                     # CERN-OHL-S-2.0 for hardware designs
  LICENSE-ENCLOSURE                    # CC BY-SA 4.0 for 3D printable files
  CONTRIBUTING.md                      # From campaign/open-source/CONTRIBUTING.md
  CHANGELOG.md                         # Release notes (start at v0.1.0)
  firmware/
    oracle-engine/                     # Voice AI oracle (standalone product)
      oracle-engine.ino               # Main sketch
      config.h                        # Configuration defines
      audio_i2s.cpp / .h              # I2S microphone + speaker driver
      ws_client.cpp / .h              # WebSocket client to orb-backend
      wifi_manager.cpp / .h           # WiFi connection management
      wifi_provision.cpp / .h         # Captive portal provisioning
      ota_update.cpp / .h             # Over-the-air firmware updates
    pov-globe/                         # POV LED sphere display (standalone)
      pov-globe.ino                   # Main sketch
      config.h                        # Configuration defines
      led_driver.cpp / .h             # APA102/SK9822 LED control via FastLED
      frame_buffer.cpp / .h           # POV frame buffer management
      hall_sensor.cpp / .h            # Hall effect rotation sync
      motor_control.cpp / .h          # N20 motor PWM control
      image_data.h                    # Default animation frame data
    spirit-sphere/                     # Combined product (oracle-engine + pov-globe)
      spirit-sphere.ino               # Main sketch with FreeRTOS task management
      config.h                        # Unified configuration
      audio_i2s.cpp / .h              # Audio I/O
      audio_task.cpp / .h             # FreeRTOS audio task
      ws_client.cpp / .h              # WebSocket client
      wifi_manager.cpp / .h           # WiFi management
      wifi_provision.cpp / .h         # Captive portal
      ota_update.cpp / .h             # OTA updates
      led_driver.cpp / .h             # LED control
      led_task.cpp / .h               # FreeRTOS LED task
      frame_buffer.cpp / .h           # Frame buffer
      hall_sensor.cpp / .h            # Hall effect sensor
      motor_control.cpp / .h          # Motor control
      state_machine.cpp / .h          # System state management
      status_display.cpp / .h         # LED status indicators
      mute_button.cpp / .h            # Physical mute button handler
      image_data.h                    # Default animation data
  hardware/
    pcb/                               # EasyEDA project files (pending)
      README.md                        # "PCB design coming soon"
    enclosure/                         # 3D printable STL files (pending)
      README.md                        # "STL files coming soon"
    bom/
      bom.md                           # Bill of materials with sourcing links
    wiring/
      wiring-diagram.md               # Complete wiring reference
    battery/
      battery-system.md               # Battery and power management
  docs/
    assembly-guide/                    # Step-by-step build instructions (pending)
      README.md                        # "Assembly guide coming after hardware validation"
    troubleshooting/                   # Common issues and fixes (pending)
      README.md                        # "Troubleshooting guide coming soon"
    architecture.md                    # System architecture overview (to write)
```

---

## File Mapping: Source to Destination

### Firmware Files (12 + 11 + 30 = 53 files)

| Source | Destination | Status | Sanitization Needed |
|--------|------------|--------|---------------------|
| firmware/oracle-engine/oracle-engine.ino | firmware/oracle-engine/oracle-engine.ino | READY | Check for hardcoded IPs/URLs |
| firmware/oracle-engine/config.h | firmware/oracle-engine/config.h | READY | Remove local WiFi credentials, replace with placeholders |
| firmware/oracle-engine/audio_i2s.cpp | firmware/oracle-engine/audio_i2s.cpp | READY | None |
| firmware/oracle-engine/audio_i2s.h | firmware/oracle-engine/audio_i2s.h | READY | None |
| firmware/oracle-engine/ws_client.cpp | firmware/oracle-engine/ws_client.cpp | READY | Check for hardcoded backend URLs |
| firmware/oracle-engine/ws_client.h | firmware/oracle-engine/ws_client.h | READY | None |
| firmware/oracle-engine/wifi_manager.cpp | firmware/oracle-engine/wifi_manager.cpp | READY | None |
| firmware/oracle-engine/wifi_manager.h | firmware/oracle-engine/wifi_manager.h | READY | None |
| firmware/oracle-engine/wifi_provision.cpp | firmware/oracle-engine/wifi_provision.cpp | READY | None |
| firmware/oracle-engine/wifi_provision.h | firmware/oracle-engine/wifi_provision.h | READY | None |
| firmware/oracle-engine/ota_update.cpp | firmware/oracle-engine/ota_update.cpp | READY | Check for hardcoded OTA server URLs |
| firmware/oracle-engine/ota_update.h | firmware/oracle-engine/ota_update.h | READY | None |
| firmware/pov-globe/*.cpp/.h/.ino | firmware/pov-globe/* | READY | None expected |
| firmware/spirit-sphere/*.cpp/.h/.ino | firmware/spirit-sphere/* | READY | Same checks as oracle-engine |

### Hardware Files (4 files)

| Source | Destination | Status | Sanitization Needed |
|--------|------------|--------|---------------------|
| hardware/bom.md | hardware/bom/bom.md | READY | None (public pricing info) |
| hardware/wiring-diagram.md | hardware/wiring/wiring-diagram.md | READY | None |
| hardware/battery-system.md | hardware/battery-system.md | READY | None |
| hardware/enclosure-v1.md | hardware/enclosure/enclosure-v1.md | READY | None |

---

## Publish Readiness

### READY NOW (publish-ready)
- All firmware `.ino`, `.cpp`, `.h` files (53 files across 3 products)
- Hardware documentation: `bom.md`, `wiring-diagram.md`, `battery-system.md`, `enclosure-v1.md`
- Repository scaffolding: `README.md`, `CONTRIBUTING.md`, `LICENSE`

### NOT READY (post-hardware)
- **STL files** -- no 3D prints designed yet (enclosure-v1.md has specs but no CAD)
- **PCB files** -- no EasyEDA/KiCad design yet (wiring diagram exists but no schematic)
- **Assembly guide** -- needs real photos from hardware build
- **Troubleshooting guide** -- needs real-world failure modes
- **Architecture diagram** -- can be written from code but best with real system photos

---

## Sanitization Checklist (run before publish)

Before publishing to GitHub, scan all files for:

1. **WiFi credentials:** `WIFI_SSID`, `WIFI_PASSWORD` -- replace with `"YOUR_SSID"` / `"YOUR_PASSWORD"`
2. **Backend URLs:** Any `192.168.x.x`, `localhost`, or `smithers.local` references -- replace with configurable `BACKEND_HOST` define
3. **API keys:** Any hardcoded keys for AssemblyAI, ElevenLabs, etc. -- should not exist in firmware (keys live in backend)
4. **Local file paths:** Any `/Users/claw2501/` or `/Volumes/` paths -- remove entirely
5. **Debug prints:** Review `Serial.println` calls -- keep useful ones, remove any with sensitive info

### Sanitization Script (to build)
```bash
# Future: create scripts/sanitize.sh that:
# 1. Copies firmware/ and hardware/ to a staging directory
# 2. Runs sed replacements for known patterns
# 3. Outputs clean files ready for git push to public repo
```

---

## Branching Strategy (public repo)

- `main` -- stable, tested firmware releases
- `develop` -- active development, may be broken
- `feature/*` -- individual features/fixes
- Tags: `v0.1.0` (initial release), semantic versioning thereafter

---

## Release Plan

| Version | Contents | Target |
|---------|----------|--------|
| v0.1.0 | Oracle Engine firmware only (voice AI, no LEDs) | Week 12 (open-source launch) |
| v0.2.0 | POV Globe firmware added | Week 8 |
| v0.3.0 | Spirit Sphere combined firmware | Week 4 |
| v1.0.0 | Kickstarter release (stable, tested on hardware) | Launch day |

---

*Created: 2026-03-31*
*Requirement: KS-07 (Open-Source Strategy)*
