import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StorageKey, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  public isLoggedIn = new BehaviorSubject<boolean>(false);

  signUp(name: string, email: string, password: string) {
    let body = {
      name,
      email,
      password
    }
    return this.http.post('http://localhost:3001/auth/signup', body);
  }

  login(email: string, password: string) {
    let body = {
      email,
      password
    }
    return new Observable(observer => {
      this.http.post('http://localhost:3001/auth/login', body).subscribe({
        next: (data: any) => {
          this.storage.set(StorageKey.AUTH_ACCESS_TOKEN, data.accessToken);
          this.storage.set(StorageKey.AUTH_REFRESH_TOKEN, data.refreshToken);
          this.isLoggedIn.next(true);
          observer.next(data);
        },
        error: (e: any) => {
          observer.error(e);
        },
        complete: () => {
          observer.complete();
        }
      })
    });
  }

  logout() {
    this.storage.clear();
    this.isLoggedIn.next(false);
  }
}
