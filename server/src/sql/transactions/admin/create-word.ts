import { Word } from "../../../types";
import sql, { ConnectionPool, IProcedureResult, Transaction } from "mssql";

export const insertWord = async (word: Word, pool: ConnectionPool): Promise<number> => {
    const transaction: Transaction = await pool.transaction().begin();

    const createBaseWord: IProcedureResult<any> = await transaction.request()
    .execute("create_base_word");

    const parentId: number = createBaseWord.returnValue;

    while (word.wordPairs.length > 0) {
        const wordPair = word.wordPairs.pop();
        if (!wordPair) break;
        await transaction.request()
        .input("english", sql.NVarChar(50), wordPair.english)
        .input("spanish", sql.NVarChar(50), wordPair.spanish)
        .input("parent_Id", sql.Int, parentId)
        .input("part_of_speech", sql.NVarChar(20), wordPair.part_of_speech)
        .input("infinitive", sql.Bit, wordPair.infinitive)
        .input("person", sql.Int, wordPair.person)
        .input("number", sql.NVarChar(20) || null, wordPair.number)
        .input("gender", sql.NVarChar(20), wordPair.gender)
        .input("case", sql.NVarChar(20), wordPair.case)
        .execute("build_pairs");
    };

    transaction.commit(err => err ? console.log(err) : console.log("TRANSACTION COMPLETE: create_base_word + build_pairs"));

    return parentId;
};
