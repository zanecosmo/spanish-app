import React, { ChangeEvent, Dispatch, FC, FormEvent, Reducer, SetStateAction, useReducer, useState } from "react";
import { useStore } from "../../state/store"
import { ExtendedWordDTO, Gender, PartsOfSpeech, Roles, Store } from "../../types";
import { EditGroups } from "../edit-groups";
import { FormSelector } from "../form-selector";
import { Noun } from "../noun-form/noun";
import { Action, useExtendedWordState } from "./extended-word-state-hook";
import { ExtractedNoun, ExtractedState, ExtractedWord, FormProps } from "./types";

interface AddNewWordProps {
  setWordBeingAdded: Dispatch<SetStateAction<boolean>>;
};

const createPartsOfSpeechSelect = () => {
  const partsOfSpeech: Array<string> = [];
  for (let part in PartsOfSpeech) partsOfSpeech.push(part);
  return partsOfSpeech.map((part, i) => <option key={i} value={part}>{part}</option>);
};

interface NewWordFormProps {
  partOfSpeech: PartsOfSpeech;
  setWordBeingAdded: Dispatch<SetStateAction<boolean>>;
};

const NewWordForm: FC<NewWordFormProps> = ({ partOfSpeech, setWordBeingAdded }) => {

  const [ state, dispatch ] = useExtendedWordState(partOfSpeech);
  const [ usingEnglish, setUsingEnglish ] = useState(false);

  const addWord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // take the form data, convert it to a word DTO,
    // and sail that bitch across the sea until it hits the rocky shoreline of our servers
    console.log("FETCH ADD WORD");
    setWordBeingAdded(false);
  };

  const formProps: FormProps<ExtractedState, Action> = {
    state: state as ExtractedState,
    dispatch: dispatch,
    readOnly: false,
    usingEnglish: usingEnglish
  };

  return (
    <form onSubmit={addWord}>
      <div>
        <button type="button" onClick={() => !usingEnglish && setUsingEnglish(true)}>English</button>
        <button type="button" onClick={() => usingEnglish && setUsingEnglish(false)}>Spanish</button>
      </div>
      {/* <FormSelector partOfSpeech={partOfSpeech} formProps={formProps}/> */}
      <button type="submit">Submit</button>
    </form>
  );
};

export const AddNewWord: FC<AddNewWordProps> = ({ setWordBeingAdded }): JSX.Element => {

  const [ partOfSpeech, setPartOfSpeech ] = useState<PartsOfSpeech | null>(null);

  return (
    <div>
      <button type="button" onClick={() => setWordBeingAdded(false)}>Cancel</button>

      
        <label htmlFor="part-of-speech">Part of Speech:</label>
        <select
          name="part-of-speech"
          id="part-of-speech"
          defaultValue="select"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setPartOfSpeech(e.target.value as PartsOfSpeech)}
        >
          <option hidden value="select">select an option</option>
          {createPartsOfSpeechSelect()}
        </select>

        {partOfSpeech && (
          <NewWordForm
            key={partOfSpeech}
            partOfSpeech={partOfSpeech}
            setWordBeingAdded={setWordBeingAdded}
          />
        )}
    </div>
  );
};