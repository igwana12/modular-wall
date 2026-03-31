/**
 * LED Driver — FastLED APA102 DMA wrapper
 *
 * Provides the hot-path column display function for POV rendering.
 * Uses ESP32-S3 I2S DMA for glitch-free SPI output alongside WiFi.
 */
#pragma once

#include "config.h"
#include <FastLED.h>

/**
 * Initialize FastLED with APA102 on hardware SPI (I2S DMA).
 * Must be called once in setup().
 */
void led_init();

/**
 * Display a single column of pixel data on the LED strip.
 * This is the hot path — called ~120 times per revolution.
 *
 * @param col_index  Column index (0 to NUM_COLUMNS-1), used for debug only
 * @param column_data  Pointer to CRGB array of NUM_LEDS pixels
 */
void led_show_column(uint16_t col_index, const CRGB* column_data);

/**
 * Turn off all LEDs (fill black + show).
 */
void led_clear();

/**
 * Adjust brightness at runtime (for ambient visibility tuning).
 *
 * @param b  Brightness value 0-255
 */
void led_set_brightness(uint8_t b);

/**
 * Set APA102 global brightness (5-bit, 0-31).
 * APA102 has two brightness controls: global (current limiting) and
 * per-LED PWM (8-bit per channel). For maximum photon output, use
 * global=31 (max) and rely on per-LED PWM for color accuracy.
 *
 * @param gb  Global brightness 0-31
 */
void led_set_global_brightness(uint8_t gb);
