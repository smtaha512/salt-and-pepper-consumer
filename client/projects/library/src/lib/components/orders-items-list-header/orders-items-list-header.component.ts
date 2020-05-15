import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-orders-items-list-header',
  templateUrl: './orders-items-list-header.component.html',
  styleUrls: ['./orders-items-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersItemsListHeaderComponent implements OnInit {
  readonly headings = ['Item', 'Qty x Price', 'Price'];

  constructor() {}

  ngOnInit() {}
}
