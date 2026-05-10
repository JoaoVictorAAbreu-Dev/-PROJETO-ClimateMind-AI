@echo off
REM Run script for ClimateMind AI

echo.
echo ===== ClimateMind AI =====
echo.

REM Check if setup was done
if not exist "frontend\node_modules" (
    echo ⚠️ Dependências não instaladas! Execute setup.bat primeiro.
    pause
    exit /b 1
)

REM Start backend in new window
echo [Backend] Iniciando em http://localhost:8000
cd backend
call venv\Scripts\activate.bat
start cmd /k "uvicorn app.main:app --reload"
cd ..

REM Wait a bit for backend to start
timeout /t 2 /nobreak

REM Start frontend in new window
echo [Frontend] Iniciando em http://localhost:5173
cd frontend
start cmd /k "npm run dev"
cd ..

echo.
echo ✓ Aplicação iniciada!
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo Docs API: http://localhost:8000/docs
echo.
pause
