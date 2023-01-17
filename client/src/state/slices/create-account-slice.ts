import produce from "immer";
import { FormEvent } from "react";
import {
    CreateAccountFormSlice,
    ResponseBody,
    Roles,
    Store,
    User,
    UserWithoutPassword,
    ZustandGet,
    ZustandSet
} from "../../types";
import { executeFetch, validateInput } from "../../utils";

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
    attemptCreateAccount: async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // validate logic and set messages to be rendered by react + zustand
        const { username, password } = get().createAccountForm;
        const usernameMessage = validateInput(username, "username");
        const passwordMessage = validateInput(password, "password");

        if (usernameMessage || passwordMessage) return set(produce((state: Store) => {
            state.createAccountForm.usernameValidationMessage = usernameMessage;
            state.createAccountForm.passwordValidationMessage = passwordMessage;
        }));

        set(produce((state: Store) => void (state.createAccountForm.responseMessage = null)));

        // make, execute, and handle request
        const newUser: User = {
            id: undefined,
            username: username,
            password: password,
            role: Roles.USER
        };

        const response: Response = await executeFetch("POST", "http://localhost:8000/create-account", newUser);
        const { data: user, message }: ResponseBody<UserWithoutPassword> = await response.json();
    
        if (!([200, 201, 204].includes(response.status)) || !user) {
            set(produce((state: Store) => void (state.createAccountForm.responseMessage = message)));
            return;
        };

        set((state: Store) => ({ ...state, user: user }));

        get().clearForm();
    }
});