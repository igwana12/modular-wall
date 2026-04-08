import time
from datetime import datetime, timezone

from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(tags=["health"])

# Track startup time for uptime calculation
_start_time = time.time()


@router.get("/health")
async def health_check():
    """Overall system health status."""
    uptime = int(time.time() - _start_time)
    return {
        "status": "healthy",
        "version": settings.app_version,
        "uptime": uptime,
        "modules": {
            "total": 0,
            "active": 0,
            "idle": 0,
            "error": 0,
            "offline": 0,
        },
        "system": {
            "cpu_usage": None,
            "memory_usage": None,
            "disk_usage": None,
            "temperature": None,
        },
        "services": {
            "mqtt": "disabled" if not settings.mqtt_enabled else "unknown",
            "mdns": "enabled" if settings.mdns_enabled else "disabled",
            "websocket": "healthy",
        },
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/health/ready")
async def readiness_check():
    """Kubernetes-style readiness probe."""
    return {"ready": True}


@router.get("/health/live")
async def liveness_check():
    """Kubernetes-style liveness probe."""
    return {"alive": True}
