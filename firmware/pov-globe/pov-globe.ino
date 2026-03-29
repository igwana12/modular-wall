/**
 * POV Globe — Main Arduino Sketch
 *
 * Persistence of Vision volumetric LED display for the Spirit Sphere.
 * Drives APA102/SK9822 LEDs synchronized to rotation via Hall effect sensor.
 *
 * Hardware:
 *   - ESP32-S3-WROOM-1 (N16R8)
 *   - APA102 / SK9822 LED strip (36 LEDs per arm)
 *   - US5881LUA Hall effect sensor (position sync)
 *   - N20 micro gear motor (3-5 RPM)
 *
 * Architecture:
 *   1. Hall sensor ISR fires once per revolution, recording period
 *   2. Main loop computes angular position from elapsed time
 *   3. Frame buffer provides pre-rendered column data
 *   4. LED driver pushes column to strip via SPI DMA
 *
 * Serial Commands (debug):
 *   'r' — Print current RPM
 *   'b' — Cycle brightness (Low/Med/High/Max)
 *   'm' — Toggle motor on/off
 *   't' — Reload test pattern
 */

#include "config.h"
#include "led_driver.h"
#include "hall_sensor.h"
#include "frame_buffer.h"
#include "motor_control.h"

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
static bool motor_running = false;
static uint8_t brightness_level = 2;  // 0=Low, 1=Med, 2=High, 3=Max
static const uint8_t brightness_levels[] = { 50, 100, 200, 255 };
static uint16_t last_column = 0;

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------
void setup() {
    Serial.begin(SERIAL_BAUD);

    // Wait briefly for serial monitor connection (optional)
    delay(500);

    Serial.println("=== POV Globe ===");
    Serial.println("Initializing...");

    // Initialize subsystems
    led_init();
    Serial.println("  LED driver: OK (APA102, DMA)");

    hall_init();
    Serial.println("  Hall sensor: OK (GPIO" + String(HALL_PIN) + ", FALLING)");

    frame_init();
    frame_load_test_pattern();
    Serial.println("  Frame buffer: OK (test pattern loaded)");

    motor_init();
    Serial.println("  Motor control: OK (GPIO" + String(MOTOR_PIN) + ", PWM)");

    Serial.println("");
    Serial.println("POV Globe ready.");
    Serial.println("Commands: r=RPM, b=brightness, m=motor, t=test pattern");
    Serial.println("---");
}

// ---------------------------------------------------------------------------
// Main Loop — POV rendering
// ---------------------------------------------------------------------------
void loop() {
    // --- Handle serial commands ---
    handle_serial();

    // --- POV Column Rendering ---
    uint32_t period = hall_get_period_us();

    // Safety: if no Hall signal (motor stopped or stalled), blank LEDs
    if (period == 0 || period > HALL_TIMEOUT_US) {
        led_clear();
        return;
    }

    // Reset column counter on new revolution
    if (hall_new_revolution()) {
        last_column = 0;
    }

    // Compute current column from angular position
    float position = hall_get_position();
    uint16_t col = (uint16_t)(position * NUM_COLUMNS);

    // Clamp to valid range
    if (col >= NUM_COLUMNS) col = NUM_COLUMNS - 1;

    // Only update LEDs when we've moved to a new column
    // (avoids redundant SPI transactions on same column)
    if (col != last_column) {
        led_show_column(col, frame_get_column(col));
        last_column = col;
    }

    // Compute delay until next column boundary
    // column_delay = period / NUM_COLUMNS
    uint32_t column_delay = period / NUM_COLUMNS;

    // Subtract time already spent in this loop iteration (approximate)
    // Use a shorter delay to avoid missing columns at higher RPMs
    if (column_delay > 50) {
        delayMicroseconds(column_delay - 50);  // 50us margin for loop overhead
    }
}

// ---------------------------------------------------------------------------
// Serial Command Handler
// ---------------------------------------------------------------------------
void handle_serial() {
    if (!Serial.available()) return;

    char cmd = Serial.read();

    switch (cmd) {
        case 'r': {
            // Print RPM
            uint32_t period = hall_get_period_us();
            if (period > 0) {
                float rpm = 60000000.0f / (float)period;
                Serial.print("RPM: ");
                Serial.print(rpm, 2);
                Serial.print(" (period: ");
                Serial.print(period);
                Serial.println(" us)");
            } else {
                Serial.println("RPM: No signal");
            }
            break;
        }

        case 'b': {
            // Cycle brightness
            brightness_level = (brightness_level + 1) % 4;
            uint8_t b = brightness_levels[brightness_level];
            led_set_brightness(b);
            Serial.print("Brightness: ");
            Serial.print(b);
            Serial.print("/255 (level ");
            Serial.print(brightness_level);
            Serial.println(")");
            break;
        }

        case 'm': {
            // Toggle motor
            motor_running = !motor_running;
            if (motor_running) {
                motor_set_rpm(TARGET_RPM);
                Serial.print("Motor ON at ");
                Serial.print(TARGET_RPM);
                Serial.println(" RPM");
            } else {
                motor_set_rpm(0);
                Serial.println("Motor OFF");
            }
            break;
        }

        case 't': {
            // Reload test pattern
            frame_load_test_pattern();
            Serial.println("Test pattern reloaded");
            break;
        }

        default:
            break;
    }
}
