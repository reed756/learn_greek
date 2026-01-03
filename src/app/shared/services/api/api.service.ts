import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, isDevMode } from '@angular/core';
import { prodEnvironment } from 'environments/environment.production';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  private apiUrl = isDevMode() ? environment.apiUrl : prodEnvironment.apiUrl;

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, { params });
  }
  public post<T>(url: string, body: T): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, body);
  }
  public patch(url: string, body: unknown): Observable<unknown> {
    return this.http.patch(this.apiUrl + url, body);
  }
}
