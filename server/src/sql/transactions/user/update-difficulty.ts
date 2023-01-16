import { DifficultyDTO, UserDTO } from "../../../types";
import sql, { ConnectionPool, Transaction } from "mssql";

export const updateDifficulties = async (
    difficultyDTOs: Array<DifficultyDTO>,
    user: UserDTO,
    pool: ConnectionPool
): Promise<void> => {
    const transaction: Transaction = await pool.transaction().begin();

    while (difficultyDTOs.length > 0) {
        const difficulty: DifficultyDTO | undefined = difficultyDTOs.pop();
        if (!difficulty) break;
        await transaction.request()
        .input("word_pair_id", sql.Int, difficulty.wordPairId)
        .input("difficulty", sql.Int, difficulty.difficulty)
        .input("user_id", sql.Int, user.id)
        .execute("update_or_create_difficulty");
    };

    transaction.commit(err => err ? err : console.log("TRANSACTION COMPLETE: update_or_create_difficulty"));
};

