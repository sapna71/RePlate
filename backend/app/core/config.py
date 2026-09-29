from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings for Step 1.

    Only app-level settings are wired up here. DATABASE_URL and JWT_*
    are declared in .env.example for future steps but are intentionally
    NOT read or required yet.
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    APP_NAME: str = "RePlate API"
    APP_ENV: str = "development"

    # Comma-separated list of allowed origins for CORS.
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    DATABASE_URL: str

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]


settings = Settings()