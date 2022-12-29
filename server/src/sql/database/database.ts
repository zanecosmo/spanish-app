import { Database, Word } from "../../types";
import { insertWord } from "../transactions/admin/insert-word";
import { deleteWord } from "../transactions/admin/delete-word";
import { databaseConfig } from "./database-config";
import sql, { ConnectionPool, Transaction } from "mssql";
import { updateWord } from "../transactions/admin/update-word";
import { getUserById } from "../transactions/auth/get-user-by-id";

let pool: ConnectionPool;

export const database: Database = {
    connect: async (): Promise<ConnectionPool> => pool = await sql.connect(databaseConfig),
    insertWord: async (word: Word): Promise<number> => await insertWord(word, pool),
    deleteWord: async (parentId: number): Promise<void> =>  await deleteWord(parentId, pool),
    updateWord: async (word: Word): Promise<number> => await updateWord(word, pool),
    getUserById: async (id: number): Promise<any> => await getUserById(id, pool),
};

// export const database = async () => {
//     const pool = await sql.connect(databaseConfig);

//     return {
//         insertWord: async (word: Word): Promise<number> => await insertWord(word, pool),
//         deleteWord: async (parentId: number): Promise<void> =>  await deleteWord(parentId, pool),
//         updateWord: async (word: Word): Promise<number> => await updateWord(word, pool),
//         getUserById: async (id: number): Promise<any> => await getUserById(id, pool)
//     };
// };
