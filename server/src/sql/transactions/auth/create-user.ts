import { User } from "../../../types";
import sql, { ConnectionPool, IProcedureResult, Transaction } from "mssql";

export const createUser = async (user: User, pool: ConnectionPool): Promise<User> => {
    const transaction: Transaction = await pool.transaction().begin();

    const userResult: IProcedureResult<User> = await transaction.request()
    .input("username", sql.NVarChar(20), user.username)
    .input("password", sql.NVarChar(100), user.password)
    .input("role", sql.NVarChar(20), user.role)
    .execute("create_user");

    const newUser: User = userResult.recordset[0];

    await transaction.commit()

    return newUser;
};