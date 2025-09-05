import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest, graphConfig, isEmailDomainAllowed } from '../config/msalConfig';

class MicrosoftAuthService {
  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
    this.initializeMsal();
  }

  async initializeMsal() {
    try {
      await this.msalInstance.initialize();
    } catch (error) {
      console.error('MSAL initialization error:', error);
    }
  }

  // Get MSAL instance
  getMsalInstance() {
    return this.msalInstance;
  }

  // Login with Microsoft
  async loginWithMicrosoft() {
    try {
      const loginResponse = await this.msalInstance.loginPopup(loginRequest);
      
      // Validate email domain
      const userEmail = loginResponse.account?.username;
      if (!isEmailDomainAllowed(userEmail)) {
        await this.logout();
        throw new Error(`Access denied. Only @xenoptics.com email addresses are allowed. Your email: ${userEmail}`);
      }

      // Get user profile from Microsoft Graph
      const userProfile = await this.getUserProfile(loginResponse.accessToken);
      
      return {
        success: true,
        user: {
          id: loginResponse.account.homeAccountId,
          name: userProfile.displayName || loginResponse.account.name,
          email: userEmail,
          role: 'user', // You can customize this based on your needs
          provider: 'microsoft',
          accessToken: loginResponse.accessToken,
          idToken: loginResponse.idToken,
          account: loginResponse.account
        }
      };
    } catch (error) {
      console.error('Microsoft login error:', error);
      return {
        success: false,
        error: error.message || 'Microsoft authentication failed'
      };
    }
  }

  // Get user profile from Microsoft Graph
  async getUserProfile(accessToken) {
    try {
      const response = await fetch(graphConfig.graphMeEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Graph API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  // Logout from Microsoft
  async logout() {
    try {
      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        await this.msalInstance.logoutPopup({
          account: accounts[0],
          postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri,
        });
      }
    } catch (error) {
      console.error('Microsoft logout error:', error);
    }
  }

  // Check if user is authenticated
  async isAuthenticated() {
    try {
      const accounts = this.msalInstance.getAllAccounts();
      return accounts.length > 0;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  }

  // Get current account
  getCurrentAccount() {
    const accounts = this.msalInstance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;
  }

  // Acquire token silently
  async acquireTokenSilently() {
    try {
      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        const silentRequest = {
          ...loginRequest,
          account: accounts[0],
        };
        const response = await this.msalInstance.acquireTokenSilent(silentRequest);
        return response.accessToken;
      }
      return null;
    } catch (error) {
      console.error('Error acquiring token silently:', error);
      return null;
    }
  }

  // Handle redirect result (for redirect flow)
  async handleRedirectResult() {
    try {
      const response = await this.msalInstance.handleRedirectPromise();
      if (response) {
        const userEmail = response.account?.username;
        if (!isEmailDomainAllowed(userEmail)) {
          await this.logout();
          throw new Error(`Access denied. Only @xenoptics.com email addresses are allowed. Your email: ${userEmail}`);
        }
        return response;
      }
      return null;
    } catch (error) {
      console.error('Error handling redirect result:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const microsoftAuthService = new MicrosoftAuthService();
export default microsoftAuthService;
