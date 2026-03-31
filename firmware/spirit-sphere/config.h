#ifndef CONFIG_H
#define CONFIG_H

// ============================================================
// Spirit Sphere Unified Firmware Configuration
// ============================================================
//
// Merged configuration from Oracle Engine (Phase 4-5) and
// POV Globe (Phase 6) into a single dual-core firmware.
//
// Required libraries (install via Arduino Library Manager):
// - WebSockets by Markus Sattler (ArduinoWebSockets)
// - ArduinoJson by Benoit Blanchon (v7.x)
// - FastLED 3.7+
//
// Built-in libraries (included with Arduino ESP32 Core 3.x):
// - WiFi, WebServer, DNSServer, Preferences, HTTPClient, HTTPUpdate
// ============================================================

#define FIRMWARE_VERSION "1.0.0"
#define DEVICE_NAME "SpiritSphere"

// ============================================================
// Board type system (compile-time multi-target support)
// ============================================================
#define BOARD_BOX3      1
#define BOARD_DEVKITC1  2

#ifndef BOARD_TYPE
  #define BOARD_TYPE BOARD_BOX3
#endif

// Map BOARD_TYPE to legacy TARGET_* defines used by existing modules
#if BOARD_TYPE == BOARD_BOX3
  #ifndef TARGET_BOX3
    #define TARGET_BOX3
  #endif
#elif BOARD_TYPE == BOARD_DEVKITC1
  #ifndef TARGET_DEVKIT
    #define TARGET_DEVKIT
  #endif
#endif

// ============================================================
// WiFi credentials (legacy hardcoded -- prefer wifi_provision module)
// ============================================================
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASS "YOUR_WIFI_PASS"

// ============================================================
// WiFi Provisioning (captive portal) settings
// ============================================================
#define AP_SSID_PREFIX    "SpiritSphere-"
#define AP_PASSWORD       ""
#define AP_CHANNEL        1
#define NVS_NAMESPACE     "spirit-sph"

// ============================================================
// Server connection defaults (overridable via provisioning portal)
// ============================================================
#define DEFAULT_SERVER_URL  "http://192.168.1.100:8300"
#define DEFAULT_DEITY_ID    "apollo"

// Backend WebSocket server (legacy -- prefer provisioned server URL)
#define WS_HOST "192.168.1.XXX"
#define WS_PORT 8300
#define WS_PATH "/ws/sphere"

// ============================================================
// Operation mode
// ============================================================
#define WS_MODE
// #define LOOPBACK_TEST

// Default deity and intent for WebSocket mode
#define WS_DEFAULT_DEITY   "apollo"
#define WS_DEFAULT_INTENT  "oracle guidance"

// PTT debounce
#define PTT_DEBOUNCE_MS    50

// Playback ring buffer size (bytes) for TTS audio chunks
#define PLAYBACK_RING_SIZE 8192

// ============================================================
// ESP32-S3-BOX-3 Audio Pin Definitions
// ============================================================
#ifdef TARGET_BOX3
  // Built-in PDM microphone (ES7210 codec on BOX-3)
  #define I2S_MIC_SCK   41
  #define I2S_MIC_WS    42
  #define I2S_MIC_SD    2

  // Built-in speaker (ES8311 codec on BOX-3)
  #define I2S_SPK_SCK   41
  #define I2S_SPK_WS    42
  #define I2S_SPK_SD    15

  // Onboard LED (BOX-3 has no user LED)
  #define LED_PIN       -1

  // BOX-3 codec I2C
  #define I2C_SDA       8
  #define I2C_SCL       18
  #define CODEC_ES8311_ADDR 0x18
  #define CODEC_ES7210_ADDR 0x40

  // Push-to-talk: BOX-3 BOOT button
  #define PTT_BUTTON    0
#endif

// ============================================================
// Bare ESP32-S3-DevKitC-1 + INMP441 + MAX98357A
// ============================================================
#ifdef TARGET_DEVKIT
  #define I2S_MIC_SCK   5
  #define I2S_MIC_WS    6
  #define I2S_MIC_SD    7

  #define I2S_SPK_SCK   12
  #define I2S_SPK_WS    13
  #define I2S_SPK_SD    14

  #define LED_PIN       2
  #define PTT_BUTTON    0
