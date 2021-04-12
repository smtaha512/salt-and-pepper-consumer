import { createReducer, on } from '@ngrx/store';
import { UserInterface } from './user.model';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

// tslint:disable-next-line: no-empty-interface
export interface State extends UserInterface {}

export const initialState: State = null;

export const userReducer = createReducer(
  initialState,
  on(UserActions.signinSuccess, (state, action) => ({ ...state, ...action.consumer }))
);
