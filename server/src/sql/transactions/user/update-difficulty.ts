
import { SqlOperation, Word } from "../../../types";
import sql, { Transaction } from "mssql";
import { databaseConfig } from "../../database/database-config";
import { logError } from "../../utils";

// if the difficulty exists, update it. if it doesn't create a new one
// takes in Array<WordPair>

const updateDifficulties = async (word: Word) => {
    const pool = await sql.connect(databaseConfig);

    const transaction = new Transaction(pool);
    const ps = new sql.PreparedStatement(transaction);

    const operation: SqlOperation<any> = {
        transaction: transaction,
        preparedStatement: ps,
        result: undefined,
        word: word
    };

    beginUpdateTransaction(operation);
};

const beginUpdateTransaction = (op: SqlOperation<any>) => {
    op.transaction.begin(undefined, (err) => checkForRows(err, op));
};

const checkForRows = (err: Error | undefined, op: SqlOperation<any>) => {
    logError(err);
    const statement = (
        `
        UPDATE word_pair_auxiliary_info
        SET difficulty = WordPair.difficulty
        WHERE word_pair_auxiliary_info.word_pair_id = @word_pair_id
        OUTPUT @@ROWCOUNT = 0
        BEGIN
        INSERT dbo.table(PK, ...) SELECT @PK, ...;
        END
        COMMIT TRANSACTION;
        `
    );

    op.preparedStatement.input("word_pair_id", sql.Int);
    op.preparedStatement.prepare(statement, (err) => executeStatement(err, op));
};

const executeStatement = (err: Error | undefined, op: SqlOperation<any>) => {
    logError(err);
    const parameters = { wordPairId: op.word.id }; // this will change
    op.preparedStatement.execute(parameters, (err, result) => unprepareStatement(err, result, op));
};

const unprepareStatement = (err: Error | undefined, result: sql.IProcedureResult<number> | undefined, op: SqlOperation<any>) => {
    logError(err);
    if (!result) return; // throw error
    if (result.recordset[0] === 0) {
        // const transaction = new Transaction(pool);
        // const ps = new sql.PreparedStatement(transaction);

        // const operation: SqlOperation<any> = {
        //     transaction: transaction,
        //     preparedStatement: ps,
        //     result: undefined,
        //     word: word
        // };
    }
    // op.preparedStatement.unprepare((err) => nextStatement(err, op));
};

// wordPair = array.pop()

