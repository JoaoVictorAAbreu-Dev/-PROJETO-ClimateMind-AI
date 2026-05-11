from pydantic import BaseModel


class ForecastPoint(BaseModel):
    timestamp: int
    date: str
    time: str
    temperature: float
    humidity: int
    weather: str
    weather_main: str
    weather_icon: str


class ForecastResponse(BaseModel):
    city: str
    items: list[ForecastPoint]


class WeatherResponse(BaseModel):
    city: str
    temperature: float
    feels_like: float
    humidity: int
    pressure: int
    wind_speed: float
    weather: str
    weather_main: str
    weather_icon: str
