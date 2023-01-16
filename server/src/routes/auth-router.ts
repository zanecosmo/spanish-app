import { Express, Response, Router } from "express";
import { Database, UserDTO, Roles, TypedRequestBody, User } from "../types";
import jwt from "jsonwebtoken";
import  bcrypt from "bcrypt";
import dotenv from "dotenv";
import { buildResponseBody, DestructureError, extractCookies, validateInput } from "../utils";

dotenv.config();

export const enableAuthRoutes = (app: Express, database: Database): void => {
    const router: Router = Router();

    router.use((req, res, next) => {
        const { username, password } = req.body;
        
        if (!username || !password) return next();

        const usernameMessage = validateInput(username, "username");
        const passwordMessage = validateInput(password, "password");

        if (usernameMessage) {
            res.status(400).send(buildResponseBody(null, "NONE", usernameMessage));
            return;
        };

        if (passwordMessage) {
            res.status(400).send(buildResponseBody(null, "NONE", passwordMessage));
            return;
        };

        next();
    });

    router.post("/create-account", async (req: TypedRequestBody<User>, res: Response): Promise<void> => {
        try {
            const { username, password, role } = req.body;

            if (role !== Roles.USER) {
                res.status(401).send(
                    buildResponseBody(null, "NONE", "Cannot create admin account without permission")
                );
                return;
            };
    
            if (await database.getUserByUsername(username)) {
                res.status(403).send(
                    buildResponseBody(null, "NONE", `Account already exists with username "${username}"`)
                );
                return;
            };
        
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
        
            const user: UserDTO = await database.createUser({
                id: undefined,
                username: username,
                password: hashedPassword,
                role: Roles.USER
            });
        
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
        
            res
            .status(200)
            .cookie("jwt", token, { httpOnly: false , expires: new Date(Date.now() + 600000) })
            .send(buildResponseBody(user));
        }
        catch (error) {
            const { name, message } = DestructureError(error);
            res.status(500).send(buildResponseBody(null, name, message));
        };
    });

    router.post("/login", async (req: TypedRequestBody<User>, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body;

            const user: User | undefined = await database.getUserByUsername(username);

            if (!user) {
                res.status(403).send(
                    buildResponseBody(null, "NONE", `There is no account with "${username}" username`)
                );
                return;
            };

            const passwordsDoMatch = await bcrypt.compare(password, user.password);

            if (!passwordsDoMatch) {
                res.status(403).send(buildResponseBody(null, "NONE", "Incorrect password"));
                return;
            };
            
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);

            const responseUser: UserDTO = {
                username: user.username,
                role: user.role,
                id: user.id
            };
            
            res
            .status(200)
            .cookie("jwt", token, { httpOnly: false , expires: new Date(Date.now() + 600000) })
            .send(buildResponseBody(responseUser));
        }
        catch (error) {
            const { name, message } = DestructureError(error);
            res.status(500).send(buildResponseBody(null, name, message));
        };
    });

    router.get("/login-with-jwt", (req, res) => {
        if (req.body.user) {
            res.status(401).send(buildResponseBody(null, "NONE", "BODY ALREADY CONTAINS USER, JWT INVALID"));
            return;
        };
    
        const cookie = req.headers.cookie;
        console.log(cookie);
    
        if (!cookie) {
            res.status(401).send(buildResponseBody(null, "NONE", "NO COOKIE"));
            return;
        };
        
        const token: string = extractCookies(cookie)["jwt"];
        
        if (!token) {
            res.status(401).send(buildResponseBody(null, "NONE", "NO JWT NO ENTRY"));
            return;
        };
        
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
            
            res
            .status(200)
            .cookie("jwt", token, { httpOnly: false , expires: new Date(Date.now() + 600000) })
            .send(buildResponseBody(user));
        }
        catch (error) {
            res.status(401).send(buildResponseBody(null, "NONE", "JWT HAS BEEN TAMPERED WITH"));
            return;
        };
    });

    router.post("/logout", (_req, res: Response): void => {
        res.clearCookie("jwt");
        res.status(200).send(buildResponseBody(null, "NONE", "LOGOUT SUCCESSFUL"))
    });

    app.use(router);
};