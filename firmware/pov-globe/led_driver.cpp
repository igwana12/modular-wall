/**
 * LED Driver — FastLED APA102 DMA implementation
 */
#include "led_driver.h"

// LED pixel array — written to by led_show_column, pushed by FastLED.show()
static CRGB leds[NUM_LEDS];

void led_init() {
    // APA102 on hardware SPI with I2S DMA (configured via config.h defines).
    // BGR color order is standard for APA102 / SK9822 strips.
    FastLED.addLeds<APA102, DATA_PIN, CLOCK_PIN, BGR>(leds, NUM_LEDS);
    FastLED.setBrightness(BRIGHTNESS);

    // Start dark
    fill_solid(leds, NUM_LEDS, CRGB::Black);
    FastLED.show();
}

void led_show_column(uint16_t col_index, const CRGB* column_data) {
    // Hot path: memcpy column data into LED array and push to strip.
    // memcpy is faster than element-wise copy for 36 x 3 = 108 bytes.
    memcpy(leds, column_data, sizeof(CRGB) * NUM_LEDS);
    FastLED.show();
}

void led_clear() {
    fill_solid(leds, NUM_LEDS, CRGB::Black);
    FastLED.show();
}

void led_set_brightness(uint8_t b) {
    FastLED.setBrightness(b);
}
