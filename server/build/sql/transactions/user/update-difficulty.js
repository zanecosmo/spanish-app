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
exports.updateDifficulties = void 0;
const mssql_1 = __importDefault(require("mssql"));
const updateDifficulties = (difficultyDTOs, user, pool) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield pool.transaction().begin();
    while (difficultyDTOs.length > 0) {
        const difficulty = difficultyDTOs.pop();
        if (!difficulty)
            break;
        yield transaction.request()
            .input("word_pair_id", mssql_1.default.Int, difficulty.wordPairId)
            .input("difficulty", mssql_1.default.Int, difficulty.difficulty)
            .input("user_id", mssql_1.default.Int, user.id)
            .execute("update_or_create_difficulty");
    }
    ;
    transaction.commit(err => err ? err : console.log("TRANSACTION COMPLETE: update_or_create_difficulty"));
});
exports.updateDifficulties = updateDifficulties;
