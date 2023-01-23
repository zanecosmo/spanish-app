import React, { FC } from "react";
import { useStore } from "../state/store";
import { Store } from "../types";
// import styles from "../styles/Styles.module.css";

export const CreateAccountForm: FC = (): JSX.Element => {
    const { username, setUsername } = useStore((state: Store) => state.createAccountForm);
    const { password, setPassword } = useStore((state: Store) => state.createAccountForm);
    const usernameValidationMessage = useStore((state: Store) => state.createAccountForm.usernameValidationMessage);
    const passwordValidationMessage = useStore((state: Store) => state.createAccountForm.passwordValidationMessage);
    const responseMessage: string | null = useStore((state: Store) => state.createAccountForm.responseMessage);
    const attemptCreateAccount = useStore((state: Store) => state.auth.attemptCreateAccount)

    return(
        <form onSubmit={attemptCreateAccount}>
            {/* className={styles["entry-form"]} */}
        <label htmlFor="username">Username</label>
        {/* className={styles["input-name"]} */}
        <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // className={styles["username create-account"]}
        />
        <div>{usernameValidationMessage}</div>
        {/* className={styles["validation-message"]} */}
        <label htmlFor="password">Password</label>
        {/* className={styles["input-name"]} */}
        <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // className={styles["password create-account"]}
        />
        <div>{passwordValidationMessage}</div>
        {/* className={styles["validation-message"]} */}
        <button type="submit">LOGIN</button>
        {/* className={styles["submit-button create-account"]} */}
        <div>{responseMessage}</div>
        {/* className={styles["response-message"]} */}
        </form>
    );
};