import React, { FC } from "react";
import { useStore } from "../state/store";
import { Input, InputProps } from "./text-input";
import { Button, ButtonProps } from "./button";
import { Store } from "../types";

export const LoginForm: FC = (): JSX.Element => {
    const usernameInputProps: InputProps = {
        classes: "username login",
        updateValue: useStore((state: Store) => state.loginForm.username.update),
        stateValue: useStore((state: Store) => state.loginForm.username.value),
        placeholder: "Enter username here",
        name: "Username"
    };

    const passwordInputProps: InputProps = {
        classes: "password login",
        updateValue: useStore((state: Store) => state.loginForm.password.update),
        stateValue: useStore((state: Store) => state.loginForm.password.value),
        placeholder: "Enter password here",
        name: "Password"
    };

    const submitButtonProps: ButtonProps = {
        classes: "submit-button login",
        text: "LOGIN",
        onClick: useStore((state: Store) => state.loginForm.attemptLogin)
    };

    const responseMessage: string | null = useStore((state: Store) => state.loginForm.responseMessage);
    const usernameValidationMessage: string | null = useStore((state: Store) => state.loginForm.username.validationMessage);
    const passwordValidationMessage: string | null = useStore((state: Store) => state.loginForm.password.validationMessage);

    return(
        <div className="entry-form">
            <Input {...usernameInputProps}/>
            {usernameValidationMessage && <div className="validation-message">{usernameValidationMessage}</div>}
            <Input {...passwordInputProps}/>
            {passwordValidationMessage && <div className="validation-message">{passwordValidationMessage}</div>}
            {responseMessage !== null && <div className="response-message">{responseMessage}</div>}
            <Button {...submitButtonProps}/>
        </div>
    );
};