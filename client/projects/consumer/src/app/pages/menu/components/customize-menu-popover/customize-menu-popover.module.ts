import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CustomizeMenuPopoverComponent } from './customize-menu-popover.component';
import { CustomizeMenuPopoverService } from './customize-menu-popover.service';

@NgModule({
  declarations: [CustomizeMenuPopoverComponent],
  exports: [CustomizeMenuPopoverComponent],
  imports: [CommonModule, IonicModule],
  providers: [CustomizeMenuPopoverService],
})
export class CustomizeMenuPopoverModule {}
