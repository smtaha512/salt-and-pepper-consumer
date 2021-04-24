import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OrdersHistoryService } from './pages/orders-history/services/orders-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'manager';
  constructor(private readonly ordersHistoryService: OrdersHistoryService) {}
  ngOnInit() {
    this.ordersHistoryService.pollForOrders().subscribe(console.log);
  }
}
