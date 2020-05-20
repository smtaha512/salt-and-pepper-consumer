import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OrderDetailsModule } from 'library/library';
import { OrderPageRoutingModule } from './order-routing.module';
import { OrderPage } from './order.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OrderPageRoutingModule, OrderDetailsModule],
  declarations: [OrderPage],
})
export class OrderPageModule {}
