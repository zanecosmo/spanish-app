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
exports.updateGroup = void 0;
const mssql_1 = __importDefault(require("mssql"));
const updateGroup = (groupDTO, user, pool) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield pool.transaction().begin();
    // const updateGroupResult: IProcedureResult<any> = 
    yield transaction.request()
        .input("parent_word_id", mssql_1.default.Int, groupDTO.parentWordId)
        .input("group", mssql_1.default.NVarChar, groupDTO.group === "None" ? null : groupDTO.group)
        .input("user_id", mssql_1.default.Int, user.id)
        .execute("update_group");
    const getGroupsByUserResult = yield transaction.request()
        .input("user_id", mssql_1.default.Int, user.id)
        .execute("get_groups_by_user");
    const groups = getGroupsByUserResult.recordset;
    const groupArray = [];
    for (const group in groups)
        groupArray.push(groups[group].group);
    transaction.commit(err => err ? err : console.log("TRANSACTION COMPLETE: update_group"));
    return groupArray;
});
exports.updateGroup = updateGroup;
