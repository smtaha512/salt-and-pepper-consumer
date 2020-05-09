import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MyOrdersItemsListBodyComponent } from './my-orders-items-list-body.component';

@NgModule({
  declarations: [MyOrdersItemsListBodyComponent],
  exports: [MyOrdersItemsListBodyComponent],
  imports: [CommonModule, IonicModule]
})
export class MyOrdersItemsListBodyModule {}
