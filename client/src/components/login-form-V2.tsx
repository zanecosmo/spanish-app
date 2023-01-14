import React, { FC, FormEvent, useState } from "react";
import { useStore } from "../state/store";
import { ResponseBody, Roles, Store, User, UserWithoutPassword } from "../types";
import { executeFetch, validateInput } from "../utils";

export const LoginForm: FC = (): JSX.Element => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ usernameValidationMessage, setUsernameValidationMessage ] = useState<string | null>(null);
    const [ PasswordValidationMessage, setPasswordValidationMessage ] = useState<string | null>(null);
    const [ responseMessage, setResponseMessage ] = useState<string | null>(null);

    const setUser = useStore((state: Store) => state.setUser);

    const validateForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const usernameMessage = validateInput(username, "username");
        const passwordMessage = validateInput(password, "password");
        console.log(passwordMessage)

        if (usernameMessage || passwordMessage) {
            setUsernameValidationMessage(usernameMessage);
            setPasswordValidationMessage(passwordMessage);
            return;
        };

        setResponseMessage(null);

        const userLoggingIn: User = {
            id: undefined,
            username: username,
            password: password,
            role: Roles.USER
        };

        const response: Response = await executeFetch("POST", "http://localhost:8000/login", userLoggingIn);        
        const { data: user, message }: ResponseBody<UserWithoutPassword> = await response.json();
        
        if (response.status !== 200 || !user) return setResponseMessage(message);
        else setUser(user);
    };

    return (
        <form onSubmit={validateForm} className="entry-form">
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
            <div className="validation-message">{PasswordValidationMessage}</div>
            <button type="submit" className="submit-button login">LOGIN</button>
            <div className="response-message">{responseMessage}</div>
        </form>
    );
};

