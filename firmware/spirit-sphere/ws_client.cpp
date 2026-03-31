/**
 * WebSocket client implementation for orb-backend communication.
 *
 * Uses WebSocketsClient (Markus Sattler) for WebSocket transport
 * and ArduinoJson for JSON serialization/deserialization.
 *
 * Protocol matches services/orb-backend/sphere_ws.py:
 *   Client -> Server: config, audio (base64 PCM), end_audio
 *   Server -> Client: status, transcript, text, audio (base64 PCM), done, error
 */

#include "ws_client.h"
#include <WebSocketsClient.h>
#include <ArduinoJson.h>
#include "mbedtls/base64.h"

// -- WebSocket instance --
static WebSocketsClient webSocket;
static bool _connected = false;

// -- Reconnect timing --
static unsigned long lastReconnectAttempt = 0;
static const unsigned long RECONNECT_INTERVAL_MS = 3000;

// -- Server info for reconnect --
static String _host;
static int _port;
static String _path;

// -- Callbacks --
static ws_status_cb_t     _cb_status     = nullptr;
static ws_transcript_cb_t _cb_transcript = nullptr;
static ws_audio_cb_t      _cb_audio      = nullptr;
static ws_done_cb_t       _cb_done       = nullptr;
static ws_error_cb_t      _cb_error      = nullptr;


// ============================================================
// Internal: Parse incoming JSON message and dispatch to callbacks
// ============================================================
static void _handleMessage(const char* payload, size_t length) {
    JsonDocument doc;
    DeserializationError err = deserializeJson(doc, payload, length);
    if (err) {
        Serial.printf("[WS] JSON parse error: %s\n", err.c_str());
        return;
    }

    const char* msgType = doc["type"] | "";

    if (strcmp(msgType, "status") == 0) {
        const char* state = doc["state"] | "unknown";
        Serial.printf("[WS] Status: %s\n", state);
        if (_cb_status) _cb_status(state);

    } else if (strcmp(msgType, "transcript") == 0) {
        const char* text = doc["text"] | "";
        Serial.printf("[WS] Transcript: %s\n", text);
        if (_cb_transcript) _cb_transcript(text);

    } else if (strcmp(msgType, "text") == 0) {
        // LLM text chunks -- just log, no callback needed for firmware
        const char* chunk = doc["chunk"] | "";
        Serial.printf("[WS] Text chunk: %.40s%s\n", chunk, strlen(chunk) > 40 ? "..." : "");

    } else if (strcmp(msgType, "audio") == 0) {
        // Base64-decode PCM audio data
        const char* b64data = doc["data"] | "";
        size_t b64len = strlen(b64data);
        if (b64len > 0) {
            // Calculate max decoded length
            size_t decodedLen = 0;
            // First call to get required length
            mbedtls_base64_decode(NULL, 0, &decodedLen, (const uint8_t*)b64data, b64len);

            uint8_t* decoded = (uint8_t*)malloc(decodedLen);
            if (decoded) {
                size_t actualLen = 0;
                int ret = mbedtls_base64_decode(decoded, decodedLen, &actualLen,
                                                 (const uint8_t*)b64data, b64len);
                if (ret == 0 && _cb_audio) {
                    _cb_audio(decoded, actualLen);
                } else if (ret != 0) {
                    Serial.printf("[WS] Base64 decode error: %d\n", ret);
                }
                free(decoded);
            } else {
                Serial.println("[WS] Failed to allocate audio decode buffer");
            }
        }

    } else if (strcmp(msgType, "done") == 0) {
        Serial.println("[WS] Done");
        if (_cb_done) _cb_done();

    } else if (strcmp(msgType, "error") == 0) {
        const char* msg = doc["message"] | "unknown error";
        Serial.printf("[WS] Error: %s\n", msg);
        if (_cb_error) _cb_error(msg);

    } else {
        Serial.printf("[WS] Unknown message type: %s\n", msgType);
    }
}


