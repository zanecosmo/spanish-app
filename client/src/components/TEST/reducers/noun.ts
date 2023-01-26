import { Reducer } from "react";
import { Gender } from "../../../types";
import { ExtractedNoun } from "../types";

export type NounAction = {
  type:
  | "english.singular"
  | "english.plural"
  | "spanish.singular"
  | "spanish.plural"
  | "gender";
  inputValue: string
};

export const nounReducer: Reducer<ExtractedNoun, NounAction> = (state, action) => {

  switch (action.type) {

    case "gender": return { ...state, gender: action.inputValue as Gender }

    case "english.singular": return { 
      gender: state.gender,
      english: { ...state.english, singular: action.inputValue },
      spanish: { ...state.spanish }
    };

    case "english.plural": return { 
      gender: state.gender,
      english: { ...state.english, plural: action.inputValue },
      spanish: { ...state.spanish }
    };

    case "spanish.singular": return { 
      gender: state.gender,
      english: { ...state.english },
      spanish: { ...state.spanish, singular: action.inputValue }
    };

    case "spanish.plural": return { 
      gender: state.gender,
      english: { ...state.english },
      spanish: { ...state.spanish, plural: action.inputValue }
    };
  };
};

export const initialNounState: ExtractedNoun = {
  gender: Gender.MASCULINE,
  english: {
    singular: "",
    plural: ""
  },
  spanish: {
    singular: "",
    plural: ""
  }
};