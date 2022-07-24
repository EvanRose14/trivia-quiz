import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe((val) => {
      this.loggedIn = val;
    });
  }

  handleLogout() {
    this.auth.logout();
  }

}
