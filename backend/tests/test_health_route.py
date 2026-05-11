from app.routes import health as health_route


def test_health_returns_degraded_when_dependency_missing(monkeypatch, tmp_path):
    missing_model = tmp_path / "missing-model.pkl"
    monkeypatch.setattr(health_route, "OPENWEATHER_API_KEY", "")
    monkeypatch.setattr(health_route, "ML_MODEL_PATH", missing_model)

    result = health_route.health()

    assert result == {
        "status": "degraded",
        "checks": {
            "openweather_api_key": False,
            "prediction_model": False,
        },
    }
