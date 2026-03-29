/**
 * Hall Effect Sensor — Revolution position tracking
 *
 * Uses US5881LUA unipolar Hall switch with a magnet on the rotating
 * assembly. Triggers once per revolution on the FALLING edge.
 * Provides angular position (0.0-1.0) for POV column synchronization.
 */
#pragma once

#include "config.h"
#include <Arduino.h>

/**
 * Initialize Hall sensor GPIO and attach ISR.
 * Must be called once in setup().
 */
void hall_init();

/**
 * Get the duration of the last complete revolution in microseconds.
 * Used to compute column timing: column_delay = period / NUM_COLUMNS.
 *
 * @return  Revolution period in microseconds, or 0 if no signal yet
 */
uint32_t hall_get_period_us();

/**
 * Get the current angular position as a fraction of the revolution.
 * Core sync mechanism for POV rendering.
 *
 * @return  Float 0.0 to 1.0 representing angular position
 *          (0.0 = magnet position, 0.5 = opposite side)
 */
float hall_get_position();

/**
 * Check and clear the new-revolution flag.
 * Returns true once per revolution, then resets.
 *
 * @return  true if a new revolution was detected since last call
 */
bool hall_new_revolution();
