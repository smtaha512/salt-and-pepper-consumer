import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyCodePopoverComponent } from './verify-code-popover.component';
import { IonicModule } from '@ionic/angular';
import { VerifyCodePopoverService } from './services/verify-code-popover.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VerifyCodePopoverComponent],
  exports: [VerifyCodePopoverComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  providers: [VerifyCodePopoverService],
  entryComponents: [VerifyCodePopoverComponent],
})
export class VerifyCodePopoverModule {}
