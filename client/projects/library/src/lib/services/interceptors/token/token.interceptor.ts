import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from '../../storage/storage.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly storage: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url } = req;
    if (url.includes('/api') && !this.isExempted(req)) {
      return from(this.storage.getToken()).pipe(
        switchMap((token) => next.handle(req.clone({ headers: new HttpHeaders({ authorization: token }) })))
      );
    }
    return next.handle(req);
  }

  isExempted(req: HttpRequest<any>): boolean {
    const exemptedAPIs = [
      { method: 'GET', endpoint: '/api/menus' },
      { method: 'GET', endpoint: '/api/items' },
      { method: 'POST', endpoint: '/auth/login' },
      { method: 'POST', endpoint: '/auth/signup' },
      { method: 'POST', endpoint: '/post-redirect' },
    ];
    return exemptedAPIs.some((api) => api.method === req.method && req.url.includes(api.endpoint));
  }
}
