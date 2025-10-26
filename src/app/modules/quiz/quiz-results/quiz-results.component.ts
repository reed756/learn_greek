import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-results',
  imports: [],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizResultsComponent {
  protected readonly quizService = inject(QuizService);
  protected readonly router = inject(Router);

  protected readonly quizSession = this.quizService.quizSession;

  protected goToAlphabet(): void {
    this.router.navigate(['/alphabet']);
  }
}
