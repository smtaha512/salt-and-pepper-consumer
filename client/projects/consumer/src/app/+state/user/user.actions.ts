import { createAction, props } from '@ngrx/store';
import { ConsumerInterface } from 'dist/library';
import { AuthenticationResponseInterface, SigninInterface } from '../../services/authentication/authentication.model';

export const getVerificationCode = createAction(
  '[User/API] Get Verification Code',
  props<{ credentials: Omit<SigninInterface, 'code'> }>()
);
export const getVerificationCodeSuccess = createAction(
  '[User/API] Get Verification Code Success',
  props<{ credentials: Omit<SigninInterface, 'code'> }>()
);
export const getVerificationCodeFailure = createAction('[User/API] Get Verification Code Failure', props<{ error: unknown }>());

export const verifyCode = createAction('[User/API] Verify Code', props<Record<'verificationCode', string>>());
export const verifyCodeSuccess = createAction('[User/API] Verify Code Success');
export const verifyCodeFailure = createAction('[User/API] Verify Code Failure', props<{ error: unknown }>());

export const signin = createAction('[User/API] Signin', props<{ credentials: SigninInterface }>());
export const signinSuccess = createAction('[User/API] Signin Success', props<Record<'consumer', AuthenticationResponseInterface>>());
export const signinFailure = createAction('[User/API] Signin Failure', props());

export const updateUser = createAction('[User/API] Update User', props<{ user: ConsumerInterface }>());

export const togglePakistaniMenu = createAction('[User] Toggle Pakistani Menu', props<Record<'value', boolean>>());
export const notImplementedAction = createAction('Not implemented action');
