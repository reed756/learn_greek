import { Component, signal } from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    class: 'app-home',
  },
})
export class HomeComponent {
  protected cards = signal([
    {
      title: 'Greek Alphabet',
      description: 'Start your journey to learn the Greek Alphabet.',
      imageUrl: 'assets/images/greek-letters.jpg',
      link: '/alphabet',
      linkText: 'Learn the Greek Alphabet',
    },
    {
      title: 'Leaderboard',
      description: 'Check out the leaderboard to see how you rank against others.',
      imageUrl: 'assets/images/leaderboard.jpg',
      link: '/leaderboard',
      linkText: 'View Leaderboard',
    },
  ]);
}
