import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MyOrderDetailsBillRowComponent } from './my-order-details-bill-row.component';

@NgModule({
  declarations: [MyOrderDetailsBillRowComponent],
  exports: [MyOrderDetailsBillRowComponent],
  imports: [CommonModule, IonicModule]
})
export class MyOrderDetailsBillRowModule {}
