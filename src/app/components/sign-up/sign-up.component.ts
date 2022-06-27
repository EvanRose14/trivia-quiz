import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(7)]);
  hidePassword: boolean = true;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  strongPassword(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true}: null;
    }
  } 

  getErrorMessage(c: FormControl) {
    if (c.hasError('required')) {
      return 'You must enter a value';
    }
    if (c.hasError('minlength')) {
      return 'Password must be at least 7 characters';
    }
    if (c.hasError('taken')) {
      return 'Already in use';
    }
    // if (c.hasError('passwordStrength')) {
    //   return 'Password must include at least 1 lowercase letter and 1 number'
    // }
    return c.hasError('email') ? 'Not a valid email' : 'Error';
  }

  onSubmit() {
    this.auth.signUp(this.username.value, this.email.value, this.password.value).subscribe({
      next: (data) => {
        console.log('data',data);
        //do things after signup
      },
      error: (e) => {
        console.log('error',e);
        this.handleError(e);
      },
      complete: () => console.log('Sign up complete!')
    });
  }

  handleError(e: any) {
    switch(e.error.message) {
      case 'Username taken':
        this.username.setErrors({taken: true});
        break;
      case 'Email taken':
        this.email.setErrors({taken: true});
        break;
      case 'Invalid email':
        this.email.setErrors({email: true});
        break;
    }
  }

}
