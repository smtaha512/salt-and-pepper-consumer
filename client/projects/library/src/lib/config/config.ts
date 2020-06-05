import { InjectionToken } from '@angular/core';

export interface Config {
  baseUrl: string;
}

export const CONFIG = new InjectionToken<Config>('config');
