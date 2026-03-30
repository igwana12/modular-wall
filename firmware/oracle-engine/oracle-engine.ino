/**
 * Oracle Engine Firmware v0.1.0
 *
 * ESP32-S3 firmware for the Oracle Engine voice AI device.
 * Supports ESP32-S3-BOX-3 (built-in mic + speaker) and
 * bare ESP32-S3-DevKitC-1 (INMP441 + MAX98357A external).
 *
 * Features:
 * - WiFi connectivity with auto-reconnect
 * - I2S audio capture (mic) and playback (speaker)
 * - Audio loopback test mode (mic -> speaker echo)
 * - Heartbeat with uptime and free heap monitoring
 *
 * Part of The Orb project (Sacred Circuits).
 */

#include "config.h"
#include "wifi_manager.h"
#include "audio_i2s.h"
#include "ota_update.h"

// -- Timing state --
static unsigned long lastWifiCheck = 0;
static unsigned long lastHeartbeat = 0;
static unsigned long lastRmsPrint = 0;

// -- Audio buffer for loopback --
static int16_t audioBuffer[AUDIO_BUFFER_SIZE];


void setup() {
    Serial.begin(115200);
    delay(500);  // Let serial settle

    // Print boot banner
    Serial.println();
    Serial.println("========================================");
#ifdef TARGET_BOX3
    Serial.printf("  Oracle Engine v%s [BOX3]\n", FIRMWARE_VERSION);
#elif defined(TARGET_DEVKIT)
    Serial.printf("  Oracle Engine v%s [DEVKIT]\n", FIRMWARE_VERSION);
#else
    Serial.printf("  Oracle Engine v%s [UNKNOWN TARGET]\n", FIRMWARE_VERSION);
#endif
    Serial.println("========================================");
    Serial.println();

    // LED blink on boot (if available)
#if LED_PIN >= 0
    pinMode(LED_PIN, OUTPUT);
    for (int i = 0; i < 3; i++) {
        digitalWrite(LED_PIN, HIGH);
        delay(100);
        digitalWrite(LED_PIN, LOW);
        delay(100);
    }
#endif

    // Connect to WiFi
    bool wifiOk = wifi_connect(WIFI_SSID, WIFI_PASS);
    if (wifiOk) {
        Serial.printf("[BOOT] WiFi connected: %s\n", WiFi.localIP().toString().c_str());
#if LED_PIN >= 0
        digitalWrite(LED_PIN, HIGH);  // Solid on = WiFi connected
#endif
    } else {
        Serial.println("[BOOT] WiFi FAILED -- will retry in loop");
    }

    // Initialize audio I2S
    bool audioOk = audio_init();
    if (audioOk) {
        Serial.println("[BOOT] Audio I2S initialized");
    } else {
        Serial.println("[BOOT] Audio I2S FAILED");
    }

    // Initialize OTA (after WiFi)
    if (wifiOk) {
        otaInit(OTA_SERVER_DEFAULT, FIRMWARE_VERSION);
    }

    Serial.println();
    Serial.println("[BOOT] Setup complete. Entering main loop.");
    Serial.println();
}


void loop() {
    unsigned long now = millis();

    // -- WiFi health check (every 5 seconds) --
    if ((now - lastWifiCheck) >= WIFI_CHECK_INTERVAL_MS) {
        lastWifiCheck = now;
        if (!wifi_connected()) {
            Serial.println("[LOOP] WiFi lost, reconnecting...");
#if LED_PIN >= 0
            digitalWrite(LED_PIN, LOW);
#endif
            bool ok = wifi_connect(WIFI_SSID, WIFI_PASS, 10000);
            if (ok) {
#if LED_PIN >= 0
                digitalWrite(LED_PIN, HIGH);
#endif
            }
        }
    }

    // -- Heartbeat (every 10 seconds) --
    if ((now - lastHeartbeat) >= HEARTBEAT_INTERVAL_MS) {
        lastHeartbeat = now;
        unsigned long uptimeSec = now / 1000;
        Serial.printf("[HEARTBEAT] uptime=%lus freeHeap=%u WiFi=%s\n",
                       uptimeSec,
                       ESP.getFreeHeap(),
                       wifi_connected() ? "OK" : "DISCONNECTED");
    }

#ifdef LOOPBACK_TEST
    // -- Audio loopback: read mic -> write speaker --
    int samples = audio_capture(audioBuffer, AUDIO_BUFFER_SIZE);
    if (samples > 0) {
        audio_playback(audioBuffer, samples);

        // Print RMS level once per second for debugging
        if ((now - lastRmsPrint) >= 1000) {
            lastRmsPrint = now;
            float rms = calculate_rms(audioBuffer, samples);
            Serial.printf("[AUDIO] RMS: %.2f (%d samples)\n", rms, samples);
        }
    }
#endif

    // -- OTA check (rate-limited internally) --
    otaCheckForUpdate();
}
