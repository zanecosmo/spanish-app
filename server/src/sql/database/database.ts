import { Database, U, User, Word } from "../../types";
import { insertWord } from "../transactions/admin/insert-word";
import { deleteWord } from "../transactions/admin/delete-word";
import { databaseConfig } from "./database-config";
import sql, { ConnectionPool, Transaction } from "mssql";
import { updateWord } from "../transactions/admin/update-word";
import { getUserById } from "../transactions/auth/get-user-by-id";
import { getUserByUsername } from "../transactions/auth/get-user-by-username";
import { createUser } from "../transactions/auth/create-user";

let pool: ConnectionPool;

export const database: Database = {
    connect: async (): Promise<boolean> => {
        if (!pool || pool.connected === false) {
            pool = await sql.connect(databaseConfig);
            console.log(pool.connected);
            return true;
        };
        return false;
    },
    disconnect: async (): Promise<boolean> => {
        if (pool.connected === false) return false;
        await pool.close();
        return true;
    },
    isConnected: (): boolean => pool ? true : false,
    insertWord: async (word: Word): Promise<number> => await insertWord(word, pool),
    deleteWord: async (parentId: number): Promise<void> =>  await deleteWord(parentId, pool),
    updateWord: async (word: Word): Promise<number> => await updateWord(word, pool),
    getUserById: async (id: number): Promise<U<User>> => await getUserById(id, pool),
    getUserByUsername: async (username: string): Promise<U<User>> => await getUserByUsername(username, pool),
    createUser: async (user: User): Promise<User> => await createUser(user, pool),
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
