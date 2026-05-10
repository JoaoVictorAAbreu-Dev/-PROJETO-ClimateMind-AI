# ClimateMind AI

Plataforma inteligente de monitoramento climático com IA.

##  Quick Start (Recomendado)

### Windows
```bash
setup.bat     # Instala dependências (executar uma vez)
run.bat       # Inicia frontend + backend
```

### Docker
```bash
docker-compose up --build
```

Acesso:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

---

##  Setup Manual

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

##  Tecnologias

- **Backend:** FastAPI, Uvicorn, Scikit-learn
- **Frontend:** React, Vite, Recharts
- **APIs:** OpenWeather
- **Deploy:** Docker

##  Links

- [OpenWeather API](https://openweathermap.org/api)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
