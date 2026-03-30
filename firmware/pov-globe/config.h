/**
 * POV Globe Configuration
 *
 * Central pin definitions and parameters for the Spirit Sphere
 * POV (Persistence of Vision) volumetric LED display.
 *
 * Hardware: ESP32-S3-WROOM-1 (N16R8), APA102/SK9822 LEDs,
 *           US5881LUA Hall effect sensor, N20 micro gear motor
 */
#pragma once

// ---------------------------------------------------------------------------
// FastLED DMA Configuration (MUST be defined before #include <FastLED.h>)
// Per CLAUDE.md: use ESP32-S3 I2S DMA for APA102 SPI — immune to WiFi
// interrupt timing glitches. 4 DMA buffers for WiFi resilience.
// ---------------------------------------------------------------------------
#define FASTLED_ESP32_I2S          true
#define FASTLED_ESP32_I2S_NUM_DMA_BUFFERS 4

// ---------------------------------------------------------------------------
// LED Configuration — APA102 / SK9822 via hardware SPI
// ---------------------------------------------------------------------------
#define DATA_PIN        11          // ESP32-S3 HSPI MOSI (GPIO11)
#define CLOCK_PIN       12          // ESP32-S3 HSPI SCK  (GPIO12)
#define NUM_LEDS        36          // LEDs per arm (half-sphere arc, 144/m on ~25cm)
#define NUM_COLUMNS     120         // Angular resolution: 360/120 = 3 deg per column
#define SPI_SPEED       12000000    // 12 MHz SPI clock (APA102 supports 20 MHz+)
#define BRIGHTNESS      255         // Maximum brightness for ambient visibility (POV-04)

// ---------------------------------------------------------------------------
// POV Mode — Sphere vs Flat
// At 3-5 RPM this is NOT traditional persistence-of-vision (which needs 300+
// RPM for retinal persistence). Instead, the arm is a visible, moving bar of
// light that "paints" the image once per revolution. Brightness is critical
// because each column is only illuminated for column_time/revolution_time of
// each sweep — hence maximum APA102 output.
// ---------------------------------------------------------------------------
#define POV_MODE_SPHERE true        // Spherical column mapping (false = flat propeller)

// Boost mode: show each column for 2x duration, halving effective angular
// resolution from NUM_COLUMNS to NUM_COLUMNS/2 but doubling perceived
// brightness. Enable if image is too dim in ambient lighting.
#define BOOST_MODE      false
#define COLUMNS_EFFECTIVE (BOOST_MODE ? (NUM_COLUMNS / 2) : NUM_COLUMNS)

// ---------------------------------------------------------------------------
// Hall Effect Sensor — US5881LUA (unipolar, active-low)
// ---------------------------------------------------------------------------
#define HALL_PIN        4           // GPIO4, INPUT_PULLUP, FALLING edge trigger

// ---------------------------------------------------------------------------
// Motor Control — N20 micro gear motor (3-5 RPM, PWM driven)
// ---------------------------------------------------------------------------
#define MOTOR_PIN           5       // GPIO5 PWM output
#define MOTOR_PWM_FREQ      1000    // 1 kHz PWM for quiet operation
#define MOTOR_PWM_RESOLUTION 8      // 8-bit duty cycle (0-255)
#define TARGET_RPM          4.0f    // Target RPM (middle of 3-5 range)
#define MOTOR_MAX_DUTY      180     // Conservative max duty (calibrate with real motor)
#define MOTOR_MAX_RPM       5.0f    // Max RPM for duty mapping

// ---------------------------------------------------------------------------
// Timing / Safety
// ---------------------------------------------------------------------------
#define HALL_TIMEOUT_US     2000000 // 2 seconds = < 0.5 RPM → safety shutoff
#define DEFAULT_RAMP_MS     2000    // 2 second soft start/stop ramp (general)
#define MOTOR_RAMP_MS       3000    // 3 second soft-start for noise reduction (POV-05)

// CALIBRATE: find lowest duty cycle where motor maintains rotation without
// stalling. Prevents stop/restart noise. Typical N20 hold duty is 40-80
// depending on load and voltage.
#define MOTOR_HOLD_DUTY     50      // Minimum duty to keep motor spinning

// ---------------------------------------------------------------------------
// Serial Debug
// ---------------------------------------------------------------------------
#define SERIAL_BAUD     115200
