import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '@services/api/api.service';

export interface LeaderboardRecord {
  leaderboard_id: number;
  score: number;
  user_id: number;
  created_at: Date;
  username: string;
}

export interface UserRecord {
  user: {
    user_id: number;
    name: string;
    email_address: string;
  };
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
        map((response) => (response as { users: LeaderboardRecord[] }).users),
        switchMap((leaderboardRecords) => {
          const userDetailsObservables = leaderboardRecords.map((record) =>
            this.getUserDetails(record.user_id).pipe(
              map((userDetails) => ({
                ...record,
                username: userDetails.user.name
              }))
            )
          );
          return forkJoin(userDetailsObservables);
        })
      );
  }

  getUserDetails(userId: number): Observable<UserRecord> {
    return this.api
      .get<UserRecord>(environment.apiUrl + `/users/${userId}`)
      .pipe(map((response) => response as UserRecord));
  }
}
