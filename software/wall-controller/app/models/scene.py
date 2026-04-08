from datetime import datetime
from typing import Any

from pydantic import BaseModel

from app.models.module import ModuleContent


class SceneTrigger(BaseModel):
    type: str  # "time" | "voice" | "manual"
    time: str | None = None  # "HH:MM"
    days: list[str] | None = None
    voice_command: str | None = None


class SceneTransition(BaseModel):
    duration: float = 2.0
    easing: str = "easeInOut"  # "linear" | "easeIn" | "easeOut" | "easeInOut"


class Scene(BaseModel):
    id: str
    name: str
    description: str | None = None
    config: dict[str, Any] = {}  # moduleId -> ModuleContent
    triggers: list[SceneTrigger] | None = None
    transition: SceneTransition | None = None
    created_at: datetime
    last_used: datetime | None = None
    usage_count: int = 0


class SceneCreate(BaseModel):
    name: str
    description: str | None = None
    config: dict[str, Any] = {}
    triggers: list[SceneTrigger] | None = None
    transition: SceneTransition | None = None


class SceneListResponse(BaseModel):
    scenes: list[Scene]
    active_scene: str | None = None
    timestamp: datetime
