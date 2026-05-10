@echo off
REM Setup script for ClimateMind AI

echo.
echo ===== ClimateMind AI Setup =====
echo.

REM Backend setup
echo [1/2] Instalando dependências do Backend...
cd backend
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -q -r requirements.txt
cd ..

REM Frontend setup
echo [2/2] Instalando dependências do Frontend...
cd frontend
call npm install --silent
cd ..

echo.
echo ✓ Setup completo!
echo.
echo Próximo passo: execute 'run.bat'
echo.
pause
