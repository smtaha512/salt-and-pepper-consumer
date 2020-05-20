import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { OrderInstructionsComponent } from './order-instructions.component';

@NgModule({
  declarations: [OrderInstructionsComponent],
  exports: [OrderInstructionsComponent],
  imports: [CommonModule, IonicModule],
})
export class OrderInstructionsModule {}
