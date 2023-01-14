import produce from "immer";
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
            const { username, password }: CreateAccountFormSlice = state.createAccountForm;
            username.validationMessage = validateInput(username.value, "username");
            password.validationMessage = validateInput(password.value, "password");
        }));

        const { username, password } = get().createAccountForm;

        if (username.validationMessage !== null || password.validationMessage !== null) return;

        set(produce((state: Store) => void (state.createAccountForm.responseMessage = null)));

        // make, execute, and handle request
        const newUser: User = {
            id: undefined,
            username: username.value,
            password: password.value,
            role: Roles.USER
        };

        const url = "http://localhost:8000/create-account"
        const response: Response = await executeFetch("POST", url, newUser);
        const { data: user, message }: ResponseBody<UserWithoutPassword> = await response.json();
    
        if (!([200, 201, 204].includes(response.status)) || !user) {
            set(produce((state: Store) => void (state.createAccountForm.responseMessage = message)));
            return;
        };

        set(produce((state: Store) => void (state.user = user)));

        get().clearForm();
    }
});