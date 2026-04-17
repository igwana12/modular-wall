from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import health, modules, scenes


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print(f"Starting {settings.app_name} v{settings.app_version} on port {settings.port}")
    yield
    # Shutdown
    print("Wall Controller shutting down")


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Central intelligence hub for mosAIc modular wall — coordinates module discovery, content routing, and scene management.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(health.router, prefix="/api/wall")
app.include_router(modules.router)
app.include_router(scenes.router)


@app.get("/")
async def root():
    return {
        "service": settings.app_name,
        "version": settings.app_version,
        "docs": "/docs",
        "health": "/api/wall/health",
    }


def main():
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )


if __name__ == "__main__":
    main()
