import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './config/msalConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import Login from "./components/Login";
import ShipmentList from "./pages/ShipmentList";
import Header from "./components/Header";

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

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div>
      <Header />
      <ShipmentList />
    </div>
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
