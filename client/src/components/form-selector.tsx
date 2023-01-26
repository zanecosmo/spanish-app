import React, { FC } from "react";
import { PartsOfSpeech } from "../types";
import { Adjective } from "./adjective-form/adjective";
import { Adverb } from "./adverb-form/adverb";
import { Conjunction } from "./conjunction-form/conjunction";
import { Noun } from "./noun-form/noun";
import { Preposition } from "./preposition-form/preposition";
import { Pronoun } from "./pronoun-form/pronoun";
import { Action } from "./TEST/extended-word-state-hook";
import { ConjunctionAction } from "./TEST/reducers/conjunction";
import { NounAction } from "./TEST/reducers/noun";
import { ExtractedConjunction, ExtractedNoun, ExtractedState, FormProps } from "./TEST/types";
import { Verb } from "./verb-form/verb";

interface FormSelectorProps {
  partOfSpeech: PartsOfSpeech;
  formProps: FormProps<ExtractedState, Action>;
};

export const FormSelector: FC<FormSelectorProps> = (props) => {
  switch (props.partOfSpeech) {
    case PartsOfSpeech.VERB: return <Verb />;
    case PartsOfSpeech.ADVERB: return <Adverb />;

    case PartsOfSpeech.NOUN: {
      return <Noun { ...(props.formProps as FormProps<ExtractedNoun, NounAction>) }/>
    };

    case PartsOfSpeech.PRONOUN: return <Pronoun />;
    case PartsOfSpeech.ADJECTIVE: return <Adjective />;
    case PartsOfSpeech.PREPOSITION: return <Preposition />;

    case PartsOfSpeech.CONJUNCTION: {
      return <Conjunction { ...(props.formProps as FormProps<ExtractedConjunction, ConjunctionAction>) }/>;
    }
    default: throw Error("INVALID PART OS SPEECH");
  };
};