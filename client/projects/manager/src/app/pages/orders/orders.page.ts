import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersHistoryService } from '../orders-history/services/orders-history.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPage implements OnInit {
  orders$ = this.ordersHistoryService.getAllOrdersByDateRange({ date: new Date().toISOString() });
  constructor(private readonly router: Router, private readonly ordersHistoryService: OrdersHistoryService) {}

  ngOnInit() {}

  onClick(event: MouseEvent, order) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.router.navigate([`/order/${order}`]);
  }
}
