import express, { NextFunction, Request, RequestHandler, response, Response, Router } from "express";
import { Database, Roles, TypedRequestBody, User } from "../types";
// import { database } from "../sql/database/database";
import jwt from "jsonwebtoken";
import  bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const doesUsernameExist = async (username: string, database: Database): Promise<boolean> => {
    return await database.getUserByUsername(username) ? true : false;
};

const registerNewUser = (database: Database): RequestHandler => {
    return async (req: TypedRequestBody<User>, res: Response): Promise<void> => {
        const { username, password } = req.body;
    
        if (await doesUsernameExist(username, database)) {
            res.status(403).send({ success: false, message: `Account already exists with username "${username}"` });
            return;
        };
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const user: User = {
            id: undefined,
            username: username,
            password: hashedPassword,
            role: Roles.USER
        };
    
        const newUser: User = await database.createUser(user);
    
        const token = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET!);
    
        res.status(200).send({ success: true, accessToken: token });
    };
};

const loginUser = (database: Database): RequestHandler => {
    return async (req: TypedRequestBody<User>, res: Response): Promise<void> => {
        const { username, password } = req.body;

        console.log(`username: ${username}, password: ${password}`);

        const user = await database.getUserByUsername(username);

        if (!user) {
            res.status(403).send({ success: false, message: `There is no account with "${username}" username` });
            return;
        };

        const passwordsDoMatch = await bcrypt.compare(password, user.password);

        if (!passwordsDoMatch) {
            res.status(403).send({ success: false, message: "Incorrect password" });
            return;
        };
        
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);

        res.status(200).set("authorization", ).json({ success: true, accessToken: token });
    };
};

const logoutUser = (database: Database) => (req: TypedRequestBody<User>, res: Response) => {
    console.log("ATTEMPTING TO LOGOUT");
    return res.status(200).send({ success: true, data: "TEST SUCCESSFUL" });
};

// export const authRouter = {
//     attachDatabase: (database: Database): Router => {
//         const router: Router = Router();

//         router.post("/register", registerNewUser(database));
//         router.post("/login", loginUser(database));

//         return router;
//     }
// };
        


export const authRouterWithDatabase = (database: Database): Router => {
    const router: Router = Router();

    router.post("/create-account", registerNewUser(database));
    router.post("/login", loginUser(database));
    router.post("/logout", logoutUser(database));

    return router;
};