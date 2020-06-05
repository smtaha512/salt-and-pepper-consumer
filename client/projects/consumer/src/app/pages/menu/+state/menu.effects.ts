import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MenuInterface } from 'library/library';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MenuService } from '../services/menu.service';
import * as MenuActions from './menu.actions';

@Injectable()
export class MenuEffects {
  loadMenu$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MenuActions.loadMenus),
      switchMap(() =>
        this.menuService.read().pipe(
          map((menus) => MenuActions.loadMenusSuccess({ menus })),
          catchError((error) => of(MenuActions.loadMenusFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private readonly menuService: MenuService, private readonly store: Store<MenuInterface>) {}
}
