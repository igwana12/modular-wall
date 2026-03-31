#ifndef OTA_UPDATE_H
#define OTA_UPDATE_H

#include <Arduino.h>

// Configuration
#define OTA_CHECK_INTERVAL_MS  (60 * 60 * 1000)  // Check every hour
#define OTA_SERVER_DEFAULT     "http://192.168.1.100:8300"  // Smithers IP

/**
 * Initialize OTA with server URL and current firmware version.
 * Call once in setup() after WiFi is connected.
 *
 * @param serverUrl  Base URL of orb-backend (e.g. "http://192.168.1.100:8300")
 * @param currentVersion  Semantic version string (e.g. "1.0.0")
 */
void otaInit(const char* serverUrl, const char* currentVersion);

/**
 * Check for updates and apply if available.
 * Returns true if update was applied (device will reboot automatically).
 * Returns false if no update available or update failed.
 *
 * Safe to call periodically in loop() -- checks OTA_CHECK_INTERVAL_MS internally.
 */
bool otaCheckForUpdate();

/**
 * Get current firmware version string.
 */
const char* otaGetVersion();

/**
 * Get last OTA error message (empty string if no error).
 */
const char* otaGetLastError();

#endif
