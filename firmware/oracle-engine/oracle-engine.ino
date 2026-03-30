/**
 * Oracle Engine Firmware v0.2.0
 *
 * ESP32-S3 firmware for the Oracle Engine voice AI device.
 * Supports ESP32-S3-BOX-3 (built-in mic + speaker) and
 * bare ESP32-S3-DevKitC-1 (INMP441 + MAX98357A external).
 *
 * Features:
 * - WiFi connectivity with auto-reconnect
 * - I2S audio capture (mic) and playback (speaker)
 * - WebSocket client for orb-backend voice AI round-trip
 * - Push-to-talk state machine with latency instrumentation
 * - Audio loopback test mode (mic -> speaker echo)
 * - Serial command interface for debugging
 * - Heartbeat with uptime and free heap monitoring
 *
 * Part of The Orb project (Sacred Circuits).
 */

#include "config.h"
#include "wifi_manager.h"
#include "audio_i2s.h"
#include "ota_update.h"

#ifdef WS_MODE
#include "ws_client.h"
#endif

// ============================================================
// State machine
// ============================================================
enum OracleState {
    STATE_IDLE,         // Initial state, attempting WiFi
    STATE_CONNECTING,   // WiFi connected, connecting WebSocket
    STATE_READY,        // WebSocket connected, waiting for PTT
    STATE_LISTENING,    // PTT held, capturing + streaming audio
    STATE_PROCESSING,   // PTT released, waiting for backend response
    STATE_SPEAKING      // Receiving and playing TTS audio
};

static OracleState currentState = STATE_IDLE;

static const char* stateNames[] = {
    "IDLE", "CONNECTING", "READY", "LISTENING", "PROCESSING", "SPEAKING"
};

// ============================================================
// Timing state
// ============================================================
static unsigned long lastWifiCheck = 0;
static unsigned long lastHeartbeat = 0;
static unsigned long lastRmsPrint = 0;

// ============================================================
// PTT button state
// ============================================================
static bool pttPressed = false;
static unsigned long pttLastChange = 0;

// ============================================================
// Audio buffer
// ============================================================
static int16_t audioBuffer[AUDIO_BUFFER_SIZE];

// ============================================================
// Playback ring buffer for TTS audio chunks
// ============================================================
#ifdef WS_MODE
static uint8_t playbackRing[PLAYBACK_RING_SIZE];
static volatile size_t ringWritePos = 0;
static volatile size_t ringReadPos = 0;
static volatile size_t ringAvailable = 0;
#endif

// ============================================================
// Latency instrumentation
// ============================================================
#ifdef WS_MODE
static unsigned long t_ptt_release   = 0;
static unsigned long t_transcript    = 0;
static unsigned long t_first_audio   = 0;
static unsigned long t_last_audio    = 0;
static bool          latency_tracking = false;
#endif

// ============================================================
// Serial command buffer
// ============================================================
static String serialCmd = "";

// ============================================================
// Current deity / intent (mutable via serial commands)
// ============================================================
#ifdef WS_MODE
static String currentDeity  = WS_DEFAULT_DEITY;
static String currentIntent = WS_DEFAULT_INTENT;
#endif


// ============================================================
// Helper: transition state
// ============================================================
static void setState(OracleState newState) {
    if (newState != currentState) {
        Serial.printf("[STATE] %s -> %s\n", stateNames[currentState], stateNames[newState]);
        currentState = newState;
    }
}


#ifdef WS_MODE
// ============================================================
// Ring buffer helpers
// ============================================================
static void ringWrite(const uint8_t* data, size_t len) {
    for (size_t i = 0; i < len; i++) {
        if (ringAvailable >= PLAYBACK_RING_SIZE) {
            // Buffer full, drop oldest
            ringReadPos = (ringReadPos + 1) % PLAYBACK_RING_SIZE;
            ringAvailable--;
        }
        playbackRing[ringWritePos] = data[i];
        ringWritePos = (ringWritePos + 1) % PLAYBACK_RING_SIZE;
        ringAvailable++;
    }
}

static size_t ringRead(uint8_t* out, size_t maxLen) {
    size_t toRead = min(maxLen, ringAvailable);
    for (size_t i = 0; i < toRead; i++) {
        out[i] = playbackRing[ringReadPos];
        ringReadPos = (ringReadPos + 1) % PLAYBACK_RING_SIZE;
    }
    ringAvailable -= toRead;
    return toRead;
}

static void ringClear() {
    ringWritePos = 0;
    ringReadPos = 0;
    ringAvailable = 0;
}


// ============================================================
// WebSocket callbacks
// ============================================================
static void onWsStatus(const char* state) {
    // Backend sends status updates; we use them for state transitions
    if (strcmp(state, "listening") == 0) {
        // Backend is ready to receive audio
    } else if (strcmp(state, "processing") == 0) {
        // Backend is processing our audio
    } else if (strcmp(state, "speaking") == 0) {
        setState(STATE_SPEAKING);
    } else if (strcmp(state, "ready") == 0) {
        // Initial ready after connect
    }
}

