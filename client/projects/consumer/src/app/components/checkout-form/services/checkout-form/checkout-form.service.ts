import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderInterface, PreferencesEnum } from 'dist/library';
import { Observable } from 'rxjs';

export interface OrderCreationInterface extends Pick<OrderInterface, 'notes' | 'total' | 'userId'> {
  items: Array<Record<'_id', string> & Record<'preference', PreferencesEnum>>;
}

@Injectable({ providedIn: 'root' })
export class CheckoutFormService {
  constructor(private readonly http: HttpClient) {}

  placeOrder({ order }: { order: OrderCreationInterface }): Observable<string> {
    return this.http.post<string>('/orders', { order, paymentOption: 'creditcard' });
  }
}
