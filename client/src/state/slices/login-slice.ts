import {
    Roles,
    User,
    ValidatedInput,
    Store,
    LoginFormSlice,
    ZustandGet,
    ZustandSet
} from "../../types";
import produce from "immer";
import { validateInput } from "../../utils";

export const loginFormSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): LoginFormSlice => ({
    username: {
        value: "",
        update: (newValue: string) => {
            set(produce((state: Store) => {
                    state.loginForm.username.value = newValue
                })
            );
        },
        validationMessage: null
    },
    password: {
        value: "",
        update: (newValue: string) => {
            set(produce((state: Store) => {
                    state.loginForm.password.value = newValue
                })
            )
        },
        validationMessage: null
    },
    responseMessage: null,
    attemptLogin: async () => {
        // validate logic and set messages to be rendered by react + zustand
        set(produce((state: Store) => {
            const form: { username: ValidatedInput, password: ValidatedInput } = state.loginForm;
            form.username.validationMessage = validateInput(form.username.value, "username");
            form.password.validationMessage = validateInput(form.password.value, "password");
        }));

        const { username, password } = get().loginForm;
        if (username.validationMessage !== null || password.validationMessage !== null) return;

        set(produce((state: Store) => {
            state.loginForm.responseMessage = null;
        }));

        // build fetch request
        const user: User = {
            id: undefined,
            username: get().loginForm.username.value,
            password: get().loginForm.password.value,
            role: Roles.USER
        };
    
        // const request = ;
    
        // make and handle request
        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(user)
        });
        console.log(document.cookie);
        
        const body = await response.json();
        
        if (response.status !== 200) {
            console.log(response.status);
            set(produce((state: Store) => {
                state.loginForm.responseMessage = body.message;
            }));
            return;
        };
        console.log(document.cookie);

        set(produce((state: Store) => {
            state.user = body.user;
        }));

        get().clearForm();
    }
});