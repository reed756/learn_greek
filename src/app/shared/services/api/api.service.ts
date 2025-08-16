import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  public get<T>(url: string, params?: HttpParams): Observable<unknown> {
    return this.http.get<T>(url, { params });
  }
  public post(url: string, body: unknown): Observable<unknown> {
    return this.http.post(url, body);
  }
  public patch(url: string, body: unknown): Observable<unknown> {
    return this.http.patch(url, body);
  }
  public delete(url: string): Observable<unknown> {
    return this.http.delete(url);
  }
}
