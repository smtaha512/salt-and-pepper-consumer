import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CounterInputPopoverComponent } from './counter-input-popover.component';
import { CounterInputModule } from '../../../counter-input/counter-input.module';
import { CounterInputPopoverService } from './counter-input-popover.service';

@NgModule({
  declarations: [CounterInputPopoverComponent],
  entryComponents: [CounterInputPopoverComponent],
  exports: [CounterInputPopoverComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, CounterInputModule],
  providers: [CounterInputPopoverService],
})
export class CounterInputPopoverModule {}
