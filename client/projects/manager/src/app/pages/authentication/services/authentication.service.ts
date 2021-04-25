import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminInterface } from 'library/library';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationResponseInterface } from '../models/authentication.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  baseUrl = '/auth';
  constructor(private readonly http: HttpClient) {}

  signin({ username, password }: { username: string; password: string }): Observable<AuthenticationResponseInterface> {
    return this.http
      .post<AdminInterface>(`${this.baseUrl}/login?t=admin`, { username, password }, { observe: 'response', responseType: 'json' })
      .pipe(map((response) => ({ body: response.body, token: response.headers.get('authorization') })));
  }
}
