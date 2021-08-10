import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { OrderInterface, OrderStatausEnum } from 'dist/library';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, repeatWhen, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
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
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'ion-color-light',
      header: 'Change order status',
      buttons: [
        { text: OrderStatausEnum.CANCELLED, role: 'destructive', cssClass: 'ion-button-text-color-danger', icon: 'trash-outline' },
        { text: OrderStatausEnum.PREPARING, icon: 'flame-sharp', cssClass: ['ion-button-text-color-light'] },
        { text: OrderStatausEnum.PREPARED, icon: 'checkmark-outline' },
        { text: OrderStatausEnum.PICKED, icon: 'checkmark-done-outline' },
        { text: 'Close', icon: 'close', role: 'cancel' },
      ]
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
                  this.currentOrder$
                    .pipe(
                      first(),
                      switchMap((order) =>
                        this.ordersHistoryService.update(order._id, { status: item.text as OrderStatausEnum }).pipe(first())
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

  changeOrderStatus(currentStatus: OrderStatausEnum) {
    this.presentActionSheet(currentStatus);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
