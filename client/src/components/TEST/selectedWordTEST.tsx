import React, { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { useStore } from "../../state/store"
import { PartsOfSpeech, Roles, Store } from "../../types";
import { EditGroups } from "../edit-groups";
import { FormSelector } from "../form-selector";
import { Action, useExtendedWordState } from "./extended-word-state-hook";
import { initialPronounState } from "./reducers/pronoun";
import { PronounFormProps } from "./TEST-pronoun-state";
import { ExtractedPronoun, ExtractedState, ExtractedWord, FormProps } from "./types";

interface SelectedWordProps {
  word: ExtractedWord,
  setWordSelected: Dispatch<SetStateAction<ExtractedWord | null>>
};

export const SelectedWord: FC<SelectedWordProps> = ({ word, setWordSelected }) => {
  const isAdmin = useStore((state: Store) => state.auth.user!.role === Roles.ADMIN);

  const [ state, dispatch ] = useExtendedWordState(word.partOfSpeech, word.structure);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ isDeleting, setIsDeleting ] = useState(false);
  const [ usingEnglish, setUsingEnglish ] = useState(false);
  const [ isEditingGroup, setIsEditingGroup ] = useState(false);

  // if (!state || !dispatch) throw Error("REDUCER FAILED");

  const editWord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("FETCH UPDATE WORD");
    setWordSelected(null);
  };

  const formProps: FormProps<ExtractedState, Action> = {
    state: state,
    dispatch: dispatch,
    readOnly: !isEditing,
    usingEnglish: usingEnglish
  };

  const pronounProps = {
    pronounState: (word.structure ? word.structure : initialPronounState) as ExtractedPronoun,
    readOnly: !isEditing,
    usingEnglish: usingEnglish,
  };

  return (
    <div>
      <button onClick={() => setWordSelected(null)}>Back</button>

      {(isAdmin && isEditing) || (isAdmin && isDeleting)
        ? null
        : (<div>
            <button type="button" onClick={() => setIsEditing(true)}>Edit Word</button>
            <button type="button" onClick={() => setIsDeleting(true)}>Delete Word</button>
          </div>)}

      <form onSubmit={editWord}>
        <div>{`Part of Speech: ${word.partOfSpeech}`}</div>

          <button type="button" onClick={() => !usingEnglish && setUsingEnglish(true)}>English</button>
          <button type="button" onClick={() => usingEnglish && setUsingEnglish(false)}>Spanish</button>

          <FormSelector partOfSpeech={word.partOfSpeech} formProps={formProps} pronounFormProps={pronounProps}/>

          {(isAdmin && isEditing)
            ? (<div>
                <button type="submit">Submit</button>
                {/* also need to reset state here vv */}
                <button type="button" onClick={() => isEditing && setIsEditing(false)}>Cancel</button> 
              </div>)
            : null}
      </form>

      {isEditingGroup
        ? <EditGroups setGroupBeingEdited={setIsEditingGroup}/>
        : (<div>
            <div>{`Group: ${word.group ? word.group : "None"}`}</div>
            <button type="button" onClick={() => setIsEditingGroup(true)}>Edit Group</button>
          </div>)}
    </div>
  );
};