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
};

export interface CreateAccountFormSlice {
    username: string,
    setUsername: (username: string) => void;
    usernameValidationMessage: string | null;
    password: string,
    setPassword: (password: string) => void;
    passwordValidationMessage: string | null;
    responseMessage: string | null;
};

export interface VerbFormState {
    infinitive: string;
    firstPerson: {
        singular: string;
        plural: string;
    };
    secondPerson: {
        singular: string;
        plural: string;
    };
    thirdPerson: {
        singular: string;
        plural: string;
    };
};

export interface VerbFormStateSetters {
    infinitive: (val: string) => void;
    firstPerson: {
    singular: (val: string) => void;
    plural: (val: string) => void;
    };
    secondPerson: {
    singular: (val: string) => void;
    plural: (val: string) => void;
    };
    thirdPerson: {
    singular: (val: string) => void;
    plural: (val: string) => void;
    };
};

export interface VerbFormStateAndSetters {
    state: VerbFormState;
    set: VerbFormStateSetters;
    resetForm: () => void;
    convertToForm: () => void
}

export interface VerbFormSlice {
    english: VerbFormStateAndSetters;
    spanish: VerbFormStateAndSetters;
    // convertToWord: (formState: VerbFormState) => ExtendedWordDTO;
};

export interface HomeSlice {
    wordList: Array<BaseWordPairDTO> | null;
    actions: {
        isEditing: boolean,
        setIsEditing: (bool:boolean) => void;
        isAdding: boolean,
        setIsAdding: (bool:boolean) => void;
        isDeleting: boolean,
        setIsDeleting: (bool:boolean) => void;
        isEditingGroup: boolean,
        setIsEditingGroup: (bool:boolean) => void;
    },
    isWordSelected: boolean;
    setIsWordSelected: (bool: boolean) => void;
    partOfSpeech: PartsOfSpeech | null;
    setPartOfSpeech: (partOfSpeech: PartsOfSpeech) => void;
    AddNewWord: () => void;
    groups: Array<string>;
    attemptUpdateGroup: (value: string) => void;
    getWordsPayload: () => void;
    getWord: (wordId: number) => void;
    selectedWord: ExtendedWordDTO | null;
    nullifySelectedWord: () => void;
    forms: {
        verb: VerbFormSlice
    };
    isEnglish: boolean,
    setIsEnglish: (bool: boolean) => void
};

export interface GroupDTO {
    group: string;
    parentWordId: number;
};

export interface AuthSlice {
    user: UserWithoutPassword | null;
    setUser: (user: UserWithoutPassword) => void;
    attemptLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    attemptLoginWithJWT: () => Promise<void>;
    attemptCreateAccount: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    attemptLogout: () => Promise<void>;
};

export interface Store {
    auth: AuthSlice;
    loginForm: LoginFormSlice;
    createAccountForm: CreateAccountFormSlice;
    clearForm: () => void;
    home: HomeSlice;
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
    part_of_speech: PartsOfSpeech | null;
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
    word_pair_id: number | null;
    parent_word_id: number | null;
    english: string;
    spanish: string;
    part_of_speech: PartsOfSpeech | null;
    group: string | null;
    difficulty: number | null;
};

export interface NewWord {
    id: number | undefined;
    group: string | null;
    wordPairs: Array<NewWordPair>;
}

export interface NewWordPair extends GrammaticalInfo {
    english: string;
    spanish: string;
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