/**
 * Motor Control — N20 PWM implementation with soft ramp
 */
#include "motor_control.h"

static uint8_t current_duty = 0;

// Ramp state (non-blocking)
static bool     ramp_active = false;
static uint8_t  ramp_start_duty = 0;
static uint8_t  ramp_target_duty = 0;
static uint32_t ramp_start_ms = 0;
static uint16_t ramp_duration_ms = 0;

/**
 * Map RPM to PWM duty cycle.
 * Linear mapping: 0 RPM = 0 duty, MOTOR_MAX_RPM = MOTOR_MAX_DUTY.
 *
 * CALIBRATE WITH REAL MOTOR — actual RPM/duty relationship is non-linear
 * and depends on load, voltage, and individual motor characteristics.
 */
static uint8_t rpm_to_duty(float rpm) {
    if (rpm <= 0.0f) return 0;
    if (rpm >= MOTOR_MAX_RPM) return MOTOR_MAX_DUTY;
    return (uint8_t)((rpm / MOTOR_MAX_RPM) * MOTOR_MAX_DUTY);
}

void motor_init() {
    // Arduino ESP32 Core 3.x API: ledcAttach(pin, freq, resolution)
    // No separate channel parameter — Core 3.x auto-assigns channels.
    ledcAttach(MOTOR_PIN, MOTOR_PWM_FREQ, MOTOR_PWM_RESOLUTION);
    ledcWrite(MOTOR_PIN, 0);
    current_duty = 0;
}

void motor_set_rpm(float rpm) {
    current_duty = rpm_to_duty(rpm);
    ledcWrite(MOTOR_PIN, current_duty);
    ramp_active = false;  // Cancel any active ramp
}

bool motor_ramp(float target_rpm, uint16_t ramp_ms) {
    uint8_t target = rpm_to_duty(target_rpm);

    // Initialize ramp if not already active or target changed
    if (!ramp_active || ramp_target_duty != target) {
        ramp_active = true;
        ramp_start_duty = current_duty;
        ramp_target_duty = target;
        ramp_start_ms = millis();
        ramp_duration_ms = ramp_ms;
    }

    // Compute progress
    uint32_t elapsed = millis() - ramp_start_ms;

    if (elapsed >= ramp_duration_ms) {
        // Ramp complete
        current_duty = ramp_target_duty;
        ledcWrite(MOTOR_PIN, current_duty);
        ramp_active = false;
        return true;
    }

    // Linear interpolation
    float progress = (float)elapsed / (float)ramp_duration_ms;
    int16_t range = (int16_t)ramp_target_duty - (int16_t)ramp_start_duty;
    current_duty = ramp_start_duty + (uint8_t)(range * progress);
    ledcWrite(MOTOR_PIN, current_duty);

    return false;
}

bool motor_stop() {
    return motor_ramp(0.0f, DEFAULT_RAMP_MS);
}

uint8_t motor_get_duty() {
    return current_duty;
}
