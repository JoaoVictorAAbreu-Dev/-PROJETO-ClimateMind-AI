from app.services import prediction_service


class FakeModel:
    def predict(self, values):
        assert values.tolist() == [[70, 1012]]
        return [23.5]


def test_predict_temperature_uses_model_features(monkeypatch):
    monkeypatch.setattr(prediction_service, "load_model", lambda: FakeModel())

    result = prediction_service.predict_temperature(humidity=70, pressure=1012)

    assert result == 23.5
