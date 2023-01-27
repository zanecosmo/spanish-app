import { Reducer } from "react";
import { ExtractedAdverb } from "../types";

export type AdverbAction = { type: "english" | "spanish",  inputValue: string }

export const adverbReducer: Reducer<ExtractedAdverb, AdverbAction> = (state, action) => {
  switch (action.type) {
    case "english": return { ...state, english: action.inputValue };
    case "spanish": return { ...state, spanish: action.inputValue };
  };
};

export const initialAdverbState: ExtractedAdverb = {
  english: "",
  spanish: ""
};