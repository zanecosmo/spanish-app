import { produce } from "immer";
import { Store, ZustandGet, ZustandSet } from "../../types";

interface AppSlice {
    wordList: () => void;
};

const appSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): AppSlice => ({
    wordList: () => console.log("NO IMPLEMENTATION")
});