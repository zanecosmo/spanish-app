import { Reducer } from "react";
import { ExtractedConjunction } from "../types";

export type ConjunctionAction = { type: "english" | "spanish",  inputValue: string }

export const conjunctionReducer: Reducer<ExtractedConjunction, ConjunctionAction> = (state, action) => {
  switch (action.type) {
    case "english": return { ...state, english: action.inputValue };
    case "spanish": return { ...state, spanish: action.inputValue };
  };
};

export const initialConjuctionState: ExtractedConjunction = {
  english: "",
  spanish: ""
};