import { createReducer, on } from '@ngrx/store';
import { AuthenticationResponseInterface } from '../../pages/authentication/models/authentication.interface';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

// tslint:disable-next-line: no-empty-interface
export interface State extends AuthenticationResponseInterface {}

export const initialState: State = null;

export const userReducer = createReducer(
  initialState,
  on(UserActions.signinSuccess, (state, action) => ({ ...state, ...action.manager })),
  on(UserActions.updateUser, (state, action) => ({ ...state, body: { ...state.body, ...action.user } }))
);
