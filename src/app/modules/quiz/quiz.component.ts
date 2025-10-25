import { Component, inject } from '@angular/core';
import { QuizService } from './quiz.service';
import { QuizCardComponent } from './quiz-card/quiz-card.component';

@Component({
  selector: 'app-quiz',
  imports: [QuizCardComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  protected quiz = inject(QuizService);

  protected readonly quizQuestions = this.quiz.quizQuestions;
  protected readonly quizSession = this.quiz.quizSession;
}
