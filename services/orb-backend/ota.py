"""OTA (Over-The-Air) firmware update module for orb-backend.

Serves firmware binaries with version manifests so ESP32 devices
can self-update over WiFi without USB access.
"""
from __future__ import annotations

import json
import logging
from pathlib import Path

logger = logging.getLogger("orb-backend")

FIRMWARE_DIR = Path(__file__).parent / "firmware_bin"
MANIFEST_FILE = FIRMWARE_DIR / "manifest.json"


def load_manifest() -> dict | None:
    """Read and parse manifest.json. Returns None if missing or invalid."""
    if not MANIFEST_FILE.exists():
        return None
    try:
        with open(MANIFEST_FILE, "r") as f:
            data = json.load(f)
        # Validate required fields
        required = ("version", "filename", "size", "sha256", "min_version", "changelog")
        if not all(k in data for k in required):
            logger.warning("OTA manifest missing required fields")
            return None
        return data
    except (json.JSONDecodeError, OSError) as e:
        logger.error(f"Failed to load OTA manifest: {e}")
        return None


def get_firmware_path() -> Path | None:
    """Return path to the .bin file named in manifest. None if file missing."""
    manifest = load_manifest()
    if manifest is None:
        return None
    bin_path = FIRMWARE_DIR / manifest["filename"]
    if not bin_path.exists():
        return None
    return bin_path


def _compare_versions(current: str, latest: str) -> int:
    """Semantic version comparison. Returns 1 if latest > current, 0 if equal, -1 if older.

    Splits on '.', compares each segment as int.
    """
    try:
        c_parts = [int(x) for x in current.split(".")]
        l_parts = [int(x) for x in latest.split(".")]
    except (ValueError, AttributeError):
        return 0

    # Pad shorter list with zeros
    max_len = max(len(c_parts), len(l_parts))
    c_parts.extend([0] * (max_len - len(c_parts)))
    l_parts.extend([0] * (max_len - len(l_parts)))

    for c, l in zip(c_parts, l_parts):
        if l > c:
            return 1
        if l < c:
            return -1
    return 0


async def check_update(current_version: str) -> dict:
    """Compare current_version with manifest version.

    Returns dict with update_available flag and version metadata.
    """
    manifest = load_manifest()
    if manifest is None:
        return {
            "update_available": False,
            "current_version": current_version,
            "latest_version": "unknown",
            "filename": "",
            "size": 0,
            "sha256": "",
            "changelog": "No manifest available",
        }

    latest = manifest["version"]
    has_update = _compare_versions(current_version, latest) > 0

    # Also check that the binary file actually exists
    if has_update and get_firmware_path() is None:
        logger.warning(f"OTA manifest says {latest} but binary missing")
        has_update = False

    return {
        "update_available": has_update,
        "current_version": current_version,
        "latest_version": latest,
        "filename": manifest["filename"],
        "size": manifest["size"],
        "sha256": manifest["sha256"],
        "changelog": manifest["changelog"],
    }
