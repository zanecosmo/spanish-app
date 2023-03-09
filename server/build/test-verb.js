"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verb = void 0;
const types_1 = require("./types");
exports.verb = {
    id: undefined,
    group: null,
    wordPairs: [
        {
            id: undefined,
            english: "to think/consider",
            spanish: "pensar",
            // difficulty: null,
            parentId: undefined,
            part_of_speech: types_1.PartsOfSpeech.VERB,
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
            part_of_speech: types_1.PartsOfSpeech.VERB,
            infinitive: false,
            person: 1,
            number: types_1.GrammaticalNumber.SINGULAR,
            gender: null,
            case: null
        },
        {
            id: undefined,
            english: "we think/consider",
            spanish: "pensamos",
            parentId: undefined,
            part_of_speech: types_1.PartsOfSpeech.VERB,
            infinitive: false,
            person: 1,
            number: types_1.GrammaticalNumber.PLURAL,
            gender: null,
            case: null
        },
        {
            id: undefined,
            english: "you think/consider",
            spanish: "piensas",
            parentId: undefined,
            part_of_speech: types_1.PartsOfSpeech.VERB,
            infinitive: false,
            person: 2,
            number: types_1.GrammaticalNumber.SINGULAR,
            gender: null,
            case: null
        },
        {
            id: undefined,
            english: "you think/consider (plural)",
            spanish: "piensa",
            parentId: undefined,
            part_of_speech: types_1.PartsOfSpeech.VERB,
            infinitive: false,
            person: 2,
            number: types_1.GrammaticalNumber.PLURAL,
            gender: null,
            case: null
        },
        {
            id: undefined,
            english: "he/she/it thinks/considers",
            spanish: "piensan",
            parentId: undefined,
            part_of_speech: types_1.PartsOfSpeech.VERB,
            infinitive: false,
            person: 3,
            number: types_1.GrammaticalNumber.SINGULAR,
            gender: null,
            case: null
        },
        {
            id: undefined,
            english: "they think/consider",
            spanish: "piensan",
            parentId: undefined,
            part_of_speech: types_1.PartsOfSpeech.VERB,
            infinitive: false,
            person: 3,
            number: types_1.GrammaticalNumber.PLURAL,
            gender: null,
            case: null
        }
    ]
};
