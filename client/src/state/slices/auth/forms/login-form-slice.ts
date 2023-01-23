import produce from "immer";
import {
    Store,
    LoginFormSlice,
    ZustandGet,
    ZustandSet,
} from "../../../../types";

export const loginFormSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): LoginFormSlice => ({
    username: "",
    setUsername: (username: string) => set(produce((state: Store) => {
        state.loginForm.username = username;
    })),
    usernameValidationMessage: null,
    password: "",
    setPassword: (password: string) => set(produce((state: Store) => {
        state.loginForm.password = password;
    })),
    passwordValidationMessage: null,
    responseMessage: null,
});