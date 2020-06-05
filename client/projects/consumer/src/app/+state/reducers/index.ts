import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { menusFeatureKey, reducer as MenuReducers, State as MenuState } from '../../pages/menu/+state/menu.reducer';

export interface State {
  [menusFeatureKey]: MenuState;
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  [menusFeatureKey]: MenuReducers,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
