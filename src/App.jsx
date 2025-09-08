import { useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './config/msalConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";  // NOTE: add router

import LoginPage from "./components/Login/Login";
import LoginOld from "./components/Login Old"; // NOTE: import old login
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
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true }); // NOTE: replace-true will redirect immediately after login
    }
  }, [isAuthenticated, navigate]);

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
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login_old" element={<LoginOld />} />
        </>
      )}

      {/* Protected routes */}
      {isAuthenticated && (
        <>
          <Route path="/" element={<ProtectedApp />} />
        </>
      )}

      {/* Catch-all */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
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
