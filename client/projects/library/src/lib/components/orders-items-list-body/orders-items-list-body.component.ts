import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'lib-orders-items-list-body',
  templateUrl: './orders-items-list-body.component.html',
  styleUrls: ['./orders-items-list-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersItemsListBodyComponent implements OnInit {
  @Input() orderItems: any[]; // TODO: add type here

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
