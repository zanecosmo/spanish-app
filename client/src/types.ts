import { FormEvent } from "react";

export enum Roles {
    ADMIN = "ADMIN",
    USER = "USER"
};

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

export interface ValidatedInput {
    value: string;
    update: (value: string) => void;
    validationMessage: string | null;
};

export type ZustandSet<T> = (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean | undefined
) => void

export type ZustandGet<T> = () => T;

export interface LoginFormSlice {
    username: string,
    setUsername: (username: string) => void;
    usernameValidationMessage: string | null;
    password: string,
    setPassword: (password: string) => void;
    passwordValidationMessage: string | null;
    responseMessage: string | null;
    attemptLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export interface CreateAccountFormSlice {
    username: string,
    setUsername: (username: string) => void;
    usernameValidationMessage: string | null;
    password: string,
    setPassword: (password: string) => void;
    passwordValidationMessage: string | null;
    responseMessage: string | null;
    attemptCreateAccount: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export interface HomeSlice {
    wordList: Array<BaseWordPairDTO> | null;
    groups: Array<string>;
    attemptUpdateGroup: (value: string) => void;
    getWordsPayload: () => void;
    getWord: (wordId: number) => void;
    selectedWord: ExtendedWordDTO | null;
    nullifySelectedWord: () => void;
};

export interface GroupDTO {
    group: string;
    parentWordId: number;
};

export interface Store {
    user: UserWithoutPassword | null;
    setUser: (user: UserWithoutPassword) => void;
    loginForm: LoginFormSlice;
    createAccountForm: CreateAccountFormSlice;
    clearForm: () => void;
    attemptLogout: () => Promise<void>;
    home: HomeSlice;
    attemptLoginWithJWT: () => Promise<void>;
    // testGetWord: () => Promise<void>
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

export interface GrammaticalInfo {
    partOfSpeech: PartsOfSpeech;
    infinitive: boolean;
    person: number | null;
    number: string | null;
    gender: string | null;
    case: string | null;
};

export interface WordsPayload {
    wordList: Array<BaseWordPairDTO>;
    groups: Array<string>;
};

export interface ExtendedWordPairDTO extends GrammaticalInfo {
    word_pair_id: number;
    parent_word_id: number;
    english: string;
    spanish: string;
    part_of_speech: PartsOfSpeech;
    group: string | null;
    difficulty: number | null;
};

export interface ExtendedWordDTO {
    id: number | undefined;
    group: string | null;
    wordPairs: Array<ExtendedWordPairDTO>;
};

export interface BaseWordPairDTO {
    word_pair_id: number;
    parent_word_id: number;
    english: string;
    spanish: string;
    part_of_Speech: PartsOfSpeech;
    group: string | null;
    difficulty: number | null;
};

export enum GrammaticalNumber {
    SINGULAR = "singular",
    PLURAL = "plural"
};

export interface ResponseBody<T> {
    error: string | null;
    message: string | null;
    data: T | null;
};