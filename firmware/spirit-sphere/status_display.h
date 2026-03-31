#ifndef STATUS_DISPLAY_H
#define STATUS_DISPLAY_H

/**
 * Status Display Module -- Spirit Sphere
 *
 * Provides status output for the Spirit Sphere state machine.
 * Currently uses Serial output (works on any board).
 *
 * TODO: If TARGET_BOX3, add TFT_eSPI integration for the BOX-3
 * touchscreen display. For now Serial is the universal mechanism.
 */

#include <Arduino.h>
#include "state_machine.h"

/**
 * Initialize the display subsystem.
 * Currently: Serial-only (already initialized by main sketch).
 */
void display_init();

/**
 * Update the displayed sphere state.
 *
 * @param state  Current SphereState value
 */
void display_update_state(SphereState state);

/**
 * Update the displayed deity name.
 *
 * @param deity  Deity name string (e.g. "zeus", "apollo")
 */
void display_update_deity(const char* deity);

/**
 * Update the mute indicator.
 *
 * @param muted  true if muted, false if active
 */
void display_update_mute(bool muted);

#endif // STATUS_DISPLAY_H
