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
#if POV_MODE_SPHERE
    // Spherical test pattern: simulates a globe with latitude/longitude grid
    // LED 0 = north pole, LED 17 = equator, LED 35 = south pole
    // Columns 0-119 = longitude (0-360 degrees)
    for (uint16_t col = 0; col < NUM_COLUMNS; col++) {
        for (uint16_t led = 0; led < NUM_LEDS; led++) {
            // Latitude: LED position maps to -90 (pole) to +90 (opposite pole)
            // Equator is at NUM_LEDS/2

            // Grid lines: longitude lines every 30 degrees (every 10 columns)
            bool lon_line = (col % 10 == 0);
            // Grid lines: latitude lines every 30 degrees (every 6 LEDs)
            bool lat_line = (led % 6 == 0);
            // Equator (bright)
            bool equator = (led == NUM_LEDS / 2 || led == NUM_LEDS / 2 - 1);
            // Prime meridian (bright)
            bool prime = (col == 0 || col == 1);

            if (equator) {
                frame[col][led] = CRGB(0, 255, 0);   // Bright green equator
            } else if (prime) {
                frame[col][led] = CRGB(255, 255, 0);  // Yellow prime meridian
            } else if (lon_line || lat_line) {
                frame[col][led] = CRGB(0, 80, 120);   // Dim cyan grid
            } else {
                // Fill: blue ocean in one hemisphere, teal in the other
                // to confirm hemisphere differentiation
                if (col < NUM_COLUMNS / 2) {
                    uint8_t intensity = map(abs((int)led - NUM_LEDS / 2), 0, NUM_LEDS / 2, 60, 15);
                    frame[col][led] = CRGB(0, 0, intensity);  // Blue hemisphere
                } else {
                    uint8_t intensity = map(abs((int)led - NUM_LEDS / 2), 0, NUM_LEDS / 2, 60, 15);
                    frame[col][led] = CRGB(0, intensity, intensity / 2);  // Teal hemisphere
                }
            }
        }
    }
#else
    // Flat test pattern: red/blue hemispheres with green equator stripe
    for (uint16_t col = 0; col < NUM_COLUMNS; col++) {
        for (uint16_t led = 0; led < NUM_LEDS; led++) {
            if (led == NUM_LEDS / 2 || led == NUM_LEDS / 2 - 1) {
                frame[col][led] = CRGB::Green;
            } else if (col < NUM_COLUMNS / 2) {
                uint8_t intensity = map(abs((int)led - NUM_LEDS / 2), 0, NUM_LEDS / 2, 200, 40);
                frame[col][led] = CRGB(intensity, 0, 0);
            } else {
                uint8_t intensity = map(abs((int)led - NUM_LEDS / 2), 0, NUM_LEDS / 2, 200, 40);
                frame[col][led] = CRGB(0, 0, intensity);
            }
        }
    }
#endif
}
