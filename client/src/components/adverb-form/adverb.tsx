import React, { FC, FormEvent } from "react";
import styles from "../../styles/Styles.module.css";

export const Adverb: FC = () => {
  return (
    <form>
      <input
        type="text"
        value={"VALUE"}
        className={styles["username login"]}
        readOnly
      />
    </form>
  );
};