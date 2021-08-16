import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/core';
import { OrderInterface, OrderStatausEnum } from 'dist/library';
import { BehaviorSubject, EMPTY, from, Observable, of } from 'rxjs';
import { first, map, repeatWhen, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Printer } from '../../services/printer/printer';
import { OrdersHistoryService } from '../orders-history/services/orders-history.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPage implements OnInit, OnDestroy {
  readonly currentOrder$: Observable<OrderInterface>;
  readonly subTotal$: Observable<number>;
  readonly tax$: Observable<number>;
  private readonly refetch$ = new BehaviorSubject(null);
  private readonly destroyed$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private readonly actionSheetController: ActionSheetController,
    private readonly ordersHistoryService: OrdersHistoryService,
    private readonly activateRoute: ActivatedRoute,
    private readonly printer: Printer,
    private readonly toastController: ToastController
  ) {
    this.currentOrder$ = this.activateRoute.params.pipe(
      map((parmas) => parmas.id),
      switchMap((id) => this.ordersHistoryService.getById(id).pipe(repeatWhen(() => this.refetch$.asObservable()))),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    this.subTotal$ = this.currentOrder$.pipe(
      map((order) => order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    this.tax$ = this.subTotal$.pipe(map((subTotal) => subTotal * 0.2));
  }

  ngOnInit() {}

  printOrder(order: OrderInterface) {
    this.printer
      .print(order)
      .then(() =>
        this.toastController.create({
          buttons: [{ role: 'cancel', text: 'Dismiss' }],
          duration: 2500,
          message: 'Order printed!',
        })
      )
      .then((toast) => toast.present());
  }

  async presentActionSheet(currentStatus: OrderStatausEnum) {
    /** In this record, key represents the button text and value represents all the possible status for which the button will be disabled */
    const disableStatusMap: Record<OrderStatausEnum, Array<OrderStatausEnum>> = {
      [OrderStatausEnum.CANCELLED]: [OrderStatausEnum.PICKED],
      [OrderStatausEnum.PICKED]: [OrderStatausEnum.CANCELLED],
      [OrderStatausEnum.PREPARED]: [OrderStatausEnum.CANCELLED, OrderStatausEnum.PICKED],
      [OrderStatausEnum.PREPARING]: [OrderStatausEnum.CANCELLED, OrderStatausEnum.PICKED, OrderStatausEnum.PREPARED],
    };
    const disableButtonClass = 'disable-action-sheet-btns';
    const statusButtons: ActionSheetButton[] = [
      { text: OrderStatausEnum.CANCELLED, icon: 'trash-outline', role: 'destructive', cssClass: 'ion-button-text-color-danger' },
      { text: OrderStatausEnum.PREPARING, icon: 'flame-sharp', cssClass: ['ion-button-text-color-light'] },
      { text: OrderStatausEnum.PREPARED, icon: 'checkmark-outline' },
      { text: OrderStatausEnum.PICKED, icon: 'checkmark-done-outline' },
    ]
      .map((button) => ({ ...button, cssClass: Array.isArray(button.cssClass) ? [...button.cssClass] : [button.cssClass] }))
      .map((button) => ({
        ...button,
        cssClass: [...button.cssClass, ...(disableStatusMap[button.text].includes(currentStatus) ? [disableButtonClass] : [])],
      }));
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'ion-color-light',
      header: 'Change order status',
      buttons: [...statusButtons, { text: 'Close', icon: 'close', role: 'cancel' }]
        .map((item) =>
          item.text.toLowerCase() !== currentStatus.toLowerCase()
            ? item
            : { ...item, cssClass: [...(item.cssClass ?? []), 'ion-button-background-tertiary'] }
        )
        .map((item) =>
          item.role === 'close'
            ? item
            : {
                ...item,
                handler: () => {
                  if (item.cssClass.includes(disableButtonClass) || item.text === currentStatus) {
                    return false;
                  }
                  this.currentOrder$
                    .pipe(
                      first(),
                      switchMap((order) =>
                        item.role === OrderStatausEnum.CANCELLED
                          ? from(this.cancelOrderConfirmation().then((role) => (role === 'cancel-order' ? order : null)))
                          : of(order)
                      ),
                      switchMap((order) =>
                        !order
                          ? EMPTY
                          : this.ordersHistoryService.update(order._id, { status: item.text as OrderStatausEnum }).pipe(first())
                      ),
                      tap(() => this.refetch$.next(true))
                    )
                    .subscribe();
                },
              }
        ),
    });

    await actionSheet.present();
  }

  cancelOrderConfirmation() {
    return this.actionSheetController
      .create({
        header: 'Cancel order',
        subHeader: 'Are you sure you want to cancel this order?',
        buttons: [
          { text: 'No', role: 'cancel', cssClass: 'ion-button-text-color-danger' },
          { text: 'Yes, I am sure', role: 'cancel-order' },
        ],
      })
      .then((alert) => alert.present().then(() => alert.onDidDismiss().then((eventDetail) => eventDetail.role)));
  }

  changeOrderStatus(currentStatus: OrderStatausEnum) {
    this.presentActionSheet(currentStatus);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
