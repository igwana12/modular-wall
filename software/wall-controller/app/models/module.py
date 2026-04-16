from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel


class ModuleType(str, Enum):
    SCREEN_S = "Screen-S"
    SCREEN_M = "Screen-M"
    GLOW = "Glow"
    PIXEL = "Pixel"
    VOICE = "Voice"
    ROUND = "Round"
    MIRROR = "Mirror"
    HOLO = "Holo"
    HUB = "Hub"
    CONTROLLER = "Controller"
    E_INK = "eInk"


class ModuleStatus(str, Enum):
    ACTIVE = "active"
    IDLE = "idle"
    ERROR = "error"
    OFFLINE = "offline"


class Position(BaseModel):
    x: int
    y: int


class ModuleStats(BaseModel):
    uptime: int | None = None
    temperature: float | None = None
    free_heap: int | None = None
    wifi_rssi: int | None = None
    frame_rate: int | None = None


class ModuleConfig(BaseModel):
    brightness: int = 80
    sleep_timeout: int = 300
    orientation: int = 0


class Module(BaseModel):
    id: str
    type: ModuleType
    status: ModuleStatus
    position: Position
    ip: str
    mac: str | None = None
    firmware: str
    capabilities: list[str] = []
    current_content: str | None = None
    content_url: str | None = None
    stats: ModuleStats | None = None
    config: ModuleConfig | None = None
    last_seen: datetime
    created_at: datetime
    updated_at: datetime | None = None


class ModuleContent(BaseModel):
    type: str  # "widget" | "pattern" | "visualizer" | "static"
    url: str | None = None
    pattern: str | None = None
    params: dict[str, Any] | None = None
    refresh_rate: int | None = None
    brightness: int | None = None


class ModuleListResponse(BaseModel):
    modules: list[Module]
    total_modules: int
    active_modules: int
    timestamp: datetime
