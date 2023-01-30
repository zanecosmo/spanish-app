import { ExtractedVerb } from "../types";

export type VerbAction = { type: string,  inputValue: string }

export const initialVerbState: ExtractedVerb = ({
  ["infinitive"]: "",
  ["1st.sg.eng"]: "",
  ["1st.pl.eng"]: "",
  ["2nd.sg.eng"]: "",
  ["2nd.pl.eng"]: "",
  ["3rd.sg.eng"]: "",
  ["3rd.pl.eng"]: "",
  ["1st.sg.span"]: "",
  ["1st.pl.span"]: "",
  ["2nd.sg.span"]: "",
  ["2nd.pl.span"]: "",
  ["3rd.sg.span"]: "",
  ["3rd.pl.span"]: "",
});