import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardConfig } from '../../../shared/interfaces/card';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  readonly cardConfig = input<CardConfig>();
}
