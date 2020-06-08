import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import * as fromMenu from '../pages/menu/+state/menu.reducer';
import * as fromMenuItem from '../pages/menu-item/+state/menu-item.reducer';
import * as fromCurrentOrderItem from '../pages/cart/+state/current-order-item.reducer';

export interface State {
  [fromCurrentOrderItem.currentOrderItemsFeatureKey]: fromCurrentOrderItem.State;
  [fromMenuItem.menuItemsFeatureKey]: fromMenuItem.State;
  [fromMenu.menusFeatureKey]: fromMenu.State;
  router: RouterReducerState<any>;
}

export const initialState: State = {
  currentOrderItems: fromCurrentOrderItem.initialState,
  menuItems: fromMenuItem.initialState,
  menus: fromMenu.initialState,
  router: null,
};

export const reducers: ActionReducerMap<State> = {
  [fromCurrentOrderItem.currentOrderItemsFeatureKey]: fromCurrentOrderItem.reducer,
  [fromMenuItem.menuItemsFeatureKey]: fromMenuItem.reducer,
  [fromMenu.menusFeatureKey]: fromMenu.menuReducers,
  router: routerReducer,
};
