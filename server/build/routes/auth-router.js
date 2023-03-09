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
exports.enableAuthRoutes = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../utils");
dotenv_1.default.config();
const enableAuthRoutes = (app, database) => {
    const router = (0, express_1.Router)();
    router.use((req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password)
            return next();
        const usernameMessage = (0, utils_1.validateInput)(username, "username");
        const passwordMessage = (0, utils_1.validateInput)(password, "password");
        if (usernameMessage) {
            res.status(400).send((0, utils_1.buildResponseBody)(null, "NONE", usernameMessage));
            return;
        }
        ;
        if (passwordMessage) {
            res.status(400).send((0, utils_1.buildResponseBody)(null, "NONE", passwordMessage));
            return;
        }
        ;
        next();
    });
    router.post("/create-account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password, role } = req.body;
            if (role !== types_1.Roles.USER) {
                res.status(401).send((0, utils_1.buildResponseBody)(null, "NONE", "Cannot create admin account without permission"));
                return;
            }
            ;
            if (yield database.getUserByUsername(username)) {
                res.status(403).send((0, utils_1.buildResponseBody)(null, "NONE", `Account already exists with username "${username}"`));
                return;
            }
            ;
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const user = yield database.createUser({
                id: undefined,
                username: username,
                password: hashedPassword,
                role: types_1.Roles.USER
            });
            const token = jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res
                .status(200)
                .cookie("jwt", token, { httpOnly: false, expires: new Date(Date.now() + 600000) })
                .send((0, utils_1.buildResponseBody)(user));
        }
        catch (error) {
            const { name, message } = (0, utils_1.DestructureError)(error);
            res.status(500).send((0, utils_1.buildResponseBody)(null, name, message));
        }
        ;
    }));
    router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield database.getUserByUsername(username);
            if (!user) {
                res.status(403).send((0, utils_1.buildResponseBody)(null, "NONE", `There is no account with "${username}" username`));
                return;
            }
            ;
            const passwordsDoMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordsDoMatch) {
                res.status(403).send((0, utils_1.buildResponseBody)(null, "NONE", "Incorrect password"));
                return;
            }
            ;
            const token = jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET);
            const responseUser = {
                username: user.username,
                role: user.role,
                id: user.id
            };
            res
                .status(200)
                .cookie("jwt", token, { httpOnly: false, expires: new Date(Date.now() + 600000) })
                .send((0, utils_1.buildResponseBody)(responseUser));
        }
        catch (error) {
            const { name, message } = (0, utils_1.DestructureError)(error);
            res.status(500).send((0, utils_1.buildResponseBody)(null, name, message));
        }
        ;
    }));
    router.get("/login-with-jwt", (req, res) => {
        if (req.body.user) {
            res.status(401).send((0, utils_1.buildResponseBody)(null, "NONE", "BODY ALREADY CONTAINS USER, JWT INVALID"));
            return;
        }
        ;
        const cookie = req.headers.cookie;
        console.log(cookie);
        if (!cookie) {
            res.status(401).send((0, utils_1.buildResponseBody)(null, "NONE", "NO COOKIE"));
            return;
        }
        ;
        const token = (0, utils_1.extractCookies)(cookie)["jwt"];
        if (!token) {
            res.status(401).send((0, utils_1.buildResponseBody)(null, "NONE", "NO JWT NO ENTRY"));
            return;
        }
        ;
        try {
            const user = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            res
                .status(200)
                .cookie("jwt", token, { httpOnly: false, expires: new Date(Date.now() + 600000) })
                .send((0, utils_1.buildResponseBody)(user));
        }
        catch (error) {
            res.status(401).send((0, utils_1.buildResponseBody)(null, "NONE", "JWT HAS BEEN TAMPERED WITH"));
            return;
        }
        ;
    });
    router.post("/logout", (_req, res) => {
        res.clearCookie("jwt");
        res.status(200).send((0, utils_1.buildResponseBody)(null, "NONE", "LOGOUT SUCCESSFUL"));
    });
    app.use(router);
};
exports.enableAuthRoutes = enableAuthRoutes;
