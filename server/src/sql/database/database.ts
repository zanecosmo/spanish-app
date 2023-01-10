import { BaseWordPairDTO, Database, ExtendedWordDTO, U, User, UserWithoutPassword, Word } from "../../types";
import { insertWord } from "../transactions/admin/create-word";
import { deleteWord } from "../transactions/admin/delete-word";
import { databaseConfig } from "./database-config";
import sql, { ConnectionPool } from "mssql";
import { updateWord } from "../transactions/admin/update-word";
import { getUserById } from "../transactions/auth/get-user-by-id";
import { getUserByUsername } from "../transactions/auth/get-user-by-username";
import { createUser } from "../transactions/auth/create-user";
import { getBaseWordPairs } from "../transactions/user/get-base-word-pairs";
import { getWord } from "../transactions/user/get-word";

let pool: ConnectionPool;

export const database: Database = {
    connect: async (): Promise<void> => {
        if (!pool || !pool.connected) {
            pool = await sql.connect(databaseConfig);
        };
    },
    disconnect: async (): Promise<void> => {
        if (!pool || !pool.connected) return;
        await pool.close();
    },
    isConnected: (): boolean => pool ? true : false,
    insertWord: async (word: Word): Promise<number> => await insertWord(word, pool),
    deleteWord: async (parentId: number): Promise<void> =>  await deleteWord(parentId, pool),
    updateWord: async (word: Word): Promise<number> => await updateWord(word, pool),
    getUserById: async (id: number): Promise<U<User>> => await getUserById(id, pool),
    getUserByUsername: async (username: string): Promise<U<User>> => await getUserByUsername(username, pool),
    createUser: async (user: User): Promise<User> => await createUser(user, pool),
    getBaseWordPairs: async (user: UserWithoutPassword): Promise<Array<BaseWordPairDTO>> => {
        return await getBaseWordPairs(user, pool);
    },
    getWord: async (wordId: number, user: UserWithoutPassword): Promise<ExtendedWordDTO> => {
        return await getWord(wordId, user, pool);
    }
};
