import create, { StoreApi, UseBoundStore } from "zustand";
import produce from "immer";
import { Store } from "../types";
import { loginFormSlice } from "../state/slices/login-slice";
import { createAccountFormSlice } from "../state/slices/create-account-slice";
import { appSlice } from "./slices/app-slice";

export const useStore: UseBoundStore<StoreApi<Store>> = create<Store>((set, get) => ({
    user: null,
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
            state.loginForm.username.value = "";
            state.loginForm.password.value = "";
            state.loginForm.responseMessage = null;
            state.loginForm.username.validationMessage = null;
            state.loginForm.password.validationMessage = null;

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

        set(produce((state: Store) => {
            state.user = null;
        }));
    }
}));