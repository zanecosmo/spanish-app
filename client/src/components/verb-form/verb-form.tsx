import React, { ChangeEvent, FC, useEffect } from "react";
import { useStore } from "../../state/store"
import { Store, VerbFormStateAndSetters } from "../../types";
import styles from "../../styles/Styles.module.css";

export const VerbForm: FC = () => {
  const isEnglish = useStore((state: Store) => state.home.isEnglish);

  const  stateAndSetters: VerbFormStateAndSetters = (
    isEnglish
      ? useStore((state: Store) => state.home.forms.verb.english)
      : useStore((state: Store) => state.home.forms.verb.spanish)
  );

  const { infinitive, firstPerson, secondPerson, thirdPerson } = stateAndSetters.state;
  const { set, resetForm, convertToForm } = stateAndSetters;
  const { isEditing, isAdding } = useStore((state: Store) => state.home.actions);

  console.log("COMPONENT RENDERS", isEnglish)

  useEffect(() => {
    console.log("USE EFFECT", isEnglish);
    !isAdding && convertToForm();
  }, [isEnglish]);

  useEffect(() => void isAdding && resetForm(), []);

  const readOnly = isEditing || isAdding ? false : true;

  const log = () => <>{"MADE IT HERE " + isEnglish}</>;

  return (
    <div>
      <label htmlFor="infinitive">Infinitive:</label>
      <input
        type="text"
        id="infinitive"
        value={infinitive}
        className={styles["username login"]}
        readOnly={readOnly}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          set.infinitive(e.target.value);
        }}
      />
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
                <td>
                  <input
                    type="text"
                    value={firstPerson.singular}
                    className={styles["username login"]}
                    readOnly={readOnly}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      set.firstPerson.singular(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={firstPerson.plural}
                    className={styles["username login"]}
                    readOnly={readOnly}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      set.firstPerson.plural(e.target.value);
                    }}
                  />
                </td>
            </tr>
            <tr>
                <th>2nd Person</th>
                <td>
                  <input
                    type="text"
                    value={secondPerson.singular}
                    className={styles["username login"]}
                    readOnly={readOnly}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      set.secondPerson.singular(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={secondPerson.plural}
                    className={styles["username login"]}
                    readOnly={readOnly}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      set.secondPerson.plural(e.target.value);
                    }}
                  />
                </td>
            </tr>
            <tr>
                <th>3rd Person</th>
                <td>
                  <input
                    type="text"
                    value={thirdPerson.singular}
                    className={styles["username login"]}
                    readOnly={readOnly}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      set.thirdPerson.singular(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={thirdPerson.plural}
                    className={styles["username login"]}
                    readOnly={readOnly}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      set.thirdPerson.plural(e.target.value);
                    }}
                  />
                </td>
            </tr>
          </tbody>
      </table>
      {log()}
    </div>
  )
};