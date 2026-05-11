import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
from pathlib import Path


data = pd.DataFrame({
    "humidity": [60, 70, 80, 90],
    "pressure": [1010, 1008, 1006, 1004],
    "temperature": [25, 24, 22, 20]
})

X = data[["humidity", "pressure"]]
y = data["temperature"]

model = LinearRegression()
model.fit(X, y)

model_path = Path(__file__).with_name("model.pkl")
joblib.dump(model, model_path)

print("Modelo treinado")
