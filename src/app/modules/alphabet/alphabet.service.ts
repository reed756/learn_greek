import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../shared/services/api/api.service';

export interface Alphabet {
  alphabet_id: number;
  greek_letter: string;
  phonetic_equivalent: string;
  pronounced_as: string;
}
export interface AlphabetApiRes {
  characters: Alphabet[];
}

@Injectable({
  providedIn: 'root',
})
export class AlphabetService {
  private api = inject(ApiService);

  public alphabet$: Observable<Alphabet[]> = this.getAlphabet();

  getAlphabet(): Observable<Alphabet[]> {
    return this.api
      .get<AlphabetApiRes>(environment.apiUrl + '/alphabet')
      .pipe(map(response => (response as AlphabetApiRes).characters));
  }
}
