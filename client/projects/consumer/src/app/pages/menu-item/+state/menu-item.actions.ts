import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ItemInterface } from 'dist/library';

export const loadMenuItems = createAction('[MenuItem/API] Load MenuItems');
export const loadMenuItemsSuccess = createAction('[MenuItem/API] Load MenuItems Success', props<{ menuItems: ItemInterface[] }>());
export const loadMenuItemsFailure = createAction('[MenuItem/API] Load MenuItems Failure', props<{ error: unknown }>());

export const addMenuItem = createAction('[MenuItem/API] Add MenuItem', props<{ menuItem: ItemInterface }>());

export const upsertMenuItem = createAction('[MenuItem/API] Upsert MenuItem', props<{ menuItem: ItemInterface }>());

export const addMenuItems = createAction('[MenuItem/API] Add MenuItems', props<{ menuItems: ItemInterface[] }>());

export const upsertMenuItems = createAction('[MenuItem/API] Upsert MenuItems', props<{ menuItems: ItemInterface[] }>());

export const updateMenuItem = createAction('[MenuItem/API] Update MenuItem', props<{ menuItem: Update<ItemInterface> }>());

export const updateMenuItems = createAction('[MenuItem/API] Update MenuItems', props<{ menuItems: Update<ItemInterface>[] }>());

export const deleteMenuItem = createAction('[MenuItem/API] Delete MenuItem', props<{ id: string }>());

export const deleteMenuItems = createAction('[MenuItem/API] Delete MenuItems', props<{ ids: string[] }>());

export const clearMenuItems = createAction('[MenuItem/API] Clear MenuItems');
