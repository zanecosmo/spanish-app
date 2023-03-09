import { GrammaticalNumber, Word, PartsOfSpeech } from "./types";

export const verb: Word = {
    id: undefined,
    group: null,
    wordPairs: [
        {
            id: undefined,
            english: "to think/consider",
            spanish: "pensar",
            // difficulty: null,
            parentId: undefined,
            part_of_speech: PartsOfSpeech.VERB,
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
            parentId: undefined,
            part_of_speech: PartsOfSpeech.VERB,
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
            parentId: undefined,
            part_of_speech: PartsOfSpeech.VERB,
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
            parentId: undefined,
            part_of_speech: PartsOfSpeech.VERB,
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
            parentId: undefined,
            part_of_speech: PartsOfSpeech.VERB,
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
            parentId: undefined,
            part_of_speech: PartsOfSpeech.VERB,
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
            parentId: undefined,
            part_of_speech: PartsOfSpeech.VERB,
            infinitive: false,
            person: 3,
            number: GrammaticalNumber.PLURAL,
            gender: null,
            case: null
        }
    ]
};