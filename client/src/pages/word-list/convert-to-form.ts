import { Case, ExtendedWordDTO, ExtractedState, Gender, GrammaticalNumber, PartsOfSpeech } from "../../types";
import { getWordPairsByPerson } from "../../utils";


export const convertToForm = (partOfSpeech: PartsOfSpeech, { wordPairs }: ExtendedWordDTO): ExtractedState => {
  if (wordPairs.length === 0) throw Error("EMPTY WORD PAIR ARRAY");

  switch (partOfSpeech) {
    
    case PartsOfSpeech.NOUN: {
      const singular = wordPairs.find(wp => wp.number === GrammaticalNumber.SINGULAR);
      const plural = wordPairs.find(wp => wp.number === GrammaticalNumber.PLURAL);
    
      if (!singular || !plural) throw Error("MISSING NOUN");
  
      return {
        ["gender"]: (wordPairs[0].gender as Gender),
        ["sg"]: {
          id: singular.word_pair_id!,
          difficulty: singular.difficulty,
          wordPair: {
            ["eng"]: singular.english,
            ["span"]: singular.spanish
          }
        },
        ["pl"]: {
          id: plural.word_pair_id!,
          difficulty: plural.difficulty,
          wordPair: {
            ["eng"]: plural.english,
            ["span"]: plural.spanish
          }
        },
      };
    };

    case PartsOfSpeech.CONJUNCTION: {
      return {
        id: wordPairs[0].word_pair_id!,
        difficulty: wordPairs[0].difficulty,
        wordPair: {
          ["eng"]: wordPairs[0].english,
          ["span"]: wordPairs[0].spanish
        }
      };
    };

    case PartsOfSpeech.ADVERB: {
      return {
        id: wordPairs[0].word_pair_id!,
        difficulty: wordPairs[0].difficulty,
        wordPair: {
          ["eng"]: wordPairs[0].english,
          ["span"]: wordPairs[0].spanish
        }
      };
    };

    case PartsOfSpeech.PREPOSITION: {
      return {
        id: wordPairs[0].word_pair_id!,
        difficulty: wordPairs[0].difficulty,
        wordPair: {
          ["eng"]: wordPairs[0].english,
          ["span"]: wordPairs[0].spanish
        }
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

      return {
        ["gender"]: gender,
        ["nom.sg"]: {
          id: nomSingular!.word_pair_id!,
          difficulty: nomSingular!.difficulty,
          wordPair: {
            ["eng"]: nomSingular!.english,
            ["span"]: nomSingular!.spanish
          }
        },
        ["nom.pl"]: {
          id: nomPlural!.word_pair_id!,
          difficulty: nomPlural!.difficulty,
          wordPair: {
            ["eng"]: nomPlural!.english,
            ["span"]: nomPlural!.spanish
          }
        },
        ["dat.sg"]: {
          id: datSingular!.word_pair_id!,
          difficulty: datSingular!.difficulty,
          wordPair: {
            ["eng"]: datSingular!.english,
            ["span"]: datSingular!.spanish
          }
        },
        ["dat.pl"]: {
          id: datPlural!.word_pair_id!,
          difficulty: datPlural!.difficulty,
          wordPair: {
            ["eng"]: datPlural!.english,
            ["span"]: datPlural!.spanish
          }
        },
        ["acc.sg"]: {
          id: accSingular!.word_pair_id!,
          difficulty: accSingular!.difficulty,
          wordPair: {
            ["eng"]: accSingular!.english,
            ["span"]: accSingular!.spanish
          }
        },
        ["acc.pl"]: {
          id: accPlural!.word_pair_id!,
          difficulty: accPlural!.difficulty,
          wordPair: {
            ["eng"]: accPlural!.english,
            ["span"]: accPlural!.spanish
          }
        },
        ["gen.masc.sg"]: {
          id: mascSingular!.word_pair_id!,
          difficulty: mascSingular!.difficulty,
          wordPair: {
            ["eng"]: mascSingular!.english,
            ["span"]: mascSingular!.spanish
          }
        },
        ["gen.masc.pl"]: {
          id: mascPlural!.word_pair_id!,
          difficulty: mascPlural!.difficulty,
          wordPair: {
            ["eng"]: mascPlural!.english,
            ["span"]: mascPlural!.spanish
          }
        },
        ["gen.fem.sg"]: {
          id: femSingular!.word_pair_id!,
          difficulty: femSingular!.difficulty,
          wordPair: {
            ["eng"]: femSingular!.english,
            ["span"]: femSingular!.spanish
          }
        },
        ["gen.fem.pl"]: {
          id: femPlural!.word_pair_id!,
          difficulty: femPlural!.difficulty,
          wordPair: {
            ["eng"]: femPlural!.english,
            ["span"]: femPlural!.spanish
          }
        },
      };
    };

    case PartsOfSpeech.VERB: {
      const state = {
        ["inf"]: wordPairs.find(wp => wp.infinitive === true),
        ["1st.sg"]: wordPairs.find(wp => wp.number === GrammaticalNumber.SINGULAR && wp.person === 1),
        ["1st.pl"]: wordPairs.find(wp => wp.number === GrammaticalNumber.PLURAL && wp.person === 1),
        ["2nd.sg"]: wordPairs.find(wp => wp.number === GrammaticalNumber.SINGULAR && wp.person === 2),
        ["2nd.pl"]: wordPairs.find(wp => wp.number === GrammaticalNumber.PLURAL && wp.person === 2),
        ["3rd.sg"]: wordPairs.find(wp => wp.number === GrammaticalNumber.SINGULAR && wp.person === 3),
        ["3rd.pl"]: wordPairs.find(wp => wp.number === GrammaticalNumber.PLURAL && wp.person === 3),
      };

      return {
        ["inf"]: {
          id: state["inf"]!.word_pair_id!,
          difficulty: state["inf"]!.difficulty,
          wordPair: {
            ["eng"]: state["inf"]!.english,
            ["span"]: state["inf"]!.spanish
          }
        },
        ["1st.sg"]: {
          id: state["1st.sg"]!.word_pair_id!,
          difficulty: state["1st.sg"]!.difficulty,
          wordPair: {
            ["eng"]: state["1st.sg"]!.english,
            ["span"]: state["1st.sg"]!.spanish
          }
        },
        ["1st.pl"]: {
          id: state["1st.pl"]!.word_pair_id!,
          difficulty: state["1st.pl"]!.difficulty,
          wordPair: {
            ["eng"]: state["1st.pl"]!.english,
            ["span"]: state["1st.pl"]!.spanish
          }
        },
        ["2nd.sg"]: {
          id: state["2nd.sg"]!.word_pair_id!,
          difficulty: state["2nd.sg"]!.difficulty,
          wordPair: {
            ["eng"]: state["2nd.sg"]!.english,
            ["span"]: state["2nd.sg"]!.spanish
          }
        },
        ["2nd.pl"]: {
          id: state["2nd.pl"]!.word_pair_id!,
          difficulty: state["2nd.pl"]!.difficulty,
          wordPair: {
            ["eng"]: state["2nd.pl"]!.english,
            ["span"]: state["2nd.pl"]!.spanish
          }
        },
        ["3rd.sg"]: {
          id: state["3rd.sg"]!.word_pair_id!,
          difficulty: state["3rd.sg"]!.difficulty,
          wordPair: {
            ["eng"]: state["3rd.sg"]!.english,
            ["span"]: state["3rd.sg"]!.spanish
          }
        },
        ["3rd.pl"]: {
          id: state["3rd.pl"]!.word_pair_id!,
          difficulty: state["3rd.pl"]!.difficulty,
          wordPair: {
            ["eng"]: state["3rd.pl"]!.english,
            ["span"]: state["3rd.pl"]!.spanish
          }
        },
      };
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
        ["masc.sg"]: {
          id: masculineSingular.word_pair_id!,
          difficulty: masculineSingular.difficulty,
          wordPair: {
            ["eng"]: masculineSingular.english,
            ["span"]: masculineSingular.spanish,
          }
        },
        ["masc.pl"]: {
          id: masculinePlural.word_pair_id!,
          difficulty: masculinePlural.difficulty,
          wordPair: {
            ["eng"]: masculinePlural.english,
            ["span"]: masculinePlural.spanish,
          }
        },
        ["fem.sg"]: {
          id: feminineSingular.word_pair_id!,
          difficulty: feminineSingular.difficulty,
          wordPair: {
            ["eng"]: feminineSingular.english,
            ["span"]: feminineSingular.spanish,
          }
        },
        ["fem.pl"]: {
          id: femininePlural.word_pair_id!,
          difficulty: femininePlural.difficulty,
          wordPair: {
            ["eng"]: femininePlural.english,
            ["span"]: femininePlural.spanish,
          }
        }
      };
    };
  };
};