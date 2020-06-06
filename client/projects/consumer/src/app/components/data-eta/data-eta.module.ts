import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataEtaDirective } from '../data-eta.directive';

@NgModule({
  declarations: [DataEtaDirective],
  exports: [DataEtaDirective],
  imports: [CommonModule],
})
export class DataEtaModule {}
