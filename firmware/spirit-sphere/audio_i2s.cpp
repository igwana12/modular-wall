/**
 * I2S Audio driver for Oracle Engine.
 *
 * Uses ESP-IDF I2S driver (driver/i2s.h) through Arduino framework.
 * Port 0 = mic input (RX), Port 1 = speaker output (TX).
 *
 * For ESP32-S3-BOX-3: the ES7210 (ADC) and ES8311 (DAC) codecs
 * require I2C initialization before I2S audio flows correctly.
 */

#include <driver/i2s.h>
#include "audio_i2s.h"
#include "config.h"

#ifdef TARGET_BOX3
#include <Wire.h>
#endif

// I2S port assignments
#define I2S_PORT_MIC  I2S_NUM_0
#define I2S_PORT_SPK  I2S_NUM_1


// ============================================================
// BOX-3 Codec I2C Initialization
// ============================================================
#ifdef TARGET_BOX3

/**
 * Write a single register to an I2C device.
 */
static bool i2c_write_reg(uint8_t addr, uint8_t reg, uint8_t val) {
    Wire.beginTransmission(addr);
    Wire.write(reg);
    Wire.write(val);
    return Wire.endTransmission() == 0;
}

/**
 * Initialize ES8311 DAC codec for speaker output.
 *
 * Minimal init sequence: reset, set clock, enable DAC, set volume.
 * Reference: ES8311 datasheet and esp-box BSP library.
 */
static bool codec_es8311_init() {
    Serial.println("[AUDIO] Initializing ES8311 DAC...");

    // Software reset
    i2c_write_reg(CODEC_ES8311_ADDR, 0x00, 0x1F);
    delay(20);
    i2c_write_reg(CODEC_ES8311_ADDR, 0x00, 0x00);
    delay(20);

    // Clock configuration: MCLK from I2S BCK, auto-detect ratio
    i2c_write_reg(CODEC_ES8311_ADDR, 0x01, 0x3F);  // CLK manager: MCLK power on
    i2c_write_reg(CODEC_ES8311_ADDR, 0x02, 0x00);  // CLK DIV1
    i2c_write_reg(CODEC_ES8311_ADDR, 0x03, 0x10);  // CLK DIV2
    i2c_write_reg(CODEC_ES8311_ADDR, 0x04, 0x10);  // CLK ADC/DAC div
    i2c_write_reg(CODEC_ES8311_ADDR, 0x05, 0x00);  // CLK manager

    // I2S format: 16-bit, standard I2S
    i2c_write_reg(CODEC_ES8311_ADDR, 0x09, 0x0C);  // SDP in: 16-bit I2S
    i2c_write_reg(CODEC_ES8311_ADDR, 0x0A, 0x0C);  // SDP out: 16-bit I2S

    // System config: power up DAC
    i2c_write_reg(CODEC_ES8311_ADDR, 0x0D, 0x01);  // System: power on
    i2c_write_reg(CODEC_ES8311_ADDR, 0x0E, 0x02);  // System: enable DAC
    i2c_write_reg(CODEC_ES8311_ADDR, 0x12, 0x00);  // System: DAC power on

    // DAC volume: 0dB (0xBF = 0dB per datasheet)
    i2c_write_reg(CODEC_ES8311_ADDR, 0x32, 0xBF);

    // Enable DAC output
    i2c_write_reg(CODEC_ES8311_ADDR, 0x37, 0x08);  // DAC output enable

    Serial.println("[AUDIO] ES8311 DAC init done");
    // TODO: If audio output is silent, may need esp-box BSP library
    // for full codec configuration with proper clock tree setup.
    return true;
}

/**
 * Initialize ES7210 ADC codec for microphone input.
 *
 * Minimal init sequence: reset, enable ADC, set gain.
 * Reference: ES7210 datasheet and esp-box BSP library.
 */
static bool codec_es7210_init() {
    Serial.println("[AUDIO] Initializing ES7210 ADC...");

    // Software reset
    i2c_write_reg(CODEC_ES7210_ADDR, 0x00, 0xFF);
    delay(20);
    i2c_write_reg(CODEC_ES7210_ADDR, 0x00, 0x41);  // Exit reset, clock on
    delay(20);

    // Master clock config
    i2c_write_reg(CODEC_ES7210_ADDR, 0x01, 0x20);  // MCLK sel
    i2c_write_reg(CODEC_ES7210_ADDR, 0x02, 0xC1);  // CLK div

    // I2S format: 16-bit, standard I2S
    i2c_write_reg(CODEC_ES7210_ADDR, 0x11, 0x60);  // SDP: 16-bit I2S

    // ADC enable: channel 1 (mono mic)
    i2c_write_reg(CODEC_ES7210_ADDR, 0x40, 0xC1);  // Power on ADC1
    i2c_write_reg(CODEC_ES7210_ADDR, 0x43, 0x1E);  // Mic gain: ~30dB

    Serial.println("[AUDIO] ES7210 ADC init done");
    // TODO: If mic input is silent, may need esp-box BSP library
    // for full codec configuration with proper clock tree setup.
    return true;
}

#endif // TARGET_BOX3


// ============================================================
// I2S Driver Setup
// ============================================================

