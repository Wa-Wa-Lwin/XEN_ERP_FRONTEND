// src/hooks/useLogout.js
import { useAuth } from '../contexts/AuthContext';

export default function useLogout() {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Clear user from context
    logout();
    // Optional: clear tokens from localStorage/sessionStorage if you store them
    localStorage.removeItem('token');
  };

  return { handleLogout };
}
