import { ResponseBody } from "./types";

export const hasNoCharacters = (text: string) => {
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== " ") return false;
    };
    return true;
};

export const validateInput = (value: string | null, input: string): string | null => {
    if (value === null) return `DOM does not contain ${input}-input element`;
    if (value.length === 0) return `* Must enter a value for the ${input} input`;
    if (hasNoCharacters(value)) return `${input} * Input must contain characters`;
    return null;
};

export async function executeFetch(
    method: string,
    url: RequestInfo,
    body?: any
): Promise<Response> {    
    const request: RequestInit = {
        method: method,
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: "include",
    };

    if (body) request.body = JSON.stringify(body);

    const response: Response = await fetch(url, request);
    
    return response;
};



