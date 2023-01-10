export enum Roles {
    ADMIN = "ADMIN",
    USER = "USER"
};

export interface User {
    id: number | undefined;
    username: string;
    password: string;
    role: Roles;
};

export interface UserWithoutPassword {
    id: number | undefined;
    username: string;
    role: Roles;
};

export interface ValidatedInput {
    value: string;
    update: (value: string) => void;
    validationMessage: string | null;
};

export type ZustandSet<T> = (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean | undefined
) => void

export type ZustandGet<T> = () => T;

export interface LoginFormSlice {
    username: ValidatedInput,
    password: ValidatedInput,
    responseMessage: string | null;
    attemptLogin: () => Promise<void>;
};

export interface CreateAccountFormSlice {
    username: ValidatedInput,
    password: ValidatedInput,
    responseMessage: string | null
    attemptCreateAccount: () => Promise<void>;
};

export interface Store {
    user: UserWithoutPassword | null;
    loginForm: LoginFormSlice;
    createAccountForm: CreateAccountFormSlice;
    clearForm: () => void;
    attemptLogout: () => Promise<void>
    // testGetWord: () => Promise<void>
};
