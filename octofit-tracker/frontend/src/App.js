import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './octofitapp-small.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="OctoFit Logo" className="navbar-logo" />
            OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="container mt-5">
            <div className="jumbotron">
              <h1 className="display-4">Welcome to OctoFit Tracker!</h1>
              <p className="lead">Track your fitness journey, compete with teams, and achieve your goals.</p>
              <hr className="my-4" />
              <p>Click on a card below to explore different sections of the app.</p>
            </div>
            
            <div className="row mt-5">
              <div className="col-md-4 mb-4">
                <Link to="/users" className="text-decoration-none">
                  <div className="card h-100 home-card">
                    <div className="card-body text-center">
                      <div className="home-card-icon mb-3">👥</div>
                      <h3 className="card-title">Users</h3>
                      <p className="card-text">View all registered users and their profiles</p>
                    </div>
                  </div>
                </Link>
              </div>
              
              <div className="col-md-4 mb-4">
                <Link to="/activities" className="text-decoration-none">
                  <div className="card h-100 home-card">
                    <div className="card-body text-center">
                      <div className="home-card-icon mb-3">🏃</div>
                      <h3 className="card-title">Activities</h3>
                      <p className="card-text">Track and view all fitness activities</p>
                    </div>
                  </div>
                </Link>
              </div>
              
              <div className="col-md-4 mb-4">
                <Link to="/leaderboard" className="text-decoration-none">
                  <div className="card h-100 home-card">
                    <div className="card-body text-center">
                      <div className="home-card-icon mb-3">🏆</div>
                      <h3 className="card-title">Leaderboard</h3>
                      <p className="card-text">See who's leading the competition</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-4">
                <Link to="/teams" className="text-decoration-none">
                  <div className="card h-100 home-card">
                    <div className="card-body text-center">
                      <div className="home-card-icon mb-3">🦸</div>
                      <h3 className="card-title">Teams</h3>
                      <p className="card-text">Explore teams and their members</p>
                    </div>
                  </div>
                </Link>
              </div>
              
              <div className="col-md-4 mb-4">
                <Link to="/workouts" className="text-decoration-none">
                  <div className="card h-100 home-card">
                    <div className="card-body text-center">
                      <div className="home-card-icon mb-3">💪</div>
                      <h3 className="card-title">Workouts</h3>
                      <p className="card-text">Discover personalized workout suggestions</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        } />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
