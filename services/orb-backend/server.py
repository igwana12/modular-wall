"""Orb Backend -- FastAPI service for Oracle Card readings and Spirit Sphere at :8300."""
from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv

# Load env before anything else (matches Smithers pattern)
_env_path = Path(__file__).parent / ".env"
load_dotenv(_env_path, override=False)  # Shell env takes precedence over .env

import httpx
from fastapi import FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from sse_starlette.sse import EventSourceResponse

from deity_config import load_deity, list_deities, reload as reload_deities
from content_db import get_deity_images, get_random_deity_image, reload as reload_content, is_drive_mounted
from streaming import stream_reading
from sphere_ws import sphere_websocket as _sphere_ws_handler
from models import (
    HealthResponse, DeityInfo, ContentImage, OtaCheckResponse,
    RagQueryRequest, RagQueryResponse, RagStatusResponse,
)
from ota import load_manifest, check_update, get_firmware_path, FIRMWARE_DIR
from pipeline import check_ollama
from rag import get_reading_context, rag_available, rag_source

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
    ollama_ok = await check_ollama()
    async with httpx.AsyncClient() as client:
        app.state.service_status = {
            "smithers": await _check_service(client, "smithers", SMITHERS_URL),
            "llm_router": await _check_service(client, "llm_router", LLM_ROUTER_URL),
            "content_drive": "ok" if is_drive_mounted() else "unmounted",
            "ota": "ready" if load_manifest() is not None else "no_firmware",
            "ollama": "ok" if ollama_ok else "unreachable",
            "rag": rag_source(),
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


# -- Oracle Reading SSE Endpoint --

@app.get("/api/oracle/read/{deity_id}")
async def oracle_reading(deity_id: str, intent: str = "", request: Request = None):
    """Stream an oracle reading via SSE.

    Per D-09: progressive delivery with interleaved text + audio.
    Per D-05: REST+SSE protocol for web (Oracle Cards).
    """
    deity_config = load_deity(deity_id.lower())
    if not deity_config:
        raise HTTPException(status_code=404, detail=f"Unknown deity: {deity_id}")

    if not intent or len(intent.strip()) < 3:
        raise HTTPException(status_code=400, detail="Intent must be at least 3 characters")

    async def event_generator():
        async for event in stream_reading(deity_config, intent):
            if request and await request.is_disconnected():
                logger.info(f"Client disconnected during reading for {deity_id}")
                break
            yield event

    return EventSourceResponse(event_generator(), ping=15)  # 15s ping = keepalive


# -- RAG Endpoints --

@app.post("/api/rag/query")
async def rag_query(req: RagQueryRequest) -> RagQueryResponse:
    """Query mythology RAG for a deity + topic.

    Returns relevant context chunks from ChromaDB or keyword fallback.
    """
    deity_config = load_deity(req.deity_id.lower())
    if not deity_config:
        raise HTTPException(status_code=404, detail=f"Unknown deity: {req.deity_id}")

    context = await get_reading_context(req.deity_id.lower(), req.query, req.max_chunks)
    source = rag_source()

    return RagQueryResponse(
        deity_id=req.deity_id,
        query=req.query,
        context=context,
        source=source,
    )


@app.get("/api/rag/status")
async def rag_status() -> RagStatusResponse:
    """Check RAG availability and which backend is active."""
    return RagStatusResponse(
        available=rag_available(),
        source=rag_source(),
    )


# -- OTA Firmware Update Endpoints --

@app.get("/api/ota/check")
async def ota_check(version: str = "0.0.0") -> OtaCheckResponse:
    """Check if a firmware update is available.

    ESP32 calls this on boot and periodically with its current version.
    """
    result = await check_update(version)
    return OtaCheckResponse(**result)


@app.get("/api/ota/download")
async def ota_download():
    """Download the latest firmware binary.

    Returns the .bin file for ESP32 httpUpdate to flash.
    """
    fw_path = get_firmware_path()
    if fw_path is None:
        raise HTTPException(status_code=404, detail="No firmware binary available")
    return FileResponse(
        path=str(fw_path),
        media_type="application/octet-stream",
        filename=fw_path.name,
    )


@app.get("/api/ota/manifest")
async def ota_manifest() -> dict:
    """Return raw firmware manifest for debugging/admin."""
    manifest = load_manifest()
    if manifest is None:
        raise HTTPException(status_code=404, detail="No manifest available")
    return manifest


# -- Spirit Sphere WebSocket (placeholder) --

@app.websocket("/ws/sphere")
async def ws_sphere(websocket: WebSocket):
    """WebSocket endpoint for Spirit Sphere hardware.

    Per D-05: shares same reading pipeline as SSE, different protocol.
    Full pipeline: PCM audio -> AssemblyAI STT -> Claude -> ElevenLabs TTS -> PCM audio.
    """
    await _sphere_ws_handler(websocket)
