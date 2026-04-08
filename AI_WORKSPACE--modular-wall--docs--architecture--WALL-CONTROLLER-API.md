# mosAIc Wall Controller Agent — API Specification

**Date**: 2026-04-06
**Version**: 1.0
**Status**: Specification
**Framework**: FastAPI (Python 3.11+)
**Port**: 8200 (localhost) / 80 (production)

---

## Overview

The **Wall Controller Agent** is a FastAPI service that acts as the central intelligence hub for a mosAIc modular wall. It coordinates module discovery, content routing, scene management, and real-time synchronization across all connected modules.

### Key Responsibilities
1. **Module Discovery & Registration** — Auto-discover ESP32 modules via mDNS/MQTT
2. **Content Routing** — Route data (weather, clock, audio, etc.) to appropriate modules
3. **Scene Management** — Switch between presets (Morning, Focus, Movie, Sleep)
4. **Widget Serving** — Serve Three.js UIs to module displays
5. **Real-time Updates** — WebSocket broadcasts for live state changes
6. **Integration** — Connect to JARVIS/Smithers for AI orchestration

### Architecture Position

```
User / Voice / App
      │
      ▼
┌─────────────────────────┐
│  JARVIS / Smithers      │  AI orchestration (existing)
│  (FastAPI @ 8200)       │
└────────┬────────────────┘
         │ HTTP/WS
         ▼
┌─────────────────────────┐
│ Wall Controller Agent   │  ← THIS API
│ (FastAPI @ 8200/wall)   │  Module coordination
└────────┬────────────────┘
         │
    ┌────┼─────────────┐
    │    │             │
    ▼    ▼             ▼
  HTTP WebSocket    MQTT
    │    │             │
    ▼    ▼             ▼
ESP32 Modules (10-50 units)
```

---

## API Endpoints

### Base URL
```
http://hub.local:8200/api/wall/
```

---

## 1. Module Management

### `GET /api/wall/modules`
List all discovered modules with their current status.

**Response**: `200 OK`
```json
{
  "modules": [
    {
      "id": "screen-s-01",
      "type": "Screen-S",
      "status": "active",
      "position": { "x": 0, "y": 0 },
      "ip": "192.168.1.101",
      "firmware": "v1.2.0",
      "lastSeen": "2026-04-06T09:30:15Z",
      "capabilities": ["display", "touch", "wifi"],
      "resolution": { "width": 320, "height": 240 },
      "currentContent": "weather-widget",
      "uptime": 86400
    },
    {
      "id": "glow-01",
      "type": "Glow",
      "status": "active",
      "position": { "x": 1, "y": 0 },
      "ip": "192.168.1.102",
      "firmware": "v1.2.0",
      "lastSeen": "2026-04-06T09:30:16Z",
      "capabilities": ["led-matrix"],
      "ledCount": 256,
      "currentPattern": "circadian",
      "uptime": 86401
    }
  ],
  "totalModules": 2,
  "activeModules": 2,
  "timestamp": "2026-04-06T09:30:17Z"
}
```

**Query Parameters**:
- `type` (optional): Filter by module type (`Screen-S`, `Glow`, `Pixel`, etc.)
- `status` (optional): Filter by status (`active`, `idle`, `error`, `offline`)
- `position` (optional): Filter by grid position (e.g., `x=0&y=0`)

---

### `GET /api/wall/modules/{module_id}`
Get detailed information about a specific module.

**Parameters**:
- `module_id` (path): Module identifier (e.g., `screen-s-01`)

**Response**: `200 OK`
```json
{
  "id": "screen-s-01",
  "type": "Screen-S",
  "status": "active",
  "position": { "x": 0, "y": 0 },
  "ip": "192.168.1.101",
  "mac": "AA:BB:CC:DD:EE:FF",
  "firmware": "v1.2.0",
  "hardware": {
    "soc": "ESP32-S3-N8R2",
    "display": "2.8\" LCD 320x240",
    "touch": "Resistive"
  },
  "capabilities": ["display", "touch", "wifi"],
  "currentContent": "weather-widget",
  "contentUrl": "http://hub.local:8200/widgets/weather.html",
  "stats": {
    "uptime": 86400,
    "temperature": 42.5,
    "freeHeap": 120000,
    "wifiRssi": -45,
    "frameRate": 30
  },
  "config": {
    "brightness": 80,
    "sleepTimeout": 300,
    "orientation": 0
  },
  "lastSeen": "2026-04-06T09:30:15Z",
  "createdAt": "2026-04-05T10:00:00Z"
}
```

**Errors**:
- `404 Not Found`: Module ID does not exist

---

