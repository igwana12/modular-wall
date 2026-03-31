/**
 * OTA (Over-The-Air) firmware update module for Oracle Engine.
 *
 * Checks orb-backend at /api/ota/check for newer firmware versions,
 * downloads from /api/ota/download, and flashes via ESP32 httpUpdate.
 *
 * Requires WiFi connection before calling otaCheckForUpdate().
 *
 * NOTE: For production, add SHA256 verification of downloaded binary
 * by comparing the sha256 field from the check response against the
 * downloaded payload. Deferred to v2 for simplicity.
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <HTTPUpdate.h>
#include <ArduinoJson.h>
#include "ota_update.h"

// -- Static state --
static char _serverUrl[128] = "";
static char _currentVersion[32] = "0.0.0";
static char _lastError[128] = "";
static unsigned long _lastCheckMs = 0;


void otaInit(const char* serverUrl, const char* currentVersion) {
    strncpy(_serverUrl, serverUrl, sizeof(_serverUrl) - 1);
    _serverUrl[sizeof(_serverUrl) - 1] = '\0';

    strncpy(_currentVersion, currentVersion, sizeof(_currentVersion) - 1);
    _currentVersion[sizeof(_currentVersion) - 1] = '\0';

    _lastError[0] = '\0';
    _lastCheckMs = 0;

    Serial.printf("[OTA] Initialized: server=%s version=%s\n", _serverUrl, _currentVersion);
}


bool otaCheckForUpdate() {
    // Rate limit: don't check more often than OTA_CHECK_INTERVAL_MS
    // (skip on first call so we check immediately at boot)
    unsigned long now = millis();
    if (_lastCheckMs > 0 && (now - _lastCheckMs) < OTA_CHECK_INTERVAL_MS) {
        return false;
    }
    _lastCheckMs = now;

    if (WiFi.status() != WL_CONNECTED) {
        strncpy(_lastError, "WiFi not connected", sizeof(_lastError) - 1);
        Serial.println("[OTA] WiFi not connected, skipping check");
        return false;
    }

    // -- Step 1: Check for update --
    char checkUrl[256];
    snprintf(checkUrl, sizeof(checkUrl), "%s/api/ota/check?version=%s", _serverUrl, _currentVersion);

    HTTPClient http;
    http.begin(checkUrl);
    http.setTimeout(10000);  // 10s timeout

    Serial.printf("[OTA] Checking for update: %s\n", checkUrl);
    int httpCode = http.GET();

    if (httpCode != 200) {
        snprintf(_lastError, sizeof(_lastError), "Check failed: HTTP %d", httpCode);
        Serial.printf("[OTA] %s\n", _lastError);
        http.end();
        return false;
    }

    String payload = http.getString();
    http.end();

    // Parse JSON response
    JsonDocument doc;
    DeserializationError jsonErr = deserializeJson(doc, payload);
    if (jsonErr) {
        snprintf(_lastError, sizeof(_lastError), "JSON parse error: %s", jsonErr.c_str());
        Serial.printf("[OTA] %s\n", _lastError);
        return false;
    }

    bool updateAvailable = doc["update_available"] | false;
    const char* latestVersion = doc["latest_version"] | "unknown";

    if (!updateAvailable) {
        Serial.printf("[OTA] No update available (current=%s, latest=%s)\n",
                       _currentVersion, latestVersion);
        _lastError[0] = '\0';
        return false;
    }

    Serial.printf("[OTA] Update available: %s -> %s\n", _currentVersion, latestVersion);

    // -- Step 2: Download and flash --
    char downloadUrl[256];
    snprintf(downloadUrl, sizeof(downloadUrl), "%s/api/ota/download", _serverUrl);

    Serial.printf("[OTA] Downloading firmware from: %s\n", downloadUrl);

    WiFiClient wifiClient;
    httpUpdate.rebootOnUpdate(true);  // Auto-reboot after successful flash

    t_httpUpdate_return result = httpUpdate.update(wifiClient, downloadUrl);

    switch (result) {
        case HTTP_UPDATE_OK:
            Serial.println("[OTA] Update success, rebooting...");
            // Device will auto-reboot; this return is rarely reached
            return true;

        case HTTP_UPDATE_FAILED:
            snprintf(_lastError, sizeof(_lastError), "Update failed: %s (err %d)",
                     httpUpdate.getLastErrorString().c_str(),
                     httpUpdate.getLastError());
            Serial.printf("[OTA] %s\n", _lastError);
            return false;

        case HTTP_UPDATE_NO_UPDATES:
            Serial.println("[OTA] Server returned no updates");
            _lastError[0] = '\0';
            return false;

        default:
            snprintf(_lastError, sizeof(_lastError), "Unknown result: %d", result);
            Serial.printf("[OTA] %s\n", _lastError);
            return false;
    }
}


const char* otaGetVersion() {
    return _currentVersion;
}


const char* otaGetLastError() {
    return _lastError;
}
