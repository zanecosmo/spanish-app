import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "../../styles/Styles.module.css";
import { Gender } from "../../types";
import { initialPronounState, PronounAction } from "../TEST/reducers/pronoun";
import { PronounFormProps,  } from "../TEST/TEST-pronoun-state";
import { ExtractedPronoun, EditablePronounState } from "../TEST/types";

export const Pronoun: FC<PronounFormProps> = (props) => {
  const { pronounState, readOnly, usingEnglish } = props;

  // if there is props, then set initial state to the props. otherwise set it to null.
  // check state for null before using it.

  const initialState = pronounState ? pronounState : initialPronounState;

  const [ state, setState ] = useState<EditablePronounState>([ initialState, null ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    if (!state) return;
    const newState: ExtractedPronoun = { ...state[0], [e.target.name]: e.target.value };
    setState([ state[0], newState ])
  };

  const currentState = state[1] ? state[1] : state[0];

  const language: string = usingEnglish ? "english" : "spanish";

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
            <td>
              <input
                type="text"
                name={`nominitive.singular.${language}`}
                value={currentState[(`nominitive.singular.${language}`) as keyof ExtractedPronoun]}
                className={styles["username login"]}
                readOnly={readOnly}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name={`nominitive.plural.${language}`}
                value={currentState[(`nominitive.plural.${language}`) as keyof ExtractedPronoun]}
                className={styles["username login"]}
                readOnly={readOnly}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Dative</th>
            <td>
              <input
                type="text"
                name={`dative.singular.${language}`}
                value={currentState[(`dative.singular.${language}`) as keyof ExtractedPronoun]}
                className={styles["username login"]}
                readOnly={readOnly}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name={`dative.plural.${language}`}
                value={currentState[(`dative.plural.${language}`) as keyof ExtractedPronoun]}
                className={styles["username login"]}
                readOnly={readOnly}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Accusitive</th>
            <td>
              <input
                type="text"
                name={`accusitive.singular.${language}`}
                value={currentState[(`accusitive.singular.${language}`) as keyof ExtractedPronoun]}
                className={styles["username login"]}
                readOnly={readOnly}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name={`accusitive.plural.${language}`}
                value={currentState[(`accusitive.plural.${language}`) as keyof ExtractedPronoun]}
                className={styles["username login"]}
                readOnly={readOnly}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>Genitive:</caption>
        <tbody>
          <tr>
            <th>Masc.</th>
            <td>
              <input
                type="text"
                name={`genitive.masculine.singular.${language}`}
                value={currentState[(`genitive.masculine.singular.${language}`) as keyof ExtractedPronoun]}
                className={styles["username login"]}
                readOnly={readOnly}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name={`genitive.masculine.plural.${language}`}
                value={currentState[(`genitive.masculine.plural.${language}`) as keyof ExtractedPronoun]}
                className={styles["username login"]}
                readOnly={readOnly}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Fem.</th>
            <td>
              <input
                type="text"
                name={`genitive.feminine.singular.${language}`}
                value={currentState[(`genitive.feminine.singular.${language}`) as keyof ExtractedPronoun]}
                className={styles["username login"]}
                readOnly={readOnly}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name={`genitive.feminine.plural.${language}`}
                value={currentState[(`genitive.feminine.plural.${language}`) as keyof ExtractedPronoun]}
                className={styles["username login"]}
                readOnly={readOnly}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};