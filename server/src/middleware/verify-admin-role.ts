import { Request, Response, NextFunction } from "express";
import { Roles } from "../types";

export const verifyAdminRole = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body.user !== Roles.ADMIN) {
        res.status(401).send({ success: false, message: "ONLY ADMINS CAN ADD WORDS" });
        return;
    };

    next();
};