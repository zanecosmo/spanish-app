import React, { ChangeEvent, Dispatch, FC, FormEvent } from "react";
import styles from "../../styles/Styles.module.css";
import { ConjunctionAction } from "../TEST/reducers/conjunction";
import { ExtractedConjunction, FormProps } from "../TEST/types";

export const Conjunction: FC<FormProps<ExtractedConjunction, ConjunctionAction>> = (props) => {
  const { state, dispatch, readOnly, usingEnglish } = props;

  const actionType = usingEnglish ? "english" : "spanish";

  return (
      <input
        type="text"
        value={usingEnglish ? state.english : state.spanish}
        className={styles["username login"]}
        readOnly={readOnly}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: actionType as ConjunctionAction["type"], inputValue: e.target.value })
        }}
      />
  );
};