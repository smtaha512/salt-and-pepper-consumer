import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { menusFeatureKey, reducer as MenuReducers, State as MenuState } from '../pages/menu/+state/menu.reducer';

export interface State {
  [menusFeatureKey]: MenuState;
}

export const reducers: ActionReducerMap<State> = {
  [menusFeatureKey]: MenuReducers,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
