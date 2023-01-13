import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { extractCookies } from "../utils";

dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body.user) {
        res.status(401).send({ success: false, message: "BODY ALREADY CONTAINS USER, JWT INVALID" });
    };

    const cookie = req.headers.cookie;

    if (!cookie) {
        res.status(401).send({ success: false, message: "NO COOKIE" });
        return;
    };
    
    const token: string = extractCookies(cookie)["jwt"];
    
    if (!token) {
        res.status(401).send({ success: false, message: "NO JWT NO ENTRY" });
        return;
    };
    
    try {
        req.body.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    }
    catch (error) {
        res.status(401).send({ success: false, message: "JWT HAS BEEN TAMPERED WITH" });
        return;
    };

    next();
};