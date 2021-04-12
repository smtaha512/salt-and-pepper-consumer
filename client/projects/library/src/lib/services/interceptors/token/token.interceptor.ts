import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { StorageService } from '../../storage/storage.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly storage: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url } = req;
    if (url.includes('/api')) {
      const headers = new HttpHeaders();
      return from(this.storage.getToken()).pipe(
        tap((token) => headers.set('authorization', token)),
        switchMap(() => next.handle(req.clone({ headers })))
      );
    }
    return next.handle(req);
  }
}
