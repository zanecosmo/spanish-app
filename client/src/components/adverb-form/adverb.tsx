import React, { ChangeEvent, FC, FormEvent } from "react";
import styles from "../../styles/Styles.module.css";
import { AdverbAction } from "../TEST/reducers/adverb";
import { ExtractedAdverb, FormProps } from "../TEST/types";

export const Adverb: FC<FormProps<ExtractedAdverb, AdverbAction>> = (props) => {
  const { state, dispatch, readOnly, usingEnglish } = props;

  const actionType = usingEnglish ? "englsh" : "spanish";

  return (
    <form>
      <input
        type="text"
        value={usingEnglish ? state.english : state.spanish}
        className={styles["username login"]}
        readOnly={readOnly}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: (actionType as AdverbAction["type"]), inputValue: e.target.value });
        }}
      />
    </form>
  );
};