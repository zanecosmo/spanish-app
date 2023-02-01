import { ExtendedWordPairDTO, GrammaticalNumber, ResponseBody } from "./types";

export const hasNoCharacters = (text: string) => {
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== " ") return false;
    };
    return true;
};

export const validateInput = (value: string | null, input: string): string | null => {
    if (value === null) return `DOM does not contain ${input}-input element`;
    if (value.length === 0) return `* must enter a value for the ${input} input`;
    if (hasNoCharacters(value)) return `*${input} input must contain characters`;
    if (value.includes(" ")) return `${input} must not contain spaces`;
    if (input === "password" && value.length < 8) return `${input} must be at least 8 charaters`;
    return null;
};

export async function executeFetch(
    method: string,
    url: RequestInfo,
    body?: any
): Promise<Response> {    
    const request: RequestInit = {
        method: method,
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: "include",
    };

    if (body) request.body = JSON.stringify(body);
    
    const response: Response = await fetch(url, request);
    // console.log(response)
    
    return response;
};


export const getWordPairsByPerson = (
    language: string,
    wordPairs: ExtendedWordPairDTO[],
    callback: (wp: ExtendedWordPairDTO) => boolean
  ) => {
    const wordPairsByPerson = wordPairs.filter(callback);
  
    const singular = wordPairsByPerson.find(wp => wp.number === GrammaticalNumber.SINGULAR);
    const plural = wordPairsByPerson.find(wp => wp.number === GrammaticalNumber.PLURAL);
  
    if (!singular || !plural) throw Error("MISSING WORD BASED ON PERSON");
  
    return {
      id: singular.word_pair_id,
      singular: language === "SPANISH" ? singular.spanish : singular.english,
      plural: language === "SPANISH" ? plural.spanish : plural.english,
    };
  };


