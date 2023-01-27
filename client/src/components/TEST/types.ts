import { Dispatch } from "react";
import { PartsOfSpeech, Gender } from "../../types";

export type ExtractedState =
| ExtractedConjunction
| ExtractedNoun
| ExtractedPreposition
| ExtractedAdjective
| ExtractedPronoun;


export type ExtractedWord = {
  partOfSpeech: PartsOfSpeech,
  group: string | null,
  structure: ExtractedState,
};

interface WordPair {
  english: string,
  spanish: string
};

export interface ExtractedConjunction {
  english: string,
  spanish: string,
};

export interface ExtractedNoun {
  gender: Gender,
  english: {
    singular: string,
    plural: string,
  },
  spanish: {
    singular: string,
    plural: string,
  },
};

export interface ExtractedPreposition {
  english: string,
  spanish: string,
};

export interface ExtractedAdjective {
  english: {
    masculine: {
      singular: string,
      plural: string
    },
    feminine: {
      singular: string,
      plural: string
    },
  },
  spanish: {
    masculine: {
      singular: string,
      plural: string
    },
    feminine: {
      singular: string,
      plural: string
    },
  }
};

export interface ExtractedAdverb {
  english: string,
  spanish: string
};

export type EditablePronounState = [ ExtractedPronoun, ExtractedPronoun | null ];

export interface ExtractedPronoun {
  ["gender"]: Gender | "",
  ["nominitive.singular.english"]: string,
  ["nominitive.singular.spanish"]: string,
  ["nominitive.plural.english"]: string,
  ["nominitive.plural.spanish"]: string,
  ["dative.singular.english"]: string,
  ["dative.singular.spanish"]: string,
  ["dative.plural.english"]: string,
  ["dative.plural.spanish"]: string,
  ["accusitive.singular.english"]: string,
  ["accusitive.singular.spanish"]: string,
  ["accusitive.plural.english"]: string,
  ["accusitive.plural.spanish"]: string,
  ["genitive.masculine.singular.english"]: string,
  ["genitive.masculine.singular.spanish"]: string,
  ["genitive.masculine.plural.english"]: string,
  ["genitive.masculine.plural.spanish"]: string,
  ["genitive.feminine.singular.english"]: string,
  ["genitive.feminine.singular.spanish"]: string,
  ["genitive.feminine.plural.english"]: string,
  ["genitive.feminine.plural.spanish"]: string,
};

interface PronounStateOLD {
  gender: string | null,
  nominitive: {
    singular: WordPair,
    plural: WordPair,
  },
  dative: {
    singular: WordPair,
    plural: WordPair,
  },
  accusitive: {
    singular: WordPair,
    plural: WordPair,
  },
  genitive: {
    firstPerson: {
      singular: {
        masculine: WordPair, // mine (first-person masculine singular) - mio/mios
        feminine: WordPair // mine (first-person feminine singular) - mia/mias
      },
      plural: {
        masculine: WordPair, // mine (first-person masculine plural) - nuestro/nuestros
        feminine: WordPair // mine (first-person feminine plural) - nuestra/nuestras
      }
    }
  }
};

export interface FormProps<State, Action> {
  state: State,
  dispatch: Dispatch<Action>,
  readOnly: boolean,
  usingEnglish: boolean
};