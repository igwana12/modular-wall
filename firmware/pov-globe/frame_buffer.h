/**
 * Frame Buffer — POV image data storage and column lookup
 *
 * Stores a complete frame as NUM_COLUMNS x NUM_LEDS pixels (CRGB).
 * At 120 columns x 36 LEDs x 3 bytes = ~13 KB — fits in ESP32-S3 SRAM.
 * For larger frames, PSRAM can be used.
 */
#pragma once

#include "config.h"
#include <FastLED.h>

/**
 * Initialize the frame buffer (zero all pixels).
 */
void frame_init();

/**
 * Load raw RGB data into the frame buffer.
 * Data format: sequential columns, each column is NUM_LEDS x 3 bytes (R, G, B).
 * Total expected length: NUM_COLUMNS * NUM_LEDS * 3 bytes.
 *
 * @param data  Pointer to raw RGB byte array
 * @param len   Length of data in bytes
 * @return      true if loaded successfully, false if length mismatch
 */
bool frame_load(const uint8_t* data, size_t len);

/**
 * Get a pointer to the pixel data for a specific column.
 * Zero-copy for performance — returns direct pointer into frame array.
 *
 * @param col  Column index (0 to NUM_COLUMNS-1)
 * @return     Pointer to CRGB[NUM_LEDS] array for this column
 */
const CRGB* frame_get_column(uint16_t col);

/**
 * Load a test pattern into the frame buffer.
 * Alternating red/blue hemispheres for testing without the Python tool.
 */
void frame_load_test_pattern();
