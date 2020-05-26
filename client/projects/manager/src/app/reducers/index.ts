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

export interface State {
  auth: {};
}

const action = createAction('Dumb');

export const reducers: ActionReducerMap<State> = {
  auth: createReducer(action),
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
