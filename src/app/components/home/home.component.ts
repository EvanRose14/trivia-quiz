import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageKey, StorageService } from 'src/app/services/auth/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe((val) => {
      this.loggedIn = val;
    });
  }

}
