import { Component, inject, input, signal } from '@angular/core';
import { QuizAnswer, QuizQuestion, QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-card',
  imports: [],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss'
})
export class QuizCardComponent {
  protected readonly quiz = inject(QuizService);

  protected readonly quizQuestions = this.quiz.quizQuestions;

  readonly question = input<QuizQuestion>();
  readonly index = input<number>();

  protected feedback = signal<string>('');

  protected selectAnswer(option: QuizAnswer): void {
    if (option.correct) {
      this.feedback.set('Correct!');
    } else {
      const correctOption = this.question()?.options.find((o) => o.correct);
      const correctStr = `${correctOption?.letter.upper_case_letter} - ${correctOption?.letter.lower_case_letter}`;
      this.feedback.set(`Wrong! The correct answer was ${correctStr}`);
    }
    setTimeout(() => {
      this.quiz.selectAnswer(option);
      this.resetFeedback();
    }, 2000);
  }

  private resetFeedback(): void {
    this.feedback.set('');
  }
}
