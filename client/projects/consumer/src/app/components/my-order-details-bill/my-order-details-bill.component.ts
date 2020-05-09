import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-order-details-bill',
  template: `
    <ion-grid fixed class="m-0 bg-light">
      <app-my-order-details-bill-row [isTotalRow]="true">
        <ng-container class="value">{{ 220 | currency: 'USD' }}</ng-container>
      </app-my-order-details-bill-row>
    </ion-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrderDetailsBillComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
