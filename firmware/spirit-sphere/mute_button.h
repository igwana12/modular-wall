#ifndef MUTE_BUTTON_H
#define MUTE_BUTTON_H

/**
 * Mute Button Module -- Spirit Sphere (SPHERE-06)
 *
 * GPIO-based mic mute toggle with hardware debounce and LED indicator.
 * Uses ISR for instant response, safe for use from any FreeRTOS task.
 */

#include <Arduino.h>

// ============================================================
// Shared state (volatile for ISR safety)
// ============================================================
extern volatile bool muteState;

// ============================================================
// API
// ============================================================

/**
 * Initialize mute button GPIO and LED indicator.
 * Configures INPUT_PULLUP on button pin, OUTPUT on LED pin,
 * attaches FALLING edge interrupt with ISR debounce.
 *
 * Call once in setup() before creating tasks.
 */
void mute_init();

/**
 * Check if microphone is currently muted.
 *
 * @return true if muted, false if active
 */
bool mute_is_muted();

#endif // MUTE_BUTTON_H
