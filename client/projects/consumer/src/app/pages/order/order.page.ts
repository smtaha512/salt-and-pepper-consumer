import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '@capacitor/core';
import { OrderInterface } from 'dist/library';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { OrdersHistoryService } from '../orders-history/services/orders-history.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPage implements OnInit {
  currentSegment$: BehaviorSubject<string> = new BehaviorSubject('pricing');
  isiOS = Device.getInfo().then((info) => info.operatingSystem === 'ios');
  readonly currentOrder$: Observable<OrderInterface>;
  readonly subTotal$: Observable<number>;
  readonly tax$: Observable<number>;
  constructor(private readonly ordersHistoryService: OrdersHistoryService, private readonly activateRoute: ActivatedRoute) {
    this.currentOrder$ = this.activateRoute.params.pipe(
      map((parmas) => parmas.id),
      switchMap((id) => this.ordersHistoryService.getById(id)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    this.subTotal$ = this.currentOrder$.pipe(
      map((order) => order.items.reduce((acc, item) => acc + item.price, 0)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    this.tax$ = this.subTotal$.pipe(map((subTotal) => subTotal * 0.2));
  }

  ngOnInit() {}

  segmentChange(segment: string) {
    this.currentSegment$.next(segment);
  }
}
