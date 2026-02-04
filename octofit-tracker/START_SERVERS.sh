#!/bin/bash

# OctoFit Tracker - Server Startup Script
echo "============================================"
echo "  Starting OctoFit Tracker Servers"
echo "============================================"

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "❌ MongoDB is not running. Starting MongoDB..."
    mongod --dbpath /data/db --fork --logpath /tmp/mongod.log
    sleep 2
else
    echo "✅ MongoDB is already running"
fi

# Start Django Backend
echo ""
echo "Starting Django Backend on port 8000..."
cd /workspaces/flai-workshop-github-copilot-800/octofit-tracker/backend
source venv/bin/activate
nohup python manage.py runserver 0.0.0.0:8000 > /tmp/django.log 2>&1 &
DJANGO_PID=$!
echo "✅ Django Backend started (PID: $DJANGO_PID)"

# Wait a bit for Django to start
sleep 3

# Start React Frontend
echo ""
echo "Starting React Frontend on port 3000..."
cd /workspaces/flai-workshop-github-copilot-800/octofit-tracker/frontend

# Check if .env exists, if not create it
if [ ! -f .env ]; then
    echo "Creating .env file with CODESPACE_NAME..."
    echo "REACT_APP_CODESPACE_NAME=$CODESPACE_NAME" > .env
fi

# Start React in a new terminal (background)
npm start > /tmp/react.log 2>&1 &
REACT_PID=$!
echo "✅ React Frontend started (PID: $REACT_PID)"

echo ""
echo "============================================"
echo "  All Servers Started Successfully!"
echo "============================================"
echo ""
echo "Backend API:  https://$CODESPACE_NAME-8000.app.github.dev/api/"
echo "Frontend App: https://$CODESPACE_NAME-3000.app.github.dev/"
echo ""
echo "Logs:"
echo "  Django: tail -f /tmp/django.log"
echo "  React:  tail -f /tmp/react.log"
echo ""
echo "To stop servers:"
echo "  pkill -f 'manage.py runserver'"
echo "  pkill -f 'react-scripts start'"
echo "============================================"
