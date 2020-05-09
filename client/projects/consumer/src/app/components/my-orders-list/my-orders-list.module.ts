import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { MyOrdersCardModule } from '../my-orders-card/my-orders-card.module';
import { MyOrdersListComponent } from './my-orders-list.component';

@NgModule({
  declarations: [MyOrdersListComponent],
  exports: [MyOrdersListComponent],
  imports: [CommonModule, IonicModule, MyOrdersCardModule]
})
export class MyOrdersListModule {}
