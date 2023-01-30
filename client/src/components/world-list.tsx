import React, { FC, useState } from "react";
import { useStore } from "../state/store";
import { BaseWordPairDTO, Case, ExtendedWordDTO, Gender, GrammaticalNumber, PartsOfSpeech, ResponseBody, Roles, Store } from "../types";
import { executeFetch, getWordPairsByPerson } from "../utils";
import { AddNewWord } from "./TEST/adding-new-word";
import { SelectedWord } from "./TEST/selectedWordTEST";
import { ExtractedState, ExtractedVerb, ExtractedWord } from "./TEST/types";

const convertToForm = (partOfSpeech: PartsOfSpeech, { wordPairs }: ExtendedWordDTO): ExtractedState => {
  if (wordPairs.length === 0) throw Error("EMPTY WORD PAIR ARRAY");

  switch (partOfSpeech) {
    
    case PartsOfSpeech.NOUN: {
      const singular = wordPairs.find(wp => wp.number === GrammaticalNumber.SINGULAR);
      const plural = wordPairs.find(wp => wp.number === GrammaticalNumber.PLURAL);
    
      if (!singular || !plural) throw Error("MISSING NOUN");
  
      return {
        gender: (wordPairs[0].gender as Gender),
        english: {
          singular: singular.english,
          plural: plural.english
        },
        spanish: {
          singular: singular.spanish,
          plural: plural.spanish
        }
      };
    };

    case PartsOfSpeech.CONJUNCTION: {
      return {
        english: wordPairs[0].english,
        spanish: wordPairs[0].spanish
      };
    };

    case PartsOfSpeech.ADVERB: {
      return {
        english: wordPairs[0].english,
        spanish: wordPairs[0].spanish
      };
    };

    case PartsOfSpeech.PREPOSITION: {
      return {
        english: wordPairs[0].english,
        spanish: wordPairs[0].spanish
      };
    };

    case PartsOfSpeech.PRONOUN: {
      const throwError = (item: any) => {
        if (item === null || item === undefined) {
          console.log(item);
          throw Error("MISSING A CASE");
        } else return item;
      };

      const nom = wordPairs.filter(wp => wp.case === Case.NOMINITIVE);
      const gen = wordPairs.filter(wp => wp.case === Case.GENITIVE);
      const dat = wordPairs.filter(wp => wp.case === Case.DATIVE);
      const acc = wordPairs.filter(wp => wp.case === Case.ACCUSITIVE);

      const gender = wordPairs[0].gender === null ? "" : wordPairs[0].gender as Gender;

      // console.log(wordPairs[0])
      // throwError(wordPairs[0].gender);

      const nomSingular = nom.find(wp => wp.number === GrammaticalNumber.SINGULAR);
      const nomPlural = nom.find(wp => wp.number === GrammaticalNumber.PLURAL);
      
      const datSingular = dat.find(wp => wp.number === GrammaticalNumber.SINGULAR);
      const datPlural = dat.find(wp => wp.number === GrammaticalNumber.PLURAL);
      
      const accSingular = acc.find(wp => wp.number === GrammaticalNumber.SINGULAR);
      const accPlural = acc.find(wp => wp.number === GrammaticalNumber.PLURAL);
      
      const genMasc = gen.filter(wp => wp.gender === Gender.MASCULINE);
      
      throwError(genMasc);
      
      const mascSingular = genMasc.find(wp => wp.gender = GrammaticalNumber.SINGULAR);
      const mascPlural = genMasc.find(wp => wp.gender = GrammaticalNumber.PLURAL);
      
      const femMasc = gen.filter(wp => wp.gender === Gender.MASCULINE);
      
      throwError(femMasc);

      const femSingular = genMasc.find(wp => wp.gender = GrammaticalNumber.SINGULAR);
      const femPlural = genMasc.find(wp => wp.gender = GrammaticalNumber.PLURAL);

      // console.log("nomSingular " + nomSingular)
      // console.log("nomPlural " + nomPlural)
      // console.log("datSingular " + datSingular)
      // console.log("datPlural " + datPlural)
      // console.log("accSingular " + accSingular)
      // console.log("accPlural " + accPlural)
      // console.log("genMasc " + genMasc)
      // console.log("mascSingular " + mascSingular)
      // console.log("mascPlural " + mascPlural)
      // console.log("femMasc " + femMasc)
      // console.log("femSingular " + femSingular)
      // console.log("femPlural " + femPlural)

      return {
        ["gender"]: gender,
        ["nom.sg.eng"]: nomSingular ? nomSingular.english : throwError(nomSingular),
        ["nom.sg.span"]: nomSingular ? nomSingular.spanish : throwError(nomSingular),
        ["nom.pl.eng"]: nomPlural ? nomPlural.english : throwError(nomPlural),
        ["nom.pl.span"]: nomPlural ? nomPlural.spanish : throwError(nomPlural),
        ["dat.sg.eng"]: datSingular ? datSingular.english : throwError(datSingular),
        ["dat.sg.span"]: datSingular ? datSingular.spanish : throwError(datSingular),
        ["dat.pl.eng"]: datPlural ? datPlural.english : throwError(datPlural),
        ["dat.pl.span"]: datPlural ? datPlural.spanish : throwError(datPlural),
        ["acc.sg.eng"]: accSingular ? accSingular.english : throwError(accSingular),
        ["acc.sg.span"]: accSingular ? accSingular.spanish : throwError(accSingular),
        ["acc.pl.eng"]: accPlural ? accPlural.english : throwError(accPlural),
        ["acc.pl.span"]: accPlural ? accPlural.spanish : throwError(accPlural),
        ["gen.masc.sg.eng"]: mascSingular ? mascSingular.english : throwError(mascSingular),
        ["gen.masc.sg.span"]: mascSingular ? mascSingular.spanish : throwError(mascSingular),
        ["gen.masc.pl.eng"]: mascPlural ? mascPlural.english : throwError(mascPlural),
        ["gen.masc.pl.span"]: mascPlural ? mascPlural.spanish : throwError(mascPlural),
        ["gen.fem.sg.eng"]: femSingular ? femSingular.english : throwError(femSingular),
        ["gen.fem.sg.span"]: femSingular ? femSingular.spanish : throwError(femSingular),
        ["gen.fem.pl.eng"]: femPlural ? femPlural.english : throwError(femPlural),
        ["gen.fem.pl.span"]: femPlural ? femPlural.spanish : throwError(femPlural),
      };
    };

    case PartsOfSpeech.VERB: {
      const infinitive = wordPairs.find(wp => wp.infinitive === true);

      if (!infinitive) throw Error("NO INFINITIVE");
  
      const form: ExtractedVerb = {
        ["infinitive"]: infinitive.english,
        ["1st.sg.eng"]: getWordPairsByPerson("ENGLISH", wordPairs, wp => wp.person === 1).singular,
        ["1st.pl.eng"]: getWordPairsByPerson("SPANISH", wordPairs, wp => wp.person === 1).plural,
        ["2nd.sg.eng"]: getWordPairsByPerson("ENGLISH", wordPairs, wp => wp.person === 1).singular,
        ["2nd.pl.eng"]: getWordPairsByPerson("SPANISH", wordPairs, wp => wp.person === 1).plural,
        ["3rd.sg.eng"]: getWordPairsByPerson("ENGLISH", wordPairs, wp => wp.person === 2).singular,
        ["3rd.pl.eng"]: getWordPairsByPerson("SPANISH", wordPairs, wp => wp.person === 2).plural,
        ["1st.sg.span"]: getWordPairsByPerson("ENGLISH", wordPairs, wp => wp.person === 2).singular,
        ["1st.pl.span"]: getWordPairsByPerson("SPANISH", wordPairs, wp => wp.person === 2).plural,
        ["2nd.sg.span"]: getWordPairsByPerson("ENGLISH", wordPairs, wp => wp.person === 3).singular,
        ["2nd.pl.span"]: getWordPairsByPerson("SPANISH", wordPairs, wp => wp.person === 3).plural,
        ["3rd.sg.span"]: getWordPairsByPerson("ENGLISH", wordPairs, wp => wp.person === 3).singular,
        ["3rd.pl.span"]: getWordPairsByPerson("SPANISH", wordPairs, wp => wp.person === 3).plural
      };

      return form;
    };

    case PartsOfSpeech.ADJECTIVE: {
      const masculine = wordPairs.filter(wp => wp.gender === Gender.MASCULINE);
      const feminine = wordPairs.filter(wp => wp.gender === Gender.FEMININE);

      if (!masculine || !feminine) throw Error("MISSING ADJECTIVE BY GENDER");

      const masculineSingular = masculine.find(wp => wp.number === GrammaticalNumber.SINGULAR);
      const masculinePlural = masculine.find(wp => wp.number === GrammaticalNumber.PLURAL);
      const feminineSingular = feminine.find(wp => wp.number === GrammaticalNumber.SINGULAR);
      const femininePlural = feminine.find(wp => wp.number === GrammaticalNumber.PLURAL);

      if (!masculineSingular || !masculinePlural || !feminineSingular || !femininePlural) {
        throw Error("MISSING ADJECTIVE BY NUMBER");
      };

      return {
        english: {
          masculine: {
            singular: masculineSingular.english,
            plural: masculinePlural.english
          },
          feminine: {
            singular: feminineSingular.english,
            plural: femininePlural.english
          }
        },
        spanish: {
          masculine: {
            singular: masculineSingular.spanish,
            plural: masculinePlural.spanish
          },
          feminine: {
            singular: feminineSingular.spanish,
            plural: femininePlural.spanish
          }
        }
      }
    }
  };
};

