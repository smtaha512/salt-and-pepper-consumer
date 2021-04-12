import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StripeService } from '../services/stripe/stripe.service';

export class ExpiryDateValidator {
  static validate(stripeService: StripeService): AsyncValidatorFn {
    return function validateExpiryDate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
      const [exp_month, exp_year] = ExpiryDateValidator.extractValueFromControl(control);
      return stripeService.validateExpiryDate({ exp_month, exp_year }).pipe(
        map((response) => !response.valid),
        map((invalidExpiryDate) => (invalidExpiryDate ? { invalidExpiryDate } : null)),
        catchError(() => of(null))
      );
    };
  }

  private static extractValueFromControl(control: AbstractControl): [number, number] {
    const [exp_month, exp_year] = (control.value as string).split(' / ').map(Number);
    return [exp_month, exp_year];
  }
}
