import React, { FC, useState } from "react";
import { useStore } from "../state/store";
import { BaseWordPairDTO, ExtendedWordDTO, ExtendedWordPairDTO, Gender, GrammaticalNumber, PartsOfSpeech, ResponseBody, Roles, Store } from "../types";
import { executeFetch } from "../utils";
import { AddNewWord } from "./TEST/adding-new-word";
import { SelectedWord } from "./TEST/selectedWordTEST";
import { ExtractedConjunction, ExtractedNoun, ExtractedState, ExtractedWord } from "./TEST/types";

const convertToForm = (partOfSpeech: PartsOfSpeech, { wordPairs }: ExtendedWordDTO) => {
  if (wordPairs.length === 0) throw Error("EMPTY WORD PAIR ARRAY");

  switch (partOfSpeech) {
    
    case PartsOfSpeech.NOUN: {
      const singular = wordPairs.find(wp => wp.number === GrammaticalNumber.SINGULAR);
      const plural = wordPairs.find(wp => wp.number === GrammaticalNumber.PLURAL);
    
      if (!singular || !plural) throw Error("MISSING NOUN");
  
      return {
        gender: (wordPairs[0].gender as Gender),
        english: {
          singular: singular.english,
          plural: plural.english
        },
        spanish: {
          singular: singular.spanish,
          plural: plural.spanish
        }
      };
    };

    case PartsOfSpeech.CONJUNCTION: {
      return {
        english: wordPairs[0].english,
        spanish: wordPairs[0].spanish
      };
    };
  };

  throw Error("INVALID PART OF SPEECH OR UNIMPLEMENTED");
};

const getExtractedWord = async (id: number): Promise<ExtractedWord> => {
  const response: Response = await executeFetch("GET", `http://localhost:8000/get-word/${id}`);
  const { data: word, error, message }: ResponseBody<ExtendedWordDTO> = await response.json();

  if (!([200, 201, 204].includes(response.status)) || !word) {
    throw Error(`
      RESPONSE:
      STATUS -- ${response.status} \n
      ERROR -- ${error ? error : "NONE"} \n
      MESSAGE -- ${message ? message : "NONE"}
    `);
  };
  
  const partOfSpeech = word.wordPairs[0].part_of_speech;
  const extractedState: ExtractedState = convertToForm(partOfSpeech, word);

  return {
    partOfSpeech: word.wordPairs[0].part_of_speech,
    group: word.wordPairs[0].group,
    structure: extractedState
  };
};

export const BaseWordListView: FC = () => {

  const isAdmin = useStore((state: Store) => state.auth.user!.role === Roles.ADMIN);

  const [ isLoading, setIsLoading ] = useState(false);
  const [ wordSelected, setWordSelected ] = useState<ExtractedWord | null>(null);
  const [ wordBeingAdded, setWordBeingAdded ] = useState(false)

  //

  const { getWord, wordList } = useStore((state: Store) => state.home);

  const get = async (id: number): Promise<void> => {
    setIsLoading(true);
    setWordSelected(await getExtractedWord(id));
    setIsLoading(false);
  };

  if (isLoading) return (<>LOADING...</>);

  if (wordSelected) {
    return (
      <SelectedWord setWordSelected={setWordSelected} word={wordSelected} />
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