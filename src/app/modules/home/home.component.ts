import { Component, signal } from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    class: 'app-home'
  }
})
export class HomeComponent {
  protected cards = signal([
    {
      title: 'Greek Alphabet',
      description: 'Learn the Greek Alphabet and then quiz yourself.',
      imageUrl: 'assets/images/greek-letters.png',
      link: '/alphabet',
      linkText: 'Learn the Greek Alphabet'
    },
    {
      title: 'Leaderboard',
      description:
        'Check out the leaderboard to see how you rank against others.',
      imageUrl: 'assets/images/trophy.png',
      link: '/leaderboard',
      linkText: 'View Leaderboard'
    }
  ]);
}
