import { Request, Response, NextFunction } from "express";
import { Roles } from "../types";
import { buildResponseBody } from "../utils";

export const verifyAdminRole = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body.user.role !== Roles.ADMIN) {
        res.status(401).send(buildResponseBody(null, undefined, "ONLY ADMINS ALTER ADD WORDS"));
        return;
    };

    next();
};