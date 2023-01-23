import { produce } from "immer";
import {
  Store,
  ZustandGet,
  ZustandSet,
  VerbFormState,
  VerbFormStateAndSetters,
} from "../../../types";
import { getWordPairsByPerson } from "../../../utils";

const initialState: VerbFormState = {
  infinitive: "",
  firstPerson: {
    singular: "",
    plural: "",
  },
  secondPerson: {
    singular: "",
    plural: "",
  },
  thirdPerson: {
    singular: "",
    plural: "",
  }
}

export const verbFormEnglishSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): VerbFormStateAndSetters => ({
  state: initialState,
  set: {
    infinitive: (val: string) => set(produce((state: Store) => {
      void (state.home.forms.verb.english.state.infinitive = val);
    })),
    firstPerson: {
      singular: (val: string) => set(produce((state: Store) => {
        void (state.home.forms.verb.english.state.firstPerson.singular = val);
      })),
      plural: (val: string) => set(produce((state: Store) => {
        void (state.home.forms.verb.english.state.firstPerson.plural = val);
      })),
    },
    secondPerson: {
      singular: (val: string) => set(produce((state: Store) => {
        void (state.home.forms.verb.english.state.secondPerson.singular = val);
      })),
      plural: (val: string) => set(produce((state: Store) => {
        void (state.home.forms.verb.english.state.secondPerson.plural = val);
      })),
    },
    thirdPerson: {
      singular: (val: string) => set(produce((state: Store) => {
        void (state.home.forms.verb.english.state.thirdPerson.singular = val);
      })),
      plural: (val: string) => set(produce((state: Store) => {
        void (state.home.forms.verb.english.state.thirdPerson.plural = val);
      })),
    }
  },
  convertToForm: (): void => {
    const word = get().home.selectedWord;
    
    if (!word) throw Error("NO SELECTED WORD");

    const infinitive = word.wordPairs.find(wp => wp.infinitive === true);

    if (!infinitive) throw Error("NO INFINITIVE");

    const form: VerbFormState = {
      infinitive: infinitive.english,
      firstPerson: getWordPairsByPerson("ENGLISH", word.wordPairs, wp => wp.person === 1),
      secondPerson: getWordPairsByPerson("ENGLISH", word.wordPairs, wp => wp.person === 2),
      thirdPerson: getWordPairsByPerson("ENGLISH", word.wordPairs, wp => wp.person === 3)
    };

    set(produce((state: Store) => void (state.home.forms.verb.english.state = form)));
  },
  resetForm: () => {
    set(produce((state: Store) => void (state.home.forms.verb.english.state = initialState)));
  }
});