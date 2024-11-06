"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const authConfig_1 = require("./authConfig");
// Configure JWKS client to get signing keys from Microsoft Entra ID
const client = (0, jwks_rsa_1.default)({
    jwksUri: authConfig_1.authConfig.jwksUri,
});
// Function to retrieve the signing key
function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        if (err || !key) {
            callback(err, undefined);
            console.log("Error retrieving signing key");
        }
        else {
            const signingKey = key === null || key === void 0 ? void 0 : key.getPublicKey();
            callback(null, signingKey);
            console.log("Signing key retrieved", signingKey);
        }
    });
}
// Middleware to verify the token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token: ", token);
    if (!token) {
        res.status(401).send("No token provided");
        return;
    }
    jsonwebtoken_1.default.verify(token, getKey, {
        algorithms: ["RS256"],
        audience: authConfig_1.authConfig.audience,
        issuer: authConfig_1.authConfig.authority
    }, (err, decoded) => {
        if (err) {
            res.status(401).send("Invalid token");
            return;
        }
        // Attach the decoded token to the request object
        //req.user = decoded as jwt.JwtPayload;
        next();
    });
}
exports.verifyToken = verifyToken;
