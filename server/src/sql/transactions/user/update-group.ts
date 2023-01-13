import { GroupDTO, UserDTO } from "../../../types";
import sql, { ConnectionPool, Transaction } from "mssql";

export const updateGroup = async (
    groupDTO: GroupDTO,
    user: UserDTO,
    pool: ConnectionPool
): Promise<void> => {
    const transaction: Transaction = await pool.transaction().begin();

    await transaction.request()
    .input("parent_word_id", sql.Int, groupDTO.parentWordId)
    .input("group", sql.NVarChar, groupDTO.group)
    .input("user_id", sql.Int, user.id)
    .execute("update_group");

    transaction.commit(err => err ? err : console.log("TRANSACTION COMPLETE"));
};
