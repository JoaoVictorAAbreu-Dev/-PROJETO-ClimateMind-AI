@echo off
REM Integration test script

echo.
echo ===== ClimateMind AI - Integration Test =====
echo.

REM Test Backend
echo [1/3] Testando Backend...
cd backend
call venv\Scripts\activate.bat

python -c "from app.main import app; print('OK')" >nul 2>&1
if errorlevel 1 (
    echo X Backend imports FAILED
    pause
    exit /b 1
)
echo OK - Backend imports OK

python -c "from app.services.prediction_service import predict_temperature; result = predict_temperature(70, 1010); print('OK')" >nul 2>&1
if errorlevel 1 (
    echo X ML Model FAILED
    pause
    exit /b 1
)
echo OK - ML Model OK

cd ..

REM Test Frontend
echo.
echo [2/3] Testando Frontend...
cd frontend

if not exist node_modules (
    echo X Frontend dependencies NOT installed
    pause
    exit /b 1
)
echo OK - Dependencies installed

if not exist dist (
    echo X Frontend build NOT found
    pause
    exit /b 1
)
echo OK - Build exists

cd ..

REM Check ports
echo.
echo [3/3] Verificando configuracoes...

if not exist "backend\app\main.py" (
    echo X Backend main.py NOT found
    pause
    exit /b 1
)
echo OK - Backend configured

if not exist "frontend\index.html" (
    echo X Frontend index.html NOT found
    pause
    exit /b 1
)
echo OK - Frontend configured

echo.
echo ===== Teste Completo: PASSOU =====
echo.
echo Sistema pronto para rodar!
echo Use 'run.bat' para iniciar a aplicacao.
echo.
pause
