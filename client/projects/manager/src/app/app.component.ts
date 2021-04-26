import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { pullStateFromStorage } from 'dist/library';
import { OrdersHistoryService } from './pages/orders-history/services/orders-history.service';

const { App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'manager';
  constructor(
    private readonly ordersHistoryService: OrdersHistoryService,
    private readonly store: Store<any>,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) {}
  ngOnInit() {
    this.store.dispatch(pullStateFromStorage());
    this.ordersHistoryService.pollForOrders().subscribe(console.log);
    this.appExitWatcher();
  }

  appExitWatcher() {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }
}
