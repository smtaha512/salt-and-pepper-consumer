import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CustomizeMenuPopoverModule } from '../customize-menu-popover/customize-menu-popover.module';
import { MenuPopoverComponent } from './menu-popover.component';
import { MenuPopoverService } from './menu-popover.service';


@NgModule({
  declarations: [MenuPopoverComponent],
  exports: [MenuPopoverComponent],
  imports: [CommonModule, IonicModule, CustomizeMenuPopoverModule],
  providers: [MenuPopoverService],
})
export class MenuPopoverModule {}
