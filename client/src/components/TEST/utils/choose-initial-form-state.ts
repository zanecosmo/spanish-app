import { PartsOfSpeech } from "../../../types";
import { initialAdjectiveState } from "../reducers/adjective";
import { initialAdverbState } from "../reducers/adverb";
import { initialConjuctionState } from "../reducers/conjunction";
import { initialNounState } from "../reducers/noun";
import { initialPrepositionState } from "../reducers/preposition";

export const chooseInitialFormState = (partOfSpeech: PartsOfSpeech) => {

  switch (partOfSpeech) {

    case PartsOfSpeech.NOUN: return initialNounState;

    case PartsOfSpeech.CONJUNCTION: return initialConjuctionState;

    case PartsOfSpeech.PREPOSITION: return initialPrepositionState;
    
    case PartsOfSpeech.ADJECTIVE: return initialAdjectiveState;
    
    case PartsOfSpeech.ADVERB: return initialAdverbState;
  };

  throw Error("INVALID PART OF SPEECH OR UN IMPLEMENTED FUNCTIONALITY");
};