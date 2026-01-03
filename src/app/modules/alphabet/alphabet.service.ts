import { inject, Injectable, ResourceRef } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Alphabet, AlphabetApiRes } from '@interfaces/alphabet';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {
  private api = inject(ApiService);
  private router = inject(Router);

  private getAlphabet(): Observable<Alphabet[]> {
    return this.api
      .get<AlphabetApiRes>('/alphabet')
      .pipe(map((response) => (response as AlphabetApiRes).characters));
  }

  public alphabetData: ResourceRef<Alphabet[] | undefined> = rxResource({
    stream: () => this.getAlphabet()
  });

  public startQuiz(): void {
    this.router.navigate(['/quiz']);
  }
}
