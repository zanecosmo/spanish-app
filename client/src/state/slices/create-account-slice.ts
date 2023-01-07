import produce from "immer";
import {
    CreateAccountFormSlice,
    Roles,
    Store,
    User,
    ValidatedInput,
    ZustandGet,
    ZustandSet
} from "../../types";
import { validateInput } from "../../utils";

export const createAccountFormSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): CreateAccountFormSlice => ({
    username: {
        value: "",
        update: (newValue: string) => {
            set(produce((store: Store) => {
                    store.createAccountForm.username.value = newValue
                })
            );
        },
        validationMessage: null
    },
    password: {
        value: "",
        update: (newValue: string) => {
            set(produce((store: Store) => {
                    store.createAccountForm.password.value = newValue
                })
            )
        },
        validationMessage: null
    },
    responseMessage: null,
    attemptCreateAccount: async () => {
        // validate logic and set messages to be rendered by react + zustand
        set(produce((state: Store) => {
            const form: { username: ValidatedInput, password: ValidatedInput } = state.createAccountForm;
            form.username.validationMessage = validateInput(form.username.value, "username");
            form.password.validationMessage = validateInput(form.password.value, "password");
        }));

        const { username, password } = get().createAccountForm;
        if (username.validationMessage !== null || password.validationMessage !== null) return;

        // build fetch request
        const user: User = {
            id: undefined,
            username: get().createAccountForm.username.value,
            password: get().createAccountForm.password.value,
            role: Roles.USER
        };
    
        const request = {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        };

        // make and handle request
        const response = await fetch("http://localhost:8000/create-account", request);
        const body = await response.json();
    
        if (response.status !== 200) {
            set(produce((state: Store) => {
                state.createAccountForm.responseMessage = body.message;
            }));
            return;
        };

        set(produce((state: Store) => {
            state.user = body.user;
            state.createAccountForm.responseMessage = null;
            state.createAccountForm.username.value = "";
            state.createAccountForm.password.value = "";
        }));

        console.log(get().user?.username);
    }
});