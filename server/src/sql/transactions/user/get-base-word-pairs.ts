import sql, { ConnectionPool, IProcedureResult, IRecordSet, Transaction } from "mssql";
import { BaseWordPairDTO, UserDTO, WordsPayload } from "../../../types";

export const getBaseWordPairs = async (
    user: UserDTO,
    pool: ConnectionPool
): Promise<WordsPayload> => {
    const transaction: Transaction = await pool.transaction().begin();

    const getBaseWordsResult: IProcedureResult<any> = await transaction.request()
    .input("user_id", sql.Int, user.id)
    .execute("get_base_word_pairs");

    const baseWordPairs: Array<BaseWordPairDTO> = getBaseWordsResult.recordset;

    const getGroupsByUserResult: IProcedureResult<any> = await transaction.request()
    .input("user_id", sql.Int, user.id)
    .execute("get_groups_by_user");

    const groups: IRecordSet<{ group: string }> = getGroupsByUserResult.recordset;

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE: get_base_word_pairs"));
    
    const groupArray: Array<string> = [];

    for (const group in groups) groupArray.push(groups[group].group);
    
    const wordsPayload: WordsPayload = {
        wordList: baseWordPairs,
        groups: groupArray
    };

    return wordsPayload;
};