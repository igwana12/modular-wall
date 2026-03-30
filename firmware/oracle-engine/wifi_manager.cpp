#include <WiFi.h>
#include "wifi_manager.h"


bool wifi_connect(const char* ssid, const char* pass, int timeout_ms) {
    Serial.printf("[WiFi] Connecting to '%s'...\n", ssid);

    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, pass);

    unsigned long start = millis();
    while (WiFi.status() != WL_CONNECTED) {
        if ((millis() - start) > (unsigned long)timeout_ms) {
            Serial.println("[WiFi] Connection FAILED (timeout)");
            return false;
        }
        delay(250);
        Serial.print(".");
    }

    Serial.println();
    wifi_print_status();
    return true;
}


bool wifi_connected() {
    return WiFi.status() == WL_CONNECTED;
}


void wifi_disconnect() {
    WiFi.disconnect(true);
    Serial.println("[WiFi] Disconnected");
}


void wifi_print_status() {
    if (WiFi.status() == WL_CONNECTED) {
        Serial.printf("[WiFi] Connected: %s (RSSI: %d dBm, Channel: %d)\n",
                       WiFi.localIP().toString().c_str(),
                       WiFi.RSSI(),
                       WiFi.channel());
    } else {
        Serial.println("[WiFi] Not connected");
    }
}
