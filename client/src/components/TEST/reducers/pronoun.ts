import { ExtractedPronoun } from "../types";

export type PronounAction = { type: string,  inputValue: string }

export const initialPronounState: ExtractedPronoun = ({
    ["gender"]: "",
    ["nominitive.singular.english"]: "",
    ["nominitive.singular.spanish"]: "",
    ["nominitive.plural.english"]: "",
    ["nominitive.plural.spanish"]: "",
    ["dative.singular.english"]: "",
    ["dative.singular.spanish"]: "",
    ["dative.plural.english"]: "",
    ["dative.plural.spanish"]: "",
    ["accusitive.singular.english"]: "",
    ["accusitive.singular.spanish"]: "",
    ["accusitive.plural.english"]: "",
    ["accusitive.plural.spanish"]: "",
    ["genitive.masculine.singular.english"]: "",
    ["genitive.masculine.singular.spanish"]: "",
    ["genitive.masculine.plural.english"]: "",
    ["genitive.masculine.plural.spanish"]: "",
    ["genitive.feminine.singular.english"]: "",
    ["genitive.feminine.singular.spanish"]: "",
    ["genitive.feminine.plural.english"]: "",
    ["genitive.feminine.plural.spanish"]: "",
});