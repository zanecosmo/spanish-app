import React, { FC } from "react";
import { useStore } from "../state/store";
import { Store } from "../types";
import styles from "../styles/Styles.module.css";

export const CreateAccountForm: FC = (): JSX.Element => {
    const { username, setUsername } = useStore((state: Store) => state.createAccountForm);
    const { password, setPassword } = useStore((state: Store) => state.createAccountForm);
    const usernameValidationMessage = useStore((state: Store) => state.createAccountForm.usernameValidationMessage);
    const passwordValidationMessage = useStore((state: Store) => state.createAccountForm.passwordValidationMessage);
    const responseMessage: string | null = useStore((state: Store) => state.createAccountForm.responseMessage);
    const attemptCreateAccount = useStore((state: Store) => state.createAccountForm.attemptCreateAccount)

    return(
        <form onSubmit={attemptCreateAccount} className={styles["entry-form"]}>
        <label htmlFor="username" className={styles["input-name"]}>Username</label>
        <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles["username create-account"]}
        />
        <div className={styles["validation-message"]}>{usernameValidationMessage}</div>
        <label htmlFor="password" className={styles["input-name"]}>Password</label>
        <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["password create-account"]}
        />
        <div className={styles["validation-message"]}>{passwordValidationMessage}</div>
        <button type="submit" className={styles["submit-button create-account"]}>LOGIN</button>
        <div className={styles["response-message"]}>{responseMessage}</div>
        </form>
    );
};