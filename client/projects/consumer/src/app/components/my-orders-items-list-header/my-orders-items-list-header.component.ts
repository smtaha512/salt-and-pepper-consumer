import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-orders-items-list-header',
  template: `
    <ion-item lines="full">
      <ion-label>
        <ion-row class="border-bottom">
          <ion-col
            *ngFor="let heading of headings; let i = index"
            [ngClass]="{ 'ion-text-center': i === 1, 'ion-text-end': i === 2 }"
            size="4"
          >
            <ion-text>
              <h5 class="font-weight-bold">{{ heading }}</h5>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-label>
    </ion-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersItemsListHeaderComponent implements OnInit {
  readonly headings = ['Item', 'Qty x Price', 'Price'];
  constructor() {}

  ngOnInit() {}
}
