import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonInput } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { isNotEmpty } from 'dist/library';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { user } from '../../+state/user/user.selectors';
import * as checkoutActions from './+state/checkout.actions';
import { StripeService } from './services/stripe/stripe.service';
import { CardNumberValidator } from './validators/card-number.validator';
import { CVCValidator } from './validators/cvc.validator';
import { ExpiryDateValidator } from './validators/expiry-date.validator';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private readonly destroyed$ = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly stripeService: StripeService,
    private readonly alertController: AlertController,
    private readonly store: Store<any>
  ) {}

  ngOnInit() {
    this.buildForm();
    this.updateFormUsingState();
  }
  buildForm() {
    this.form = this.fb.group(
      {
        cardNumber: this.fb.control('', {
          asyncValidators: [CardNumberValidator.validate(this.stripeService)],
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        cvc: this.fb.control('', {
          asyncValidators: [CVCValidator.validate(this.stripeService)],
          updateOn: 'change',
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
        }),
        email: this.fb.control('', [Validators.required]),
        firstname: this.fb.control('', [Validators.required]),
        lastname: this.fb.control('', [Validators.required]),
        isNameSameAsAbove: this.fb.control(false),
        mobileNumber: this.fb.control('', [Validators.required]),
        nameOnCard: this.fb.control('', {
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

  updateFormUsingState() {
    this.store
      .select(user)
      .pipe(
        filter(isNotEmpty),
        map(({ firstname, lastname, email, contact }) => ({ firstname, lastname, email, mobileNumber: contact })),
        tap(({ firstname }) => this.firstname.setValue(firstname)),
        tap(({ lastname }) => this.lastname.setValue(lastname)),
        tap(({ email }) => this.email.setValue(email)),
        tap(({ mobileNumber }) => this.mobileNumber.setValue(mobileNumber)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  onSubmit() {
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
    const { firstname, lastname, email, mobileNumber } = this.form.value;

    const { cardNumber, cvc, validThru } = this.form.value;
    const [expMonth, expYear] = validThru.split(' / ');

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
  get firstname() {
    return this.form.get('firstname');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get email() {
    return this.form.get('email');
  }
  get mobileNumber() {
    return this.form.get('mobileNumber');
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.resetForm();
  }

  private resetForm() {
    this.form.reset();
    this.form.markAsPristine();
  }
}
