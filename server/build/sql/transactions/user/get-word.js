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
exports.getWord = void 0;
const mssql_1 = __importDefault(require("mssql"));
const getWord = (wordId, user, pool) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield pool.transaction().begin();
    const getWordResult = yield transaction.request()
        .input("user_id", mssql_1.default.Int, user.id)
        .input("word_id", mssql_1.default.Int, wordId)
        .execute("get_word");
    const extendedWordDTO = {
        id: wordId,
        group: getWordResult.recordset[0].group,
        wordPairs: getWordResult.recordset
    };
    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE: get_word"));
    return extendedWordDTO;
});
exports.getWord = getWord;
