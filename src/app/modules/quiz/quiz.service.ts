import { inject, Injectable, signal } from '@angular/core';
import { Alphabet, AlphabetService } from '../alphabet/alphabet.service';

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
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly alphabet = inject(AlphabetService);

  public readonly quizQuestions = signal<QuizQuestion[]>([]);
  public readonly quizSession = signal<QuizSession>({
    currentQuestionIdx: 0,
    score: 0
  });

  public loadQuizQuestions(noOfQuestions: number): void {
    for (let i = 0; i < noOfQuestions; i++) {
      const rightAnswer = this.pickRandomCorrectLetter();
      const wrongAnswers = this.pickRandomWrongLetters(3);
      const options = [...wrongAnswers, { letter: rightAnswer, correct: true }];
      this.quizQuestions.update((val) => [
        ...val,
        {
          correctLetter: rightAnswer.greek_letter,
          options: this.shuffleOptions(options),
          correctOptionIdx: options.findIndex((o) => o.correct)
        }
      ]);
    }
  }

  private pickRandomCorrectLetter(): Alphabet {
    const randomIndex = Math.floor(
      Math.random() * (this.alphabet.alphabetData.value()?.length as number)
    );
    const correctLetter = this.alphabet.alphabetData.value()![randomIndex];
    // Ensure we don't have the same letter twice in a quiz
    while (
      this.quizQuestions()
        .map((q) => q.correctLetter)
        .includes(correctLetter.greek_letter)
    ) {
      return this.pickRandomCorrectLetter();
    }
    return correctLetter;
  }

  private pickRandomWrongLetters(
    count: number
  ): { letter: Alphabet; correct: boolean }[] {
    const wrongLetters: { letter: Alphabet; correct: boolean }[] = [];
    for (let i = 0; i < count; i++) {
      const wrongLetter = this.pickRandomWrongLetter();
      // Ensure we don't pick the same wrong letter twice
      while (
        wrongLetters.find(
          (l) => l.letter.greek_letter === wrongLetter.letter.greek_letter
        )
      ) {
        wrongLetter.letter = this.pickRandomWrongLetter().letter;
      }
      wrongLetters.push(this.pickRandomWrongLetter());
    }
    return wrongLetters;
  }

  private pickRandomWrongLetter(): { letter: Alphabet; correct: boolean } {
    const randomIndex = Math.floor(
      Math.random() * (this.alphabet.alphabetData.value()?.length as number)
    );
    return {
      letter: this.alphabet.alphabetData.value()![randomIndex],
      correct: false
    };
  }

  private shuffleOptions(options: QuizAnswer[]): QuizAnswer[] {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }

  public selectAnswer(answer: QuizAnswer): void {
    if (answer.correct) {
      this.quizSession.update((val) => ({
        ...val,
        score: val.score + 1
      }));
    }
    if (
      this.quizSession().currentQuestionIdx <
      this.quizQuestions().length - 1
    ) {
      this.quizSession.update((val) => ({
        ...val,
        currentQuestionIdx: val.currentQuestionIdx + 1
      }));
    }
  }
}
