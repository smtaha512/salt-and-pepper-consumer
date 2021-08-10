import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CONFIG, Config } from '../../config/config';
import { LoaderService } from '../loader/loader.service';

@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {
  constructor(@Inject(CONFIG) private readonly config: Config, private readonly loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.shouldShowLoader(req)) {
      return this.loaderService.presentLoader().pipe(
        switchMap(() => next.handle(req)),
        switchMap((res) => this.loaderService.hideLoader().pipe(map(() => res))),
        catchError((error) => this.loaderService.hideLoader().pipe(map(() => error)))
      );
    }
    return next.handle(req);
  }

  private shouldShowLoader(request: HttpRequest<any>) {
    const isUrlExempted = this.config.loaderExpemtedUrls.some((exemptedUrl) => exemptedUrl.includes(request.url));
    const shouldShowHeader = request.headers.get('show-loader');
    return !(isUrlExempted || shouldShowHeader === 'false');
  }
}
