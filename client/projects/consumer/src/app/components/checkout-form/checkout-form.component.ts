import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.form = this.fb.group({
      cardNumber: this.fb.control('', [Validators.required]),
      cvc: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      email: this.fb.control('', [Validators.required]),
      firstname: this.fb.control('', [Validators.required]),
      lastname: this.fb.control('', [Validators.required]),
      isNameSameAsAbove: this.fb.control(false),
      mobileNumber: this.fb.control('', [Validators.required]),
      nameOnCard: this.fb.control('', [Validators.required]),
      validThru: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  openMonthYearSelector(ionInput: IonInput) {
    ionInput.getInputElement().then((elem) => elem.click());
  }

  getValue(value: number | string = ''): string {
    if (!value) {
      return '';
    }
    const [yyyy, mm, yy = yyyy.slice(2, 4)] = value.toString().split('-');
    return `${mm} / ${yy}`;
  }
}
