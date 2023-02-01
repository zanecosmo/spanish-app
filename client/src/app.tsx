import React, { FC, useEffect } from "react";
import { AuthPage } from "./pages/auth/auth-page";
import { useStore } from "./state/store";
import { Store, UserWithoutPassword } from "./types";
import { NavBar } from "./components/nav-bar/nav-bar";
import { BaseWordListView } from "./pages/word-list/world-list";

export const App: FC = (): JSX.Element => {
    const user: UserWithoutPassword | null = useStore((state: Store) => state.auth.user);
    const attemptLoginWithJWT = useStore((state: Store) => state.auth.attemptLoginWithJWT);

    useEffect(() => void attemptLoginWithJWT(), [])

    if (!user) return <AuthPage />;

    return (
        <>
            <NavBar />
            <br />
            <BaseWordListView />
        </>
    );
};