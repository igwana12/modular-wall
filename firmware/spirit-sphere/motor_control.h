/**
 * Motor Control — N20 micro gear motor PWM with soft start/stop
 *
 * Uses Arduino ESP32 Core 3.x ledcAttach API (no channel parameter).
 * Provides smooth ramping for reduced mechanical noise.
 */
#pragma once

#include "config.h"
#include <Arduino.h>

/**
 * Initialize motor PWM output.
 * Uses ledcAttach() (Arduino Core 3.x API).
 */
void motor_init();

/**
 * Set motor speed immediately (no ramp).
 * CALIBRATE WITH REAL MOTOR — linear RPM-to-duty mapping is approximate.
 *
 * @param rpm  Target RPM (0.0 to MOTOR_MAX_RPM)
 */
void motor_set_rpm(float rpm);

/**
 * Ramp motor speed smoothly over a duration.
 * Non-blocking: call repeatedly in loop() until ramp completes.
 *
 * @param target_rpm  Target RPM to ramp toward
 * @param ramp_ms     Duration of ramp in milliseconds (default: DEFAULT_RAMP_MS)
 * @return            true if ramp is complete, false if still ramping
 */
bool motor_ramp(float target_rpm, uint16_t ramp_ms = DEFAULT_RAMP_MS);

/**
 * Stop motor with soft ramp-down, then set duty to 0.
 * Non-blocking: call repeatedly until returns true.
 *
 * @return  true if motor is fully stopped
 */
bool motor_stop();

/**
 * Get current PWM duty cycle (for debugging).
 *
 * @return  Duty cycle value (0 to 255)
 */
uint8_t motor_get_duty();
