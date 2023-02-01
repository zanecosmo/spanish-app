import React, { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { useStore } from "../../state/store"
import { ExtendedWordDTO, ExtendedWordPairDTO, ExtractedVerb, PartsOfSpeech, Roles, Store } from "../../types";
import { EditGroups, EditGroupsProps } from "./edit-groups";
import { FormSelector } from "../../components/form-selector";
import { ExtractedWord, NewFormProps } from "../../types";
import { executeFetch } from "../../utils";

const convertToVerb = (word: ExtractedWord): ExtendedWordDTO => {
  const wordPairs = Array<ExtendedWordPairDTO | null>(7).fill(null);

  for (let i = 0; i < wordPairs.length; i++) {
    
    const isEven = i % 2 === 0
    const number = isEven ? "sg" : "pl";
    const person = ((i - (isEven ? 0 : 1)) / 2) + 1;

    const key = 
      person === 1 ? `${person}st.${number}`
      : person === 2 ? `${person}nd.${number}`
      : person === 3 ? `${person}rd.${number}`
      : "inf";

    const wordPairState = (word.state as ExtractedVerb)[key];

    wordPairs[i] = {
      infinitive: key === "inf",
      spanish: wordPairState.wordPair["span"],
      english: wordPairState.wordPair["eng"],
      parent_word_id: word.id,
      word_pair_id: wordPairState.id,
      part_of_speech: PartsOfSpeech.VERB,
      person: person,
      number: number,
      case: null,
      gender : null,
      group: word.group,
      difficulty: wordPairState.difficulty,
    }
  };


  return {
    id: word.id,
    group: word.group,
    wordPairs: (wordPairs as ExtendedWordPairDTO[])
  };
}

interface SelectedWordProps {
  wordSelected: ExtractedWord,
  setWordSelected: Dispatch<SetStateAction<ExtractedWord | null>>
};

export const SelectedWord: FC<SelectedWordProps> = ({ wordSelected, setWordSelected }) => {
  const isAdmin = useStore((state: Store) => state.auth.user!.role === Roles.ADMIN);

  const [ isEditing, setIsEditing ] = useState(false);
  const [ isDeleting, setIsDeleting ] = useState(false);
  const [ usingEnglish, setUsingEnglish ] = useState(false);
  const [ isEditingGroup, setIsEditingGroup ] = useState(false);

  const editWord = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const wordDTO: ExtendedWordDTO = convertToVerb(wordSelected);
    const response = await executeFetch("PUT", `http://localhost:8000/update-word`, wordDTO)
    console.log(response);
    setWordSelected(null);
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
        <div>{`Part of Speech: ${wordSelected.partOfSpeech}`}</div>

          <button type="button" onClick={() => !usingEnglish && setUsingEnglish(true)}>English</button>
          <button type="button" onClick={() => usingEnglish && setUsingEnglish(false)}>Spanish</button>

          <FormSelector
            partOfSpeech={wordSelected.partOfSpeech}
            formProps={{
              wordSelected: wordSelected,
              setWordSelected: setWordSelected,
              readOnly: !isEditing,
              usingEnglish: usingEnglish
            }}
          />

          {(isAdmin && isEditing)
            ? (<div>
                <button type="submit">Submit</button>
                {/* also need to reset state here vv */}
                <button type="button" onClick={() => isEditing && setIsEditing(false)}>Cancel</button> 
              </div>)
            : null}
      </form>

      {isEditingGroup
        ? (<EditGroups {
            ...{
              setIsEditingGroup: setIsEditingGroup,
              parentWordId: wordSelected.id!,
              wordSelected: wordSelected,
              setWordSelected: setWordSelected,
            }
          } />)
        : (<div>
            <div>{`Group: ${wordSelected.group ? wordSelected.group : "None"}`}</div>
            <button type="button" onClick={() => setIsEditingGroup(true)}>Edit Group</button>
          </div>)}
    </div>
  );
};