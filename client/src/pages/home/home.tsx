import React, { FC, FormEvent, useEffect, useState } from "react";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { WordView } from "../../components/selected-word";
import { BaseWordListView } from "../../components/world-list";
import { useStore } from "../../state/store";
import { Store } from "../../types";


export const Home: FC = (): JSX.Element => {

  const [ wordSelected, setWordSelected ] = useState(false);

  ////

  const { getWordsPayload, selectedWord, AddNewWord, isWordSelected } = useStore((state: Store) => state.home);
  const { isAdding, isEditing, isDeleting } = useStore((state: Store) => state.home.actions);
  useEffect(() => void getWordsPayload(), []);

  const addWord = (event: FormEvent<HTMLFormElement>) => {
    AddNewWord()
    event.preventDefault();
  };

  const editWord = (event: FormEvent<HTMLFormElement>) => {
    console.log("EDIT WORD CLICKED");
    event.preventDefault();
  };

  const deleteWord = (event: FormEvent<HTMLFormElement>) => {
    console.log("DELETE WORD CLICKED");
    event.preventDefault();
  };

  const doNull = (event: FormEvent<HTMLFormElement>) => {
    console.log("SOMEHOW A DO NULL BUTTON WAS CLICKED EVEN THO ONE DOESN'T EXIST");
    event.preventDefault();
  };

  const displayCorrectWordView = () => {
    if (!isWordSelected) return <BaseWordListView />

    if (isAdding) return (
      <WordView partOfSpeech={null} submitForm={addWord} />
    );

    if (isEditing) return (
      <WordView partOfSpeech={selectedWord!.wordPairs[0].part_of_speech} submitForm={editWord} />
    );

    if (isDeleting) return (
      <WordView partOfSpeech={selectedWord!.wordPairs[0].part_of_speech} submitForm={deleteWord} />
    );

    return (
      <WordView partOfSpeech={selectedWord!.wordPairs[0].part_of_speech} submitForm={doNull} />
    );
  };

  const display = () => {
    return <BaseWordListView />
  }

  return (
      <div>
        <NavBar />
        <br />
        {display()}
      </div>
  );
};