import React, { ChangeEvent, FC, useState } from "react";
import styles from "../../styles/Styles.module.css";
import { ExtendedWordPairDTO, ExtractedVerb, ExtractedWord, PartsOfSpeech } from "../../types";
import { NewFormProps } from "../../types";

const convertToVerb = (word: ExtractedWord) => {
  const wordPairs = Array<ExtendedWordPairDTO>(7);

  for (let i = 0; i <= wordPairs.length; i++) {
    const isEven = i % 2 === 0
    const number = isEven ? "sg" : "pl";
    const person = (i - (isEven ? 0 : 1)) / 2;

    const personStr = 
      person === 1 ? `${person}st`
      : person === 2 ? `${person}nd`
      : `${person}rd`
    
      const isInfinitive = i === wordPairs.length;
      
      const wordPairState = isInfinitive
        ? (word.state as ExtractedVerb)["inf"]
        : (word.state as ExtractedVerb)[`${personStr}.${number}`];

    wordPairs[i] = {
      infinitive: isInfinitive,
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

  console.log(wordPairs);
  // return wordPairs;
}

export const Verb: FC<NewFormProps> = (props) => {
  const { wordSelected, setWordSelected, readOnly, usingEnglish } = props;
  
  const lang: string = usingEnglish ? "eng" : "span";

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const state = wordSelected.state as ExtractedVerb;

    const newState: ExtractedVerb = {
      ...state,
      [e.target.name]: {
        ...state[e.target.name],
        wordPair: {
          ...state[e.target.name].wordPair,
          [lang]: e.target.value
        }
      }
    };

    setWordSelected({ ...wordSelected, state: newState });
  };

  const renderInput = (name: string, label?: string):JSX.Element => {
    return (
      <div>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type="text"
          name={name}
          className={styles["username login"]}
          value={(wordSelected.state as ExtractedVerb)[name].wordPair[lang]}
          readOnly={readOnly}
          onChange={handleChange}
          />
      </div>
    );
  };
  
  const tableInputNames: string[] = [ "1st.sg", "1st.pl", "2nd.sg", "2nd.pl", "3rd.sg", "3rd.pl" ];
  
  const inputElements: JSX.Element[] = tableInputNames.map(name => renderInput(name));
  
  return (
    <div>
      {renderInput("inf", "Infinitive")}
      <br />
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
              <td>{inputElements[0]}</td>
              <td>{inputElements[1]}</td>
            </tr>
            <tr>
              <th>2nd Person</th>
              <td>{inputElements[2]}</td>
              <td>{inputElements[3]}</td>
            </tr>
            <tr>
              <th>3rd Person</th>
              <td>{inputElements[4]}</td>
              <td>{inputElements[5]}</td>
            </tr>
          </tbody>
      </table>
    </div>
  )
};