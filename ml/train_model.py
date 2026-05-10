import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib


data = pd.DataFrame({
    "humidity": [60, 70, 80, 90],
    "pressure": [1010, 1008, 1006, 1004],
    "temperature": [25, 24, 22, 20]
})

X = data[["humidity", "pressure"]]
y = data["temperature"]

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, "model.pkl")

print("Modelo treinado")