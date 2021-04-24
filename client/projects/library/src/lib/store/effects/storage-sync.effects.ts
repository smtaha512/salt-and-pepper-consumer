import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { INIT, Store, UPDATE } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, filter, first, map, tap } from 'rxjs/operators';
import { merge } from 'lodash-es';
import { CONFIG, Config } from '../../config/config';
import { StorageService } from '../../services/storage/storage.service';
import * as actions from '../actions/actions';

@Injectable()
export class StorageSyncEffects {
  private readonly ignoredActions = [
    INIT,
    ROOT_EFFECTS_INIT,
    UPDATE,
    actions.PULL_STATE_FROM_STORAGE,
    actions.PULL_STATE_FROM_STORAGE_FAILURE,
    actions.PUSH_STATE_TO_STORAGE,
    ...(this.config.ignoreActions || []),
  ];

  pullStateFromStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.pullStateFromStorage),
      exhaustMap(() => from(this.storage.get())),
      exhaustMap((storageValue) =>
        this.store.pipe(
          first(),
          map((store) => merge(storageValue, store))
        )
      ),
      map((payload) => actions.pullStateFromStorageSuccess({ payload })),
      catchError((res) => of(actions.pullStateFromStorageFailure()))
    );
  });

  pushStateToStorage = createEffect(
    () => {
      return this.actions$.pipe(
        filter((action) => !this.ignoredActions.includes(action.type)),
        exhaustMap((_) =>
          this.store.pipe(
            map((state) =>
              Object.entries(state)
                .filter(([key, value]) => !(!key || !value || typeof key === 'undefined' || key === 'undefined'))
                .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
            )
          )
        ),
        exhaustMap((store) => from(this.storage.set({ value: store })))
      );
    },
    { dispatch: false }
  );

  createEffect;

  constructor(
    private actions$: Actions<{ type: string; payload: any }>,
    private readonly storage: StorageService,
    private readonly store: Store<any>,
    @Inject(CONFIG) private readonly config: Config
  ) {}
}
