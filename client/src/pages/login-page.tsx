import React, { FC } from "react";
import { CreateAccountForm } from "../components/create-account-form";
import { LoginForm } from "../components/login-form";

export const LoginPage: FC = (): JSX.Element => {
    return (
        <div className="entry-screen">
            <LoginForm />
            <CreateAccountForm />
        </div>
    );
};