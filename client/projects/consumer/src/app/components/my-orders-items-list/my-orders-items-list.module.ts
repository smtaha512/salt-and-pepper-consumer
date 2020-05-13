import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MyOrdersItemsListComponent } from './my-orders-items-list.component';
import { MyOrdersItemsListHeaderModule } from '../my-orders-items-list-header/my-orders-items-list-header.module';
import { MyOrdersItemsListBodyModule } from '../my-orders-items-list-body/my-orders-items-list-body.module';

@NgModule({
  declarations: [MyOrdersItemsListComponent],
  exports: [MyOrdersItemsListComponent],
  imports: [CommonModule, IonicModule, MyOrdersItemsListHeaderModule, MyOrdersItemsListBodyModule],
})
export class MyOrdersItemsListModule {}
