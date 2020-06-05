import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromMenu from './+state/menu.reducer';
import { MenuEffects } from './+state/menu.effects';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    StoreModule.forFeature(fromMenu.menusFeatureKey, fromMenu.menuReducers),
    EffectsModule.forFeature([MenuEffects]),
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}
