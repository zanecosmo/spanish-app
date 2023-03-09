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
exports.updateWord = void 0;
const mssql_1 = __importDefault(require("mssql"));
const updateWord = (word, pool) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield pool.transaction().begin();
    while (word.wordPairs.length > 0) {
        const wordPair = word.wordPairs.pop();
        if (!wordPair)
            break;
        console.log(wordPair);
        yield transaction.request()
            .input("english", mssql_1.default.NVarChar(50), wordPair.english)
            .input("spanish", mssql_1.default.NVarChar(50), wordPair.spanish)
            .input("word_pair_ID", mssql_1.default.Int, wordPair.word_pair_id)
            .execute("update_word_pair");
    }
    ;
    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE: update_word_pair"));
    return word.id;
});
exports.updateWord = updateWord;
