import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CheckoutFormComponent } from './checkout-form.component';

@NgModule({
  declarations: [CheckoutFormComponent],
  exports: [CheckoutFormComponent],
  imports: [CommonModule, IonicModule, RouterModule, ReactiveFormsModule],
})
export class CheckoutFormModule {}
