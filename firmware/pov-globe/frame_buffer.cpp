/**
 * Frame Buffer — POV image storage implementation
 */
#include "frame_buffer.h"

// Frame storage: [column][led] indexed for fast column access
static CRGB frame[NUM_COLUMNS][NUM_LEDS];

void frame_init() {
    memset(frame, 0, sizeof(frame));
}

bool frame_load(const uint8_t* data, size_t len) {
    const size_t expected = (size_t)NUM_COLUMNS * NUM_LEDS * 3;

    if (len != expected) {
        return false;
    }

    // Unpack sequential RGB bytes into CRGB frame array
    size_t idx = 0;
    for (uint16_t col = 0; col < NUM_COLUMNS; col++) {
        for (uint16_t led = 0; led < NUM_LEDS; led++) {
            frame[col][led].r = data[idx++];
            frame[col][led].g = data[idx++];
            frame[col][led].b = data[idx++];
        }
    }

    return true;
}

const CRGB* frame_get_column(uint16_t col) {
    if (col >= NUM_COLUMNS) {
        col = 0;  // Safety: wrap around
    }
    return frame[col];
}

void frame_load_test_pattern() {
    // Test pattern: red hemisphere (columns 0-59) and blue hemisphere (60-119)
    // with a green stripe at the equator (LED 17-18) for orientation
    for (uint16_t col = 0; col < NUM_COLUMNS; col++) {
        for (uint16_t led = 0; led < NUM_LEDS; led++) {
            // Equator stripe
            if (led == NUM_LEDS / 2 || led == NUM_LEDS / 2 - 1) {
                frame[col][led] = CRGB::Green;
            }
            // Red hemisphere (first 180 degrees)
            else if (col < NUM_COLUMNS / 2) {
                // Fade from bright at equator to dim at poles
                uint8_t intensity = map(abs((int)led - NUM_LEDS / 2), 0, NUM_LEDS / 2, 200, 40);
                frame[col][led] = CRGB(intensity, 0, 0);
            }
            // Blue hemisphere (second 180 degrees)
            else {
                uint8_t intensity = map(abs((int)led - NUM_LEDS / 2), 0, NUM_LEDS / 2, 200, 40);
                frame[col][led] = CRGB(0, 0, intensity);
            }
        }
    }
}
