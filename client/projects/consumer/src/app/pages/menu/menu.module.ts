import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import * as fromMenu from './+state/menu.reducer';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    StoreModule.forFeature(fromMenu.menusFeatureKey, fromMenu.reducer),
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}
