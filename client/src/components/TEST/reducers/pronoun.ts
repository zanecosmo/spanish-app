import { ExtractedPronoun } from "../types";

export type PronounAction = { type: string,  inputValue: string }

export const tableInputNames: string[] = [
    "nom.sg",
    "nom.pl",
    "dat.sg",
    "dat.pl",
    "acc.sg",
    "acc.pl",
    "gen.masc.sg",
    "gen.masc.pl",
    "gen.fem.sg",
    "gen.fem.sg"
];

export const initialPronounState: ExtractedPronoun = ({
    ["gender"]: "",
    ["nom.sg.eng"]: "",
    ["nom.sg.span"]: "",
    ["nom.pl.eng"]: "",
    ["nom.pl.span"]: "",
    ["dat.sg.eng"]: "",
    ["dat.sg.span"]: "",
    ["dat.pl.eng"]: "",
    ["dat.pl.span"]: "",
    ["acc.sg.eng"]: "",
    ["acc.sg.span"]: "",
    ["acc.pl.eng"]: "",
    ["acc.pl.span"]: "",
    ["gen.masc.sg.eng"]: "",
    ["gen.masc.sg.span"]: "",
    ["gen.masc.pl.eng"]: "",
    ["gen.masc.pl.span"]: "",
    ["gen.fem.sg.eng"]: "",
    ["gen.fem.sg.span"]: "",
    ["gen.fem.pl.eng"]: "",
    ["gen.fem.pl.span"]: "",
});