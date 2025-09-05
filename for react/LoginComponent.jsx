// React Login Component Example
// Shows how to use the authentication service in a React component

import React, { useState } from 'react';
import { useAuth } from './useAuth';

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, loading, error, clearError } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) clearError();
  };

  const validateInputs = () => {
    const { username, password } = formData;
    return username.trim().length > 0 && password.trim().length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      // Login successful - redirect or update UI
      console.log('Login successful:', result.data);
      // You can redirect here or let the parent component handle it
    } else if (result.needsRegistration) {
      // First time user - needs to register
      console.log('User needs to register:', result.username);
      // Redirect to registration page
    } else {
      // Login failed
      console.error('Login failed:', result.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
              disabled={loading}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !validateInputs()}
          className="login-button"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
