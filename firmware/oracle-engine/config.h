#ifndef CONFIG_H
#define CONFIG_H

// ============================================================
// Oracle Engine Firmware Configuration
// ============================================================

#define FIRMWARE_VERSION "0.1.0"

// ============================================================
// Build target: uncomment ONE of these, or pass as compiler flag
// ============================================================
#define TARGET_BOX3        // ESP32-S3-BOX-3 (built-in mic + speaker)
// #define TARGET_DEVKIT   // Bare ESP32-S3-DevKitC-1 + INMP441 + MAX98357A

// ============================================================
// WiFi credentials (change these before flashing)
// ============================================================
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASS "YOUR_WIFI_PASS"

// Backend WebSocket server
#define WS_HOST "192.168.1.XXX"  // Smithers IP on local network
#define WS_PORT 8300
#define WS_PATH "/ws/sphere"

// ============================================================
// Loopback test mode (comment out to disable)
// ============================================================
#define LOOPBACK_TEST

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
  #define I2S_MIC_SCK   14   // BCK
  #define I2S_MIC_WS    15   // LRCK / WS
  #define I2S_MIC_SD    32   // SD / DOUT

  // MAX98357A I2S Amplifier
  #define I2S_SPK_SCK   26   // BCK
  #define I2S_SPK_WS    25   // LRCK
  #define I2S_SPK_SD    22   // DIN

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
