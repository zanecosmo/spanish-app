import create, { StoreApi, UseBoundStore } from "zustand";
import produce from "immer";
import { ResponseBody, Store, UserWithoutPassword } from "../types";
import { loginFormSlice } from "../state/slices/login-slice";
import { createAccountFormSlice } from "../state/slices/create-account-slice";
import { appSlice } from "./slices/app-slice";
import { executeFetch } from "../utils";

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
            state.loginForm.username = "";
            state.loginForm.password = "";
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
        const response = await executeFetch("POST", "http://localhost:8000/logout");
        const body = await response.json();
    
        if (response.status === 401) return console.log(body.message);

        set((state: Store) => ({ ...state, user: null }));
    },
    attemptLoginWithJWT: async () => {
        const response = await executeFetch("GET", "http://localhost:8000/login-with-jwt");
        const { data: user, message }: ResponseBody<UserWithoutPassword> = await response.json();

        if (response.status === 401) {
            console.log(message);
            return;
        };

        set((state: Store) => ({ ...state, user: user }));
    }
}));