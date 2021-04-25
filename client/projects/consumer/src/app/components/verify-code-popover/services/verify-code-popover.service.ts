import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VerifyCodePopoverService {
  constructor(private readonly popoverController: PopoverController) {}

  present() {
    return from(import('../verify-code-popover.component')).pipe(
      map((c) => c.VerifyCodePopoverComponent),
      switchMap((component) => from(this.popoverController.create({ component, cssClass: ['popover-center'] }))),
      tap((popover) => popover.present()),
      switchMap((popover) => from(popover.onDidDismiss()))
    );
  }
}
