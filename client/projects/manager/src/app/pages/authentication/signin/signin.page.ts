import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { signin } from '../../../+state/user/user.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninPage implements OnInit {
  form: FormGroup;
  errors: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private readonly formBuilder: FormBuilder, private readonly store: Store<any>) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('admin@saltnpeppernc.com', [Validators.required]),
      password: this.formBuilder.control('Admin3793', [Validators.required]),
    });
  }

  onSubmit() {
    const { email, password } = this.form.value;

    this.store.dispatch(signin({ credentials: { password, email } }));
  }
}
