import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderItems: any[];
  @Input() subTotal = 0;
  @Input() tax = 0;
  @Input() tip = 0;
  @Input() total = 0;

  readonly currentSegment$: BehaviorSubject<string> = new BehaviorSubject('instructions');

  constructor() {}

  ngOnInit() {}

  segmentChange(segment: string) {
    this.currentSegment$.next(segment);
  }
}
