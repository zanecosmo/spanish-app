import { IncomingMessage, Server, ServerResponse } from "http";
import { ConnectionPool, PreparedStatement, Transaction } from "mssql";

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
    difficulty: number | null;
    parentId: number | undefined;
};

export interface Word {
    id: number | undefined;
    notes: string | null;
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

export interface Database {
    connect: () => Promise<ConnectionPool>;
    insertWord: (word: Word) => Promise<number>;
    deleteWord: (parentId: number) => Promise<void>;
    updateWord: (word: Word) => Promise<number>;
    getUserById: (id: number) => Promise<any>
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