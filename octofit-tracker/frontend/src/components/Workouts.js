import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts Component - Fetching from API:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Workouts Component - Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts Component - Fetched Data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts Component - Processed Data:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts Component - Error:', error);
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
        <h2 className="mb-0">💪 Personalized Workouts</h2>
        <span className="badge bg-success">{workouts.length} Workouts</span>
      </div>
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No workouts available
        </div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{workout.name}</h5>
                  <div className="mb-3">
                    <span className="badge bg-info me-2">{workout.activity_type}</span>
                    <span className="badge bg-warning text-dark">{workout.difficulty}</span>
                  </div>
                  <p className="card-text flex-grow-1">{workout.description}</p>
                  <hr />
                  <div className="mt-auto">
                    <div className="row g-2">
                      <div className="col-6">
                        <div className="text-center p-2 bg-light rounded">
                          <small className="text-muted d-block">Duration</small>
                          <strong>{workout.duration} min</strong>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-center p-2 bg-light rounded">
                          <small className="text-muted d-block">Est. Calories</small>
                          <strong>{workout.estimated_calories}</strong>
                        </div>
                      </div>
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

export default Workouts;
