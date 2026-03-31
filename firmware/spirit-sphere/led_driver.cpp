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

    // Maximum brightness for ambient visibility (POV-04).
    // APA102 has separate global brightness (5-bit current limit, 0-31)
    // and per-LED PWM (8-bit per channel). We maximize both for photon output.
    FastLED.setBrightness(255);

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

void led_set_global_brightness(uint8_t gb) {
    // Clamp to APA102 5-bit range (0-31)
    if (gb > 31) gb = 31;
    // FastLED handles global brightness via the APA102 start frame.
    // Setting FastLED brightness to (gb * 8) approximates the global
    // current-limit effect. For true hardware global brightness, the
    // APA102 driver byte is set per-LED in the SPI frame.
    // With FastLED, the practical approach is using setBrightness()
    // which applies a software scale. At gb=31, brightness=255 (max).
    uint8_t scaled = (uint8_t)((uint16_t)gb * 255 / 31);
    FastLED.setBrightness(scaled);
}
