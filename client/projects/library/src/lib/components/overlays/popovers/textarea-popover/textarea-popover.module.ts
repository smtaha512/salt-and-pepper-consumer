import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TextareaPopoverComponent } from './textarea-popover.component';
import { TextareaPopoverService } from './textarea-popover.service';

@NgModule({
  declarations: [TextareaPopoverComponent],
  exports: [TextareaPopoverComponent],
  entryComponents: [TextareaPopoverComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  providers: [TextareaPopoverService],
})
export class TextareaPopoverModule {}
