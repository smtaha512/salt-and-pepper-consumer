import { ActionReducerMap } from '@ngrx/store';

import * as fromMenu from '../pages/menu/+state/menu.reducer';
import * as fromMenuItem from '../pages/menu-item/+state/menu-item.reducer';
import * as fromCurrentOrderItem from '../pages/cart/+state/current-order-item.reducer';
import * as fromUser from './user/user.reducer';

export interface State {
  [fromCurrentOrderItem.currentOrderItemsFeatureKey]: fromCurrentOrderItem.State;
  [fromMenuItem.menuItemsFeatureKey]: fromMenuItem.State;
  [fromMenu.menusFeatureKey]: fromMenu.State;
  [fromUser.userFeatureKey]: fromUser.State;
}

export const initialState: State = {
  [fromCurrentOrderItem.currentOrderItemsFeatureKey]: fromCurrentOrderItem.initialState,
  [fromMenuItem.menuItemsFeatureKey]: fromMenuItem.initialState,
  [fromMenu.menusFeatureKey]: fromMenu.initialState,
  [fromUser.userFeatureKey]: fromUser.initialState,
};

export const reducers: ActionReducerMap<State> = {
  [fromCurrentOrderItem.currentOrderItemsFeatureKey]: fromCurrentOrderItem.reducer,
  [fromMenuItem.menuItemsFeatureKey]: fromMenuItem.reducer,
  [fromMenu.menusFeatureKey]: fromMenu.menuReducers,
  [fromUser.userFeatureKey]: fromUser.userReducer,
};
