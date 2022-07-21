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

  constructor(
      private auth: AuthService,
      private snackbar: SnackbarService,
      private route: Router
    ) { }

  ngOnInit(): void {
  }  

  getErrorMessage(c: FormControl) {
    if (c.hasError('required')) {
      return 'You must enter a value';
    }
    return c.hasError('email') ? 'Not a valid email' : 'Error';
  }

  onSubmit() {
    this.auth.login(this.email.value, this.password.value).subscribe({
      next: (data: any) => {
        console.log('data',data);
        //do things after signup
      },
      error: (e: any) => {
        
        this.handleServerError(e);
      },
      complete: () => {
        console.log('Login Successful!');
        this.route.navigate(['/home']);
        this.snackbar.openSnackBar('Login Successful!');
      }
    });
  }



  handleServerError(e: any) {
    this.snackbar.openSnackBar('Failed to sign in: ' + e.error.message);
  }

}
