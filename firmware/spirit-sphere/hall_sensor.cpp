/**
 * Hall Effect Sensor — ISR and revolution timing implementation
 */
#include "hall_sensor.h"

// Volatile: modified in ISR, read in main loop
static volatile uint32_t last_trigger_us = 0;
static volatile uint32_t revolution_period_us = 0;
static volatile bool _new_revolution = false;

/**
 * ISR — fires on FALLING edge when US5881LUA detects magnet.
 * Records timestamp and computes revolution period.
 * Must be in IRAM for ESP32 interrupt safety.
 */
static void IRAM_ATTR hall_isr() {
    uint32_t now = micros();

    // Compute period from consecutive triggers
    if (last_trigger_us > 0) {
        revolution_period_us = now - last_trigger_us;
    }

    last_trigger_us = now;
    _new_revolution = true;
}

void hall_init() {
    pinMode(HALL_PIN, INPUT_PULLUP);
    // US5881LUA is active-low: output goes LOW when south pole detected
    attachInterrupt(digitalPinToInterrupt(HALL_PIN), hall_isr, FALLING);
}

uint32_t hall_get_period_us() {
    return revolution_period_us;
}

float hall_get_position() {
    uint32_t period = revolution_period_us;

    // No revolution data yet
    if (period == 0) return 0.0f;

    // Compute angular position from elapsed time since last trigger
    uint32_t elapsed = micros() - last_trigger_us;
    float position = (float)elapsed / (float)period;

    // Clamp to [0.0, 1.0) — handles overflow if motor stalls
    if (position >= 1.0f) position = 0.999f;
    if (position < 0.0f)  position = 0.0f;

    return position;
}

bool hall_new_revolution() {
    if (_new_revolution) {
        _new_revolution = false;
        return true;
    }
    return false;
}
