import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  form!: FormGroup;
  readonly email: FormControl;
  readonly password: FormControl; 
  errorMessage = signal('');

  constructor(private router:Router) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.form = new FormGroup({
      email: this.email,
      password: this.password,
    });

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
      
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a email');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  passwordErrorMessage = signal('');
  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a password');
    } else {
      this.passwordErrorMessage.set('');
    }
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  reset() {
    this.email.setValue('');
    this.password.setValue('');
  }
  
  async submit() {
  if (this.form.valid) {
    await this.router.navigateByUrl('main');
  } else {
    this.updateErrorMessage();
    this.updatePasswordErrorMessage();
  }
}

}
