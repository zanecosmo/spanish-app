import React, { FC, useEffect } from "react";
import { Home } from "./pages/home/home";
import { LoginPage } from "./pages/login/login-page";
import { useStore } from "./state/store";
import { Store, UserWithoutPassword } from "./types";

export const App: FC = (): JSX.Element => {
    const user: UserWithoutPassword | null = useStore((state: Store) => state.user);
    const attemptLoginWithJWT = useStore((state: Store) => state.attemptLoginWithJWT);
    
    useEffect(() => void attemptLoginWithJWT(), [])

    return !user ? <LoginPage /> : <Home />;
};