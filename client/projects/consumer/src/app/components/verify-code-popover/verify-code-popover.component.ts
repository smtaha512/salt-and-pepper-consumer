import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { EMPTY, Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { VerifyCodePopoverDismissRoleEnum } from './models/verify-code-popover-dismiss-role.enum';

@Component({
  selector: 'app-verify-code-popover',
  templateUrl: './verify-code-popover.component.html',
  styleUrls: ['./verify-code-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyCodePopoverComponent implements OnInit, OnDestroy {
  verificationCodeControl: FormControl;
  shouldDisableChangeButton$: Observable<boolean> = EMPTY;

  constructor(private readonly popoverController: PopoverController) {}

  ngOnInit() {
    this.verificationCodeControl = new FormControl('');
    this.shouldDisableChangeButton$ = this.verificationCodeControl.valueChanges.pipe(
      startWith(this.verificationCodeControl.value),
      map((value) => !value),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  handleVerify() {
    this.popoverController.dismiss({ code: this.verificationCodeControl.value }, VerifyCodePopoverDismissRoleEnum.VERIFY);
  }

  ngOnDestroy(): void {
    this.verificationCodeControl.reset();
  }
}
