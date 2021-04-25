import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItemInterface } from '../../models/order-item.interface';

@Component({
  selector: 'lib-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderItems: OrderItemInterface[];
  @Input() subTotal = 0;
  @Input() tax = 0;
  @Input() tip = 0;
  @Input() total = 0;
  @Input() defaultSegment = 'instructions';

  readonly currentSegment$: BehaviorSubject<string> = new BehaviorSubject('instructions');

  constructor() {}

  ngOnInit() {
    this.currentSegment$.next(this.defaultSegment);
  }

  segmentChange(segment: string) {
    this.currentSegment$.next(segment);
  }
}
