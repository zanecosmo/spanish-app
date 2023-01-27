import React, { FC } from "react";
import { PartsOfSpeech } from "../types";
import { Adjective } from "./adjective-form/adjective";
import { Adverb } from "./adverb-form/adverb";
import { Conjunction } from "./conjunction-form/conjunction";
import { Noun } from "./noun-form/noun";
import { Preposition } from "./preposition-form/preposition";
import { Pronoun } from "./pronoun-form/pronoun";
import { Action } from "./TEST/extended-word-state-hook";
import { AdjectiveAction } from "./TEST/reducers/adjective";
import { AdverbAction } from "./TEST/reducers/adverb";
import { ConjunctionAction } from "./TEST/reducers/conjunction";
import { NounAction } from "./TEST/reducers/noun";
import { PrepositionAction } from "./TEST/reducers/preposition";
import { PronounFormProps } from "./TEST/TEST-pronoun-state";
import { ExtractedAdjective, ExtractedAdverb, ExtractedConjunction, ExtractedNoun, ExtractedPreposition, ExtractedPronoun, ExtractedState, FormProps } from "./TEST/types";
import { Verb } from "./verb-form/verb";

interface FormSelectorProps {
  partOfSpeech: PartsOfSpeech;
  formProps: FormProps<ExtractedState, Action>;
  pronounFormProps: PronounFormProps;
};

export const FormSelector: FC<FormSelectorProps> = (props) => {
  switch (props.partOfSpeech) {
    case PartsOfSpeech.VERB: return <Verb />;

    case PartsOfSpeech.ADVERB: {
      return <Adverb { ...(props.formProps as FormProps<ExtractedAdverb, AdverbAction>) } />;
    }

    case PartsOfSpeech.NOUN: {
      return <Noun { ...(props.formProps as FormProps<ExtractedNoun, NounAction>) }/>
    };

    case PartsOfSpeech.PRONOUN: {
      const pronounFormProps: PronounFormProps = {
        pronounState: props.pronounFormProps.pronounState as ExtractedPronoun,
        readOnly: props.pronounFormProps.readOnly,
        usingEnglish: props.pronounFormProps.usingEnglish
      };

      return <Pronoun { ...pronounFormProps } />;
    };

    case PartsOfSpeech.ADJECTIVE: {
      return <Adjective { ...(props.formProps as FormProps<ExtractedAdjective, AdjectiveAction>) } />;
    };

    case PartsOfSpeech.PREPOSITION: {
      return <Preposition { ...(props.formProps as FormProps<ExtractedPreposition, PrepositionAction>) } />
    };

    case PartsOfSpeech.CONJUNCTION: {
      return <Conjunction { ...(props.formProps as FormProps<ExtractedConjunction, ConjunctionAction>) }/>;
    }
    default: throw Error("INVALID PART OS SPEECH");
  };
};