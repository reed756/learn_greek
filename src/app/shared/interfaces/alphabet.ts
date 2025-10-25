export interface Alphabet {
  alphabet_id: number;
  greek_letter: string;
  lower_case_letter: string;
  upper_case_letter: string;
  phonetic_equivalent: string;
  pronounced_as: string;
}
export interface AlphabetApiRes {
  characters: Alphabet[];
}
