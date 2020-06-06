import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { InterceptorsModule } from 'dist/library';
import { environment } from '../environments/environment';
import { metaReducers, reducers } from './+state/reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';

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
    EffectsModule.forRoot([AppEffects]),
    HttpClientModule,
    InterceptorsModule.forRoot({ baseUrl: environment.baseUrl, loaderExpemtedUrls: [] }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
