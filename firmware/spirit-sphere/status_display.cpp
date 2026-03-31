/**
 * Status Display Module -- Implementation
 *
 * Uses Serial.println for all display output (portable, works on any board).
 * Each function prints a formatted status line for Serial Monitor.
 *
 * TODO: If TARGET_BOX3 is defined, TFT_eSPI integration can be added
 * later for the touchscreen -- for now Serial output is the universal
 * display mechanism.
 */

#include "status_display.h"

void display_init() {
    // Serial is already initialized by main sketch (Serial.begin).
    // If TFT display is added later, init it here.
    Serial.println("[DISPLAY] Status display initialized (Serial output)");

#ifdef TARGET_BOX3
    // TODO: Initialize TFT_eSPI for BOX-3 touchscreen
    // tft.init();
    // tft.setRotation(1);
    // tft.fillScreen(TFT_BLACK);
#endif
}

void display_update_state(SphereState state) {
    Serial.printf("[STATUS] State: %s\n", sphereStateNames[state]);
}

void display_update_deity(const char* deity) {
    Serial.printf("[STATUS] Deity: %s\n", deity);
}

void display_update_mute(bool muted) {
    Serial.printf("[STATUS] %s\n", muted ? "MUTED" : "UNMUTED");
}
