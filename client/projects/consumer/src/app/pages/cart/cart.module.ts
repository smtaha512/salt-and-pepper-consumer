import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { MyOrdersItemsListModule } from '../../components/my-orders-items-list/my-orders-items-list.module';
import { MyOrderDetailsBillModule } from '../../components/my-order-details-bill/my-order-details-bill.module';
import { CheckoutFormModule } from '../../components/checkout-form/checkout-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    MyOrdersItemsListModule,
    MyOrderDetailsBillModule,
    CheckoutFormModule,
  ],
  declarations: [CartPage],
})
export class CartPageModule {}
