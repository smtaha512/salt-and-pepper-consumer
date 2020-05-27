import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  openMonthYearSelector(ionInput: IonInput) {
    ionInput.getInputElement().then((elem) => elem.click());
  }

  getValue(value: number | string = ''): string {
    return value
      .toString()
      .split('-')
      .map((item) => item.slice(0, 2))
      .reverse()
      .join('/');
  }
}
