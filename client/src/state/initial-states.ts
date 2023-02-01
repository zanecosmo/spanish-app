import { ExtractedWord, PartsOfSpeech, WordPairWithID } from "../types";
import { ExtractedState, InitialState } from "../types";

export const generateInitialState = (partOfSpeech: PartsOfSpeech): ExtractedWord => {
  return {
    partOfSpeech: partOfSpeech,
    id: null,
    group: null,
    state: initialState[partOfSpeech]
  };
};

const createEmptyWordPair = (): WordPairWithID => ({
  id: null,
  difficulty: null,
  wordPair: {
    ["eng"]: "",
    ["span"]: ""
  }
});

const initialState: InitialState = {
  [PartsOfSpeech.ADJECTIVE]: {
    ["masc.sg"]: createEmptyWordPair(),
    ["masc.pl"]: createEmptyWordPair(),
    ["fem.sg"]: createEmptyWordPair(),
    ["fem.pl"]: createEmptyWordPair()
  },
  [PartsOfSpeech.ADVERB]: createEmptyWordPair(),
  [PartsOfSpeech.CONJUNCTION]: createEmptyWordPair(),
  [PartsOfSpeech.NOUN]: {
    ["gender"]: "",
    ["sg"]: createEmptyWordPair(),
    ["pl"]: createEmptyWordPair(),
  },
  [PartsOfSpeech.PREPOSITION]: createEmptyWordPair(),
  [PartsOfSpeech.PRONOUN]: {
    ["gender"]: "",
    ["nom.sg"]: createEmptyWordPair(),
    ["nom.pl"]: createEmptyWordPair(),
    ["dat.sg"]: createEmptyWordPair(),
    ["dat.pl"]: createEmptyWordPair(),
    ["acc.sg"]: createEmptyWordPair(),
    ["acc.pl"]: createEmptyWordPair(),
    ["gen.masc.sg"]: createEmptyWordPair(),
    ["gen.masc.pl"]: createEmptyWordPair(),
    ["gen.fem.sg"]: createEmptyWordPair(),
    ["gen.fem.pl"]: createEmptyWordPair()
  },
  [PartsOfSpeech.VERB]: {
    ["inf"]: createEmptyWordPair(),
    ["1st.sg"]: createEmptyWordPair(),
    ["1st.pl"]: createEmptyWordPair(),
    ["2nd.sg"]: createEmptyWordPair(),
    ["2nd.pl"]: createEmptyWordPair(),
    ["3rd.sg"]: createEmptyWordPair(),
    ["3rd.pl"]: createEmptyWordPair()
  }
};