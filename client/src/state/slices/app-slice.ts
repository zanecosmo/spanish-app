import { produce } from "immer";
import { AppSlice, BaseWordPairDTO, ExtendedWordDTO, ExtendedWordPairDTO, Roles, Store, UserWithoutPassword, ZustandGet, ZustandSet } from "../../types";

interface ResponseBody<T> {
    error: string | null;
    message: string | null;
    data: T | null;
};

async function executeFetch<T>(method: string, url: RequestInfo, body?: any): Promise<T | null> {
    const requestBody = body ? { body: JSON.stringify(body) } : {};

    const response: Response = await fetch(url, {
        method: method,
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: "include",
        ...requestBody
    });

    const { data, error, message }: ResponseBody<T> = await response.json();

    console.log(data);

    if (!([200, 201, 204].includes(response.status)) || !data) {
        console.log(`
            RESPONSE:
            STATUS -- ${response.status} \n
            ERROR -- ${error ? error : "NONE"} \n
            MESSAGE -- ${message ? message : "NONE"}
        `);
    };

    return data;
};

export const appSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): AppSlice => ({
    wordList: null,
    selectedWord: null,
    getBaseWordPairs: async () => {
        const baseWordPairs = await executeFetch<BaseWordPairDTO[]>("GET", "http://localhost:8000/get-word-pairs");
        set(produce((state: Store) => void (state.app.wordList = baseWordPairs)));
        console.log(get().app.wordList);
    },
    getWord: async (wordId: number) => {
        const word = await executeFetch<ExtendedWordDTO>("GET", `http://localhost:8000/get-word/${wordId}`);
        set(produce((state: Store) => void (state.app.selectedWord = word)));
        console.log(get().app.selectedWord);
    }
});