import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { menusFeatureKey, State as MenuState, menuReducers } from '../../pages/menu/+state/menu.reducer';

export interface State {
  [menusFeatureKey]: MenuState;
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  [menusFeatureKey]: menuReducers,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
