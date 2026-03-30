#ifndef CONFIG_H
#define CONFIG_H

// ============================================================
// Oracle Engine Firmware Configuration
// ============================================================
//
// Required libraries (install via Arduino Library Manager):
// - WebSockets by Markus Sattler (ArduinoWebSockets)
// - ArduinoJson by Benoit Blanchon (v7.x)
//
// Built-in libraries (included with Arduino ESP32 Core 3.x):
// - WiFi, WebServer, DNSServer, Preferences, HTTPClient, HTTPUpdate
// ============================================================

#define FIRMWARE_VERSION "0.3.0"
#define DEVICE_NAME "OracleEngine"

// ============================================================
// Board type system (compile-time multi-target support)
// ============================================================
// Use -DBOARD_TYPE=BOARD_BOX3 or -DBOARD_TYPE=BOARD_DEVKITC1
// to select target at compile time.
#define BOARD_BOX3      1
#define BOARD_DEVKITC1  2

#ifndef BOARD_TYPE
  #define BOARD_TYPE BOARD_DEVKITC1
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
// WiFi credentials (legacy hardcoded — prefer wifi_provision module)
// ============================================================
// These are used by wifi_manager.h for backward compatibility.
// For consumer devices, use wifiProvisionInit() + wifiProvisionConnect()
// instead, which reads credentials from NVS flash.
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASS "YOUR_WIFI_PASS"

// ============================================================
// WiFi Provisioning (captive portal) settings
// ============================================================
#define AP_SSID_PREFIX    "OracleEngine-"  // AP name = prefix + last 4 hex of MAC
#define AP_PASSWORD       ""               // Open AP (no password for easy setup)
#define AP_CHANNEL        1
#define NVS_NAMESPACE     "oracle-eng"     // Preferences namespace for credential storage

// ============================================================
// Server connection defaults (overridable via provisioning portal)
// ============================================================
#define DEFAULT_SERVER_URL  "http://192.168.1.100:8300"
#define DEFAULT_DEITY_ID    "apollo"

// Backend WebSocket server (legacy — prefer provisioned server URL)
#define WS_HOST "192.168.1.XXX"  // Smithers IP on local network
#define WS_PORT 8300
#define WS_PATH "/ws/sphere"

// ============================================================
// Operation mode: WS_MODE for WebSocket voice AI, LOOPBACK_TEST for audio echo
// Only one should be enabled at a time.
// ============================================================
#define WS_MODE            // WebSocket voice AI mode (connects to orb-backend)
// #define LOOPBACK_TEST   // Audio loopback test mode (mic -> speaker echo)

// Default deity and intent for WebSocket mode
#define WS_DEFAULT_DEITY   "apollo"
#define WS_DEFAULT_INTENT  "oracle guidance"

// PTT debounce
#define PTT_DEBOUNCE_MS    50

// Playback ring buffer size (bytes) for TTS audio chunks
#define PLAYBACK_RING_SIZE 8192

// ============================================================
// ESP32-S3-BOX-3 Pin Definitions
// ============================================================
#ifdef TARGET_BOX3
  // Built-in PDM microphone (ES7210 codec on BOX-3)
  #define I2S_MIC_SCK   41   // I2S_BCK
  #define I2S_MIC_WS    42   // I2S_LRCK
  #define I2S_MIC_SD    2    // I2S_DIN (mic data in)

  // Built-in speaker (ES8311 codec on BOX-3)
  #define I2S_SPK_SCK   41   // Shared BCK with mic on BOX-3
  #define I2S_SPK_WS    42   // Shared LRCK with mic on BOX-3
  #define I2S_SPK_SD    15   // I2S_DOUT (speaker data out)

  // Onboard LED (BOX-3 has no user LED; use Serial output for status)
  #define LED_PIN       -1

  // BOX-3 uses ES7210 (ADC) + ES8311 (DAC) codecs over I2C
  #define I2C_SDA       8
  #define I2C_SCL       18
  #define CODEC_ES8311_ADDR 0x18
  #define CODEC_ES7210_ADDR 0x40

  // Push-to-talk: BOX-3 has a BOOT button (GPIO 0)
  #define PTT_BUTTON    0
#endif

// ============================================================
// Bare ESP32-S3-DevKitC-1 + INMP441 + MAX98357A
// ============================================================
#ifdef TARGET_DEVKIT
  // INMP441 I2S MEMS Microphone
  // Pins chosen to avoid strapping pins on ESP32-S3
  #define I2S_MIC_SCK   5    // BCK
  #define I2S_MIC_WS    6    // LRCK / WS
  #define I2S_MIC_SD    7    // SD / DOUT

  // MAX98357A I2S Amplifier
  #define I2S_SPK_SCK   12   // BCK
  #define I2S_SPK_WS    13   // LRCK
  #define I2S_SPK_SD    14   // DIN

  // Onboard LED
  #define LED_PIN       2    // Built-in LED on most DevKit boards

  // Push-to-talk: wire a momentary button to this GPIO (pull-up)
  #define PTT_BUTTON    0    // BOOT button
#endif

// ============================================================
// Audio Configuration
// ============================================================
#define AUDIO_SAMPLE_RATE   16000
#define AUDIO_BITS          16
#define AUDIO_CHANNELS      1
#define AUDIO_BUFFER_SIZE   1024   // Samples per I2S read/write

// ============================================================
// Timing
// ============================================================
#define WIFI_CHECK_INTERVAL_MS  5000   // Check WiFi every 5 seconds
#define HEARTBEAT_INTERVAL_MS   10000  // Print heartbeat every 10 seconds

#endif // CONFIG_H
