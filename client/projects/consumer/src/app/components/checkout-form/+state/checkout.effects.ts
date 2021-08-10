import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isNotEmpty } from 'dist/library';
import { combineLatest, of } from 'rxjs';
import { catchError, exhaustMap, filter, map, take, tap } from 'rxjs/operators';
import { userId } from '../../../+state/user/user.selectors';
import { clearCurrentOrderItems } from '../../../pages/cart/+state/current-order-item.actions';
import { currentOrderItems, total } from '../../../pages/cart/+state/current-order-item.selectors';
import { SigninInterface } from '../../../services/authentication/authentication.model';
import { StripeResponse } from '../models/stripe-response.interface';
import { CheckoutFormService } from '../services/checkout-form/checkout-form.service';
import { StripeService } from '../services/stripe/stripe.service';
import * as UserActions from './../../../+state/user/user.actions';
import * as CheckoutActions from './checkout.actions';

@Injectable({ providedIn: 'root' })
export class CheckoutEffects {
  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.placeOrder),
      exhaustMap((payload) =>
        this.store.select(userId).pipe(
          exhaustMap((userIdFromState) => {
            if (userIdFromState) {
              return this.placeOrderFlowAfterLogin$();
            }
            return this.placeOrderWithLogin$(payload);
          })
        )
      )
    )
  );

  placeOrderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.placeOrderSuccess),
      tap(() => this.router.navigateByUrl('/checkout-success')),
      map(() => clearCurrentOrderItems())
    )
  );

  placeOrderFlowAfterLogin$() {
    return combineLatest([
      this.store.select(currentOrderItems),
      this.store.select(total),
      this.store.select(userId).pipe(filter(isNotEmpty)),
    ]).pipe(
      take(1),
      exhaustMap(([order, totalCost, userIdFromState]) =>
        this.checkoutFormService
          .placeOrder({
            order: {
              userId: userIdFromState,
              total: totalCost,
              notes: order
                .filter((item) => !!item.notes)
                .map((item) => item.notes)
                .join(', '),
              items: order,
            },
          })
          .pipe(
            exhaustMap((stripeResponse: StripeResponse) => this.stripeService.paymentFlow(stripeResponse)),
            map(() => CheckoutActions.placeOrderSuccess()),
            catchError(() => of(CheckoutActions.placeOrderFailure()))
          )
      )
    );
  }

  placeOrderWithLogin$(payload: { credentials: Omit<SigninInterface, 'code'> }) {
    this.store.dispatch(UserActions.getVerificationCode({ credentials: payload.credentials }));
    return this.actions$.pipe(
      ofType(UserActions.signinSuccess),
      take(1),
      exhaustMap(() => this.placeOrderFlowAfterLogin$())
    );
  }

  constructor(
    private readonly store: Store<unknown>,
    private actions$: Actions,
    private readonly checkoutFormService: CheckoutFormService,
    private readonly stripeService: StripeService,
    private readonly router: Router
  ) {}
}
