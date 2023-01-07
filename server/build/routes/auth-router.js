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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableAuthRoutes = void 0;
var express_1 = require("express");
var types_1 = require("../types");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var doesUsernameExist = function (username, database) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database.getUserByUsername(username)];
            case 1: return [2 /*return*/, (_a.sent()) ? true : false];
        }
    });
}); };
var registerNewUser = function (database) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, salt, hashedPassword, user, newUser, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, doesUsernameExist(username, database)];
                case 1:
                    if (_b.sent()) {
                        res.status(403).send({ success: false, message: "Account already exists with username \"".concat(username, "\"") });
                        return [2 /*return*/];
                    }
                    ;
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 2:
                    salt = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 3:
                    hashedPassword = _b.sent();
                    user = {
                        id: undefined,
                        username: username,
                        password: hashedPassword,
                        role: types_1.Roles.USER
                    };
                    return [4 /*yield*/, database.createUser(user)];
                case 4:
                    newUser = _b.sent();
                    token = jsonwebtoken_1.default.sign(newUser, process.env.ACCESS_TOKEN_SECRET);
                    res.status(200).send({ success: true, accessToken: token });
                    return [2 /*return*/];
            }
        });
    }); };
};
var loginUser = function (database) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, user, passwordsDoMatch, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, database.getUserByUsername(username)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(403).send({ success: false, message: "There is no account with \"".concat(username, "\" username") });
                        return [2 /*return*/];
                    }
                    ;
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    passwordsDoMatch = _b.sent();
                    if (!passwordsDoMatch) {
                        res.status(403).send({ success: false, message: "Incorrect password" });
                        return [2 /*return*/];
                    }
                    ;
                    token = jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET);
                    res
                        .status(200)
                        .cookie("jwt", token, { httpOnly: true })
                        .json({ success: true, accessToken: token });
                    return [2 /*return*/];
            }
        });
    }); };
};
var logoutUser = function (database) { return function (req, res) {
    console.log("ATTEMPTING TO LOGOUT");
    res.clearCookie("jwt");
    return res.status(200).send({ success: true, data: "TEST SUCCESSFUL" });
}; };
var enableAuthRoutes = function (app, database) {
    var router = (0, express_1.Router)();
    router.post("/create-account", registerNewUser(database));
    router.post("/login", loginUser(database));
    router.post("/logout", logoutUser(database));
    app.use(router);
};
exports.enableAuthRoutes = enableAuthRoutes;
