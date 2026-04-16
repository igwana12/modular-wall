from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="WALL_")

    app_name: str = "mosAIc Wall Controller"
    app_version: str = "0.1.0"
    port: int = 8200
    host: str = "0.0.0.0"
    debug: bool = False

    # Discovery settings
    mdns_enabled: bool = True
    mqtt_enabled: bool = False
    mqtt_broker: str = "localhost:1883"
    discovery_interval: int = 30

    # Module settings
    heartbeat_timeout: int = 60
    max_modules: int = 50
    default_brightness: int = 80


settings = Settings()
