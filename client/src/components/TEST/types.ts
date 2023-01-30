import { Dispatch } from "react";
import { PartsOfSpeech, Gender } from "../../types";

export type ExtractedState =
| ExtractedConjunction
| ExtractedNoun
| ExtractedPreposition
| ExtractedAdjective
| ExtractedVerb
| ExtractedPronoun;

interface WordPair extends Record<string, string> {
  english: string,
  spanish: string
};

export interface NumberPair extends Record<string, WordPair> {
  singular: WordPair,
  plural: WordPair
};

export type ExtractedWord = {
  partOfSpeech: PartsOfSpeech,
  group: string | null,
  structure: ExtractedState,
};

export interface ExtractedConjunction {
  english: string,
  spanish: string,
};

export interface ExtractedNoun {
  gender: Gender,
  english: {
    singular: string,
    plural: string,
  },
  spanish: {
    singular: string,
    plural: string,
  },
};

export interface ExtractedPreposition {
  english: string,
  spanish: string,
};

export interface ExtractedAdjective {
  english: {
    masculine: {
      singular: string,
      plural: string
    },
    feminine: {
      singular: string,
      plural: string
    },
  },
  spanish: {
    masculine: {
      singular: string,
      plural: string
    },
    feminine: {
      singular: string,
      plural: string
    },
  }
};

export interface ExtractedAdverb {
  english: string,
  spanish: string
};

export type EditableVerbState = [ ExtractedVerb, ExtractedVerb | null ];

export interface ExtractedVerb extends Record<string, string> {
  ["infinitive"]: string,
  ["1st.sg.eng"]: string,
  ["1st.pl.eng"]: string,
  ["2nd.sg.eng"]: string,
  ["2nd.pl.eng"]: string,
  ["3rd.sg.eng"]: string,
  ["3rd.pl.eng"]: string,
  ["1st.sg.span"]: string,
  ["1st.pl.span"]: string,
  ["2nd.sg.span"]: string,
  ["2nd.pl.span"]: string,
  ["3rd.sg.span"]: string,
  ["3rd.pl.span"]: string,
};

export type EditablePronounState = [ ExtractedPronoun, ExtractedPronoun | null ];

export interface ExtractedPronoun extends Record<string, string> {
  ["gender"]: Gender | "",
  ["nom.sg.eng"]: string,
  ["nom.pl.eng"]: string,
  ["dat.sg.eng"]: string,
  ["dat.pl.eng"]: string,
  ["acc.sg.eng"]: string,
  ["acc.pl.eng"]: string,
  ["nom.sg.span"]: string,
  ["nom.pl.span"]: string,
  ["dat.sg.span"]: string,
  ["dat.pl.span"]: string,
  ["acc.sg.span"]: string,
  ["acc.pl.span"]: string,
  ["gen.masc.pl.eng"]: string,
  ["gen.masc.sg.eng"]: string,
  ["gen.fem.sg.eng"]: string,
  ["gen.fem.pl.eng"]: string,
  ["gen.masc.sg.span"]: string,
  ["gen.masc.pl.span"]: string,
  ["gen.fem.sg.span"]: string,
  ["gen.fem.pl.span"]: string,
};

export interface NewFormProps {
  state: ExtractedState,
  usingEnglish: boolean,
  readOnly: boolean
};

export interface FormProps<State, Action> {
  state: State,
  dispatch: Dispatch<Action>,
  readOnly: boolean,
  usingEnglish: boolean
};