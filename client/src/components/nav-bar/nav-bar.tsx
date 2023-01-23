import React, { FC } from "react";
import { useStore } from "../../state/store";
import { Store } from "../../types";
import styles from "./nav-bar-styles.module.css";

export const NavBar: FC = (): JSX.Element => {
  const user = useStore((state: Store) => state.auth.user);
  const attempLogout = useStore((state: Store) => state.auth.attemptLogout);

  return (
      <nav className={styles["nav"]}>
        <div className={styles["title"]}>SPANISH-APP</div>
        <button onClick={() => console.log("WORD LIST BUTTON CLICKED")} className={styles["nav-button"]}>WORD LIST</button>
        <button onClick={() => console.log("STUDY BUTTON CLICKED")} className={styles["nav-button"]}>STUDY</button>
        <div className={styles["profile-group"]}>
          <div>{user!.username}</div>
          <button onClick={attempLogout} className={styles["nav-button"]}>LOGOUT</button>
        </div>
      </nav>
  );
};

