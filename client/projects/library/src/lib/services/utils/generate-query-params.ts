import { HttpParams } from '@angular/common/http';

export type AllowedValue = string | number | boolean;
export type ParamType = Record<string, AllowedValue | AllowedValue[]>;

export function generateQueryParams<T>(params: T): HttpParams {
  let httpParams = new HttpParams();

  for (const key in params) {
    if (params.hasOwnProperty(key) && !(params[key] === null || params[key] === undefined)) {
      if (Array.isArray(params[key])) {
        (params[key] as unknown as any[]).forEach((item) => (httpParams = httpParams.append(key, item.toString())));
        continue;
      }
      httpParams = httpParams.set(key, params[key].toString());
    }
  }

  return httpParams;
}
