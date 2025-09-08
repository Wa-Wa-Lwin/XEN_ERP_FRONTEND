import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './config/msalConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import { Routes, Route, Navigate } from "react-router-dom";  // ✅ add router

import LoginPage from "./components/Login/Login";
import LoginOld from "./components/Login Old"; // ✅ import old login
import ShipmentList from "./pages/ShipmentList";
import Header from "./components/Header";

// Wrap protected content
function ProtectedApp() {
  return (
    <div>
      <Header />
      <ShipmentList />
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login_old" element={<LoginOld />} />

      {/* Protected routes */}
      {isAuthenticated ? (
        <>
          <Route path="/" element={<ProtectedApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

// Create MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </MsalProvider>
  );
}

export default App;
