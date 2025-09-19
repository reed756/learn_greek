import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../shared/services/api/api.service';

export interface LeaderboardRecord {
  leaderboard_id: number;
  score: number;
  user_id: number;
  created_at: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private api = inject(ApiService);

  public leaderboard$: Observable<LeaderboardRecord[]> = this.getLeaderboard();

  getLeaderboard(): Observable<LeaderboardRecord[]> {
    return this.api
      .get<LeaderboardRecord>(environment.apiUrl + '/leaderboard')
      .pipe(
        map((response) => (response as { users: LeaderboardRecord[] }).users)
      );
  }
}
