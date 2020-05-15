import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersHistoryPageRoutingModule } from './orders-history-routing.module';

import { OrdersHistoryPage } from './orders-history.page';
import { OrdersItemsListModule } from 'dist/library';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OrdersHistoryPageRoutingModule, OrdersItemsListModule],
  declarations: [OrdersHistoryPage],
})
export class OrdersHistoryPageModule {}
