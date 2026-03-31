/**
 * Audio Task -- Core 0 FreeRTOS Wrapper Implementation
 *
 * Adapted from oracle-engine.ino main loop into a pinned FreeRTOS task.
 * Runs on Core 0 alongside the WiFi stack.
 *
 * Priority 2 (above WiFi default 1) to prevent audio capture glitches.
 * Uses vTaskDelay() everywhere -- never delay().
 */

#include "audio_task.h"
#include "config.h"
#include "audio_i2s.h"
#include "ws_client.h"
#include "wifi_manager.h"
#include "wifi_provision.h"
#include "ota_update.h"
#include "state_machine.h"
#include "mute_button.h"
#include "status_display.h"

// ============================================================
// Task handle
// ============================================================
TaskHandle_t audioTaskHandle = NULL;

// ============================================================
// Local state
// ============================================================
static SphereState localState = STATE_IDLE;
static String currentDeity  = WS_DEFAULT_DEITY;
static String currentIntent = WS_DEFAULT_INTENT;

// Audio buffer
static int16_t audioBuffer[AUDIO_BUFFER_SIZE];

// Playback ring buffer for TTS audio chunks
static uint8_t playbackRing[PLAYBACK_RING_SIZE];
static volatile size_t ringWritePos = 0;
static volatile size_t ringReadPos = 0;
static volatile size_t ringAvailable = 0;

// PTT button state
static bool pttPressed = false;
static unsigned long pttLastChange = 0;

// Timing
static unsigned long lastHeartbeat = 0;
static unsigned long lastRmsPrint = 0;

// Latency instrumentation
static unsigned long t_ptt_release   = 0;
static unsigned long t_transcript    = 0;
static unsigned long t_first_audio   = 0;
static unsigned long t_last_audio    = 0;
static bool          latency_tracking = false;

