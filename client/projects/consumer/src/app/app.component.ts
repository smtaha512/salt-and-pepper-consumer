import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { NetworkService } from 'dist/library';
import { pullStateFromStorage } from 'projects/library/src/public-api';
import { pluck } from 'rxjs/operators';
import { OrdersHistoryService } from './pages/orders-history/services/orders-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'consumer';
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  readonly isConnected$ = this.networkService.networkStatus$.pipe(pluck('connected'));

  constructor(
    private readonly networkService: NetworkService,
    private readonly store: Store<any>,
    private readonly ordersHistoryService: OrdersHistoryService,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.store.dispatch(pullStateFromStorage());
    this.ordersHistoryService.pollForOrders().subscribe();
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
