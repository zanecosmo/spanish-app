import { produce } from "immer";
import { HomeSlice, ExtendedWordDTO, ResponseBody, Store, ZustandGet, ZustandSet, WordsPayload, GroupDTO, PartsOfSpeech } from "../../../types";
import { executeFetch } from "../../../utils";

export const homeSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): HomeSlice => ({
    wordList: null,
    groups: [],
    setGroups: (group: string) => set(produce((state: Store) => void (
        state.home.groups = [ ...state.home.groups, group ]
    ))),
    getWordsPayload: async () => {
        const response: Response = await executeFetch("GET", "http://localhost:8000/get-word-pairs");
        const { data, error, message }: ResponseBody<WordsPayload> = await response.json();

        if (!([200, 201, 204].includes(response.status)) || !data) {
            console.log(`
            RESPONSE:
            STATUS -- ${response.status} \n
            ERROR -- ${error ? error : "NONE"} \n
            MESSAGE -- ${message ? message : "NONE"}
            `);
            return;
        };
        
        const { wordList, groups } = data;

        set(produce((state: Store) => {
            state.home.wordList = wordList;
            state.home.groups = groups;
        }));
    }
});