#ifndef LED_TASK_H
#define LED_TASK_H

/**
 * LED Task -- FreeRTOS Core 1 Wrapper
 *
 * Runs the POV LED display, Hall sensor, and motor control on Core 1.
 * Receives state events from audio task to toggle animations.
 */

#include <Arduino.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>

/**
 * FreeRTOS task function for Core 1 LED pipeline.
 * Handles: LED initialization, Hall sensor sync, frame rendering,
 * motor ramping, state-driven animation toggling.
 *
 * @param param  Unused (required by FreeRTOS task signature)
 */
void ledTask(void* param);

/**
 * Task handle for external reference.
 */
extern TaskHandle_t ledTaskHandle;

#endif // LED_TASK_H
