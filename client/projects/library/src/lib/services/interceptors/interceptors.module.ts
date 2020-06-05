import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { Config, CONFIG } from '../../config/config';
import { BaseUrlInterceptor } from './base-url/base-url.interceptor';

const baseUrlInterceptorFactory = (config: Config) => new BaseUrlInterceptor(config);

@NgModule()
export class InterceptorsModule {
  static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: InterceptorsModule,
      providers: [
        { provide: CONFIG, useValue: config },
        { provide: HTTP_INTERCEPTORS, useFactory: baseUrlInterceptorFactory, multi: true, deps: [CONFIG] },
      ],
    };
  }
}
