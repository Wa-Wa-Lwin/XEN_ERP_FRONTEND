import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfilePopUp from './ProfilePopUp';

export default function Header() {
  const { user } = useAuth();
  const [profilePopUpOpen, setProfilePopUpOpen] = useState(false);
  const popUpRef = useRef(null);

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0].toUpperCase())
      .join('');
  };

  // ✅ Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setProfilePopUpOpen(false);
      }
    };
    if (profilePopUpOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profilePopUpOpen]);

  return (
    <header className="bg-gray-600 text-white shadow-md relative">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Left: Logo / Title */}
        <div className="text-2xl font-bold">Xen Logistics</div>

        {/* Right: Profile Button + PopUp */}
        {user && (
          <div className="relative" ref={popUpRef}>
            <button
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 font-bold"
              onClick={() => setProfilePopUpOpen(!profilePopUpOpen)}
            >
              {getInitials(user.name)}
            </button>

            {profilePopUpOpen && (
              <ProfilePopUp onClose={() => setProfilePopUpOpen(false)} />
            )}
          </div>
        )}
      </div>
    </header>
  );
}
