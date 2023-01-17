import { GroupDTO, UserDTO } from "../../../types";
import sql, { ConnectionPool, IProcedureResult, Transaction } from "mssql";

export const updateGroup = async (
    groupDTO: GroupDTO,
    user: UserDTO,
    pool: ConnectionPool
): Promise<Array<string>> => {
    const transaction: Transaction = await pool.transaction().begin();

    // const updateGroupResult: IProcedureResult<any> = 

    await transaction.request()
    .input("parent_word_id", sql.Int, groupDTO.parentWordId)
    .input("group", sql.NVarChar, groupDTO.group === "None" ? null : groupDTO.group)
    .input("user_id", sql.Int, user.id)
    .execute("update_group");

    const getGroupsByUserResult: IProcedureResult<any> = await transaction.request()
    .input("user_id", sql.Int, user.id)
    .execute("get_groups_by_user");
    
    const groups = getGroupsByUserResult.recordset;

    const groupArray: Array<string> = [];

    for (const group in groups) groupArray.push(groups[group].group);
    
    transaction.commit(err => err ? err : console.log("TRANSACTION COMPLETE: update_group"));
    
    return groupArray;
};