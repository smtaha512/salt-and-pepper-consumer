import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { OrdersItemsListComponent } from './orders-items-list.component';
import { OrdersItemsListHeaderModule } from '../orders-items-list-header/orders-items-list-header.module';
import { OrdersItemsListBodyModule } from '../orders-items-list-body/orders-items-list-body.module';

@NgModule({
  declarations: [OrdersItemsListComponent],
  exports: [OrdersItemsListComponent],
  imports: [CommonModule, IonicModule, OrdersItemsListHeaderModule, OrdersItemsListBodyModule],
})
export class OrdersItemsListModule {}
