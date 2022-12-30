import express, { NextFunction, Request, RequestHandler, Response, Router } from "express";
import { Database, Roles, User } from "../types";
// import { database } from "../sql/database/database";
import  bcrypt from "bcrypt";

const doesUsernameExist = async (username: string, database: Database): Promise<boolean> => {
    return await database.getUserByUsername(username) ? true : false;
};

interface TypedRequestBody<T> extends Request {
    body: T;
};

const registerNewUser = (database: Database): RequestHandler => {
    return async (req: TypedRequestBody<User>, res: Response): Promise<void> => {
        const { username, password } = req.body;
    
        if (await doesUsernameExist(username, database)) {
            res.status(500).send({ success: false, data: `Account already exists with username ${username}` });
            return;
        };
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log(hashedPassword.length);
    
        const user: User = {
            id: undefined,
            username: username,
            password: hashedPassword,
            role: Roles.USER
        };
    
        const newUser: User = await database.createUser(user);
    
        // do jwt log in stuff
    
        res.status(200).send({ success: true, data: null }); // successful registration
    };
};

const loginUser = (database: Database): RequestHandler => {
    return async (req: TypedRequestBody<User>, res: Response, next: NextFunction): Promise<void> => {
        // const { id, username, password, role } = req.body;

        const user = await database.getUserByUsername(req.body.username);

        if (!user) {
            res.status(404).send({ success: false, data: null }); // username does not exist in db
            return;
        };

        const passwordsDoMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordsDoMatch) {
            res.status(403).send({ success: false, data: null }); // username exists but password does not match
            return;
        };
        
        // do jwt log in stuff

        res.status(200).send({ success: true, data: /*jwt?*/ "JWT"}); // username exists and password matches
    };
};

export const authRouterWithDatabase = (database: Database): Router => {
    const router: Router = Router();

    router.post("/register", registerNewUser(database));
    router.post("/login", loginUser(database));

    return router;
};