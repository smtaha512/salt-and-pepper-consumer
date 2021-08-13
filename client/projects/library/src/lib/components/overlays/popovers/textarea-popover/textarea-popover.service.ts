import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertInput, AlertButton } from '@ionic/core';
import { TextareaPopoverComponentInterface } from './textarea-popover.component';

const enum TextAreaButtonRoles {
  BACKDROP = 'backdrop',
  CANCEL = 'cancel',
  UPDATE = 'update',
}

@Injectable({ providedIn: 'root' })
export class TextareaPopoverService {
  constructor(private readonly alertController: AlertController, @Inject(DOCUMENT) private readonly document: Document) {}

  async present(options: TextareaPopoverComponentInterface) {
    const inputName = options.label.toLowerCase();
    const textAreaInput: AlertInput = {
      label: options.label,
      name: inputName,
      placeholder: options.placeholder,
      type: 'textarea',
      value: options.notes,
    };
    const cancelButton: AlertButton = { text: 'Cancel', role: TextAreaButtonRoles.CANCEL, cssClass: 'ion-button-text-color-danger' };
    const updateButton: AlertButton = { text: 'Update', role: TextAreaButtonRoles.UPDATE };
    return this.alertController
      .create({ buttons: [cancelButton, updateButton], header: options.title, inputs: [textAreaInput], subHeader: options.subtitle })
      .then((alert) => alert.present().then(() => alert))
      .then((alert) =>
        alert.onDidDismiss().then(function textAreaPopoverDismissHandler(eventDetail) {
          switch (eventDetail.role) {
            case TextAreaButtonRoles.BACKDROP:
              return;
            case TextAreaButtonRoles.CANCEL:
              return;
            case TextAreaButtonRoles.UPDATE:
              eventDetail.data.values[inputName] !== options.notes && options.onChange(eventDetail.data.values[inputName]);
              return;
            default:
              throw new Error(`Handler for button with role ${eventDetail.role} not implemented`);
          }
        })
      );
  }
}
