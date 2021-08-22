import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class CloseAlertService {
  constructor(private readonly alertController: AlertController) {}

  private get currentTime() {
    return DateTime.now().toUTC();
  }
  private get closeTimings() {
    const closeTimings = [
      {
        start: DateTime.fromObject({ hour: 15, minute: 0 }, { zone: 'America/New_York' }).toUTC(),
        end: DateTime.fromObject({ hour: 17, minute: 0 }, { zone: 'America/New_York' }).toUTC(),
        message: 'Please come back at 5 PM',
      },
      {
        start: DateTime.fromObject({ hour: 22, minute: 0 }, { zone: 'America/New_York' }).toUTC(),
        end: DateTime.fromObject({ hour: 23, minute: 59 }, { zone: 'America/New_York' }).toUTC(),
        message: 'Please come back tomorrow at 11 AM',
      },
      {
        start: DateTime.fromObject({ hour: 0, minute: 0 }, { zone: 'America/New_York' }).toUTC(),
        end: DateTime.fromObject({ hour: 10, minute: 0 }, { zone: 'America/New_York' }).toUTC(),
        message: 'Please come back tomorrow at 11 AM',
      },
    ];
    return closeTimings;
  }
  get isRestaurantClosed() {
    const closeTimings = this.closeTimings;
    const currentTime = this.currentTime;
    return closeTimings.some((timing) => currentTime >= timing.start && currentTime <= timing.end);
  }

  showCloseTimings() {
    const currentTime = this.currentTime;
    const { message } = this.closeTimings.find((timing) => currentTime >= timing.start && currentTime <= timing.end);
    return this.alertController
      .create({
        header: 'We are close now.',
        message,
        backdropDismiss: false,
        keyboardClose: false,
        buttons: [{ text: 'OK', role: 'cancel' }],
      })
      .then((alert) => alert.present());
  }
}
