import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MenuInterface, selectById, selectFirstEntity, selectLastEntity } from 'dist/library';
import { menusFeatureKey, selectAll, selectEntities, selectIds, selectTotal, State } from './menu.reducer';

export const menuState = createFeatureSelector<State>(menusFeatureKey);

export const menuIds = createSelector(menuState, selectIds);

export const menuEntities = createSelector(menuState, selectEntities);

export const menus = createSelector(menuState, selectAll);

export const totalMenus = createSelector(menuState, selectTotal);

export const menuById = selectById<MenuInterface>(menuEntities);

export const firstMenu = selectFirstEntity<MenuInterface>(menuEntities, menuIds);

export const lastMenu = selectLastEntity(menuEntities, menuIds);

export const categoriesOfAllMenus = createSelector(menus, (state) => state.map((menu) => menu.categories));

export const categoriesByMenuId = (menuId: string) => createSelector(menuById(menuId), (state) => state.categories);

export const firstCategoryOfFirstMenu = createSelector(firstMenu, (state) => state.categories[0]);
