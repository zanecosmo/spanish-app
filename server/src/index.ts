import express, {Express} from "express";
import { database } from "./sql/database/database";
import { enableAuthRoutes } from "./routes/auth-router";
import dotenv from "dotenv";
import { verifyToken } from "./middleware/verify-token";
import { enableAdminRoutes } from "./routes/word-admin-router";
import cors from "cors";
import { enableUserRouter } from "./routes/user-router";
import { nextTick } from "process";
import { Cases, Gender, GrammaticalNumber, PartsOfSpeech, Roles, Word, WordPair } from "./types";
// import { verb } from "./test-verb";

dotenv.config();
if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("JWT ACCESS TOKEN SECRET MUST BE DEFINED");

const corsOptions = {
    origin: "http://localhost:5000",
    optionsSuccessStatus: 200,
    credentials: true
};

const run = async () => {
    const app: Express = express(); // generate express app
    
    await database.connect(); // to create a database pool for queries

    app.use(cors(corsOptions));

    app.use(express.json()); // to parse request body

    // app.use("/", express.static(`../client/build`)); // serve static files
    
    // app.use("/", express.static(`./public`)); // serve static files

    enableAuthRoutes(app, database); // enable auth router for login/registration and jwt
    
    app.use(verifyToken); // all internal routes must be authenticated with jwt

    enableUserRouter(app, database); // neable generic user router for CRUD operations
    
    enableAdminRoutes(app, database); // enable admin router for CRUD word operations

    app.listen(8000, async (): Promise<void> => {
        console.log("YOUR SERVER IS RUNNING ON 8000, YOU'D BETTER GO CATCH IT");

        const testUser = {
            id: 90,
            username: "wart",
            role: Roles.ADMIN
        };

        const word: Word = {
            id: undefined,
            group: null,
            wordPairs: [
                {
                    id: undefined,
                    english: "in/on",
                    spanish: "en",
                    parentId: undefined,
                    partOfSpeech: PartsOfSpeech.PREPOSITION,
                    infinitive: false,
                    person: null,
                    number: null,
                    gender: null,
                    case: null
                }
            ]
        };

        // const payload = await database.insertWord(word);

        // console.log(payload);
    });
};

run();