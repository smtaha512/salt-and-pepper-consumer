import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-orders-items-list',
  template: `
    <ion-grid>
      <ion-list mode="ios">
        <ion-item-group>
          <app-my-orders-items-list-header></app-my-orders-items-list-header>
          <app-my-orders-items-list-body
            *ngIf="orderItems?.length; else noItemsMessage"
            [orderItems]="orderItems"
          ></app-my-orders-items-list-body>
          <ng-template #noItemsMessage>
            <ion-item lines="full" class="ion-text-center"> <ion-label> No item to show </ion-label> </ion-item>
          </ng-template>
        </ion-item-group>
      </ion-list>
    </ion-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersItemsListComponent implements OnInit {
  @Input() orderItems: any[];

  constructor() {}

  ngOnInit() {}
}
