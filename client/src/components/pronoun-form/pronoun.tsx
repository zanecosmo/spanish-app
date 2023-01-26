import React, { FC, FormEvent } from "react";
import styles from "../../styles/Styles.module.css";

export const Pronoun: FC = () => {
  const handleSubmit = () => {
    console.log("SUBMIT PRONOUN");
  };

  return (
    <form onSubmit={handleSubmit}>
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
                value={"NOMINATIVE SINGULAR"}
                className={styles["username login"]}
                readOnly
              />
            </td>
            <td>
              <input
                type="text"
                value={"NOMINATIVE PLURAL"}
                className={styles["username login"]}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th>Dative</th>
            <td>
              <input
                type="text"
                value={"DATIVE SINGULAR"}
                className={styles["username login"]}
                readOnly
              />
            </td>
            <td>
              <input
                type="text"
                value={"DATIVE PLURAL"}
                className={styles["username login"]}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th>Accusitive</th>
            <td>
              <input
                type="text"
                value={"ACCUSITIVE SINGULAR"}
                className={styles["username login"]}
                readOnly
              />
            </td>
            <td>
              <input
                type="text"
                value={"ACCUSITIVE PLURAL"}
                className={styles["username login"]}
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>Genitive:</caption>
        <tbody>
          <tr>
            <th>Masc. sg.</th>
            <td>
              <input
                type="text"
                value={"Masculine Singular"}
                className={styles["username login"]}
                readOnly
              />
            </td>
            <td>
              <input
                type="text"
                value={"Masculine Singular"}
                className={styles["username login"]}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th>Masc. pl.</th>
            <td>
              <input
                type="text"
                value={"Masculine Plural"}
                className={styles["username login"]}
                readOnly
              />
            </td>
            <td>
              <input
                type="text"
                value={"Masculine Plural"}
                className={styles["username login"]}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th>Feminine Singular</th>
            <td>
              <input
                type="text"
                value={"Feminine Singular"}
                className={styles["username login"]}
                readOnly
              />
            </td>
            <td>
              <input
                type="text"
                value={"Feminine Singular"}
                className={styles["username login"]}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th>Feminine Plural</th>
            <td>
              <input
                type="text"
                value={"Feminine Plural"}
                className={styles["username login"]}
                readOnly
              />
            </td>
            <td>
              <input
                type="text"
                value={"Feminine Plural"}
                className={styles["username login"]}
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};