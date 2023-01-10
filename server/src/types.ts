import { Request } from "express";
import { PreparedStatement, Transaction } from "mssql";

export interface GrammaticalInfo {
    partOfSpeech: PartsOfSpeech;
    infinitive: boolean;
    person: number | null;
    number: string | null;
    gender: string | null;
    case: string | null;
};

export interface WordPair extends GrammaticalInfo {
    id: number | undefined;
    spanish: string;
    english: string;
    parentId: number | undefined;
};

export interface Word {
    id: number | undefined;
    group: string | null;
    wordPairs: Array<WordPair>;
};

export type U<T> = T | undefined;

export interface IdResult { id: number };

export interface User {
    id: number | undefined;
    username: string;
    password: string;
    role: Roles;
};

export interface UserWithoutPassword {
    id: number | undefined;
    username: string;
    role: Roles;
};

export interface BaseWordPairDTO {
    id: number;
    parentId: number;
    english: string;
    spanish: string;
    partOfSpeech: PartsOfSpeech;
    group: string | null;
    difficulty: number | null;
};

export interface ExtendedWordPairDTO extends GrammaticalInfo {
    id: number;
    parentId: number;
    english: string;
    spanish: string;
    partOfSpeech: PartsOfSpeech;
    group: string | null;
    difficulty: number | null;
};

export interface ExtendedWordDTO {
    id: number | undefined;
    group: string | null;
    wordPairs: Array<ExtendedWordPairDTO>;
};

export interface Database {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    isConnected: () => boolean;
    insertWord: (word: Word) => Promise<number>;
    deleteWord: (parentId: number) => Promise<void>;
    updateWord: (word: Word) => Promise<number>;
    getUserById: (id: number) => Promise<U<User>>;
    getUserByUsername: (username: string) => Promise<U<User>>;
    createUser: (user: User) => Promise<User>;
    getBaseWordPairs: (user: UserWithoutPassword) => Promise<Array<BaseWordPairDTO>>;
    getWord: (wordId: number, user: UserWithoutPassword) => Promise<ExtendedWordDTO>;
};

export interface CookieObject {
    [key: string]: any;
};

export interface TypedRequestBody<T> extends Request {
    body: T;
};

export interface SqlOperation<T> {
    transaction: Transaction;
    preparedStatement: PreparedStatement;
    result: T | undefined;
    word: Word;
};

export enum Roles {
    ADMIN = "ADMIN",
    USER = "USER"
};

export enum PartsOfSpeech {
    VERB = "VERB",
    PRONOUN = "PRONOUN",
    ADJECTIVE = "ADJECTIVE",
    ADVERB = "ADVERB",
    CONJUNCTION = "CONJUNCTION",
    NOUN = "NOUN",
    PREPOSITION = "PREPOSITION"
};

export enum GrammaticalNumber {
    SINGULAR = "singular",
    PLURAL = "plural"
};

export interface WordsToStudy<T> {
    words: {
        [key: string]: Array<T>;
    };
};