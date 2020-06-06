import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { generateQueryParams, ParamType } from '../utils/generate-query-params';

@Injectable({ providedIn: 'root' })
export class BaseCrudService<Entity> {
  protected readonly base: string;

  constructor(protected readonly http: HttpClient) {}

  create(body: Partial<Entity>): Observable<Entity> {
    return this.http.post<Entity>(this.base, body);
  }

  read<T extends ParamType>(query?: T): Observable<Entity[]> {
    const params = generateQueryParams(query);
    return this.http.get<Entity[]>(this.base, { params });
  }

  update<T extends Partial<Entity>>(id: string, update: T) {
    return this.http.put<Entity>(`${this.base}/${id}`, update);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  getById(id: string) {
    return this.http.get(`${this.base}/${id}`);
  }
}
