# OctoFit Tracker - Quick Start Guide

## The "Failed to fetch" error was because:

1. **Django backend was not running** - The React frontend was trying to connect to a backend that wasn't started
2. **Missing environment variable** - The `REACT_APP_CODESPACE_NAME` wasn't set in the frontend

## ✅ What's been fixed:

1. **Django backend is now running** on port 8000
2. **Created `.env` file** with your codespace name: `turbo-space-adventure-75qwv694v5v2xg6g`
3. **Updated CORS settings** to allow cross-origin requests
4. **Fixed settings.py syntax error** that was breaking the Django server

## 🚀 Starting the Servers

### Option 1: Use the Startup Script (Recommended)
```bash
cd /workspaces/flai-workshop-github-copilot-800/octofit-tracker
./START_SERVERS.sh
```

### Option 2: Start Manually

**Start Django Backend:**
```bash
cd /workspaces/flai-workshop-github-copilot-800/octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

**Start React Frontend (in a new terminal):**
```bash
cd /workspaces/flai-workshop-github-copilot-800/octofit-tracker/frontend
npm start
```

## 🔗 Access Your App

- **Frontend:** `https://turbo-space-adventure-75qwv694v5v2xg6g-3000.app.github.dev/`
- **Backend API:** `https://turbo-space-adventure-75qwv694v5v2xg6g-8000.app.github.dev/api/`

## 🧪 Test API Endpoints

```bash
# Users
curl http://localhost:8000/api/users/

# Teams
curl http://localhost:8000/api/teams/

# Activities
curl http://localhost:8000/api/activities/

# Leaderboard
curl http://localhost:8000/api/leaderboard/

# Workouts
curl http://localhost:8000/api/workouts/
```

## 📝 React Components

All components are configured to:
- Fetch from the Django REST API using the codespace URL
- Handle both paginated (`.results`) and plain array responses
- Log all API calls and responses to the browser console
- Display loading and error states

### Components:
- **Activities** - [src/components/Activities.js](frontend/src/components/Activities.js)
- **Leaderboard** - [src/components/Leaderboard.js](frontend/src/components/Leaderboard.js)
- **Teams** - [src/components/Teams.js](frontend/src/components/Teams.js)
- **Users** - [src/components/Users.js](frontend/src/components/Users.js)
- **Workouts** - [src/components/Workouts.js](frontend/src/components/Workouts.js)

## 🛠️ Troubleshooting

### Check if servers are running:
```bash
# Django
ps aux | grep "manage.py runserver"

# React
ps aux | grep "react-scripts"

# MongoDB
ps aux | grep mongod
```

### View logs:
```bash
# Django logs
tail -f /tmp/django.log

# React logs (if using startup script)
tail -f /tmp/react.log
```

### Stop servers:
```bash
# Stop Django
pkill -f "manage.py runserver"

# Stop React
pkill -f "react-scripts start"
```

## 🔍 Debugging Tips

1. **Open browser console (F12)** - All API calls are logged there
2. **Check the Network tab** - See actual requests and responses
3. **Verify .env file** - Make sure `REACT_APP_CODESPACE_NAME` is set correctly
4. **Check ports** - Ensure ports 3000 and 8000 are forwarded and public

## 📦 Current Status

✅ MongoDB running
✅ Django backend running (port 8000)
✅ API endpoints returning data
✅ React components created with API integration
✅ .env file configured
✅ CORS properly configured
⏳ React frontend needs to be started

**Next step:** Start the React frontend to see your app in action!
