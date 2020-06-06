import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromMenuItem from './+state/menu-item.reducer';
import { MenuItemsEffects } from './+state/menu-item.effects';
import { MenuItemPageRoutingModule } from './menu-item-routing.module';
import { MenuItemPage } from './menu-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuItemPageRoutingModule,
    StoreModule.forFeature(fromMenuItem.menuItemsFeatureKey, fromMenuItem.reducer),
    EffectsModule.forFeature([MenuItemsEffects]),
  ],
  declarations: [MenuItemPage],
})
export class MenuItemPageModule {}
