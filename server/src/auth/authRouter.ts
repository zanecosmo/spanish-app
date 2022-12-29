import express, { application, Request, Response, Router } from "express";
import { Roles } from "../types";

const authRouter: Router = express.Router();

authRouter.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;

    // get user by email, and if a user exists, check password
    // compare stored password and if good log in user. if bad, send response (bcrypt)

    res.status(200).send({ success: true, data: /*jwt?*/ "JWT"}); // username exists and password matches
    res.status(403).send({ success: false, data: null }); // username exists but password does not match
    res.status(404).send({ success: false, data: null }); // username does not exist in db
});

authRouter.post("/register", (req: Request, res: Response) => {
    const { username, password } = req.body;

    
    // see if that username already exists
    // if it does res.send error

    // else

    // create new user with username and password
    // salt and hash password (bcrypt + types)
    // add user to users table in db

    // log the user in
    // generate jwt (jsonwetokens)
    // res.send jwt

    res.status(200).send({ suuccess: true, data: null }); // successful registration
    res.status(403).send({ success: false, data: null }); // username already exists
});

export { authRouter };

// this router handles registration, logging in, and logging out routes
// its middleware handles authorization and authentication