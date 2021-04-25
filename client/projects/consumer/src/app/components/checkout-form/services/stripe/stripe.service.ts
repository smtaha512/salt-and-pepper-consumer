import { Injectable } from '@angular/core';
import '@capacitor-community/stripe'; // only if you want web support
import {
  CardTokenResponse,
  ConfirmPaymentIntentResponse,
  StripePlugin,
  ValidateCardNumberOptions,
  ValidateCVCOptions,
  ValidateExpiryDateOptions,
  ValidityResponse,
} from '@capacitor-community/stripe';
import { Plugins } from '@capacitor/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { CardInterface } from '../../models/card.interface';

const Stripe = Plugins.Stripe as StripePlugin;

@Injectable({ providedIn: 'root' })
export class StripeService {
  private readonly stripePlugin: StripePlugin = Stripe;
  constructor(private readonly alertController: AlertController, private readonly loadingController: LoadingController) {
    this.stripePlugin.setPublishableKey({ key: environment.stripePublishableKey });
  }

  validateCVC(opts: ValidateCVCOptions): Observable<ValidityResponse> {
    return from(this.stripePlugin.validateCVC(opts));
  }

  validateCardNumber(opts: ValidateCardNumberOptions): Observable<ValidityResponse> {
    return from(this.stripePlugin.validateCardNumber(opts));
  }

  validateExpiryDate(opts: ValidateExpiryDateOptions): Observable<ValidityResponse> {
    return from(this.stripePlugin.validateExpiryDate(opts));
  }

  confirmPaymentIntent(card: CardInterface, stripeResponse: any): Observable<ConfirmPaymentIntentResponse> {
    // ? disabling to match stripe naming convention
    // tslint:disable-next-line: variable-name
    const { expMonth: exp_month, expYear: exp_year, ...otherDetails } = card;
    return from(
      this.stripePlugin.confirmPaymentIntent({ clientSecret: stripeResponse.client_secret, card: { ...otherDetails, exp_month, exp_year } })
    ).pipe(
      tap((e) => console.log(47, e)),
      catchError((error) => {
        console.log(error);
        return this.errorAlert(error).pipe(switchMap(() => throwError(error)));
      })
    );
  }

  createCardToken(card: CardInterface): Observable<CardTokenResponse> {
    // ? disabling to match stripe naming convention
    // tslint:disable-next-line: variable-name
    const { expMonth: exp_month, expYear: exp_year, ...otherDetails } = card;
    return this.loader().pipe(
      switchMap(() =>
        from(this.stripePlugin.createCardToken({ ...otherDetails, exp_month, exp_year })).pipe(
          tap(() => this.dismissLoader()),
          catchError((error) => {
            return this.dismissLoader().pipe(switchMap(() => this.errorAlert(error).pipe(switchMap(() => throwError(error)))));
          })
        )
      )
    );
  }

  private errorAlert(error: string): Observable<void> {
    return from(
      this.alertController
        .create({ message: error, header: 'Error', buttons: [{ text: 'OK', role: 'cancel' }] })
        .then((alert) => alert.present())
    );
  }
  private loader() {
    return from(this.loadingController.create({ message: 'Placing order...' })).pipe(switchMap((loader) => from(loader.present())));
  }
  private dismissLoader() {
    return from(this.loadingController.dismiss());
  }
}
