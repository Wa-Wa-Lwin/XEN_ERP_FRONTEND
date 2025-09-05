// React Authentication Service
// Converted from Angular AuthService for React usage

class ReactAuthService {
  constructor() {
    this.activeUser = null;
    this.lastActiveUser = null;
    this.redirectUrl = null;
    this.baseUrlAuth = 'auth/';
    this.baseUrlUser = 'user/';
    this.baseUrlReset = 'users/req_reset/';
    this.baseUrlInfo = 'users/info/';
    
    // API endpoints (update these based on your environment)
    this.baseAPIAuth = 'http://192.168.60.211/api/mfg/';
    this.baseAPI = 'http://192.168.60.31/api/';
    
    // Event listeners for user state changes
    this.userStateListeners = [];
  }

  // Add listener for user state changes
  onUserStateChange(callback) {
    this.userStateListeners.push(callback);
  }

  // Remove listener
  removeUserStateListener(callback) {
    this.userStateListeners = this.userStateListeners.filter(listener => listener !== callback);
  }

  // Notify all listeners of user state change
  notifyUserStateChange(userInfo) {
    this.userStateListeners.forEach(listener => listener(userInfo));
  }

  // Set active user and notify listeners
  setActiveUser(userInfo) {
    this.lastActiveUser = this.activeUser;
    this.activeUser = userInfo;
    
    if (!userInfo && this.lastActiveUser) {
      // User logged out, redirect to login
      this.redirectToLogin();
    }
    
    this.notifyUserStateChange(userInfo);
  }

  // Get device UUID (simplified version)
  getDeviceUUID() {
    // In a real implementation, you might want to use a proper device UUID library
    return 'web-' + Math.random().toString(36).substr(2, 9);
  }

  // Get stored token
  async getToken() {
    try {
      const userData = await this.getUserData();
      return userData ? userData.token : null;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  // Get user data from localStorage
  async getUserData() {
    try {
      const storedUser = localStorage.getItem('userData');
      if (storedUser && storedUser !== 'unknown') {
        const decryptedData = this.decrypt(storedUser);
        return JSON.parse(decryptedData);
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Encrypt data (base64 encoding)
  encrypt(value) {
    return btoa(escape(JSON.stringify(value)));
  }

  // Decrypt data (base64 decoding)
  decrypt(value) {
    try {
      return JSON.parse(unescape(atob(value)));
    } catch (error) {
      console.error('Decryption error:', error);
      return 'unknown';
    }
  }

  // Store user data
  async storeUserData(userData) {
    try {
      const encrypted = this.encrypt(JSON.stringify(userData));
      localStorage.setItem('userData', encrypted);
      return true;
    } catch (error) {
      console.error('Error storing user data:', error);
      return false;
    }
  }

  // Remove user data
  async removeUserData() {
    try {
      localStorage.removeItem('userData');
      return true;
    } catch (error) {
      console.error('Error removing user data:', error);
      return false;
    }
  }

  // Main login function
  async login(username, password) {
    try {
      const loginData = {
        mode: 'login',
        username: username,
        password: password,
      };

      const response = await this.makeAuthRequest('loginRemote', loginData);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register user
  async registerRemote(username, firstname, lastname, gender, email, phone, departmentID, section_index, role, pic) {
    try {
      const registerData = {
        username,
        firstname,
        lastname,
        gender,
        email,
        phone,
        departmentID,
        section_index,
        role,
        pic
      };

      const response = await this.makeAuthRequest('registerRemote', registerData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(userID, password, new_password) {
    try {
      const changePasswordData = {
        userID: userID,
        password: password,
        new_password: new_password
      };

      const response = await this.makeRequest(this.baseUrlUser + 'changePassword', changePasswordData);
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  // Logout function
  async logout() {
    try {
      this.setActiveUser(null);
      await this.removeUserData();
      this.redirectToLogin();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Send email confirmation
  async sendEmailConfirmAgain(username) {
    try {
      const profileData = {
        mode: 're-send-confirmEmail',
        username
      };

      const response = await this.makeAuthRequest('', profileData);
      return response;
    } catch (error) {
      console.error('Send email confirmation error:', error);
      throw error;
    }
  }

  // Send reset password request
  async sendResetPassword(username, email) {
    try {
      const profileData = {
        username,
        email
      };

      const response = await this.makeAuthRequest('reqRestPassword', profileData);
      return response;
    } catch (error) {
      console.error('Send reset password error:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(uid, email, token, newPassword) {
    try {
      const profileData = {
        userID: uid,
        token: token,
        email: email,
        new_password: newPassword
      };

      const response = await this.makeAuthRequest('resetPassword', profileData);
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // Make authenticated request
  async makeAuthRequest(endpoint, data) {
    const deviceUUID = this.getDeviceUUID();
    const token = await this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'token': token || '',
      'device': deviceUUID
    };

    const url = this.baseAPIAuth + this.baseUrlAuth + endpoint;

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // Make regular request
  async makeRequest(endpoint, data) {
    const deviceUUID = this.getDeviceUUID();
    const token = await this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'token': token || '',
      'device': deviceUUID
    };

    const url = this.baseAPI + endpoint;

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // Redirect to login (implement based on your routing)
  redirectToLogin() {
    // This should be implemented based on your React routing solution
    // For example, with React Router:
    // window.location.href = '/login';
    console.log('Redirecting to login...');
  }

  // Check if user is authenticated
  async isAuthenticated() {
    const userData = await this.getUserData();
    return userData && userData.token;
  }

  // Get current user
  getCurrentUser() {
    return this.activeUser;
  }
}

// Export the service
export default ReactAuthService;
