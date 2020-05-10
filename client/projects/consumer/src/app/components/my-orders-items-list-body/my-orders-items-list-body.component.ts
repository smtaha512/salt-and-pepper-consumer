import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-orders-items-list-body',
  template: `
    <ion-row class="mt-2">
      <ion-col size="12">
        <ion-item lines="none" *ngFor="let item of orderItems; let isLast = last; trackBy: trackBy">
          <ion-label>
            <ion-row class="py-2 my-1 align-items-center" [ngClass]="{ 'border-bottom': !isLast }">
              <ion-col class="ion-text-wrap">{{ item.name }} very very long</ion-col>
              <ion-col class="ion-text-center">{{ item.qty }} x {{ item.price }}</ion-col>
              <ion-col class="ion-text-end">{{ item.qty * item.price }}</ion-col>
            </ion-row>
          </ion-label>
        </ion-item>
      </ion-col>
    </ion-row>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersItemsListBodyComponent implements OnInit {
  @Input() orderItems: any[]; // TODO: add type here
  constructor() {}

  ngOnInit() {}

  trackBy(index: number, item: any): number {
    return (item && item._id) || index;
  }
}
