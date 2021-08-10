import { createAction, props } from '@ngrx/store';
import { SigninInterface } from '../../../services/authentication/authentication.model';

export const placeOrder = createAction('[Checkout/API] Place order', props<{ credentials: Omit<SigninInterface, 'code'> }>());
export const placeOrderSuccess = createAction('[Checkout/API] Place Order Success');
export const placeOrderFailure = createAction('[Checkout/API] Place Order Failure');
