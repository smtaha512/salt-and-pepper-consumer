import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsumerInterface } from 'dist/library';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationResponseInterface, SigninInterface } from './authentication.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly baseUrl = '/auth';
  constructor(private readonly http: HttpClient) {}

  getVerificationCode(contact: string): Observable<void> {
    return this.http.post<void>(`/post-redirect?url=${this.baseUrl}/verification-code`, { contact });
  }

  signin({ firstname, lastname, contact, email, code }: SigninInterface): Observable<AuthenticationResponseInterface> {
    return this.http
      .post<ConsumerInterface>(
        `${this.baseUrl}/login?t=user`,
        { firstname, lastname, contact, email, code },
        { observe: 'response', responseType: 'json' }
      )
      .pipe(map((response) => ({ body: response.body, token: response.headers.get('authorization') })));
  }
}
