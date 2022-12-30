import express, {Express, Request, Response} from "express";
import { verb } from "./test-verb";
import { database } from "./sql/database/database";
import passport from "passport";
import { JWTStrategy } from "./auth/jwt-strategy";
import { Roles, U, User } from "./types";
import { authRouterWithDatabase } from "./auth/authRouter";

const run = async () => {
    // application setup
    const app: Express = express();
    await database.connect();

    // setup auth middleware
    passport.use(JWTStrategy);

    // use middlewares
    app.use(express.json());

    app.use(authRouterWithDatabase(database)); // attach database to auth router

    app.use(passport.authenticate("jwt", { session: false }));


    app.post("/add-word", async (req: Request, res: Response): Promise<void> => {
        try {
            const parentId = await database.insertWord(req.body);
            res.status(200).send({ parentId: parentId });
        }
        catch (error) {
            res.status(500).send({ error: error });
        };
    });

    app.get("/test-get-word", async (req: Request, res: Response): Promise<void> => {
        // req should have the type of word in the 
        console.log(req.body);
        res.send({ butt: "GET" });
    });

    app.get("/test-get-all", async (req: Request, res: Response): Promise<void> => {
        console.log(req.body);
        // 
        res.send({ butt: "GET ALL" });
    });

    app.put("/update-word", async (req: Request, res: Response): Promise<void> => {
        try {
            const parentWordId = await database.updateWord(req.body);
            res.status(200).send({ parentWordId: parentWordId });
        }
        catch (error) {
            res.status(500).send({ error: error });
        };
    });

    app.delete("/delete-word", async (req: Request, res: Response): Promise<void> => {
        try {
            await database.deleteWord(req.body);
            res.status(204);
        }
        catch (error) {
            res.status(500).send({ error: error });
        };
    });

    app.listen(8000, async (): Promise<void> => {
        console.log("YOUR SERVER IS RUNNING ON 8000, YOU'D BETTER GO CATCH IT");
        
        const nonExistantUser: U<User> = await database.getUserById(2);
        console.log(`1. ${nonExistantUser}`);

        const extantUser: U<User> = await database.getUserById(1);
        console.log(`2. ${extantUser}`);

        const userConfig: User = {
            id: undefined,
            username: "bobby",
            password: "peepee",
            role: Roles.USER
        };

        const newUser: User = await database.createUser(userConfig);
        console.log(`3. ${newUser.id}`);

        if (!newUser.id) {
            console.log("USER HAS NO ID FOR SOME REASON");
            return;
        };

        const userTest: U<User> = await database.getUserById(newUser.id);
        console.log(`4. ${userTest}`);
    });
};

run();