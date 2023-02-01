import React, { ChangeEvent, FC } from "react";
import styles from "../../styles/Styles.module.css";
import { Gender, WordPairWithID } from "../../types";
import { ExtractedPronoun, NewFormProps } from "../../types";

export const Pronoun: FC<NewFormProps> = (props) => {
  const { wordSelected, setWordSelected, readOnly, usingEnglish } = props;
  
  const lang: string = usingEnglish ? "eng" : "span";

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const state = wordSelected.state as ExtractedPronoun;

    const newState: ExtractedPronoun = e.target.name === "gender"
      ? ({
          ...state,
          [e.target.name]: e.target.value as Gender
        })
      : ({
          ...state,
          [e.target.name]: {
            ...(state[e.target.name] as WordPairWithID),
            wordPair: {
              ...(state[e.target.name] as WordPairWithID).wordPair,
              [lang]: e.target.value
            }
          }
        });

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
          value={((wordSelected.state as ExtractedPronoun)[name] as WordPairWithID).wordPair[lang]}
          readOnly={readOnly}
          onChange={handleChange}
          />
      </div>
    );
  };

  const tableInputNames: string[] = [
    "nom.sg",
    "nom.pl",
    "dat.sg",
    "dat.pl",
    "acc.sg",
    "acc.pl",
    "gen.masc.sg",
    "gen.masc.pl",
    "gen.fem.sg",
    "gen.fem.sg"
  ];
  
  const inputElements: JSX.Element[] = tableInputNames.map(name => renderInput(name));

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
            <th>Nominative</th>
            <td>{inputElements[0]}</td>
            <td>{inputElements[1]}</td>
          </tr>
          <tr>
            <th>Dative</th>
            <td>{inputElements[2]}</td>
            <td>{inputElements[3]}</td>
          </tr>
          <tr>
            <th>Accusitive</th>
            <td>{inputElements[4]}</td>
            <td>{inputElements[5]}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>Genitive:</caption>
        <tbody>
          <tr>
            <th>Masc.</th>
            <td>{inputElements[6]}</td>
            <td>{inputElements[7]}</td>
          </tr>
          <tr>
            <th>Fem.</th>
            <td>{inputElements[8]}</td>
            <td>{inputElements[9]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};