// React Hook for Authentication
// Custom hook to use the authentication service in React components

import { useState, useEffect, useCallback } from 'react';
import ReactAuthService from './react-auth-service';

// Create a singleton instance
const authService = new ReactAuthService();

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const userData = await authService.getUserData();
        if (userData && userData.token) {
          setUser(userData);
          authService.setActiveUser(userData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for user state changes
    const handleUserStateChange = (userInfo) => {
      setUser(userInfo);
    };

    authService.onUserStateChange(handleUserStateChange);

    // Cleanup listener on unmount
    return () => {
      authService.removeUserStateListener(handleUserStateChange);
    };
  }, []);

  // Login function
  const login = useCallback(async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(username, password);
      
      if (response.ret === 0) {
        if (response.data) {
          const userData = authService.decrypt(response.data);
          if (userData && userData.token) {
            await authService.storeUserData(userData);
            setUser(userData);
            authService.setActiveUser(userData);
            return { success: true, data: userData };
          } else {
            throw new Error('Invalid user data received');
          }
        } else {
          // First time login - needs registration
          return { success: false, needsRegistration: true, username: username.split('@')[0] };
        }
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.registerRemote(
        userData.username,
        userData.firstname,
        userData.lastname,
        userData.gender,
        userData.email,
        userData.phone,
        userData.departmentID,
        userData.section_index,
        userData.role,
        userData.pic
      );
      
      return { success: true, data: response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Change password function
  const changePassword = useCallback(async (userID, currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.changePassword(userID, currentPassword, newPassword);
      return { success: true, data: response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Send reset password email
  const sendResetPassword = useCallback(async (username, email) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.sendResetPassword(username, email);
      return { success: true, data: response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (uid, email, token, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.resetPassword(uid, email, token, newPassword);
      return { success: true, data: response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Send email confirmation
  const sendEmailConfirmation = useCallback(async (username) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.sendEmailConfirmAgain(username);
      return { success: true, data: response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if user is authenticated
  const isAuthenticated = useCallback(async () => {
    return await authService.isAuthenticated();
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    changePassword,
    sendResetPassword,
    resetPassword,
    sendEmailConfirmation,
    isAuthenticated,
    clearError
  };
};

export default useAuth;
