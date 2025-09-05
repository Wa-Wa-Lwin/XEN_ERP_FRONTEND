// Dashboard Component Example
// Shows how to use authentication in a protected component

import React from 'react';
import { useAuthContext } from './AuthProvider';

const Dashboard = () => {
  const { user, logout, loading } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.username || 'User'}!</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="user-details">
          <h2>User Information</h2>
          {user && (
            <div className="user-card">
              <p><strong>User ID:</strong> {user.userID}</p>
              <p><strong>Username:</strong> {user.username}</p>
              {user.Detail && user.Detail[0] && (
                <>
                  <p><strong>Name:</strong> {user.Detail[0].firstName} {user.Detail[0].lastName}</p>
                  <p><strong>Email:</strong> {user.Detail[0].email}</p>
                  <p><strong>Department:</strong> {user.Detail[0].department_name}</p>
                  <p><strong>Position:</strong> {user.Detail[0].postition_name}</p>
                </>
              )}
            </div>
          )}
        </div>
        
        <div className="dashboard-widgets">
          <div className="widget">
            <h3>Quick Actions</h3>
            <button>Create New Shipment</button>
            <button>View Logistics</button>
            <button>Manage Inventory</button>
          </div>
          
          <div className="widget">
            <h3>Recent Activity</h3>
            <p>No recent activity</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