bool audio_init() {
    Serial.println("[AUDIO] Initializing I2S...");

#ifdef TARGET_BOX3
    // Initialize I2C for codec communication
    Wire.begin(I2C_SDA, I2C_SCL);
    Wire.setClock(100000);  // 100kHz I2C

    // Initialize codecs before starting I2S
    codec_es8311_init();
    codec_es7210_init();
#endif

    // -- Configure I2S port 0: Microphone input (RX) --
    i2s_config_t mic_config = {};
    mic_config.mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX);
    mic_config.sample_rate = AUDIO_SAMPLE_RATE;
    mic_config.bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT;
    mic_config.channel_format = I2S_CHANNEL_FMT_ONLY_LEFT;
    mic_config.communication_format = I2S_COMM_FORMAT_STAND_I2S;
    mic_config.intr_alloc_flags = ESP_INTR_FLAG_LEVEL1;
    mic_config.dma_buf_count = 4;
    mic_config.dma_buf_len = AUDIO_BUFFER_SIZE;
    mic_config.use_apll = false;
    mic_config.tx_desc_auto_clear = false;
    mic_config.fixed_mclk = 0;

    esp_err_t err = i2s_driver_install(I2S_PORT_MIC, &mic_config, 0, NULL);
    if (err != ESP_OK) {
        Serial.printf("[AUDIO] Failed to install I2S mic driver: %d\n", err);
        return false;
    }

    i2s_pin_config_t mic_pins = {};
    mic_pins.bck_io_num = I2S_MIC_SCK;
    mic_pins.ws_io_num = I2S_MIC_WS;
    mic_pins.data_in_num = I2S_MIC_SD;
    mic_pins.data_out_num = I2S_PIN_NO_CHANGE;

    err = i2s_set_pin(I2S_PORT_MIC, &mic_pins);
    if (err != ESP_OK) {
        Serial.printf("[AUDIO] Failed to set I2S mic pins: %d\n", err);
        return false;
    }

    i2s_zero_dma_buffer(I2S_PORT_MIC);

    Serial.printf("[AUDIO] Mic I2S port %d configured (SCK=%d WS=%d SD=%d)\n",
                   I2S_PORT_MIC, I2S_MIC_SCK, I2S_MIC_WS, I2S_MIC_SD);

    // -- Configure I2S port 1: Speaker output (TX) --
    i2s_config_t spk_config = {};
    spk_config.mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_TX);
    spk_config.sample_rate = AUDIO_SAMPLE_RATE;
    spk_config.bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT;
    spk_config.channel_format = I2S_CHANNEL_FMT_ONLY_LEFT;
    spk_config.communication_format = I2S_COMM_FORMAT_STAND_I2S;
    spk_config.intr_alloc_flags = ESP_INTR_FLAG_LEVEL1;
    spk_config.dma_buf_count = 4;
    spk_config.dma_buf_len = AUDIO_BUFFER_SIZE;
    spk_config.use_apll = false;
    spk_config.tx_desc_auto_clear = true;  // Silence when no data
    spk_config.fixed_mclk = 0;

    err = i2s_driver_install(I2S_PORT_SPK, &spk_config, 0, NULL);
    if (err != ESP_OK) {
        Serial.printf("[AUDIO] Failed to install I2S speaker driver: %d\n", err);
        return false;
    }

    i2s_pin_config_t spk_pins = {};
    spk_pins.bck_io_num = I2S_SPK_SCK;
    spk_pins.ws_io_num = I2S_SPK_WS;
    spk_pins.data_out_num = I2S_SPK_SD;
    spk_pins.data_in_num = I2S_PIN_NO_CHANGE;

    err = i2s_set_pin(I2S_PORT_SPK, &spk_pins);
    if (err != ESP_OK) {
        Serial.printf("[AUDIO] Failed to set I2S speaker pins: %d\n", err);
        return false;
    }

    i2s_zero_dma_buffer(I2S_PORT_SPK);

    Serial.printf("[AUDIO] Speaker I2S port %d configured (SCK=%d WS=%d SD=%d)\n",
                   I2S_PORT_SPK, I2S_SPK_SCK, I2S_SPK_WS, I2S_SPK_SD);

    Serial.println("[AUDIO] I2S initialization complete");
    return true;
}


int audio_capture(int16_t* buffer, int max_samples) {
    size_t bytes_to_read = max_samples * sizeof(int16_t);
    size_t bytes_read = 0;

    esp_err_t err = i2s_read(I2S_PORT_MIC, buffer, bytes_to_read, &bytes_read, 100 / portTICK_PERIOD_MS);

    if (err != ESP_OK) {
        return 0;
    }

    return bytes_read / sizeof(int16_t);
}


bool audio_playback(const int16_t* buffer, int num_samples) {
    size_t bytes_to_write = num_samples * sizeof(int16_t);
    size_t bytes_written = 0;

    esp_err_t err = i2s_write(I2S_PORT_SPK, buffer, bytes_to_write, &bytes_written, 100 / portTICK_PERIOD_MS);

    return (err == ESP_OK) && (bytes_written == bytes_to_write);
}


void audio_deinit() {
    i2s_driver_uninstall(I2S_PORT_MIC);
    i2s_driver_uninstall(I2S_PORT_SPK);
    Serial.println("[AUDIO] I2S drivers uninstalled");
}


float calculate_rms(int16_t* buffer, int samples) {
    if (samples <= 0) return 0.0f;

    float sum_sq = 0.0f;
    for (int i = 0; i < samples; i++) {
        float s = (float)buffer[i];
        sum_sq += s * s;
    }

    return sqrtf(sum_sq / (float)samples);
}
