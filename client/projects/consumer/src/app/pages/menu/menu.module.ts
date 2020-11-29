import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MenuItemsEffects } from '../menu-item/+state/menu-item.effects';
import { MenuEffects } from './+state/menu.effects';
import * as fromMenu from './+state/menu.reducer';
import { MenuPopoverModule } from './components/menu-popover/menu-popover.module';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';
import { FindByPipe } from './pipes/find-by/find-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    StoreModule.forFeature(fromMenu.menusFeatureKey, fromMenu.menuReducers),
    EffectsModule.forFeature([MenuEffects, MenuItemsEffects]),
    MenuPopoverModule,
  ],
  declarations: [MenuPage, FindByPipe],
})
export class MenuPageModule {}
