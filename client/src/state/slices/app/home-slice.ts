import { produce } from "immer";
import { HomeSlice, ExtendedWordDTO, ResponseBody, Store, ZustandGet, ZustandSet, WordsPayload, GroupDTO, PartsOfSpeech } from "../../../types";
import { executeFetch } from "../../../utils";
import { verbFormSlice } from "../../../components/verb-form/verb-form-slice";

export const homeSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): HomeSlice => ({
    wordList: null,
    groups: [],
    selectedWord: null,
    isWordSelected: false,
    setIsWordSelected: (bool: boolean) => set(produce((state: Store) => void (state.home.isWordSelected = bool))),
    partOfSpeech: null,
    setPartOfSpeech: (partOfSpeech: PartsOfSpeech) => {
        set(produce((state: Store) => {
            state.home.partOfSpeech = partOfSpeech;
            state.home.selectedWord?.wordPairs.forEach(wp => wp.part_of_speech = partOfSpeech);
        }));
    },
    actions: {
        isEditing: false,
        setIsEditing: (bool: boolean) => set(produce((state: Store) => void (state.home.actions.isEditing = bool))),
        isAdding: false,
        setIsAdding: (bool: boolean) => set(produce((state: Store) => void (state.home.actions.isAdding = bool))),
        isDeleting: false,
        setIsDeleting: (bool: boolean) => set(produce((state: Store) => void (state.home.actions.isDeleting = bool))),
        isEditingGroup: false,
        setIsEditingGroup: (bool: boolean) => set(produce((state: Store) => void (state.home.actions.isEditingGroup = bool))),
    },
    forms: { verb: { ...verbFormSlice(set, get) } },
    isEnglish: false,
    setIsEnglish: (bool: boolean) => set(produce((state: Store) => {
        state.home.isEnglish = bool;
    })),
    AddNewWord: () => {
        // const newWord: ExtendedWordDTO = {
        //     id: undefined,
        //     group: null,
        //     wordPairs: []
        // };

        // for (let i = 0; i < 6; i++) {
        //     newWord.wordPairs.push({
        //         word_pair_id: null,
        //         parent_word_id: null,
        //         english: "",
        //         spanish: "",
        //         part_of_speech: null,
        //         group: null,
        //         difficulty: null,
        //         infinitive: false,
        //         person: null,
        //         number: null,
        //         gender: null,
        //         case: null
        //     });
        // };

        console.log(get().home.actions.isEditing);

        set(produce((state: Store) => {
            state.home.isWordSelected = true;
            // state.home.selectedWord = newWord;
            state.home.actions.isAdding = true;
        }));
    },
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
    nullifySelectedWord: () => set(produce((state: Store) => {
        state.home.forms.verb.english.resetForm();
        state.home.forms.verb.spanish.resetForm();
        state.home.isWordSelected = false;
        state.home.selectedWord = null;
    })),
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

        set(produce((state: Store) => {
            state.home.isWordSelected = true;
            state.home.selectedWord = word
        }));
        
        console.log(get().home.selectedWord);
    }
});