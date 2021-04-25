import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StorageService } from 'dist/library';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { VerifyCodePopoverDismissRoleEnum } from '../../components/verify-code-popover/models/verify-code-popover-dismiss-role.enum';
import { VerifyCodePopoverService } from '../../components/verify-code-popover/services/verify-code-popover.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import * as UserActions from './user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  getVerificationCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getVerificationCode),
      exhaustMap((payload) =>
        this.authenticationService
          .getVerificationCode(payload.credentials.contact)
          .pipe(map(() => UserActions.getVerificationCodeSuccess(payload)))
      ),
      catchError((error) => of(UserActions.getVerificationCodeFailure(error)))
    );
  });

  getVerificationCodeSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getVerificationCodeSuccess),
      exhaustMap((action) =>
        this.verifyCodePopover.present().pipe(
          map(({ data: { code }, role }) => {
            if (role !== VerifyCodePopoverDismissRoleEnum.VERIFY) {
              return UserActions.notImplementedAction();
            }
            return UserActions.signin({ credentials: { ...action.credentials, code } });
          })
        )
      )
    );
  });

  signin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.signin),
      exhaustMap((action) =>
        this.authenticationService.signin(action.credentials).pipe(map((consumer) => UserActions.signinSuccess({ consumer })))
      ),
      catchError((error) => of(UserActions.signinFailure(error)))
    );
  });

  authSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.signinSuccess),
        exhaustMap((action) => from(this.storageService.setToken({ token: action.consumer.token })))
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private readonly authenticationService: AuthenticationService,
    private readonly storageService: StorageService,
    private readonly verifyCodePopover: VerifyCodePopoverService
  ) {}
}
