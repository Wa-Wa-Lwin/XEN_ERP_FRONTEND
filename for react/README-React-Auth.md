# React Authentication Service

This is a React-compatible version of the Angular authentication service from your XenLogistics project. It provides the same functionality for user authentication, registration, and session management in React applications.

## Features

- **User Authentication**: Login with username/password
- **User Registration**: Register new users
- **Session Management**: Automatic token handling and storage
- **Password Management**: Change password, reset password, email confirmation
- **User State Management**: React hooks for state management
- **Protected Routes**: Route protection based on authentication status
- **Error Handling**: Comprehensive error handling and user feedback

## Files Included

1. **`react-auth-service.js`** - Main authentication service class
2. **`useAuth.js`** - React hook for authentication
3. **`AuthProvider.jsx`** - Context provider for authentication state
4. **`LoginComponent.jsx`** - Example login component
5. **`Dashboard.jsx`** - Example protected dashboard component
6. **`Profile.jsx`** - Example profile component with password change
7. **`App.jsx`** - Main app component with routing

## Installation & Setup

### 1. Install Dependencies

```bash
npm install react react-dom react-router-dom
```

### 2. Update API Endpoints

Edit `react-auth-service.js` and update the API endpoints:

```javascript
// Update these URLs to match your environment
this.baseAPIAuth = 'http://your-auth-server/api/mfg/';
this.baseAPI = 'http://your-main-server/api/';
```

### 3. Setup Routing

Make sure you have React Router installed and configured in your app.

## Usage

### Basic Setup

```jsx
import React from 'react';
import { AuthProvider } from './AuthProvider';
import App from './App';

function MainApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default MainApp;
```

### Using Authentication in Components

```jsx
import React from 'react';
import { useAuthContext } from './AuthProvider';

const MyComponent = () => {
  const { user, login, logout, loading, error } = useAuthContext();

  const handleLogin = async () => {
    const result = await login('username', 'password');
    if (result.success) {
      console.log('Login successful');
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

### Using the Hook Directly

```jsx
import React from 'react';
import { useAuth } from './useAuth';

const LoginForm = () => {
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login('username', 'password');
    // Handle result
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  );
};
```

## API Reference

### AuthService Methods

#### `login(username, password)`
Authenticates a user with username and password.

**Parameters:**
- `username` (string): User's username
- `password` (string): User's password

**Returns:** Promise with login result

#### `logout()`
Logs out the current user and clears session data.

**Returns:** Promise

#### `register(userData)`
Registers a new user.

**Parameters:**
- `userData` (object): User registration data

**Returns:** Promise with registration result

#### `changePassword(userID, currentPassword, newPassword)`
Changes user's password.

**Parameters:**
- `userID` (number): User ID
- `currentPassword` (string): Current password
- `newPassword` (string): New password

**Returns:** Promise with result

#### `sendResetPassword(username, email)`
Sends password reset email.

**Parameters:**
- `username` (string): Username
- `email` (string): User's email

**Returns:** Promise with result

#### `resetPassword(uid, email, token, newPassword)`
Resets password using token.

**Parameters:**
- `uid` (number): User ID
- `email` (string): User's email
- `token` (string): Reset token
- `newPassword` (string): New password

**Returns:** Promise with result

### useAuth Hook

The `useAuth` hook provides:

- `user`: Current user object or null
- `loading`: Boolean indicating if an operation is in progress
- `error`: Current error message or null
- `login(username, password)`: Login function
- `logout()`: Logout function
- `register(userData)`: Registration function
- `changePassword(userID, currentPassword, newPassword)`: Change password function
- `sendResetPassword(username, email)`: Send reset password function
- `resetPassword(uid, email, token, newPassword)`: Reset password function
- `sendEmailConfirmation(username)`: Send email confirmation function
- `isAuthenticated()`: Check if user is authenticated
- `clearError()`: Clear current error

## Authentication Flow

1. **Login**: User enters credentials → API call → Store encrypted user data → Set active user
2. **Session Management**: User data is stored encrypted in localStorage
3. **API Requests**: All requests include device UUID and token headers
4. **Logout**: Clear user data → Clear active user → Redirect to login

## Security Features

- **Token-based Authentication**: All API requests include authentication tokens
- **Device UUID**: Each request includes a unique device identifier
- **Encrypted Storage**: User data is encrypted before storing in localStorage
- **Session Timeout**: Automatic session management and timeout handling

## Error Handling

The service includes comprehensive error handling:

- Network errors
- Authentication failures
- Invalid credentials
- Session timeouts
- Server errors

## Customization

### Custom Redirects

Update the `redirectToLogin()` method in `ReactAuthService`:

```javascript
redirectToLogin() {
  // Custom redirect logic
  window.location.href = '/login';
  // Or use React Router:
  // navigate('/login');
}
```

### Custom Storage

You can modify the storage methods to use different storage solutions:

```javascript
// Example: Use sessionStorage instead of localStorage
async storeUserData(userData) {
  const encrypted = this.encrypt(JSON.stringify(userData));
  sessionStorage.setItem('userData', encrypted);
}
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your API server allows requests from your React app domain
2. **Token Issues**: Check that the API endpoints are correct and accessible
3. **Storage Issues**: Ensure localStorage is available in your environment

### Debug Mode

Add console logging to debug authentication issues:

```javascript
// In react-auth-service.js
async login(username, password) {
  console.log('Attempting login for:', username);
  // ... rest of the method
}
```

## Migration from Angular

This React version maintains the same API structure as your Angular service:

- Same endpoint URLs
- Same request/response format
- Same authentication flow
- Same user data structure

The main differences are:
- Uses React hooks instead of Angular services
- Uses fetch API instead of Angular HttpClient
- Uses localStorage instead of Ionic Storage
- Uses React Context instead of Angular dependency injection

## Support

For issues or questions, refer to your original Angular implementation or contact your development team.
