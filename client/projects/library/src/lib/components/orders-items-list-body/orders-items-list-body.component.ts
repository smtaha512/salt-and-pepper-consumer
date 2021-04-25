import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { OrderItemInterface } from '../../models/order-item.interface';

@Component({
  selector: 'lib-orders-items-list-body',
  templateUrl: './orders-items-list-body.component.html',
  styleUrls: ['./orders-items-list-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersItemsListBodyComponent implements OnInit {
  @Input() orderItems: OrderItemInterface[]; // TODO: add type here

  constructor(private readonly elem: ElementRef<HTMLElement>) {}

  ngOnInit() {}

  trackBy(index: number, item: any): number {
    return item?._id || index;
  }

  onItemClick(id: string) {
    const event = new CustomEvent('itemClick', { detail: { id }, bubbles: true });
    this.elem.nativeElement.dispatchEvent(event);
  }
}
