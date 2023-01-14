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

export const DestructureError = (error: any) => {
    if (error instanceof Error) return error;
    else return { name: "UNKNOWN", message: "NON-ERROR COUGHT IN TRY-CATCH" };
};