const getExtractedWord = async (id: number): Promise<ExtractedWord> => {
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

  console.log(partOfSpeech);

  const extractedState: ExtractedState = convertToForm(partOfSpeech, word);

  return {
    partOfSpeech: word.wordPairs[0].part_of_speech,
    group: word.wordPairs[0].group,
    structure: extractedState
  };
};

export const BaseWordListView: FC = () => {

  const isAdmin = useStore((state: Store) => state.auth.user!.role === Roles.ADMIN);
  const { wordList } = useStore((state: Store) => state.home);

  const [ isLoading, setIsLoading ] = useState(false);
  const [ wordSelected, setWordSelected ] = useState<ExtractedWord | null>(null);
  const [ wordBeingAdded, setWordBeingAdded ] = useState(false)

  const get = async (id: number): Promise<void> => {
    setIsLoading(true);
    setWordSelected(await getExtractedWord(id));
    setIsLoading(false);
  };

  if (isLoading) return (<>LOADING...</>);

  if (wordSelected) {
    return (
      <SelectedWord setWordSelected={setWordSelected} word={wordSelected} />
    );  
  };

  if (wordBeingAdded) {
    return (
      <AddNewWord setWordBeingAdded={setWordBeingAdded} />
    );
  };

  return (
    <div>
      {!isAdmin ? null : <button onClick={() => setWordBeingAdded(true)}>ADD WORD</button>}
      <table>
          <thead>
              <tr>
                  <td>English</td>
                  <td>Spanish</td>
                  <td>Difficulty</td>
              </tr>
          </thead>
          <tbody>
          {wordList && wordList.map((word: BaseWordPairDTO) => (
              <tr key={word.word_pair_id} className="word-pair-list-item" onClick={(_e) => get(word.parent_word_id)}>
                  <td>{word.english}</td>
                  <td>{word.spanish}</td>
                  <td>{word.difficulty}</td>
              </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};