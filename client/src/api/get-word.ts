import { convertToForm } from "../pages/word-list/convert-to-form";
import { ExtendedWordDTO, ExtractedState, ExtractedWord, ResponseBody } from "../types";
import { executeFetch } from "../utils";


export const getExtractedWord = async (id: number): Promise<ExtractedWord> => {
  const response: Response = await executeFetch("GET", `http://localhost:8000/get-word/${id}`);
  const { data: word, error, message }: ResponseBody<ExtendedWordDTO> = await response.json();

  if (!([200, 201, 204].includes(response.status)) || !word) {
    throw Error(`
      RESPONSE:
      STATUS -- ${response.status} \n
      ERROR -- ${error ? error : "NONE"} \n
      MESSAGE -- ${message ? message : "NONE"}
    `);
  };
  
  const partOfSpeech = word.wordPairs[0].part_of_speech;

  const extractedState: ExtractedState = convertToForm(partOfSpeech, word);

  if (!word.id) throw Error("NO WORD ID");

  return {
    partOfSpeech: word.wordPairs[0].part_of_speech,
    id: word.id,
    group: word.wordPairs[0].group,
    state: extractedState
  };
};