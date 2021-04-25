import { Action, ActionReducer } from '@ngrx/store';

import * as actions from '../actions/actions';

export function storageSyncMetaReducer<State extends object>(reducer: ActionReducer<State>): ActionReducer<State> {
  return function storeSyncReducer(state: State, action: Action & { payload: State }) {
    if (action.type === actions.PULL_STATE_FROM_STORAGE_SUCCESS) {
      return { ...state, ...action.payload };
    }
    return reducer(state, action);
  };
}
