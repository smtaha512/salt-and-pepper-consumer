import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { CounterInputPopoverModule, OrderDetailsModule, TextareaPopoverModule } from 'dist/library';
import { CheckoutFormModule } from '../../components/checkout-form/checkout-form.module';
import * as fromCurrentOrderItem from './+state/current-order-item.reducer';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';
import { CartActionSheetService } from './services/cart/cart-action-sheet.service';

@NgModule({
  imports: [
    CartPageRoutingModule,
    CheckoutFormModule,
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailsModule,
    StoreModule.forFeature(fromCurrentOrderItem.currentOrderItemsFeatureKey, fromCurrentOrderItem.reducer),
    CounterInputPopoverModule,
    TextareaPopoverModule,
  ],
  declarations: [CartPage],
  providers: [CartActionSheetService],
})
export class CartPageModule {}