### `PUT /api/wall/modules/{module_id}/position`
Update the physical position of a module in the wall grid.

**Parameters**:
- `module_id` (path): Module identifier

**Request Body**:
```json
{
  "x": 2,
  "y": 1
}
```

**Response**: `200 OK`
```json
{
  "id": "screen-s-01",
  "position": { "x": 2, "y": 1 },
  "updated": "2026-04-06T09:35:00Z"
}
```

---

### `POST /api/wall/modules/{module_id}/reboot`
Remotely reboot a module.

**Parameters**:
- `module_id` (path): Module identifier

**Response**: `202 Accepted`
```json
{
  "message": "Reboot command sent to screen-s-01",
  "estimatedDowntime": 15
}
```

---

### `POST /api/wall/modules/{module_id}/update`
Trigger OTA firmware update for a module.

**Request Body**:
```json
{
  "firmwareUrl": "http://hub.local:8200/firmware/screen-s-v1.3.0.bin"
}
```

**Response**: `202 Accepted`
```json
{
  "message": "Update initiated for screen-s-01",
  "estimatedDuration": 120
}
```

---

## 2. Content Routing

### `POST /api/wall/modules/{module_id}/content`
Push content to a specific module.

**Parameters**:
- `module_id` (path): Module identifier

**Request Body** (varies by module type):

**For Screen-S (display module)**:
```json
{
  "type": "widget",
  "url": "http://hub.local:8200/widgets/weather.html",
  "refreshRate": 300
}
```

**For Glow (LED module)**:
```json
{
  "type": "pattern",
  "pattern": "circadian",
  "params": {
    "timeOfDay": 8.5,
    "brightness": 0.8
  }
}
```

**For Pixel (LED matrix)**:
```json
{
  "type": "visualizer",
  "mode": "audio-reactive",
  "audioSource": "http://hub.local:8200/api/audio/stream"
}
```

**Response**: `200 OK`
```json
{
  "message": "Content updated successfully",
  "moduleId": "screen-s-01",
  "contentType": "widget",
  "timestamp": "2026-04-06T09:40:00Z"
}
```

---

### `DELETE /api/wall/modules/{module_id}/content`
Clear current content from a module (return to idle/default state).

**Response**: `200 OK`
```json
{
  "message": "Content cleared",
  "moduleId": "screen-s-01",
  "timestamp": "2026-04-06T09:45:00Z"
}
```

---

## 3. Scene Management

### `GET /api/wall/scenes`
List all available scenes/presets.

**Response**: `200 OK`
```json
{
  "scenes": [
    {
      "id": "morning",
      "name": "Morning",
      "description": "Warm light, calendar, weather, sleep summary",
      "modules": ["screen-s-01", "glow-01", "glow-02"],
      "createdAt": "2026-04-05T10:00:00Z",
      "lastUsed": "2026-04-06T07:00:00Z",
      "usageCount": 15
    },
    {
      "id": "focus",
      "name": "Focus",
      "description": "Dim ambient, clock only, DND mode",
      "modules": ["screen-s-01", "glow-01"],
      "createdAt": "2026-04-05T10:00:00Z",
      "lastUsed": "2026-04-06T09:00:00Z",
      "usageCount": 42
    },
    {
      "id": "movie",
      "name": "Movie",
      "description": "All lights dim, bias lighting active",
      "modules": ["glow-01", "glow-02", "glow-03"],
      "createdAt": "2026-04-05T10:00:00Z",
      "lastUsed": "2026-04-05T21:00:00Z",
      "usageCount": 8
    },
    {
      "id": "sleep",
      "name": "Sleep",
      "description": "Red-shifted glow, no screens",
      "modules": ["glow-01"],
      "createdAt": "2026-04-05T10:00:00Z",
      "lastUsed": "2026-04-06T23:00:00Z",
      "usageCount": 12
    }
  ],
  "activeScene": "focus",
  "timestamp": "2026-04-06T09:50:00Z"
}
```

---

### `GET /api/wall/scenes/{scene_id}`
Get detailed configuration for a specific scene.

**Response**: `200 OK`
```json
{
  "id": "morning",
  "name": "Morning",
  "description": "Warm light, calendar, weather, sleep summary",
  "config": {
    "screen-s-01": {
      "contentType": "widget",
      "url": "http://hub.local:8200/widgets/weather.html",
      "brightness": 80
    },
    "glow-01": {
      "pattern": "circadian",
      "params": {
        "timeOfDay": "auto",
        "brightness": 0.7
      }
    },
    "glow-02": {
      "pattern": "ambient",
      "params": {
        "color": "#FFB347",
        "brightness": 0.5
      }
    }
  },
  "triggers": [
    {
      "type": "time",
      "time": "06:00",
      "days": ["mon", "tue", "wed", "thu", "fri"]
    }
  ],
  "transition": {
    "duration": 5.0,
    "easing": "easeInOut"
  }
}
```

