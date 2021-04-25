import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { isNotEmpty, OrderInterface } from 'dist/library';
import { EMPTY, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { UserInterface } from '../../+state/user/user.model';
import { userId } from '../../+state/user/user.selectors';
import { OrdersHistoryService } from './services/orders-history.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.page.html',
  styleUrls: ['./orders-history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersHistoryPage implements OnInit {
  private userIdFromStore: Observable<string> = EMPTY;
  ordersHistory$: Observable<OrderInterface[]> = EMPTY;
  constructor(
    private readonly ordersHistoryService: OrdersHistoryService,
    private readonly store: Store<UserInterface>,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.userIdFromStore = this.store.pipe(select(userId), filter(isNotEmpty));
    this.ordersHistory$ = this.userIdFromStore.pipe(
      switchMap((userIdFromStore) => this.ordersHistoryService.getAllOrdersByUserId({ userId: userIdFromStore }))
    );
    this.cd.markForCheck();
  }

  onClick(event: MouseEvent, order) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
