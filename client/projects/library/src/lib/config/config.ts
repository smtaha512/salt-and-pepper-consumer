import { InjectionToken } from '@angular/core';

export interface Config {
  baseUrl: string;
  loaderExpemtedUrls: string[];
  localDbName: string;
  ignoreActions?: string[];
}

export const CONFIG = new InjectionToken<Config>('config');
