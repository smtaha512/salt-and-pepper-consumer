import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService, OrderInterface } from 'dist/library';
import { interval, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrdersHistoryService extends BaseCrudService<OrderInterface> {
  protected base = '/orders';
  constructor(protected readonly httpClient: HttpClient) {
    super(httpClient);
  }

  pollForOrders(): Observable<OrderInterface[]> {
    const currentDate = new Date().toISOString();
    return super.read({ date: currentDate });
    // return interval(2500).pipe(map(() =>new Date().toISOString()), switchMap((date) => super.read({date})));
  }

  getAllOrdersByUserId({ userId }: Record<'userId', string>): Observable<OrderInterface[]> {
    return super.read({ userId });
  }

  getAllOrdersByDateRange({ from, to }: { from: string; to: string }): Observable<OrderInterface[]> {
    return super.read({ from, to });
  }
}
