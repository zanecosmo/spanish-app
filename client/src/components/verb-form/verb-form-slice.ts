import { produce } from "immer";
import {
  Store,
  ZustandGet,
  ZustandSet,
  VerbFormSlice,
} from "../../types";
import { verbFormEnglishSlice } from "./english/verb-form-english-slice";
import { verbFormSpanishSlice } from "./spanish/verb-form-spanish-slice";

export const verbFormSlice = (set: ZustandSet<Store>, get: ZustandGet<Store>): VerbFormSlice => ({
  english: { ...verbFormEnglishSlice(set, get) },
  spanish: { ...verbFormSpanishSlice(set, get) }
});