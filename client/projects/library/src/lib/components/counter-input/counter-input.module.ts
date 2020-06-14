import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CounterInputComponent } from './counter-input.component';

@NgModule({
  declarations: [CounterInputComponent],
  entryComponents: [CounterInputComponent],
  exports: [CounterInputComponent],
  imports: [CommonModule, IonicModule],
})
export class CounterInputModule {}
