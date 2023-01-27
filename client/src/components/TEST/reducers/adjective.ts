import { Reducer } from "react";
import { ExtractedAdjective } from "../types";

export type AdjectiveAction = {
  type:
  | "english.masculine.singular"
  | "english.feminine.singular"
  | "english.masculine.plural"
  | "english.feminine.plural"
  | "spanish.masculine.singular"
  | "spanish.feminine.singular"
  | "spanish.masculine.plural"
  | "spanish.feminine.plural",
  inputValue: string
};

export const adjectiveReducer: Reducer<ExtractedAdjective, AdjectiveAction> = (state, action) => {
  
  switch (action.type) {
    
    case "english.masculine.singular": {
      return {
        english: {
          masculine: { ...state.english.masculine, singular: action.inputValue },
          feminine: { ...state.english.feminine }
        },
        spanish: { ...state.spanish }
      };
    };

    case "english.feminine.singular": {
      return {
        english: {
          masculine: { ...state.english.masculine },
          feminine: { ...state.english.feminine, singular: action.inputValue }
        },
        spanish: { ...state.spanish }
      };
    };

    case "english.masculine.plural": {
      return {
        english: {
          masculine: { ...state.english.masculine, plural: action.inputValue },
          feminine: { ...state.english.feminine  }
        },
        spanish: { ...state.spanish }
      };
    };

    case "english.feminine.plural": {
      return {
        english: {
          masculine: { ...state.english.masculine },
          feminine: { ...state.english.feminine, plural: action.inputValue }
        },
        spanish: { ...state.spanish }
      };
    };

    case "spanish.masculine.singular": {
      return {
        english: { ...state.english },
        spanish: {
          masculine: { ...state.spanish.masculine, singular: action.inputValue },
          feminine: { ...state.spanish.feminine }
        }
      };
    };

    case "spanish.feminine.singular": {
      return {
        english: { ...state.english },
        spanish: {
          masculine: { ...state.spanish.masculine },
          feminine: { ...state.spanish.feminine, singular: action.inputValue }
        }
      };
    };

    case "spanish.masculine.plural": {
      return {
        english: { ...state.english },
        spanish: {
          masculine: { ...state.spanish.masculine, plural: action.inputValue },
          feminine: { ...state.spanish.feminine  }
        }
      };
    };

    case "spanish.feminine.plural": {
      return {
        english: { ...state.english },
        spanish: {
          masculine: { ...state.spanish.masculine },
          feminine: { ...state.spanish.feminine, plural: action.inputValue }
        }
      };
    };
  };
};

export const initialAdjectiveState: ExtractedAdjective = {
  english: {
    masculine: {
      singular: "",
      plural: "",
    },
    feminine: {
      singular: "",
      plural: ""
    }
  },
  spanish: {
    masculine: {
      singular: "",
      plural: "",
    },
    feminine: {
      singular: "",
      plural: ""
    }
  },
};