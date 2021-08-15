import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { from } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { togglePakistaniMenu } from '../../../../+state/user/user.actions';
import { showPakistaniMenu } from '../../../../+state/user/user.selectors';

@Injectable({ providedIn: 'root' })
export class CustomizeMenuPopoverService {
  constructor(private readonly alertController: AlertController, private readonly store: Store<any>) {}

  async present() {
    const alert$ = this.store
      .pipe(
        select(showPakistaniMenu),
        first(),
        switchMap((checked) => from(this.constructAlert(checked))),
        switchMap((alert) => from(alert.present()).pipe(map(() => alert))),
        tap((alert) =>
          alert.onDidDismiss().then(() => {
            alert$.unsubscribe();
          })
        )
      )
      .subscribe();
  }

  constructAlert(checked: boolean) {
    return this.alertController.create({
      header: 'Customize Menu',
      subHeader: 'Show / hide from menu',
      inputs: [
        {
          type: 'checkbox',
          label: 'Pakistani Menu',
          name: 'pakistani-menu',
          checked,
          handler: (alertInput) => this.store.dispatch(togglePakistaniMenu({ value: alertInput.checked })),
        },
      ],
      buttons: [{ text: 'OK', role: 'cancel' }],
    });
  }
}
