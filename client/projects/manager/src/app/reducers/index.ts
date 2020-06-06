import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  createAction,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface State {
  auth: {};
  router: RouterReducerState<any>;
}

const action = createAction('Dumb');

export const reducers: ActionReducerMap<State> = {
  auth: createReducer(action),
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
