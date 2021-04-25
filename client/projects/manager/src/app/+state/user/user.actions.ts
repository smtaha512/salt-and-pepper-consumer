import { createAction, props } from '@ngrx/store';
import { AdminInterface } from 'dist/library';
import { AuthenticationResponseInterface, SigninInterface } from '../../pages/authentication/models/authentication.interface';

export const signin = createAction('[User/API] Signin', props<{ credentials: SigninInterface }>());
export const signinSuccess = createAction('[User/API] Signin Success', props<Record<'manager', AuthenticationResponseInterface>>());
export const signinFailure = createAction('[User/API] Signin Failure', props());
export const gotoOrdersPage = createAction('[User] Goto Orders Page');

export const updateUser = createAction('[User/API] Update User', props<{ user: AdminInterface }>());

export const notImplementedAction = createAction('Not implemented action');
