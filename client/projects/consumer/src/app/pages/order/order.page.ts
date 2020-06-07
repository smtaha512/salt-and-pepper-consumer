import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPage implements OnInit {
  currentSegment$: BehaviorSubject<string> = new BehaviorSubject('pricing');
  isiOS = Device.getInfo().then((info) => info.operatingSystem === 'ios');

  constructor() {}

  ngOnInit() {}

  segmentChange(segment: string) {
    this.currentSegment$.next(segment);
  }
}
