import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient, { SigningKey } from "jwks-rsa";
import { Request, Response, NextFunction } from "express";
import { authConfig } from "./authConfig";

// Configure JWKS client to get signing keys from Microsoft Entra ID
const client = jwksClient({
	jwksUri: authConfig.jwksUri,
});


// Function to retrieve the signing key
function getKey(header: JwtHeader, callback: SigningKeyCallback): void {
	client.getSigningKey(header.kid as string, (err: Error | null, key?: SigningKey) => {
		if (err || !key) {
			callback(err, undefined);
			console.log("Error retrieving signing key");
		} else {
			const signingKey = key?.getPublicKey();
			callback(null, signingKey);
			console.log("Signing key retrieved", signingKey);
		}
	});
}

// Middleware to verify the token
export function verifyToken(req: Request, res: Response, next: NextFunction): void {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(" ")[1];
	console.log("Token: ", token);

	if (!token) {
		res.status(401).send("No token provided");
		return;
	}

	jwt.verify(token, getKey, {
		algorithms: ["RS256"],
		audience: authConfig.audience,
		issuer: authConfig.authority
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
