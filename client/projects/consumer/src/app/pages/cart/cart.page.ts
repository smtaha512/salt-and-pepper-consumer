import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CurrentOrderItem } from './+state/current-order-item.model';
import { currentOrderItems, subTotal, tax, TAX_PERCENT, tip, total } from './+state/current-order-item.selectors';
import { CartActionSheetService } from './services/cart/cart-action-sheet.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage implements OnInit {
  orderItems$: Observable<CurrentOrderItem[]>;
  subTotal$: Observable<number>;
  tax$: Observable<number>;
  tip$: Observable<number>;
  total$: Observable<number>;
  readonly TAX_PERCENT = TAX_PERCENT;
  constructor(private readonly store: Store<any>, private readonly cartService: CartActionSheetService) {}

  ngOnInit() {
    this.orderItems$ = this.store.pipe(select(currentOrderItems));
    this.subTotal$ = this.store.pipe(select(subTotal));
    this.tax$ = this.store.pipe(select(tax));
    this.tip$ = this.store.pipe(select(tip));
    this.total$ = this.store.pipe(select(total));
  }

  onItemClick(id: string) {
    this.cartService.showActionSheetForCurrentOrderItem(id);
  }
}
