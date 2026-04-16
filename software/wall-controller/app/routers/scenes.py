"""Scene management router — stub implementation for dev environment."""

from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from app.models.scene import SceneCreate

router = APIRouter(prefix="/api/wall/scenes", tags=["scenes"])


@router.get("")
async def list_scenes():
    """List all available scenes/presets."""
    return {
        "scenes": [],
        "active_scene": None,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@router.post("", status_code=201)
async def create_scene(scene: SceneCreate):
    """Create a new scene."""
    raise HTTPException(status_code=501, detail="Scene creation not yet implemented")


@router.get("/{scene_id}")
async def get_scene(scene_id: str):
    """Get detailed configuration for a specific scene."""
    raise HTTPException(status_code=404, detail=f"Scene '{scene_id}' not found")


@router.put("/{scene_id}")
async def update_scene(scene_id: str, scene: SceneCreate):
    """Update an existing scene configuration."""
    raise HTTPException(status_code=404, detail=f"Scene '{scene_id}' not found")


@router.delete("/{scene_id}", status_code=204)
async def delete_scene(scene_id: str):
    """Delete a scene."""
    raise HTTPException(status_code=404, detail=f"Scene '{scene_id}' not found")


@router.post("/{scene_id}/activate")
async def activate_scene(scene_id: str, transition: float = 2.0):
    """Activate a scene (switch all modules to scene configuration)."""
    raise HTTPException(status_code=404, detail=f"Scene '{scene_id}' not found")
