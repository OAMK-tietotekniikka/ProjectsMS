import { Request, Response, NextFunction } from "express";
import msalClient from "../auth/msalClient";
import jwt from "jsonwebtoken";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const { tenantId, clientId } = decodedToken.payload;
        if (tenantId !== process.env.TENANT_ID || clientId !== process.env.CLIENT_ID) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const tokenResponse = await msalClient.acquireTokenOnBehalfOf({
            oboAssertion: token,
            scopes: ["https://graph.microsoft.com/.default"],
            skipCache: true,
        });

        req.user = tokenResponse.account;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};