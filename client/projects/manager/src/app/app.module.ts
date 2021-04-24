import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Config, InterceptorsModule } from 'dist/library';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { metaReducers, reducers } from './reducers';

const defaultConfig: Config = { baseUrl: environment.baseUrl, loaderExpemtedUrls: [], localDbName: 'SALT_AND_PEPPER_MANAGER' };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    StoreModule.forRoot(
      { ...reducers },
      {
        metaReducers: [...(metaReducers || [])],
        runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true },
      }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    HttpClientModule,
    InterceptorsModule.forRoot(defaultConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
