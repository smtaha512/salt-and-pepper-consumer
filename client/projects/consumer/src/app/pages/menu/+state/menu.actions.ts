import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { MenuInterface } from 'dist/library';

export const loadMenus = createAction('[Menu/API] Load Menus', props<{ menus: MenuInterface[] }>());

export const addMenu = createAction('[Menu/API] Add Menu', props<{ menu: MenuInterface }>());

export const upsertMenu = createAction('[Menu/API] Upsert Menu', props<{ menu: MenuInterface }>());

export const addMenus = createAction('[Menu/API] Add Menus', props<{ menus: MenuInterface[] }>());

export const upsertMenus = createAction('[Menu/API] Upsert Menus', props<{ menus: MenuInterface[] }>());

export const updateMenu = createAction('[Menu/API] Update Menu', props<{ menu: Update<MenuInterface> }>());

export const updateMenus = createAction('[Menu/API] Update Menus', props<{ menus: Update<MenuInterface>[] }>());

export const deleteMenu = createAction('[Menu/API] Delete Menu', props<{ id: string }>());

export const deleteMenus = createAction('[Menu/API] Delete Menus', props<{ ids: string[] }>());

export const clearMenus = createAction('[Menu/API] Clear Menus');
