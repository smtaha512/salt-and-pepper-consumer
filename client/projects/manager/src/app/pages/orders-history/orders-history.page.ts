import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isNotEmpty, OrderInterface } from 'dist/library';
import { isEqual } from 'lodash';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { OrdersHistoryService } from './services/orders-history.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.page.html',
  styleUrls: ['./orders-history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersHistoryPage implements OnInit {
  readonly form: FormGroup;
  readonly orders$: Observable<OrderInterface[]> = of([]);
  readonly ordersTotal$: Observable<number> = of(0);
  constructor(private readonly ordersHistoryService: OrdersHistoryService) {
    this.form = new FormGroup({
      dateRange: new FormControl({}),
    });
    this.orders$ = this.form.valueChanges.pipe(
      map(({ dateRange }) => dateRange),
      switchMap((dateRange) => this.ordersHistoryService.getAllOrdersByDateRange(dateRange))
    );
    this.ordersTotal$ = this.orders$.pipe(
      filter(isNotEmpty),
      map((orders) => orders.reduce((acc, curr) => acc + curr.total, 0))
    );
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(console.log);
  }
}
