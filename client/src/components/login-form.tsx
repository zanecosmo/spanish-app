import React, { FC, FormEvent } from "react";
import { useStore } from "../state/store";
import { Input, InputProps } from "./text-input";
import { Button, ButtonProps } from "./button";
import { Store } from "../types";

export const LoginForm: FC = (): JSX.Element => {
    const { username, setUsername } = useStore((state: Store) => state.loginForm.usernameState);
    const { password, setPassword } = useStore((state: Store) => state.loginForm.passwordState);
    const usernameValidationMessage = useStore((state: Store) => state.loginForm.usernameValidationMessage);
    const passwordValidationMessage = useStore((state: Store) => state.loginForm.passwordValidationMessage);
    const responseMessage: string | null = useStore((state: Store) => state.loginForm.responseMessage);
    const attemptLogin = useStore((state: Store) => state.loginForm.attemptLogin)

    return (
        <form onSubmit={attemptLogin} className="entry-form">
            <label htmlFor="username" className="input-name">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username login"
            />
            <div className="validation-message">{usernameValidationMessage}</div>
            <label htmlFor="password" className="input-name">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password login"
            />
            <div className="validation-message">{passwordValidationMessage}</div>
            <button type="submit" className="submit-button login">LOGIN</button>
            <div className="response-message">{responseMessage}</div>
        </form>
    );
};