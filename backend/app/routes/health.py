from fastapi import APIRouter

from app.config import ML_MODEL_PATH, OPENWEATHER_API_KEY

router = APIRouter()


@router.get("/")
def root():
    return {
        "message": "ClimateMind AI Online"
    }


@router.get("/health")
def health():
    checks = {
        "openweather_api_key": bool(OPENWEATHER_API_KEY),
        "prediction_model": ML_MODEL_PATH.exists(),
    }

    return {
        "status": "ok" if all(checks.values()) else "degraded",
        "checks": checks,
    }
