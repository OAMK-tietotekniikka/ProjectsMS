import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "c908bf07-0bfa-4103-bd36-67a806379245",
        authority: "https://login.microsoftonline.com/2ac80432-2493-40bb-916f-cea3ba6ba0fd",
        redirectUri: "http://localhost:5000",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level: any, message: any, containsPii: any) => {	
                if (containsPii) {		
                    return;		
                }		
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
                    default:
                        return;
                }	
            }	
        }	
    }
};

export const loginRequest = {
    scopes: ["openid", "profile", "email", "User.Read"]
};
