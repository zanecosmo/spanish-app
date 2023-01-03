import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { U } from "../types";

dotenv.config();

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader: U<string> = req.headers["authorization"];

    if (!authHeader) return next();

    const token: U<string> = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).send({ success: false, data: null });
        return;
    };

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    }
    catch (error) {
        res.status(401).send({ success: false, data: null });
    };

    next();
};