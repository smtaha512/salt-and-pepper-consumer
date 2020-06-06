import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { EtaPipeModule, ImgWithSkeletonModule } from 'dist/library';
import { DataEtaModule } from '../../components/data-eta/data-eta.module';
import { MenuItemsEffects } from '../menu-item/+state/menu-item.effects';
import { MenuEffects } from './+state/menu.effects';
import * as fromMenu from './+state/menu.reducer';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    StoreModule.forFeature(fromMenu.menusFeatureKey, fromMenu.menuReducers),
    EffectsModule.forFeature([MenuEffects, MenuItemsEffects]),
    EtaPipeModule,
    DataEtaModule,
    ImgWithSkeletonModule,
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}
