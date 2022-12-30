import { U, User } from "../../../types";
import sql, { ConnectionPool, IProcedureResult, Transaction } from "mssql";

export const getUserByUsername = async (username: string, pool: ConnectionPool): Promise<U<User>> => {
    const transaction: Transaction = await pool.transaction().begin();

    const userResult: IProcedureResult<User> = await transaction.request()
    .input("username", sql.NVarChar(20), username)
    .execute("get_user_by_username");

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE"));
    console.log(userResult.recordsets)

    return userResult.recordset[0];
};