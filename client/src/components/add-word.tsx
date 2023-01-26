import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { PartsOfSpeech } from "../types";
import { FormSelector } from "./form-selector";

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
        {/* {partOfSpeech ? <FormSelector partOfSpeech={partOfSpeech as PartsOfSpeech} /> : null} */}
      </select>
    </form>
  )
};