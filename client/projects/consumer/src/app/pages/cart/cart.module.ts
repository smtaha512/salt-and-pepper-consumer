import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { OrderDetailsModule } from 'dist/library';
import { CheckoutFormModule } from '../../components/checkout-form/checkout-form.module';
import * as fromCurrentOrderItem from './+state/current-order-item.reducer';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';

@NgModule({
  imports: [
    CartPageRoutingModule,
    CheckoutFormModule,
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailsModule,
    StoreModule.forFeature(fromCurrentOrderItem.currentOrderItemsFeatureKey, fromCurrentOrderItem.reducer),
  ],
  declarations: [CartPage],
})
export class CartPageModule {}
