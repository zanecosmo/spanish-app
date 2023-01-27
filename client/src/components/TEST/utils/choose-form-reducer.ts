import { Reducer } from "react";
import { PartsOfSpeech } from "../../../types";
import { AdjectiveAction, adjectiveReducer } from "../reducers/adjective";
import { AdverbAction, adverbReducer } from "../reducers/adverb";
import { conjunctionReducer, ConjunctionAction } from "../reducers/conjunction";
import { nounReducer, NounAction } from "../reducers/noun";
import { PrepositionAction, prepositionReducer } from "../reducers/preposition";
import { initialPronounState, PronounAction } from "../reducers/pronoun";
import { ExtractedAdjective, ExtractedAdverb, ExtractedConjunction, ExtractedNoun, ExtractedPreposition, ExtractedPronoun } from "../types";

export type ExtractedWordReducer =
| Reducer<ExtractedNoun, NounAction>
| Reducer<ExtractedConjunction, ConjunctionAction>
| Reducer<ExtractedPreposition, PrepositionAction>
| Reducer<ExtractedAdjective, AdjectiveAction>
| Reducer<ExtractedAdverb, AdverbAction>
| Reducer<ExtractedPronoun, PronounAction>;


export const chooseFormReducer = (partOfSpeech: PartsOfSpeech): ExtractedWordReducer => {

  switch (partOfSpeech) {

    case PartsOfSpeech.NOUN: return nounReducer;
    
    case PartsOfSpeech.CONJUNCTION: return conjunctionReducer;
    
    case PartsOfSpeech.PREPOSITION: return prepositionReducer;
    
    case PartsOfSpeech.ADJECTIVE: return adjectiveReducer;

    case PartsOfSpeech.ADVERB: return adverbReducer;

    case PartsOfSpeech.PRONOUN: return () => initialPronounState as ExtractedPronoun;
  };

  throw Error("INVALID PART OF SPEECH OR UN IMPLEMENTED FUNCTIONALITY");
};