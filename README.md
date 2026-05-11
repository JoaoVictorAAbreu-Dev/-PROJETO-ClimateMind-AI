<div align="center">

# ClimateMind AI

Intelligent climate monitoring and prediction platform powered by Joao Victor A. Abreu.

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Machine Learning](https://img.shields.io/badge/Machine-Learning-orange?style=for-the-badge)](https://scikit-learn.org/)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)]()

</div>

## Overview

ClimateMind AI is an intelligent climate analysis and monitoring platform designed to provide real-time weather visualization, predictive insights, and AI-powered climate forecasting.

The project combines:

- Real-time climate APIs
- Machine Learning models
- Interactive dashboards
- Predictive analytics
- Scalable backend architecture

## Current Features

- Real-time weather data using OpenWeather API
- Extended weather forecast
- Interactive frontend dashboard
- REST API with FastAPI
- ML temperature prediction endpoint
- Healthcheck with dependency status

## Quick Start

### Windows

```bash
setup.bat
run.bat
```

### Manual

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

```bash
cd frontend
npm install
npm run dev
```

## Environment

Crie `backend/.env` com:

```env
OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_TIMEOUT=10
ML_MODEL_PATH=../ml/model.pkl
```

O frontend usa `VITE_API_BASE_URL` quando definido. Sem essa variavel, usa `http://127.0.0.1:8000`.

## API

- `GET /health`: status da API, chave OpenWeather e modelo ML.
- `GET /weather/{city}`: clima atual.
- `GET /weather/{city}/forecast?limit=8`: previsao por blocos de 3 horas.
- `POST /prediction/temperature`: predicao de temperatura por umidade e pressao.

## Quality

```bash
cd backend
venv\Scripts\python -m pytest
```

```bash
cd frontend
npm run build
npm audit
```

## Architecture

```txt
ClimateMind-AI/
├── backend/
│   ├── app/
│   │   ├── api/routes/
│   │   ├── core/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── features/weather/
│       ├── shared/components/
│       └── styles/
├── ml/
├── data/
└── docs/
```

## Stack

- Backend: FastAPI, Uvicorn, Requests, Scikit-learn
- Frontend: React, Vite, Recharts, Axios, Lucide React
- ML: Joblib + LinearRegression
