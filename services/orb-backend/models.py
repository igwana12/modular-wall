"""Pydantic request/response models for orb-backend."""
from __future__ import annotations

from pydantic import BaseModel, Field


class ReadingRequest(BaseModel):
    deity: str
    intent: str
    session_id: str | None = None


class DeityInfo(BaseModel):
    id: str
    name: str
    title: str
    voice_id: str
    reading_style: str
    color_palette: list[str]


class DeityFullConfig(BaseModel):
    id: str
    name: str
    title: str
    voice_id: str
    system_prompt: str
    mythology_keywords: list[str]
    reading_style: str
    art_collection: str
    color_palette: list[str]
    mckee_guidance: str


class ContentImage(BaseModel):
    filename: str
    path: str
    tags: list[str]
    available: bool  # False if external drive not mounted


class OtaCheckResponse(BaseModel):
    update_available: bool
    current_version: str
    latest_version: str
    filename: str
    size: int
    sha256: str
    changelog: str


class HealthResponse(BaseModel):
    status: str  # "ok" | "degraded"
    version: str
    services: dict[str, str]  # service_name -> "ok" | "unreachable"


# -- RAG Models --

class RagQueryRequest(BaseModel):
    deity_id: str
    query: str
    max_chunks: int = Field(default=5, ge=1, le=20)


class RagQueryResponse(BaseModel):
    deity_id: str
    query: str
    context: str
    source: str  # "chromadb" | "keywords"


class RagStatusResponse(BaseModel):
    available: bool
    source: str  # "chromadb" | "keywords"
