import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(name: string, email: string, password: string) {
    let body = {
      name,
      email,
      password
    }
    return this.http.post('http://localhost:3000/auth/signup', body);
  }

  login(email: string, password: string) {
    let body = {
      email,
      password
    }
    return this.http.post('http://localhost:3000/auth/login', body);
  }
}
