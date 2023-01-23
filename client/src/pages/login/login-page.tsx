import React, { FC, useState } from "react";
import { CreateAccountForm } from "../../components/create-account-form";
import { LoginForm } from "../../components/login-form";

export const LoginPage: FC = (): JSX.Element => {
    const [loginSelected, setloginSelected] = useState(true);
    
    const loginClasses = !loginSelected ? "login-form-button right selected" : "login-form-button right";
    const createAccountclasses = !loginSelected ? "login-form-button right selected" : "login-form-button right"

    return (
        <div className="entry-screen">
            <div className="entry-scene">
                <div className="title">SPANISH APP</div>
                <div className="form">
                    <div className="button-container">
                        <button
                            onClick={() => setloginSelected(!loginSelected)}
                            className={loginClasses}
                        >Login</button>
                        <div className="corner"></div>
                        <button
                            onClick={() => setloginSelected(!loginSelected)}
                            className={createAccountclasses}
                        >Create Account</button>
                    </div>
                    {loginSelected ? <LoginForm /> : <CreateAccountForm />}
                </div>
            </div>
        </div>
    );
};