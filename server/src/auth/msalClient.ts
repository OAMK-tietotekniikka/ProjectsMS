import { ConfidentialClientApplication } from "@azure/msal-node";
import { msalConfig } from "../config/msalConfig";

const msalClient = new ConfidentialClientApplication(msalConfig);

export default msalClient;