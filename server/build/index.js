"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./sql/database/database");
const auth_router_1 = require("./routes/auth-router");
const dotenv_1 = __importDefault(require("dotenv"));
const verify_token_1 = require("./middleware/verify-token");
const word_admin_router_1 = require("./routes/word-admin-router");
const cors_1 = __importDefault(require("cors"));
const user_router_1 = require("./routes/user-router");
const types_1 = require("./types");
// import { verb } from "./test-verb";
dotenv_1.default.config();
if (!process.env.ACCESS_TOKEN_SECRET)
    throw new Error("JWT ACCESS TOKEN SECRET MUST BE DEFINED");
const corsOptions = {
    origin: "http://localhost:5000",
    optionsSuccessStatus: 200,
    credentials: true
};
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)(); // generate express app
    yield database_1.database.connect(); // to create a database pool for queries
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json()); // to parse request body
    // app.use("/", express.static(`../client/build`)); // serve static files
    // app.use("/", express.static(`./public`)); // serve static files
    (0, auth_router_1.enableAuthRoutes)(app, database_1.database); // enable auth router for login/registration and jwt
    app.use(verify_token_1.verifyToken); // all internal routes must be authenticated with jwt
    (0, user_router_1.enableUserRouter)(app, database_1.database); // neable generic user router for CRUD operations
    (0, word_admin_router_1.enableAdminRoutes)(app, database_1.database); // enable admin router for CRUD word operations
    app.listen(8000, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("YOUR SERVER IS RUNNING ON 8000, YOU'D BETTER GO CATCH IT");
        const testUser = {
            id: 90,
            username: "wart",
            role: types_1.Roles.ADMIN
        };
        const word = {
            id: undefined,
            group: null,
            wordPairs: [
                {
                    id: undefined,
                    english: "in/on",
                    spanish: "en",
                    parentId: undefined,
                    part_of_speech: types_1.PartsOfSpeech.PREPOSITION,
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
    }));
});
run();
