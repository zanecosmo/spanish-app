import { useReducer } from "react";
import { PartsOfSpeech } from "../../types";
import { AdjectiveAction } from "./reducers/adjective";
import { AdverbAction } from "./reducers/adverb";
import { ConjunctionAction } from "./reducers/conjunction";
import { NounAction } from "./reducers/noun";
import { PrepositionAction } from "./reducers/preposition";
import { ExtractedState } from "./types";
import { chooseFormReducer, ExtractedWordReducer } from "./utils/choose-form-reducer";
import { chooseInitialFormState } from "./utils/choose-initial-form-state";

export type Action =
| NounAction
| ConjunctionAction
| PrepositionAction
| AdjectiveAction
| AdverbAction;

export const useExtendedWordState = (
  partOfSpeech: PartsOfSpeech,
  state: ExtractedState = chooseInitialFormState(partOfSpeech)
) => {
  const reducer: ExtractedWordReducer = chooseFormReducer(partOfSpeech);
  return useReducer(reducer, state);
};