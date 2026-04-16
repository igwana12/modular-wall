# mosAIc Wall Controller Agent

FastAPI service for orchestrating the mosAIc modular wall. Handles module discovery, content routing, scene management, and real-time synchronization across all connected ESP32 modules.

**Port**: 8200 | **API Base**: `/api/wall/` | **Docs**: `/docs`

---

## Requirements

- Python 3.11+
- [uv](https://docs.astral.sh/uv/) (recommended) or pip + venv

---

## Quick Start

### 1. Install uv (if not installed)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 2. Clone and enter the directory

```bash
cd software/wall-controller
```

### 3. Create virtual environment

```bash
uv venv --python 3.11
source .venv/bin/activate   # macOS/Linux
# .venv\Scripts\activate    # Windows
```

### 4. Install dependencies

```bash
uv pip install -e ".[dev]"
```

### 5. Configure environment

```bash
cp .env.example .env
# Edit .env as needed
```

### 6. Run the server

```bash
# Development (with auto-reload)
WALL_DEBUG=true uvicorn app.main:app --reload --port 8200

# Or use the project script
uv run wall-controller
```

### 7. Verify it's running

```bash
curl http://localhost:8200/api/wall/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "0.1.0",
  "uptime": 5,
  ...
}
```

Open **http://localhost:8200/docs** for the interactive API explorer.

---

## Project Structure

```
wall-controller/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── core/
│   │   └── config.py        # Pydantic settings (env-based config)
│   ├── models/
│   │   ├── module.py        # Module Pydantic models
│   │   └── scene.py         # Scene Pydantic models
│   └── routers/
│       ├── health.py        # GET /api/wall/health (+ /ready, /live)
│       ├── modules.py       # /api/wall/modules/* endpoints
│       └── scenes.py        # /api/wall/scenes/* endpoints
├── tests/
│   └── test_health.py       # Health + smoke tests
├── .env.example             # Environment variable reference
├── .python-version          # Python version pin (3.11)
└── pyproject.toml           # Project metadata and dependencies
```

---

## Running Tests

```bash
uv run pytest
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Service info |
| GET | `/api/wall/health` | System health status |
| GET | `/api/wall/health/ready` | Readiness probe |
| GET | `/api/wall/health/live` | Liveness probe |
| GET | `/api/wall/modules` | List all modules |
| GET | `/api/wall/modules/{id}` | Get module details |
| PUT | `/api/wall/modules/{id}/position` | Update module position |
| POST | `/api/wall/modules/{id}/reboot` | Reboot module |
| POST | `/api/wall/modules/{id}/content` | Push content to module |
| DELETE | `/api/wall/modules/{id}/content` | Clear module content |
| GET | `/api/wall/scenes` | List all scenes |
| POST | `/api/wall/scenes` | Create scene |
| GET | `/api/wall/scenes/{id}` | Get scene details |
| PUT | `/api/wall/scenes/{id}` | Update scene |
| DELETE | `/api/wall/scenes/{id}` | Delete scene |
| POST | `/api/wall/scenes/{id}/activate` | Activate scene |

Full spec: [`docs/architecture/WALL-CONTROLLER-API.md`](../../docs/architecture/WALL-CONTROLLER-API.md)

---

## Configuration

All config via environment variables prefixed with `WALL_`:

| Variable | Default | Description |
|----------|---------|-------------|
| `WALL_PORT` | `8200` | Server port |
| `WALL_HOST` | `0.0.0.0` | Bind host |
| `WALL_DEBUG` | `false` | Enable auto-reload |
| `WALL_MQTT_ENABLED` | `false` | Enable MQTT client |
| `WALL_MQTT_BROKER` | `localhost:1883` | MQTT broker address |
| `WALL_MDNS_ENABLED` | `true` | Enable mDNS discovery |
| `WALL_DISCOVERY_INTERVAL` | `30` | Module discovery interval (sec) |
| `WALL_MAX_MODULES` | `50` | Maximum modules supported |
| `WALL_DEFAULT_BRIGHTNESS` | `80` | Default module brightness (0-100) |

---

## Development Notes

- Routers in `app/routers/modules.py` and `app/routers/scenes.py` are **stub implementations** — they return empty lists or 501/404. Full implementation comes in subsequent tasks.
- The health endpoint is fully functional and suitable for monitoring.
- Uses **Pydantic v2** for all data models.
- All settings use `pydantic-settings` with `.env` file support.

---

## Git Workflow

See [`docs/GIT-WORKFLOW.md`](../../docs/GIT-WORKFLOW.md) for branching strategy, commit conventions, and PR process.

---

*Part of the mosAIc — Modular Wall project. A Sacred Circuits project.*
