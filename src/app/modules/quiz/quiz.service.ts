import { inject, Injectable } from '@angular/core';
import { AlphabetService } from '../alphabet/alphabet.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private alphabet = inject(AlphabetService);

  gameSession = {
    questionIndex: 0,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  };

  quizLetters: unknown[] = [];

  loadQuizLetters(letters: string[]): void {
    this.quizLetters = letters;
  }
}
