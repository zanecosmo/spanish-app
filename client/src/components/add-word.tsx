import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { PartsOfSpeech } from "../types";
import { Adjective } from "./words-by-part-of-speech/adjective";
import { Adverb } from "./words-by-part-of-speech/adverb";
import { Conjunction } from "./words-by-part-of-speech/conjunction";
import { Noun } from "./words-by-part-of-speech/noun";
import { Preposition } from "./words-by-part-of-speech/preposition";
import { Pronoun } from "./words-by-part-of-speech/pronoun";
import { Verb } from "./verb-form/verb";

const displayCorrectWordType = (
  partOfSpeech: string,
  submitCallback: (event: FormEvent<HTMLFormElement>) => void
): JSX.Element | null => {
  switch (partOfSpeech) {
    case PartsOfSpeech.VERB: return <Verb />;
    case PartsOfSpeech.ADVERB: return <Adverb />;
    case PartsOfSpeech.NOUN: return <Noun />;
    case PartsOfSpeech.PRONOUN: return <Pronoun />;
    case PartsOfSpeech.ADJECTIVE: return <Adjective />;
    case PartsOfSpeech.PREPOSITION: return <Preposition />;
    case PartsOfSpeech.CONJUNCTION: return <Conjunction />;
    default: return null;
  };
};

export const AddWordForm: FC<{ submitForm: (event: FormEvent<HTMLFormElement>) => void }> = (props) => {
  const { submitForm } = props;

  const [ partOfSpeech, setPartOfSpeech ] = useState("");

  const createPartsOfSpeechSelect = () => {
    const partsOfSpeech: Array<string> = [];
    for (let part in PartsOfSpeech) partsOfSpeech.push(part);
    return partsOfSpeech.map((part, i) => <option key={i} value={part}>{part}</option>);
  };

  return (
    <form onSubmit={submitForm}>
      <select
      name="part-of-speech"
      id="part-of-speech"
      value={partOfSpeech as string}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => setPartOfSpeech(e.target.value)}
      >
        {createPartsOfSpeechSelect()}
        {partOfSpeech ? displayCorrectWordType(partOfSpeech, submitForm) : null}
      </select>
    </form>
  )
};