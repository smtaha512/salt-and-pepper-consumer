import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-orders-list',
  template: `
    <ion-grid fixed>
      <ion-row>
        <ng-container *ngFor="let order of orders">
          <ion-col size="12" sizeLg="6" sizeXl="4" no-margin no-padding>
            <app-my-orders-card [order]="order"></app-my-orders-card>
          </ion-col>
        </ng-container>
      </ion-row>
    </ion-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyOrdersListComponent implements OnInit {
  @Input() listType: 'new-orders' | 'past-orders' | 'ongoing-orders' | 'all-orders';
  @Input() orders: any[]; // TODO: Add types here

  constructor() {}

  ngOnInit() {}
}
