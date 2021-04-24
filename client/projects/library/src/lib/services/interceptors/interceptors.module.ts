import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { Config, CONFIG } from '../../config/config';
import { BaseUrlInterceptor } from './base-url/base-url.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from '../loader/loader.service';
import { ErrorInterceptor } from './error/error.interceptor';
import { TokenInterceptor } from './token/token.interceptor';

const baseUrlInterceptorFactory = (config: Config) => new BaseUrlInterceptor(config);
const loaderInterceptorFactory = (config: Config, loaderService: LoaderService) => new LoaderInterceptor(config, loaderService);

@NgModule()
export class InterceptorsModule {
  static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: InterceptorsModule,
      providers: [
        { provide: CONFIG, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useFactory: baseUrlInterceptorFactory, multi: true, deps: [CONFIG] },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      ],
    };
  }
}
