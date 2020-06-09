import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { combineLatest, Subject } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private readonly destroyed$ = new Subject();

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.updateFullNameWhenSameAsAbove();
    this.updateSameAsAboveIfFullNameChanges();
  }
  buildForm() {
    this.form = this.fb.group({
      cardNumber: this.fb.control('', [Validators.required]),
      cvc: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      email: this.fb.control('', [Validators.required]),
      fullName: this.fb.control('', [Validators.required]),
      isNameSameAsAbove: this.fb.control(false),
      mobileNumber: this.fb.control('', [Validators.required]),
      nameOnCard: this.fb.control('', [Validators.required]),
      validThru: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  updateFullNameWhenSameAsAbove() {
    this.isNameSameAsAbove.valueChanges
      .pipe(
        tap((sameAsAbove) => {
          if (sameAsAbove) {
            this.fullName.setValue(this.nameOnCard.value);
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }
  updateSameAsAboveIfFullNameChanges() {
    combineLatest([this.isNameSameAsAbove.valueChanges, this.fullName.valueChanges, this.nameOnCard.valueChanges])
      .pipe(
        startWith([this.isNameSameAsAbove.value, this.fullName.value, this.nameOnCard.value]),
        tap(([isNameSameAsAbove, fullName, nameOnCard]) => {
          console.log({ isNameSameAsAbove, fullName, nameOnCard });
          if (fullName !== nameOnCard && isNameSameAsAbove) {
            this.isNameSameAsAbove.setValue(false);
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
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

  get fullName() {
    return this.form.get('fullName');
  }

  get isNameSameAsAbove() {
    return this.form.get('isNameSameAsAbove');
  }
  get nameOnCard() {
    return this.form.get('nameOnCard');
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
