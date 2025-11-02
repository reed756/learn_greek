import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { LeaderboardService } from 'app/modules/leaderboard/leaderboard.service';

@Component({
  selector: 'app-quiz-results',
  imports: [ReactiveFormsModule],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizResultsComponent {
  protected readonly quizService = inject(QuizService);
  protected readonly leaderboard = inject(LeaderboardService);
  protected readonly router = inject(Router);

  protected readonly quizSession = this.quizService.quizSession;

  protected readonly postLeaderboardForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3), Validators.maxLength(20)]
    })
  });

  protected goToAlphabet(): void {
    this.router.navigate(['/alphabet']);
  }

  protected postToLeaderboard(): void {
    if (this.postLeaderboardForm.valid) {
      // const name = this.postLeaderboardForm.get('name')?.value;
      const score = this.quizSession().score * 10; // Assuming score is out of 10

      this.leaderboard.postToLeaderboard('2', score).subscribe();

      // Optionally, reset the form after posting
      this.postLeaderboardForm.reset();
    }
  }
}
