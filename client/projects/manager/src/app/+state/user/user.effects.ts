import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StorageService } from 'dist/library';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthenticationService } from '../../pages/authentication/services/authentication.service';
import * as UserActions from './user.actions';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  signin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.signin),
      exhaustMap((action) =>
        this.authenticationService.signin(action.credentials).pipe(map((manager) => UserActions.signinSuccess({ manager })))
      ),
      catchError((error) => of(UserActions.signinFailure(error)))
    );
  });

  authSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.signinSuccess),
      exhaustMap((action) => from(this.storageService.setToken({ token: action.manager.token }))),
      map(() => UserActions.gotoOrdersPage())
    );
  });

  gotoOrdersPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.gotoOrdersPage),
        map(() => this.router.navigateByUrl('/orders'))
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private readonly authenticationService: AuthenticationService,
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {}
}
