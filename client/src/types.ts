import { Dispatch, FormEvent, SetStateAction } from "react";

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
    groups: Array<string>;
    setGroups: (group: string) => void;
    getWordsPayload: () => void;
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
    part_of_speech: PartsOfSpeech;
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
    id: number | null;
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

export enum Gender {
    MASCULINE = "MASCULINE",
    FEMININE = "FEMININE"
};

export enum Case {
    NOMINITIVE = "NOMINITIVE",
    GENITIVE = "GENITIVE",
    DATIVE = "DATIVE",
    ACCUSITIVE = "ACCUSITIVE"
};

export type ExtractedState =
| ExtractedConjunction
| ExtractedNoun //
| ExtractedPreposition
| ExtractedAdjective //
| ExtractedAdverb
| ExtractedVerb
| ExtractedPronoun;

export interface WordPair extends Record<string, string | number> {
  ["eng"]: string,
  ["span"]: string
};

export type WordPairWithID = {
    id: number | null,
    difficulty: number | null,
    wordPair: WordPair
};

export type ExtractedWord = {
  partOfSpeech: PartsOfSpeech,
  id: number | null,
  group: string | null,
  state: ExtractedState
};

export interface ExtractedConjunction extends WordPairWithID {};

export interface ExtractedNoun extends Record<string, WordPairWithID | (Gender | "")> {
  ["gender"]: Gender | "",
  ["sg"]: WordPairWithID,
  ["pl"]: WordPairWithID,
};

export interface ExtractedPreposition extends WordPairWithID {};

export interface ExtractedAdjective extends Record<string, WordPairWithID> {
  ["masc.sg"]: WordPairWithID,
  ["masc.pl"]: WordPairWithID,
  ["fem.sg"]: WordPairWithID,
  ["fem.pl"]: WordPairWithID
};

export interface ExtractedAdverb extends WordPairWithID {};

export interface ExtractedVerb extends Record<string, WordPairWithID> {
  ["inf"]: WordPairWithID,
  ["1st.sg"]: WordPairWithID,
  ["1st.pl"]: WordPairWithID,
  ["2nd.sg"]: WordPairWithID,
  ["2nd.pl"]: WordPairWithID,
  ["3rd.sg"]: WordPairWithID,
  ["3rd.pl"]: WordPairWithID
};

export interface ExtractedPronoun extends Record<string, WordPairWithID | (Gender | "")> {
  ["gender"]: Gender | "",
  ["nom.sg"]: WordPairWithID,
  ["nom.pl"]: WordPairWithID,
  ["dat.sg"]: WordPairWithID,
  ["dat.pl"]: WordPairWithID,
  ["acc.sg"]: WordPairWithID,
  ["acc.pl"]: WordPairWithID,
  ["gen.masc.pl"]: WordPairWithID,
  ["gen.masc.sg"]: WordPairWithID,
  ["gen.fem.sg"]: WordPairWithID,
  ["gen.fem.pl"]: WordPairWithID,
};

export interface InitialState extends Record<PartsOfSpeech, ExtractedState> {
  [PartsOfSpeech.ADJECTIVE]: ExtractedAdjective,
  [PartsOfSpeech.ADVERB]: ExtractedAdverb,
  [PartsOfSpeech.CONJUNCTION]: ExtractedConjunction,
  [PartsOfSpeech.NOUN]: ExtractedNoun,
  [PartsOfSpeech.PREPOSITION]: ExtractedPreposition,
  [PartsOfSpeech.PRONOUN]: ExtractedPronoun,
  [PartsOfSpeech.VERB]: ExtractedVerb,
}

export interface NewFormProps {
  wordSelected: ExtractedWord,
  setWordSelected: Dispatch<SetStateAction<ExtractedWord | null>>,
  usingEnglish: boolean,
  readOnly: boolean
};

export interface FormProps<State, Action> {
  state: State,
  dispatch: Dispatch<Action>,
  readOnly: boolean,
  usingEnglish: boolean
};

// export interface GrammaticalInfo {
//     partOfSpeech: PartsOfSpeech;
//     infinitive: boolean;
//     person: number | null;
//     number: string | null;
//     gender: string | null;
//     case: string | null;
// };

// export interface WordPairDTO extends GrammaticalInfo {
//     id: number | undefined;
//     spanish: string;
//     english: string;
//     parentId: number | undefined;
// };