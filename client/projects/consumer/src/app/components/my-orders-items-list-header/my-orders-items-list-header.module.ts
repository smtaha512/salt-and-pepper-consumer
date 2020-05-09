import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MyOrdersItemsListHeaderComponent } from './my-orders-items-list-header.component';

@NgModule({
  declarations: [MyOrdersItemsListHeaderComponent],
  exports: [MyOrdersItemsListHeaderComponent],
  imports: [CommonModule, IonicModule]
})
export class MyOrdersItemsListHeaderModule {}
