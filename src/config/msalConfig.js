import { LogLevel } from '@azure/msal-browser';

// MSAL configuration for Microsoft Authentication
export const msalConfig = {
  auth: {
    clientId: '10c691cd-fa9e-49ae-9e12-310bf0d3d2b1', // Updated Application (client) ID
    authority: 'https://login.microsoftonline.com/b8c84464-86e7-4d3a-8c4d-d5b1acce5b88', // Directory (tenant) ID

    // Must match the Redirect URI in Azure AD App Registration
    redirectUri: 'https://192.168.60.31/xenlogistic_dev/',
    postLogoutRedirectUri: 'https://192.168.60.31/xenlogistic_dev/',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
  prompt: 'select_account', // Force account selection
};

// Microsoft Graph API endpoint
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};

// Domain restriction for @xenoptics.com emails
export const ALLOWED_DOMAINS = ['xenoptics.com'];

// Function to validate if user's email domain is allowed
export const isEmailDomainAllowed = (email) => {
  if (!email) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  return ALLOWED_DOMAINS.includes(domain);
};

// Function to extract domain from email
export const getEmailDomain = (email) => {
  if (!email || !email.includes('@')) return null;
  return email.split('@')[1]?.toLowerCase();
};