---

### `POST /api/wall/scenes/{scene_id}/activate`
Activate a scene (switch all modules to scene configuration).

**Parameters**:
- `scene_id` (path): Scene identifier

**Query Parameters**:
- `transition` (optional): Transition duration in seconds (default: 2.0)

**Response**: `200 OK`
```json
{
  "message": "Scene 'morning' activated",
  "sceneId": "morning",
  "affectedModules": ["screen-s-01", "glow-01", "glow-02"],
  "transition": 5.0,
  "timestamp": "2026-04-06T09:55:00Z"
}
```

---

### `POST /api/wall/scenes`
Create a new scene.

**Request Body**:
```json
{
  "name": "Meditation",
  "description": "Deep purple ambient, no screens",
  "config": {
    "glow-01": {
      "pattern": "mood-wave",
      "params": {
        "moodType": "calm",
        "color": "#8888FF"
      }
    }
  }
}
```

**Response**: `201 Created`
```json
{
  "id": "meditation",
  "name": "Meditation",
  "createdAt": "2026-04-06T10:00:00Z"
}
```

---

### `PUT /api/wall/scenes/{scene_id}`
Update an existing scene configuration.

**Response**: `200 OK`

---

### `DELETE /api/wall/scenes/{scene_id}`
Delete a scene.

**Response**: `204 No Content`

---

## 4. Widget Serving

### `GET /api/wall/widgets/{widget_name}`
Serve a Three.js widget HTML file.

**Parameters**:
- `widget_name` (path): Widget filename (e.g., `weather.html`)

**Response**: `200 OK` (HTML content)

**Available Widgets**:
- `weather.html` — Screen-S weather widget
- `clock.html` — Round circular clock
- `audio-visualizer.html` — Pixel audio visualizer
- `glow-preview.html` — Glow LED preview
- `configurator.html` — Hub 3D wall configurator

---

### `GET /api/wall/widgets/{widget_name}/preview`
Get a screenshot/preview image of a widget.

**Response**: `200 OK` (PNG image)

---

## 5. Data Sources

### `GET /api/wall/weather/current`
Get current weather data (for Screen-S weather widget).

**Response**: `200 OK`
```json
{
  "temp": 72,
  "tempUnit": "F",
  "condition": "Partly Cloudy",
  "icon": "partly-cloudy",
  "location": "San Francisco, CA",
  "humidity": 65,
  "windSpeed": 12,
  "windDirection": "NW",
  "forecast": [
    {
      "day": "Mon",
      "high": 75,
      "low": 58,
      "condition": "Sunny",
      "icon": "sunny"
    },
    {
      "day": "Tue",
      "high": 70,
      "low": 55,
      "condition": "Cloudy",
      "icon": "cloudy"
    }
  ],
  "lastUpdated": "2026-04-06T09:45:00Z"
}
```

---

### `GET /api/wall/time`
Get current time data (for clock widgets).

**Response**: `200 OK`
```json
{
  "timestamp": "2026-04-06T10:15:30Z",
  "timezone": "America/Los_Angeles",
  "localTime": "10:15:30",
  "date": "2026-04-06",
  "dayOfWeek": "Sunday",
  "epoch": 1775577330
}
```

---

### `GET /api/wall/notifications`
Get active notifications (for Round module notification orbit).

**Response**: `200 OK`
```json
{
  "notifications": [
    {
      "id": "notif-001",
      "type": "slack",
      "title": "New message in #the-wall",
      "body": "Apollo: Just finished the renders!",
      "icon": "slack",
      "timestamp": "2026-04-06T10:10:00Z",
      "priority": "normal"
    },
    {
      "id": "notif-002",
      "type": "calendar",
      "title": "Meeting in 15 minutes",
      "body": "Team standup",
      "icon": "calendar",
      "timestamp": "2026-04-06T10:00:00Z",
      "priority": "high"
    }
  ],
  "unreadCount": 2,
  "timestamp": "2026-04-06T10:15:00Z"
}
```

---

### `GET /api/wall/audio/stream`
Get audio stream URL (for Pixel audio visualizer).

**Response**: `200 OK`
```json
{
  "streamUrl": "ws://hub.local:8200/ws/audio",
  "format": "pcm",
  "sampleRate": 44100,
  "channels": 2
}
```

---

