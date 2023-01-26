import React, { FC, FormEvent } from "react";
import styles from "../../styles/Styles.module.css";

export const Adjective: FC = () => {
  return (
    <form>
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
                value={"Masc. sg."}
                className={styles["username login"]}
                readOnly
              />
            </td>
            <td>
              <input
                type="text"
                value={"Masc. pl."}
                className={styles["username login"]}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th>Fem.</th>
            <td>
              <input
                type="text"
                value={"Fem. sg."}
                className={styles["username login"]}
                readOnly
              />
            </td>
            <td>
              <input
                type="text"
                value={"Fem. pl."}
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