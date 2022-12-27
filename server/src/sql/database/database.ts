import { Database, Word } from "../../types";
import { insertWord } from "../transactions/admin/insert-word";
import { deleteWord } from "../transactions/admin/delete-word";
import { databaseConfig } from "./database-config";
import sql, { ConnectionPool } from "mssql";
import { updateWord } from "../transactions/admin/update-word";

const databaseNotConnected = (action: string): string => {
    return (`NotConnectedError: Cannot ${action} unless connected to database. Try using "await database.connect()".`);
};

let pool: ConnectionPool;

export const database: Database = {
    connect: async (): Promise<void> => {
        pool = await sql.connect(databaseConfig);
    },
    insertWord: async (word: Word): Promise<number> => {
        if (!pool) throw new Error(databaseNotConnected("INSERT WORD"));
        return await insertWord(word, pool);
    },
    deleteWord: async (parentId: number): Promise<void> => {
        if (!pool) throw new Error(databaseNotConnected("DELETE WORD"));
        return await deleteWord(parentId, pool);
    },
    updateWord: async (word: Word): Promise<number> => {
        if (!pool) throw new Error(databaseNotConnected("UPDATE WORD"));
        return await updateWord(word, pool);
    }
};

