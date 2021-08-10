import { ActionReducerMap, createAction, MetaReducer } from '@ngrx/store';
import { clearStateMetaReducer, storageSyncMetaReducer } from 'dist/library';
import { environment } from '../../../environments/environment';
import * as fromUser from './../user/user.reducer';

export interface State {
  [fromUser.userFeatureKey]: fromUser.State;
}

const action = createAction('Dumb');

export const reducers: ActionReducerMap<State> = {
  [fromUser.userFeatureKey]: fromUser.userReducer,
};

const sharedMetaReducers: MetaReducer<State>[] = [clearStateMetaReducer, storageSyncMetaReducer];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [...sharedMetaReducers] : [...sharedMetaReducers];
