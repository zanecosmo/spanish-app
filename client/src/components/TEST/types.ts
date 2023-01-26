import { Dispatch } from "react";
import { PartsOfSpeech, Gender } from "../../types";

export type ExtractedState =
| ExtractedConjunction
| ExtractedNoun;

export type ExtractedWord = {
  partOfSpeech: PartsOfSpeech;
  group: string | null;
  structure: ExtractedState;
};

export interface ExtractedConjunction {
  english: string;
  spanish: string;
};

export interface ExtractedNoun {
  gender: Gender;
  english: {
    singular: string;
    plural: string;
  };
  spanish: {
    singular: string;
    plural: string;
  };
};

export interface FormProps<State, Action> {
  state: State;
  dispatch: Dispatch<Action>;
  readOnly: boolean;
  usingEnglish: boolean;
};