static void onWsTranscript(const char* text) {
    if (latency_tracking && t_transcript == 0) {
        t_transcript = millis();
    }
    Serial.printf("[TRANSCRIPT] %s\n", text);
}

static void onWsAudio(const uint8_t* pcm, size_t len) {
    if (latency_tracking && t_first_audio == 0) {
        t_first_audio = millis();
    }
    // Write to ring buffer for playback in loop()
    ringWrite(pcm, len);
}

static void onWsDone() {
    if (latency_tracking) {
        t_last_audio = millis();

        // Print latency report
        Serial.println();
        Serial.println("=== LATENCY REPORT ===");
        if (t_transcript > 0) {
            Serial.printf("STT:     %lu ms\n", t_transcript - t_ptt_release);
        } else {
            Serial.println("STT:     N/A (no transcript)");
        }
        if (t_first_audio > 0 && t_transcript > 0) {
            Serial.printf("LLM+TTS: %lu ms\n", t_first_audio - t_transcript);
        } else if (t_first_audio > 0) {
            Serial.printf("LLM+TTS: %lu ms (from PTT release)\n", t_first_audio - t_ptt_release);
        } else {
            Serial.println("LLM+TTS: N/A (no audio received)");
        }
        Serial.printf("Total:   %lu ms\n", t_last_audio - t_ptt_release);
        Serial.println("======================");
        Serial.println();

        latency_tracking = false;
    }

    // Transition back to READY after playback drains
    // (actual transition happens in loop when ring buffer empties)
    if (ringAvailable == 0) {
        setState(STATE_READY);
    }
}

static void onWsError(const char* msg) {
    Serial.printf("[WS ERROR] %s\n", msg);
    // On error, try to recover to READY if still connected
    if (ws_connected()) {
        setState(STATE_READY);
    } else {
        setState(STATE_CONNECTING);
    }
}
#endif // WS_MODE


// ============================================================
// Serial command handler
// ============================================================
static void handleSerialCommand(const String& cmd) {
#ifdef WS_MODE
    if (cmd.startsWith("deity:")) {
        currentDeity = cmd.substring(6);
        currentDeity.trim();
        Serial.printf("[CMD] Deity set to: %s\n", currentDeity.c_str());
        if (ws_connected()) {
            ws_send_config(currentDeity.c_str(), currentIntent.c_str());
        }
    } else if (cmd.startsWith("intent:")) {
        currentIntent = cmd.substring(7);
        currentIntent.trim();
        Serial.printf("[CMD] Intent set to: %s\n", currentIntent.c_str());
        if (ws_connected()) {
            ws_send_config(currentDeity.c_str(), currentIntent.c_str());
        }
    } else if (cmd == "status") {
        Serial.println();
        Serial.println("=== STATUS ===");
        Serial.printf("State:     %s\n", stateNames[currentState]);
        Serial.printf("WiFi:      %s (RSSI: %d dBm)\n",
                       wifi_connected() ? "Connected" : "Disconnected",
                       WiFi.RSSI());
        Serial.printf("WebSocket: %s\n", ws_connected() ? "Connected" : "Disconnected");
        Serial.printf("Deity:     %s\n", currentDeity.c_str());
        Serial.printf("Intent:    %s\n", currentIntent.c_str());
        Serial.printf("Free Heap: %u bytes\n", ESP.getFreeHeap());
        Serial.printf("Uptime:    %lu s\n", millis() / 1000);
        Serial.printf("Ring buf:  %u / %d bytes\n", (unsigned)ringAvailable, PLAYBACK_RING_SIZE);
        Serial.println("==============");
        Serial.println();
    } else {
        Serial.printf("[CMD] Unknown command: %s\n", cmd.c_str());
        Serial.println("  Commands: deity:<name>  intent:<text>  status");
    }
#else
    if (cmd == "status") {
        Serial.printf("[STATUS] WiFi=%s RSSI=%d Heap=%u Uptime=%lus\n",
                       wifi_connected() ? "OK" : "DISCONNECTED",
                       WiFi.RSSI(),
                       ESP.getFreeHeap(),
                       millis() / 1000);
    } else {
        Serial.printf("[CMD] Unknown command: %s (WS_MODE not enabled)\n", cmd.c_str());
    }
#endif
}


// ============================================================
// Setup
// ============================================================
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
#ifdef WS_MODE
    Serial.println("  Mode: WebSocket Voice AI");
#elif defined(LOOPBACK_TEST)
    Serial.println("  Mode: Audio Loopback Test");
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

    // Configure PTT button (GPIO 0, active LOW with internal pull-up)
    pinMode(PTT_BUTTON, INPUT_PULLUP);

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

#ifdef WS_MODE
    // Register WebSocket callbacks
    ws_on_status(onWsStatus);
    ws_on_transcript(onWsTranscript);
    ws_on_audio(onWsAudio);
    ws_on_done(onWsDone);
    ws_on_error(onWsError);

    // Connect WebSocket
    if (wifiOk) {
        setState(STATE_CONNECTING);
        ws_connect(WS_HOST, WS_PORT, WS_PATH);
    }
#endif

    Serial.println();
    Serial.println("[BOOT] Setup complete. Entering main loop.");
