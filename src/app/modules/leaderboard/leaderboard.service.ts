import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { ApiService } from '@services/api/api.service';

export interface LeaderboardRecord {
  leaderboard_id: number;
  score: number;
  user_id: number;
  created_at: Date;
  username: string;
}

export interface LeaderboardResponse {
  users: LeaderboardRecord[];
}

export interface UserRecord {
  user: {
    user_id: number;
    name: string;
    email_address: string;
  };
}

export interface PostLeaderboardRecord {
  user_id: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private api = inject(ApiService);

  public leaderboard$: Observable<LeaderboardRecord[]> = this.getLeaderboard();

  public getLeaderboard(): Observable<LeaderboardRecord[]> {
    return this.api.get<LeaderboardResponse>('/leaderboard').pipe(
      map((response) => (response as LeaderboardResponse).users),
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

  public getUserDetails(userId: number): Observable<UserRecord> {
    return this.api
      .get<UserRecord>(`/users/${userId}`)
      .pipe(map((response) => response as UserRecord));
  }

  public postToLeaderboard(
    user_id: string,
    score: number
  ): Observable<PostLeaderboardRecord> {
    const payload = {
      user_id,
      score
    };
    return this.api.post<PostLeaderboardRecord>('/leaderboard', payload);
  }
}
