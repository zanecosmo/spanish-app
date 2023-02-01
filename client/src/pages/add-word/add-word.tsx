import React, { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { ExtractedWord, PartsOfSpeech } from "../../types";
import { FormSelector } from "../../components/form-selector";
import { generateInitialState } from "../../state/initial-states";

interface AddNewWordProps {
  setWordBeingAdded: Dispatch<SetStateAction<boolean>>;
};

export const AddNewWord: FC<AddNewWordProps> = ({ setWordBeingAdded }): JSX.Element => {
  // const [ partOfSpeech, setPartOfSpeech ] = useState<PartsOfSpeech | null>(null);
  const [ wordSelected, setWordSelected ] = useState<ExtractedWord | null>(null);
  const [ usingEnglish, setUsingEnglish ] = useState(false);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // setPartOfSpeech(e.target.value as PartsOfSpeech);
    const newWord: ExtractedWord =  generateInitialState(e.target.value as PartsOfSpeech);
    setWordSelected(newWord);
    console.log(newWord);
  };

  const addWord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // take the form data, convert it to a word DTO,
    // and sail that bitch across the sea until it hits the rocky shoreline of our servers
    console.log("FETCH ADD WORD");
    setWordBeingAdded(false);
  };

  const createPartsOfSpeechSelect = () => {
    const partsOfSpeech: Array<string> = [];
    for (let part in PartsOfSpeech) partsOfSpeech.push(part);
    return partsOfSpeech.map((part, i) => <option key={i} value={part}>{part}</option>);
  };

  return (
    <div>
      <button type="button" onClick={() => setWordBeingAdded(false)}>Cancel</button>

        <label htmlFor="part-of-speech">Part of Speech:</label>
        <select
          name="part-of-speech"
          id="part-of-speech"
          defaultValue="select"
          onChange={handleSelectChange}
        >
          <option hidden value="select">select an option</option>
          {createPartsOfSpeechSelect()}
        </select>

        {wordSelected && (
          <form onSubmit={addWord}>
          <div>
            <button type="button" onClick={() => !usingEnglish && setUsingEnglish(true)}>English</button>
            <button type="button" onClick={() => usingEnglish && setUsingEnglish(false)}>Spanish</button>
          </div>
          
          <FormSelector
            partOfSpeech={wordSelected.partOfSpeech}
            formProps={{
              wordSelected: wordSelected!,
              setWordSelected: setWordSelected,
              readOnly: false,
              usingEnglish: usingEnglish
            }}
          />

          <button type="submit">Submit</button>
        </form>
        )}
    </div>
  );
};