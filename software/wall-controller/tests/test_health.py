import pytest
from httpx import AsyncClient, ASGITransport

from app.main import app


@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "mosAIc Wall Controller"
    assert "version" in data
    assert "docs" in data


@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/wall/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "uptime" in data
    assert "modules" in data
    assert "services" in data
    assert "timestamp" in data


@pytest.mark.asyncio
async def test_health_ready():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/wall/health/ready")
    assert response.status_code == 200
    assert response.json()["ready"] is True


@pytest.mark.asyncio
async def test_health_live():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/wall/health/live")
    assert response.status_code == 200
    assert response.json()["alive"] is True


@pytest.mark.asyncio
async def test_modules_list():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/wall/modules")
    assert response.status_code == 200
    data = response.json()
    assert "modules" in data
    assert "total_modules" in data


@pytest.mark.asyncio
async def test_scenes_list():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/wall/scenes")
    assert response.status_code == 200
    data = response.json()
    assert "scenes" in data
