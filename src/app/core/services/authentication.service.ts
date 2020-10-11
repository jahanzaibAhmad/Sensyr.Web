import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  constructor(
    private router: Router
  ) {
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  loginNavigate() {
    this.router.navigate(['auth', 'login']);

  }

  get userFullName() {
    let fullName = '';
    let user;
    user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      fullName = user.FirstName + ' ' + user.LastName;
    }
    return fullName;
  }

}
