"""Module management router — stub implementation for dev environment."""

from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone

router = APIRouter(prefix="/api/wall/modules", tags=["modules"])


@router.get("")
async def list_modules(
    type: str | None = None,
    status: str | None = None,
):
    """List all discovered modules."""
    return {
        "modules": [],
        "total_modules": 0,
        "active_modules": 0,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/{module_id}")
async def get_module(module_id: str):
    """Get detailed information about a specific module."""
    raise HTTPException(status_code=404, detail=f"Module '{module_id}' not found")


@router.put("/{module_id}/position")
async def update_module_position(module_id: str, x: int, y: int):
    """Update the physical position of a module in the wall grid."""
    raise HTTPException(status_code=404, detail=f"Module '{module_id}' not found")


@router.post("/{module_id}/reboot")
async def reboot_module(module_id: str):
    """Remotely reboot a module."""
    raise HTTPException(status_code=404, detail=f"Module '{module_id}' not found")


@router.post("/{module_id}/content")
async def push_content(module_id: str):
    """Push content to a specific module."""
    raise HTTPException(status_code=404, detail=f"Module '{module_id}' not found")


@router.delete("/{module_id}/content")
async def clear_content(module_id: str):
    """Clear current content from a module."""
    raise HTTPException(status_code=404, detail=f"Module '{module_id}' not found")
