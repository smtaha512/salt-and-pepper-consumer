import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CheckoutFormComponent } from './checkout-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CheckoutFormComponent],
  exports: [CheckoutFormComponent],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class CheckoutFormModule {}
