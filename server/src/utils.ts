import { CookieObject, ResponseBody } from "./types";

export const logError = (err: Error | undefined): void => err && console.log(`ERROR: ${err}`);

export const extractCookies = (cookie: string): CookieObject => {
    return cookie.split(";").reduce((res, item) => {
        const data = item.trim().split("=");
        return { ...res, [data[0]]: data[1] };
    }, {});
};

export function buildResponseBody<T>(data: T | null, errorName?: string, message?: string): ResponseBody<T> {
    return {
        data: data,
        error: errorName ? errorName : null,
        message: message ? message : null
    };
};

export const hasNoCharacters = (text: string) => {
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== " ") return false;
    };
    return true;
};

export const validateInput = (value: string | null, input: string): string | null => {
    if (value === null) return `DOM does not contain ${input}-input element`;
    if (value.length === 0) return `* must enter a value for the ${input} input`;
    if (hasNoCharacters(value)) return `*${input} input must contain characters`;
    if (value.includes(" ")) return `${input} must not contain spaces`;
    if (input === "password" && value.length < 8) return `${input} must be at least 8 charaters`;
    return null;
};

export const DestructureError = (error: any) => {
    if (error instanceof Error) return error;
    else return { name: "UNKNOWN", message: "NON-ERROR COUGHT IN TRY-CATCH" };
};