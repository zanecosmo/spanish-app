import React, { FC } from "react";
import { useStore } from "../state/store";
import { Input, InputProps } from "./text-input";
import { Button, ButtonProps } from "./button";
import { Store } from "../types";

export const CreateAccountForm: FC = (): JSX.Element => {
    const usernameInputProps: InputProps = {
        classes: "username create-account",
        updateValue: useStore((state: Store) => state.createAccountForm.username.update),
        stateValue: useStore((state: Store) => state.createAccountForm.username.value),
        placeholder: "Username"
    };

    const passwordInputProps: InputProps = {
        classes: "password create-account",
        updateValue: useStore((state: Store) => state.createAccountForm.password.update),
        stateValue: useStore((state: Store) => state.createAccountForm.password.value),
        placeholder: "Password"
    };

    const submitButtonProps: ButtonProps = {
        classes: "submit-button create-account",
        text: "CREATE",
        onClick: useStore((state: Store) => state.createAccountForm.attemptCreateAccount),
    };

    const responseMessage: string | null = useStore((state: Store) => state.createAccountForm.responseMessage);
    const usernameValidationMessage: string | null = useStore((state: Store) => state.createAccountForm.username.validationMessage);
    const passwordValidationMessage: string | null = useStore((state: Store) => state.createAccountForm.password.validationMessage);

    return(
        <div className="entry-form">
            <div className="title">CREATE ACCOUNT</div>
            <Input {...usernameInputProps}/>
            {usernameValidationMessage && <>{usernameValidationMessage}</>}
            <Input {...passwordInputProps}/>
            {passwordValidationMessage && <>{passwordValidationMessage}</>}
            <Button {...submitButtonProps}/>
            {responseMessage !== null && <>{responseMessage}</>}
        </div>
    );
};