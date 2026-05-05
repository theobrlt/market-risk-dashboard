@echo off
echo Starting Market Risk Dashboard...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.9+ from https://www.python.org/
    pause
    exit /b 1
)

REM Start backend
echo Starting backend server...
cd backend
python -m pip install -r requirements.txt --quiet
start "Market Risk - Backend" python app.py

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start frontend server
echo Starting frontend server...
cd ..\frontend
echo.
echo Dashboard is ready! Opening in browser...
echo.
echo Frontend: http://127.0.0.1:8000
echo Backend API: http://127.0.0.1:5000
echo.
echo Press Ctrl+C to stop both servers
echo.

python -m http.server 8000

pause
