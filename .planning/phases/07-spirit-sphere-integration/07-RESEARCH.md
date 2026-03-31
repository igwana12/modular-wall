# Phase 7: Spirit Sphere Integration - Research

**Researched:** 2026-03-31
**Domain:** ESP32-S3 dual-core firmware integration, hardware assembly, 3D-printed enclosure, battery management
**Confidence:** MEDIUM (firmware integration patterns are well-documented; physical assembly requires hands-on iteration)

## Summary

Phase 7 merges two independently-developed firmware subsystems -- Oracle Engine (voice AI on Core 0) and POV Globe (LED display on Core 1) -- into a single unified firmware running on one ESP32-S3. The critical finding is that there is **no I2S peripheral conflict** between audio and LEDs: audio uses I2S_NUM_0 and I2S_NUM_1 (the ESP32-S3's two dedicated I2S peripherals), while APA102 LEDs use hardware SPI (SPI2/SPI3 via GDMA), which is an entirely separate peripheral bus. This is the most favorable architecture possible for dual-core split.

The primary risks are: (1) shared memory/PSRAM contention under load, (2) WiFi interrupts on Core 0 causing audio glitches during heavy LED DMA, and (3) physical integration challenges (slip ring reliability, cable routing, balance). The firmware merge itself is straightforward -- both subsystems are already modularized with clean header interfaces. The main engineering work is FreeRTOS task creation, inter-core state signaling, and the physical enclosure/power system.

**Primary recommendation:** Merge firmware first on bench (no enclosure), validate 10-minute dual-core stability, then design enclosure around proven electronics layout.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- ESP32-S3-BOX-3 as primary dev platform (built-in mic, speaker, WiFi, 320x240 touchscreen)
- Arduino IDE 2.x with Arduino ESP32 Core 3.x
- I2S for all audio (digital path, no analog ADC)
- Core 0: audio pipeline (I2S capture, WebSocket, TTS playback)
- Core 1: LED POV display (FastLED DMA, Hall ISR, frame buffer)
- No resource contention between tracks
- PCM 16-bit 16kHz mono as audio format (no Opus for v1)
- orb-backend /ws/sphere WebSocket endpoint (implemented in Phase 4)
- AssemblyAI STT -> Claude LLM -> ElevenLabs TTS (existing pipeline)
- APA102/SK9822 LEDs, FastLED DMA on Core 1
- N20 motor (3-5 RPM), Hall effect sensor for position sync
- BGR color order
- Captive portal for WiFi provisioning (setup <10 min)
- OTA firmware updates served from orb-backend

### Claude's Discretion
- Firmware merge structure: new unified spirit-sphere.ino with shared headers (recommended)
- Hardware build order: electronics-first (bench rig), then enclosure (recommended)
- BOX-3 display use: simple status overlay (deity name, listening/thinking/speaking state)
- Demo scenario: single deity (Zeus) continuous conversation with POV animation
- Deity POV animation: use existing Python equirectangular converter with deity symbol image

### Deferred Ideas (OUT OF SCOPE)
- Multi-deity switching (speak deity name -> sphere shifts color + voice) -- Phase 8+
- Full companion web app beyond setup page -- SPHERE-V2-02
- Personal RAG from Obsidian vault -- SPHERE-V2-03
- Wireless charging dock -- SPHERE-V2-04
- 21 deity animations (launch with 1, expand post-Kickstarter) -- SPHERE-V2-01
- Touchscreen full UI -- Phase 8+
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SPHERE-01 | Voice AI + POV display running simultaneously on one ESP32-S3 | Audio uses I2S peripherals, LEDs use SPI -- no bus conflict. FreeRTOS xTaskCreatePinnedToCore splits workload. Verified architecture. |
| SPHERE-02 | Core 0 handles audio, Core 1 handles LEDs (no conflicts) | ESP32-S3 has 10 independent GDMA channels. I2S0/I2S1 for audio, SPI2 for LEDs. Separate DMA paths. |
| SPHERE-03 | 3D printed enclosure (base + sphere mount) with 4-6 iteration budget | Iterative approach: measure bench rig, design in Fusion 360/Onshape, print PLA prototypes. |
| SPHERE-04 | Battery powered (3x 18650 Li-ion) with USB-C charging pass-through | 3S BMS boards with USB-C available. Pass-through charging confirmed viable. Buck converter to 5V/3.3V. |
| SPHERE-05 | At least 1 deity avatar animation displayed on POV | Existing image-to-pov.py converter handles equirectangular -> frame data. Generate Zeus lightning bolt art. |
| SPHERE-06 | Physical mic mute button with LED indicator | GPIO + INPUT_PULLUP + software debounce (50ms). LED via 220ohm resistor. Simple implementation. |
| SPHERE-07 | Reliable 10-minute demo capability | Stress test: heap monitoring, watchdog timers, WiFi reconnect, ring buffer overflow protection. |
| SPHERE-08 | OTA firmware update mechanism | Already implemented in Phase 5 (ota_update.h/.cpp). Carry forward into unified firmware. |
| SPHERE-09 | WiFi provisioning via BLE or captive portal (setup <10 min) | Already implemented in Phase 5 (wifi_provision.h/.cpp). Carry forward into unified firmware. |
</phase_requirements>

## Standard Stack

### Core (already in project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Arduino ESP32 Core | 3.x | ESP32-S3 framework | Locked decision from Phase 4. Includes ESP-IDF 5.x, FreeRTOS built-in. |
| FastLED | 3.9+ | APA102 LED control | Already used in Phase 6. Hardware SPI mode for APA102 is compatible with Core 3.x. |
| ArduinoWebSockets | latest | WebSocket client | Already used in Phase 4 for orb-backend communication. |
| ArduinoJson | 7.x | JSON parsing | Already used in Phase 4 for WebSocket protocol messages. |

### Supporting (new for Phase 7)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| FreeRTOS (built-in) | n/a | Task management, queues, semaphores | Core dual-core split. No separate install needed -- ships with Arduino ESP32 Core. |

### Hardware Components (new for Phase 7)
| Component | Spec | Purpose | Source |
|-----------|------|---------|--------|
| Slip ring | 6-wire, 2A, 240V | Power + SPI data to rotating LEDs | Adafruit #736 or SparkFun equivalent |
| 3S BMS board | USB-C, 2-4A charge | Battery management for 3x 18650 | Amazon/AliExpress (Type C BMS 3S) |
| Buck converter | 12V -> 5V, 3A+ | Power 5V rail (LEDs + ESP32) | LM2596 or MP1584 module |
| 3.3V LDO | 3.3V, 500mA | ESP32-S3 power (if not via USB) | AMS1117-3.3 |
| Momentary button | SPST, normally open | Mic mute (SPHERE-06) | Any tactile switch |
| LED (red/green) | 3mm or 5mm | Mute status indicator (SPHERE-06) | Standard through-hole |
| 18650 cells | 3x, matched capacity | Battery pack (SPHERE-04) | Samsung 25R or Sony VTC6 |

**Installation (firmware):**
All Arduino libraries already installed from Phases 4-6. No new library dependencies.

## Architecture Patterns

### Recommended Project Structure
```
firmware/
  spirit-sphere/
    spirit-sphere.ino       # Unified main sketch (FreeRTOS task creation)
    config.h                # Merged pin definitions + board targets
    audio_task.h/.cpp       # Core 0: audio pipeline (from oracle-engine)
    led_task.h/.cpp         # Core 1: POV display (from pov-globe)
    state_machine.h/.cpp    # Shared state (FreeRTOS queue/semaphore)
    audio_i2s.h/.cpp        # Carried from oracle-engine (unchanged)
    ws_client.h/.cpp        # Carried from oracle-engine (unchanged)
    wifi_manager.h/.cpp     # Carried from oracle-engine (unchanged)
    wifi_provision.h/.cpp   # Carried from oracle-engine/Phase 5 (unchanged)
    ota_update.h/.cpp       # Carried from oracle-engine/Phase 5 (unchanged)
    led_driver.h/.cpp       # Carried from pov-globe (unchanged)
    hall_sensor.h/.cpp      # Carried from pov-globe (unchanged)
    frame_buffer.h/.cpp     # Carried from pov-globe (unchanged)
    motor_control.h/.cpp    # Carried from pov-globe (unchanged)
    image_data.h            # Generated by image-to-pov.py (deity animation)
    mute_button.h/.cpp      # New: GPIO mute with LED indicator
    status_display.h/.cpp   # New: BOX-3 touchscreen status overlay
scripts/
  image-to-pov.py           # Existing equirectangular converter
```

### Pattern 1: FreeRTOS Dual-Core Task Split
**What:** Pin audio pipeline to Core 0, LED rendering to Core 1 using xTaskCreatePinnedToCore.
**When to use:** Always -- this is the fundamental architecture for SPHERE-01/02.
**Example:**
```cpp
// In spirit-sphere.ino setup()
void setup() {
    Serial.begin(115200);

    // Shared state initialization
    stateQueue = xQueueCreate(10, sizeof(SphereEvent));
    audioMutex = xSemaphoreCreateMutex();

    // Core 0: Audio pipeline (WiFi also runs on Core 0)
    xTaskCreatePinnedToCore(
        audioTask,         // Task function
        "AudioTask",       // Name
        8192,              // Stack size (bytes) -- WiFi/WebSocket needs large stack
        NULL,              // Parameters
        2,                 // Priority (above idle=0, above WiFi=1)
        &audioTaskHandle,  // Task handle
        0                  // Core 0
    );

    // Core 1: LED POV display
    xTaskCreatePinnedToCore(
        ledTask,           // Task function
        "LEDTask",         // Name
        4096,              // Stack size -- LED rendering is lighter
        NULL,              // Parameters
        3,                 // Priority (highest -- time-critical POV)
        &ledTaskHandle,    // Task handle
        1                  // Core 1
    );
}

// Arduino loop() becomes minimal -- just serial commands and heartbeat
void loop() {
    handleSerialCommands();
    heartbeat();
    vTaskDelay(pdMS_TO_TICKS(10));
}
```

### Pattern 2: Inter-Core State Communication via FreeRTOS Queue
**What:** Use a queue to send state events (deity change, animation trigger, mute) between cores.
**When to use:** When audio events should trigger LED changes (e.g., "speaking" state triggers deity animation).
**Example:**
```cpp
// state_machine.h
enum SphereEventType {
    EVT_STATE_CHANGE,      // Oracle state changed (idle/listening/processing/speaking)
    EVT_DEITY_CHANGED,     // New deity selected
    EVT_MUTE_TOGGLE,       // Mic mute toggled
    EVT_ANIMATION_TRIGGER  // Trigger specific POV animation
};

struct SphereEvent {
    SphereEventType type;
    uint8_t data;          // State value or animation index
};

extern QueueHandle_t stateQueue;

// Audio task sends events:
SphereEvent evt = { EVT_STATE_CHANGE, STATE_SPEAKING };
xQueueSend(stateQueue, &evt, 0);  // Non-blocking send

// LED task receives events:
SphereEvent evt;
if (xQueueReceive(stateQueue, &evt, 0) == pdTRUE) {
    switch (evt.type) {
        case EVT_STATE_CHANGE:
            updateStatusDisplay(evt.data);
            if (evt.data == STATE_SPEAKING) triggerDeityAnimation();
            break;
    }
}
```

### Pattern 3: Mute Button with Debounce and LED Indicator
**What:** GPIO interrupt for mute button with software debounce and visual feedback.
**When to use:** SPHERE-06 implementation.
**Example:**
```cpp
// mute_button.h
#define MUTE_BUTTON_PIN  GPIO_NUM_X   // Pick available GPIO
#define MUTE_LED_PIN     GPIO_NUM_Y   // Mute indicator LED
#define DEBOUNCE_MS      50

volatile bool mutePressed = false;
volatile unsigned long lastMuteChange = 0;

void IRAM_ATTR muteISR() {
    unsigned long now = millis();
    if (now - lastMuteChange > DEBOUNCE_MS) {
        mutePressed = !mutePressed;
        lastMuteChange = now;
        digitalWrite(MUTE_LED_PIN, mutePressed ? HIGH : LOW);
    }
}

void mute_init() {
    pinMode(MUTE_BUTTON_PIN, INPUT_PULLUP);
    pinMode(MUTE_LED_PIN, OUTPUT);
    attachInterrupt(MUTE_BUTTON_PIN, muteISR, FALLING);
}
```

### Anti-Patterns to Avoid
- **Using delay() in tasks:** Use vTaskDelay(pdMS_TO_TICKS(ms)) instead. delay() blocks the entire core, preventing FreeRTOS scheduling.
- **Sharing variables without protection:** Even with core pinning, use volatile for flags read by both cores. Use mutexes for complex shared structures.
- **Running WebSocket on Core 1:** WiFi stack runs on Core 0. WebSocket must be on Core 0 to avoid cross-core WiFi access overhead and potential crashes.
- **Large stack allocations in LED task:** Frame buffer (13KB) should be global/static, not stack-allocated. LED task stack of 4096 is sufficient for rendering logic only.
- **Calling FastLED.show() from both cores:** FastLED is not thread-safe. Only the LED task on Core 1 should ever call show().

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dual-core task management | Custom core switching | FreeRTOS xTaskCreatePinnedToCore | Built into ESP32 Arduino Core, battle-tested, handles all scheduling |
| Inter-core messaging | Shared volatile flags with polling | FreeRTOS xQueueSend/xQueueReceive | Thread-safe, interrupt-safe, no busy-waiting |
| Resource locking | Custom spinlocks | FreeRTOS xSemaphoreCreateMutex | Priority inheritance prevents deadlocks |
| Image-to-POV conversion | Manual pixel mapping | Existing scripts/image-to-pov.py | Already built in Phase 6, handles equirectangular projection |
| Battery management | Custom charge circuit | Off-the-shelf 3S BMS + USB-C module | Safety-critical -- balancing, overcharge, overdischarge protection |
| WiFi provisioning | Custom portal | Existing wifi_provision.h/.cpp | Already built and tested in Phase 5 |
| OTA updates | Custom update mechanism | Existing ota_update.h/.cpp | Already built and tested in Phase 5 |

**Key insight:** Phase 7 is primarily an integration phase. Almost all code modules exist from Phases 4-6. The new code is limited to: (1) FreeRTOS task wrappers, (2) state machine/queue, (3) mute button handler, (4) status display, and (5) merged config.h. Physical assembly is the bigger challenge.

## Common Pitfalls

### Pitfall 1: FastLED I2S vs Audio I2S Confusion
**What goes wrong:** Developer assumes FastLED's "I2S DMA" mode conflicts with audio I2S peripherals, leading to unnecessary redesign.
**Why it happens:** FastLED docs reference "I2S DMA" for WS2812B (clockless LEDs). APA102 uses hardware SPI, which is a completely different peripheral bus.
**How to avoid:** Current firmware already uses `FastLED.addLeds<APA102, DATA_PIN, CLOCK_PIN, BGR>` which routes through SPI2/SPI3, not I2S. Do NOT enable FASTLED_ESP32_I2S for APA102 -- it's only for clockless LEDs. The defines in pov-globe/config.h (`FASTLED_ESP32_I2S true`) are vestigial and should be removed or verified.
**Warning signs:** Compile warnings about I2S peripheral conflicts; audio dropout when LEDs refresh.

### Pitfall 2: WiFi Stack Interference
**What goes wrong:** WiFi events (beacon processing, TCP retransmit) on Core 0 cause brief audio glitches.
**Why it happens:** WiFi stack runs as a high-priority task on Core 0. If audio task priority is equal or lower, WiFi can preempt audio playback.
**How to avoid:** Set audio task priority to 2 (above WiFi's default 1). Use ring buffer with sufficient depth (8KB minimum, already implemented). WiFi reconnect should be in a separate low-priority task.
**Warning signs:** Periodic audio pops/clicks every few seconds; worse when WiFi signal is weak.

### Pitfall 3: Heap Fragmentation Over Time
**What goes wrong:** After 5-10 minutes of operation, WebSocket reconnects and JSON parsing exhaust free heap, causing crashes.
**Why it happens:** ArduinoJson dynamic allocation + WebSocket frame buffers + String concatenation fragment the heap.
**How to avoid:** Monitor free heap in heartbeat (already implemented). Use StaticJsonDocument where possible. Pre-allocate WebSocket receive buffer. Set watchdog timer. Target: free heap never drops below 40KB.
**Warning signs:** ESP.getFreeHeap() trends downward across heartbeats; heap drops below 50KB.

### Pitfall 4: Slip Ring Signal Degradation
**What goes wrong:** SPI clock/data signals degrade through cheap slip ring contacts, causing LED flickering or data corruption.
**Why it happens:** Slip rings introduce contact resistance and noise. SPI at 12MHz is aggressive for a mechanical contact.
**How to avoid:** Reduce SPI speed for slip ring path (4-6MHz is safer). Use 6-wire slip ring: VCC, GND, CLK, DATA, plus 2 spare. Keep slip ring wires short. Consider adding 100ohm series termination resistors on CLK and DATA.
**Warning signs:** Random LED color flashes; intermittent pixel corruption that changes with rotation speed.

### Pitfall 5: 3S Battery Voltage vs ESP32 Input
**What goes wrong:** 3S Li-ion pack outputs 9.0V (empty) to 12.6V (full). Feeding this directly to ESP32 or LEDs destroys them.
**Why it happens:** ESP32-S3 max input is 3.6V; APA102 LEDs are 5V nominal.
**How to avoid:** Buck converter (LM2596 or MP1584) steps 3S voltage down to 5V. APA102 runs on 5V rail. ESP32 runs on 3.3V from its onboard regulator (USB path) or a dedicated 3.3V LDO from the 5V rail. Never connect 3S directly to anything.
**Warning signs:** Magic smoke. Test with bench power supply first.

### Pitfall 6: Motor Vibration Causes Audio Feedback
**What goes wrong:** N20 motor vibration transfers through enclosure to microphone, creating background noise or feedback loop.
**Why it happens:** Motor, mic, and speaker share the same physical enclosure.
**How to avoid:** Mount mic on stationary base with rubber dampers. Add foam isolation between motor mount and base. Measure mic RMS with motor running vs stopped -- difference should be <10%. Consider software noise gate if mechanical isolation is insufficient.
**Warning signs:** Elevated RMS readings when motor is running; echo or ringing in transcriptions.

## Code Examples

### Unified config.h Pin Allocation (Merged)
```cpp
// spirit-sphere/config.h — Merged from oracle-engine + pov-globe

// --- Audio I2S (Core 0) — uses I2S_NUM_0 + I2S_NUM_1 ---
// (Same pins as oracle-engine/config.h)
#ifdef TARGET_BOX3
  #define I2S_MIC_SCK   41
  #define I2S_MIC_WS    42
  #define I2S_MIC_SD    2
  #define I2S_SPK_SCK   41
  #define I2S_SPK_WS    42
  #define I2S_SPK_SD    15
#endif

// --- LED SPI (Core 1) — uses SPI2 (HSPI) ---
// NOTE: GPIO 12 conflict! Oracle-engine DEVKIT uses GPIO 12 for I2S_SPK_SCK.
// POV-globe uses GPIO 12 for CLOCK_PIN. For BOX-3 target this is fine
// (BOX-3 audio uses GPIO 41/42). For DEVKIT target, reassign LED clock.
#define LED_DATA_PIN    11   // SPI MOSI (GPIO 11)
#define LED_CLOCK_PIN   12   // SPI SCK (GPIO 12) — verify no conflict with target
#define NUM_LEDS        36
#define NUM_COLUMNS     120

// --- Hall Sensor ---
#define HALL_PIN        4

// --- Motor ---
#define MOTOR_PIN       5

// --- Mute Button (SPHERE-06) ---
#define MUTE_BUTTON_PIN 39   // Pick available GPIO on BOX-3 (GPIO 39-42 are available)
#define MUTE_LED_PIN    40   // Mute indicator LED
```

### Audio Task Wrapper (Core 0)
```cpp
// audio_task.cpp
void audioTask(void* param) {
    // Initialize audio subsystems (these were in oracle-engine setup())
    audio_init();
    wifi_connect_or_provision();  // Captive portal from Phase 5
    ws_connect(WS_HOST, WS_PORT, WS_PATH);
    otaInit(OTA_SERVER_DEFAULT, FIRMWARE_VERSION);

    int16_t audioBuffer[AUDIO_BUFFER_SIZE];

    while (true) {
        // Check mute state
        if (mutePressed) {
            vTaskDelay(pdMS_TO_TICKS(100));
            continue;
        }

        // Run WebSocket event loop
        ws_loop();

        // State machine (from oracle-engine loop)
        switch (currentState) {
            case STATE_LISTENING:
                captureAndStreamAudio(audioBuffer);
                break;
            case STATE_SPEAKING:
                playbackFromRingBuffer(audioBuffer);
                break;
            // ... other states
        }

        // Send state change events to LED task
        if (stateChanged) {
            SphereEvent evt = { EVT_STATE_CHANGE, currentState };
            xQueueSend(stateQueue, &evt, 0);
        }

        // OTA check (rate-limited internally)
        otaCheckForUpdate();

        vTaskDelay(pdMS_TO_TICKS(1));  // Yield to WiFi stack
    }
}
```

### LED Task Wrapper (Core 1)
```cpp
// led_task.cpp
void ledTask(void* param) {
    // Initialize LED subsystems (these were in pov-globe setup())
    led_init();
    hall_init();
    frame_init();
    frame_load(FRAME_DATA, FRAME_DATA_LEN);  // Deity animation
    motor_init();
    motor_ramp(TARGET_RPM, MOTOR_RAMP_MS);

    uint16_t lastColumn = 0;
    bool animationActive = false;

    while (true) {
        // Check for state events from audio task
        SphereEvent evt;
        while (xQueueReceive(stateQueue, &evt, 0) == pdTRUE) {
            if (evt.type == EVT_STATE_CHANGE && evt.data == STATE_SPEAKING) {
                animationActive = true;
            } else if (evt.type == EVT_STATE_CHANGE && evt.data == STATE_READY) {
                animationActive = false;
            }
        }

        // POV column rendering (from pov-globe loop())
        uint32_t period = hall_get_period_us();
        if (period == 0 || period > HALL_TIMEOUT_US) {
            led_clear();
            vTaskDelay(pdMS_TO_TICKS(10));
            continue;
        }

        if (animationActive) {
            renderPOVColumn(period, &lastColumn);
        } else {
            // Idle animation: slow color pulse or static logo
            renderIdlePattern();
        }

        // Tight timing for POV -- minimal or no delay
        uint32_t columnDelay = period / COLUMNS_EFFECTIVE;
        if (columnDelay > 50) {
            delayMicroseconds(columnDelay - 50);
        }
    }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| FastLED I2S DMA for all LED types | Hardware SPI for APA102, I2S only for WS2812B | FastLED 3.9+ | APA102 uses SPI peripheral, no I2S conflict with audio |
| Arduino loop() for everything | FreeRTOS tasks with core pinning | Always available on ESP32 | Enables true parallel execution of audio + LEDs |
| Single-file Arduino sketches | Modular .h/.cpp with shared headers | Project convention | Both Phase 4 and Phase 6 already use this pattern |

## Open Questions

1. **FastLED config.h defines**
   - What we know: pov-globe/config.h defines `FASTLED_ESP32_I2S true` and `FASTLED_ESP32_I2S_NUM_DMA_BUFFERS 4`. For APA102 (SPI), these may be ignored by FastLED.
   - What's unclear: Whether these defines cause FastLED to claim an I2S peripheral even when using SPI mode with APA102.
   - Recommendation: Remove or guard these defines in unified config. Test with and without -- if removing causes no behavior change, they were vestigial.

2. **GPIO 12 Pin Conflict**
   - What we know: POV globe uses GPIO 12 as LED_CLOCK_PIN. Oracle engine DEVKIT target uses GPIO 12 for I2S_SPK_SCK.
   - What's unclear: Whether BOX-3 target avoids this conflict (BOX-3 uses GPIO 41/42 for I2S).
   - Recommendation: For BOX-3 build, no conflict. For future DEVKIT build, reassign LED clock to another GPIO (e.g., GPIO 16 or 17).

3. **BOX-3 Available GPIOs for Mute Button**
   - What we know: BOX-3 has GPIO 0 (BOOT), and exposes some GPIOs on its expansion header.
   - What's unclear: Exact GPIO availability on BOX-3 expansion connector for mute button + LED.
   - Recommendation: Check BOX-3 schematic for available GPIOs. Worst case, reuse BOOT button (GPIO 0) as mute toggle (already configured as PTT in Phase 4).

4. **ESP32-S3-BOX-3 Physical Integration**
   - What we know: BOX-3 is a self-contained dev board with its own enclosure. The Spirit Sphere needs external LEDs, motor, and slip ring.
   - What's unclear: How to physically integrate BOX-3 into a custom enclosure while maintaining access to its expansion ports.
   - Recommendation: For prototype, BOX-3 sits in the base connected via wires to slip ring + motor assembly. No need to disassemble BOX-3.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Arduino IDE 2.x | Firmware compilation | Verify on machine | -- | Install from arduino.cc |
| Arduino ESP32 Core | ESP32-S3 support | Verify in Arduino IDE | 3.x required | Board Manager install |
| FastLED | LED control | Verify in Arduino IDE | 3.9+ required | Library Manager install |
| ArduinoWebSockets | WebSocket client | Installed in Phase 4 | latest | Library Manager |
| ArduinoJson | JSON parsing | Installed in Phase 4 | 7.x | Library Manager |
| Python 3 + Pillow + numpy | image-to-pov.py | Verify | 3.x | pip install Pillow numpy |
| orb-backend | Voice AI pipeline | Running at :8300 | -- | Start with services/orb-backend/start.sh |
| 3D Printer (or service) | Enclosure printing | User dependent | -- | Outsource to 3D printing service |
| Soldering iron | Hardware assembly | User dependent | -- | Required for slip ring, battery wiring |

**Missing dependencies with no fallback:**
- Physical hardware components (ESP32-S3-BOX-3, APA102 strips, slip ring, motor, 18650 cells, BMS) must be procured. Note from STATE.md: "Hardware verification deferred -- ESP32-S3-BOX-3 not available for physical testing."

**Missing dependencies with fallback:**
- 3D printer: can outsource to online printing service (JLCPCB, Shapeways, local makerspace)
- Soldering: slip ring connections can use screw terminals if available on the slip ring model

## Sources

### Primary (HIGH confidence)
- ESP32-S3 firmware source: `firmware/oracle-engine/` and `firmware/pov-globe/` -- direct code inspection
- ESP32-S3 I2S docs: https://docs.espressif.com/projects/esp-idf/en/stable/esp32s3/api-reference/peripherals/i2s.html
- ESP32-S3 GDMA architecture: ESP32-S3 datasheet (10 independent GDMA channels for SPI, I2S, etc.)
- FastLED ESP32-S3 README: https://github.com/FastLED/FastLED/blob/master/src/platforms/esp/32/README.md -- hardware SPI is default for APA102
- Mercator POV sphere reference: https://mdwdotla.medium.com/mercator-an-esp32-based-spherical-persistence-of-vision-display-a4beff4f826e

### Secondary (MEDIUM confidence)
- FreeRTOS dual-core patterns: https://randomnerdtutorials.com/esp32-dual-core-arduino-ide/
- FreeRTOS queues: https://randomnerdtutorials.com/esp32-freertos-queues-inter-task-arduino/
- Slip ring specs: https://www.adafruit.com/product/736 (Adafruit 6-wire, 2A)
- 3S BMS with USB-C: https://forum.core-electronics.com.au/t/usb-c-charging-module-for-3s-li-ion-18650-battery-pack/22056
- FastLED I2S issue (not applicable to APA102 SPI but informative): https://github.com/FastLED/FastLED/issues/2136

### Tertiary (LOW confidence)
- BOX-3 GPIO availability for mute button -- needs schematic verification
- Slip ring SPI signal integrity at 12MHz -- needs bench testing, may require speed reduction

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already used in Phases 4-6, no new dependencies
- Architecture (firmware): HIGH - dual-core FreeRTOS is well-documented, peripheral buses are independent
- Architecture (physical): MEDIUM - enclosure design is iterative, slip ring reliability unknown until tested
- Pitfalls: MEDIUM - firmware pitfalls well-known, physical integration pitfalls based on community reports

**Research date:** 2026-03-31
**Valid until:** 2026-05-01 (stable domain, hardware specs don't change)
