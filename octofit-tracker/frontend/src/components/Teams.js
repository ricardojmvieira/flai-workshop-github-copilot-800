import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams Component - Fetching from API:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Teams Component - Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams Component - Fetched Data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams Component - Processed Data:', teamsData);
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams Component - Error:', error);
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
        <h2 className="mb-0">Teams</h2>
        <span className="badge bg-success">{teams.length} Teams</span>
      </div>
      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No teams available
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id || team.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text flex-grow-1">{team.description}</p>
                  <div className="mt-auto">
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary">
                        👥 {team.member_count || 0} Members
                      </span>
                      <small className="text-muted">
                        {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
