import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPage implements OnInit {
  currentSegment$: BehaviorSubject<string> = new BehaviorSubject('pricing');
  constructor() {}

  ngOnInit() {}

  segmentChange(segment: string) {
    this.currentSegment$.next(segment);
  }
}
