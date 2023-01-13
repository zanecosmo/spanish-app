import sql, { ConnectionPool, IProcedureResult, Transaction } from "mssql";
import { BaseWordPairDTO, UserDTO } from "../../../types";

export const getBaseWordPairs = async (
    user: UserDTO,
    pool: ConnectionPool
): Promise<Array<BaseWordPairDTO>> => {
    const transaction: Transaction = await pool.transaction().begin();

    const getBaseWordsResult: IProcedureResult<any> = await transaction.request()
    .input("user_id", sql.Int, user.id)
    .execute("get_base_word_pairs");

    // something like that. maybe recordset, or some other value
    const baseWordPairs: Array<BaseWordPairDTO> = getBaseWordsResult.recordset;

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE"));

    return baseWordPairs;
};