// ============================================================
// Ring buffer helpers
// ============================================================
static void ringWrite(const uint8_t* data, size_t len) {
    for (size_t i = 0; i < len; i++) {
        if (ringAvailable >= PLAYBACK_RING_SIZE) {
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
// Helper: transition state and notify LED task
// ============================================================
static void setLocalState(SphereState newState) {
    if (newState != localState) {
        Serial.printf("[AUDIO] State: %s -> %s\n",
                      sphereStateNames[localState], sphereStateNames[newState]);
        localState = newState;
        state_send(EVT_STATE_CHANGE, (uint8_t)newState);
        display_update_state(newState);
    }
}

// ============================================================
// WebSocket callbacks
// ============================================================
static void onWsStatus(const char* state) {
    if (strcmp(state, "speaking") == 0) {
        setLocalState(STATE_SPEAKING);
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
    ringWrite(pcm, len);
}

static void onWsDone() {
    if (latency_tracking) {
        t_last_audio = millis();
        Serial.println();
        Serial.println("=== LATENCY REPORT ===");
        if (t_transcript > 0) {
            Serial.printf("STT:     %lu ms\n", t_transcript - t_ptt_release);
        }
        if (t_first_audio > 0 && t_transcript > 0) {
            Serial.printf("LLM+TTS: %lu ms\n", t_first_audio - t_transcript);
        }
        Serial.printf("Total:   %lu ms\n", t_last_audio - t_ptt_release);
        Serial.println("======================");
        latency_tracking = false;
    }
    if (ringAvailable == 0) {
        setLocalState(STATE_READY);
    }
}

static void onWsError(const char* msg) {
    Serial.printf("[WS ERROR] %s\n", msg);
    if (ws_connected()) {
        setLocalState(STATE_READY);
    } else {
        setLocalState(STATE_CONNECTING);
    }
}

// ============================================================
// Audio Task -- Main Function (runs on Core 0)
// ============================================================
void audioTask(void* param) {
    (void)param;

    Serial.println("[AUDIO] Task started on Core 0");

    // -- Step 1: Initialize audio I2S --
    bool audioOk = audio_init();
    if (audioOk) {
        Serial.println("[AUDIO] I2S initialized");
    } else {
        Serial.println("[AUDIO] I2S init FAILED");
    }

    // -- Step 2: WiFi provisioning (captive portal from Phase 5) --
    wifiProvisionInit();

    if (!wifiProvisionConnect(15000)) {
        Serial.println("[AUDIO] Stored WiFi failed, starting captive portal...");
        wifiProvisionPortal();
        // Portal blocks until credentials saved and device reboots
    }

    Serial.printf("[AUDIO] WiFi connected: %s\n", WiFi.localIP().toString().c_str());

    // -- Step 3: Extract server URL and connect WebSocket --
    String serverUrl = wifiProvisionGetServerUrl();

    // Parse host and port from server URL
    // Expected format: "http://HOST:PORT"
    String wsHost = WS_HOST;
    int wsPort = WS_PORT;

    if (serverUrl.startsWith("http://")) {
        String hostPort = serverUrl.substring(7);
        int colonIdx = hostPort.indexOf(':');
        if (colonIdx > 0) {
            wsHost = hostPort.substring(0, colonIdx);
            wsPort = hostPort.substring(colonIdx + 1).toInt();
        }
    }

    // Register WebSocket callbacks
    ws_on_status(onWsStatus);
    ws_on_transcript(onWsTranscript);
    ws_on_audio(onWsAudio);
    ws_on_done(onWsDone);
    ws_on_error(onWsError);

    setLocalState(STATE_CONNECTING);
    ws_connect(wsHost.c_str(), wsPort, WS_PATH);

    // -- Step 4: Initialize OTA --
    otaInit(serverUrl.c_str(), FIRMWARE_VERSION);

    // -- Step 5: Main loop --
    Serial.println("[AUDIO] Entering main loop");

    while (true) {
        unsigned long now = millis();

        // -- WebSocket event processing --
        ws_loop();

        // -- State machine --
        switch (localState) {
            case STATE_IDLE:
                if (wifi_connected()) {
                    setLocalState(STATE_CONNECTING);
                    ws_connect(wsHost.c_str(), wsPort, WS_PATH);
                }
                break;

            case STATE_CONNECTING:
                if (ws_connected()) {
                    setLocalState(STATE_READY);
                    ws_send_config(currentDeity.c_str(), currentIntent.c_str());
                }
                if (!wifi_connected()) {
                    setLocalState(STATE_IDLE);
                }
                break;

            case STATE_READY: {
                // Wait for PTT button press (active LOW, debounced)
                bool btnDown = (digitalRead(PTT_BUTTON) == LOW);
                if (btnDown && !pttPressed && (now - pttLastChange) > PTT_DEBOUNCE_MS) {
                    pttPressed = true;
                    pttLastChange = now;
                    ringClear();
                    setLocalState(STATE_LISTENING);
                    Serial.println("[PTT] Button pressed -- recording");
                }
                if (!btnDown && pttPressed) {
                    pttPressed = false;
                    pttLastChange = now;
                }
                if (!ws_connected()) {
                    setLocalState(STATE_CONNECTING);
                }
                break;
            }

            case STATE_LISTENING: {
                // Skip audio capture if muted
                if (!mute_is_muted()) {
                    int samples = audio_capture(audioBuffer, AUDIO_BUFFER_SIZE);
                    if (samples > 0) {
                        ws_send_audio((const uint8_t*)audioBuffer, samples * sizeof(int16_t));

                        if ((now - lastRmsPrint) >= 1000) {
                            lastRmsPrint = now;
                            float rms = calculate_rms(audioBuffer, samples);
                            Serial.printf("[AUDIO] RMS: %.2f (%d samples)\n", rms, samples);
                        }
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
                    setLocalState(STATE_PROCESSING);
                    Serial.println("[PTT] Button released -- processing");
                }
                break;
            }

            case STATE_PROCESSING:
                if (latency_tracking && (now - t_ptt_release) > 30000) {
                    Serial.println("[TIMEOUT] No response after 30s");
                    latency_tracking = false;
                    setLocalState(STATE_READY);
                }
                if (!ws_connected()) {
                    latency_tracking = false;
                    setLocalState(STATE_CONNECTING);
                }
                break;

            case STATE_SPEAKING: {
                if (ringAvailable > 0) {
                    size_t bytesToRead = min((size_t)(AUDIO_BUFFER_SIZE * sizeof(int16_t)),
                                             ringAvailable);
                    bytesToRead &= ~1;  // Ensure even (16-bit samples)

                    if (bytesToRead > 0) {
                        size_t got = ringRead((uint8_t*)audioBuffer, bytesToRead);
                        int samples = got / sizeof(int16_t);
                        if (samples > 0) {
                            audio_playback(audioBuffer, samples);
                        }
                    }
                }
                if (ringAvailable == 0 && !latency_tracking) {
                    setLocalState(STATE_READY);
                }
                break;
            }
        }

        // -- OTA check (rate-limited internally) --
        otaCheckForUpdate();

        // -- Heap monitoring (pitfall 3) --
        if ((now - lastHeartbeat) >= HEARTBEAT_INTERVAL_MS) {
            lastHeartbeat = now;
            uint32_t freeHeap = ESP.getFreeHeap();
            if (freeHeap < 50000) {
                Serial.printf("[AUDIO] WARNING: Low heap: %u bytes\n", freeHeap);
            }
            Serial.printf("[AUDIO] Heartbeat: heap=%u state=%s muted=%s\n",
                          freeHeap,
                          sphereStateNames[localState],
                          mute_is_muted() ? "YES" : "NO");
        }

        // -- Yield to WiFi stack --
        vTaskDelay(pdMS_TO_TICKS(1));
    }
}
