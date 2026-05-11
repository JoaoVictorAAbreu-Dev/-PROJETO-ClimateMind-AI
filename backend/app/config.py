from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv()

PROJECT_ROOT = Path(__file__).resolve().parents[2]
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
OPENWEATHER_TIMEOUT = float(os.getenv("OPENWEATHER_TIMEOUT", "10"))
ML_MODEL_PATH = Path(os.getenv("ML_MODEL_PATH", PROJECT_ROOT / "ml" / "model.pkl"))
