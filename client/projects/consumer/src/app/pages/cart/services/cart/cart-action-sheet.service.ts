import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ActionSheetService, CounterInputPopoverService, isNotEmpty, TextareaPopoverService } from 'dist/library';
import { deleteCurrentOrderItem, updateCurrentOrderItem } from '../../+state/current-order-item.actions';
import { CurrentOrderItem } from '../../+state/current-order-item.model';
import { currentOrderItemById } from '../../+state/current-order-item.selectors';

@Injectable()
export class CartActionSheetService {
  constructor(
    private readonly actionSheet: ActionSheetService,
    private readonly store: Store<any>,
    private readonly counterInputPopoverService: CounterInputPopoverService,
    private readonly textareaPopoverService: TextareaPopoverService
  ) {}

  showActionSheetForCurrentOrderItem(id: string) {
    const destroyed$ = new Subject();

    this.store
      .pipe(
        select(currentOrderItemById(id)),
        filter(isNotEmpty),
        switchMap((orderItem) => this.presentActionSheet(orderItem)),
        tap((actionSheet) => actionSheet.onWillDismiss().then(() => destroyed$.next())),
        takeUntil(destroyed$)
      )
      .subscribe();
  }

  private presentActionSheet(item: CurrentOrderItem) {
    const { _id: id, title } = item;
    return this.actionSheet.present({
      header: title,
      buttons: [
        {
          text: `Remove all ${title}`,
          role: 'destructive',
          cssClass: 'ion-button-text-color-danger',
          icon: 'trash-outline',
          handler: () => {
            this.store.dispatch(deleteCurrentOrderItem({ id }));
          },
        },
        {
          text: 'Update notes',
          icon: 'document-text-outline',
          handler: () => {
            this.textareaPopoverService.present({
              ...item,
              label: 'Notes',
              placeholder: 'Enter any special instructions here',
              subtitle: 'Update notes',
              onChange: (notes: string) => {
                this.store.dispatch(updateCurrentOrderItem({ currentOrderItem: { id, changes: { notes } } }));
              },
            });
          },
        },
        {
          text: 'Change quantity',
          icon: 'create-outline',
          handler: () => {
            this.counterInputPopoverService.present({
              ...item,
              subtitle: 'Change quantity',
              onChange: (quantity: number) => {
                this.store.dispatch(updateCurrentOrderItem({ currentOrderItem: { id, changes: { quantity } } }));
              },
            });
          },
        },
      ],
    });
  }
}
