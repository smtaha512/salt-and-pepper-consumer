import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { VerifyCodePopoverModule } from '../verify-code-popover/verify-code-popover.module';
import { CheckoutEffects } from './+state/checkout.effects';
import { CheckoutFormComponent } from './checkout-form.component';
import { StripeService } from './services/stripe/stripe.service';
import { ExpiryDateValidator } from './validators/expiry-date.validator';

@NgModule({
  declarations: [CheckoutFormComponent],
  exports: [CheckoutFormComponent],
  providers: [StripeService, ExpiryDateValidator],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    VerifyCodePopoverModule,
    EffectsModule.forFeature([CheckoutEffects]),
  ],
})
export class CheckoutFormModule {}
