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
    username: ValidatedInput,
    password: ValidatedInput,
    responseMessage: string | null;
    attemptLogin: () => Promise<void>;
};

export interface CreateAccountFormSlice {
    username: ValidatedInput,
    password: ValidatedInput,
    responseMessage: string | null
    attemptCreateAccount: () => Promise<void>;
};

export interface AppSlice {
    wordList: Array<BaseWordPairDTO> | null;
    getBaseWordPairs: () => void;
    getWord: (wordId: number) => void;
    selectedWord: ExtendedWordDTO | null;
};

export interface Store {
    user: UserWithoutPassword | null;
    loginForm: LoginFormSlice;
    createAccountForm: CreateAccountFormSlice;
    clearForm: () => void;
    attemptLogout: () => Promise<void>;
    app: AppSlice;
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