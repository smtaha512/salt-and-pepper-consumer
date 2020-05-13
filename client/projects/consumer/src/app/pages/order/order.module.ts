import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { OrderInstructionsModule } from '../../components/order-instructions/order-instructions.module';
import { MyOrdersItemsListModule } from '../../components/my-orders-items-list/my-orders-items-list.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OrderPageRoutingModule, OrderInstructionsModule, MyOrdersItemsListModule],
  declarations: [OrderPage],
})
export class OrderPageModule {}
