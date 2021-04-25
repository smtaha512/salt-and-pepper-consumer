import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OrderItemInterface } from '../../models/order-item.interface';

@Component({
  selector: 'lib-orders-items-list',
  templateUrl: './orders-items-list.component.html',
  styleUrls: ['./orders-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersItemsListComponent implements OnInit {
  @Input() orderItems: OrderItemInterface[];
  @Input() subTotal: number;
  @Input() tax: number;
  @Input() tip: number;
  @Input() total: number;

  constructor() {}

  ngOnInit() {}

  calculateSubTotal(orderItems: OrderItemInterface[]) {
    return orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
  calulateTax(subTotal: number) {
    return subTotal * 0.2;
  }
}
