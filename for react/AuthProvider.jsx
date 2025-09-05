// React Authentication Context Provider
// Provides authentication state throughout the app

import React, { createContext, useContext } from 'react';
import { useAuth } from './useAuth';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Higher-order component for protecting routes
export const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const { user, loading, isAuthenticated } = useAuthContext();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <div>Please log in to access this page.</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthProvider;
