import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StripeService } from '../services/stripe/stripe.service';

export class CVCValidator {
  static validate(stripeService: StripeService): AsyncValidatorFn {
    return function validateCVC(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
      return stripeService.validateCVC({ cvc: control.value }).pipe(
        map((response) => !response.valid),
        map((invalidCVC) => (invalidCVC ? { invalidCVC } : null)),
        catchError(() => of(null))
      );
    };
  }
}
