import create, { StoreApi, UseBoundStore } from "zustand";
import produce from "immer";
import { Store } from "../types";
import { loginFormSlice } from "../state/slices/login-slice";
import { createAccountFormSlice } from "../state/slices/create-account-slice";

export const useStore: UseBoundStore<StoreApi<Store>> = create<Store>((set, get) => ({
    user: null,
    loginForm: {
        ...loginFormSlice(set, get)
    },
    createAccountForm: {
        ...createAccountFormSlice(set, get)
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