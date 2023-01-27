import React, { FC, FormEvent } from "react";
import styles from "../../styles/Styles.module.css";
import { AdjectiveAction } from "../TEST/reducers/adjective";
import { ExtractedAdjective, FormProps } from "../TEST/types";

export const Adjective: FC<FormProps<ExtractedAdjective, AdjectiveAction>> = (props) => {
  const { state, dispatch, readOnly, usingEnglish } = props;

  const actionType = {
    masculine: {
      singular: usingEnglish ? "english.masculine.singular" : "spanish.masculine.singular",
      plural: usingEnglish ? "english.masculine.plural" : "spanish.masculine.plural"
    },
    feminine: {
      singular: usingEnglish ? "english.feminine.singular" : "spanish.feminine.singular",
      plural: usingEnglish ? "english.feminine.plural" : "spanish.feminine.plural"
    }
  };

  return (
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
          <th>Masc.</th>
          <td>
            <input
              type="text"
              value={usingEnglish ? state.english.masculine.singular : state.spanish.masculine.singular}
              className={styles["username login"]}
              readOnly={readOnly}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: actionType.masculine.singular as AdjectiveAction["type"],
                  inputValue: e.target.value
                });
              }}
            />
          </td>
          <td>
            <input
              type="text"
              value={usingEnglish ? state.english.masculine.plural : state.spanish.masculine.plural}
              className={styles["username login"]}
              readOnly={readOnly}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: actionType.masculine.plural as AdjectiveAction["type"],
                  inputValue: e.target.value
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <th>Fem.</th>
          <td>
            <input
              type="text"
              value={usingEnglish ? state.english.feminine.singular : state.spanish.feminine.singular}
              className={styles["username login"]}
              readOnly={readOnly}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: actionType.feminine.singular as AdjectiveAction["type"],
                  inputValue: e.target.value
                });
              }}
            />
          </td>
          <td>
            <input
              type="text"
              value={usingEnglish ? state.english.feminine.plural : state.spanish.feminine.plural}
              className={styles["username login"]}
              readOnly={readOnly}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: actionType.feminine.plural as AdjectiveAction["type"],
                  inputValue: e.target.value
                });
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};