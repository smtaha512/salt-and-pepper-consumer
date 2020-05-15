import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { OrdersItemsListHeaderComponent } from './orders-items-list-header.component';

@NgModule({
  declarations: [OrdersItemsListHeaderComponent],
  exports: [OrdersItemsListHeaderComponent],
  imports: [CommonModule, IonicModule],
})
export class OrdersItemsListHeaderModule {}
