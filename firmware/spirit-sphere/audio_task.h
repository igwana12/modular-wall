#ifndef AUDIO_TASK_H
#define AUDIO_TASK_H

/**
 * Audio Task -- FreeRTOS Core 0 Wrapper
 *
 * Runs the entire audio/WiFi/WebSocket/OTA pipeline on Core 0.
 * Communicates state changes to LED task via state_machine queue.
 */

#include <Arduino.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>

/**
 * FreeRTOS task function for Core 0 audio pipeline.
 * Handles: WiFi provisioning, WebSocket connection, audio capture/playback,
 * PTT state machine, mute integration, OTA updates, heap monitoring.
 *
 * @param param  Unused (required by FreeRTOS task signature)
 */
void audioTask(void* param);

/**
 * Task handle for external reference (e.g. vTaskDelete, priority changes).
 */
extern TaskHandle_t audioTaskHandle;

#endif // AUDIO_TASK_H
