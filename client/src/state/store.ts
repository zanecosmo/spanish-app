import create, { StoreApi, UseBoundStore } from "zustand";
import produce from "immer";
import { Store, UserWithoutPassword } from "../types";
import { loginFormSlice } from "../state/slices/login-slice";
import { createAccountFormSlice } from "../state/slices/create-account-slice";
import { appSlice } from "./slices/app-slice";

export const useStore: UseBoundStore<StoreApi<Store>> = create<Store>((set, get) => ({
    user: null,
    setUser: (user: UserWithoutPassword) => set(produce((state: Store) => void (state.user = user))),
    loginForm: {
        ...loginFormSlice(set, get)
    },
    createAccountForm: {
        ...createAccountFormSlice(set, get)
    },
    app: {
        ...appSlice(set, get)
    },
    clearForm: () => {
        set(produce((state: Store) => {
            state.loginForm.usernameState.username = "";
            state.loginForm.passwordState.password = "";
            state.loginForm.responseMessage = null;
            state.loginForm.usernameValidationMessage = null;
            state.loginForm.passwordValidationMessage = null;

            state.createAccountForm.username.value = "";
            state.createAccountForm.password.value = "";
            state.createAccountForm.responseMessage = null;
            state.createAccountForm.username.validationMessage = null;
            state.createAccountForm.password.validationMessage = null;
        }));
    },
    attemptLogout: async () => {
        const jsonMessage = {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: null })
        };
    
        const response = await fetch("http://localhost:8000/logout", jsonMessage);
        const body = await response.json();
    
        if (response.status === 401) {
            console.log(body.message);
            return;
        };

        set(produce((state: Store) => void (state.user = null)));
    }
}));