import { computed, inject, Injectable, signal } from '@angular/core';
import { AlphabetService } from '../alphabet/alphabet.service';
import { QuizSession, QuizQuestion, QuizAnswer } from '@interfaces/question';
import { Alphabet } from '@interfaces/alphabet';
import { SessionService } from '@services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly alphabet = inject(AlphabetService);
  private readonly session = inject(SessionService);

  public readonly quizSession = signal<QuizSession>({
    currentQuestionIdx: 0,
    score: 0,
    finished: false
  });
  public readonly quizQuestions = computed<QuizQuestion[]>(() => {
    const storedQuestions = this.session.getItem('quizQuestions');
    if (storedQuestions && !this.quizSession().finished) {
      return JSON.parse(storedQuestions) as QuizQuestion[];
    } else if (storedQuestions && this.quizSession().finished) {
      this.session.removeItem('quizQuestions');
      return this.loadQuizQuestions(10);
    } else {
      return this.loadQuizQuestions(10);
    }
  });

  public loadQuizQuestions(noOfQuestions: number): QuizQuestion[] {
    if (this.alphabet.alphabetData.value() === undefined) {
      return [];
    }
    const quizQuestions: QuizQuestion[] = [];
    for (let i = 0; i < noOfQuestions; i++) {
      const rightAnswer = this.pickRandomCorrectLetter(quizQuestions);
      const wrongAnswers = this.pickRandomWrongLetters(3, rightAnswer);
      const options = [...wrongAnswers, { letter: rightAnswer, correct: true }];
      quizQuestions.push({
        correctLetter: rightAnswer.greek_letter,
        options: this.shuffleOptions(options),
        correctOptionIdx: options.findIndex((o) => o.correct)
      });
    }
    this.session.setItem('quizQuestions', JSON.stringify(quizQuestions));
    return quizQuestions;
  }

  private pickRandomCorrectLetter(quizQuestions: QuizQuestion[]): Alphabet {
    const randomIndex = Math.floor(
      Math.random() * (this.alphabet.alphabetData.value()?.length as number)
    );
    const correctLetter = this.alphabet.alphabetData.value()![randomIndex];
    // Ensure we don't have the same letter twice in a quiz
    while (
      quizQuestions
        .map((q) => q.correctLetter)
        .includes(correctLetter.greek_letter)
    ) {
      return this.pickRandomCorrectLetter(quizQuestions);
    }
    return correctLetter;
  }

  private pickRandomWrongLetters(
    count: number,
    rightAnswer: Alphabet
  ): { letter: Alphabet; correct: boolean }[] {
    const wrongLetters: { letter: Alphabet; correct: boolean }[] = [];
    for (let i = 0; i < count; i++) {
      const wrongLetter = this.pickRandomWrongLetter();
      // Ensure we don't pick the same wrong letter twice
      while (
        wrongLetters.find(
          (l) => l.letter.greek_letter === wrongLetter.letter.greek_letter
        ) ||
        wrongLetter.letter.greek_letter === rightAnswer.greek_letter
      ) {
        wrongLetter.letter = this.pickRandomWrongLetter().letter;
      }
      wrongLetters.push(wrongLetter);
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
      this.session.setItem('quizSession', JSON.stringify(this.quizSession()));
    }
    if (
      this.quizSession().currentQuestionIdx <
      this.quizQuestions().length - 1
    ) {
      this.quizSession.update((val) => ({
        ...val,
        currentQuestionIdx: val.currentQuestionIdx + 1
      }));
      this.session.setItem('quizSession', JSON.stringify(this.quizSession()));
    } else {
      this.quizSession.update((val) => ({
        ...val,
        finished: true
      }));
      this.session.setItem('quizSession', JSON.stringify(this.quizSession()));
    }
  }

  public retakeQuiz(): void {
    this.session.removeItem('quizSession');
    // Reset quiz session
    this.quizSession.set({
      currentQuestionIdx: 0,
      score: 0,
      finished: false
    });
  }
}
