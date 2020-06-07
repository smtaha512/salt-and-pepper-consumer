import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { menusFeatureKey, State as MenuState, menuReducers } from '../../pages/menu/+state/menu.reducer';
import * as fromMenuItem from '../../pages/menu-item/+state/menu-item.reducer';
import * as fromCurrentOrderItem from '../../pages/cart/+state/current-order-item.reducer';

export interface State {
  [fromCurrentOrderItem.currentOrderItemsFeatureKey]: fromCurrentOrderItem.State;
  [fromMenuItem.menuItemsFeatureKey]: fromMenuItem.State;
  [menusFeatureKey]: MenuState;
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  [fromCurrentOrderItem.currentOrderItemsFeatureKey]: fromCurrentOrderItem.reducer,
  [fromMenuItem.menuItemsFeatureKey]: fromMenuItem.reducer,
  [menusFeatureKey]: menuReducers,
  router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
