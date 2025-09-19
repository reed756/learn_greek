import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LeaderboardRecord, LeaderboardService } from './leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  imports: [DatePipe],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent {
  private leaderboard = inject(LeaderboardService);
  protected leaderboardData = toSignal<LeaderboardRecord[]>(
    this.leaderboard.leaderboard$
  );
}
