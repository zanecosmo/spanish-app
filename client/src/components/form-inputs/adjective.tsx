import React, { ChangeEvent, FC } from "react";
import styles from "../../styles/Styles.module.css";
import { ExtractedAdjective, NewFormProps } from "../../types";

export const Adjective: FC<NewFormProps> = (props) => {
  const { wordSelected, setWordSelected, readOnly, usingEnglish } = props;
  
  const lang: string = usingEnglish ? "eng" : "span";

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const state = wordSelected.state as ExtractedAdjective;

    const newState: ExtractedAdjective = {
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
    console.log((wordSelected.state as ExtractedAdjective)[name])

    return (
      <div>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type="text"
          name={name}
          className={styles["username login"]}
          value={(wordSelected.state as ExtractedAdjective)[name].wordPair[lang]}
          readOnly={readOnly}
          onChange={handleChange}
          />
      </div>
    );
  };
  
  const tableInputNames: string[] = [ "masc.sg", "masc.pl", "fem.sg", "fem.pl" ];
  const inputElements: JSX.Element[] = tableInputNames.map(name => renderInput(name));

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
          <td>{inputElements[0]}</td>
          <td>{inputElements[1]}</td>
        </tr>
        <tr>
          <th>Fem.</th>
          <td>{inputElements[2]}</td>
          <td>{inputElements[3]}</td>
        </tr>
      </tbody>
    </table>
  );
};