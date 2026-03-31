/**
 * Mute Button Module -- Implementation
 *
 * ISR-driven toggle with millis() debounce.
 * LED mirrors mute state: ON = muted, OFF = active.
 */

#include "mute_button.h"
#include "config.h"

// ============================================================
// Shared state
// ============================================================
volatile bool muteState = false;

// ============================================================
// ISR debounce state
// ============================================================
static volatile unsigned long lastInterruptTime = 0;

/**
 * Interrupt Service Routine for mute button.
 * IRAM_ATTR required for ESP32 ISR safety.
 * Debounces using millis() comparison against DEBOUNCE_MS.
 */
static void IRAM_ATTR muteISR() {
    unsigned long now = millis();
    if ((now - lastInterruptTime) > DEBOUNCE_MS) {
        muteState = !muteState;
        digitalWrite(MUTE_LED_PIN, muteState ? HIGH : LOW);
        lastInterruptTime = now;
    }
}

// ============================================================
// API Implementation
// ============================================================

void mute_init() {
    pinMode(MUTE_BUTTON_PIN, INPUT_PULLUP);
    pinMode(MUTE_LED_PIN, OUTPUT);
    digitalWrite(MUTE_LED_PIN, LOW);  // Start unmuted

    attachInterrupt(digitalPinToInterrupt(MUTE_BUTTON_PIN), muteISR, FALLING);

    Serial.printf("[MUTE] Initialized: button=GPIO%d, LED=GPIO%d\n",
                  MUTE_BUTTON_PIN, MUTE_LED_PIN);
}

bool mute_is_muted() {
    return muteState;
}
