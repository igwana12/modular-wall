#ifndef WIFI_MANAGER_H
#define WIFI_MANAGER_H

#include <Arduino.h>

/**
 * Connect to WiFi network with timeout.
 *
 * @param ssid       WiFi network name
 * @param pass       WiFi password
 * @param timeout_ms Maximum time to wait for connection (default 10s)
 * @return true if connected, false if timed out
 */
bool wifi_connect(const char* ssid, const char* pass, int timeout_ms = 10000);

/**
 * Check if WiFi is currently connected.
 */
bool wifi_connected();

/**
 * Disconnect from WiFi.
 */
void wifi_disconnect();

/**
 * Print WiFi diagnostics (IP, RSSI, channel) to Serial.
 */
void wifi_print_status();

#endif // WIFI_MANAGER_H
