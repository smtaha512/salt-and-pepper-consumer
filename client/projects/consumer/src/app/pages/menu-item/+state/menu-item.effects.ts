import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { MenuItemService } from '../services/menu-item.service';
import * as MenuItemActions from './menu-item.actions';

@Injectable()
export class MenuItemsEffects {
  loadMenuItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MenuItemActions.loadMenuItems),
      exhaustMap(() =>
        this.menuItemsService.read().pipe(
          map((menuItems) => MenuItemActions.loadMenuItemsSuccess({ menuItems })),
          catchError((error) => of(MenuItemActions.loadMenuItemsFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private readonly menuItemsService: MenuItemService) {}
}
