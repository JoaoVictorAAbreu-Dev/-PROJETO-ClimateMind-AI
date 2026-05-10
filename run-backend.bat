@echo off
REM Dev script for ClimateMind AI - runs only backend

echo.
echo ===== ClimateMind AI Backend Dev =====
echo.

cd backend
call venv\Scripts\activate.bat

echo Starting backend...
echo API: http://localhost:8000
echo Docs: http://localhost:8000/docs
echo.

uvicorn app.main:app --reload
