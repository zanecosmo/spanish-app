import React, { FC } from "react";
import { useStore } from "../state/store"
import { ExtendedWordDTO, PartsOfSpeech, Store } from "../types";
import { EditGroups } from "./edit-groups";
import { Adjective } from "./words-by-part-of-speech/adjective";
import { Adverb } from "./words-by-part-of-speech/adverb";
import { Conjunction } from "./words-by-part-of-speech/conjunction";
import { Noun } from "./words-by-part-of-speech/noun";
import { Preposition } from "./words-by-part-of-speech/preposition";
import { Pronoun } from "./words-by-part-of-speech/pronoun";
import { Verb } from "./words-by-part-of-speech/verb";

export const ExpandedWordView: FC = () => {
  const selectedWord: ExtendedWordDTO = useStore((state: Store) => state.home.selectedWord!);
  const nullifySelectedWord = useStore((state: Store) => state.home.nullifySelectedWord!);

  const displayCorrectWordType = (): JSX.Element => {
    console.log(selectedWord.wordPairs[0].part_of_speech);
    switch (selectedWord.wordPairs[0].part_of_speech) {
      case PartsOfSpeech.VERB: return <Verb />;
      case PartsOfSpeech.ADVERB: return <Adverb />;
      case PartsOfSpeech.NOUN: return <Noun />;
      case PartsOfSpeech.PRONOUN: return <Pronoun />;
      case PartsOfSpeech.ADJECTIVE: return <Adjective />;
      case PartsOfSpeech.PREPOSITION: return <Preposition />;
      case PartsOfSpeech.CONJUNCTION: return <Conjunction />;
    };
  };

  const goBack = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => nullifySelectedWord();

  return (
    <div>
      <div onClick={goBack}>Back</div>
      <div>{`GROUP: ${selectedWord.group ? selectedWord.group : "None"}`}</div>
      <div>{`PART OF SPEECH: ${selectedWord.wordPairs[0].part_of_speech}`}</div>
      {displayCorrectWordType()}
      <EditGroups />
    </div>);
};

// store all groups in state: string[] --------
// map over existing groups
// produce a dropdown option which displays each group
// and which when clicked will assign that value to the word in question

// button which says: create new group
// textbox which when submitted adds that value to the list of groups in state as a group
// when word is finished being edited submit the word assigned the new group 