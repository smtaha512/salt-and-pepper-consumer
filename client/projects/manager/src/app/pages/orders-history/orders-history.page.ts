import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.page.html',
  styleUrls: ['./orders-history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersHistoryPage implements OnInit {
  orderItems = [...new Array(5)].map((_, idx) => idx).map((item) => ({ name: `Dish name ${item}`, price: item + 1, qty: item + 1 }));
  constructor() {}

  ngOnInit() {}
}
