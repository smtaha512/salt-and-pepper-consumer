import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-orders-items-list-body',
  templateUrl: './orders-items-list-body.component.html',
  styleUrls: ['./orders-items-list-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersItemsListBodyComponent implements OnInit {
  @Input() orderItems: any[]; // TODO: add type here

  constructor() {}

  ngOnInit() {}

  trackBy(index: number, item: any): number {
    return (item && item._id) || index;
  }
}
