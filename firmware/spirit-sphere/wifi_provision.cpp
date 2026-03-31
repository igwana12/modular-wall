/**
 * WiFi Provisioning Module — Oracle Engine
 *
 * Implements captive portal WiFi provisioning with NVS credential persistence.
 * See wifi_provision.h for API documentation.
 */

#include "wifi_provision.h"
#include "config.h"

#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <Preferences.h>

// ============================================================
// Static state
// ============================================================
static WebServer portalServer(80);
static DNSServer dnsServer;
static Preferences prefs;

static String storedSsid;
static String storedPassword;
static String storedServerUrl;
static String storedDeityId;

static bool portalDone = false;

// ============================================================
// Captive portal HTML
// ============================================================
static const char PORTAL_HTML[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Oracle Engine Setup</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,sans-serif;background:#1a1a2e;color:#e0e0e0;
min-height:100vh;display:flex;align-items:center;justify-content:center}
.card{background:#16213e;border-radius:12px;padding:24px;width:90%;max-width:380px;
box-shadow:0 4px 24px rgba(0,0,0,.4)}
h1{text-align:center;color:#c9a84c;font-size:1.3em;margin-bottom:4px}
.sub{text-align:center;color:#888;font-size:.85em;margin-bottom:20px}
label{display:block;font-size:.85em;color:#aaa;margin:12px 0 4px}
input,select{width:100%;padding:10px;border:1px solid #333;border-radius:6px;
background:#0f1729;color:#e0e0e0;font-size:1em}
select{appearance:none}
.row{display:flex;gap:8px;align-items:end}
.row>*:first-child{flex:1}
button{padding:10px 16px;border:none;border-radius:6px;cursor:pointer;
font-size:.95em;font-weight:600}
.btn-scan{background:#2d4a7a;color:#c9a84c}
.btn-save{width:100%;background:#c9a84c;color:#1a1a2e;margin-top:20px;
padding:12px;font-size:1.05em}
.btn-save:active{background:#b8943e}
.msg{text-align:center;color:#6fcf97;margin-top:12px;display:none}
</style>
</head>
<body>
<div class="card">
<h1>Oracle Engine Setup</h1>
<p class="sub">Configure WiFi and server connection</p>
<form id="f" action="/save" method="POST">
<label for="ssid">WiFi Network</label>
<div class="row">
<select id="ssid" name="ssid"><option value="">-- Select or type below --</option></select>
<button type="button" class="btn-scan" onclick="scan()">Scan</button>
</div>
<label for="ssid_manual">Or enter SSID manually</label>
<input id="ssid_manual" name="ssid_manual" placeholder="Network name">
<label for="password">WiFi Password</label>
<input type="password" id="password" name="password" placeholder="Password">
<label for="server_url">Server URL</label>
<input id="server_url" name="server_url" value="DEFAULT_SERVER_PLACEHOLDER">
<label for="deity_id">Default Deity</label>
<input id="deity_id" name="deity_id" value="DEFAULT_DEITY_PLACEHOLDER">
<button type="submit" class="btn-save">Save &amp; Connect</button>
</form>
<div class="msg" id="msg">Saved! Rebooting...</div>
</div>
<script>
function scan(){
fetch('/scan').then(r=>r.json()).then(nets=>{
var s=document.getElementById('ssid');
s.innerHTML='<option value="">-- Select network --</option>';
nets.forEach(n=>{
var o=document.createElement('option');
o.value=n.ssid;o.textContent=n.ssid+' ('+n.rssi+' dBm)';
s.appendChild(o);
});
}).catch(()=>alert('Scan failed'));
}
document.getElementById('f').onsubmit=function(e){
var sel=document.getElementById('ssid').value;
var man=document.getElementById('ssid_manual').value.trim();
if(man)document.getElementById('ssid').value=man;
else if(!sel){e.preventDefault();alert('Select or enter a WiFi network');return;}
document.querySelector('.btn-save').disabled=true;
document.getElementById('msg').style.display='block';
};
</script>
</body>
</html>
)rawliteral";


// ============================================================
// Portal route handlers
// ============================================================
static void handleRoot() {
    String html = String(PORTAL_HTML);
    html.replace("DEFAULT_SERVER_PLACEHOLDER", DEFAULT_SERVER_URL);
    html.replace("DEFAULT_DEITY_PLACEHOLDER", DEFAULT_DEITY_ID);
    portalServer.send(200, "text/html", html);
}

static void handleScan() {
    int n = WiFi.scanNetworks();
    String json = "[";
    for (int i = 0; i < n; i++) {
        if (i > 0) json += ",";
        json += "{\"ssid\":\"";
        // Escape quotes in SSID
        String ssid = WiFi.SSID(i);
        ssid.replace("\"", "\\\"");
        json += ssid;
        json += "\",\"rssi\":";
        json += String(WiFi.RSSI(i));
        json += "}";
    }
    json += "]";
    WiFi.scanDelete();
    portalServer.send(200, "application/json", json);
}

static void handleSave() {
    // Prefer manual SSID entry over dropdown selection
    String ssid = portalServer.arg("ssid_manual");
    if (ssid.length() == 0) {
        ssid = portalServer.arg("ssid");
    }
    String password  = portalServer.arg("password");
    String serverUrl = portalServer.arg("server_url");
    String deityId   = portalServer.arg("deity_id");

    // Validate: SSID is required
    if (ssid.length() == 0) {
        portalServer.send(400, "text/plain", "SSID is required");
        return;
    }

    // Store in NVS
    prefs.begin(NVS_NAMESPACE, false);
    prefs.putString("ssid", ssid);
    prefs.putString("password", password);
    if (serverUrl.length() > 0) {
        prefs.putString("server_url", serverUrl);
    }
    if (deityId.length() > 0) {
        prefs.putString("deity_id", deityId);
    }
    prefs.end();

    Serial.printf("[PROVISION] Saved credentials for SSID: %s\n", ssid.c_str());
    Serial.printf("[PROVISION] Server URL: %s\n", serverUrl.c_str());
    Serial.printf("[PROVISION] Deity ID: %s\n", deityId.c_str());

    portalServer.send(200, "text/html",
        "<html><body style='background:#1a1a2e;color:#6fcf97;font-family:sans-serif;"
        "display:flex;align-items:center;justify-content:center;height:100vh'>"
        "<h2>Saved! Rebooting in 2 seconds...</h2></body></html>");

    portalDone = true;
}

static void handleNotFound() {
    // Redirect all unknown URLs to portal (captive portal behavior)
    portalServer.sendHeader("Location", "http://192.168.4.1/");
    portalServer.send(302, "text/plain", "Redirect");
}


// ============================================================
// Public API implementation
// ============================================================

void wifiProvisionInit() {
    prefs.begin(NVS_NAMESPACE, true);  // read-only
    storedSsid      = prefs.getString("ssid", "");
    storedPassword  = prefs.getString("password", "");
    storedServerUrl = prefs.getString("server_url", DEFAULT_SERVER_URL);
    storedDeityId   = prefs.getString("deity_id", DEFAULT_DEITY_ID);
    prefs.end();

    Serial.printf("[PROVISION] Init: credentials %s\n",
                  storedSsid.length() > 0 ? "found" : "empty");
}

bool wifiProvisionConnect(unsigned long timeoutMs) {
    if (storedSsid.length() == 0) {
        Serial.println("[PROVISION] No stored credentials, cannot connect");
        return false;
    }

    Serial.printf("[PROVISION] Connecting to '%s'...\n", storedSsid.c_str());

    WiFi.mode(WIFI_STA);
    WiFi.begin(storedSsid.c_str(), storedPassword.c_str());

    unsigned long start = millis();
    while (WiFi.status() != WL_CONNECTED) {
        if (millis() - start > timeoutMs) {
            Serial.printf("[PROVISION] Connection timed out after %lu ms\n", timeoutMs);
            WiFi.disconnect();
            return false;
        }
        delay(100);
        // Blink pattern: rapid during connection attempt
        if ((millis() / 200) % 2 == 0) {
            Serial.print(".");
        }
    }
    Serial.println();
    Serial.printf("[PROVISION] Connected! IP: %s\n", WiFi.localIP().toString().c_str());
    return true;
}

void wifiProvisionPortal() {
    portalDone = false;

    // Generate unique AP name from MAC address
    uint8_t mac[6];
    WiFi.macAddress(mac);
    char apName[32];
    snprintf(apName, sizeof(apName), "%s%02X%02X",
             AP_SSID_PREFIX, mac[4], mac[5]);

    Serial.printf("[PROVISION] Starting captive portal: %s\n", apName);

    // Start AP
    WiFi.mode(WIFI_AP);
    WiFi.softAP(apName, AP_PASSWORD, AP_CHANNEL);
    delay(100);  // Let AP stabilize

    IPAddress apIP = WiFi.softAPIP();
    Serial.printf("[PROVISION] AP IP: %s\n", apIP.toString().c_str());

    // Start DNS server (redirect all domains to AP IP)
    dnsServer.start(53, "*", apIP);

    // Configure routes
    portalServer.on("/", HTTP_GET, handleRoot);
    portalServer.on("/scan", HTTP_GET, handleScan);
    portalServer.on("/save", HTTP_POST, handleSave);
    portalServer.onNotFound(handleNotFound);
    portalServer.begin();

    Serial.println("[PROVISION] Portal active. Connect to AP and visit http://192.168.4.1");

    // Block until credentials submitted
    while (!portalDone) {
        dnsServer.processNextRequest();
        portalServer.handleClient();
        delay(10);
    }

    // Clean up and reboot
    Serial.println("[PROVISION] Credentials saved, rebooting...");
    portalServer.stop();
    dnsServer.stop();
    delay(1000);
    ESP.restart();
}

bool wifiProvisionHasCredentials() {
    return storedSsid.length() > 0;
}

void wifiProvisionClear() {
    prefs.begin(NVS_NAMESPACE, false);
    prefs.clear();
    prefs.end();

    storedSsid = "";
    storedPassword = "";
    storedServerUrl = DEFAULT_SERVER_URL;
    storedDeityId = DEFAULT_DEITY_ID;

    Serial.println("[PROVISION] Credentials cleared (factory reset WiFi)");
}

String wifiProvisionGetServerUrl() {
    return storedServerUrl;
}

String wifiProvisionGetDeityId() {
    return storedDeityId;
}
