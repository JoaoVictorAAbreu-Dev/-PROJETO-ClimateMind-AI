from pydantic import BaseModel, Field


class TemperaturePredictionRequest(BaseModel):
    humidity: float = Field(ge=0, le=100)
    pressure: float = Field(ge=800, le=1200)


class TemperaturePredictionResponse(BaseModel):
    predicted_temperature: float
