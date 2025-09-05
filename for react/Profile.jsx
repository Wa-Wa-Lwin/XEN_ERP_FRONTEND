// Profile Component Example
// Shows how to use authentication functions like change password

import React, { useState } from 'react';
import { useAuthContext } from './AuthProvider';

const Profile = () => {
  const { user, changePassword, loading, error, clearError } = useAuthContext();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (passwordMessage) setPasswordMessage('');
    if (error) clearError();
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage('New password must be at least 6 characters');
      return;
    }

    const result = await changePassword(
      user.userID,
      passwordForm.currentPassword,
      passwordForm.newPassword
    );

    if (result.success) {
      setPasswordMessage('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      setPasswordMessage(result.error || 'Failed to change password');
    }
  };

  return (
    <div className="profile">
      <h1>User Profile</h1>
      
      {user && (
        <div className="profile-content">
          <div className="profile-info">
            <h2>Personal Information</h2>
            <div className="info-card">
              <p><strong>User ID:</strong> {user.userID}</p>
              <p><strong>Username:</strong> {user.username}</p>
              {user.Detail && user.Detail[0] && (
                <>
                  <p><strong>First Name:</strong> {user.Detail[0].firstName}</p>
                  <p><strong>Last Name:</strong> {user.Detail[0].lastName}</p>
                  <p><strong>Email:</strong> {user.Detail[0].email}</p>
                  <p><strong>Phone:</strong> {user.Detail[0].phone}</p>
                  <p><strong>Gender:</strong> {user.Detail[0].gender}</p>
                  <p><strong>Department:</strong> {user.Detail[0].department_name}</p>
                  <p><strong>Position:</strong> {user.Detail[0].postition_name}</p>
                  <p><strong>Section:</strong> {user.Detail[0].section_name}</p>
                </>
              )}
            </div>
          </div>

          <div className="change-password">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
              {passwordMessage && (
                <div className={`message ${passwordMessage.includes('success') ? 'success' : 'error'}`}>
                  {passwordMessage}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password:</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  disabled={loading}
                  minLength="6"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  disabled={loading}
                  minLength="6"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                className="change-password-button"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