### `GET /api/wall/health/stats`
Get health/fitness stats (for Mirror module).

**Response**: `200 OK`
```json
{
  "steps": 8432,
  "stepGoal": 10000,
  "calories": 420,
  "activeMinutes": 45,
  "heartRate": 72,
  "heartRateZone": "resting",
  "sleep": {
    "duration": 7.5,
    "quality": "good"
  },
  "lastSync": "2026-04-06T09:00:00Z"
}
```

---

## 6. WebSocket Real-Time Updates

### `WS /ws/modules`
Subscribe to real-time module state changes.

**Connection**: `ws://hub.local:8200/ws/modules`

**Messages Received**:

**Module Status Update**:
```json
{
  "event": "module.status",
  "moduleId": "screen-s-01",
  "status": "active",
  "timestamp": "2026-04-06T10:20:00Z"
}
```

**Module Content Changed**:
```json
{
  "event": "module.content",
  "moduleId": "screen-s-01",
  "contentType": "widget",
  "contentUrl": "http://hub.local:8200/widgets/clock.html",
  "timestamp": "2026-04-06T10:20:05Z"
}
```

**Module Discovered**:
```json
{
  "event": "module.discovered",
  "module": {
    "id": "glow-03",
    "type": "Glow",
    "ip": "192.168.1.103",
    "position": { "x": 2, "y": 0 }
  },
  "timestamp": "2026-04-06T10:20:10Z"
}
```

**Module Offline**:
```json
{
  "event": "module.offline",
  "moduleId": "screen-s-01",
  "reason": "timeout",
  "timestamp": "2026-04-06T10:20:15Z"
}
```

---

### `WS /ws/scenes`
Subscribe to scene activation events.

**Messages Received**:
```json
{
  "event": "scene.activated",
  "sceneId": "morning",
  "sceneName": "Morning",
  "affectedModules": ["screen-s-01", "glow-01", "glow-02"],
  "transition": 5.0,
  "timestamp": "2026-04-06T10:25:00Z"
}
```

---

### `WS /ws/audio`
Real-time audio data stream for audio visualizers.

**Format**: Binary WebSocket frames
- PCM audio data
- 44.1kHz, 16-bit, stereo
- 1024-sample frames (~23ms per frame)

---

## 7. System Health

### `GET /api/wall/health`
Get overall system health status.

**Response**: `200 OK`
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 864000,
  "modules": {
    "total": 10,
    "active": 9,
    "idle": 0,
    "error": 1,
    "offline": 0
  },
  "system": {
    "cpuUsage": 15.2,
    "memoryUsage": 45.8,
    "diskUsage": 62.3,
    "temperature": 55.0
  },
  "services": {
    "mqtt": "healthy",
    "mdns": "healthy",
    "websocket": "healthy"
  },
  "timestamp": "2026-04-06T10:30:00Z"
}
```

---

### `GET /api/wall/logs`
Get recent system logs.

**Query Parameters**:
- `limit` (optional): Number of log entries (default: 100, max: 1000)
- `level` (optional): Filter by log level (`debug`, `info`, `warning`, `error`)
- `moduleId` (optional): Filter by module ID

**Response**: `200 OK`
```json
{
  "logs": [
    {
      "timestamp": "2026-04-06T10:28:45Z",
      "level": "info",
      "moduleId": "screen-s-01",
      "message": "Content updated: weather-widget",
      "metadata": {
        "previousContent": "clock-widget",
        "contentUrl": "http://hub.local:8200/widgets/weather.html"
      }
    },
    {
      "timestamp": "2026-04-06T10:27:30Z",
      "level": "warning",
      "moduleId": "glow-02",
      "message": "Temperature high: 65°C",
      "metadata": {
        "temperature": 65.2,
        "threshold": 60.0
      }
    }
  ],
  "totalLogs": 2,
  "timestamp": "2026-04-06T10:30:00Z"
}
```

---

## 8. Configuration

### `GET /api/wall/config`
Get current Wall Controller configuration.

**Response**: `200 OK`
```json
{
  "discovery": {
    "mdnsEnabled": true,
    "mqttEnabled": true,
    "discoveryInterval": 30
  },
  "scenes": {
    "autoActivation": true,
    "defaultScene": "morning",
    "transitionDuration": 2.0
  },
  "modules": {
    "heartbeatTimeout": 60,
    "maxModules": 50,
    "defaultBrightness": 80
  },
  "network": {
    "wifiSSID": "mosAIc-Wall",
    "mqttBroker": "192.168.1.1:1883"
  }
}
```

---

### `PUT /api/wall/config`
Update Wall Controller configuration.

**Request Body**: Same structure as GET response

**Response**: `200 OK`

---

## Data Models

### Module
```typescript
interface Module {
  id: string;                    // Unique identifier (e.g., "screen-s-01")
  type: ModuleType;              // "Screen-S" | "Glow" | "Pixel" | ...
  status: ModuleStatus;          // "active" | "idle" | "error" | "offline"
  position: { x: number; y: number };
  ip: string;
  mac?: string;
  firmware: string;
  hardware?: HardwareInfo;
  capabilities: string[];
  currentContent?: string;
  contentUrl?: string;
  stats?: ModuleStats;
  config?: ModuleConfig;
  lastSeen: string;              // ISO 8601 timestamp
  createdAt: string;
  updatedAt?: string;
}

