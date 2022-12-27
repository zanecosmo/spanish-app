import { GrammaticalNumber, Word, PartsOfSpeech } from "./types";

export const verb: Word = {
    id: 53,
    group: null,
    notes: null,
    wordPairs: [
        {
            id: 76,
            english: "to do/make",
            spanish: "hacer",
            difficulty: null,
            parentId: undefined,
            partOfSpeech: PartsOfSpeech.VERB,
            infinitive: true,
            person: null,
            number: null,
            gender: null,
            case: null
        },
        {
            id: 75,
            english: "i do/make",
            spanish: "hago",
            difficulty: null,
            parentId: undefined,
            partOfSpeech: PartsOfSpeech.VERB,
            infinitive: false,
            person: 1,
            number: GrammaticalNumber.SINGULAR,
            gender: null,
            case: null
        },
        {
            id: 74,
            english: "we do/make",
            spanish: "hacemos",
            difficulty: null,
            parentId: undefined,
            partOfSpeech: PartsOfSpeech.VERB,
            infinitive: false,
            person: 1,
            number: GrammaticalNumber.PLURAL,
            gender: null,
            case: null
        },
        {
            id: 73,
            english: "you do/make",
            spanish: "haces",
            difficulty: null,
            parentId: undefined,
            partOfSpeech: PartsOfSpeech.VERB,
            infinitive: false,
            person: 2,
            number: GrammaticalNumber.SINGULAR,
            gender: null,
            case: null
        },
        {
            id: 72,
            english: "you do/make (plural)",
            spanish: "hacen",
            difficulty: null,
            parentId: undefined,
            partOfSpeech: PartsOfSpeech.VERB,
            infinitive: false,
            person: 2,
            number: GrammaticalNumber.PLURAL,
            gender: null,
            case: null
        },
        {
            id: 71,
            english: "he/she/it does/makes",
            spanish: "hace",
            difficulty: null,
            parentId: undefined,
            partOfSpeech: PartsOfSpeech.VERB,
            infinitive: false,
            person: 3,
            number: GrammaticalNumber.SINGULAR,
            gender: null,
            case: null
        },
        {
            id: 70,
            english: "they do/make",
            spanish: "hacen",
            difficulty: null,
            parentId: undefined,
            partOfSpeech: PartsOfSpeech.VERB,
            infinitive: false,
            person: 3,
            number: GrammaticalNumber.PLURAL,
            gender: null,
            case: null
        }
    ]
};