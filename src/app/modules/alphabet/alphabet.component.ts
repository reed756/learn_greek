import { Component, inject } from '@angular/core';
import { AlphabetService } from './alphabet.service';

@Component({
  selector: 'app-alphabet',
  imports: [],
  templateUrl: './alphabet.component.html',
  styleUrl: './alphabet.component.scss'
})
export class AlphabetComponent {
  private alphabet = inject(AlphabetService);
  protected alphabetData = this.alphabet.alphabetData;

  protected startQuiz(): void {
    this.alphabet.startQuiz();
  }
}
