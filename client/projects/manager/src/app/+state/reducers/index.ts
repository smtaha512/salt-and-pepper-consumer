import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createAction, createReducer, MetaReducer } from '@ngrx/store';
import { clearStateMetaReducer, storageSyncMetaReducer } from 'dist/library';
import { environment } from '../../../environments/environment';
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

const sharedMetaReducers: MetaReducer<State>[] = [clearStateMetaReducer, storageSyncMetaReducer];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [...sharedMetaReducers] : [...sharedMetaReducers];
