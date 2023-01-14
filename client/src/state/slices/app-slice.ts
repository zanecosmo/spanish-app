import { produce } from "immer";
import { AppSlice, BaseWordPairDTO, ExtendedWordDTO, ResponseBody, Store, ZustandGet, ZustandSet } from "../../types";
import { executeFetch } from "../../utils";

export const appSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): AppSlice => ({
    wordList: null,
    selectedWord: null,
    getBaseWordPairs: async () => {
        const response: Response = await executeFetch("GET", "http://localhost:8000/get-word-pairs");
        const { data: wordList, error, message }: ResponseBody<BaseWordPairDTO[]> = await response.json();
        
        if (!([200, 201, 204].includes(response.status)) || !wordList) {
            console.log(`
                RESPONSE:
                STATUS -- ${response.status} \n
                ERROR -- ${error ? error : "NONE"} \n
                MESSAGE -- ${message ? message : "NONE"}
            `);
        };

        set(produce((state: Store) => void (state.app.wordList = wordList)));
    },
    getWord: async (wordId: number) => {
        const response: Response = await executeFetch("GET", `http://localhost:8000/get-word/${wordId}`);
        const { data: word, error, message }: ResponseBody<ExtendedWordDTO> = await response.json();

        if (!([200, 201, 204].includes(response.status)) || !word) {
            console.log(`
                RESPONSE:
                STATUS -- ${response.status} \n
                ERROR -- ${error ? error : "NONE"} \n
                MESSAGE -- ${message ? message : "NONE"}
            `);
        };

        set(produce((state: Store) => void (state.app.selectedWord = word)));
    }
});