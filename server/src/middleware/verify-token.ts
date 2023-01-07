import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { extractCookies } from "../utils";

dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const { headers: { cookie } } = req;

    if (!cookie) {
        // res.status(401).send({ success: false, message: "NO COOKIE NO ENTRY" });
        res.status(304).redirect("/login-or-create-account");
        return;
    };
    
    const token: string = extractCookies(cookie)["jwt"];
    
    if (!token) {
        // res.status(401).send({ success: false, message: "NO JWT NO ENTRY" });
        res.status(304).redirect("/login-or-create-account");
        return;
    };
    
    try {
        req.body.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        console.log(req.body.user);
    }
    catch (error) {
        // res.status(401).send({ success: false, message: "JWT HAS BEEN TAMPERED WITH" });
        res.status(304).redirect("/login-or-create-account");
        return;
    };

    console.log(token);

    next();
};