import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { isNotEmpty, OrderInterface } from 'dist/library';
import { OrdersHistoryService } from './services/orders-history.service';
import { select, Store } from '@ngrx/store';
import { UserInterface } from '../../+state/user/user.model';
import { userId } from '../../+state/user/user.selectors';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.page.html',
  styleUrls: ['./orders-history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersHistoryPage implements OnInit {
  private userIdFromStore: Observable<string> = EMPTY;
  ordersHistory$: Observable<OrderInterface[]> = EMPTY;
  constructor(private readonly ordersHistoryService: OrdersHistoryService, private readonly store: Store<UserInterface>) {}

  ngOnInit() {
    this.userIdFromStore = this.store.pipe(select(userId), filter(isNotEmpty));
    this.ordersHistory$ = this.userIdFromStore.pipe(
      switchMap((userIdFromStore) => this.ordersHistoryService.getAllOrdersByUserId({ userId: userIdFromStore }))
    );
  }

  onClick(event: MouseEvent, order) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
