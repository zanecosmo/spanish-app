import { Request } from "express";
import { database } from "../sql/database/database";
import passportJWT, { Strategy, StrategyOptions, VerifiedCallback, VerifyCallbackWithRequest } from "passport-jwt";

const verifyCallback: VerifyCallbackWithRequest = async (req: Request, jwtPayload: any, done: VerifiedCallback) => {
    try {
        const user = await database.getUserById(jwtPayload.data._id);
        req.user = user;
        return done(null, user);
    }
    catch (error) {
        return done(error);
    };
};

const strategyOptions: StrategyOptions = {
    secretOrKey: process.env.JWT_STRATEGY_SECRET,
    jwtFromRequest: (req: Request): string | null => req && req.cookies ? req.cookies["jwt"] : null,
    passReqToCallback: true
};

export const JWTStrategy: Strategy = new passportJWT.Strategy(strategyOptions, verifyCallback);