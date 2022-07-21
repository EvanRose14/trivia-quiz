import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackbarService } from 'src/app/services/ui/snackbar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  username = new FormControl('', [Validators.required, Validators.minLength(2), this.noSpecialChars()]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(7)]);
  hidePassword: boolean = true;

  constructor(
      private auth: AuthService,
      private snackbar: SnackbarService
    ) { }

  ngOnInit(): void {
  }

  noSpecialChars(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);

      return specialChars ? {containsSpecialChar: true}: null;
    }
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
      const requiredLength = c.getError('minlength').requiredLength;
      return 'Password must be at least ' + requiredLength + ' characters';
    }
    if (c.hasError('taken')) {
      return 'Already in use';
    }
    if (c.hasError('containsSpecialChar')) {
      return 'Special characters not allowed'
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
        
        this.handleServerError(e);
      },
      complete: () => {
        console.log('Sign up complete!');
        this.snackbar.openSnackBar('Welcome: ' + this.username.value + '!');
      }
    });
  }



  handleServerError(e: any) {
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
    this.snackbar.openSnackBar('Failed to sign up: ' + e.error.message);
  }

}
