import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities Component - Fetching from API:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Activities Component - Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities Component - Fetched Data:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities Component - Processed Data:', activitiesData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Activities Component - Error:', error);
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
        <h2 className="mb-0">Activities</h2>
        <span className="badge bg-primary">{activities.length} Total</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Activity Type</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Distance (km)</th>
              <th scope="col">Calories</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No activities found
                </td>
              </tr>
            ) : (
              activities.map((activity) => {
                const activityDate = activity.date ? new Date(activity.date) : null;
                const isValidDate = activityDate && !isNaN(activityDate.getTime());
                
                return (
                  <tr key={activity._id || activity.id}>
                    <td><strong>{activity.user_name || activity.user}</strong></td>
                    <td><span className="badge bg-info">{activity.activity_type}</span></td>
                    <td>{activity.duration}</td>
                    <td>{activity.distance || 'N/A'}</td>
                    <td><span className="badge bg-success">{activity.calories}</span></td>
                    <td>
                      {isValidDate ? activityDate.toLocaleDateString() : <span className="text-muted">N/A</span>}
                    </td>
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

export default Activities;
