import React, { ChangeEvent, FC, useState } from "react";
import styles from "../../styles/Styles.module.css";
import { EditableVerbState, ExtractedVerb, NewFormProps } from "../TEST/types";

export const Verb: FC<NewFormProps> = (props) => {
  const { state: initialState, readOnly, usingEnglish } = props;

  const [ state, setState ] = useState<EditableVerbState>([ initialState as ExtractedVerb, null ]);

  const currentState = state[1] ? state[1] : state[0];
  
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    if (!state) return;
    const newState: ExtractedVerb = { ...currentState, [e.target.name]: e.target.value };
    setState([ state[0], newState ]);
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
  
  const tableInputNames: string[] = [ "1st.sg", "1st.pl", "2nd.sg", "2nd.pl", "3rd.sg", "3rd.pl" ];
  
  const lang: string = usingEnglish ? "eng" : "span";
  
  const inputElements: JSX.Element[] = tableInputNames.map(name => renderInput(`${name}.${lang}`));
  
  return (
    <div>
      {renderInput("infinitive", "Infinitive")}
      <br />
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
              <th>1st Person</th>
              <td>{inputElements[0]}</td>
              <td>{inputElements[1]}</td>
            </tr>
            <tr>
              <th>2nd Person</th>
              <td>{inputElements[2]}</td>
              <td>{inputElements[3]}</td>
            </tr>
            <tr>
              <th>3rd Person</th>
              <td>{inputElements[4]}</td>
              <td>{inputElements[5]}</td>
            </tr>
          </tbody>
      </table>
    </div>
  )
};