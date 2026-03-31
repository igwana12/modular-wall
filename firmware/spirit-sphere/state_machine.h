#ifndef STATE_MACHINE_H
#define STATE_MACHINE_H

/**
 * Spirit Sphere Inter-Core State Machine
 *
 * Provides typed event queue for communication between:
 *   Core 0 (audio task) -> Core 1 (LED task)
 *
 * Uses FreeRTOS queue for thread-safe, lock-free messaging.
 */

#include <Arduino.h>
#include <freertos/FreeRTOS.h>
#include <freertos/queue.h>

// ============================================================
// Sphere states (matches oracle-engine state machine)
// ============================================================
enum SphereState {
    STATE_IDLE,         // Initial state, attempting WiFi
    STATE_CONNECTING,   // WiFi connected, connecting WebSocket
    STATE_READY,        // WebSocket connected, waiting for PTT
    STATE_LISTENING,    // PTT held, capturing + streaming audio
    STATE_PROCESSING,   // PTT released, waiting for backend response
    STATE_SPEAKING      // Receiving and playing TTS audio
};

// ============================================================
// Event types for inter-core communication
// ============================================================
enum SphereEventType {
    EVT_STATE_CHANGE,       // data = new SphereState value
    EVT_DEITY_CHANGED,      // data = deity index (0-20)
    EVT_MUTE_TOGGLE,        // data = 1 (muted) or 0 (unmuted)
    EVT_ANIMATION_TRIGGER   // data = animation ID
};

// ============================================================
// Event struct sent through the queue
// ============================================================
struct SphereEvent {
    SphereEventType type;
    uint8_t data;
};

// ============================================================
// Shared state (read from any core, written via queue events)
// ============================================================
extern QueueHandle_t stateQueue;
extern volatile SphereState currentSphereState;

// State name lookup for debug printing
extern const char* sphereStateNames[];

// ============================================================
// API
// ============================================================

/**
 * Initialize the state machine and create the FreeRTOS queue.
 * Call once in setup() before creating tasks.
 */
void state_init();

/**
 * Send an event to the state queue (non-blocking).
 * Called from Core 0 (audio task) to notify Core 1 (LED task).
 *
 * @param type  Event type
 * @param data  Event data (meaning depends on type)
 */
void state_send(SphereEventType type, uint8_t data);

/**
 * Receive an event from the state queue (non-blocking).
 * Called from Core 1 (LED task) to check for state changes.
 *
 * @param evt  Pointer to SphereEvent struct to fill
 * @return     true if an event was received, false if queue empty
 */
bool state_receive(SphereEvent* evt);

#endif // STATE_MACHINE_H
