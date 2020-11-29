import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ItemInterface, selectById, selectFirstEntity, selectLastEntity } from 'dist/library';
import { categoriesByMenuId } from '../../menu/+state/menu.selectors';
import { menuItemsFeatureKey, selectAll, selectEntities, selectIds, selectTotal, State } from './menu-item.reducer';

export const menuItemState = createFeatureSelector<State>(menuItemsFeatureKey);

export const menuItemIds = createSelector(menuItemState, selectIds);

export const menuItemEntities = createSelector(menuItemState, selectEntities);

export const menuItems = createSelector(menuItemState, selectAll);

export const totalMenuItems = createSelector(menuItemState, selectTotal);

export const menuItemById = selectById<ItemInterface>(menuItemEntities);

export const firstMenuItem = selectFirstEntity<ItemInterface>(menuItemEntities, menuItemIds);

export const lastMenuItem = selectLastEntity<ItemInterface>(menuItemEntities, menuItemIds);

export const menuItemsByCategoryId = (categoryId: string) =>
  createSelector(menuItems, (state) => state.filter((item) => item.categoryId === categoryId));

export const menuItemsByMenuId = (menuId: string) => createSelector(menuItems, (state) => state.filter((item) => item.menuId === menuId));

export const menuItemsByCategories = createSelector(menuItems, (items) =>
  items.reduce(
    (acc, curr) => ({ ...acc, [curr.categoryId]: [...(acc[curr.categoryId] ?? []), curr] }),
    {} as Record<string, ItemInterface[]>
  )
);

export const menuItemsPerMenu = (menuId: string) =>
  createSelector(categoriesByMenuId(menuId), menuItemsByCategories, (categories, items) => {
    return ([] as ItemInterface[]).concat(...categories.map((category) => ({ ...items[category._id] })));
  });
