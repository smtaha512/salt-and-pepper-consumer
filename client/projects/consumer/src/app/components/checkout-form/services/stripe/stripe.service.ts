import { Injectable } from '@angular/core';
import { Stripe, StripePlugin } from '@capacitor-community/stripe';
import { AlertController, LoadingController } from '@ionic/angular';
import { EMPTY, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { StripeResponse } from '../../models/stripe-response.interface';

@Injectable({ providedIn: 'root' })
export class StripeService {
  private readonly stripePlugin: StripePlugin = Stripe;
  constructor(private readonly alertController: AlertController, private readonly loadingController: LoadingController) {
    this.stripePlugin.initialize({ publishableKey: environment.stripePublishableKey });
  }

  paymentFlow({ customer, ephemeralKey, paymentIntent }: StripeResponse) {
    const stripePaymentFlowPromise = this.stripePlugin
      .createPaymentFlow({
        customerId: customer,
        merchantDisplayName: 'Salt n Pepper',
        countryCode: 'US',
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
      })
      .then(() => this.stripePlugin.presentPaymentFlow())
      .then(() => this.stripePlugin.confirmPaymentFlow())
      .catch(console.log);

    return from(stripePaymentFlowPromise).pipe(
      catchError((e) => {
        console.log(e);
        return EMPTY;
      })
    );
  }
}
