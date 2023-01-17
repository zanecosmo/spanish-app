import { produce } from "immer";
import { HomeSlice, ExtendedWordDTO, ResponseBody, Store, ZustandGet, ZustandSet, WordsPayload, GroupDTO } from "../../types";
import { executeFetch } from "../../utils";

export const homeSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): HomeSlice => ({
    wordList: null,
    groups: [],
    selectedWord: null,
    attemptUpdateGroup: async (group: string) => {
        const parentWordId = get().home.selectedWord!.id;

        if (!parentWordId) throw Error("NO PARENT ID");

        const groupDTO: GroupDTO = { group: group, parentWordId: parentWordId };

        const response = await executeFetch("PUT", "http://localhost:8000/update-group", groupDTO);
        const { data: groupArray, error, message } = await response.json();

        if (!([200, 201, 204].includes(response.status))) {
            console.log(`
                RESPONSE:
                STATUS -- ${response.status} \n
                ERROR -- ${error ? error : "NONE"} \n
                MESSAGE -- ${message ? message : "NONE"}
            `);
            return;
        };

        set(produce((state: Store) => {
            state.home.groups = groupArray;
            state.home.selectedWord!.group = group;
            const updatedWordList = state.home.wordList!.map(word => { // <-- also don't like these null checks
                // i dont't like this approach but i'm doing for the sake of getting it done
                // i'm using the in memory group, but i'd prefere to use the server response
                if (word.word_pair_id === get().home.selectedWord!.id) word.group = group;
                return word;
            });
            state.home.wordList = updatedWordList;
        }));
        
    },
    nullifySelectedWord: () => set(produce((state: Store) => void (state.home.selectedWord = null))),
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
            return;
        };

        set(produce((state: Store) => void (state.home.selectedWord = word)));
    }
});