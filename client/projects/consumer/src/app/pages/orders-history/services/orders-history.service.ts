import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Store } from '@ngrx/store';
import { BaseCrudService, ConsumerInterface, isNotEmpty, OrderInterface } from 'dist/library';
import { orderBy } from 'lodash-es';
import { from, Observable, of } from 'rxjs';
import { delay, exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import { updateUser } from '../../../+state/user/user.actions';
import { user } from '../../../+state/user/user.selectors';

const { LocalNotifications } = Plugins;

export interface GetOrdersQueryInterface {
  date: string;
  from: string;
  to: string;
  userId: string;
}

@Injectable({ providedIn: 'root' })
export class OrdersHistoryService extends BaseCrudService<OrderInterface> {
  protected base = '/orders';
  constructor(protected readonly httpClient: HttpClient, private readonly store: Store<any>) {
    super(httpClient);
  }

  getAllOrdersByUserId({ userId }: Record<'userId', string>): Observable<OrderInterface[]> {
    return super.read({ userId }).pipe(map((orders) => orderBy(orders, 'createdAt', ['desc'])));
  }

  getAllOrdersByDateRange(query: Partial<GetOrdersQueryInterface>, shouldShowLoader: boolean): Observable<OrderInterface[]> {
    const headers = new HttpHeaders({ 'show-header': `${shouldShowLoader}` });
    return super.read({ ...query, populateUser: true }, { headers }).pipe(map((orders) => orderBy(orders, 'createdAt', ['desc'])));
  }

  pollForOrders(): Observable<void> {
    const headers = new HttpHeaders({ 'show-header': 'false' });
    return this.store.select(user).pipe(
      filter(isNotEmpty),
      delay(10000),
      map((userFromState) => {
        const fromDate = userFromState.lastPolledAt ? new Date(userFromState.lastPolledAt) : new Date();
        const to = new Date();
        to.setHours(23, 59, 59, 999);
        return { from: fromDate, to, userId: userFromState._id };
      }),
      switchMap(({ to: endOfCurrentDay, from: startOfCurrentDay, userId }) =>
        this.getAllOrdersByDateRange({ from: startOfCurrentDay.toISOString(), to: endOfCurrentDay.toISOString(), userId }, false).pipe(
          exhaustMap((orders) => this.sendNotifications(orders)),
          exhaustMap(() => this.httpClient.put(`/users/${userId}/polled`, {}, { headers })),
          exhaustMap(() => this.httpClient.get<ConsumerInterface>(`/users/${userId}`, { headers })),
          map((userFromAPI) => this.store.dispatch(updateUser({ user: userFromAPI })))
        )
      )
    );
  }

  sendNotifications(orders: OrderInterface[]) {
    try {
      if (!window.Notification) {
        return of(null);
      }
      const notifications = LocalNotifications.schedule({
        notifications: orders.map((order, idx) => ({
          title: 'Your order status has been updated!',
          body: 'Current status' + order.status,
          id: idx,
          schedule: { at: new Date(Date.now() + 100) },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null,
        })),
      });
      return from(notifications);
    } catch (error) {
      console.log(error);
    }
  }
}
