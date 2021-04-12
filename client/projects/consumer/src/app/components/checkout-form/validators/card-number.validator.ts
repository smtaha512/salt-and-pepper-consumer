import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StripeService } from '../services/stripe/stripe.service';

export class CardNumberValidator {
  static validate(stripeService: StripeService): AsyncValidatorFn {
    return function validateCardNumber(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
      return stripeService.validateCardNumber({ number: control.value }).pipe(
        map((response) => !response.valid),
        map((invalidCardNumber) => (invalidCardNumber ? { invalidCardNumber } : null)),
        catchError(() => of(null))
      );
    };
  }
}
