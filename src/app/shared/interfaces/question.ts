import { Alphabet } from './alphabet';

export interface QuizQuestion {
  correctLetter: string;
  options: QuizAnswer[];
  correctOptionIdx: number;
}

export interface QuizAnswer {
  letter: Alphabet;
  correct: boolean;
}

export interface QuizSession {
  currentQuestionIdx: number;
  score: number;
  finished: boolean;
}
