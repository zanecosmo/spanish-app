import create, { StoreApi, UseBoundStore } from "zustand";
import produce from "immer";
import { ResponseBody, Store, UserWithoutPassword } from "../types";
import { loginFormSlice } from "./slices/auth/forms/login-form-slice";
import { createAccountFormSlice } from "./slices/auth/forms/create-account-form-slice";
import { homeSlice } from "./slices/app/home-slice";
import { executeFetch } from "../utils";
import { authSlice } from "./slices/auth/auth-slice";

export const useStore: UseBoundStore<StoreApi<Store>> = create<Store>((set, get) => ({
    auth: { ...authSlice(set, get) },
    loginForm: { ...loginFormSlice(set, get) },
    createAccountForm: { ...createAccountFormSlice(set, get) },
    home: { ...homeSlice(set, get) },
    clearForm: () => {
        set(produce((state: Store) => {
            state.loginForm.username = "";
            state.loginForm.password = "";
            state.loginForm.responseMessage = null;
            state.loginForm.usernameValidationMessage = null;
            state.loginForm.passwordValidationMessage = null;

            state.createAccountForm.username = "";
            state.createAccountForm.password = "";
            state.createAccountForm.responseMessage = null;
            state.createAccountForm.usernameValidationMessage = null;
            state.createAccountForm.passwordValidationMessage = null;
        }));
    },
}));