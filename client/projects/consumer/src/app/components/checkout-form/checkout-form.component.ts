import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonInput } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { isNotEmpty } from 'dist/library';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { user } from '../../+state/user/user.selectors';
import { CloseAlertService } from '../../services/close-alert/close-alert.service';
import * as checkoutActions from './+state/checkout.actions';

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
    private readonly alertController: AlertController,
    private readonly store: Store<any>,
    private readonly closeAlertService: CloseAlertService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.updateFormUsingState();
  }
  buildForm() {
    this.form = this.fb.group(
      {
        email: this.fb.control('s.m.taha10@gmail.com', [Validators.required]),
        firstname: this.fb.control('Taha', [Validators.required]),
        lastname: this.fb.control('Taha', [Validators.required]),
        mobileNumber: this.fb.control('+923112016275', [Validators.required]),
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
    if (this.closeAlertService.isRestaurantClosed) {
      this.closeAlertService.showCloseTimings();
      return;
    }
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
    const { firstname, lastname, email, mobileNumber } = this.form.value;

    this.store.dispatch(
      checkoutActions.placeOrder({
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
