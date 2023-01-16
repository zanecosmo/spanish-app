import { ExtendedWordDTO, ExtendedWordPairDTO, UserDTO } from "../../../types";
import sql, { ConnectionPool, IProcedureResult, Transaction } from "mssql";

export const getWord = async (
    wordId: number,
    user: UserDTO,
    pool: ConnectionPool
): Promise<ExtendedWordDTO> => {
    const transaction: Transaction = await pool.transaction().begin();
    
    const getWordResult: IProcedureResult<ExtendedWordPairDTO> = await transaction.request()
    .input("user_id", sql.Int, user.id)
    .input("word_id", sql.Int, wordId)
    .execute("get_word");

    const extendedWordDTO: ExtendedWordDTO = {
        id: wordId,
        group: getWordResult.recordset[0].group,
        wordPairs: getWordResult.recordset
    };

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE: get_word"));

    return extendedWordDTO;
};