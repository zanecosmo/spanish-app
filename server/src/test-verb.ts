import { GrammaticalNumber, Word, PartsOfSpeech } from "./types";

export const verb: Word = {
    id: 52,
    group: null,
    notes: null,
    wordPairs: [
        {
            id: 69,
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
            id: 68,
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
            id: 67,
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
            id: 66,
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
            id: 65,
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
            id: 64,
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
            id: 63,
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