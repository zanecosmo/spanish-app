import React, { FC, useState } from "react";
import { Button, ButtonProps } from "../components/button";
import { CreateAccountForm } from "../components/create-account-form";
import { LoginForm } from "../components/login-form";

export const LoginPage: FC = (): JSX.Element => {
     const [loginSelected, setloginSelected] = useState(true);
    
    const loginButtonProps: ButtonProps = {
        classes: loginSelected ? "login-form-button left selected" : "login-form-button left",
        text: "Login",
        onClick: () => setloginSelected(!loginSelected)
    };

    const createAccountButtonProps: ButtonProps = {
        classes: !loginSelected ? "login-form-button right selected" : "login-form-button right",
        text: "Create Account",
        onClick: () => setloginSelected(!loginSelected)
    };

    return (
        <div className="entry-screen">
            <div className="entry-scene">
                <div className="title">SPANISH APP</div>
                <div className="form">
                    <div className="button-container">
                        <Button {...loginButtonProps}/>
                        <div className="corner"></div>
                        <Button {...createAccountButtonProps}/>
                    </div>
                    {loginSelected ? <LoginForm /> : <CreateAccountForm />}
                </div>
            </div>
        </div>
    );
};