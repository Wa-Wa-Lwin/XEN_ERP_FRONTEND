import { createContext, useContext, useState, useEffect } from 'react';
import microsoftAuthService from '../services/microsoftAuthService';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('xen_erp_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        
        // If it's a Microsoft user, verify the session is still valid
        if (userData.provider === 'microsoft') {
          verifyMicrosoftSession(userData);
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('xen_erp_user');
      }
    }
    setIsLoading(false);
  }, []);

  const verifyMicrosoftSession = async (userData) => {
    try {
      const isAuthenticated = await microsoftAuthService.isAuthenticated();
      if (!isAuthenticated) {
        // Session expired, logout user
        logout();
      }
    } catch (error) {
      console.error('Error verifying Microsoft session:', error);
      logout();
    }
  };

  const login = (userData) => {
    setUser(userData);
    setError(null);
    localStorage.setItem('xen_erp_user', JSON.stringify(userData));
  };

  const loginWithMicrosoft = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await microsoftAuthService.loginWithMicrosoft();
      
      if (result.success) {
        login(result.user);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = error.message || 'Microsoft authentication failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // If user is logged in with Microsoft, logout from Microsoft as well
      if (user?.provider === 'microsoft') {
        await microsoftAuthService.logout();
      }
    } catch (error) {
      console.error('Error during Microsoft logout:', error);
    } finally {
      setUser(null);
      setError(null);
      localStorage.removeItem('xen_erp_user');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    login,
    loginWithMicrosoft,
    logout,
    isLoading,
    isAuthenticated: !!user,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
