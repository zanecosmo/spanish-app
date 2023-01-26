import { Reducer, useReducer } from "react";
import { PartsOfSpeech } from "../../types";
import { conjunctionReducer, ConjunctionAction, initialConjuctionState } from "./reducers/conjunction";
import { nounReducer, NounAction, initialNounState } from "./reducers/noun";
import { ExtractedConjunction, ExtractedNoun, ExtractedState, ExtractedWord } from "./types";

type ExtractedWordReducer =
| Reducer<ExtractedNoun, NounAction>
| Reducer<ExtractedConjunction, ConjunctionAction>


const chooseFormReducer = (partofSpeech: PartsOfSpeech): ExtractedWordReducer => {

  switch (partofSpeech) {

    case PartsOfSpeech.NOUN: return nounReducer;
    
    case PartsOfSpeech.CONJUNCTION: return conjunctionReducer;
  };

  throw Error("INVALID PART OF SPEECH OR UN IMPLEMENTED FUNCTIONALITY");
};

const chooseInitialFormState = (partOfSpeech: PartsOfSpeech) => {

  switch (partOfSpeech) {

    case PartsOfSpeech.NOUN: return initialNounState;

    case PartsOfSpeech.CONJUNCTION: return initialConjuctionState;
  };

  throw Error("INVALID PART OF SPEECH OR UN IMPLEMENTED FUNCTIONALITY");
}

export type Action =
| NounAction
| ConjunctionAction;

export const useExtendedWordState = (
  partOfSpeech: PartsOfSpeech,
  state: ExtractedState = chooseInitialFormState(partOfSpeech)
) => {
  const reducer: ExtractedWordReducer = chooseFormReducer(partOfSpeech);
  return useReducer(reducer, state);
};