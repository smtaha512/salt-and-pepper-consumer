import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { userId } from '../../../+state/user/user.selectors';
import { currentOrderItems, total } from '../../../pages/cart/+state/current-order-item.selectors';
import { CheckoutFormService } from '../services/checkout-form/checkout-form.service';
import { StripeService } from '../services/stripe/stripe.service';
import * as UserActions from './../../../+state/user/user.actions';
import * as CheckoutActions from './checkout.actions';

@Injectable({ providedIn: 'root' })
export class CheckoutEffects {
  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.placeOrder),
      tap((payload) => this.store.dispatch(UserActions.getVerificationCode({ credentials: payload.credentials }))),
      exhaustMap((payload) =>
        this.actions$.pipe(
          ofType(UserActions.signinSuccess),
          take(1),
          exhaustMap(() =>
            combineLatest([this.store.select(currentOrderItems), this.store.select(total), this.store.select(userId)]).pipe(
              take(1),
              exhaustMap(([order, totalCost, userIdFromState]) =>
                this.checkoutFormService
                  .placeOrder({
                    order: {
                      userId: userIdFromState,
                      total: totalCost,
                      notes: order.map((item) => item.notes).join(', '),
                      items: order.map(({ _id, preference }) => ({ _id, preference })),
                    },
                  })
                  .pipe(
                    exhaustMap((clientSecret) => this.stripeService.confirmPaymentIntent(payload.card, clientSecret)),
                    map(() => CheckoutActions.placeOrderSuccess()),
                    catchError(() => of(CheckoutActions.placeOrderFailure()))
                  )
              )
            )
          )
        )
      )
    )
  );

  constructor(
    private readonly store: Store<unknown>,
    private actions$: Actions,
    private readonly checkoutFormService: CheckoutFormService,
    private readonly stripeService: StripeService
  ) {}
}
