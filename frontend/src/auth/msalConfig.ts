import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`,
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
  },
};