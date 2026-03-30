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
 *   '+' — Increase brightness by 25
 *   '-' — Decrease brightness by 25
 *   'f' — Faster motor (duty +5)
 *   's' — Slower motor (duty -5)
 *   'c' — Print current config (brightness, duty, RPM, timing)
 *   'p' — Pause/resume LED display (motor keeps spinning, for noise measurement)
 */

#include "config.h"
#include "led_driver.h"
#include "hall_sensor.h"
#include "frame_buffer.h"
#include "motor_control.h"
#include "image_data.h"

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
static bool motor_running = false;
static uint8_t brightness_level = 3;  // 0=Low, 1=Med, 2=High, 3=Max (start at max for POV-04)
static const uint8_t brightness_levels[] = { 50, 100, 200, 255 };
static uint8_t current_brightness = 255;  // Live-tunable brightness
static uint8_t motor_duty_adjust = 0;     // Manual duty offset for live tuning
static bool display_paused = false;       // Pause LEDs for noise measurement (POV-05)
static uint16_t last_column = 0;
static uint32_t loop_count = 0;
static uint32_t loop_start_us = 0;

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------
void setup() {
    Serial.begin(SERIAL_BAUD);

    // Wait briefly for serial monitor connection (optional)
    delay(500);

#if POV_MODE_SPHERE
    Serial.println("=== POV Globe (SPHERE mode) ===");
#else
    Serial.println("=== POV Globe (FLAT mode) ===");
#endif
    Serial.println("Initializing...");

    // Initialize subsystems
    led_init();
    Serial.println("  LED driver: OK (APA102, DMA)");

    hall_init();
    Serial.println("  Hall sensor: OK (GPIO" + String(HALL_PIN) + ", FALLING)");

    frame_init();
    // Load generated image data (THE ORB test image from image-to-pov.py)
    if (frame_load(FRAME_DATA, FRAME_DATA_LEN)) {
        Serial.println("  Frame buffer: OK (image data loaded)");
    } else {
        // Fallback to built-in test pattern
        frame_load_test_pattern();
        Serial.println("  Frame buffer: WARN (image data failed, using test pattern)");
    }

    motor_init();
    Serial.println("  Motor control: OK (GPIO" + String(MOTOR_PIN) + ", PWM)");

    Serial.println("");
    Serial.println("POV Globe ready.");
    Serial.println("Commands: r=RPM, b=brightness, m=motor, t=test pattern, h=hall debug, l=LED test");
    Serial.println("          +/-=brightness adjust, f/s=motor speed, c=config, p=pause LEDs");
    Serial.println("---");
}

// ---------------------------------------------------------------------------
// Main Loop — POV rendering
// ---------------------------------------------------------------------------
void loop() {
    loop_start_us = micros();

    // --- Handle serial commands ---
    handle_serial();

    // --- Periodic diagnostics (every 1000 loops) ---
    loop_count++;
    if (loop_count % 1000 == 0) {
        uint32_t diag_period = hall_get_period_us();
        if (diag_period > 0 && diag_period <= HALL_TIMEOUT_US) {
            float diag_rpm = 60000000.0f / (float)diag_period;
            Serial.print("[diag] RPM: ");
            Serial.print(diag_rpm, 1);
            Serial.print("  col: ");
            Serial.print(last_column);
            Serial.print("  loop_us: ");
            Serial.println(micros() - loop_start_us);
        }
    }

    // --- POV Column Rendering ---
    uint32_t period = hall_get_period_us();

    // Safety: if no Hall signal (motor stopped or stalled), blank LEDs
    if (period == 0 || period > HALL_TIMEOUT_US) {
        led_clear();
        return;
    }

    // Display paused — LEDs off but motor keeps spinning (for noise measurement)
    if (display_paused) {
        led_clear();
        return;
    }

    // Reset column counter on new revolution
    if (hall_new_revolution()) {
        last_column = 0;
    }

    // Compute current column from angular position
    // In sphere mode: columns still map to angular position (longitude).
    // LED positions along the arm represent latitude (pole-to-pole).
    // The equirectangular mapping in image-to-pov.py handles the
    // spherical projection, so firmware just needs correct column timing.
    float position = hall_get_position();
    uint16_t effective_cols = COLUMNS_EFFECTIVE;
    uint16_t col = (uint16_t)(position * effective_cols);

    // Clamp to valid range
    if (col >= effective_cols) col = effective_cols - 1;

#if BOOST_MODE
    // Boost mode: map effective column back to frame column
    // Each effective column shows 2 frame columns worth of time,
    // doubling perceived brightness at the cost of angular resolution
    uint16_t frame_col = col * 2;
    if (frame_col >= NUM_COLUMNS) frame_col = NUM_COLUMNS - 1;
#else
    uint16_t frame_col = col;
#endif

    // Only update LEDs when we've moved to a new column
    // (avoids redundant SPI transactions on same column)
    if (col != last_column) {
        led_show_column(frame_col, frame_get_column(frame_col));
        last_column = col;
    }

    // Compute delay until next column boundary
    uint32_t column_delay = period / effective_cols;

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
            // Toggle motor with soft ramp for noise reduction (POV-05)
            motor_running = !motor_running;
            if (motor_running) {
                // Use motor_ramp for soft start instead of immediate set
                motor_ramp(TARGET_RPM, MOTOR_RAMP_MS);
                Serial.print("Motor ON (ramping ");
                Serial.print(MOTOR_RAMP_MS);
                Serial.print("ms to ");
                Serial.print(TARGET_RPM);
                Serial.println(" RPM)");
            } else {
                motor_ramp(0.0f, MOTOR_RAMP_MS);
                Serial.println("Motor OFF (ramping down)");
            }
            break;
        }

        case 't': {
            // Reload test pattern
            frame_load_test_pattern();
            Serial.println("Test pattern reloaded");
            break;
        }

