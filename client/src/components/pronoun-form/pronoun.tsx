import React, { ChangeEvent, FC, useState } from "react";
import styles from "../../styles/Styles.module.css";
import { Gender } from "../../types";
import { initialPronounState, tableInputNames } from "../TEST/reducers/pronoun";
import { ExtractedPronoun, EditablePronounState, NewFormProps } from "../TEST/types";

export const Pronoun: FC<NewFormProps> = (props) => {
  const { readOnly, usingEnglish } = props;

  const initialState = props.state ? props.state : initialPronounState;

  const [ state, setState ] = useState<EditablePronounState>([ initialState as ExtractedPronoun, null ]);

  const currentState = state[1] ? state[1] : state[0];
  
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    if (!state) return;
    const newState: ExtractedPronoun = { ...currentState, [e.target.name]: e.target.value };
    setState([ state[0], newState ])
  };

  const renderInput = (name: string, label?: string):JSX.Element => {
    return (
      <div>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type="text"
          name={name}
          className={styles["username login"]}
          value={currentState[name]}
          readOnly={readOnly}
          onChange={handleChange}
          />
      </div>
    );
  };

  const lang: string = usingEnglish ? "eng" : "span";
  
  const inputElements: JSX.Element[] = tableInputNames.map(name => renderInput(`${name}.${lang}`));

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