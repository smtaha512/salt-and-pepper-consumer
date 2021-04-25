import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminInterface, BaseCrudService, OrderInterface } from 'dist/library';
import { orderBy } from 'lodash';
import { from, Observable } from 'rxjs';
import { delay, exhaustMap, map, switchMap } from 'rxjs/operators';
import { updateUser } from '../../../+state/user/user.actions';
import { user } from '../../../+state/user/user.selectors';
import { userId } from '../../../../../../consumer/src/app/+state/user/user.selectors';
import { Printer } from '../../../services/printer/printer';
import { GetOrdersQueryInterface } from '../models/get-orders-query.interface';

@Injectable({ providedIn: 'root' })
export class OrdersHistoryService extends BaseCrudService<OrderInterface> {
  protected base = '/orders';
  constructor(protected readonly httpClient: HttpClient, private readonly store: Store<any>, private readonly printer: Printer) {
    super(httpClient);
  }

  getById(id: string) {
    return super.getById(id);
  }

  pollForOrders(): Observable<void> {
    return this.store.select(user).pipe(
      delay(1000),
      map((user) => {
        const from = new Date(user.lastPolledAt);
        const to = new Date();
        to.setHours(23, 59, 59, 999);
        return { from, to, userId: user._id };
      }),
      switchMap(({ to: endOfCurrentDay, from: startOfCurrentDay, userId }) =>
        this.getAllOrdersByDateRange({ from: startOfCurrentDay.toISOString(), to: endOfCurrentDay.toISOString() }).pipe(
          exhaustMap((orders) => from(this.printer.sequentialPrints(orders))),
          exhaustMap(() => this.httpClient.put(`/users/${userId}/polled`, {})),
          exhaustMap(() => this.httpClient.get<AdminInterface>(`/users/${userId}`)),
          map((user) => this.store.dispatch(updateUser({ user })))
        )
      )
    );
  }

  getAllOrdersByUserId({ userId }: Record<'userId', string>): Observable<OrderInterface[]> {
    return super.read({ userId });
  }

  getAllOrdersByDateRange(query: Partial<GetOrdersQueryInterface>): Observable<OrderInterface[]> {
    return super.read({ ...query, populateUser: true }).pipe(map((orders) => orderBy(orders, 'createdAt', ['desc'])));
  }
}
