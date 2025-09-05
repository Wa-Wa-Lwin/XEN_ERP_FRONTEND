import { useAuth } from '../contexts/AuthContext';
import useLogout from '../hooks/useLogout';

export default function ProfilePopUp({ onClose }) {
  const { user } = useAuth();
  const { handleLogout } = useLogout();

  if (!user) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
      {/* User Info */}
      <div className="px-4 py-2 border-b border-gray-200">
        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </div>
  );
}
