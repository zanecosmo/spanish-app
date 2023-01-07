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
exports.database = void 0;
var insert_word_1 = require("../transactions/admin/insert-word");
var delete_word_1 = require("../transactions/admin/delete-word");
var database_config_1 = require("./database-config");
var mssql_1 = __importDefault(require("mssql"));
var update_word_1 = require("../transactions/admin/update-word");
var get_user_by_id_1 = require("../transactions/auth/get-user-by-id");
var get_user_by_username_1 = require("../transactions/auth/get-user-by-username");
var create_user_1 = require("../transactions/auth/create-user");
var pool;
exports.database = {
    connect: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(!pool || !pool.connected)) return [3 /*break*/, 2];
                    return [4 /*yield*/, mssql_1.default.connect(database_config_1.databaseConfig)];
                case 1:
                    pool = _a.sent();
                    _a.label = 2;
                case 2:
                    ;
                    return [2 /*return*/];
            }
        });
    }); },
    disconnect: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!pool || !pool.connected)
                        return [2 /*return*/];
                    return [4 /*yield*/, pool.close()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    isConnected: function () { return pool ? true : false; },
    insertWord: function (word) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, insert_word_1.insertWord)(word, pool)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); },
    deleteWord: function (parentId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, delete_word_1.deleteWord)(parentId, pool)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); },
    updateWord: function (word) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, update_word_1.updateWord)(word, pool)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); },
    getUserById: function (id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, get_user_by_id_1.getUserById)(id, pool)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); },
    getUserByUsername: function (username) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, get_user_by_username_1.getUserByUsername)(username, pool)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); },
    createUser: function (user) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, create_user_1.createUser)(user, pool)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); },
};
