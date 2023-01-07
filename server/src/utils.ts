import { CookieObject } from "./types";

export const logError = (err: Error | undefined): void => err && console.log(`ERROR: ${err}`);

export const extractCookies = (cookie: string): CookieObject => {
    return cookie.split(";").reduce((res, item) => {
        const data = item.trim().split("=");
        return { ...res, [data[0]]: data[1] };
    }, {});
};