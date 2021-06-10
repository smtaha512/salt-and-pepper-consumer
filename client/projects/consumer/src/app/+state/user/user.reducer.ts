import { createReducer, on } from '@ngrx/store';
import { AuthenticationResponseInterface } from '../../services/authentication/authentication.model';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

// tslint:disable-next-line: no-empty-interface
export interface State extends AuthenticationResponseInterface {
  showPakistaniMenu: boolean;
}

export const initialState: State = {
  body: null,
  token: null,
  showPakistaniMenu: true,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.signinSuccess, (state, action) => ({ ...state, ...action.consumer })),
  on(UserActions.updateUser, (state, action) => ({ ...state, body: { ...state.body, ...action.user } })),
  on(UserActions.togglePakistaniMenu, (state, action) => ({ ...state, showPakistaniMenu: action.value }))
);
