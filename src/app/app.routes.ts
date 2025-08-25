import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./modules/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'alphabet',
    title: 'Alphabet',
    loadComponent: () =>
      import('./modules/alphabet/alphabet.component').then(c => c.AlphabetComponent),
  },
  {
    path: 'leaderboard',
    title: 'Leaderboard',
    loadComponent: () =>
      import('./modules/leaderboard/leaderboard.component').then(c => c.LeaderboardComponent),
  },
  {
    path: 'quiz',
    title: 'quiz',
    loadComponent: () => import('./modules/quiz/quiz.component').then(c => c.QuizComponent),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./modules/page-not-found/page-not-found.component').then(
        c => c.PageNotFoundComponent,
      ),
  },
];
