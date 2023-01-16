import { U, User } from "../../../types";
import sql, { ConnectionPool, IProcedureResult, Transaction } from "mssql";

export const getUserById = async (id: number, pool: ConnectionPool): Promise<U<User>> => {
    const transaction: Transaction = await pool.transaction().begin();

    const userResult: IProcedureResult<User> = await transaction.request()
    .input("id", sql.Int, id)
    .execute("get_user_by_id");

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE: get_user_by_id"));
    
    return userResult.recordset[0];
};