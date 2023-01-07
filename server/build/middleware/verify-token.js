"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var utils_1 = require("../utils");
dotenv_1.default.config();
var verifyToken = function (req, res, next) {
    var cookie = req.headers.cookie;
    if (!cookie) {
        res.status(401).send({ success: false, message: "NO COOKIE NO ENTRY" });
        return;
    }
    ;
    var token = (0, utils_1.extractCookies)(cookie)["jwt"];
    if (!token) {
        res.status(401).send({ success: false, message: "NO JWT NO ENTRY" });
        return;
    }
    ;
    try {
        req.body.user = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(req.body.user);
    }
    catch (error) {
        res.status(401).send({ success: false, message: "JWT HAS BEEN TAMPERED WITH" });
        return;
    }
    ;
    console.log(token);
    next();
};
exports.verifyToken = verifyToken;
