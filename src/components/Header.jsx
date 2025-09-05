import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user } = useAuth(); // Get the logged-in user from context

  // Helper to get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map(n => n[0].toUpperCase()).join('');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / App Name */}
        <div className="text-2xl font-bold">
          Shipment Dashboard
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">       
          <a href="#" className="hover:text-gray-200 transition">Home</a>
          <a href="#" className="hover:text-gray-200 transition">Shipments</a>
          <a href="#" className="hover:text-gray-200 transition">About</a>
        </nav>

        {/* User/Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="text-sm text-white flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs">{user.email}</span>
              </div>
              <div className="w-8 h-8 bg-white rounded-full text-blue-600 flex items-center justify-center font-bold">
                {getInitials(user.name)}
              </div>
            </>
          ) : (
            <span className="text-white">Not logged in</span>
          )}
        </div>
      </div>
    </header>
  );
}
