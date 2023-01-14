import {
    Roles,
    User,
    Store,
    LoginFormSlice,
    ZustandGet,
    ZustandSet,
    UserWithoutPassword,
    ResponseBody
} from "../../types";
import produce from "immer";
import { executeFetch, validateInput } from "../../utils";
import { FormEvent } from "react";

export const loginFormSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): LoginFormSlice => ({
    usernameState: {
        username: "",
        setUsername: (username: string) => set(produce((state: Store) => {
            state.loginForm.usernameState.username = username
        })),
    },
    usernameValidationMessage: null,
    passwordState: {
        password: "",
        setPassword: (password: string) => set(produce((state: Store) => {
            state.loginForm.passwordState.password = password
        })),
    },
    passwordValidationMessage: null,
    responseMessage: null,
    attemptLogin: async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // validate logic and set messages to be rendered by react + zustand
        const { username } = get().loginForm.usernameState;
        const { password } = get().loginForm.passwordState;
        const usernameMessage = validateInput(username, "username");
        const passwordMessage = validateInput(password, "password");

        if (usernameMessage|| passwordMessage) return set(produce((state: Store) => {
            state.loginForm.usernameValidationMessage = usernameMessage;
            state.loginForm.passwordValidationMessage = passwordMessage;
        }));

        set(produce((state: Store) => void (state.loginForm.responseMessage = null)));

        // make, execute, and handle request
        const userLoggingIn: User = {
            id: undefined,
            username: username,
            password: password,
            role: Roles.USER
        };
    
        const response: Response = await executeFetch("POST", "http://localhost:8000/login", userLoggingIn);        
        const { data: user, message }: ResponseBody<UserWithoutPassword> = await response.json();
        
        if (response.status !== 200 || !user) {
            set(produce((state: Store) => void (state.loginForm.responseMessage = message)));
            return;
        };

        set(produce((state: Store) => void (state.user = user)));

        get().clearForm();
    }
});