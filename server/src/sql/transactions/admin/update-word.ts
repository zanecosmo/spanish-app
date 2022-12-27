import sql, { ConnectionPool, Transaction } from "mssql";
import { Word } from "../../../types";

export const updateWord = async (word: Word, pool: ConnectionPool): Promise<number> => {
    const transaction: Transaction = await pool.transaction().begin();

    while (word.wordPairs.length > 0) {
        const wordPair = word.wordPairs.pop();
        if (!wordPair) break;
        await transaction.request()
        .input("english", sql.NVarChar(50), wordPair.english)
        .input("spanish", sql.NVarChar(50), wordPair.spanish)
        .input("word_pair_ID", sql.Int, wordPair.id)
        .execute("update_word_pair");
    };

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE"));

    return word.id!;
};