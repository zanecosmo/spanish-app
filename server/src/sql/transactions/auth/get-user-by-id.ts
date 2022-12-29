import { Word } from "../../../types";
import sql, { ConnectionPool, IProcedureResult, Transaction } from "mssql";

export const getUserById = async (id: number, pool: ConnectionPool): Promise<void> => {
    const transaction: Transaction = await pool.transaction().begin();

    const user: IProcedureResult<any> = await transaction.request()
    .input("id", sql.Int, id)
    .execute("get_user_by_id");

    console.log(user);

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE"));
};