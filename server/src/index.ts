import express, {Express} from "express";
import { database } from "./sql/database/database";
import { enableAuthRoutes } from "./routes/auth-router";
import dotenv from "dotenv";
import { verifyToken } from "./middleware/verify-token";
import { enableCRUDRoutes } from "./routes/word-crud-router";
import cors from "cors";
import { BaseWordPairDTO, ExtendedWordDTO, Roles, UserWithoutPassword } from "./types";
// import { verb } from "./test-verb";

dotenv.config();
if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("JWT ACCESS TOKEN SECRET MUST BE DEFINED");

const run = async () => {
    const corsOptions = {
        origin: "http://localhost:5000",
        optionsSuccessStatus: 200
    };

    const app: Express = express(); // generate express app
    
    await database.connect(); // to create a database pool for queries

    app.use(cors(corsOptions));

    app.use(express.json()); // to parse request body

    // app.use("/", express.static(`../client/build`)); // serve static files
    
    app.use("/", express.static(`./public`)); // serve static files

    enableAuthRoutes(app, database); // enable auth router for login/registration and jwt
    
    app.use(verifyToken); // all internal routes must be authenticated with jwt
    
    enableCRUDRoutes(app, database); // enable admin router for CRUD word operations

    app.listen(8000, async (): Promise<void> => {
        console.log("YOUR SERVER IS RUNNING ON 8000, YOU'D BETTER GO CATCH IT");

        // const testUser: UserWithoutPassword = {
        //     id: 78,
        //     username: "fart",
        //     role: Roles.USER
        // };

        // const extendedWordDTO: ExtendedWordDTO = await database.getWord(11, testUser);

        // console.log(extendedWordDTO);
    });
};

run();