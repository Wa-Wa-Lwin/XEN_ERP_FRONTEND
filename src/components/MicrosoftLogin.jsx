import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function MicrosoftLogin() {
  const { loginWithMicrosoft, isLoading, error, clearError } = useAuth();
  const [isMicrosoftLoading, setIsMicrosoftLoading] = useState(false);

  const handleMicrosoftLogin = async () => {
    setIsMicrosoftLoading(true);
    clearError();
    
    try {
      const result = await loginWithMicrosoft();
      
      if (!result.success) {
        console.error('Microsoft login failed:', result.error);
      }
    } catch (error) {
      console.error('Microsoft login error:', error);
    } finally {
      setIsMicrosoftLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {/* Error Display */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Microsoft Login Button */}
      <button
        type="button"
        onClick={handleMicrosoftLogin}
        disabled={isLoading || isMicrosoftLoading}
        className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isMicrosoftLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in with Microsoft...
          </div>
        ) : (
          <div className="flex items-center">
            {/* Microsoft Logo SVG */}
            <svg className="w-5 h-5 mr-3" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
              <rect x="12" y="1" width="9" height="9" fill="#7FBA00"/>
              <rect x="1" y="12" width="9" height="9" fill="#00A4EF"/>
              <rect x="12" y="12" width="9" height="9" fill="#FFB900"/>
            </svg>
            Sign in with Microsoft
          </div>
        )}
      </button>

      {/* Domain Restriction Notice */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          Only @xenoptics.com email addresses are allowed
        </p>
      </div>
    </div>
  );
}
