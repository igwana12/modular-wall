"""Orb Backend -- FastAPI service for Oracle Card readings and Spirit Sphere at :8300."""
from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv

# Load env before anything else (matches Smithers pattern)
_env_path = Path(__file__).parent / ".env"
load_dotenv(_env_path, override=True)

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from deity_config import load_deity, list_deities, reload as reload_deities
from content_db import get_deity_images, get_random_deity_image, reload as reload_content, is_drive_mounted
from models import HealthResponse, DeityInfo, ContentImage

# -- Logging --
logger = logging.getLogger("orb-backend")
logger.setLevel(logging.INFO)
_log_path = Path(__file__).parent / "orb-backend.log"
_fh = logging.FileHandler(_log_path)
_fh.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
logger.addHandler(_fh)
_sh = logging.StreamHandler()
_sh.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
logger.addHandler(_sh)

VERSION = "1.0.0"

# Downstream service URLs
LLM_ROUTER_URL = os.getenv("LLM_ROUTER_URL", "http://localhost:8100")
SMITHERS_URL = os.getenv("SMITHERS_URL", "http://localhost:8200")


async def _check_service(client: httpx.AsyncClient, name: str, url: str) -> str:
    """Check if a downstream service is reachable. Returns 'ok' or 'unreachable'."""
    try:
        r = await client.get(f"{url}/health", timeout=5.0)
        if r.status_code == 200:
            logger.info(f"Service {name}: OK")
            return "ok"
        logger.warning(f"Service {name}: status {r.status_code}")
        return "degraded"
    except Exception:
        logger.warning(f"Service {name}: UNREACHABLE")
        return "unreachable"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: pre-load deity configs, content catalog, check services."""
    logger.info("orb-backend starting up...")

    # Load deity configs
    reload_deities()
    deities = list_deities()
    logger.info(f"Loaded {len(deities)} deity configs")

    # Load content catalog
    reload_content()

    # Check downstream services
    async with httpx.AsyncClient() as client:
        app.state.service_status = {
            "smithers": await _check_service(client, "smithers", SMITHERS_URL),
            "llm_router": await _check_service(client, "llm_router", LLM_ROUTER_URL),
            "content_drive": "ok" if is_drive_mounted() else "unmounted",
        }

    logger.info(f"orb-backend ready on :8300 | services: {app.state.service_status}")
    yield
    logger.info("orb-backend shutting down")


app = FastAPI(
    title="Orb Backend",
    description="Oracle Card readings and Spirit Sphere AI pipeline",
    version=VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# -- Health --

@app.get("/health")
async def health() -> dict:
    """Health check endpoint."""
    services = getattr(app.state, "service_status", {})
    all_ok = all(v == "ok" for v in services.values())
    return {
        "status": "ok" if all_ok else "degraded",
        "version": VERSION,
        "services": services,
    }


# -- Deity Endpoints --

@app.get("/api/deities")
async def get_deities() -> list[dict]:
    """List all 21 deity summaries."""
    deities = list_deities()
    return [d.model_dump() for d in deities]


@app.get("/api/deities/{deity_id}")
async def get_deity(deity_id: str) -> dict:
    """Get full configuration for a specific deity."""
    config = load_deity(deity_id.lower())
    if config is None:
        raise HTTPException(status_code=404, detail=f"Unknown deity: {deity_id}")
    return config


# -- Content DB Endpoints --

@app.get("/api/content/{deity_id}")
async def get_content(deity_id: str) -> list[dict]:
    """Get all images tagged with a specific deity."""
    images = get_deity_images(deity_id.lower())
    return [img.model_dump() for img in images]


@app.get("/api/content/{deity_id}/random")
async def get_random_content(deity_id: str) -> dict:
    """Get a random image for a specific deity."""
    image = get_random_deity_image(deity_id.lower())
    if image is None:
        raise HTTPException(
            status_code=404,
            detail=f"No images found for deity: {deity_id}",
        )
    return image.model_dump()


# -- Placeholder Endpoints (Plan 02) --

@app.get("/api/oracle/read/{deity_id}")
async def oracle_reading_placeholder(deity_id: str):
    """Placeholder for oracle reading endpoint -- implemented in Plan 01-02."""
    return JSONResponse(
        status_code=501,
        content={"detail": "Not implemented yet -- see Plan 01-02 for streaming oracle readings"},
    )


@app.websocket("/ws/sphere")
async def sphere_websocket_placeholder():
    """Placeholder for Spirit Sphere WebSocket -- implemented in future phase."""
    pass
