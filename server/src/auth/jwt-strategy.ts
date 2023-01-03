import { Request } from "express";
import { database } from "../sql/database/database";
import passportJWT, { Strategy, StrategyOptions, VerifiedCallback, VerifyCallbackWithRequest } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const verifyCallback: VerifyCallbackWithRequest = async (req: Request, jwtPayload: any, done: VerifiedCallback) => {
    try {
        const user = await database.getUserById(jwtPayload.id);
        req.user = user;
        return done(null, user);
    }
    catch (error) {
        return done(error);
    };
};

const strategyOptions: StrategyOptions = {
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true
};

export const JWTStrategy: Strategy = new passportJWT.Strategy(strategyOptions, verifyCallback);