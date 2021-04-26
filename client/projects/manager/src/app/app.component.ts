import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pullStateFromStorage } from 'dist/library';
import { OrdersHistoryService } from './pages/orders-history/services/orders-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'manager';
  constructor(private readonly ordersHistoryService: OrdersHistoryService, private readonly store: Store<any>) {}
  ngOnInit() {
    this.store.dispatch(pullStateFromStorage());
    this.ordersHistoryService.pollForOrders().subscribe(console.log);
  }
}
