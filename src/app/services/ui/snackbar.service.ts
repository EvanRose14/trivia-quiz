import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Ok', duration: number = 5000) {
    this.snackbar.open(message, action, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
