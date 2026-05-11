from functools import lru_cache
from http import HTTPStatus

import joblib
import numpy as np
from fastapi import HTTPException

from app.config import ML_MODEL_PATH


@lru_cache(maxsize=1)
def load_model():
    try:
        return joblib.load(ML_MODEL_PATH)
    except FileNotFoundError as exc:
        raise HTTPException(
            status_code=HTTPStatus.SERVICE_UNAVAILABLE,
            detail="Prediction model file was not found.",
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=HTTPStatus.SERVICE_UNAVAILABLE,
            detail="Prediction model could not be loaded.",
        ) from exc


def predict_temperature(humidity, pressure):
    model = load_model()
    prediction = model.predict(np.array([[humidity, pressure]]))
    return float(prediction[0])
