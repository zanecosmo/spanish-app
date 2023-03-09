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
exports.getUserByUsername = void 0;
const mssql_1 = __importDefault(require("mssql"));
const getUserByUsername = (username, pool) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield pool.transaction().begin();
    const userResult = yield transaction.request()
        .input("username", mssql_1.default.NVarChar(20), username)
        .execute("get_user_by_username");
    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE: get_user_by_username"));
    return userResult.recordset[0];
});
exports.getUserByUsername = getUserByUsername;
