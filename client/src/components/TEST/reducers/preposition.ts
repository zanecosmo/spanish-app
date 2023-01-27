import { Reducer } from "react";
import { ExtractedPreposition } from "../types";

export type PrepositionAction = { type: "english" | "spanish",  inputValue: string }

export const prepositionReducer: Reducer<ExtractedPreposition, PrepositionAction> = (state, action) => {
  switch (action.type) {
    case "english": return { ...state, english: action.inputValue };
    case "spanish": return { ...state, spanish: action.inputValue };
  };
};

export const initialPrepositionState: ExtractedPreposition = {
  english: "",
  spanish: ""
};