import React, { ChangeEvent, FC } from "react";
import styles from "../../styles/Styles.module.css";
import { Gender, WordPairWithID } from "../../types";
import { ExtractedNoun, NewFormProps } from "../../types";

export const Noun: FC<NewFormProps> = (props): JSX.Element => {
  const { wordSelected, setWordSelected, readOnly, usingEnglish } = props;
  
  const lang: string = usingEnglish ? "eng" : "span";

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const state = wordSelected.state as ExtractedNoun;

    const newState: ExtractedNoun = e.target.name === "gender"
      ? {
        ...state,
        [e.target.name]: e.target.value as Gender
      }
      : {
        ...state,
        [e.target.name]: {
          ...(state[e.target.name] as WordPairWithID),
          wordPair: {
            ...(state[e.target.name] as WordPairWithID).wordPair,
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
          value={((wordSelected.state as ExtractedNoun)[name] as WordPairWithID).wordPair[lang]}
          readOnly={readOnly}
          onChange={handleChange}
          />
      </div>
    );
  };
  
  const inputElements: JSX.Element[] = [ "sg", "pl" ].map(name => renderInput(name));

  return (
    <div>
      <label htmlFor="gender">Gender:</label>
      <select
        name="gender"
        id="gender"
        defaultValue="select"
        onChange={handleChange}
      >
        <option hidden value="select">select an option</option>
        <option value={Gender.MASCULINE as string}>{Gender.MASCULINE as string}</option>
        <option value={Gender.FEMININE as string}>{Gender.FEMININE as string}</option>
      </select>
      {inputElements[0]}
      {inputElements[1]}
    </div>
  );
};