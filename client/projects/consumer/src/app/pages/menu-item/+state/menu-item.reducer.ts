import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { ItemInterface } from 'dist/library';
import * as MenuItemActions from './menu-item.actions';

export const menuItemsFeatureKey = 'menuItems';

export interface State extends EntityState<ItemInterface> {
  ids: string[];
}

export const adapter: EntityAdapter<ItemInterface> = createEntityAdapter<ItemInterface>({ selectId: (instance) => instance._id });

export const initialState: State = adapter.getInitialState({
  ids: [],
});

export const reducer = createReducer(
  initialState,
  on(MenuItemActions.loadMenuItemsSuccess, (state, action) => adapter.addMany(action.menuItems, state)),
  on(MenuItemActions.addMenuItem, (state, action) => adapter.addOne(action.menuItem, state)),
  on(MenuItemActions.upsertMenuItem, (state, action) => adapter.upsertOne(action.menuItem, state)),
  on(MenuItemActions.addMenuItems, (state, action) => adapter.addMany(action.menuItems, state)),
  on(MenuItemActions.upsertMenuItems, (state, action) => adapter.upsertMany(action.menuItems, state)),
  on(MenuItemActions.updateMenuItem, (state, action) => adapter.updateOne(action.menuItem, state)),
  on(MenuItemActions.updateMenuItems, (state, action) => adapter.updateMany(action.menuItems, state)),
  on(MenuItemActions.deleteMenuItem, (state, action) => adapter.removeOne(action.id, state)),
  on(MenuItemActions.deleteMenuItems, (state, action) => adapter.removeMany(action.ids, state)),
  // on(MenuItemActions.loadMenuItems, (state, action) => adapter.setAll(action.menuItems, state)),
  on(MenuItemActions.clearMenuItems, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
