import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { OrderDetailsComponent } from './order-details.component';
import { OrdersItemsListModule } from '../orders-items-list/orders-items-list.module';
import { OrderInstructionsModule } from '../order-instructions/order-instructions.module';

@NgModule({
  declarations: [OrderDetailsComponent],
  exports: [OrderDetailsComponent],
  imports: [CommonModule, IonicModule, OrdersItemsListModule, OrderInstructionsModule],
})
export class OrderDetailsModule {}
