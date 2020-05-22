import { Action, ActionReducer } from '@ngrx/store';

import { LOGOUT } from '../actions/actions';

export function clearStateMetaReducer<State extends {}>(reducer: ActionReducer<State>): ActionReducer<State> {
  return function clearStateFn(state: State, action: Action) {
    if (action.type === LOGOUT) {
      state = {} as State;
    }
    return reducer(state, action);
  };
}
