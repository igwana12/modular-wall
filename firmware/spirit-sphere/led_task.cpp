/**
 * LED Task -- Core 1 FreeRTOS Wrapper Implementation
 *
 * Adapted from pov-globe.ino main loop into a pinned FreeRTOS task.
 * Runs on Core 1 (dedicated to LED timing-critical operations).
 *
 * Priority 3 (highest) -- POV column timing is critical.
 * Uses vTaskDelay() for yields, delayMicroseconds() for column timing.
 */

#include "led_task.h"
#include "config.h"
#include "led_driver.h"
#include "hall_sensor.h"
#include "frame_buffer.h"
#include "motor_control.h"
#include "state_machine.h"
#include "status_display.h"
#include "image_data.h"
#include "esp_task_wdt.h"

// ============================================================
// Task handle
// ============================================================
TaskHandle_t ledTaskHandle = NULL;

// ============================================================
// Idle animation: slow color cycle
// ============================================================
static CRGB idleColumn[NUM_LEDS];
static uint8_t idleHue = 0;

static void renderIdlePattern() {
    // Slow breathing glow: low brightness color cycle
    for (int i = 0; i < NUM_LEDS; i++) {
        idleColumn[i] = CHSV(idleHue + (i * 4), 200, 40);
    }
    idleHue++;  // Slowly rotate hue
}

// ============================================================
// LED Task -- Main Function (runs on Core 1)
// ============================================================
void ledTask(void* param) {
    (void)param;

    Serial.println("[LED] Task started on Core 1");

    // -- Step 1: Initialize subsystems --
    led_init();
    Serial.println("[LED] LED driver initialized (APA102, SPI)");

    hall_init();
    Serial.printf("[LED] Hall sensor initialized (GPIO%d)\n", HALL_PIN);

    frame_init();

    // Load deity frame data (guarded -- image_data.h may have real data or test)
#ifdef FRAME_DATA
    if (frame_load(FRAME_DATA, FRAME_DATA_LEN)) {
        Serial.println("[LED] Frame data loaded from image_data.h");
    } else {
        frame_load_test_pattern();
        Serial.println("[LED] Frame data load failed, using test pattern");
    }
#else
    frame_load_test_pattern();
    Serial.println("[LED] No FRAME_DATA defined, using test pattern");
#endif

    motor_init();
    Serial.printf("[LED] Motor initialized (GPIO%d)\n", MOTOR_PIN);

    // -- Step 2: Subscribe to watchdog timer --
    esp_task_wdt_add(NULL);  // Subscribe this task to watchdog
    Serial.println("[LED] Watchdog subscribed");

    // -- Step 3: Start motor ramp --
    motor_ramp(TARGET_RPM, MOTOR_RAMP_MS);
    Serial.printf("[LED] Motor ramping to %.1f RPM over %d ms\n", TARGET_RPM, MOTOR_RAMP_MS);

    // Motor safety: track last valid Hall activity
    unsigned long lastHallActivity = millis();
    bool motorStopped = false;

    // -- Step 4: Main loop --
    uint16_t lastColumn = 0;
    bool animationActive = false;
    SphereEvent evt;

    Serial.println("[LED] Entering main loop");

    while (true) {
        // -- Check state queue for events from audio task --
        while (state_receive(&evt)) {
            switch (evt.type) {
                case EVT_STATE_CHANGE:
                    if (evt.data == (uint8_t)STATE_SPEAKING) {
                        animationActive = true;
                        Serial.println("[LED] Animation: ACTIVE (speaking)");
                    } else if (evt.data == (uint8_t)STATE_READY ||
                               evt.data == (uint8_t)STATE_IDLE) {
                        animationActive = false;
                        Serial.println("[LED] Animation: IDLE");
                    }
                    break;

                case EVT_DEITY_CHANGED:
                    Serial.printf("[LED] Deity changed to index: %d\n", evt.data);
                    // Future: load deity-specific animation frames
                    break;

                case EVT_MUTE_TOGGLE:
                    Serial.printf("[LED] Mute: %s\n", evt.data ? "ON" : "OFF");
                    break;

                case EVT_ANIMATION_TRIGGER:
                    Serial.printf("[LED] Animation trigger: %d\n", evt.data);
                    break;
            }
        }

        // -- Motor ramp update (non-blocking) --
        motor_ramp(TARGET_RPM, MOTOR_RAMP_MS);

        // -- Get rotation period --
        uint32_t period = hall_get_period_us();

        // -- Motor safety shutoff: stop motor if no Hall pulses --
        if (period > 0 && period < HALL_TIMEOUT_US) {
            lastHallActivity = millis();
            if (motorStopped) {
                motorStopped = false;
                Serial.println("[LED] Hall pulses restored, motor running");
            }
        } else if ((millis() - lastHallActivity) > MOTOR_HALL_TIMEOUT_MS) {
            if (!motorStopped) {
                motor_stop();
                motorStopped = true;
                Serial.println("[LED] Motor stopped -- no Hall pulses for 5s");
            }
        }

        // Safety: no Hall signal means motor stopped or stalled
        if (period == 0 || period > HALL_TIMEOUT_US) {
            led_clear();
            esp_task_wdt_reset();  // Feed watchdog even when idle
            vTaskDelay(pdMS_TO_TICKS(10));
            continue;
        }

        if (animationActive) {
            // -- POV column rendering (same logic as pov-globe.ino) --
            if (hall_new_revolution()) {
                lastColumn = 0;
            }

            float position = hall_get_position();
            uint16_t effective_cols = COLUMNS_EFFECTIVE;
            uint16_t col = (uint16_t)(position * effective_cols);
            if (col >= effective_cols) col = effective_cols - 1;

#if BOOST_MODE
            uint16_t frame_col = col * 2;
            if (frame_col >= NUM_COLUMNS) frame_col = NUM_COLUMNS - 1;
#else
            uint16_t frame_col = col;
#endif

            if (col != lastColumn) {
                led_show_column(frame_col, frame_get_column(frame_col));
                lastColumn = col;
            }
        } else {
            // -- Idle pattern: slow color cycle at low brightness --
            renderIdlePattern();
            led_show_column(0, idleColumn);
        }

        // -- Column timing delay --
        uint32_t columnDelay = period / COLUMNS_EFFECTIVE;
        if (columnDelay > 50) {
            delayMicroseconds(columnDelay - 50);
        }

        // -- Feed the watchdog --
        esp_task_wdt_reset();
    }
}
