"""Load and cache deity JSON configurations from gods/ directory."""
from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

from models import DeityInfo

logger = logging.getLogger("orb-backend.deity_config")

GODS_DIR = Path(__file__).parent / "gods"

# In-memory cache: deity_id -> full config dict
_cache: dict[str, dict[str, Any]] = {}


def _load_all() -> None:
    """Load all deity JSON files from gods/ directory into cache."""
    global _cache
    _cache = {}
    if not GODS_DIR.exists():
        logger.warning(f"Gods directory not found: {GODS_DIR}")
        return

    for f in sorted(GODS_DIR.glob("*.json")):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
            deity_id = data.get("id", f.stem)
            _cache[deity_id] = data
            logger.debug(f"Loaded deity config: {deity_id}")
        except (json.JSONDecodeError, KeyError) as e:
            logger.error(f"Failed to load {f.name}: {e}")

    logger.info(f"Loaded {len(_cache)} deity configs from {GODS_DIR}")


def load_deity(deity_id: str) -> dict[str, Any] | None:
    """Get full configuration for a single deity by ID."""
    if not _cache:
        _load_all()
    return _cache.get(deity_id)


def list_deities() -> list[DeityInfo]:
    """Return summary info for all loaded deities."""
    if not _cache:
        _load_all()
    result = []
    for deity_id, data in _cache.items():
        result.append(DeityInfo(
            id=data.get("id", deity_id),
            name=data.get("name", deity_id.title()),
            title=data.get("title", ""),
            voice_id=data.get("voice_id", ""),
            reading_style=data.get("reading_style", ""),
            color_palette=data.get("color_palette", []),
        ))
    return result


def reload() -> None:
    """Force reload all deity configs (e.g., after adding a new god JSON)."""
    _load_all()


def get_protocol_ids() -> list[str]:
    """Return sorted list of all cached deity IDs.

    Useful for firmware to know which protocol configs are available.
    """
    if not _cache:
        _load_all()
    return sorted(_cache.keys())
