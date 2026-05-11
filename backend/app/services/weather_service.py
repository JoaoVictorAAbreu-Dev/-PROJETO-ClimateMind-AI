from http import HTTPStatus

import requests
from fastapi import HTTPException

from app.core.config import OPENWEATHER_API_KEY, OPENWEATHER_TIMEOUT

WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"


def _request_openweather(url, city):
    if not OPENWEATHER_API_KEY:
        raise HTTPException(
            status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            detail="OpenWeather API key is not configured."
        )

    params = {
        "q": city,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric",
        "lang": "pt_br"
    }

    try:
        response = requests.get(url, params=params, timeout=OPENWEATHER_TIMEOUT)
        response.raise_for_status()
    except requests.Timeout as exc:
        raise HTTPException(
            status_code=HTTPStatus.GATEWAY_TIMEOUT,
            detail="Weather provider timeout."
        ) from exc
    except requests.HTTPError as exc:
        status_code = exc.response.status_code if exc.response is not None else HTTPStatus.BAD_GATEWAY
        if status_code == HTTPStatus.NOT_FOUND:
            raise HTTPException(
                status_code=HTTPStatus.NOT_FOUND,
                detail=f"City not found: {city}"
            ) from exc

        raise HTTPException(
            status_code=HTTPStatus.BAD_GATEWAY,
            detail="Weather provider request failed."
        ) from exc
    except requests.RequestException as exc:
        raise HTTPException(
            status_code=HTTPStatus.BAD_GATEWAY,
            detail="Weather provider is unavailable."
        ) from exc

    return response.json()


def get_weather(city):
    data = _request_openweather(WEATHER_URL, city)

    return {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "feels_like": data["main"]["feels_like"],
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "wind_speed": data["wind"]["speed"],
        "weather": data["weather"][0]["description"],
        "weather_main": data["weather"][0]["main"],
        "weather_icon": data["weather"][0]["icon"],
    }


def get_forecast(city, limit=8):
    data = _request_openweather(FORECAST_URL, city)
    items = []

    for item in data["list"][:limit]:
        date_text = item["dt_txt"]
        items.append({
            "timestamp": item["dt"],
            "date": date_text[:10],
            "time": date_text[11:16],
            "temperature": item["main"]["temp"],
            "humidity": item["main"]["humidity"],
            "weather": item["weather"][0]["description"],
            "weather_main": item["weather"][0]["main"],
            "weather_icon": item["weather"][0]["icon"],
        })

    return {
        "city": data["city"]["name"],
        "items": items,
    }
