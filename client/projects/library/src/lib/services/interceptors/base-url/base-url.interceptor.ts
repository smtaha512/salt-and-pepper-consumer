import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CONFIG, Config } from '../../../config/config';

@Injectable({ providedIn: 'root' })
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(CONFIG) private readonly config: Config) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url } = req;

    if (url.startsWith('/')) {
      return next.handle(req.clone({ url: this.config.baseUrl + req.url }));
    }

    return next.handle(req);
  }
}
