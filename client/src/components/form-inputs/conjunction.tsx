import React, { ChangeEvent, FC } from "react";
import styles from "../../styles/Styles.module.css";
import { ExtractedConjunction, NewFormProps } from "../../types";

export const Conjunction: FC<NewFormProps> = (props) => {
  const { wordSelected, setWordSelected, readOnly, usingEnglish } = props;
  
  const lang: string = usingEnglish ? "eng" : "span";

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const state = wordSelected.state as ExtractedConjunction;

    const newState: ExtractedConjunction = {
      ...state,
      wordPair: {
        ...state.wordPair,
        [lang]: e.target.value
      }
    };

    setWordSelected({ ...wordSelected, state: newState });
  };

  return (
    <input
      type="text"
      name={lang}
      className={styles["username login"]}
      value={(wordSelected.state as ExtractedConjunction).wordPair[lang]}
      readOnly={readOnly}
      onChange={handleChange}
    />
  );
};