#endif

// ============================================================
// Audio Configuration
// ============================================================
#define AUDIO_SAMPLE_RATE   16000
#define AUDIO_BITS          16
#define AUDIO_CHANNELS      1
#define AUDIO_BUFFER_SIZE   1024

// ============================================================
// LED Configuration -- APA102 / SK9822 via hardware SPI
// ============================================================
// NOTE: No FASTLED_ESP32_I2S defines -- APA102 uses hardware SPI,
// not I2S DMA. The I2S peripheral is reserved for audio I2S on
// the unified firmware. Defining FASTLED_ESP32_I2S would claim
// an I2S port and conflict with audio_i2s.cpp.
#define DATA_PIN        11          // ESP32-S3 HSPI MOSI (GPIO11)
#define CLOCK_PIN       12          // ESP32-S3 HSPI SCK  (GPIO12)
#define NUM_LEDS        36          // LEDs per arm
#define NUM_COLUMNS     120         // Angular resolution: 3 deg per column
#define SPI_SPEED       6000000     // 6 MHz SPI (reduced from 12MHz for slip ring signal integrity)
#define BRIGHTNESS      255         // Maximum brightness for POV

// ============================================================
// POV Mode
// ============================================================
#define POV_MODE_SPHERE true
#define BOOST_MODE      false
#define COLUMNS_EFFECTIVE (BOOST_MODE ? (NUM_COLUMNS / 2) : NUM_COLUMNS)

// ============================================================
// Hall Effect Sensor -- US5881LUA
// ============================================================
#define HALL_PIN        4

// ============================================================
// Motor Control -- N20 micro gear motor
// ============================================================
#define MOTOR_PIN           5
#define MOTOR_PWM_FREQ      1000
#define MOTOR_PWM_RESOLUTION 8
#define TARGET_RPM          4.0f
#define MOTOR_MAX_DUTY      180
#define MOTOR_MAX_RPM       5.0f
#define COLUMN_DELAY_OFFSET_US  0
#define MOTOR_HOLD_DUTY     50

// ============================================================
// Mute Button -- GPIO toggle for mic mute
// ============================================================
#define MUTE_BUTTON_PIN 39          // Available on BOX-3 expansion header
#define MUTE_LED_PIN    40          // LED indicator for mute state
#define DEBOUNCE_MS     50          // ISR debounce threshold

// ============================================================
// Timing
// ============================================================
#define HALL_TIMEOUT_US     2000000
#define DEFAULT_RAMP_MS     2000
#define MOTOR_RAMP_MS       3000
#define WIFI_CHECK_INTERVAL_MS  5000
#define HEARTBEAT_INTERVAL_MS   10000

// ============================================================
// FreeRTOS Task Configuration
// ============================================================
#define AUDIO_TASK_STACK    8192    // Core 0: audio + WiFi + WebSocket + OTA
#define LED_TASK_STACK      4096    // Core 1: LED POV + Hall + motor
#define AUDIO_TASK_PRIORITY 2       // Above WiFi default (1) for audio timing
#define LED_TASK_PRIORITY   3       // Highest -- POV timing is critical

// ============================================================
// OTA
// ============================================================
#define OTA_SERVER_DEFAULT  DEFAULT_SERVER_URL

// ============================================================
// Serial Debug
// ============================================================
#define SERIAL_BAUD     115200

// ============================================================
// Watchdog & Stability Monitoring
// ============================================================
#define WDT_TIMEOUT_MS      30000   // Watchdog timeout (30s auto-reboot on hang)
#define HEAP_WARNING_KB      40     // Heap warning threshold (bytes = KB * 1024)
#define HEAP_CRITICAL_KB     30     // Heap critical threshold
#define WIFI_RECONNECT_INTERVAL_MS  5000  // WiFi reconnect check interval
#define MOTOR_HALL_TIMEOUT_MS       5000  // Stop motor if no Hall pulses for this long

#endif // CONFIG_H
