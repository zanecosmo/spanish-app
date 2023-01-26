import React, { ChangeEvent, Dispatch, FC, FormEvent, useState } from "react";
import styles from "../../styles/Styles.module.css";
import { NounAction } from "../TEST/reducers/noun";
import { ExtractedNoun, FormProps } from "../TEST/types";

export const Noun: FC<FormProps<ExtractedNoun, NounAction>> = (props): JSX.Element => {
  const { state, dispatch, readOnly, usingEnglish } = props;

  const actionType = {
    singular: usingEnglish ? "english.singular" : "spanish.singular",
    plural: usingEnglish ? "english.plural" : "spanish.plural"
  };

  return (
    <div>
      <input 
          name="gender"
          id="gender"
          type="text"
          readOnly={readOnly}
          value={state.gender}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: "gender", inputValue: e.target.value });
          }}
          />
        <input 
          name="singular"
          id="singular"
          type="text"
          readOnly={readOnly}
          value={usingEnglish ? state.english.singular : state.spanish.singular}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: actionType.singular as NounAction["type"], inputValue: e.target.value });
          }}
        />
        <input 
          name="plural"
          id="plural"
          type="text"
          readOnly={readOnly}
          value={usingEnglish ? state.english.plural : state.spanish.plural}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: actionType.plural as NounAction["type"], inputValue: e.target.value });
          }}
        />
    </div>
  );
};