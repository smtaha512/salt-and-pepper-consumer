import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OrderInterface } from '../../models/order.interface';

@Component({
  selector: 'lib-orders-items-list',
  templateUrl: './orders-items-list.component.html',
  styleUrls: ['./orders-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersItemsListComponent implements OnInit {
  @Input() orderItems: OrderInterface[];
  @Input() subTotal: number;
  @Input() tax: number;
  @Input() tip: number;
  @Input() total: number;

  constructor() {}

  ngOnInit() {}
}
