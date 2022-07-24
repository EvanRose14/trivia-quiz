import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackbarService } from 'src/app/services/ui/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hidePassword: boolean = true;
  loading: boolean = false;

  constructor(
      private auth: AuthService,
      private snackbar: SnackbarService,
      private route: Router
    ) { }

  ngOnInit(): void {
  }  

  getErrorMessage(c: FormControl) {
    if (c.hasError('notfound')) {
      return 'Email not found';
    }
    if (c.hasError('password')) {
      return 'Password Incorrect';
    }
    if (c.hasError('required')) {
      return 'You must enter a value';
    }
    return c.hasError('email') ? 'Not a valid email' : 'Error';
  }

  onSubmit() {
    this.loading = true;
    this.auth.login(this.email.value, this.password.value).subscribe({
      next: (data: any) => {
        console.log('data',data);
      },
      error: (e: any) => {
        this.loading = false;
        this.handleServerError(e);
      },
      complete: () => {
        this.loading = false;
        console.log('Login Successful!');
        this.route.navigate(['/home']);
        this.snackbar.openSnackBar('Login Successful!');
      }
    });
  }

  handleServerError(e: any) {
    switch(e.error.message) {
      case 'Email not found':
        this.email.setErrors({notfound: true});
        break;
      case 'Incorrect password': 
        this.password.setErrors({password: true});
        break;
    }
    if(e.error.message === undefined) {
      this.snackbar.openSnackBar('Failed to sign in: Unable to connect to server');
    } else {
      this.snackbar.openSnackBar('Failed to sign in: ' + e.error.message);
    }
    
  }
}
