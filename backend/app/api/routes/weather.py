from fastapi import APIRouter, Query

from app.schemas.weather import ForecastResponse, WeatherResponse
from app.services.weather_service import get_forecast, get_weather

router = APIRouter(prefix="/weather", tags=["Weather"])


@router.get("/{city}", response_model=WeatherResponse)
def weather(city: str):
    return get_weather(city)


@router.get("/{city}/forecast", response_model=ForecastResponse)
def forecast(city: str, limit: int = Query(default=8, ge=1, le=40)):
    return get_forecast(city, limit)
