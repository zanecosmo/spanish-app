import sql, { ConnectionPool, Transaction } from "mssql";

export const deleteWord = async (parentId: number, pool: ConnectionPool): Promise<void> => {
    const transaction: Transaction = await pool.transaction().begin();
    
    await transaction.request()
    .input("parent_id", sql.Int, parentId)
    .execute("delete_word");

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE: delete_word"));
};