// ============================================================
// Internal: WebSocket event handler
// ============================================================
static void _wsEvent(WStype_t type, uint8_t* payload, size_t length) {
    switch (type) {
        case WStype_DISCONNECTED:
            _connected = false;
            Serial.println("[WS] Disconnected");
            break;

        case WStype_CONNECTED:
            _connected = true;
            Serial.printf("[WS] Connected to ws://%s:%d%s\n",
                          _host.c_str(), _port, _path.c_str());
            break;

        case WStype_TEXT:
            _handleMessage((const char*)payload, length);
            break;

        case WStype_ERROR:
            Serial.printf("[WS] Error: %.*s\n", (int)length, payload ? (char*)payload : "");
            _connected = false;
            break;

        case WStype_PING:
        case WStype_PONG:
            // Handled automatically by library
            break;

        default:
            break;
    }
}


// ============================================================
// Public API
// ============================================================

bool ws_connect(const char* host, int port, const char* path) {
    _host = host;
    _port = port;
    _path = path;

    Serial.printf("[WS] Connecting to ws://%s:%d%s\n", host, port, path);

    webSocket.begin(host, port, path);
    webSocket.onEvent(_wsEvent);
    webSocket.setReconnectInterval(RECONNECT_INTERVAL_MS);

    return true;
}

void ws_loop() {
    webSocket.loop();
}

bool ws_connected() {
    return _connected;
}

void ws_send_config(const char* deity_id, const char* intent) {
    if (!_connected) {
        Serial.println("[WS] Cannot send config: not connected");
        return;
    }

    JsonDocument doc;
    doc["type"] = "config";
    doc["deity_id"] = deity_id;
    doc["intent"] = intent;

    char buffer[512];
    size_t len = serializeJson(doc, buffer, sizeof(buffer));
    webSocket.sendTXT(buffer, len);

    Serial.printf("[WS] Sent config: deity=%s intent='%.40s'\n", deity_id, intent);
}

void ws_send_audio(const uint8_t* pcm_data, size_t len) {
    if (!_connected) return;

    // Base64 encode the PCM data
    size_t b64_max_len = 4 * ((len + 2) / 3) + 1;
    size_t b64_len = 0;

    // Use PSRAM if available for large buffers
    uint8_t* b64_buf = (uint8_t*)malloc(b64_max_len);
    if (!b64_buf) {
        Serial.println("[WS] Failed to allocate base64 encode buffer");
        return;
    }

    int ret = mbedtls_base64_encode(b64_buf, b64_max_len, &b64_len, pcm_data, len);
    if (ret != 0) {
        Serial.printf("[WS] Base64 encode error: %d\n", ret);
        free(b64_buf);
        return;
    }
    b64_buf[b64_len] = '\0';

    // Build JSON message
    // Use dynamic allocation for the JSON doc since audio payloads can be large
    JsonDocument doc;
    doc["type"] = "audio";
    doc["data"] = (const char*)b64_buf;

    size_t json_size = measureJson(doc) + 1;
    char* json_buf = (char*)malloc(json_size);
    if (json_buf) {
        size_t json_len = serializeJson(doc, json_buf, json_size);
        webSocket.sendTXT(json_buf, json_len);
        free(json_buf);
    } else {
        Serial.println("[WS] Failed to allocate JSON buffer for audio");
    }

    free(b64_buf);
}

void ws_send_end_audio() {
    if (!_connected) {
        Serial.println("[WS] Cannot send end_audio: not connected");
        return;
    }

    JsonDocument doc;
    doc["type"] = "end_audio";

    char buffer[64];
    size_t len = serializeJson(doc, buffer, sizeof(buffer));
    webSocket.sendTXT(buffer, len);

    Serial.println("[WS] Sent end_audio");
}

// -- Callback registration --
void ws_on_status(ws_status_cb_t cb)         { _cb_status = cb; }
void ws_on_transcript(ws_transcript_cb_t cb) { _cb_transcript = cb; }
void ws_on_audio(ws_audio_cb_t cb)           { _cb_audio = cb; }
void ws_on_done(ws_done_cb_t cb)             { _cb_done = cb; }
void ws_on_error(ws_error_cb_t cb)           { _cb_error = cb; }
