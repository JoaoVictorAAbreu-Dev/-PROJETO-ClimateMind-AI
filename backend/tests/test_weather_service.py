from app.services import weather_service


def test_get_weather_maps_provider_payload(monkeypatch):
    provider_payload = {
        "name": "Sao Paulo",
        "main": {
            "temp": 24.4,
            "feels_like": 25.1,
            "humidity": 70,
            "pressure": 1012,
        },
        "wind": {"speed": 3.2},
        "weather": [{"main": "Clouds", "description": "nublado", "icon": "03d"}],
    }

    monkeypatch.setattr(
        weather_service,
        "_request_openweather",
        lambda url, city: provider_payload,
    )

    result = weather_service.get_weather("Sao Paulo")

    assert result == {
        "city": "Sao Paulo",
        "temperature": 24.4,
        "feels_like": 25.1,
        "humidity": 70,
        "pressure": 1012,
        "wind_speed": 3.2,
        "weather": "nublado",
        "weather_main": "Clouds",
        "weather_icon": "03d",
    }


def test_get_forecast_limits_and_maps_provider_payload(monkeypatch):
    provider_payload = {
        "city": {"name": "Sao Paulo"},
        "list": [
            {
                "dt": 1710000000,
                "dt_txt": "2026-05-11 12:00:00",
                "main": {"temp": 26.0, "humidity": 62},
                "weather": [{"main": "Clear", "description": "ceu limpo", "icon": "01d"}],
            },
            {
                "dt": 1710010800,
                "dt_txt": "2026-05-11 15:00:00",
                "main": {"temp": 27.0, "humidity": 59},
                "weather": [{"main": "Clouds", "description": "nuvens dispersas", "icon": "03d"}],
            },
        ],
    }

    monkeypatch.setattr(
        weather_service,
        "_request_openweather",
        lambda url, city: provider_payload,
    )

    result = weather_service.get_forecast("Sao Paulo", limit=1)

    assert result == {
        "city": "Sao Paulo",
        "items": [
            {
                "timestamp": 1710000000,
                "date": "2026-05-11",
                "time": "12:00",
                "temperature": 26.0,
                "humidity": 62,
                "weather": "ceu limpo",
                "weather_main": "Clear",
                "weather_icon": "01d",
            }
        ],
    }
