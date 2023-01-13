import { Express,RequestHandler, Response, Router } from "express";
import { Database, UserDTO, Roles, TypedRequestBody, User } from "../types";
import jwt from "jsonwebtoken";
import  bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const enableAuthRoutes = (app: Express, database: Database): void => {
    const router: Router = Router();

    router.post("/create-account", async (req: TypedRequestBody<User>, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body;
    
            if (await database.getUserByUsername(username)) {
                res.status(403).send({ success: false, message: `Account already exists with username "${username}"` });
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
            .cookie("jwt", token, { httpOnly: true })
            .send({ success: true, user: user });
        }
        catch (error) {
            res.status(500).send({ error: error });
        };
    });

    router.post("/login", async (req: TypedRequestBody<User>, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body;

            const user: User | undefined = await database.getUserByUsername(username);

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

            const responseUser: UserDTO = {
                username: user.username,
                role: user.role,
                id: user.id
            };
            
            res
            .status(200)
            .cookie("jwt", token, { httpOnly: false })
            .send({ success: true, user: responseUser });
        }
        catch (error) {
            res.status(500).send({ error: error });
        };
    });

    router.post("/logout", (_req, res: Response): void => {
        res.clearCookie("jwt");
        res.status(200).send({ success: true, data: "LOGOUT SUCCESSFUL" });
    });

    app.use(router);
};