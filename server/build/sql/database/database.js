"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const create_word_1 = require("../transactions/admin/create-word");
const delete_word_1 = require("../transactions/admin/delete-word");
const database_config_1 = require("./database-config");
const mssql_1 = __importDefault(require("mssql"));
const update_word_1 = require("../transactions/admin/update-word");
const get_user_by_id_1 = require("../transactions/auth/get-user-by-id");
const get_user_by_username_1 = require("../transactions/auth/get-user-by-username");
const create_user_1 = require("../transactions/auth/create-user");
const get_base_word_pairs_1 = require("../transactions/user/get-base-word-pairs");
const get_word_1 = require("../transactions/user/get-word");
const update_difficulty_1 = require("../transactions/user/update-difficulty");
const update_group_1 = require("../transactions/user/update-group");
let pool;
exports.database = {
    connect: () => __awaiter(void 0, void 0, void 0, function* () {
        if (!pool || !pool.connected)
            pool = yield mssql_1.default.connect(database_config_1.databaseConfig);
    }),
    disconnect: () => __awaiter(void 0, void 0, void 0, function* () {
        if (!pool || !pool.connected)
            return;
        yield pool.close();
    }),
    isConnected: () => pool ? true : false,
    insertWord: (word) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, create_word_1.insertWord)(word, pool); }),
    deleteWord: (parentId) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, delete_word_1.deleteWord)(parentId, pool); }),
    updateWord: (word) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, update_word_1.updateWord)(word, pool); }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, get_user_by_id_1.getUserById)(id, pool); }),
    getUserByUsername: (username) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, get_user_by_username_1.getUserByUsername)(username, pool); }),
    createUser: (user) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, create_user_1.createUser)(user, pool); }),
    getBaseWordPairs: (user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, get_base_word_pairs_1.getBaseWordPairs)(user, pool);
    }),
    getWord: (wordId, user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, get_word_1.getWord)(wordId, user, pool);
    }),
    updateDifficulties: (difficultyDTOs, user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, update_difficulty_1.updateDifficulties)(difficultyDTOs, user, pool);
    }),
    updateGroup: (groupDTO, user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, update_group_1.updateGroup)(groupDTO, user, pool);
    })
};
