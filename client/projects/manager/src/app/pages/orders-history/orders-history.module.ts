import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersHistoryPageRoutingModule } from './orders-history-routing.module';

import { OrdersHistoryPage } from './orders-history.page';
import { OrdersItemsListModule, DateRangePickerModule } from 'dist/library';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OrdersHistoryPageRoutingModule, OrdersItemsListModule, DateRangePickerModule],
  declarations: [OrdersHistoryPage],
})
export class OrdersHistoryPageModule {}
