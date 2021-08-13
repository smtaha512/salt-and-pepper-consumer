import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { VerifyCodePopoverDismissRoleEnum } from '../models/verify-code-popover-dismiss-role.enum';
import { OverlayEventDetail } from '@ionic/core';

interface CodeDictionary {
  code: string;
}

@Injectable({ providedIn: 'root' })
export class VerifyCodePopoverService {
  constructor(private readonly alertController: AlertController) {}

  present() {
    return from(
      this.alertController.create({
        animated: true,
        backdropDismiss: false,
        buttons: [{ text: 'Verify', role: VerifyCodePopoverDismissRoleEnum.VERIFY, handler: ({ code }: CodeDictionary) => ({ code }) }],
        header: 'Verification',
        inputs: [{ type: 'number', placeholder: 'Verification code', name: 'code' }],
        keyboardClose: false,
        subHeader: 'Enter verification code sent on your phone number',
      })
    ).pipe(
      tap((popover) => popover.present()),
      switchMap((popover) => from(popover.onDidDismiss())),
      map(({ data: { values, ...data }, ...detail }: OverlayEventDetail<CodeDictionary & Record<'values', CodeDictionary>>) => ({
        ...detail,
        data,
      }))
    );
  }
}
