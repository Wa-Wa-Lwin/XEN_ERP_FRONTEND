# Microsoft Authentication Setup Guide

This guide will help you set up Microsoft authentication for your Xen ERP Frontend application, specifically for users with @xenoptics.com email addresses.

## Prerequisites

1. An Azure Active Directory tenant
2. Admin access to create App Registrations
3. Your React application running

## Step 1: Create Azure App Registration

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Fill in the details:
   - **Name**: `Xen ERP Frontend`
   - **Supported account types**: Select "Accounts in any organizational directory (Any Azure AD directory - Multitenant)"
   - **Redirect URI**: 
     - Platform: `Single-page application (SPA)`
     - URI: `http://localhost:3000` (for development) or your production URL

5. Click **Register**

## Step 2: Configure App Registration

### 2.1 Get Client ID
1. From your App Registration overview page, copy the **Application (client) ID**
2. This will be your `REACT_APP_MSAL_CLIENT_ID`

### 2.2 Configure Authentication
1. Go to **Authentication** in the left menu
2. Under **Single-page application**, add your redirect URIs:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
3. Under **Implicit grant and hybrid flows**, check:
   - ✅ Access tokens
   - ✅ ID tokens
4. Click **Save**

### 2.3 Configure API Permissions
1. Go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Choose **Delegated permissions**
5. Add the following permissions:
   - `User.Read` (should be added by default)
   - `email`
   - `profile`
6. Click **Add permissions**
7. Click **Grant admin consent** (if you have admin rights)

### 2.4 Configure Token Configuration (Optional)
1. Go to **Token configuration**
2. Add optional claims if needed:
   - `email`
   - `family_name`
   - `given_name`

## Step 3: Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Microsoft Authentication Configuration
REACT_APP_MSAL_CLIENT_ID=your_client_id_here
REACT_APP_MSAL_REDIRECT_URI=http://localhost:3000
REACT_APP_MSAL_POST_LOGOUT_REDIRECT_URI=http://localhost:3000
```

Replace `your_client_id_here` with the Application (client) ID from Step 2.1.

## Step 4: Domain Restriction Configuration

The application is already configured to only allow @xenoptics.com email addresses. This is enforced in:

- `src/config/msalConfig.js` - Domain validation logic
- `src/services/microsoftAuthService.js` - Authentication service with domain checking

### To modify allowed domains:

Edit `src/config/msalConfig.js`:

```javascript
export const ALLOWED_DOMAINS = ['xenoptics.com', 'yourdomain.com'];
```

## Step 5: Testing

1. Start your React application:
   ```bash
   npm run dev
   ```

2. Navigate to the login page
3. Click "Sign in with Microsoft"
4. Use a @xenoptics.com email address to test
5. Try with a non-xenoptics.com email to verify domain restriction

## Step 6: Production Deployment

### 6.1 Update Azure App Registration
1. Add your production URL to the redirect URIs in Azure
2. Update environment variables for production

### 6.2 Environment Variables for Production
```env
REACT_APP_MSAL_CLIENT_ID=your_client_id_here
REACT_APP_MSAL_REDIRECT_URI=https://yourdomain.com
REACT_APP_MSAL_POST_LOGOUT_REDIRECT_URI=https://yourdomain.com
```

## Troubleshooting

### Common Issues

1. **"AADSTS50011: The reply URL specified in the request does not match"**
   - Solution: Ensure the redirect URI in your `.env` file matches exactly what's configured in Azure

2. **"Access denied. Only @xenoptics.com email addresses are allowed"**
   - This is expected behavior for non-xenoptics.com emails
   - Verify the domain restriction is working correctly

3. **CORS errors**
   - Ensure your redirect URIs are properly configured in Azure
   - Check that your development server is running on the correct port

4. **Token acquisition fails**
   - Verify API permissions are granted
   - Check that admin consent has been provided

### Debug Mode

To enable debug logging, modify `src/config/msalConfig.js`:

```javascript
system: {
  loggerOptions: {
    loggerCallback: (level, message, containsPii) => {
      if (containsPii) {
        return;
      }
      console.log(message); // This will log all MSAL messages
    },
    logLevel: LogLevel.Verbose, // Enable verbose logging
  },
},
```

## Security Considerations

1. **Client ID**: The client ID is public and safe to expose in frontend code
2. **Domain Restriction**: Always validate email domains on both client and server side
3. **Token Storage**: MSAL handles secure token storage automatically
4. **HTTPS**: Always use HTTPS in production

## Additional Resources

- [MSAL.js Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications)
- [Azure App Registration Guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/)

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Azure App Registration configuration
3. Ensure environment variables are correctly set
4. Test with a @xenoptics.com email address
