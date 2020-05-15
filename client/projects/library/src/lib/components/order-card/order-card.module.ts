import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { OrderCardComponent } from './order-card.component';

@NgModule({
  declarations: [OrderCardComponent],
  exports: [OrderCardComponent],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class OrderCardModule {}
