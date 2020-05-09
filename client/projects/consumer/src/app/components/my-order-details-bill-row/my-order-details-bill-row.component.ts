import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-my-order-details-bill-row',
  template: `
    <ion-row class="my-2 px-3 py-1 shadow-sm">
      <ion-col sizeXl="6" size="9" offsetXl="6" offset="3">
        <ion-row>
          <ion-col class="ion-text-end">
            <ion-text [color]="isTotalRow ? 'primary' : 'light'">
              <ng-container *ngIf="isTotalRow; else notTotal">
                <h2>Total:</h2>
              </ng-container>
              <ng-template #notTotal>
                <ng-content select=".name"></ng-content>
              </ng-template>
            </ion-text>
          </ion-col>
          <ion-col class="ion-text-end" [ngClass]="{ 'pt-2 d-flex justify-content-end align-items-center': !!isTotalRow }">
            <ion-text [color]="isTotalRow ? 'primary' : 'light'">
              <ng-container *ngIf="isTotalRow; else notTotal">
                <h2><ng-content select=".value"></ng-content></h2>
              </ng-container>
              <ng-template #notTotal>
                <ng-content select=".value"></ng-content>
              </ng-template>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-col>
    </ion-row>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrderDetailsBillRowComponent implements OnInit {
  @Input() isTotalRow = false;

  constructor() {}

  ngOnInit() {}
}
