import { produce } from "immer";
import { FormEvent } from "react";
import { ResponseBody, Store, ZustandGet, ZustandSet, UserWithoutPassword, User, Roles, AuthSlice } from "../../../types";
import { executeFetch, validateInput } from "../../../utils";

export const authSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): AuthSlice => ({
  user: null,
  setUser: (user: UserWithoutPassword) => set(produce((state: Store) => void (state.auth.user = user))),
  attemptLogin: async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // validate logic and set messages to be rendered by react + zustand
    const { username, password } = get().loginForm;
    const usernameMessage = validateInput(username, "username");
    const passwordMessage = validateInput(password, "password");

    if (usernameMessage || passwordMessage) return set(produce((state: Store) => {
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

    set(produce((state: Store) => void (state.auth.user = user)));

    get().clearForm();
  },
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

    set(produce((state: Store) => void (state.auth.user = user)));

    get().clearForm();
  },
  attemptLogout: async () => {    
    const response = await executeFetch("POST", "http://localhost:8000/logout");
    const body = await response.json();

    if (response.status === 401) return console.log(body.message);

    set(produce((state: Store) => void (state.auth.user = null)));
  },
  attemptLoginWithJWT: async () => {
      const response = await executeFetch("GET", "http://localhost:8000/login-with-jwt");
      const { data: user, message }: ResponseBody<UserWithoutPassword> = await response.json();

      if (response.status === 401) {
          console.log(message);
          return;
      };

      set(produce((state: Store) => void (state.auth.user = user)));
  }
});

