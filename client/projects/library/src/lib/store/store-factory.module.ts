import { Type } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { Action, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export function SetupNgRx<Environment extends { production: boolean }, State = any>({
  effects,
  environment,
  metaReducers,
  reducers,
}: {
  effects?: Type<any>[];
  environment: Environment;
  metaReducers: MetaReducer<State, Action>[];
  reducers: ActionReducerMap<State, Action>;
}) {
  return [
    StoreModule.forRoot(
      { ...reducers, router: routerReducer },
      {
        metaReducers: metaReducers || [],
        runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true },
      }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
  ];
}
