"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../utils");
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    if (req.body.user) {
        res.status(401).send({ success: false, message: "BODY ALREADY CONTAINS USER, JWT INVALID" });
        return;
    }
    ;
    const cookie = req.headers.cookie;
    // console.log(cookie);
    if (!cookie) {
        res.status(401).send({ success: false, message: "NO COOKIE" });
        return;
    }
    ;
    const token = (0, utils_1.extractCookies)(cookie)["jwt"];
    if (!token) {
        res.status(401).send({ success: false, message: "NO JWT NO ENTRY" });
        return;
    }
    ;
    try {
        req.body.user = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (error) {
        res.status(401).send({ success: false, message: "JWT HAS BEEN TAMPERED WITH" });
        return;
    }
    ;
    next();
};
exports.verifyToken = verifyToken;
