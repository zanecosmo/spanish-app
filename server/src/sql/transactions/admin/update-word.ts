import sql, { ConnectionPool, Transaction } from "mssql";
import { ExtendedWordDTO, ExtendedWordPairDTO, Word, WordPair } from "../../../types";

export const updateWord = async (word: ExtendedWordDTO, pool: ConnectionPool): Promise<number> => {
    const transaction: Transaction = await pool.transaction().begin();

    while (word.wordPairs.length > 0) {
        const wordPair: ExtendedWordPairDTO | undefined = word.wordPairs.pop();
        if (!wordPair) break;
        console.log(wordPair)
        await transaction.request()
        .input("english", sql.NVarChar(50), wordPair.english)
        .input("spanish", sql.NVarChar(50), wordPair.spanish)
        .input("word_pair_ID", sql.Int, wordPair.word_pair_id)
        .execute("update_word_pair");
    };

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE: update_word_pair"));

    return word.id!;
};