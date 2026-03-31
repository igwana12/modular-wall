#ifndef WIFI_PROVISION_H
#define WIFI_PROVISION_H

#include <Arduino.h>

/**
 * WiFi Provisioning Module — Oracle Engine
 *
 * Provides captive portal WiFi provisioning for consumer devices.
 * Users connect to the device's AP, get redirected to a setup page,
 * enter WiFi credentials + server URL, and the device reboots connected.
 *
 * Credentials are stored in NVS (Non-Volatile Storage) and persist
 * across reboots and firmware updates.
 *
 * Usage:
 *   wifiProvisionInit();                     // Read stored credentials
 *   if (!wifiProvisionConnect(15000)) {      // Try connecting
 *       wifiProvisionPortal();               // Fall back to captive portal
 *   }
 */

/**
 * Initialize WiFi provisioning system.
 * Reads stored credentials from NVS into memory.
 * Call once in setup() before connect or portal.
 */
void wifiProvisionInit();

/**
 * Attempt to connect with stored credentials.
 * Returns true if connected within timeoutMs.
 * Returns false if no credentials stored or connection timed out.
 *
 * @param timeoutMs  Maximum time to wait for connection (default 15s)
 */
bool wifiProvisionConnect(unsigned long timeoutMs = 15000);

/**
 * Start captive portal for credential entry.
 * Blocks until credentials are submitted and device reboots.
 *
 * Portal runs on 192.168.4.1, redirects all DNS to itself.
 * AP name: OracleEngine-XXXX (last 4 hex of MAC address)
 */
void wifiProvisionPortal();

/**
 * Check if stored credentials exist in NVS.
 */
bool wifiProvisionHasCredentials();

/**
 * Clear stored credentials (factory reset WiFi).
 * Call this to force captive portal on next boot.
 */
void wifiProvisionClear();

/**
 * Get stored server URL (or DEFAULT_SERVER_URL if none stored).
 */
String wifiProvisionGetServerUrl();

/**
 * Get stored deity ID (or DEFAULT_DEITY_ID if none stored).
 */
String wifiProvisionGetDeityId();

#endif // WIFI_PROVISION_H
