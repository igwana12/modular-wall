#ifndef WS_CLIENT_H
#define WS_CLIENT_H

#include <Arduino.h>

/**
 * WebSocket client for orb-backend communication.
 *
 * Connects to ws://HOST:PORT/ws/sphere and implements the
 * JSON-based protocol for voice AI round-trips.
 *
 * Required libraries (install via Arduino Library Manager):
 * - WebSockets by Markus Sattler (ArduinoWebSockets)
 * - ArduinoJson by Benoit Blanchon (v7.x)
 */

// -- Callback types --
typedef void (*ws_status_cb_t)(const char* state);
typedef void (*ws_transcript_cb_t)(const char* text);
typedef void (*ws_audio_cb_t)(const uint8_t* pcm, size_t len);
typedef void (*ws_done_cb_t)();
typedef void (*ws_error_cb_t)(const char* msg);

/**
 * Connect to the orb-backend WebSocket endpoint.
 *
 * @param host  Server hostname or IP
 * @param port  Server port (e.g. 8300)
 * @param path  WebSocket path (e.g. "/ws/sphere")
 * @return true if connection initiated (actual connect is async)
 */
bool ws_connect(const char* host, int port, const char* path);

/**
 * Must be called in Arduino loop() to process WebSocket events.
 */
void ws_loop();

/**
 * Check if WebSocket is currently connected.
 */
bool ws_connected();

/**
 * Send config message to set deity and intent for the session.
 *
 * @param deity_id  Deity identifier (e.g. "apollo")
 * @param intent    User's question or intention
 */
void ws_send_config(const char* deity_id, const char* intent);

/**
 * Send a chunk of PCM audio data (base64 encoded) to the backend.
 *
 * @param pcm_data  Raw PCM 16-bit 16kHz mono bytes
 * @param len       Length in bytes
 */
void ws_send_audio(const uint8_t* pcm_data, size_t len);

/**
 * Signal end of audio capture to the backend.
 */
void ws_send_end_audio();

// -- Callback registration --
void ws_on_status(ws_status_cb_t cb);
void ws_on_transcript(ws_transcript_cb_t cb);
void ws_on_audio(ws_audio_cb_t cb);
void ws_on_done(ws_done_cb_t cb);
void ws_on_error(ws_error_cb_t cb);

#endif // WS_CLIENT_H
