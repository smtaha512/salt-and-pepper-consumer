import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { Config, InterceptorsModule, StorageService, CONFIG, StorageSyncEffects } from 'dist/library';
import { environment } from '../environments/environment';
import { metaReducers } from './+state/meta-reducers';
import { reducers } from './+state/reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';

const defaultConfig: Config = { baseUrl: environment.baseUrl, loaderExpemtedUrls: [], localDbName: 'SALT_AND_PEPPER_CONSUMER' };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(
      { ...reducers },
      {
        metaReducers: [...(metaReducers || [])],
        runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true },
      }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects, StorageSyncEffects]),
    HttpClientModule,
    InterceptorsModule.forRoot(defaultConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [{ provide: CONFIG, useValue: defaultConfig }, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
