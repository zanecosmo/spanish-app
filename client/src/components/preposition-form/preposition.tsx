import React, { ChangeEvent, FC, FormEvent } from "react";
import styles from "../../styles/Styles.module.css";
import { PrepositionAction } from "../TEST/reducers/preposition";
import { ExtractedPreposition, FormProps } from "../TEST/types";

export const Preposition: FC<FormProps<ExtractedPreposition, PrepositionAction>> = (props) => {
  const { state, dispatch, readOnly, usingEnglish } = props;

  const actionType = usingEnglish ? "english" : "spanish";

  return (
    <input
      type="text"
      value={usingEnglish ? state.english : state.spanish}
      className={styles["username login"]}
      readOnly={readOnly}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: actionType as PrepositionAction["type"], inputValue: e.target.value })
      }}
    />
  );
};