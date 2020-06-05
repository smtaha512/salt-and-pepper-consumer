import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { MenuInterface } from 'dist/library';
import * as MenuActions from './menu.actions';

export const menusFeatureKey = 'menus';

export interface State extends EntityState<MenuInterface> {
  ids: string[];
}

export const adapter: EntityAdapter<MenuInterface> = createEntityAdapter<MenuInterface>({ selectId: (instance) => instance._id });

export const initialState: State = adapter.getInitialState({
  ids: [],
});

export const reducer = createReducer(
  initialState,
  on(MenuActions.loadMenusSuccess, (state, action) => adapter.addMany(action.menus, state)),
  on(MenuActions.addMenu, (state, action) => adapter.addOne(action.menu, state)),
  on(MenuActions.upsertMenu, (state, action) => adapter.upsertOne(action.menu, state)),
  on(MenuActions.addMenus, (state, action) => adapter.addMany(action.menus, state)),
  on(MenuActions.upsertMenus, (state, action) => adapter.upsertMany(action.menus, state)),
  on(MenuActions.updateMenu, (state, action) => adapter.updateOne(action.menu, state)),
  on(MenuActions.updateMenus, (state, action) => adapter.updateMany(action.menus, state)),
  on(MenuActions.deleteMenu, (state, action) => adapter.removeOne(action.id, state)),
  on(MenuActions.deleteMenus, (state, action) => adapter.removeMany(action.ids, state)),
  // on(MenuActions.loadMenus, (state, action) => adapter.setAll(action.menus, state)),
  on(MenuActions.clearMenus, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export function menuReducers(state: State | undefined, action: Action) {
  return reducer(state, action);
}
