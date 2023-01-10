import { ExtendedWordDTO, ExtendedWordPairDTO, UserWithoutPassword, Word } from "../../../types";
import sql, { ConnectionPool, IProcedureResult, Transaction } from "mssql";

export const getWord = async (
    wordId: number,
    user: UserWithoutPassword,
    pool: ConnectionPool
): Promise<ExtendedWordDTO> => {
    console.log(user.id);
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

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE"));

    return extendedWordDTO;
};