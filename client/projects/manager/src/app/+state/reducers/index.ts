import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  createAction,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import * as fromUser from './../user/user.reducer';

export interface State {
  auth: {};
  router: RouterReducerState<any>;
  [fromUser.userFeatureKey]: fromUser.State;
}

const action = createAction('Dumb');

export const reducers: ActionReducerMap<State> = {
  auth: createReducer(action),
  router: routerReducer,
  [fromUser.userFeatureKey]: fromUser.userReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
