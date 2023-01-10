import { GrammaticalNumber, Word, PartsOfSpeech } from "./types";

export const verb: Word = {
    id: undefined,
    group: null,
    notes: null,
    wordPairs: [
        {
            id: undefined,
            english: "to think/consider",
            spanish: "pensar",
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
            id: undefined,
            english: "i think/consider",
            spanish: "pienso",
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
            id: undefined,
            english: "we think/consider",
            spanish: "pensamos",
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
            id: undefined,
            english: "you think/consider",
            spanish: "piensas",
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
            id: undefined,
            english: "you think/consider (plural)",
            spanish: "piensa",
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
            id: undefined,
            english: "he/she/it thinks/considers",
            spanish: "piensan",
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
            id: undefined,
            english: "they think/consider",
            spanish: "piensan",
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