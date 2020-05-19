import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OrdersItemsListModule } from 'dist/library';
import { CheckoutFormModule } from '../../components/checkout-form/checkout-form.module';
import { MyOrderDetailsBillModule } from '../../components/my-order-details-bill/my-order-details-bill.module';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    MyOrderDetailsBillModule,
    CheckoutFormModule,
    OrdersItemsListModule,
  ],
  declarations: [CartPage],
})
export class CartPageModule {}
