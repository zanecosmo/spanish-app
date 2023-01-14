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
            const { username, password }: LoginFormSlice = state.loginForm;
            username.validationMessage = validateInput(username.value, "username");
            password.validationMessage = validateInput(password.value, "password");
        }));

        const { username, password } = get().loginForm;
        if (username.validationMessage !== null || password.validationMessage !== null) return;

        set(produce((state: Store) => void (state.loginForm.responseMessage = null)));

        // make, execute, and handle request
        const userLoggingIn: User = {
            id: undefined,
            username: username.value,
            password: password.value,
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