<<<<<<< HEAD
        case 'i': {
            // Reload image data
            if (frame_load(FRAME_DATA, FRAME_DATA_LEN)) {
                Serial.println("Image data reloaded");
            } else {
                Serial.println("Image data reload FAILED");
            }
            break;
        }

        case 'h': {
            // Hall sensor debug: print raw state and timing
            uint32_t period = hall_get_period_us();
            float pos = hall_get_position();
            Serial.print("Hall: pin=");
            Serial.print(digitalRead(HALL_PIN));
            Serial.print("  period_us=");
            Serial.print(period);
            Serial.print("  position=");
            Serial.print(pos, 3);
            Serial.print("  new_rev=");
            Serial.println(hall_new_revolution() ? "YES" : "no");
            break;
        }

        case 'l': {
            // Light all LEDs white (static wiring test, no rotation needed)
            Serial.println("LED test: all white...");
            // Create a white column and display it
            CRGB white_col[NUM_LEDS];
            for (int i = 0; i < NUM_LEDS; i++) {
                white_col[i] = CRGB::White;
            }
            led_show_column(0, white_col);
            Serial.println("All LEDs lit white. Press 'l' again or any key to continue.");
=======
        case '+': {
            // Increase brightness by 25
            if (current_brightness <= 230) {
                current_brightness += 25;
            } else {
                current_brightness = 255;
            }
            led_set_brightness(current_brightness);
            Serial.print("Brightness: ");
            Serial.print(current_brightness);
            Serial.println("/255");
            break;
        }

        case '-': {
            // Decrease brightness by 25
            if (current_brightness >= 25) {
                current_brightness -= 25;
            } else {
                current_brightness = 0;
            }
            led_set_brightness(current_brightness);
            Serial.print("Brightness: ");
            Serial.print(current_brightness);
            Serial.println("/255");
            break;
        }

        case 'f': {
            // Faster motor (duty +5)
            motor_duty_adjust += 5;
            uint8_t new_duty = motor_get_duty() + 5;
            if (new_duty > MOTOR_MAX_DUTY) new_duty = MOTOR_MAX_DUTY;
            ledcWrite(MOTOR_PIN, new_duty);
            Serial.print("Motor duty: ");
            Serial.print(new_duty);
            Serial.print("/");
            Serial.println(MOTOR_MAX_DUTY);
            break;
        }

        case 's': {
            // Slower motor (duty -5)
            uint8_t current = motor_get_duty();
            uint8_t new_duty = (current >= 5) ? current - 5 : 0;
            ledcWrite(MOTOR_PIN, new_duty);
            Serial.print("Motor duty: ");
            Serial.print(new_duty);
            Serial.print("/");
            Serial.println(MOTOR_MAX_DUTY);
            break;
        }

        case 'c': {
            // Print current config
            uint32_t period = hall_get_period_us();
            float rpm = (period > 0) ? 60000000.0f / (float)period : 0.0f;
            Serial.println("--- Current Config ---");
            Serial.print("  Mode: ");
#if POV_MODE_SPHERE
            Serial.println("SPHERE");
#else
            Serial.println("FLAT");
#endif
            Serial.print("  Brightness: ");
            Serial.print(current_brightness);
            Serial.println("/255");
            Serial.print("  Boost mode: ");
            Serial.println(BOOST_MODE ? "ON" : "OFF");
            Serial.print("  Columns: ");
            Serial.print(COLUMNS_EFFECTIVE);
            Serial.print(" effective / ");
            Serial.print(NUM_COLUMNS);
            Serial.println(" total");
            Serial.print("  Motor duty: ");
            Serial.print(motor_get_duty());
            Serial.print("/");
            Serial.println(MOTOR_MAX_DUTY);
            Serial.print("  RPM: ");
            Serial.println(rpm, 2);
            Serial.print("  Column delay: ");
            if (period > 0) {
                Serial.print(period / COLUMNS_EFFECTIVE);
                Serial.println(" us");
            } else {
                Serial.println("N/A (no signal)");
            }
            Serial.print("  Display: ");
            Serial.println(display_paused ? "PAUSED" : "ACTIVE");
            Serial.println("---");
            break;
        }

        case 'p': {
            // Pause/resume LED display (motor keeps spinning — for noise measurement)
            display_paused = !display_paused;
            if (display_paused) {
                led_clear();
                Serial.println("Display PAUSED (motor running — measure noise now)");
            } else {
                Serial.println("Display RESUMED");
            }
>>>>>>> worktree-agent-aa9ccb94
            break;
        }

        default:
            break;
    }
}
