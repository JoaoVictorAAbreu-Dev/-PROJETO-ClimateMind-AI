from fastapi import APIRouter

from app.schemas.prediction import (
    TemperaturePredictionRequest,
    TemperaturePredictionResponse,
)
from app.services.prediction_service import predict_temperature

router = APIRouter(prefix="/prediction", tags=["Prediction"])


@router.post("/temperature", response_model=TemperaturePredictionResponse)
def temperature_prediction(payload: TemperaturePredictionRequest):
    return {
        "predicted_temperature": predict_temperature(
            humidity=payload.humidity,
            pressure=payload.pressure,
        )
    }
