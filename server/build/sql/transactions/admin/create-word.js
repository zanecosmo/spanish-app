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
exports.insertWord = void 0;
const mssql_1 = __importDefault(require("mssql"));
const insertWord = (word, pool) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield pool.transaction().begin();
    const createBaseWord = yield transaction.request()
        .execute("create_base_word");
    const parentId = createBaseWord.returnValue;
    while (word.wordPairs.length > 0) {
        const wordPair = word.wordPairs.pop();
        if (!wordPair)
            break;
        yield transaction.request()
            .input("english", mssql_1.default.NVarChar(50), wordPair.english)
            .input("spanish", mssql_1.default.NVarChar(50), wordPair.spanish)
            .input("parent_Id", mssql_1.default.Int, parentId)
            .input("part_of_speech", mssql_1.default.NVarChar(20), wordPair.part_of_speech)
            .input("infinitive", mssql_1.default.Bit, wordPair.infinitive)
            .input("person", mssql_1.default.Int, wordPair.person)
            .input("number", mssql_1.default.NVarChar(20) || null, wordPair.number)
            .input("gender", mssql_1.default.NVarChar(20), wordPair.gender)
            .input("case", mssql_1.default.NVarChar(20), wordPair.case)
            .execute("build_pairs");
    }
    ;
    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE: create_base_word + build_pairs"));
    return parentId;
});
exports.insertWord = insertWord;
