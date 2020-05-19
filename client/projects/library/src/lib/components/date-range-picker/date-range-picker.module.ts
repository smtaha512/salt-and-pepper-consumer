import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DateRangePickerComponent } from './date-range-picker.component';

@NgModule({
  declarations: [DateRangePickerComponent],
  exports: [DateRangePickerComponent],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class DateRangePickerModule {}
