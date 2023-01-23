import React, { FC } from "react";
import { useStore } from "../state/store";
import { Store } from "../types";
import styles from "../styles/Styles.module.css";

export const LoginForm: FC = (): JSX.Element => {
    const { username, setUsername } = useStore((state: Store) => state.loginForm);
    const { password, setPassword } = useStore((state: Store) => state.loginForm);
    const usernameValidationMessage = useStore((state: Store) => state.loginForm.usernameValidationMessage);
    const passwordValidationMessage = useStore((state: Store) => state.loginForm.passwordValidationMessage);
    const responseMessage: string | null = useStore((state: Store) => state.loginForm.responseMessage);
    const attemptLogin = useStore((state: Store) => state.auth.attemptLogin);

    return (
        <form onSubmit={attemptLogin} className={styles["entry-form"]}>
            <label htmlFor="username" className={styles["input-name"]}>Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles["username login"]}
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
                className={styles["password login"]}
            />
            <div className={styles["validation-message"]}>{passwordValidationMessage}</div>
            <button type="submit" className={styles["submit-button login"]}>LOGIN</button>
            <div className={styles["response-message"]}>{responseMessage}</div>
        </form>
    );
};