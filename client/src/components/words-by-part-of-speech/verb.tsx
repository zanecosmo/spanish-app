import React, { FC } from "react";
import { useStore } from "../../state/store"
import { ExtendedWordPairDTO, GrammaticalNumber, Store } from "../../types";

export const Verb: FC = () => {
  const wordPairs = useStore((state: Store) => state.home.selectedWord!.wordPairs);

  const getWordPairsByPerson = (wordPairs: ExtendedWordPairDTO[], callback: (wp: ExtendedWordPairDTO) => boolean) => {
      const wordPairsByPerson = wordPairs.filter(callback);
      return {
          singular: wordPairsByPerson.find(wp => wp.number === GrammaticalNumber.SINGULAR),
          plural: wordPairsByPerson.find(wp => wp.number === GrammaticalNumber.PLURAL),
      };
  };
  
  const infinitive = wordPairs.find(wp => wp.infinitive === true)?.english;
  const firstPerson = getWordPairsByPerson(wordPairs, wp => wp.person === 1);
  const secondPerson = getWordPairsByPerson(wordPairs, wp => wp.person === 2);
  const thirdPerson = getWordPairsByPerson(wordPairs, wp => wp.person === 3);

  return (
      <div>
          <div>Infinitive: {infinitive}</div>
          <div>
              <table>
                  <thead>
                      <tr>
                          <th></th>
                          <th>Singular</th>
                          <th>Plural</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <th>1st Person</th>
                          <td>{firstPerson.singular?.english}</td>
                          <td>{firstPerson.plural?.english}</td>
                      </tr>
                      <tr>
                          <th>2nd Person</th>
                          <td>{secondPerson.singular?.english}</td>
                          <td>{secondPerson.plural?.english}</td>
                      </tr>
                      <tr>
                          <th>3rd Person</th>
                          <td>{thirdPerson.singular?.english}</td>
                          <td>{thirdPerson.plural?.english}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  );
};