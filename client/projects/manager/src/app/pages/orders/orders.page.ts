import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderInterface } from 'dist/library';
import { OrdersHistoryService } from '../orders-history/services/orders-history.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPage implements OnInit {
  private readonly startOfCurrentDay = new Date();
  private readonly endOfCurrentDay = new Date();

  orders$: Observable<OrderInterface[]>;

  constructor(private readonly router: Router, private readonly ordersHistoryService: OrdersHistoryService) {
    this.startOfCurrentDay.setHours(0, 0, 0, 0);
    this.endOfCurrentDay.setHours(23, 59, 59, 999);
    this.orders$ = this.ordersHistoryService.shouldRefetch$.pipe(
      switchMap(() =>
        this.ordersHistoryService.getAllOrdersByDateRange({
          from: this.startOfCurrentDay.toISOString(),
          to: this.endOfCurrentDay.toISOString(),
        })
      )
    );
  }

  ngOnInit() {}

  onClick(event: MouseEvent, order: OrderInterface) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.router.navigate([`/order/${order._id}`]);
  }
}
