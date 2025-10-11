import { Component, inject, input } from '@angular/core';
import { QuizQuestion, QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-card',
  imports: [],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss'
})
export class QuizCardComponent {
  protected quiz = inject(QuizService);

  protected readonly quizQuestions = this.quiz.quizQuestions;

  readonly question = input<QuizQuestion>();
  readonly index = input<number>();
}
