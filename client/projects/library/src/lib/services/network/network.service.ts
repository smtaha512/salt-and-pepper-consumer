import { Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { from, merge, Observable, Subscriber } from 'rxjs';
  

@Injectable({ providedIn: 'root' })
export class NetworkService {
  readonly currentNetworkStatus$ = from(Network.getStatus());
  readonly networkStatus$ = merge(this.currentNetworkStatus$, this.networkStatusRx());

  constructor() {}

  private networkStatusRx() {
    return new Observable(function subscribe(subscriber: Subscriber<ConnectionStatus>) {
      const listnerInstance = Network.addListener('networkStatusChange', (status) => {
        console.log(status);
        subscriber.next(status);
      });

      return function unsubscribe() {
        listnerInstance.remove();
      };
    });
  }
}
