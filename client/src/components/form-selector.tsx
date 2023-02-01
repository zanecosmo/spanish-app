import React, { FC } from "react";
import { PartsOfSpeech } from "../types";
import { Adjective } from "./form-inputs/adjective";
import { Adverb } from "./form-inputs/adverb";
import { Conjunction } from "./form-inputs/conjunction";
import { Noun } from "./form-inputs/noun";
import { Preposition } from "./form-inputs/preposition";
import { Pronoun } from "./form-inputs/pronoun";
import { NewFormProps } from "../types";
import { Verb } from "./form-inputs/verb";

interface FormSelectorProps {
  partOfSpeech: PartsOfSpeech;
  formProps: NewFormProps;
};

export const FormSelector: FC<FormSelectorProps> = (props) => {

  switch (props.partOfSpeech) {

    case PartsOfSpeech.VERB: {
      return <Verb { ...props.formProps } />;
    }

    case PartsOfSpeech.ADVERB: {
      return <Adverb { ...props.formProps } />;
    }

    case PartsOfSpeech.NOUN: {
      return <Noun { ...(props.formProps) }/>
    };

    case PartsOfSpeech.PRONOUN: {
      return <Pronoun { ...props.formProps } />;
    };

    case PartsOfSpeech.ADJECTIVE: {
      return <Adjective { ...props.formProps } />;
    };

    case PartsOfSpeech.PREPOSITION: {
      return <Preposition { ...props.formProps } />
    };

    case PartsOfSpeech.CONJUNCTION: {
      return <Conjunction { ...props.formProps }/>;
    };
  };
};