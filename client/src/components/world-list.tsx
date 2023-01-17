import React, { FC } from "react";
import { useStore } from "../state/store";
import { BaseWordPairDTO, Store } from "../types";

export const BaseWordListView: FC = () => {
  const { getWord, wordList } = useStore((state: Store) => state.home);

  return (
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
              <tr key={word.word_pair_id} className="word-pair-list-item" onClick={(_e) => getWord(word.parent_word_id)}>
                  <td>{word.english}</td>
                  <td>{word.spanish}</td>
                  <td>{word.difficulty}</td>
              </tr>
          ))}
          </tbody>
      </table>
  );
};