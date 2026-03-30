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
#define BRIGHTNESS      200         // Default brightness (0-255), tunable for ambient

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
#define MOTOR_MAX_DUTY      180     // CALIBRATE: conservative max duty, adjust with real motor
#define MOTOR_MAX_RPM       5.0f    // Max RPM for duty mapping

// ---------------------------------------------------------------------------
// POV Mode — flat (2D propeller) vs spherical (3D globe)
// ---------------------------------------------------------------------------
#define POV_MODE_FLAT       true    // true = flat propeller, false = spherical
// Tunable timing offset for column alignment (microseconds).
// CALIBRATE WITH REAL HARDWARE: adjust until image stays aligned.
#define COLUMN_DELAY_OFFSET_US  0   // Positive = shift image clockwise

// ---------------------------------------------------------------------------
// Timing / Safety
// ---------------------------------------------------------------------------
#define HALL_TIMEOUT_US     2000000 // 2 seconds = < 0.5 RPM → safety shutoff
#define DEFAULT_RAMP_MS     2000    // 2 second soft start/stop ramp

// ---------------------------------------------------------------------------
// Serial Debug
// ---------------------------------------------------------------------------
#define SERIAL_BAUD     115200
