/**
 * Spirit Sphere Unified Firmware v1.0.0
 *
 * Merges Oracle Engine (Phase 4-5) and POV Globe (Phase 6) into
 * a single dual-core FreeRTOS application for the Spirit Sphere.
 *
 * Architecture:
 *   Core 0 — Audio pipeline: WiFi, WebSocket, I2S mic/speaker,
 *            PTT state machine, OTA updates, mute integration
 *   Core 1 — LED pipeline: POV rendering, Hall sensor sync,
 *            motor control, state-driven animations
 *
 * Inter-core communication via FreeRTOS queue (state_machine.h).
 * Mute button GPIO with ISR debounce (mute_button.h).
 *
 * Hardware targets:
 *   - ESP32-S3-BOX-3 (default): built-in mic/speaker, external LED arm
 *   - ESP32-S3-DevKitC-1: INMP441 mic + MAX98357A amp + LED arm
 *
 * Part of The Orb project (Sacred Circuits).
 */

#include "config.h"
#include "state_machine.h"
#include "mute_button.h"
#include "status_display.h"
#include "audio_task.h"
#include "led_task.h"

// ============================================================
// Serial command buffer
// ============================================================
static String serialCmd = "";

// ============================================================
// Timing
// ============================================================
static unsigned long lastHeartbeat = 0;

// ============================================================
// Setup
// ============================================================
void setup() {
    Serial.begin(SERIAL_BAUD);
    vTaskDelay(pdMS_TO_TICKS(500));  // Let serial settle

    // Print boot banner
    Serial.println();
    Serial.println("================================================");
    Serial.printf("  Spirit Sphere v%s booting...\n", FIRMWARE_VERSION);
#ifdef TARGET_BOX3
    Serial.println("  Target: ESP32-S3-BOX-3");
#elif defined(TARGET_DEVKIT)
    Serial.println("  Target: ESP32-S3-DevKitC-1");
#endif
    Serial.println("  Architecture: Dual-core FreeRTOS");
    Serial.println("    Core 0: Audio/WiFi/WebSocket/OTA");
    Serial.println("    Core 1: LED/Hall/Motor/POV");
    Serial.println("================================================");
    Serial.println();

    // -- Initialize shared infrastructure --
    state_init();
    Serial.println("[BOOT] State machine initialized");

    mute_init();
    Serial.println("[BOOT] Mute button initialized");

    display_init();
    Serial.println("[BOOT] Status display initialized");

    // -- Create FreeRTOS tasks pinned to specific cores --
    xTaskCreatePinnedToCore(
        audioTask,              // Task function
        "AudioTask",            // Name
        AUDIO_TASK_STACK,       // Stack size (bytes)
        NULL,                   // Parameters
        AUDIO_TASK_PRIORITY,    // Priority (2)
        &audioTaskHandle,       // Task handle
        0                       // Core 0
    );
    Serial.println("[BOOT] Audio task created on Core 0");

    xTaskCreatePinnedToCore(
        ledTask,                // Task function
        "LEDTask",              // Name
        LED_TASK_STACK,         // Stack size (bytes)
        NULL,                   // Parameters
        LED_TASK_PRIORITY,      // Priority (3)
        &ledTaskHandle,         // Task handle
        1                       // Core 1
    );
    Serial.println("[BOOT] LED task created on Core 1");

    Serial.println();
    Serial.println("Tasks created. Core 0: Audio, Core 1: LEDs");
    Serial.println("Serial commands: deity:<name> | intent:<text> | status | mute");
    Serial.println();
}

// ============================================================
// Main loop (low-priority monitoring on whichever core Arduino runs on)
// ============================================================
void loop() {
    unsigned long now = millis();

    // -- Handle serial debug commands --
    while (Serial.available()) {
        char c = Serial.read();
        if (c == '\n' || c == '\r') {
            if (serialCmd.length() > 0) {
                handleSerialCommand(serialCmd);
                serialCmd = "";
            }
        } else {
            serialCmd += c;
        }
    }

    // -- Heartbeat: free heap, WiFi status, sphere state, mute state --
    if ((now - lastHeartbeat) >= HEARTBEAT_INTERVAL_MS) {
        lastHeartbeat = now;
        Serial.printf("[HEARTBEAT] uptime=%lus heap=%u state=%s muted=%s\n",
                       now / 1000,
                       ESP.getFreeHeap(),
                       sphereStateNames[currentSphereState],
                       mute_is_muted() ? "YES" : "NO");
    }

    // -- Yield: loop is low-priority monitoring only --
    vTaskDelay(pdMS_TO_TICKS(100));
}

// ============================================================
// Serial Command Handler
// ============================================================
static void handleSerialCommand(const String& cmd) {
    if (cmd.startsWith("deity:")) {
        String deity = cmd.substring(6);
        deity.trim();
        Serial.printf("[CMD] Deity: %s\n", deity.c_str());
        display_update_deity(deity.c_str());
        state_send(EVT_DEITY_CHANGED, 0);

    } else if (cmd.startsWith("intent:")) {
        String intent = cmd.substring(7);
        intent.trim();
        Serial.printf("[CMD] Intent: %s\n", intent.c_str());

    } else if (cmd == "status") {
        Serial.println();
        Serial.println("=== SPIRIT SPHERE STATUS ===");
        Serial.printf("Firmware:  v%s\n", FIRMWARE_VERSION);
        Serial.printf("State:     %s\n", sphereStateNames[currentSphereState]);
        Serial.printf("Muted:     %s\n", mute_is_muted() ? "YES" : "NO");
        Serial.printf("Free Heap: %u bytes\n", ESP.getFreeHeap());
        Serial.printf("Uptime:    %lu s\n", millis() / 1000);
        Serial.println("============================");
        Serial.println();

    } else if (cmd == "mute") {
        // Manual mute toggle via serial
        extern volatile bool muteState;
        muteState = !muteState;
        display_update_mute(muteState);
        state_send(EVT_MUTE_TOGGLE, muteState ? 1 : 0);
        Serial.printf("[CMD] Mute toggled: %s\n", muteState ? "MUTED" : "UNMUTED");

    } else {
        Serial.printf("[CMD] Unknown: %s\n", cmd.c_str());
        Serial.println("  Commands: deity:<name> | intent:<text> | status | mute");
    }
}
