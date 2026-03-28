"""Query images catalog by deity name. Handles unmounted external drive gracefully."""
from __future__ import annotations

import json
import logging
import os
import random
from pathlib import Path
from typing import Any

from models import ContentImage

logger = logging.getLogger("orb-backend.content_db")

CATALOG_PATH = os.getenv(
    "CONTENT_CATALOG_PATH",
    os.path.expanduser("~/repos/Sacred-circuits-automation-/catalogs/images_catalog.json"),
)
IMAGES_ROOT = os.getenv(
    "CONTENT_IMAGES_ROOT",
    "/Volumes/Extreme Pro/sacred-circuits-outputs",
)

# In-memory catalog
_catalog: list[dict[str, Any]] = []
_drive_mounted: bool = False


def _load_catalog() -> None:
    """Load images catalog JSON and check drive availability."""
    global _catalog, _drive_mounted

    _drive_mounted = Path(IMAGES_ROOT).exists() and Path(IMAGES_ROOT).is_dir()
    if not _drive_mounted:
        logger.warning(f"External drive NOT mounted at {IMAGES_ROOT} -- images will be unavailable")

    catalog_path = Path(CATALOG_PATH)
    if not catalog_path.exists():
        logger.error(f"Images catalog not found: {catalog_path}")
        _catalog = []
        return

    try:
        data = json.loads(catalog_path.read_text(encoding="utf-8"))
        _catalog = data.get("items", [])
        logger.info(f"Loaded {len(_catalog)} images from catalog. Drive mounted: {_drive_mounted}")
    except (json.JSONDecodeError, KeyError) as e:
        logger.error(f"Failed to load catalog: {e}")
        _catalog = []


def get_deity_images(deity_id: str) -> list[ContentImage]:
    """Filter catalog by deity name tag. Returns images tagged with the deity."""
    if not _catalog:
        _load_catalog()

    deity_lower = deity_id.lower()
    results = []
    for item in _catalog:
        tags = [t.lower() for t in item.get("tags", [])]
        if deity_lower in tags:
            results.append(ContentImage(
                filename=item.get("filename", ""),
                path=item.get("path", ""),
                tags=item.get("tags", []),
                available=_drive_mounted and Path(item.get("path", "")).exists(),
            ))
    return results


def get_random_deity_image(deity_id: str) -> ContentImage | None:
    """Return a random image for a deity, or None if no images tagged."""
    images = get_deity_images(deity_id)
    if not images:
        return None
    return random.choice(images)


def is_drive_mounted() -> bool:
    """Check if the external content drive is currently mounted."""
    return _drive_mounted


def reload() -> None:
    """Force reload the catalog."""
    _load_catalog()
