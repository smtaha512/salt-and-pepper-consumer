import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MyOrderDetailsBillComponent } from './my-order-details-bill.component';
import { MyOrderDetailsBillRowModule } from '../my-order-details-bill-row/my-order-details-bill-row.module';

@NgModule({
  declarations: [MyOrderDetailsBillComponent],
  exports: [MyOrderDetailsBillComponent],
  imports: [CommonModule, IonicModule, MyOrderDetailsBillRowModule],
})
export class MyOrderDetailsBillModule {}
