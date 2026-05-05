#!/bin/bash

echo "Starting Market Risk Dashboard..."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.9+ from https://www.python.org/"
    exit 1
fi

# Start backend
echo "Starting backend server..."
cd backend
python3 -m pip install -r requirements.txt --quiet
python3 app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Start frontend
echo "Starting frontend server..."
cd ../frontend
echo ""
echo "Dashboard is ready! Opening in browser..."
echo ""
echo "Frontend: http://127.0.0.1:8000"
echo "Backend API: http://127.0.0.1:5000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

python3 -m http.server 8000 &
FRONTEND_PID=$!

# Wait for Ctrl+C
wait

# Cleanup
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
