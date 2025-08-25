import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlphabetService } from './alphabet.service';

@Component({
  selector: 'app-alphabet',
  imports: [],
  templateUrl: './alphabet.component.html',
  styleUrl: './alphabet.component.scss',
})
export class AlphabetComponent {
  private alphabet = inject(AlphabetService);
  protected alphabetData = toSignal(this.alphabet.alphabet$);

  protected startQuiz() {
    this.alphabet.startQuiz();
  }
}
