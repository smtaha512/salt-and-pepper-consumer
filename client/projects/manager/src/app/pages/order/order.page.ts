import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPage implements OnInit {
  constructor(private readonly actionSheetController: ActionSheetController) {}

  ngOnInit() {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'ion-color-light',
      header: 'Change order status',
      buttons: [
        {
          text: 'Preparing',
          icon: 'flame-sharp',
          cssClass: 'ion-button-background-primary ion-button-text-color-light',
          handler: () => {
            console.log('Preparing clicked');
          },
        },
        {
          text: 'Prepared',
          icon: 'checkmark-outline',
          handler: () => {
            console.log('Prepared clicked');
          },
        },
        {
          text: 'Picked',
          icon: 'checkmark-done-outline',
          handler: () => {
            console.log('Picked clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  changeOrderStatus() {
    this.presentActionSheet();
  }
}
