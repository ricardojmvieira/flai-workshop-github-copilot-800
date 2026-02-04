import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard Component - Fetching from API:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Leaderboard Component - Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard Component - Fetched Data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard Component - Processed Data:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard Component - Error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '300px'}}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🏆 Leaderboard</h2>
        <span className="badge bg-warning text-dark">{leaderboard.length} Competitors</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">User</th>
              <th scope="col">Team</th>
              <th scope="col">Total Activities</th>
              <th scope="col">Total Distance (km)</th>
              <th scope="col">Total Calories</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No leaderboard data available
                </td>
              </tr>
            ) : (
              leaderboard.map((entry, index) => {
                const rank = index + 1;
                const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
                return (
                  <tr key={entry.id || index} className={rank <= 3 ? 'table-warning' : ''}>
                    <td><strong>{medal} {rank}</strong></td>
                    <td><strong>{entry.user_name || entry.user}</strong></td>
                    <td><span className="badge bg-info">{entry.team || 'N/A'}</span></td>
                    <td><span className="badge bg-secondary">{entry.total_activities || 0}</span></td>
                    <td>{entry.total_distance || 0}</td>
                    <td><span className="badge bg-success">{entry.total_calories || 0}</span></td>
                    <td><span className="badge bg-primary">{entry.points || 0}</span></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
