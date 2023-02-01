import React, { FC, useEffect, useState } from "react";
import { useStore } from "../../state/store";
import { BaseWordPairDTO, Roles, Store } from "../../types";
import { AddNewWord } from "../add-word/add-word";
import { SelectedWord } from "../selected-word/selected-word";
import { ExtractedWord } from "../../types";
import { getExtractedWord } from "../../api/get-word";

export const BaseWordListView: FC = () => {

  const isAdmin = useStore((state: Store) => state.auth.user!.role === Roles.ADMIN);
  const { getWordsPayload, wordList } = useStore((state: Store) => state.home);

  const [ isLoading, setIsLoading ] = useState(true);
  const [ wordSelected, setWordSelected ] = useState<ExtractedWord | null>(null);
  const [ wordBeingAdded, setWordBeingAdded ] = useState(false);

  useEffect(() => {
    console.log("USE EFFECT");
    (async () => {
      await getWordsPayload();
      setIsLoading(false);
    })();    
  }, []);

  const get = async (id: number): Promise<void> => {
    setIsLoading(true);
    setWordSelected(await getExtractedWord(id));
    setIsLoading(false);
  };

  if (isLoading) return (<>LOADING...</>);

  if (wordSelected) {
    return (
      <SelectedWord setWordSelected={setWordSelected} wordSelected={wordSelected} />
    );  
  };

  if (wordBeingAdded) {
    return (
      <AddNewWord setWordBeingAdded={setWordBeingAdded} />
    );
  };

  return (
    <div>
      {!isAdmin ? null : <button onClick={() => setWordBeingAdded(true)}>ADD WORD</button>}
      <table>
          <thead>
              <tr>
                  <td>English</td>
                  <td>Spanish</td>
                  <td>Difficulty</td>
              </tr>
          </thead>
          <tbody>
          {wordList && wordList.map((word: BaseWordPairDTO) => (
              <tr key={word.word_pair_id} className="word-pair-list-item" onClick={(_e) => get(word.parent_word_id)}>
                  <td>{word.english}</td>
                  <td>{word.spanish}</td>
                  <td>{word.difficulty}</td>
              </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};