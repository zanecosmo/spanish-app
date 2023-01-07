import React, { FC, useEffect } from "react";
import { Button, ButtonProps} from "./components/button";
import { LoginPage } from "./pages/login-page";
import { useStore } from "./state/store";
import { Store, UserWithoutPassword } from "./types";

export const App: FC = (): JSX.Element => {
    const logoutButtonProps: ButtonProps = {
        classes: "submit-button logout",
        text: "LOUGOUT",
        onClick: useStore((state: Store) => state.attemptLogout)
    };

    const user: UserWithoutPassword | null = useStore((state: Store) => state.user);

    if (user === null) return <LoginPage />;

    return (
        <div className="entry-screen">
            {`Welcome to the app, ${user.username}`}
            <Button {...logoutButtonProps}/>
        </div>
    );
};