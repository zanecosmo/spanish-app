import produce from "immer";
import {
    CreateAccountFormSlice,
    Store,
    ZustandGet,
    ZustandSet
} from "../../../../types";

export const createAccountFormSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): CreateAccountFormSlice => ({
    username: "",
    setUsername: (username: string) => set(produce((state: Store) => {
        state.createAccountForm.username = username;
    })),
    usernameValidationMessage: null,
    password: "",
    setPassword: (password: string) => set(produce((state: Store) => {
        state.createAccountForm.password = password;
    })),
    passwordValidationMessage: null,
    responseMessage: null,
});