type ModuleType =
  | "Screen-S"
  | "Screen-M"
  | "Glow"
  | "Pixel"
  | "Voice"
  | "Round"
  | "Mirror"
  | "Holo"
  | "Hub"
  | "Controller"
  | "eInk";

type ModuleStatus = "active" | "idle" | "error" | "offline";
```

### Scene
```typescript
interface Scene {
  id: string;
  name: string;
  description?: string;
  config: Record<string, ModuleContent>;  // moduleId -> content config
  triggers?: SceneTrigger[];
  transition?: SceneTransition;
  createdAt: string;
  lastUsed?: string;
  usageCount?: number;
}

interface SceneTrigger {
  type: "time" | "voice" | "manual";
  time?: string;              // "HH:MM" format
  days?: string[];            // ["mon", "tue", ...]
  voiceCommand?: string;
}

interface SceneTransition {
  duration: number;           // seconds
  easing: "linear" | "easeIn" | "easeOut" | "easeInOut";
}
```

### Content
```typescript
interface ModuleContent {
  type: "widget" | "pattern" | "visualizer" | "static";
  url?: string;
  pattern?: string;
  params?: Record<string, any>;
  refreshRate?: number;       // seconds
  brightness?: number;        // 0-100
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "MODULE_NOT_FOUND",
    "message": "Module with ID 'screen-s-99' does not exist",
    "timestamp": "2026-04-06T10:35:00Z"
  }
}
```

### Common Error Codes
- `MODULE_NOT_FOUND` (404)
- `MODULE_OFFLINE` (503)
- `INVALID_CONTENT_TYPE` (400)
- `SCENE_NOT_FOUND` (404)
- `INVALID_POSITION` (400)
- `UPDATE_FAILED` (500)
- `WEBSOCKET_ERROR` (500)

---

## Authentication

### Development/Local
No authentication required. API accessible on localhost only.

### Production
- Bearer token authentication via `Authorization: Bearer <token>` header
- Tokens generated via `/api/auth/token` endpoint (not documented here)
- Rate limiting: 100 requests/minute per token

---

## Rate Limiting

- **Read endpoints**: 100 requests/minute
- **Write endpoints**: 30 requests/minute
- **WebSocket connections**: 10 concurrent per client

---

## Implementation Notes

### FastAPI Structure
```python
from fastapi import FastAPI, WebSocket
from pydantic import BaseModel

app = FastAPI(title="mosAIc Wall Controller", version="1.0.0")

# Module models
class Module(BaseModel):
    id: str
    type: str
    status: str
    position: dict
    # ... other fields

# Endpoints
@app.get("/api/wall/modules")
async def list_modules():
    # Implementation
    pass

@app.post("/api/wall/scenes/{scene_id}/activate")
async def activate_scene(scene_id: str):
    # Implementation
    pass

@app.websocket("/ws/modules")
async def module_updates(websocket: WebSocket):
    await websocket.accept()
    # Stream updates
    pass
```

### Service Dependencies
- **MQTT Client**: For module discovery and management
- **mDNS/Avahi**: For auto-discovery on local network
- **Redis/In-Memory Cache**: For module state and scene configs
- **SQLite**: For persistent storage (module registry, scene definitions)

### Deployment
```bash
# Development
uvicorn wall_controller:app --reload --port 8200

# Production
uvicorn wall_controller:app --host 0.0.0.0 --port 80 --workers 4
```

---

## Related Documentation
- **Three.js Widget Specs**: `docs/WIDGET-IMPLEMENTATION-SPECS.md`
- **System Architecture**: `docs/architecture/ARCHITECTURE.md`
- **Module Firmware**: `docs/architecture/ESP32-FIRMWARE.md` (to be created)
- **Module Discovery Protocol**: `docs/architecture/MODULE-DISCOVERY.md` (SACA-63)

---

**Status**: ✅ API Specification Complete — Ready for Implementation (SACA-62)
