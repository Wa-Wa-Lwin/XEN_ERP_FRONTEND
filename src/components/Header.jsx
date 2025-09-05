export default function Header() {
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

        {/* User/Profile Placeholder */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">John Doe</span>
          <div className="w-8 h-8 bg-white rounded-full text-blue-600 flex items-center justify-center font-bold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