#ifdef WS_MODE
    Serial.println("[BOOT] Serial commands: deity:<name> | intent:<text> | status");
#endif
    Serial.println();
}


// ============================================================
// Main loop
// ============================================================
void loop() {
    unsigned long now = millis();

    // -- Process serial commands --
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
#ifdef WS_MODE
                // WiFi back, reconnect WebSocket
                setState(STATE_CONNECTING);
                ws_connect(WS_HOST, WS_PORT, WS_PATH);
#endif
            }
        }
    }

    // -- Heartbeat (every 10 seconds) --
    if ((now - lastHeartbeat) >= HEARTBEAT_INTERVAL_MS) {
        lastHeartbeat = now;
        unsigned long uptimeSec = now / 1000;
        Serial.printf("[HEARTBEAT] uptime=%lus freeHeap=%u WiFi=%s state=%s\n",
                       uptimeSec,
                       ESP.getFreeHeap(),
                       wifi_connected() ? "OK" : "DISCONNECTED",
                       stateNames[currentState]);
    }

#ifdef WS_MODE
    // -- WebSocket event processing --
    ws_loop();

    // -- State machine --
    switch (currentState) {
        case STATE_IDLE:
            // Waiting for WiFi (handled above)
            if (wifi_connected()) {
                setState(STATE_CONNECTING);
                ws_connect(WS_HOST, WS_PORT, WS_PATH);
            }
            break;

        case STATE_CONNECTING:
            // Waiting for WebSocket connect (handled by ws_loop callbacks)
            if (ws_connected()) {
                setState(STATE_READY);
                // Send initial config
                ws_send_config(currentDeity.c_str(), currentIntent.c_str());
                Serial.printf("[WS] Configured: deity=%s intent='%s'\n",
                              currentDeity.c_str(), currentIntent.c_str());
            }
            if (!wifi_connected()) {
                setState(STATE_IDLE);
            }
            break;

        case STATE_READY: {
            // Wait for PTT button press (active LOW, debounced)
            bool btnDown = (digitalRead(PTT_BUTTON) == LOW);
            if (btnDown && !pttPressed && (now - pttLastChange) > PTT_DEBOUNCE_MS) {
                pttPressed = true;
                pttLastChange = now;
                ringClear();
                setState(STATE_LISTENING);
                Serial.println("[PTT] Button pressed -- recording");
            }
            if (!btnDown && pttPressed) {
                pttPressed = false;
                pttLastChange = now;
            }
            // Check WebSocket health
            if (!ws_connected()) {
                setState(STATE_CONNECTING);
            }
            break;
        }

        case STATE_LISTENING: {
            // Capture audio and stream to backend
            int samples = audio_capture(audioBuffer, AUDIO_BUFFER_SIZE);
            if (samples > 0) {
                // Send raw PCM bytes as base64 via WebSocket
                ws_send_audio((const uint8_t*)audioBuffer, samples * sizeof(int16_t));

                // Print RMS once per second
                if ((now - lastRmsPrint) >= 1000) {
                    lastRmsPrint = now;
                    float rms = calculate_rms(audioBuffer, samples);
                    Serial.printf("[AUDIO] RMS: %.2f (%d samples)\n", rms, samples);
                }
            }

            // Check for PTT release
            bool btnDown = (digitalRead(PTT_BUTTON) == LOW);
            if (!btnDown && (now - pttLastChange) > PTT_DEBOUNCE_MS) {
                pttPressed = false;
                pttLastChange = now;

                // Start latency tracking
                t_ptt_release = now;
                t_transcript = 0;
                t_first_audio = 0;
                t_last_audio = 0;
                latency_tracking = true;

                ws_send_end_audio();
                setState(STATE_PROCESSING);
                Serial.println("[PTT] Button released -- processing");
            }
            break;
        }

        case STATE_PROCESSING:
            // Waiting for backend response (callbacks handle transitions)
            // Timeout: if no response in 30s, go back to READY
            if (latency_tracking && (now - t_ptt_release) > 30000) {
                Serial.println("[TIMEOUT] No response from backend after 30s");
                latency_tracking = false;
                setState(STATE_READY);
            }
            if (!ws_connected()) {
                latency_tracking = false;
                setState(STATE_CONNECTING);
            }
            break;

        case STATE_SPEAKING: {
            // Play audio from ring buffer
            if (ringAvailable > 0) {
                // Read up to one I2S buffer worth of samples
                size_t bytesToRead = min((size_t)(AUDIO_BUFFER_SIZE * sizeof(int16_t)),
                                         ringAvailable);
                // Ensure even number of bytes (16-bit samples)
                bytesToRead &= ~1;

                if (bytesToRead > 0) {
                    size_t got = ringRead((uint8_t*)audioBuffer, bytesToRead);
                    int samples = got / sizeof(int16_t);
                    if (samples > 0) {
                        audio_playback(audioBuffer, samples);
                    }
                }
            }

            // When ring buffer is empty and we got "done", go back to READY
            if (ringAvailable == 0 && !latency_tracking) {
                setState(STATE_READY);
            }
            break;
        }
    }

#elif defined(LOOPBACK_TEST)
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
