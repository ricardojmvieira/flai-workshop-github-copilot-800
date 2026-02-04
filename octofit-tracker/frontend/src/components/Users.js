import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', team: '' });
  const [saveError, setSaveError] = useState(null);
  const [saving, setSaving] = useState(false);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
  const teamsUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Users Component - Fetching from API:', apiUrl);
    
    // Fetch users
    fetch(apiUrl)
      .then(response => {
        console.log('Users Component - Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users Component - Fetched Data:', data);
        const usersData = data.results || data;
        console.log('Users Component - Processed Data:', usersData);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Users Component - Error:', error);
        setError(error.message);
        setLoading(false);
      });

    // Fetch teams for the dropdown
    fetch(teamsUrl)
      .then(response => response.json())
      .then(data => {
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, [apiUrl, teamsUrl]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      team: user.team || ''
    });
    setSaveError(null);
  };

  const handleClose = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', team: '' });
    setSaveError(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    try {
      const response = await fetch(`${apiUrl}${editingUser._id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.status}`);
      }

      const updatedUser = await response.json();
      
      // Update the user in the local state
      setUsers(users.map(u => 
        u._id === updatedUser._id ? updatedUser : u
      ));

      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
      setSaveError(error.message);
    } finally {
      setSaving(false);
    }
  };

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
        <h2 className="mb-0">Users</h2>
        <span className="badge bg-primary">{users.length} Users</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Team</th>
              <th scope="col">Joined</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id || user.id}>
                  <td><strong>{user.name}</strong></td>
                  <td><small>{user.email}</small></td>
                  <td>
                    <span className="badge bg-info">
                      {user.team || 'No Team'}
                    </span>
                  </td>
                  <td>
                    <small className="text-muted">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </small>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {saveError && (
                    <div className="alert alert-danger" role="alert">
                      {saveError}
                    </div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="team" className="form-label">Team</label>
                    <select
                      className="form-select"
                      id="team"
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a team</option>
                      {teams.map((team) => (
                        <option key={team._id || team.id} value={team.name}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
