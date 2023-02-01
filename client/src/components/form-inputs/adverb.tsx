import React, { ChangeEvent, FC } from "react";
import styles from "../../styles/Styles.module.css";
import { ExtractedAdverb, NewFormProps } from "../../types";

export const Adverb: FC<NewFormProps> = (props) => {
  const { wordSelected, setWordSelected, readOnly, usingEnglish } = props;
  
  const lang: string = usingEnglish ? "eng" : "span";

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const state = wordSelected.state as ExtractedAdverb;

    const newState: ExtractedAdverb = {
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
      value={(wordSelected.state as ExtractedAdverb).wordPair[lang]}
      readOnly={readOnly}
      onChange={handleChange}
    />
  );
};