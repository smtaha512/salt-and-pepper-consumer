import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ActionSheetOptions } from '@ionic/core';
import { from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ActionSheetService {
  constructor(private readonly actionSheetController: ActionSheetController) {}

  present(options: ActionSheetOptions, showDefaultCloseButton = true) {
    const optionsWithDefaultCloseButton: ActionSheetOptions = this.getOptionsWithDefaultCloseButton(options);
    const actionSheet$ = from(this.actionSheetController.create(showDefaultCloseButton ? optionsWithDefaultCloseButton : options));

    return actionSheet$.pipe(switchMap((actionSheet) => from(actionSheet.present()).pipe(map(() => actionSheet))));
  }

  private getOptionsWithDefaultCloseButton(options: ActionSheetOptions) {
    return {
      ...options,
      buttons: [
        ...(options.buttons ?? []),
        {
          text: 'Close',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    };
  }
}
