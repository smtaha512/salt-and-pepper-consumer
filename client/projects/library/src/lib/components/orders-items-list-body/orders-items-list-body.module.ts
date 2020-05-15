import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { OrdersItemsListBodyComponent } from './orders-items-list-body.component';

@NgModule({
  declarations: [OrdersItemsListBodyComponent],
  exports: [OrdersItemsListBodyComponent],
  imports: [CommonModule, IonicModule],
})
export class OrdersItemsListBodyModule {}
