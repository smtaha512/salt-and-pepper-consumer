import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonInput } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VerifyCodePopoverService } from '../verify-code-popover/services/verify-code-popover.service';
import { StripeService } from './services/stripe/stripe.service';
import { CardNumberValidator } from './validators/card-number.validator';
import { CVCValidator } from './validators/cvc.validator';
import { ExpiryDateValidator } from './validators/expiry-date.validator';
import * as checkoutActions from './+state/checkout.actions';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent implements OnInit {
  form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly stripeService: StripeService,
    private readonly alertController: AlertController,
    private readonly verifyCodePopoverService: VerifyCodePopoverService,
    private readonly store: Store<any>
  ) {}

  ngOnInit() {
    this.buildForm();
    // this.verifyCodePopoverService.present().subscribe(console.log);
  }
  buildForm() {
    this.form = this.fb.group(
      {
        cardNumber: this.fb.control('42424242424242', {
          asyncValidators: [CardNumberValidator.validate(this.stripeService)],
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        cvc: this.fb.control('123', {
          asyncValidators: [CVCValidator.validate(this.stripeService)],
          updateOn: 'change',
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
        }),
        email: this.fb.control('', [Validators.required]),
        firstname: this.fb.control('', [Validators.required]),
        lastname: this.fb.control('', [Validators.required]),
        isNameSameAsAbove: this.fb.control(false),
        mobileNumber: this.fb.control('+923212092572', [Validators.required]),
        nameOnCard: this.fb.control('Test', {
          updateOn: 'change',
          validators: [Validators.required],
        }),
        validThru: this.fb.control('', {
          asyncValidators: [ExpiryDateValidator.validate(this.stripeService)],
          updateOn: 'change',
          validators: [Validators.required],
        }),
      },
      { updateOn: 'blur' }
    );
  }

  onSubmit() {
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
    const { firstname, lastname, email, mobileNumber } = this.form.value;

    const { cardNumber, cvc, validThru } = this.form.value;
    const [expMonth, expYear] = validThru.split(' / ');

    // this.stripeService
    //   .createCardToken({ cvc, expMonth, expYear, number: cardNumber })
    //   .pipe(
    //     catchError((error) => {
    //       console.log(error);
    //       return throwError(error);
    //     })
    //   )
    //   .subscribe({ next: (i) => console.log(i) });
    // console.log(this.form.value);
    this.store.dispatch(
      checkoutActions.placeOrder({
        card: {
          cvc,
          expMonth,
          expYear,
          number: cardNumber,
        },
        credentials: { contact: mobileNumber, email, firstname, lastname },
      })
    );
  }

  openMonthYearSelector(ionInput: IonInput) {
    this.form.markAsTouched();
    this.form.updateValueAndValidity();
    ionInput.getInputElement().then((elem) => elem.click());
  }

  getValue(value: number | string = ''): string {
    if (!value) {
      return '';
    }
    const [yyyy, mm, yy = yyyy.slice(2, 4)] = value.toString().split('-');
    return `${mm} / ${yy}`;
  }

  openInputInfo({ header, message }: { header: string; message: string }) {
    this.alertController.create({ header, message, buttons: [{ text: 'OK', role: 'cancel' }] }).then((alert) => alert.present());
  }
  get currentDate() {
    return new Date();
  }
  get validThru() {
    return this.form.get('validThru');
  }
  get cvc() {
    return this.form.get('cvc');
  }
  get cardNumber() {
    return this.form.get('cardNumber');
  }
  get nameOnCard() {
    return this.form.get('nameOnCard');
  }
}
