#ifndef AUDIO_I2S_H
#define AUDIO_I2S_H

#include <Arduino.h>

/**
 * Initialize I2S for audio capture (mic) and playback (speaker).
 *
 * Configures:
 * - I2S port 0: mic input (I2S_MODE_MASTER | I2S_MODE_RX)
 * - I2S port 1: speaker output (I2S_MODE_MASTER | I2S_MODE_TX)
 *
 * For BOX-3: also attempts to initialize ES7210/ES8311 codecs over I2C.
 *
 * @return true if both I2S ports initialized successfully
 */
bool audio_init();

/**
 * Capture audio samples from the microphone via I2S.
 *
 * @param buffer      Output buffer for 16-bit signed PCM samples
 * @param max_samples Maximum number of samples to read
 * @return Number of samples actually read (0 on error or timeout)
 */
int audio_capture(int16_t* buffer, int max_samples);

/**
 * Play audio samples through the speaker via I2S.
 *
 * @param buffer      Input buffer of 16-bit signed PCM samples
 * @param num_samples Number of samples to write
 * @return true if all samples written successfully
 */
bool audio_playback(const int16_t* buffer, int num_samples);

/**
 * Deinitialize I2S drivers for both ports.
 */
void audio_deinit();

/**
 * Calculate RMS (Root Mean Square) of audio buffer for level metering.
 *
 * @param buffer  Audio sample buffer
 * @param samples Number of samples
 * @return RMS value as float
 */
float calculate_rms(int16_t* buffer, int samples);

#endif // AUDIO_I2S_H
