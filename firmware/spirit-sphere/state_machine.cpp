/**
 * Spirit Sphere Inter-Core State Machine -- Implementation
 */

#include "state_machine.h"

// ============================================================
// Shared state
// ============================================================
QueueHandle_t stateQueue = NULL;
volatile SphereState currentSphereState = STATE_IDLE;

const char* sphereStateNames[] = {
    "IDLE", "CONNECTING", "READY", "LISTENING", "PROCESSING", "SPEAKING"
};

// ============================================================
// API Implementation
// ============================================================

void state_init() {
    stateQueue = xQueueCreate(10, sizeof(SphereEvent));
    if (stateQueue == NULL) {
        Serial.println("[STATE] FATAL: Failed to create state queue!");
    } else {
        Serial.println("[STATE] State queue created (depth=10)");
    }
    currentSphereState = STATE_IDLE;
}

void state_send(SphereEventType type, uint8_t data) {
    SphereEvent evt;
    evt.type = type;
    evt.data = data;

    // Non-blocking send (portMAX_DELAY=0 means don't wait if full)
    BaseType_t result = xQueueSend(stateQueue, &evt, 0);
    if (result != pdTRUE) {
        Serial.println("[STATE] WARNING: Queue full, event dropped");
    }

    // Update shared state for direct reads
    if (type == EVT_STATE_CHANGE) {
        currentSphereState = (SphereState)data;
    }
}

bool state_receive(SphereEvent* evt) {
    if (stateQueue == NULL || evt == NULL) return false;

    // Non-blocking receive (portMAX_DELAY=0 means return immediately)
    return xQueueReceive(stateQueue, evt, 0) == pdTRUE;
}
