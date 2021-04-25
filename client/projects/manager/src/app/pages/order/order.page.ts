import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { OrderInterface, OrderStatausEnum } from 'dist/library';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { OrdersHistoryService } from '../orders-history/services/orders-history.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPage implements OnInit {
  readonly currentOrder$: Observable<OrderInterface>;
  readonly subTotal$: Observable<number>;
  readonly tax$: Observable<number>;
  constructor(
    private readonly actionSheetController: ActionSheetController,
    private readonly ordersHistoryService: OrdersHistoryService,
    private readonly activateRoute: ActivatedRoute
  ) {
    this.currentOrder$ = this.activateRoute.params.pipe(
      map((parmas) => parmas.id),
      switchMap((id) => this.ordersHistoryService.getById(id)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    this.subTotal$ = this.currentOrder$.pipe(
      map((order) => order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    this.tax$ = this.subTotal$.pipe(map((subTotal) => subTotal * 0.2));
  }

  ngOnInit() {}

  async presentActionSheet(currentStatus: OrderStatausEnum) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'ion-color-light',
      header: 'Change order status',
      buttons: [
        {
          text: 'Cancel',
          role: 'destructive',
          cssClass: 'ion-button-text-color-danger',
          icon: 'trash-outline',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Preparing',
          icon: 'flame-sharp',
          cssClass: ['ion-button-text-color-light'],
          handler: () => {
            console.log('Preparing clicked');
          },
        },
        {
          text: 'Prepared',
          icon: 'checkmark-outline',
          handler: () => {
            console.log('Prepared clicked');
          },
        },
        {
          text: 'Picked',
          icon: 'checkmark-done-outline',
          handler: () => {
            console.log('Picked clicked');
          },
        },
        {
          text: 'Close',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ].map((item) =>
        item.text.toLowerCase() !== currentStatus.toLowerCase()
          ? item
          : { ...item, cssClass: [...(item.cssClass ?? []), 'ion-button-background-tertiary'] }
      ),
    });

    await actionSheet.present();
  }

  changeOrderStatus(currentStatus: OrderStatausEnum) {
    this.presentActionSheet(currentStatus);
  }
}
