import React, { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { useStore } from "../state/store"
import { ExtendedWordDTO, PartsOfSpeech, Roles, Store } from "../types";
import { EditGroups } from "./edit-groups";
import { FormSelector } from "./form-selector";

const createPartsOfSpeechSelect = () => {
  const partsOfSpeech: Array<string> = [];
  for (let part in PartsOfSpeech) partsOfSpeech.push(part);
  return partsOfSpeech.map((part, i) => <option key={i} value={part}>{part}</option>);
};

interface WordViewProps {
  submitForm: ((event: FormEvent<HTMLFormElement>) => void);
  partOfSpeech: PartsOfSpeech | null;
};

export const WordView: FC<WordViewProps> = (props) => {
  const [ partOfSpeech, setPartOfSpeech ] = useState(props.partOfSpeech)
  // console.log(partOfSpeech)
  const isAdmin = useStore((state: Store) => state.auth.user!.role === Roles.ADMIN);

  const { isAdding, isEditing, isDeleting, isEditingGroup } = useStore((state: Store) => state.home.actions);
  const { setIsEditing, setIsDeleting, setIsEditingGroup } = useStore((state: Store) => state.home.actions);

  const selectedWord: ExtendedWordDTO = useStore((state: Store) => state.home.selectedWord!);
  const { nullifySelectedWord, setIsEnglish } = useStore((state: Store) => state.home!);

  const log = () => {
    return <div>{`${partOfSpeech === null}`}</div>
  };

  return (
    <div>
      <button onClick={() => {
        console.log("NULLIFY");
        nullifySelectedWord()
      }}>Back</button>

      {(isAdmin && isEditing) || (isAdmin && isDeleting) || (isAdmin && isAdding)
        ? null
        : (<div>
            <button type="button" onClick={() => setIsEditing(true)}>Edit Word</button>
            <button type="button" onClick={() => setIsDeleting(true)}>Delete Word</button>
          </div>)}

      <form onSubmit={props.submitForm}> {/* pass in a method which either ADDS a new word, or UPDATES a pre-existing one */}

        {(isAdmin && isAdding)
          ? (<div>
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
            </div>)
          : <div>{`Part of Speech: ${partOfSpeech}`}</div>}

        {(isAdmin && isAdding) && partOfSpeech === null
          ? null
          : (<div>
            <button type="button" onClick={() => setIsEnglish(true)}>English</button>
            <button type="button" onClick={() => setIsEnglish(false)}>Spanish</button>
          </div>)}

        {/* {(isAdmin && isAdding) && partOfSpeech === null
          ? null
          : <FormSelector partOfSpeech={partOfSpeech!} />} */}

        {(isAdmin && isEditing) || (isAdmin && isAdding)
          ? (<div>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>)
          : null}

      </form>

      {(isAdmin && isAdding) || (isAdmin && isEditing)
        ? null
        : isEditingGroup
          ? <EditGroups setGroupBeingEdited={setIsEditingGroup}/>
          : <div>
              <div>{`Group: ${selectedWord.group ? selectedWord.group : "None"}`}</div>
              <button type="button" onClick={() => setIsEditingGroup(true)}>Edit Group</button>
            </div>}
    </div>
  );
};