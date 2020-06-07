import { Injectable } from '@angular/core';
import { Capacitor, NetworkStatus } from '@capacitor/core';
import { from, merge, Observable, Subscriber } from 'rxjs';

const {
  Plugins: { Network },
} = Capacitor;

@Injectable({ providedIn: 'root' })
export class NetworkService {
  readonly currentNetworkStatus$ = from(Network.getStatus());
  readonly networkStatus$ = merge(this.currentNetworkStatus$, this.networkStatusRx());

  constructor() {}

  private networkStatusRx() {
    return new Observable(function subscribe(subscriber: Subscriber<NetworkStatus>) {
      const listnerInstance = Network.addListener('networkStatusChange', (status) => {
        subscriber.next(status);
      });

      return function unsubscribe() {
        listnerInstance.remove();
      };
    });
  }
}
