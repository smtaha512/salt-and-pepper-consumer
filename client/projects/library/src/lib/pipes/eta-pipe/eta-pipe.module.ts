import { NgModule } from '@angular/core';

import { EtaPipe } from './eta.pipe';

@NgModule({
  declarations: [EtaPipe],
  exports: [EtaPipe],
  providers: [EtaPipe],
})
export class EtaPipeModule {}
